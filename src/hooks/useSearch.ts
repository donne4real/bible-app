import { useState, useCallback, useRef, useEffect } from 'react';
import { BIBLE_BOOKS } from '../bibleStructure';
import { getLocalizedBookName } from '../bookNames';
import { getVerses, searchWholeBible, matchesSearch, isRemoteTranslation } from '../bibleLoader';
import { Verse, BookMetadata } from '../types';
import { STORAGE_KEYS, CACHE_LIMITS, DEFAULT_SEARCH_TOPICS } from '../constants';
import { usePersistedJSONState } from './usePersistedState';

/**
 * Parses a string like "John 3:16", "Gen 1", "Psalm 23:1-5" into a
 * book + chapter + optional verse reference.
 */
function parseReference(input: string): { book: BookMetadata; chapter: number; verse?: number } | null {
  const q = input.trim();
  // Match patterns: "Book Chapter:Verse", "Book Chapter", "Book Ch:V-V"
  const match = q.match(/^([\d]*\s*[\w]+)\s+(\d+)(?::(\d+))?$/i);
  if (!match) return null;

  const bookPart = match[1].trim().toLowerCase();
  const chapter = parseInt(match[2], 10);
  const verse = match[3] ? parseInt(match[3], 10) : undefined;

  // Find matching book
  const book = BIBLE_BOOKS.find(b => {
    const name = b.name.toLowerCase();
    const id = b.id.toLowerCase();
    return name === bookPart || id === bookPart ||
      name.startsWith(bookPart) || name.includes(bookPart);
  });

  if (!book || chapter < 1 || chapter > book.chapters) return null;
  return { book, chapter, verse };
}

/**
 * Returns close matches for a query against book names (Levenshtein-like).
 */
function getFuzzyBookSuggestions(query: string): BookMetadata[] {
  const q = query.toLowerCase();
  return BIBLE_BOOKS
    .map(b => ({
      book: b,
      score: fuzzyScore(b.name.toLowerCase(), q),
    }))
    .filter(x => x.score > 0.4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.book);
}

/** Simple bigram overlap score between two strings (0 to 1). */
function fuzzyScore(a: string, b: string): number {
  if (!a || !b) return 0;
  const bigramsA = new Set<string>();
  for (let i = 0; i < a.length - 1; i++) bigramsA.add(a.slice(i, i + 2));
  let overlap = 0;
  for (let i = 0; i < b.length - 1; i++) {
    if (bigramsA.has(b.slice(i, i + 2))) overlap++;
  }
  return overlap / Math.max(a.length - 1, b.length - 1, 1);
}

/**
 * Handles all search functionality: chapter-scoped search with autocomplete,
 * whole-Bible search, and search history persistence.
 *
 * Autocomplete suggests matching book names, verse text, recent searches,
 * and popular topics. Whole-Bible search loads all chapters of the current
 * translation and filters client-side (skipped for remote/online translations).
 *
 * @param translation - Current translation ID (e.g. 'web', 'kjv')
 * @returns Search state, refs, and handler functions
 *
 * @example
 * const { activeSearch, setActiveSearch, handleWholeBibleSearch, getFilteredVerses } = useSearch('web');
 */
export function useSearch(translation: string) {
  const [activeSearch, setActiveSearch] = useState('');
  const [searchHistory, setSearchHistory] = usePersistedJSONState<string[]>(
    STORAGE_KEYS.SEARCH_HISTORY,
    DEFAULT_SEARCH_TOPICS
  );
  const [searchFocused, setSearchFocused] = useState(false);

  // Whole-Bible search
  const [wholeBibleQuery, setWholeBibleQuery] = useState<string | null>(null);
  const [wholeBibleResults, setWholeBibleResults] = useState<Verse[]>([]);
  const [wholeBibleTotal, setWholeBibleTotal] = useState(0);
  const [wholeBibleLoading, setWholeBibleLoading] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Outside click for search
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const addToSearchHistory = useCallback((query: string) => {
    if (!searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev].slice(0, CACHE_LIMITS.SEARCH_HISTORY_MAX));
    }
  }, [searchHistory, setSearchHistory]);

  const handleSearchKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const q = activeSearch.trim();
      if (q) addToSearchHistory(q);
      setSearchFocused(false);
    }
  }, [activeSearch, addToSearchHistory]);

  const handleSelectSearchQuery = useCallback((term: string) => {
    setActiveSearch(term);
    addToSearchHistory(term);
    setSearchFocused(false);
  }, [addToSearchHistory]);

  const getAutocompleteSuggestions = useCallback((verses: Verse[]) => {
    const q = activeSearch.trim().toLowerCase();
    if (!q) {
      return {
        books: [],
        verses: [],
        topics: DEFAULT_SEARCH_TOPICS,
        history: searchHistory,
        parsedRef: null,
        fuzzyBooks: [],
      };
    }

    const parsedRef = parseReference(activeSearch.trim());

    return {
      books: BIBLE_BOOKS.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        getLocalizedBookName(b.id, translation, b.name).toLowerCase().includes(q)
      ).slice(0, 4),
      verses: verses.filter(v => matchesSearch(v.text, q)).slice(0, 5),
      topics: [],
      history: searchHistory.filter(h => h.toLowerCase().includes(q) && h.toLowerCase() !== q),
      parsedRef,
      fuzzyBooks: verses.length === 0 && !parsedRef ? getFuzzyBookSuggestions(activeSearch.trim()) : [],
    };
  }, [activeSearch, translation, searchHistory]);

  const getFilteredVerses = useCallback((verses: Verse[]) => {
    if (!activeSearch.trim()) return verses;
    return verses.filter(v => matchesSearch(v.text, activeSearch));
  }, [activeSearch]);

  const handleWholeBibleSearch = useCallback(async (query: string) => {
    const q = query.trim();
    if (!q) return;
    addToSearchHistory(q);
    setSearchFocused(false);
    setWholeBibleQuery(q);
    setWholeBibleResults([]);
    setWholeBibleTotal(0);
    if (isRemoteTranslation(translation)) return;
    setWholeBibleLoading(true);
    const localizedBooks = BIBLE_BOOKS.map(b => ({
      id: b.id,
      name: getLocalizedBookName(b.id, translation, b.name),
    }));
    const result = await searchWholeBible(translation, q, localizedBooks);
    setWholeBibleResults(result?.results ?? []);
    setWholeBibleTotal(result?.total ?? 0);
    setWholeBibleLoading(false);
  }, [translation, addToSearchHistory]);

  const clearWholeBibleSearch = useCallback(() => {
    setWholeBibleQuery(null);
  }, []);

  return {
    activeSearch,
    setActiveSearch,
    searchHistory,
    setSearchHistory,
    searchFocused,
    setSearchFocused,
    wholeBibleQuery,
    wholeBibleResults,
    wholeBibleTotal,
    wholeBibleLoading,
    searchContainerRef,
    handleSearchKeyPress,
    handleSelectSearchQuery,
    getAutocompleteSuggestions,
    getFilteredVerses,
    handleWholeBibleSearch,
    clearWholeBibleSearch,
  };
}
