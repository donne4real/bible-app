/**
 * Platform-agnostic core of the api.bible proxy — shared between the Cloudflare Worker
 * (worker/index.ts) and the Netlify Edge Function (netlify/edge-functions/bible-proxy.ts)
 * so NLT/AMP/NIV behave identically on both hosts. Contains no runtime-specific globals
 * (no Cloudflare `caches.default`, no Deno `Netlify.env`) — only standard JS/Fetch API.
 */

// translationId (as used throughout the app) -> api.bible's internal bible ID
export const BIBLE_IDS: Record<string, string> = {
  nlt: 'd6e14a625393b4da-01',
  amp: 'a81b73293d3080c9-01',
  niv: '78a9f6124f344018-01',
};

// api.bible's book code differs from this app's BIBLE_BOOKS in exactly one case.
const BOOK_ID_OVERRIDES: Record<string, string> = { NAH: 'NAM' };

const BOOK_ID_PATTERN = /^[1-3]?[A-Z]{2,3}$/;
const CHAPTER_ROUTE_PATTERN = /^\/api\/bible\/([a-z]+)\/([A-Za-z0-9]+)\/(\d+)$/;

export type ChapterVerses = { verse: number; text: string }[];

export interface ParsedChapterRequest {
  translationId: string;
  bookId: string;
  chapter: number;
}

// Parses "/api/bible/{translationId}/{bookId}/{chapter}", validating each segment.
// Returns null for anything malformed — callers should respond 400/404.
export function parseChapterPath(pathname: string): ParsedChapterRequest | null {
  const match = pathname.match(CHAPTER_ROUTE_PATTERN);
  if (!match) return null;

  const [, translationId, rawBookId, chapterStr] = match;
  const bookId = rawBookId.toUpperCase();
  if (!BOOK_ID_PATTERN.test(bookId)) return null;

  const chapter = Number(chapterStr);
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > 151) return null;

  return { translationId, bookId, chapter };
}

export function buildUpstreamUrl(bibleId: string, bookId: string, chapter: number): string {
  const apiBookId = BOOK_ID_OVERRIDES[bookId] ?? bookId;
  return (
    `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${apiBookId}.${chapter}` +
    `?content-type=json&include-verse-numbers=true&include-verse-spans=false`
  );
}

// Walks api.bible's nested content tree, collecting text runs by their verseId.
// Footnotes and section headings carry no verseId and are naturally skipped.
export function extractVerses(content: unknown[]): ChapterVerses {
  const byVerse = new Map<number, string[]>();

  function walk(node: any) {
    if (!node) return;
    if (node.type === 'tag') {
      if (node.name === 'note') return;
      for (const child of node.items || []) walk(child);
    } else if (node.type === 'text' && node.attrs?.verseId) {
      const verseNum = Number(String(node.attrs.verseId).split('.').pop());
      if (!Number.isFinite(verseNum)) return;
      const parts = byVerse.get(verseNum) ?? [];
      parts.push(node.text);
      byVerse.set(verseNum, parts);
    }
  }

  for (const node of content) walk(node);

  return [...byVerse.entries()]
    .sort(([a], [b]) => a - b)
    .map(([verse, parts]) => ({ verse, text: parts.join('').replace(/\s+/g, ' ').trim() }))
    .filter(v => v.text.length > 0);
}
