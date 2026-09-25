import { useCallback } from 'react';
import { Highlight, Note, Bookmark, Verse } from '../types';
import { STORAGE_KEYS } from '../constants';
import { usePersistedJSONState } from './usePersistedState';

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

  const [notes, setNotes] = usePersistedJSONState<Note[]>(
    STORAGE_KEYS.NOTES,
    []
  );

  const [bookmarks, setBookmarks] = usePersistedJSONState<Bookmark[]>(
    STORAGE_KEYS.BOOKMARKS,
    []
  );

  // ── Highlights ──────────────────────────────────────────────────────
  const handleApplyHighlight = useCallback((selectedVerses: Verse[], translation: string, color: string) => {
    const newHL = [...highlights];
    selectedVerses.forEach(v => {
      const id = `${translation}_${v.book_id}_${v.chapter}_${v.verse}`;
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

  const handleRemoveHighlight = useCallback((selectedVerses: Verse[], translation: string) => {
    let updated = [...highlights];
    selectedVerses.forEach(v => {
      const id = `${translation}_${v.book_id}_${v.chapter}_${v.verse}`;
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
  };
}
