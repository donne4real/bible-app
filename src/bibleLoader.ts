import { Verse } from './types';

type ChapterVerses = { verse: number; text: string }[];
type BookData      = { [chapter: string]: ChapterVerses };
type TranslationData = { [bookId: string]: BookData };

// LRU cache capped at MAX_CACHED translations (~4-5 MB each).
// Evicts the least-recently-used entry when the cap is exceeded so low-end
// devices never accumulate the full ~35 MB set in the JS heap at once.
const MAX_CACHED = 2;
const cache     = new Map<string, TranslationData | null>();

function evictIfNeeded() {
  while (cache.size > MAX_CACHED) {
    // Map iteration order is insertion order — first entry is least recently used
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
}

async function loadTranslation(translationId: string): Promise<TranslationData | null> {
  if (cache.has(translationId)) {
    // Move to end (most recently used) by re-inserting
    const data = cache.get(translationId)!;
    cache.delete(translationId);
    cache.set(translationId, data);
    return data;
  }

  let data: TranslationData;
  try {
    const res = await fetch(`/bibles/${translationId}.json`);
    if (!res.ok) return null; // non-200 — do not cache, allow retry
    data = await res.json();
  } catch {
    // network error — do not cache so the next attempt retries the fetch
    return null;
  }

  cache.set(translationId, data);
  evictIfNeeded();
  return data;
}

// ── Diacritic/letter-variant-insensitive matching ──────────────────────────────
// Arabic scripture text (e.g. the Van Dyck translation) is fully diacritized —
// vowel marks (tashkeel) are interspersed between letters, and it uses letter
// variants (e.g. Alef Wasla ٱ) that differ from what a user naturally types.
// A plain substring search against that text effectively never matches, so
// matching is done against a normalized copy while still highlighting/returning
// ranges in the original text.
const ARABIC_DIACRITIC_RANGES: [number, number][] = [[0x064B, 0x065F], [0x06D6, 0x06ED]];
function isArabicDiacritic(ch: string): boolean {
  const cp = ch.codePointAt(0) ?? 0;
  if (cp === 0x0670) return true; // superscript alef
  return ARABIC_DIACRITIC_RANGES.some(([lo, hi]) => cp >= lo && cp <= hi);
}
function normalizeChar(ch: string): string {
  if ('أإآٱ'.includes(ch)) return 'ا';
  if (ch === 'ى') return 'ي';
  return ch.toLowerCase();
}

// Builds a normalized copy of `text` for matching, plus a map from each kept
// character back to its index in the original string.
function normalizeForSearch(text: string): { normalized: string; map: number[] } {
  let normalized = '';
  const map: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (isArabicDiacritic(ch)) continue;
    normalized += normalizeChar(ch);
    map.push(i);
  }
  return { normalized, map };
}

// Finds `query` inside `text` ignoring diacritics/letter variants/case. Returns
// the [start, end) range in the ORIGINAL text to highlight, or null if no match.
export function findMatchRange(text: string, query: string): [number, number] | null {
  const nq = normalizeForSearch(query).normalized;
  if (!nq) return null;
  const { normalized, map } = normalizeForSearch(text);
  const idx = normalized.indexOf(nq);
  if (idx === -1) return null;
  return [map[idx], map[idx + nq.length - 1] + 1];
}

export function matchesSearch(text: string, query: string): boolean {
  return findMatchRange(text, query) !== null;
}

export interface WholeBibleSearchResult {
  results: Verse[];
  total: number;
}

// Searches every book/chapter of a translation already resident in memory (loadTranslation's
// cache) — since any chapter view already pulls the full translation JSON, this normally
// requires no extra network fetch. `books` supplies canonical order + display names.
export async function searchWholeBible(
  translationId: string,
  query: string,
  books: { id: string; name: string }[],
  limit = 200
): Promise<WholeBibleSearchResult | null> {
  const translation = await loadTranslation(translationId);
  if (!translation) return null;

  const q = query.trim();
  if (!q) return { results: [], total: 0 };

  const results: Verse[] = [];
  let total = 0;

  for (const book of books) {
    const bookData = translation[book.id];
    if (!bookData) continue;
    const chapterNums = Object.keys(bookData).map(Number).sort((a, b) => a - b);
    for (const ch of chapterNums) {
      for (const v of bookData[String(ch)]) {
        if (!matchesSearch(v.text, q)) continue;
        total++;
        if (results.length < limit) {
          results.push({ book_id: book.id, book_name: book.name, chapter: ch, verse: v.verse, text: v.text });
        }
      }
    }
  }

  return { results, total };
}

export async function getVerses(
  translationId: string,
  bookId: string,
  bookName: string,
  chapter: number
): Promise<Verse[] | null> {
  const translation = await loadTranslation(translationId);
  if (!translation) return null;

  const chapterData = translation[bookId]?.[String(chapter)];
  if (!Array.isArray(chapterData) || chapterData.length === 0) return null;

  return chapterData.map(v => ({
    book_id: bookId,
    book_name: bookName,
    chapter,
    verse: v.verse,
    text: v.text,
  }));
}

export function clearCache() {
  cache.clear();
}
