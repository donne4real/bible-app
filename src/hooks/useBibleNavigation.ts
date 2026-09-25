import { useState, useCallback, useEffect, useRef } from 'react';
import { BIBLE_BOOKS } from '../bibleStructure';
import { BookMetadata } from '../types';
import { STORAGE_KEYS, SWIPE_THRESHOLD, SWIPE_RATIO, NAV_DEBOUNCE_MS } from '../constants';
import { usePersistedJSONState, usePersistedNumberState } from './usePersistedState';

export function useBibleNavigation() {
  const [selectedBook, setSelectedBook] = usePersistedJSONState<BookMetadata>(
    STORAGE_KEYS.SELECTED_BOOK,
    BIBLE_BOOKS[0]
  );

  const [selectedChapter, setSelectedChapter] = usePersistedNumberState(
    STORAGE_KEYS.SELECTED_CHAPTER,
    1
  );

  const [pickedBook, setPickedBook] = useState<BookMetadata | null>(null);
  const [pickedChapter, setPickedChapter] = useState<number | null>(null);
  const [showBookPicker, setShowBookPicker] = useState(false);
  const [showChapterPicker, setShowChapterPicker] = useState(false);
  const [showVersePicker, setShowVersePicker] = useState(false);
  const [pickerTab, setPickerTab] = useState<'OT' | 'NT'>('OT');
  const [availableVerses, setAvailableVerses] = useState<number>(30);

  const pickerSelectionRef = useRef<string>('');
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bookIndex = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
  const canGoPrev = selectedChapter > 1 || bookIndex > 0;
  const canGoNext = selectedChapter < selectedBook.chapters || bookIndex < BIBLE_BOOKS.length - 1;

  // Debounce wrapper — ignores rapid-fire navigation events within NAV_DEBOUNCE_MS.
  // The last call within a burst wins; earlier calls are silently dropped.
  const debounceNav = useCallback((fn: () => void) => {
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    navTimerRef.current = setTimeout(() => {
      fn();
      navTimerRef.current = null;
    }, NAV_DEBOUNCE_MS);
  }, []);

  const handlePrevChapter = useCallback(() => {
    debounceNav(() => {
      if (selectedChapter > 1) {
        setSelectedChapter(selectedChapter - 1);
      } else {
        const idx = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
        if (idx > 0) {
          const prev = BIBLE_BOOKS[idx - 1];
          setSelectedBook(prev);
          setSelectedChapter(prev.chapters);
        }
      }
    });
  }, [selectedBook, selectedChapter, setSelectedBook, setSelectedChapter, debounceNav]);

  const handleNextChapter = useCallback(() => {
    debounceNav(() => {
      if (selectedChapter < selectedBook.chapters) {
        setSelectedChapter(selectedChapter + 1);
      } else {
        const idx = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
        if (idx < BIBLE_BOOKS.length - 1) {
          const next = BIBLE_BOOKS[idx + 1];
          setSelectedBook(next);
          setSelectedChapter(1);
        }
      }
    });
  }, [selectedBook, selectedChapter, setSelectedBook, setSelectedChapter, debounceNav]);

  const handleSelectBookFromMenu = useCallback((book: BookMetadata) => {
    setPickedBook(book);
    setShowChapterPicker(true);
    setShowVersePicker(false);
  }, []);

  const handleSelectChapterFromMenu = useCallback(async (chapterNum: number, translationId: string) => {
    if (!pickedBook) return;
    const snapshotBook = pickedBook;
    const selectionKey = `${snapshotBook.id}_${chapterNum}`;
    pickerSelectionRef.current = selectionKey;
    setPickedChapter(chapterNum);
    setShowChapterPicker(false);
    setShowVersePicker(true);

    // Note: getVerses is called externally, this just updates the UI state
    // The caller should handle the actual verse loading
    return { book: snapshotBook, chapter: chapterNum, selectionKey };
  }, [pickedBook]);

  const handleSelectVerseFromMenu = useCallback((verseNum: number) => {
    if (!pickedBook || pickedChapter === null) return;
    setSelectedBook(pickedBook);
    setSelectedChapter(pickedChapter);
    setShowBookPicker(false);
    setShowChapterPicker(false);
    setShowVersePicker(false);
    setPickedBook(null);
    setPickedChapter(null);
    return { verse: verseNum };
  }, [pickedBook, pickedChapter, setSelectedBook, setSelectedChapter]);

  const openBookPicker = useCallback(() => {
    setPickedBook(selectedBook);
    setPickedChapter(selectedChapter);
    setShowBookPicker(true);
    setShowChapterPicker(true);
    setShowVersePicker(false);
  }, [selectedBook, selectedChapter]);

  const closeBookPicker = useCallback(() => {
    setShowBookPicker(false);
    setPickedBook(null);
    setPickedChapter(null);
    setShowChapterPicker(false);
    setShowVersePicker(false);
  }, []);

  // Swipe navigation (mobile)
  const handleReaderTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const handleReaderTouchEnd = useCallback((e: React.TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * SWIPE_RATIO) {
      if (dx < 0) handleNextChapter(); else handlePrevChapter();
    }
  }, [handleNextChapter, handlePrevChapter]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA' || t?.isContentEditable) return;
      if (e.key === 'ArrowLeft')  { e.preventDefault(); handlePrevChapter(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); handleNextChapter(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handlePrevChapter, handleNextChapter]);

  return {
    // State
    selectedBook,
    selectedChapter,
    pickedBook,
    pickedChapter,
    showBookPicker,
    showChapterPicker,
    showVersePicker,
    pickerTab,
    availableVerses,
    canGoPrev,
    canGoNext,
    bookIndex,

    // Setters
    setSelectedBook,
    setSelectedChapter,
    setPickedBook,
    setPickedChapter,
    setShowBookPicker,
    setShowChapterPicker,
    setShowVersePicker,
    setPickerTab,
    setAvailableVerses,

    // Handlers
    handlePrevChapter,
    handleNextChapter,
    handleSelectBookFromMenu,
    handleSelectChapterFromMenu,
    handleSelectVerseFromMenu,
    openBookPicker,
    closeBookPicker,
    handleReaderTouchStart,
    handleReaderTouchEnd,
  };
}
