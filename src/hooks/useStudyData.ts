import { useCallback, useEffect } from 'react';
import { Highlight, Note, Bookmark, Verse } from '../types';
import { STORAGE_KEYS } from '../constants';
import { usePersistedJSONState } from './usePersistedState';

/** Migrate old `{translation}_{bookId}_{ch}_{v}` keys to `{bookId}_{ch}_{v}`. */
function migrateHighlightKeys(old: Highlight[]): Highlight[] {
  let changed = false;
  const result = old.map(h => {
    // Old format: web_GEN_1_1 → GEN_1_1
    const parts = h.id.split('_');
    if (parts.length >= 4 && parts[0].length <= 4) {
      const newId = parts.slice(1).join('_');
      if (newId !== h.id) { changed = true; return { ...h, id: newId }; }
    }
    return h;
  });
  return changed ? result : old;
}

/**
 * Manages all user study data — highlights, notes, and bookmarks —
 * with automatic localStorage persistence.
 *
 * Highlights are keyed by `{translation}_{bookId}_{chapter}_{verse}`.
 * Notes and bookmarks use `{bookId}_{chapter}_{verse}` and
 * `bookmark_{bookId}_{chapter}` respectively.
 *
 * @returns Study data arrays and CRUD handler functions
 *
 * @example
 * const { highlights, notes, handleApplyHighlight, handleToggleBookmark } = useStudyData();
 */
export function useStudyData() {
  const [highlights, setHighlights] = usePersistedJSONState<Highlight[]>(
    STORAGE_KEYS.HIGHLIGHTS,
    []
  );

  // Migrate old translation-prefixed keys on first load
  useEffect(() => {
    setHighlights(prev => migrateHighlightKeys(prev));
  }, []);

  const [notes, setNotes] = usePersistedJSONState<Note[]>(
    STORAGE_KEYS.NOTES,
    []
  );

  const [bookmarks, setBookmarks] = usePersistedJSONState<Bookmark[]>(
    STORAGE_KEYS.BOOKMARKS,
    []
  );

  // ── Highlights ──────────────────────────────────────────────────────
  const handleApplyHighlight = useCallback((selectedVerses: Verse[], _translation: string, color: string) => {
    const newHL = [...highlights];
    selectedVerses.forEach(v => {
      const id = `${v.book_id}_${v.chapter}_${v.verse}`;
      const filtered = newHL.filter(h => h.id !== id);
      filtered.push({
        id,
        book_id: v.book_id,
        book_name: v.book_name,
        chapter: v.chapter,
        verse: v.verse,
        color,
        createdAt: Date.now(),
      });
      newHL.splice(0, newHL.length, ...filtered);
    });
    setHighlights(newHL);
  }, [highlights, setHighlights]);

  const handleRemoveHighlight = useCallback((selectedVerses: Verse[], _translation: string) => {
    let updated = [...highlights];
    selectedVerses.forEach(v => {
      const id = `${v.book_id}_${v.chapter}_${v.verse}`;
      updated = updated.filter(h => h.id !== id);
    });
    setHighlights(updated);
  }, [highlights, setHighlights]);

  const handleDeleteHighlightById = useCallback((id: string) => {
    setHighlights(prev => prev.filter(h => h.id !== id));
  }, [setHighlights]);

  // ── Notes ───────────────────────────────────────────────────────────
  const handleSaveNote = useCallback((selectedVerses: Verse[], text: string) => {
    if (selectedVerses.length === 0) return;
    const v = [...selectedVerses].sort((a, b) => a.verse - b.verse)[0];
    const id = `${v.book_id}_${v.chapter}_${v.verse}`;
    setNotes(prev => {
      const updated = prev.filter(n => n.id !== id);
      if (text.trim()) {
        updated.push({
          id,
          book_id: v.book_id,
          book_name: v.book_name,
          chapter: v.chapter,
          verse: v.verse,
          text,
          createdAt: Date.now(),
        });
      }
      return updated;
    });
  }, [setNotes]);

  const handleDeleteNoteById = useCallback((id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  }, [setNotes]);

  // ── Bookmarks ───────────────────────────────────────────────────────
  const isCurrentChapterBookmarked = useCallback((bookId: string, chapter: number) => {
    return bookmarks.some(bm => bm.id === `bookmark_${bookId}_${chapter}`);
  }, [bookmarks]);

  const handleToggleBookmark = useCallback((bookId: string, bookName: string, chapter: number) => {
    const id = `bookmark_${bookId}_${chapter}`;
    setBookmarks(prev => {
      return prev.some(bm => bm.id === id)
        ? prev.filter(bm => bm.id !== id)
        : [...prev, { id, book_id: bookId, book_name: bookName, chapter, createdAt: Date.now() }];
    });
  }, [setBookmarks]);

  const handleDeleteBookmarkById = useCallback((id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }, [setBookmarks]);

  // ── Import ──────────────────────────────────────────────────────────
  const handleImportData = useCallback((imported: { highlights: Highlight[]; notes: Note[]; bookmarks: Bookmark[] }) => {
    setHighlights(prev => {
      const map = new Map<string, Highlight>();
      for (const h of prev) map.set(h.id, h);
      for (const h of imported.highlights) map.set(h.id, h);
      return Array.from(map.values());
    });
    setNotes(prev => {
      const map = new Map<string, Note>();
      for (const n of prev) map.set(n.id, n);
      for (const n of imported.notes) map.set(n.id, n);
      return Array.from(map.values());
    });
    setBookmarks(prev => {
      const map = new Map<string, Bookmark>();
      for (const b of prev) map.set(b.id, b);
      for (const b of imported.bookmarks) map.set(b.id, b);
      return Array.from(map.values());
    });
  }, [setHighlights, setNotes, setBookmarks]);

  return {
    highlights,
    notes,
    bookmarks,
    handleApplyHighlight,
    handleRemoveHighlight,
    handleDeleteHighlightById,
    handleSaveNote,
    handleDeleteNoteById,
    isCurrentChapterBookmarked,
    handleToggleBookmark,
    handleDeleteBookmarkById,
    handleImportData,
  };
}
