/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Book,
  Menu,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Search,
  BookOpen,
  X,
  Eye,
  Bookmark,
  Flame,
  AlertCircle,
  Columns,
  Layers,
} from 'lucide-react';
import { BIBLE_BOOKS } from './bibleStructure';
import { getVerses } from './bibleLoader';
import { Verse, Highlight, Note, Bookmark as BookMarkType, ReaderSettings, BookMetadata } from './types';
import Sidebar from './components/Sidebar';
import ThemeSelector from './components/ThemeSelector';
import HighlightToolbar, { getHighlightClass } from './components/HighlightToolbar';
import ShareCardModal from './components/ShareCardModal';
import LanguagesGuideModal from './components/LanguagesGuideModal';
import { motion, AnimatePresence } from 'motion/react';

const TRANSLATIONS = [
  { id: 'web', name: 'World English Bible (WEB)',    short: 'WEB' },
  { id: 'kjv', name: 'King James Version (KJV)',      short: 'KJV' },
  { id: 'lsg', name: 'Louis Segond 1910 (French)',    short: 'LSG' },
  { id: 'yor', name: 'Bibeli Mimo (Yoruba)',           short: 'YOR' },
  { id: 'ibo', name: 'Biblia Nso (Igbo)',              short: 'IBO' },
  { id: 'hau', name: 'Littafi Mai Tsarki (Hausa)',    short: 'HAU' },
  { id: 'twi', name: 'Twi Asante Bible',               short: 'TWI' },
  { id: 'pcm', name: 'Nigerian Pidgin Bible',          short: 'PCM' },
];

