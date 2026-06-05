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

  let data: TranslationData | null = null;
  try {
    const res = await fetch(`/bibles/${translationId}.json`);
    if (res.ok) data = await res.json();
  } catch {
    // network error — treat as not available
  }

  cache.set(translationId, data);
  evictIfNeeded();
  return data;
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
