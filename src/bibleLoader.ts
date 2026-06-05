import { Verse } from './types';

type ChapterVerses = { verse: number; text: string }[];
type BookData      = { [chapter: string]: ChapterVerses };
type TranslationData = { [bookId: string]: BookData };

// In-memory cache: translation ID → full parsed JSON
const cache: { [translationId: string]: TranslationData | null } = {};

async function loadTranslation(translationId: string): Promise<TranslationData | null> {
  if (translationId in cache) return cache[translationId];
  try {
    const res = await fetch(`/bibles/${translationId}.json`);
    if (!res.ok) { cache[translationId] = null; return null; }
    cache[translationId] = await res.json();
  } catch {
    cache[translationId] = null;
  }
  return cache[translationId];
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
  if (!chapterData || chapterData.length === 0) return null;

  return chapterData.map(v => ({
    book_id: bookId,
    book_name: bookName,
    chapter,
    verse: v.verse,
    text: v.text,
  }));
}

export function clearCache() {
  for (const key in cache) delete cache[key];
}