export default function App() {
  // --- Navigation state (persisted) ---
  const [selectedBook, setSelectedBook] = useState<BookMetadata>(() => {
    const raw = localStorage.getItem('bible_selected_book');
    if (raw) {
      try {
        const obj = JSON.parse(raw);
        const found = BIBLE_BOOKS.find(b => b.id === obj.id);
        if (found) return found;
      } catch (_) {}
    }
    return BIBLE_BOOKS[0];
  });

  const [selectedChapter, setSelectedChapter] = useState<number>(() => {
    const raw = localStorage.getItem('bible_selected_chapter');
    return raw ? parseInt(raw, 10) || 1 : 1;
  });

  // --- Reader state ---
  const [verses, setVerses]           = useState<Verse[]>([]);
  const [loading, setLoading]         = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // --- Settings (persisted) ---
  const [settings, setSettings] = useState<ReaderSettings>(() => {
    const raw = localStorage.getItem('bible_reader_settings');
    if (raw) {
      try { return JSON.parse(raw); } catch (_) {}
    }
    return {
      translation: 'web',
      fontSize: 'lg',
      fontFamily: 'serif',
      lineHeight: 'relaxed',
      zenMode: false,
      theme: 'sepia',
    };
  });

  // --- Study data ---
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [notes, setNotes]           = useState<Note[]>([]);
  const [bookmarks, setBookmarks]   = useState<BookMarkType[]>([]);

  // --- Comparison ---
  const [isComparing, setIsComparing]           = useState<boolean>(() => localStorage.getItem('bible_is_comparing') === 'true');
  const [compareTranslation, setCompareTranslation] = useState<string>(() => localStorage.getItem('bible_compare_translation') || 'kjv');
  const [compareLayout, setCompareLayout]       = useState<'side-by-side' | 'interlinear'>(() => (localStorage.getItem('bible_compare_layout') as any) || 'side-by-side');
  const [compareVerses, setCompareVerses]       = useState<Verse[]>([]);
  const [compareLoading, setCompareLoading]     = useState<boolean>(false);
  const [compareError, setCompareError]         = useState<string | null>(null);

  // --- UI toggles ---
  const [showSettings, setShowSettings]           = useState(false);
  const [showSidebar, setShowSidebar]             = useState(false);
  const [showShareCard, setShowShareCard]         = useState(false);
  const [showLanguagesList, setShowLanguagesList] = useState(false);
  const [showBookPicker, setShowBookPicker]       = useState(false);
  const [pickerTab, setPickerTab]                 = useState<'OT' | 'NT'>('OT');
  const [showChapterPicker, setShowChapterPicker] = useState(false);
  const [pickedBook, setPickedBook]               = useState<BookMetadata | null>(null);
  const [showVersePicker, setShowVersePicker]     = useState(false);
  const [pickedChapter, setPickedChapter]         = useState<number | null>(null);
  const [availableVerses, setAvailableVerses]     = useState<number>(30);

  // --- Selection & search ---
  const [selectedVerses, setSelectedVerses] = useState<Verse[]>([]);
  const [activeSearch, setActiveSearch]     = useState('');
  const [searchHistory, setSearchHistory]   = useState<string[]>(() => {
    const raw = localStorage.getItem('bible_search_history');
    try { return raw ? JSON.parse(raw) : ['faith', 'love', 'grace', 'beginning', 'light']; } catch { return []; }
  });
  const [searchFocused, setSearchFocused] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const headerRef          = useRef<HTMLDivElement>(null);

  // ── Persist navigation ──────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('bible_selected_book', JSON.stringify(selectedBook));
    localStorage.setItem('bible_selected_chapter', String(selectedChapter));
  }, [selectedBook, selectedChapter]);

  useEffect(() => { localStorage.setItem('bible_is_comparing', String(isComparing)); }, [isComparing]);
  useEffect(() => { localStorage.setItem('bible_compare_translation', compareTranslation); }, [compareTranslation]);
  useEffect(() => { localStorage.setItem('bible_compare_layout', compareLayout); }, [compareLayout]);
  useEffect(() => { localStorage.setItem('bible_search_history', JSON.stringify(searchHistory)); }, [searchHistory]);

  // ── Load study data on mount ────────────────────────────────────────────────
  useEffect(() => {
    const raw = localStorage.getItem('bible_highlights');
    if (raw) { try { setHighlights(JSON.parse(raw)); } catch (_) {} }

    const rawN = localStorage.getItem('bible_notes');
    if (rawN) { try { setNotes(JSON.parse(rawN)); } catch (_) {} }

    const rawB = localStorage.getItem('bible_bookmarks');
    if (rawB) { try { setBookmarks(JSON.parse(rawB)); } catch (_) {} }
  }, []);

  const handleUpdateSettings = (updates: Partial<ReaderSettings>) => {
    const next = { ...settings, ...updates };
    setSettings(next);
    localStorage.setItem('bible_reader_settings', JSON.stringify(next));
  };

  // ── Primary verse loader ────────────────────────────────────────────────────
  useEffect(() => {
    let active = true;
    setLoading(true);
    setErrorStatus(null);
    setSelectedVerses([]);

    getVerses(settings.translation, selectedBook.id, selectedBook.name, selectedChapter)
      .then(result => {
        if (!active) return;
        if (result && result.length > 0) {
          setVerses(result);
        } else {
          setVerses([]);
          setErrorStatus(`${selectedBook.name} ${selectedChapter} is not available in the ${TRANSLATIONS.find(t => t.id === settings.translation)?.short || settings.translation.toUpperCase()} translation.`);
        }
      })
      .catch(() => {
        if (!active) return;
        setVerses([]);
        setErrorStatus('Could not load this chapter. Please check your connection and try again.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [selectedBook, selectedChapter, settings.translation]);

  // ── Comparison loader ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isComparing) { setCompareVerses([]); setCompareError(null); return; }
    let active = true;
    setCompareLoading(true);
    setCompareError(null);

    getVerses(compareTranslation, selectedBook.id, selectedBook.name, selectedChapter)
      .then(result => {
        if (!active) return;
        if (result && result.length > 0) setCompareVerses(result);
        else setCompareError('Not available in this translation.');
      })
      .catch(() => {
        if (active) setCompareError('Could not load comparison translation.');
      })
      .finally(() => {
        if (active) setCompareLoading(false);
      });

    return () => { active = false; };
  }, [selectedBook, selectedChapter, compareTranslation, isComparing]);

  // ── Outside click for search ────────────────────────────────────────────────
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // ── Navigation helpers ──────────────────────────────────────────────────────
  const handlePrevChapter = useCallback(() => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
      if (idx > 0) { const prev = BIBLE_BOOKS[idx - 1]; setSelectedBook(prev); setSelectedChapter(prev.chapters); }
    }
  }, [selectedBook, selectedChapter]);

  const handleNextChapter = useCallback(() => {
    if (selectedChapter < selectedBook.chapters) {
      setSelectedChapter(selectedChapter + 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
      if (idx < BIBLE_BOOKS.length - 1) { const next = BIBLE_BOOKS[idx + 1]; setSelectedBook(next); setSelectedChapter(1); }
    }
  }, [selectedBook, selectedChapter]);

  // ── Keyboard navigation ─────────────────────────────────────────────────────
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

  const handleNavigateSidebar = (bookId: string, chapter: number, verse?: number) => {
    const book = BIBLE_BOOKS.find(b => b.id === bookId);
    if (!book) return;
    setSelectedBook(book);
    setSelectedChapter(chapter);
    setShowSidebar(false);
    if (verse) {
      setTimeout(() => {
        const el = document.getElementById(`verse-line-${verse}`);
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('ring-2', 'ring-amber-500/40', 'rounded-lg'); setTimeout(() => el.classList.remove('ring-2', 'ring-amber-500/40', 'rounded-lg'), 3000); }
      }, 800);
    }
  };

  // ── Book / chapter picker ───────────────────────────────────────────────────
  const handleSelectBookFromMenu = (book: BookMetadata) => {
    setPickedBook(book);
    setShowChapterPicker(true);
    setShowVersePicker(false);
  };

  const handleSelectChapterFromMenu = async (chapterNum: number) => {
    if (!pickedBook) return;
    const snapshotBook = pickedBook; // capture before any state update
    setPickedChapter(chapterNum);
    setShowChapterPicker(false);
    setShowVersePicker(true);
    // Determine verse count; guard against rapid chapter clicks racing
    const result = await getVerses(settings.translation, snapshotBook.id, snapshotBook.name, chapterNum);
    // Only apply if the picker hasn't moved on to a different chapter
    setPickedChapter(prev => {
      if (prev === chapterNum) setAvailableVerses(result ? result.length : 30);
      return prev;
    });
  };

  const handleSelectVerseFromMenu = (verseNum: number) => {
    if (!pickedBook || pickedChapter === null) return;
    setSelectedBook(pickedBook);
    setSelectedChapter(pickedChapter);
    setShowBookPicker(false);
    setShowChapterPicker(false);
    setShowVersePicker(false);
    setPickedBook(null);
    setPickedChapter(null);
    setTimeout(() => {
      const el = document.getElementById(`verse-line-${verseNum}`);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('ring-2', 'ring-amber-500/50', 'bg-amber-500/10', 'rounded', 'px-1'); setTimeout(() => el.classList.remove('ring-2', 'ring-amber-500/50', 'bg-amber-500/10', 'rounded', 'px-1'), 3500); }
    }, 700);
  };

  // ── Highlights ──────────────────────────────────────────────────────────────
  const handleApplyHighlight = (color: string) => {
    const newHL = [...highlights];
    selectedVerses.forEach(v => {
      const id = `${settings.translation}_${v.book_id}_${v.chapter}_${v.verse}`;
      const filtered = newHL.filter(h => h.id !== id);
      filtered.push({ id, book_id: v.book_id, book_name: v.book_name, chapter: v.chapter, verse: v.verse, color, createdAt: Date.now() });
      newHL.splice(0, newHL.length, ...filtered);
    });
    setHighlights(newHL);
    localStorage.setItem('bible_highlights', JSON.stringify(newHL));
    setSelectedVerses([]);
  };

  const handleRemoveHighlight = () => {
    let updated = [...highlights];
    selectedVerses.forEach(v => {
      const id = `${settings.translation}_${v.book_id}_${v.chapter}_${v.verse}`;
      updated = updated.filter(h => h.id !== id);
    });
    setHighlights(updated);
    localStorage.setItem('bible_highlights', JSON.stringify(updated));
    setSelectedVerses([]);
  };

  const handleDeleteHighlightById = (id: string) => {
    const updated = highlights.filter(h => h.id !== id);
    setHighlights(updated);
    localStorage.setItem('bible_highlights', JSON.stringify(updated));
  };

  // ── Notes ───────────────────────────────────────────────────────────────────
  const handleSaveNote = (text: string) => {
    if (selectedVerses.length === 0) return;
    const v = [...selectedVerses].sort((a, b) => a.verse - b.verse)[0];
    const id = `${v.book_id}_${v.chapter}_${v.verse}`;
    const updated = notes.filter(n => n.id !== id);
    if (text.trim()) updated.push({ id, book_id: v.book_id, book_name: v.book_name, chapter: v.chapter, verse: v.verse, text, createdAt: Date.now() });
    setNotes(updated);
    localStorage.setItem('bible_notes', JSON.stringify(updated));
    setSelectedVerses([]);
  };

  const handleDeleteNoteById = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('bible_notes', JSON.stringify(updated));
  };

  // ── Bookmarks ───────────────────────────────────────────────────────────────
  const isCurrentChapterBookmarked = () => bookmarks.some(bm => bm.id === `bookmark_${selectedBook.id}_${selectedChapter}`);

  const handleToggleBookmark = () => {
    const id = `bookmark_${selectedBook.id}_${selectedChapter}`;
    const updated = bookmarks.some(bm => bm.id === id)
      ? bookmarks.filter(bm => bm.id !== id)
      : [...bookmarks, { id, book_id: selectedBook.id, book_name: selectedBook.name, chapter: selectedChapter, createdAt: Date.now() }];
    setBookmarks(updated);
    localStorage.setItem('bible_bookmarks', JSON.stringify(updated));
  };

  const handleDeleteBookmarkById = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('bible_bookmarks', JSON.stringify(updated));
  };

  // ── Search ──────────────────────────────────────────────────────────────────
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const q = activeSearch.trim();
      if (q && !searchHistory.includes(q)) setSearchHistory(prev => [q, ...prev].slice(0, 8));
      setSearchFocused(false);
    }
  };

  const handleSelectSearchQuery = (term: string) => {
    setActiveSearch(term);
    if (!searchHistory.includes(term)) setSearchHistory(prev => [term, ...prev.filter(x => x !== term)].slice(0, 8));
    setSearchFocused(false);
  };

  const getAutocompleteSuggestions = () => {
    const q = activeSearch.trim().toLowerCase();
    if (!q) return { books: [], verses: [], topics: ['faith', 'love', 'grace', 'light', 'salvation', 'wisdom', 'peace', 'joy'], history: searchHistory };
    return {
      books:   BIBLE_BOOKS.filter(b => b.name.toLowerCase().includes(q) || b.id.toLowerCase().includes(q)).slice(0, 4),
      verses:  verses.filter(v => v.text.toLowerCase().includes(q)).slice(0, 5),
      topics:  [],
      history: searchHistory.filter(h => h.toLowerCase().includes(q) && h.toLowerCase() !== q),
    };
  };

  const getFilteredVerses = () => {
    if (!activeSearch.trim()) return verses;
    return verses.filter(v => v.text.toLowerCase().includes(activeSearch.toLowerCase()));
  };

  // ── Theme helpers ───────────────────────────────────────────────────────────
  const getBodyFontFamilyClass = () => {
    switch (settings.fontFamily) { case 'serif': return 'font-serif tracking-normal'; case 'mono': return 'font-mono tracking-tight'; default: return 'font-sans tracking-tight'; }
  };
  const getFontSizeClass = () => {
    switch (settings.fontSize) { case 'sm': return 'text-sm'; case 'md': return 'text-base'; case 'xl': return 'text-xl'; case '2xl': return 'text-2xl'; case '3xl': return 'text-3xl'; default: return 'text-lg'; }
  };
  const getLineHeightClass = () => {
    switch (settings.lineHeight) { case 'tight': return 'leading-snug space-y-3'; case 'normal': return 'leading-normal space-y-4'; case 'loose': return 'leading-loose space-y-7'; default: return 'leading-relaxed space-y-5'; }
  };
  const getThemeContainerClass = () => {
    switch (settings.theme) { case 'light': return 'bg-[#FAFAFA] text-zinc-900 border-zinc-200'; case 'dark': return 'bg-[#1C1C24] text-zinc-200 border-zinc-900'; case 'charcoal': return 'bg-[#0B0B0E] text-zinc-400 border-zinc-950'; default: return 'bg-[#F4ECD8] text-[#362719] border-[#E5DAC3]'; }
  };
  const getThemeOuterClass = () => {
    switch (settings.theme) { case 'light': return 'bg-zinc-100 min-h-screen'; case 'dark': return 'bg-zinc-950 min-h-screen'; case 'charcoal': return 'bg-[#000000] min-h-screen'; default: return 'bg-[#EADFCA] min-h-screen'; }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={`transition-colors duration-200 ${getThemeOuterClass()} flex flex-col font-sans select-none relative overflow-x-hidden`}>

      {/* Zen exit bar */}
      {settings.zenMode && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <button onClick={() => handleUpdateSettings({ zenMode: false })} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900/80 text-white hover:bg-zinc-900/90 shadow-lg text-xs font-sans tracking-wide cursor-pointer transition active:scale-95">
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Exit Zen Mode</span>
          </button>
        </div>
      )}

      {/* Header */}
      {!settings.zenMode && (
        <header ref={headerRef} className="sticky top-0 bg-white/95 dark:bg-zinc-900/95 border-b border-zinc-200 dark:border-zinc-800 z-30 transition-colors duration-200">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

            {/* Left: menu + brand */}
            <div className="flex items-center gap-2.5">
              <button onClick={() => setShowSidebar(true)} className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition" title="Study Hub">
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => { setSelectedBook(BIBLE_BOOKS[0]); setSelectedChapter(1); }}>
                <BookOpen className="w-5 h-5 text-amber-500" />
                <h1 className="font-sans font-bold tracking-tight text-xs sm:text-sm bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                  WordUp Africa Bible Reader
                </h1>
              </div>
            </div>

            {/* Center: navigation + translation pickers */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => { setPickedBook(selectedBook); setPickedChapter(selectedChapter); setShowBookPicker(true); setShowChapterPicker(true); setShowVersePicker(false); }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 font-sans font-bold text-xs bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 uppercase tracking-widest transition"
              >
                <span>{selectedBook.name} {selectedChapter}</span>
                <span className="text-[9px] text-zinc-400">▼</span>
              </button>

              <div className="relative flex items-center gap-1.5">
                <div className="relative flex items-center">
                  <select
                    value={settings.translation}
                    onChange={e => handleUpdateSettings({ translation: e.target.value })}
                    className="appearance-none font-sans font-bold text-[10px] pl-3 pr-7 py-1.5 bg-amber-500/10 dark:bg-amber-400/5 text-amber-600 dark:text-amber-400 border-0 rounded-full hover:bg-amber-500/15 cursor-pointer outline-none uppercase tracking-wider"
                  >
                    {TRANSLATIONS.map(t => (
                      <option key={t.id} value={t.id} className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-sans">
                        {t.short}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[8px] text-amber-600 dark:text-amber-400 pointer-events-none">▼</span>
                </div>

                <button
                  onClick={() => setShowLanguagesList(true)}
                  className="p-1 px-2 rounded-full bg-amber-500/10 dark:bg-amber-400/5 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-sans font-semibold transition cursor-pointer"
                  title="Translation guide"
                >
                  <span className="text-[9px]">ℹ</span> Langs
                </button>

                <button
                  onClick={() => setIsComparing(!isComparing)}
                  className={`p-1 px-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider transition flex items-center gap-1 cursor-pointer ${isComparing ? 'bg-amber-500 text-zinc-950 shadow-sm' : 'bg-amber-500/10 dark:bg-amber-400/5 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400'}`}
                  title="Compare translations"
                >
                  <Columns className="w-3 h-3" />
                  <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                </button>
              </div>
            </div>

            {/* Right: controls */}
            <div className="flex items-center gap-1 relative">
              <button onClick={() => handleUpdateSettings({ zenMode: true })} className="p-2 rounded-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition" title="Zen mode">
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-xl transition ${showSettings ? 'bg-amber-500/15 text-amber-600' : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                title="Display settings"
              >
                <SlidersHorizontal className="w-[18px] h-[18px]" />
              </button>
              <ThemeSelector settings={settings} onUpdateSettings={handleUpdateSettings} isOpen={showSettings} onClose={() => setShowSettings(false)} />
            </div>
          </div>
        </header>
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        highlights={highlights}
        notes={notes}
        bookmarks={bookmarks}
        onDeleteHighlight={handleDeleteHighlightById}
        onDeleteNote={handleDeleteNoteById}
        onDeleteBookmark={handleDeleteBookmarkById}
        onNavigateTo={handleNavigateSidebar}
      />

      {/* Main content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 my-6 md:my-10 relative">
        <div className={`rounded-3xl p-6 sm:p-9 md:p-11 shadow-lg transition-colors border ${getThemeContainerClass()} ${settings.zenMode ? 'my-2 md:my-6 rounded-2xl' : ''}`}>

          {/* Chapter header */}
          <div className="flex items-center justify-between pb-4 border-b border-current/15 mb-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 font-mono">
                {TRANSLATIONS.find(t => t.id === settings.translation)?.name}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
                {selectedBook.name} {selectedChapter}
              </h2>
            </div>
            {!settings.zenMode && (
              <button onClick={handleToggleBookmark} className="p-2 py-1 flex items-center gap-1 bg-current/5 hover:bg-current/10 rounded-full transition text-xs font-semibold" title="Bookmark">
                <Bookmark className={`w-4 h-4 ${isCurrentChapterBookmarked() ? 'fill-amber-500 text-amber-500' : 'opacity-70'}`} />
                <span className="text-[10px] uppercase font-mono mr-1">{isCurrentChapterBookmarked() ? 'Saved' : 'Bookmark'}</span>
              </button>
            )}
          </div>

          {/* Search bar */}
          {!settings.zenMode && verses.length > 0 && (
            <div className="mb-6 relative flex flex-col w-full" ref={searchContainerRef}>
              <div className="relative flex items-center w-full">
                <Search className="w-4 h-4 text-current/50 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder={`Search in ${selectedBook.name} ${selectedChapter}...`}
                  value={activeSearch}
                  onChange={e => { setActiveSearch(e.target.value); setSearchFocused(true); }}
                  onFocus={() => setSearchFocused(true)}
                  onKeyDown={handleSearchKeyPress}
                  className="w-full bg-current/5 p-2 py-1.5 pl-9 pr-8 rounded-xl border-0 focus:ring-1 focus:ring-amber-500/20 text-xs font-sans outline-none text-current"
                />
                {activeSearch && (
                  <button onClick={() => { setActiveSearch(''); setSearchFocused(false); }} className="absolute right-3 p-0.5 rounded hover:bg-zinc-400/20 text-xs text-rose-500 font-bold font-mono">✕</button>
                )}
              </div>

              {searchFocused && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl z-40 max-h-[45vh] overflow-y-auto text-xs text-zinc-700 dark:text-zinc-200 p-2 space-y-4">
                  {(() => {
                    const data = getAutocompleteSuggestions();
                    if (!data.books.length && !data.verses.length && !data.topics.length && !data.history.length) {
                      return <div className="text-center py-5 opacity-60 italic font-mono text-[10px]">No matches. Press Enter to search.</div>;
                    }
                    return (
                      <div className="space-y-3.5">
                        {data.books.length > 0 && (
                          <div>
                            <div className="px-2 pb-1.5 text-[9px] font-mono font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 select-none">Go to Book</div>
                            <div className="grid grid-cols-2 gap-1.5 px-1">
                              {data.books.map(b => (
                                <button key={b.id} onClick={() => { setSelectedBook(b); setSelectedChapter(1); setActiveSearch(''); setSearchFocused(false); }} className="flex items-center gap-1.5 p-2 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-amber-500/10 text-left transition text-xs font-bold cursor-pointer">
                                  {b.name} <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">{b.testament}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {data.verses.length > 0 && (
                          <div>
                            <div className="px-2 pb-1 text-[9px] font-mono font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 select-none">Matches in This Chapter</div>
                            <div className="space-y-1 mt-1 px-1">
                              {data.verses.map(v => (
                                <button key={v.verse} onClick={() => { handleToggleVerseSelection(v); document.getElementById(`verse-line-${v.verse}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setSearchFocused(false); }} className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 hover:bg-amber-500/10 text-left transition flex items-start gap-2 border border-transparent cursor-pointer">
                                  <sup className="text-[9px] font-black text-amber-600 mt-1 select-none">{v.verse}</sup>
                                  <p className="line-clamp-2 text-zinc-800 dark:text-zinc-200 leading-tight">{v.text.trim()}</p>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {data.history.length > 0 && (
                          <div>
                            <div className="px-2 pb-1 text-[9px] font-mono font-black uppercase tracking-wider text-zinc-400 flex items-center justify-between select-none">
                              <span>Recent Searches</span>
                              <button onClick={e => { e.stopPropagation(); setSearchHistory([]); }} className="text-[9px] hover:underline hover:text-rose-500 font-mono font-extrabold cursor-pointer p-0.5">Clear</button>
                            </div>
                            <div className="flex flex-wrap gap-1.5 px-2 mt-1.5">
                              {data.history.map((term, i) => (
                                <button key={term + i} onClick={() => handleSelectSearchQuery(term)} className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500/20 transition cursor-pointer">{term}</button>
                              ))}
                            </div>
                          </div>
                        )}
                        {data.topics.length > 0 && (
                          <div>
                            <div className="px-2 pb-1 text-[9px] font-mono font-black uppercase tracking-wider text-zinc-400 select-none">Popular Topics</div>
                            <div className="flex flex-wrap gap-1.5 px-2 mt-1.5">
                              {data.topics.map(topic => (
                                <button key={topic} onClick={() => handleSelectSearchQuery(topic)} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-zinc-50 dark:bg-zinc-950 hover:bg-amber-500/25 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/30 transition cursor-pointer capitalize">{topic}</button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-4 py-8 animate-pulse">
              {[0.67, 0.8, 0.75, 0.92, 0.83].map((w, i) => (
                <div key={i} className="h-4 bg-current/10 rounded-full" style={{ width: `${w * 100}%` }} />
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && errorStatus && (
            <div className="text-center py-10">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3.5" />
              <p className="text-sm font-semibold mb-2">{errorStatus}</p>
              <p className="text-xs opacity-60 max-w-sm mx-auto mb-6">
                Try a different translation using the selector above.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <button onClick={() => handleUpdateSettings({ translation: 'web' })} className="py-2.5 px-4 bg-current/5 rounded-xl text-xs font-bold hover:bg-current/10 transition cursor-pointer">
                  Switch to WEB
                </button>
                <button onClick={() => handleUpdateSettings({ translation: 'kjv' })} className="py-2.5 px-4 bg-current/5 rounded-xl text-xs font-bold hover:bg-current/10 transition cursor-pointer">
                  Switch to KJV
                </button>
              </div>
            </div>
          )}

          {/* Verse content */}
          {!loading && !errorStatus && (
            <div>
              {/* Comparison controls */}
              {isComparing && (
                <div className="mb-6 p-4 bg-current/5 border border-current/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest text-[9px] font-mono bg-amber-500/15 px-2 py-0.5 rounded-full">Comparison Lens</span>
                    <span className="font-semibold text-current opacity-80">Compare {TRANSLATIONS.find(t => t.id === settings.translation)?.short} with:</span>
                    <div className="relative">
                      <select value={compareTranslation} onChange={e => setCompareTranslation(e.target.value)} className="appearance-none font-bold text-[10px] pl-2.5 pr-6 py-1 bg-current/10 hover:bg-current/15 text-current border-0 rounded-lg cursor-pointer outline-none uppercase tracking-wider text-xs">
                        {TRANSLATIONS.map(t => (
                          <option key={t.id} value={t.id} disabled={t.id === settings.translation} className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-sans">{t.name}</option>
                        ))}
                      </select>
                      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[7px] opacity-75 pointer-events-none">▼</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto select-none">
                    <div className="flex bg-current/5 p-0.5 rounded-lg border border-current/10">
                      <button onClick={() => setCompareLayout('side-by-side')} className={`px-2 py-1 rounded text-[10px] font-bold transition flex items-center gap-1 shrink-0 cursor-pointer ${compareLayout === 'side-by-side' ? 'bg-amber-500 text-zinc-950 font-black' : 'opacity-65 hover:opacity-100'}`}>
                        <Columns className="w-2.5 h-2.5" /><span>Side-by-Side</span>
                      </button>
                      <button onClick={() => setCompareLayout('interlinear')} className={`px-2 py-1 rounded text-[10px] font-bold transition flex items-center gap-1 shrink-0 cursor-pointer ${compareLayout === 'interlinear' ? 'bg-amber-500 text-zinc-950 font-black' : 'opacity-65 hover:opacity-100'}`}>
                        <Layers className="w-2.5 h-2.5" /><span>Interlinear</span>
                      </button>
                    </div>
                    <button onClick={() => setIsComparing(false)} className="p-1 px-2 border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 rounded-lg transition text-[10px] font-bold cursor-pointer">✕ Close</button>
                  </div>
                </div>
              )}

              {/* Verse display — single column */}
              {!isComparing && (
                <div className={`${getBodyFontFamilyClass()} ${getFontSizeClass()} ${getLineHeightClass()} text-left`}>
                  {getFilteredVerses().length === 0 ? (
                    <div className="text-center py-10 opacity-60 text-xs">No verses matching "{activeSearch}".</div>
                  ) : (
                    getFilteredVerses().map(verse => {
                      const isSelected = selectedVerses.some(v => v.verse === verse.verse);
                      const hlId = `${settings.translation}_${verse.book_id}_${verse.chapter}_${verse.verse}`;
                      const hlObj = highlights.find(h => h.id === hlId);
                      const hlClass = hlObj ? getHighlightClass(hlObj.color) : '';
                      const hasNote = notes.some(n => n.id === `${verse.book_id}_${verse.chapter}_${verse.verse}`);
                      return (
                        <span
                          key={verse.verse}
                          id={`verse-line-${verse.verse}`}
                          onClick={() => handleToggleVerseSelection(verse)}
                          className={`inline-block mr-1 rounded-md cursor-pointer hover:bg-amber-500/10 transition-all ${isSelected ? 'ring-2 ring-amber-500/40 bg-amber-500/5' : ''} ${hlClass}`}
                        >
                          <sup className="text-[10px] font-sans font-bold text-amber-600/80 mr-1 select-none">{verse.verse}</sup>
                          <span className="font-medium mr-1.5 selection:bg-amber-100">{verse.text.trim()}</span>
                          {hasNote && <span className="inline-block px-1 ml-0.5 bg-amber-500/25 rounded text-[9px] font-bold text-amber-700 dark:text-amber-400 font-sans align-middle">✎ NOTE</span>}
                        </span>
                      );
                    })
                  )}
                </div>
              )}

              {/* Verse display — comparison */}
              {isComparing && (
                <div className={`${getBodyFontFamilyClass()} ${getFontSizeClass()} text-left`}>
                  {getFilteredVerses().length === 0 ? (
                    <div className="text-center py-10 opacity-60 text-xs">No verses matching "{activeSearch}".</div>
                  ) : compareLayout === 'side-by-side' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 pb-2 border-b border-current/15 uppercase font-mono text-[10px] font-black opacity-65 tracking-widest hidden md:grid select-none">
                        <div>Primary: {TRANSLATIONS.find(t => t.id === settings.translation)?.name}</div>
                        <div>Comparison: {TRANSLATIONS.find(t => t.id === compareTranslation)?.name}</div>
                      </div>
                      {getFilteredVerses().map(verse => {
                        const isSelected = selectedVerses.some(v => v.verse === verse.verse);
                        const hlId = `${settings.translation}_${verse.book_id}_${verse.chapter}_${verse.verse}`;
                        const hlObj = highlights.find(h => h.id === hlId);
                        const hlClass = hlObj ? getHighlightClass(hlObj.color) : '';
                        const hasNote = notes.some(n => n.id === `${verse.book_id}_${verse.chapter}_${verse.verse}`);
                        const cmpVerse = compareVerses.find(cv => cv.verse === verse.verse);
                        return (
                          <div key={verse.verse} id={`verse-line-${verse.verse}`} onClick={() => handleToggleVerseSelection(verse)} className={`grid grid-cols-1 md:grid-cols-2 gap-4 py-3 px-3.5 border-b border-dashed border-current/10 rounded-2xl transition cursor-pointer hover:bg-amber-500/5 ${isSelected ? 'ring-2 ring-amber-500/40 bg-amber-500/5' : ''} ${hlClass}`}>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 opacity-60 text-[10px] font-mono font-bold uppercase select-none md:hidden"><span>{TRANSLATIONS.find(t => t.id === settings.translation)?.short}</span></div>
                              <div><sup className="text-[10px] font-sans font-black text-amber-600/80 mr-1.5 select-none">{verse.verse}</sup><span className="font-medium">{verse.text.trim()}</span>{hasNote && <span className="inline-block px-1 ml-1.5 bg-amber-500/25 rounded text-[9px] font-bold text-amber-700 dark:text-amber-400 font-sans align-middle">✎ NOTE</span>}</div>
                            </div>
                            <div className="space-y-1 border-t md:border-t-0 border-current/10 pt-2.5 md:pt-0 opacity-90">
                              <div className="flex items-center gap-1.5 opacity-60 text-[10px] font-mono font-bold uppercase select-none md:hidden"><span>{TRANSLATIONS.find(t => t.id === compareTranslation)?.short}</span></div>
                              <div><sup className="text-[10px] font-sans font-black text-amber-600/80 mr-1.5 select-none">{verse.verse}</sup>
                                {compareLoading ? <span className="text-xs opacity-55 animate-pulse font-sans italic">Loading...</span>
                                  : compareError ? <span className="text-xs text-rose-500 font-sans italic">Not available</span>
                                  : cmpVerse ? <span>{cmpVerse.text.trim()}</span>
                                  : <span className="text-xs opacity-40 font-sans italic">Verse missing</span>}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {getFilteredVerses().map(verse => {
                        const isSelected = selectedVerses.some(v => v.verse === verse.verse);
                        const hlId = `${settings.translation}_${verse.book_id}_${verse.chapter}_${verse.verse}`;
                        const hlObj = highlights.find(h => h.id === hlId);
                        const hlClass = hlObj ? getHighlightClass(hlObj.color) : '';
                        const hasNote = notes.some(n => n.id === `${verse.book_id}_${verse.chapter}_${verse.verse}`);
                        const cmpVerse = compareVerses.find(cv => cv.verse === verse.verse);
                        return (
                          <div key={verse.verse} id={`verse-line-${verse.verse}`} onClick={() => handleToggleVerseSelection(verse)} className={`py-3.5 px-4 border-b border-dashed border-current/10 rounded-2xl transition cursor-pointer hover:bg-amber-500/5 space-y-2.5 ${isSelected ? 'ring-2 ring-amber-500/40 bg-amber-500/5' : ''} ${hlClass}`}>
                            <div className="flex items-center justify-between select-none border-b border-current/5 pb-1">
                              <span className="text-xs font-black font-sans text-amber-600 flex items-center gap-1">
                                <span className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-[10px]">{verse.verse}</span>
                                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Verse</span>
                              </span>
                              {hasNote && <span className="inline-block px-1.5 py-0.5 bg-amber-500/25 rounded text-[9px] font-bold text-amber-700 dark:text-amber-400 font-sans">✎ Linked Note</span>}
                            </div>
                            <div className="pl-4 border-l-2 border-amber-500/40 py-0.5">
                              <span className="text-[9px] uppercase font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded font-black mr-2 tracking-wider inline-block mb-1 select-none">{TRANSLATIONS.find(t => t.id === settings.translation)?.short}</span>
                              <p className="leading-relaxed text-current font-medium">{verse.text.trim()}</p>
                            </div>
                            <div className="pl-4 border-l-2 border-current/25 py-0.5 opacity-90">
                              <span className="text-[9px] uppercase font-mono bg-current/10 px-1.5 py-0.5 rounded font-black mr-2 tracking-wider inline-block mb-1 select-none">{TRANSLATIONS.find(t => t.id === compareTranslation)?.short}</span>
                              {compareLoading ? <p className="text-xs opacity-55 animate-pulse font-sans italic">Loading translation...</p>
                                : compareError ? <p className="text-xs text-rose-500 font-sans italic">Not available in this version.</p>
                                : cmpVerse ? <p className="leading-relaxed">{cmpVerse.text.trim()}</p>
                                : <p className="text-xs opacity-40 font-sans italic">Not found</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation controls */}
          {!settings.zenMode && (
            <div className="flex items-center justify-between border-t border-current/10 pt-6 mt-8">
              <button onClick={handlePrevChapter} className="flex items-center gap-1.5 py-2 px-3 hover:bg-current/5 rounded-xl transition text-xs font-semibold text-zinc-500">
                <ChevronLeft className="w-4 h-4" /><span>Prev Chapter</span>
              </button>
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-60 font-mono">{selectedBook.name} {selectedChapter} / {selectedBook.chapters}</div>
              <button onClick={handleNextChapter} className="flex items-center gap-1.5 py-2 px-3 hover:bg-current/5 rounded-xl transition text-xs font-semibold text-zinc-500">
                <span>Next Chapter</span><ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating toolbar */}
      <HighlightToolbar
        selectedVerses={selectedVerses}
        onClearSelection={() => setSelectedVerses([])}
        onApplyHighlight={handleApplyHighlight}
        onRemoveHighlight={handleRemoveHighlight}
        onOpenShareCard={() => setShowShareCard(true)}
        onSaveNote={handleSaveNote}
        existingNoteText={selectedVerses.length > 0 ? notes.find(n => n.id === `${selectedVerses[0].book_id}_${selectedVerses[0].chapter}_${selectedVerses[0].verse}`)?.text || '' : ''}
        isBookmarked={isCurrentChapterBookmarked()}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Share card modal */}
      <ShareCardModal isOpen={showShareCard} onClose={() => setShowShareCard(false)} selectedVerses={selectedVerses} translation={settings.translation} />

      {/* Languages guide modal */}
      <AnimatePresence>
        {showLanguagesList && (
          <LanguagesGuideModal
            isOpen={showLanguagesList}
            onClose={() => setShowLanguagesList(false)}
            activeTranslation={settings.translation}
            onSelectTranslation={id => handleUpdateSettings({ translation: id })}
            availableIds={TRANSLATIONS.map(t => t.id)}
          />
        )}
      </AnimatePresence>

      {/* Book picker overlay */}
      {showBookPicker && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-2xl h-[80vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-sans font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Book className="w-4 h-4 text-amber-500" />Select Navigation Point
              </h3>
              <button onClick={() => { setShowBookPicker(false); setPickedBook(null); setPickedChapter(null); setShowChapterPicker(false); setShowVersePicker(false); }} className="p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800"><X className="w-5 h-5 text-zinc-500" /></button>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-150 dark:border-zinc-800 text-xs text-zinc-500 bg-zinc-50/50 dark:bg-zinc-950/50 font-sans select-none shrink-0">
              <button onClick={() => { setShowChapterPicker(false); setShowVersePicker(false); }} className={`font-semibold hover:text-amber-600 transition ${!showChapterPicker && !showVersePicker ? 'text-amber-600 font-bold underline decoration-2 underline-offset-4' : ''}`}>
                1. Book {pickedBook ? `(${pickedBook.name})` : ''}
              </button>
              <span className="opacity-40">/</span>
              <button disabled={!pickedBook} onClick={() => { setShowChapterPicker(true); setShowVersePicker(false); }} className={`font-semibold hover:text-amber-600 transition disabled:opacity-40 disabled:pointer-events-none ${showChapterPicker ? 'text-amber-600 font-bold underline decoration-2 underline-offset-4' : ''}`}>
                2. Chapter {pickedChapter ? `(${pickedChapter})` : ''}
              </button>
              <span className="opacity-40">/</span>
              <button disabled={pickedChapter === null} className={`font-semibold disabled:opacity-40 disabled:pointer-events-none ${showVersePicker ? 'text-amber-600 font-bold underline decoration-2 underline-offset-4' : ''}`}>3. Verse</button>
            </div>

            {/* Book grid */}
            {!showChapterPicker && !showVersePicker && (
              <>
                <div className="grid grid-cols-2 border-b border-zinc-150 dark:border-zinc-800 shrink-0">
                  {(['OT', 'NT'] as const).map(tab => (
                    <button key={tab} onClick={() => setPickerTab(tab)} className={`py-3 text-xs font-bold tracking-wider text-center border-b-2 uppercase ${pickerTab === tab ? 'border-amber-500 text-amber-600' : 'border-transparent text-zinc-500'}`}>
                      {tab === 'OT' ? 'Old Testament (39)' : 'New Testament (27)'}
                    </button>
                  ))}
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {BIBLE_BOOKS.filter(b => b.testament === pickerTab).map(book => (
                    <button key={book.id} onClick={() => handleSelectBookFromMenu(book)} className={`py-2 px-3 rounded-xl border text-left hover:border-amber-500/40 hover:bg-amber-500/5 transition text-xs font-semibold ${selectedBook.id === book.id ? 'border-amber-500 bg-amber-500/10 text-amber-600 font-bold' : 'border-zinc-150 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 bg-zinc-50/50 dark:bg-zinc-850/50'}`}>
                      <div className="truncate">{book.name}</div>
                      <div className="text-[9px] font-mono opacity-50 font-normal">{book.chapters} Ch</div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Chapter grid */}
            {showChapterPicker && !showVersePicker && pickedBook && (
              <div className="flex-1 overflow-y-auto p-6">
                <button onClick={() => { setShowChapterPicker(false); setShowVersePicker(false); }} className="mb-4 text-xs font-bold text-amber-600 flex items-center gap-1 hover:underline">← Back to Books</button>
                <h4 className="font-serif font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-4 border-b pb-2">{pickedBook.name} Chapters</h4>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {Array.from({ length: pickedBook.chapters }, (_, i) => i + 1).map(num => (
                    <button key={num} onClick={() => handleSelectChapterFromMenu(num)} className={`aspect-square w-full rounded-full border font-mono text-xs font-bold flex items-center justify-center transition hover:border-amber-500 hover:bg-amber-500/10 ${selectedBook.id === pickedBook.id && selectedChapter === num ? 'bg-amber-500 text-zinc-950 font-black border-amber-500' : 'border-zinc-150 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-850'}`}>{num}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Verse grid */}
            {showVersePicker && pickedBook && pickedChapter !== null && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col">
                <button onClick={() => { setShowVersePicker(false); setShowChapterPicker(true); }} className="mb-4 text-xs font-bold text-amber-600 flex items-center gap-1 hover:underline self-start">← Back to Chapters</button>
                <h4 className="font-serif font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-4 border-b pb-2">{pickedBook.name} {pickedChapter}: Select Verse</h4>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {Array.from({ length: availableVerses }, (_, i) => i + 1).map(num => (
                    <button key={num} onClick={() => handleSelectVerseFromMenu(num)} className="aspect-square w-full rounded-full border border-zinc-150 dark:border-zinc-800 font-mono text-xs font-bold flex items-center justify-center transition hover:border-amber-500 hover:bg-amber-500/10 text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-850">{num}</button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Footer */}
      {!settings.zenMode && (
        <footer className="py-10 border-t border-zinc-200 dark:border-zinc-800 mt-20 bg-white dark:bg-zinc-900/60 transition-colors">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-1.5 mb-3">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-amber-700">WordUp Africa Bible Reader</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed mb-2">
              Free offline Bible in WEB, KJV, French (LSG), Yoruba, Igbo, Hausa, Twi, and Nigerian Pidgin.
            </p>
            <span className="text-[10px] font-mono text-zinc-400">100% Offline · Public Domain · No Internet Required</span>
          </div>
        </footer>
      )}
    </div>
  );

  function handleToggleVerseSelection(verse: Verse) {
    setSelectedVerses(prev =>
      prev.some(v => v.verse === verse.verse) ? prev.filter(v => v.verse !== verse.verse) : [...prev, verse]
    );
  }
}
