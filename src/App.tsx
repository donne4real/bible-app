/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Book, 
  Menu, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Sparkles, 
  Highlighter, 
  Share2, 
  BookOpen, 
  X, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  RefreshCw,
  Bookmark,
  Smartphone,
  Flame,
  CheckCircle2,
  AlertCircle,
  Columns,
  Layers,
  ArrowLeftRight
} from 'lucide-react';
import { BIBLE_BOOKS, getBookById } from './bibleStructure';
import { OFFLINE_COLLECTION, GENESIS_1_FALLBACK, DAILY_WORDS_OF_ENCOURAGEMENT } from './bibleData';
import { getOfflineVerses } from './offlineBooksData';
import { getOfflineCommentary, OfflineBookCommentary } from './offlineCommentary';
import { Verse, Highlight, Note, Bookmark as BookMarkType, ReaderSettings, BookMetadata } from './types';
import Sidebar from './components/Sidebar';
import ThemeSelector from './components/ThemeSelector';
import HighlightToolbar, { getHighlightClass } from './components/HighlightToolbar';
import ShareCardModal from './components/ShareCardModal';
import LanguagesGuideModal from './components/LanguagesGuideModal';
import ReadingPlansTracker from './components/ReadingPlansTracker';
import BibleProgressDashboard from './components/BibleProgressDashboard';
import { UserPlanProgress } from './readingPlansData';
import { motion, AnimatePresence } from 'motion/react';

const TRANSLATIONS = [
  { id: 'web', name: 'World English Bible (WEB)', short: 'WEB' },
  { id: 'kjv', name: 'King James Version (KJV)', short: 'KJV' },
  { id: 'asv', name: 'American Standard Version (ASV)', short: 'ASV' },
  { id: 'bbe', name: 'Bible in Basic English (BBE)', short: 'BBE' },
  { id: 'ylt', name: "Young's Literal Translation (YLT)", short: 'YLT' },
  { id: 'darby', name: 'Darby Translation (DBY)', short: 'DARBY' },
  { id: 'oeb-us', name: 'Open English Bible (OEB-US)', short: 'OEB' },
  { id: 'cherokee', name: 'Cherokee New Testament', short: 'CHER' },
  { id: 'lsg', name: 'Louis Segond (French)', short: 'LSG' },
  { id: 'yor', name: 'Bibeli Mimọ (Yoruba)', short: 'YOR' },
  { id: 'ibo', name: 'Biblia Nso (Igbo)', short: 'IGB' },
  { id: 'hau', name: 'Littafi Mai Tsarki (Hausa)', short: 'HAU' },
  { id: 'pcm', name: 'Nigerian Pidgin Bible', short: 'PCM' },
  { id: 'ije', name: 'Bíbélì Mímọ́ l’édè Ìjẹ̀bú (Ijebu)', short: 'IJE' },
  { id: 'tiv', name: 'Bibilo kachizha (Tiv)', short: 'TIV' },
  { id: 'urh', name: 'Obe Rere (Urhobo)', short: 'URH' },
  { id: 'efi', name: 'Edisana Ñwed Abasi (Efik/Ibibio)', short: 'EFI' },
  { id: 'edo', name: 'Ebe Nọhuanrẹn (Edo/Benin)', short: 'EDO' },
  { id: 'ijw', name: 'Ebi Eni (Ijaw)', short: 'IJW' },
  { id: 'igl', name: 'Abakwane (Igala)', short: 'IGL' },
  { id: 'ewe', name: 'Biblia (Ewe)', short: 'EWE' },
  { id: 'twi', name: 'Nsempa (Twi)', short: 'TWI' },
  { id: 'swa', name: 'Biblia (Swahili)', short: 'SWA' },
  { id: 'zul', name: 'IBhayibheli (Zulu)', short: 'ZUL' },
  { id: 'xho', name: 'IBhayibhile (Xhosa)', short: 'XHO' },
  { id: 'sna', name: 'Bhaibheri (Shona)', short: 'SNA' },
  { id: 'amh', name: 'መጽሐፍ ቅዱስ (Amharic)', short: 'AMH' }
];

export default function App() {
  // --- Lazy state initializations ---
  const [selectedBook, setSelectedBook] = useState<BookMetadata>(() => {
    const raw = localStorage.getItem('bible_selected_book');
    if (raw) {
      try {
        const bookObj = JSON.parse(raw);
        const exists = BIBLE_BOOKS.find(b => b.id === bookObj.id);
        if (exists) return exists;
      } catch (_) {}
    }
    return BIBLE_BOOKS[0]; // Default: Genesis
  });

  const [selectedChapter, setSelectedChapter] = useState<number>(() => {
    const raw = localStorage.getItem('bible_selected_chapter');
    if (raw) {
      try {
        return parseInt(raw, 10) || 1;
      } catch (_) {}
    }
    return 1;
  });

  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [offlineCommentary, setOfflineCommentary] = useState<OfflineBookCommentary | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });

  // Track browser connectivity dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleOnline = () => setIsOfflineMode(false);
    const handleOffline = () => setIsOfflineMode(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Storage states (pre-populated from localStorage on mount)
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [bookmarks, setBookmarks] = useState<BookMarkType[]>([]);
  
  // Custom display settings - loaded lazily from localStorage to prevent mid-load translation race conditions
  const [settings, setSettings] = useState<ReaderSettings>(() => {
    const raw = localStorage.getItem('bible_reader_settings');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (_) {}
    }
    return {
      translation: 'web',
      fontSize: 'lg',
      fontFamily: 'serif',
      lineHeight: 'relaxed',
      zenMode: false,
      theme: 'sepia'
    };
  });

  // UI Flow toggles
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showShareCard, setShowShareCard] = useState<boolean>(false);
  const [showLanguagesList, setShowLanguagesList] = useState<boolean>(false);
  const [showBookPicker, setShowBookPicker] = useState<boolean>(false);
  const [pickerTab, setPickerTab] = useState<'OT' | 'NT'>('OT');
  const [showChapterPicker, setShowChapterPicker] = useState<boolean>(false);
  const [pickedBook, setPickedBook] = useState<BookMetadata | null>(null);

  // New verse picker specific states
  const [showVersePicker, setShowVersePicker] = useState<boolean>(false);
  const [pickedChapter, setPickedChapter] = useState<number | null>(null);
  const [availableVerses, setAvailableVerses] = useState<number>(30); // default fallback
  const [loadingVersesCount, setLoadingVersesCount] = useState<boolean>(false);

  // Search & Filters inside active reader
  const [activeSearch, setActiveSearch] = useState<string>('');
  
  // Selection state
  const [selectedVerses, setSelectedVerses] = useState<Verse[]>([]);

  // Daily verse card visual generator
  const [dailyVerseIndex, setDailyVerseIndex] = useState<number>(0);

  // --- Translation Comparison states ---
  const [isComparing, setIsComparing] = useState<boolean>(() => {
    return localStorage.getItem('bible_is_comparing') === 'true';
  });
  const [compareTranslation, setCompareTranslation] = useState<string>(() => {
    return localStorage.getItem('bible_compare_translation') || 'kjv';
  });
  const [compareLayout, setCompareLayout] = useState<'side-by-side' | 'interlinear'>(() => {
    return (localStorage.getItem('bible_compare_layout') as any) || 'side-by-side';
  });
  const [compareVerses, setCompareVerses] = useState<Verse[]>([]);
  const [compareLoading, setCompareLoading] = useState<boolean>(false);
  const [compareError, setCompareError] = useState<string | null>(null);

  // Sync compares to localStorage
  useEffect(() => {
    localStorage.setItem('bible_is_comparing', isComparing ? 'true' : 'false');
  }, [isComparing]);

  useEffect(() => {
    localStorage.setItem('bible_compare_translation', compareTranslation);
  }, [compareTranslation]);

  useEffect(() => {
    localStorage.setItem('bible_compare_layout', compareLayout);
  }, [compareLayout]);

  // Reading plan progress state loaded lazily
  const [readingPlanProgress, setReadingPlanProgress] = useState<UserPlanProgress | null>(() => {
    const raw = localStorage.getItem('bible_reading_plan_progress');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (_) {}
    }
    return null;
  });

  // Sync Reading plan progress to localStorage
  useEffect(() => {
    if (readingPlanProgress) {
      localStorage.setItem('bible_reading_plan_progress', JSON.stringify(readingPlanProgress));
    } else {
      localStorage.removeItem('bible_reading_plan_progress');
    }
  }, [readingPlanProgress]);

  // --- General Bible Reading Progress states ---
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    const raw = localStorage.getItem('bible_completed_chapters');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (_) {}
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('bible_completed_chapters', JSON.stringify(completedChapters));
  }, [completedChapters]);

  const [readingStreak, setReadingStreak] = useState<{ count: number; lastDate: string | null }>(() => {
    const raw = localStorage.getItem('bible_reading_streak');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (_) {}
    }
    return { count: 0, lastDate: null };
  });

  const recordStreakActivity = () => {
    const todayStr = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    if (readingStreak.lastDate === todayStr) {
      return; // Already recorded today
    }

    let newCount = readingStreak.count;
    if (readingStreak.lastDate) {
      const prevDate = new Date(readingStreak.lastDate);
      const todayDate = new Date(todayStr);
      const diffTime = Math.abs(todayDate.getTime() - prevDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newCount += 1;
      } else if (diffDays > 1) {
        newCount = 1; // reset broken streak
      }
    } else {
      newCount = 1; // start first streak
    }

    const updatedStreak = { count: newCount, lastDate: todayStr };
    setReadingStreak(updatedStreak);
    localStorage.setItem('bible_reading_streak', JSON.stringify(updatedStreak));
  };

  // --- Search History and Autocomplete states ---
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const raw = localStorage.getItem('bible_search_history');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (_) {}
    }
    return ['faith', 'love', 'grace', 'beginning', 'light', 'jesus'];
  });

  useEffect(() => {
    localStorage.setItem('bible_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Handle outside click to hide autocomplete list
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const q = activeSearch.trim();
      if (q) {
        if (!searchHistory.includes(q)) {
          setSearchHistory(prev => [q, ...prev.filter(x => x !== q)].slice(0, 8));
        }
      }
      setSearchFocused(false);
    }
  };

  const handleSelectSearchQuery = (term: string) => {
    setActiveSearch(term);
    if (!searchHistory.includes(term)) {
      setSearchHistory(prev => [term, ...prev.filter(x => x !== term)].slice(0, 8));
    }
    setSearchFocused(false);
  };

  const handleClearSearchHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory([]);
  };

  const getAutocompleteSuggestions = () => {
    const query = activeSearch.trim().toLowerCase();
    
    // If empty query, show history + topics
    if (!query) {
      return {
        books: [],
        verses: [],
        topics: ['faith', 'love', 'grace', 'light', 'salvation', 'wisdom', 'peace', 'joy'],
        history: searchHistory
      };
    }

    // Filter books matching search
    const matchingBooks = BIBLE_BOOKS.filter(b => 
      b.name.toLowerCase().includes(query) || 
      b.id.toLowerCase().includes(query)
    ).slice(0, 4);

    // Filter verses matching current chapter
    const matchingVerses = verses.filter(v => 
      v.text.toLowerCase().includes(query)
    ).slice(0, 5);

    // Filter history matching search
    const matchingHistory = searchHistory.filter(h => 
      h.toLowerCase().includes(query) && h.toLowerCase() !== query
    );

    return {
      books: matchingBooks,
      verses: matchingVerses,
      topics: [],
      history: matchingHistory
    };
  };

  // References and refs
  const headerRef = useRef<HTMLDivElement>(null);

  // --- Load localStorage states on Initial Mount ---
  useEffect(() => {
    const rawHighlights = localStorage.getItem('bible_highlights');
    if (rawHighlights) setHighlights(JSON.parse(rawHighlights));

    const rawNotes = localStorage.getItem('bible_notes');
    if (rawNotes) setNotes(JSON.parse(rawNotes));

    const rawBookmarks = localStorage.getItem('bible_bookmarks');
    if (rawBookmarks) setBookmarks(JSON.parse(rawBookmarks));

    // Choose random daily word seed
    setDailyVerseIndex(new Date().getDate() % DAILY_WORDS_OF_ENCOURAGEMENT.length);
  }, []);

  // Save current book & chapter reading position to persist between browser state reloads
  useEffect(() => {
    localStorage.setItem('bible_selected_book', JSON.stringify(selectedBook));
    localStorage.setItem('bible_selected_chapter', selectedChapter.toString());
  }, [selectedBook, selectedChapter]);

  // Sync settings when they modify
  const handleUpdateSettings = (updates: Partial<ReaderSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    localStorage.setItem('bible_reader_settings', JSON.stringify(newSettings));
  };

  // --- Core Dynamic Text Loading Mechanism (Caching + Fallback + Fetching) ---
  useEffect(() => {
    let active = true;

    const loadScriptureText = async () => {
      setLoading(true);
      setErrorStatus(null);
      setOfflineCommentary(null);
      setSelectedVerses([]); // reset active selections

      const bookId = selectedBook.id;
      const bookName = selectedBook.name;
      const chapter = selectedChapter;
      const translation = settings.translation;

      // 1. Check PWA Static Preloaded DB (Local database in code)
      const offlineVerses = getOfflineVerses(translation, bookId, chapter);
      if (offlineVerses && offlineVerses.length > 0) {
        if (active) {
          setVerses(offlineVerses);
          setLoading(false);
        }
        return;
      }

      // 2. Check legacy offline curated collections bundle first
      if ((bookId === 'PSA' && chapter === 23) || (bookId === 'JHN' && chapter === 1)) {
        const offlineSet = OFFLINE_COLLECTION[translation]?.[chapter];
        if (offlineSet) {
          if (active) {
            setVerses(offlineSet);
            setLoading(false);
          }
          return;
        }
      }

      if (bookId === 'GEN' && chapter === 1 && translation === 'web') {
        if (active) {
          setVerses(GENESIS_1_FALLBACK);
          setLoading(false);
        }
        return;
      }

      // 3. Check LocalStorage cache index
      const storageCacheKey = `cached_bible_${translation}_${bookId}_${chapter}`;
      const cachedData = localStorage.getItem(storageCacheKey);
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          if (active) {
            setVerses(parsed);
            setLoading(false);
          }
          return;
        } catch (err) {
          console.warn("Corrupt cache encountered", err);
        }
      }

      // 4. Dynamic API Loading since not pre-bundled or cached yet
      try {
<<<<<<< HEAD
        const isClientOnlyHost = typeof window !== 'undefined' && 
          window.location.hostname !== 'localhost' && 
          window.location.hostname !== '127.0.0.1' && 
          !window.location.hostname.includes('ais-dev-') && 
          !window.location.hostname.includes('ais-pre-') && 
          !window.location.hostname.includes('run.app');

        // Target the live production backend if host is client-only (Netlify/Android) & language needs AI translations
        const apiBase = isClientOnlyHost 
          ? 'https://ais-pre-hpaahtl46w3udogfkuqmxr-565813577069.us-west2.run.app' 
          : '';

        const url = `${apiBase}/api/bible?translation=${translation}&book_id=${bookId}&book_name=${encodeURIComponent(bookName)}&chapter=${chapter}`;
        let response = await fetch(url);
        
        let payload: any = null;
        let isResponseHtmlJsonFallback = false;

        // On Netlify/static hosting, missing routes fallback to serving index.html with a 200 OK
        if (response.ok) {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('text/html')) {
            isResponseHtmlJsonFallback = true;
          } else {
            payload = await response.json();
          }
        }

        // If the backend was not found, or returned HTML (Netlify SPA fallback mechanism)
        if (!response.ok || isResponseHtmlJsonFallback) {
          // If we are looking for a standard translation, we can load it directly from the public bible-api.com CORS API!
          const standardTranslations = ['web', 'kjv', 'asv', 'bbe', 'ylt', 'darby', 'oeb-us', 'cherokee'];
          if (standardTranslations.includes(translation)) {
            const directUrl = `https://bible-api.com/${encodeURIComponent(bookName)}+${chapter}?translation=${translation}`;
            const directResponse = await fetch(directUrl);
            if (directResponse.ok) {
              const directPayload = await directResponse.json();
              if (directPayload && directPayload.verses && directPayload.verses.length > 0) {
                payload = {
                  verses: directPayload.verses.map((v: any) => ({
                    book_id: bookId,
                    book_name: bookName,
                    chapter: chapter,
                    verse: v.verse,
                    text: v.text
                  }))
                };
              }
            }
          }
        }

=======
        const url = `/api/bible?translation=${translation}&book_id=${bookId}&book_name=${encodeURIComponent(bookName)}&chapter=${chapter}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Scripture book-chapter reference not found on server.');
        }
        
        const payload = await response.json();
        
>>>>>>> b60020c6a79047027a29eb304c41ec93355cdec2
        if (payload && payload.verses && payload.verses.length > 0) {
          // Cache permanently in localStorage for premium offline-first operations future load!
          localStorage.setItem(storageCacheKey, JSON.stringify(payload.verses));
          if (active) {
            setVerses(payload.verses);
          }
        } else {
<<<<<<< HEAD
          throw new Error('Scripture source not available.');
=======
          throw new Error(payload.error || 'Format unknown');
>>>>>>> b60020c6a79047027a29eb304c41ec93355cdec2
        }
      } catch (err: any) {
        console.warn("Bible API loading issue. Offline fallback triggered.", err);
        
        if (active) {
          // Look up offline study guides & commentary for 100% standalone offline experiences
          const commentary = getOfflineCommentary(bookId);
          if (commentary) {
            setOfflineCommentary(commentary);
            
            // Build temporary highlight verses based on the commentary's key verses of this chapter
            const chKeyVerses = commentary.keyVerses.filter(kv => kv.chapter === chapter);
            if (chKeyVerses.length > 0) {
              const formattedVerses: Verse[] = chKeyVerses.map(kv => ({
                book_id: bookId,
                book_name: bookName,
                chapter: chapter,
                verse: kv.verse,
                text: kv.text
              }));
              setVerses(formattedVerses);
            } else {
              // Generate some virtual helper verses to let structural layout look magnificent
              const virtualVerses: Verse[] = [
                {
                  book_id: bookId,
                  book_name: bookName,
                  chapter: chapter,
                  verse: 1,
                  text: `Study and reflect on the divine themes of ${bookName} Chapter ${chapter}. See the Comprehensive Interactive Commentary & Outlines below.`
                }
              ];
              setVerses(virtualVerses);
            }
          } else {
            setErrorStatus("Offline Mode. Connect to secure networks to download this chapter. You can instantly access Genesis, Matthew, John, Psalms & Proverbs offline!");
          }
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadScriptureText();

    return () => {
      active = false;
    };
  }, [selectedBook, selectedChapter, settings.translation]);

  // --- Dynamic comparison loader ---
  useEffect(() => {
    if (!isComparing) {
      setCompareVerses([]);
      setCompareError(null);
      return;
    }

    let active = true;

    const loadCompareText = async () => {
      setCompareLoading(true);
      setCompareError(null);

      const bookId = selectedBook.id;
      const bookName = selectedBook.name;
      const chapter = selectedChapter;
      const translation = compareTranslation;

      // 1. Check offline curated collections bundle first
      if ((bookId === 'PSA' && chapter === 23) || (bookId === 'JHN' && chapter === 1)) {
        const offlineSet = OFFLINE_COLLECTION[translation]?.[chapter];
        if (offlineSet) {
          if (active) {
            setCompareVerses(offlineSet);
            setCompareLoading(false);
          }
          return;
        }
      }

      if (bookId === 'GEN' && chapter === 1 && translation === 'web') {
        if (active) {
          setCompareVerses(GENESIS_1_FALLBACK);
          setCompareLoading(false);
        }
        return;
      }

      // 2. Check LocalStorage cache index
      const storageCacheKey = `cached_bible_${translation}_${bookId}_${chapter}`;
      const cachedData = localStorage.getItem(storageCacheKey);
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          if (active) {
            setCompareVerses(parsed);
            setCompareLoading(false);
          }
          return;
        } catch (err) {
          console.warn("Corrupt compare cache encountered", err);
        }
      }

      // 3. Dynamic API Loading since not pre-bundled or cached yet
      try {
        const url = `/api/bible?translation=${translation}&book_id=${bookId}&book_name=${encodeURIComponent(bookName)}&chapter=${chapter}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Comparison version chapter not available or failed to load.');
        }
        
        const payload = await response.json();
        
        if (payload && payload.verses && payload.verses.length > 0) {
          // Cache permanently in localStorage for premium offline-first operations future load!
          localStorage.setItem(storageCacheKey, JSON.stringify(payload.verses));
          if (active) {
            setCompareVerses(payload.verses);
          }
        } else {
          throw new Error(payload.error || 'Format unknown');
        }
      } catch (err: any) {
        console.warn("Compare API loading issue. Offline fallback triggered.", err);
        if (active) {
          setCompareError(err.message || "Could not load compare translation.");
        }
      } finally {
        if (active) {
          setCompareLoading(false);
        }
      }
    };

    loadCompareText();

    return () => {
      active = false;
    };
  }, [selectedBook, selectedChapter, compareTranslation, isComparing]);

  // Handle active selection toggles
  const handleToggleVerseSelection = (verse: Verse) => {
    const isSelected = selectedVerses.some(v => v.verse === verse.verse);
    if (isSelected) {
      setSelectedVerses(selectedVerses.filter(v => v.verse !== verse.verse));
    } else {
      setSelectedVerses([...selectedVerses, verse]);
    }
  };

  // --- Highlights managers ---
  const handleApplyHighlight = (color: string) => {
    const newHighlights = [...highlights];
    selectedVerses.forEach(verse => {
      const hlId = `${settings.translation}_${verse.book_id}_${verse.chapter}_${verse.verse}`;
      // Remove old if exists
      const filtered = newHighlights.filter(h => h.id !== hlId);
      filtered.push({
        id: hlId,
        book_id: verse.book_id,
        book_name: verse.book_name,
        chapter: verse.chapter,
        verse: verse.verse,
        color: color,
        createdAt: Date.now()
      });
      newHighlights.splice(0, newHighlights.length, ...filtered);
    });

    setHighlights(newHighlights);
    localStorage.setItem('bible_highlights', JSON.stringify(newHighlights));
    setSelectedVerses([]); // clear selection
  };

  const handleRemoveHighlight = () => {
    let newHighlights = [...highlights];
    selectedVerses.forEach(verse => {
      const hlId = `${settings.translation}_${verse.book_id}_${verse.chapter}_${verse.verse}`;
      newHighlights = newHighlights.filter(h => h.id !== hlId);
    });

    setHighlights(newHighlights);
    localStorage.setItem('bible_highlights', JSON.stringify(newHighlights));
    setSelectedVerses([]);
  };

  const handleDeleteHighlightById = (id: string) => {
    const updated = highlights.filter(h => h.id !== id);
    setHighlights(updated);
    localStorage.setItem('bible_highlights', JSON.stringify(updated));
  };

  // --- Notes managers ---
  const handleSaveNote = (text: string) => {
    if (selectedVerses.length === 0) return;
    const sorted = [...selectedVerses].sort((a,b)=>a.verse - b.verse);
    const targetVerse = sorted[0]; // Anchor the note on the primary verse
    const noteId = `${targetVerse.book_id}_${targetVerse.chapter}_${targetVerse.verse}`;

    const newNotes = notes.filter(n => n.id !== noteId);
    if (text.trim().length > 0) {
      newNotes.push({
        id: noteId,
        book_id: targetVerse.book_id,
        book_name: targetVerse.book_name,
        chapter: targetVerse.chapter,
        verse: targetVerse.verse,
        text: text,
        createdAt: Date.now()
      });
    }

    setNotes(newNotes);
    localStorage.setItem('bible_notes', JSON.stringify(newNotes));
    setSelectedVerses([]);
  };

  const handleDeleteNoteById = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('bible_notes', JSON.stringify(updated));
  };

  // --- Bookmarking managers ---
  const isCurrentChapterBookmarked = () => {
    const bookmarkId = `bookmark_${selectedBook.id}_${selectedChapter}`;
    return bookmarks.some(bm => bm.id === bookmarkId);
  };

  const handleToggleBookmark = () => {
    const bookmarkId = `bookmark_${selectedBook.id}_${selectedChapter}`;
    const exists = bookmarks.some(bm => bm.id === bookmarkId);
    
    let updatedBookmarks = [];
    if (exists) {
      updatedBookmarks = bookmarks.filter(bm => bm.id !== bookmarkId);
    } else {
      updatedBookmarks = [...bookmarks, {
        id: bookmarkId,
        book_id: selectedBook.id,
        book_name: selectedBook.name,
        chapter: selectedChapter,
        createdAt: Date.now()
      }];
    }

    setBookmarks(updatedBookmarks);
    localStorage.setItem('bible_bookmarks', JSON.stringify(updatedBookmarks));
  };

  const handleDeleteBookmarkById = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('bible_bookmarks', JSON.stringify(updated));
  };

  // Click handler from Study Sidebar navigation
  const handleNavigateSidebar = (bookId: string, chapter: number, verse?: number) => {
    const matchedBook = BIBLE_BOOKS.find(b => b.id === bookId);
    if (matchedBook) {
      setSelectedBook(matchedBook);
      setSelectedChapter(chapter);
      setShowSidebar(false);
      
      // Auto-scrolling to the selected verse anchor after slight loading delay
      if (verse) {
        setTimeout(() => {
          const element = document.getElementById(`verse-line-${verse}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add momentary focus highlight
            element.classList.add('ring-2', 'ring-amber-500/40', 'rounded-lg');
            setTimeout(() => {
              element.classList.remove('ring-2', 'ring-amber-500/40', 'rounded-lg');
            }, 3000);
          }
        }, 800);
      }
    }
  };

  // Quick navigation helpers for Chapter Prev/Next
  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    } else {
      // Go to previous book's last chapter
      const currentBookIdx = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
      if (currentBookIdx > 0) {
        const prevBook = BIBLE_BOOKS[currentBookIdx - 1];
        setSelectedBook(prevBook);
        setSelectedChapter(prevBook.chapters);
      }
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < selectedBook.chapters) {
      setSelectedChapter(selectedChapter + 1);
    } else {
      // Go to next book's 1st chapter
      const currentBookIdx = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
      if (currentBookIdx < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[currentBookIdx + 1];
        setSelectedBook(nextBook);
        setSelectedChapter(1);
      }
    }
  };

  // --- Keyboard navigation listener for ArrowRight and ArrowLeft ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting if we are focused on typing elements
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
         target.tagName === 'TEXTAREA' ||
         target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevChapter();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextChapter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePrevChapter, handleNextChapter]);

  // Bookpicker click handler
  const handleSelectBookFromMenu = (book: BookMetadata) => {
    setPickedBook(book);
    setShowChapterPicker(true);
    setShowVersePicker(false);
  };

  const handleSelectChapterFromMenu = async (chapterNum: number) => {
    if (!pickedBook) return;
    setPickedChapter(chapterNum);
    setShowChapterPicker(false);
    setShowVersePicker(true);
    setLoadingVersesCount(true);
    setAvailableVerses(30); // Default estimate while loading

    const translation = settings.translation;
    const bookId = pickedBook.id;

    // Check preloaded first
    if ((bookId === 'PSA' && chapterNum === 23) || (bookId === 'JHN' && chapterNum === 1)) {
      const offlineSet = OFFLINE_COLLECTION[translation]?.[chapterNum];
      if (offlineSet) {
        setAvailableVerses(offlineSet.length);
        setLoadingVersesCount(false);
        return;
      }
    }

    // Check cache
    const storageCacheKey = `cached_bible_${translation}_${bookId}_${chapterNum}`;
    const cachedData = localStorage.getItem(storageCacheKey);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        setAvailableVerses(parsed.length);
        setLoadingVersesCount(false);
        return;
      } catch (_) {}
    }

    try {
      const url = `/api/bible?translation=${translation}&book_id=${bookId}&book_name=${encodeURIComponent(pickedBook.name)}&chapter=${chapterNum}`;
      const response = await fetch(url);
      if (response.ok) {
        const payload = await response.json();
        if (payload && payload.verses && payload.verses.length > 0) {
          setAvailableVerses(payload.verses.length);
        }
      }
    } catch (e) {
      console.warn("Failed fetching verse count inside picker:", e);
    } finally {
      setLoadingVersesCount(false);
    }
  };

  const handleSelectVerseFromMenu = (verseNum: number) => {
    if (pickedBook && pickedChapter !== null) {
      setSelectedBook(pickedBook);
      setSelectedChapter(pickedChapter);
      
      // Deep resets for full navigation overlays
      setShowBookPicker(false);
      setShowChapterPicker(false);
      setShowVersePicker(false);
      setPickedBook(null);
      setPickedChapter(null);

      // Auto-scrolling to selected verse element dynamically with highlight effect
      setTimeout(() => {
        const element = document.getElementById(`verse-line-${verseNum}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-amber-500/50', 'bg-amber-500/10', 'rounded', 'px-1');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-amber-500/50', 'bg-amber-500/10', 'rounded', 'px-1');
          }, 3500);
        }
      }, 700);
    }
  };

  // Filter local verses
  const getFilteredVerses = () => {
    if (!activeSearch.trim()) return verses;
    return verses.filter(v => v.text.toLowerCase().includes(activeSearch.toLowerCase()));
  };

  // Helper to format the font family settings class
  const getBodyFontFamilyClass = () => {
    switch (settings.fontFamily) {
      case 'serif': return 'font-serif tracking-normal';
      case 'mono': return 'font-mono tracking-tight';
      case 'sans': return 'font-sans tracking-tight';
      default: return 'font-serif';
    }
  };

  // Helper to format font sizing scale
  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case 'sm': return 'text-sm sm:text-sm';
      case 'md': return 'text-base sm:text-base';
      case 'lg': return 'text-lg sm:text-lg';
      case 'xl': return 'text-xl sm:text-xl';
      case '2xl': return 'text-2xl sm:text-2xl';
      case '3xl': return 'text-3xl sm:text-3xl';
      default: return 'text-lg';
    }
  };

  // Helper to get line height class
  const getLineHeightClass = () => {
    switch (settings.lineHeight) {
      case 'tight': return 'leading-snug space-y-3';
      case 'normal': return 'leading-normal space-y-4';
      case 'relaxed': return 'leading-relaxed space-y-5';
      case 'loose': return 'leading-loose space-y-7';
      default: return 'leading-relaxed space-y-5';
    }
  };

  // Color theme generator for active frame
  const getThemeContainerClass = () => {
    switch (settings.theme) {
      case 'light': return 'bg-[#FAFAFA] text-zinc-900 border-zinc-200';
      case 'sepia': return 'bg-[#F4ECD8] text-[#362719] border-[#E5DAC3]';
      case 'dark': return 'bg-[#1C1C24] text-zinc-200 border-zinc-900';
      case 'charcoal': return 'bg-[#0B0B0E] text-zinc-400 border-zinc-950';
      default: return 'bg-[#F4ECD8] text-[#362751]';
    }
  };

  const getThemeOuterClass = () => {
    switch (settings.theme) {
      case 'light': return 'bg-zinc-100 min-h-screen';
      case 'sepia': return 'bg-[#EADFCA] min-h-screen';
      case 'dark': return 'bg-zinc-950 min-h-screen';
      case 'charcoal': return 'bg-[#000000] min-h-screen';
      default: return 'bg-[#EADFCA] min-h-screen';
    }
  };

  return (
    <div className={`transition-colors duration-200 ${getThemeOuterClass()} flex flex-col font-sans select-none relative overflow-x-hidden`}>
      
      {/* --- ZEN CLOSE BAR --- */}
      {settings.zenMode && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <button
            onClick={() => handleUpdateSettings({ zenMode: false })}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900/80 text-white hover:bg-zinc-900/90 shadow-lg text-xs font-sans tracking-wide cursor-pointer transition active:scale-95"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Exit Zen Mode</span>
          </button>
        </div>
      )}

      {/* --- STANDARD HEADER HEADER --- */}
      {!settings.zenMode && (
        <header ref={headerRef} className="sticky top-0 bg-white/95 dark:bg-zinc-900/95 border-b border-zinc-200 dark:border-zinc-800 z-30 transition-colors duration-200">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            {/* Left Brand block */}
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setShowSidebar(true)}
                className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition"
                title="Open Study Hub Journal"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => { setSelectedBook(BIBLE_BOOKS[0]); setSelectedChapter(1); }}>
                <BookOpen className="w-5.h-5 text-amber-500 fill-amber-500/10" />
                <h1 className="font-sans font-bold tracking-tight text-xs sm:text-sm bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                  WordUp Africa Bible Reader
                </h1>
              </div>
            </div>

            {/* Center Dynamic Navigation Picker */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setPickedBook(selectedBook);
                  setPickedChapter(selectedChapter);
                  setShowBookPicker(true);
                  setShowChapterPicker(true);
                  setShowVersePicker(false);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 font-sans font-bold text-xs bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-250 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 uppercase tracking-widest transition animate-fade-in"
              >
                <span>{selectedBook.name} {selectedChapter}</span>
                <span className="text-[9px] text-zinc-400">▼</span>
              </button>

              {/* Translation Toggles Quick Select */}
              <div className="relative group flex items-center gap-1.5">
                <div className="relative flex items-center">
                  <select
                    value={settings.translation}
                    onChange={(e) => handleUpdateSettings({ translation: e.target.value as any })}
                    className="appearance-none font-sans font-bold text-[10px] pl-3 pr-7 py-1.5 bg-amber-500/10 dark:bg-amber-400/5 text-amber-600 dark:text-amber-400 border-0 rounded-full hover:bg-amber-500/15 cursor-pointer outline-none uppercase tracking-wider"
                  >
                    {TRANSLATIONS.map(t => (
                      <option key={t.id} value={t.id} className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-sans tracking-wide">
                        {t.short}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[8px] text-amber-600 dark:text-amber-400 pointer-events-none">▼</span>
                </div>

                <button
                  onClick={() => setShowLanguagesList(true)}
                  className="p-1 px-2 rounded-full bg-amber-500/10 dark:bg-amber-400/5 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-sans font-semibold transition flex items-center gap-0.5 whitespace-nowrap cursor-pointer"
                  title="View Languages Guide & Abbreviation Codes"
                >
                  <span className="text-[9px]">ℹ</span> Codes
                </button>

                <button
                  onClick={() => setIsComparing(!isComparing)}
                  className={`p-1 px-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider transition flex items-center gap-1 cursor-pointer ${
                    isComparing 
                      ? 'bg-amber-500 text-zinc-950 shadow-sm'
                      : 'bg-amber-500/10 dark:bg-amber-400/5 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                  }`}
                  title="Compare translations side-by-side or stacked"
                >
                  <Columns className="w-3 h-3" />
                  <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                </button>
              </div>
            </div>

            {/* Right Control blocks */}
            <div className="flex items-center gap-1 relative">
              
              {/* Toggles Zen reader mode */}
              <button
                onClick={() => handleUpdateSettings({ zenMode: true })}
                className="p-2 rounded-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                title="Enter clean Zen reading mode"
              >
                <Eye className="w-5.h-5" />
              </button>

              {/* Display text controls panel toggle */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-xl transition ${
                  showSettings 
                    ? 'bg-amber-500/15 text-amber-600' 
                    : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
                title="Customize text layouts and themes"
              >
                <SlidersHorizontal className="w-[18px] h-[18px]" />
              </button>

              {/* Theme custom settings drawer popUp */}
              <ThemeSelector
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
              />
            </div>
          </div>
        </header>
      )}

      {/* --- STUDY HUB SIDEBAR DRAWER --- */}
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

      {/* --- MAIN PAGE VIEWPORT CONTAINER --- */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 my-6 md:my-10 relative">

        {/* --- INTERACTIVE DAILY READING PLAN PROGRESS TRACKER --- */}
        {!settings.zenMode && (
          <ReadingPlansTracker
            activeProgress={readingPlanProgress}
            onSelectBook={setSelectedBook}
            onSelectChapter={setSelectedChapter}
            onUpdateProgress={setReadingPlanProgress}
          />
        )}

        {/* --- GLOBAL BIBLE READING PROGRESS DASHBOARD --- */}
        {!settings.zenMode && (
          <BibleProgressDashboard
            completedChapters={completedChapters}
            onSelectBook={setSelectedBook}
            onSelectChapter={setSelectedChapter}
            readingStreak={readingStreak}
            onResetProgress={() => setCompletedChapters([])}
          />
        )}

        {/* --- DAILY DEVOTIONAL / ENCOURAGEMENT CARD (Hidden in Zen Mode) --- */}
        {!settings.zenMode && selectedChapter === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-1.5 mb-3 text-amber-600 dark:text-amber-400 text-xs font-semibold tracking-wide uppercase font-mono">
              <Sparkles className="w-4 h-4" />
              Verse of the Day
            </div>
            
            <p className="font-serif italic text-base md:text-lg text-zinc-900 dark:text-zinc-105 leading-relaxed mb-4">
              “{DAILY_WORDS_OF_ENCOURAGEMENT[dailyVerseIndex].text}”
            </p>

            <div className="flex items-center justify-between pointer bg-zinc-50 dark:bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-850">
              <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 font-sans">
                {DAILY_WORDS_OF_ENCOURAGEMENT[dailyVerseIndex].reference} (WEB)
              </div>
              <button 
                onClick={() => {
                  // Direct navigation callback
                  const item = DAILY_WORDS_OF_ENCOURAGEMENT[dailyVerseIndex];
                  const [bookPart, refPart] = item.reference.split(' ');
                  const [chapPart, versePart] = refPart.split(':');
                  const bookMeta = BIBLE_BOOKS.find(b => b.name.toLowerCase().startsWith(bookPart.toLowerCase().substring(0, 3)));
                  if (bookMeta) {
                    setSelectedBook(bookMeta);
                    setSelectedChapter(parseInt(chapPart));
                  }
                }}
                className="py-1 px-3 text-[10px] font-bold text-amber-600 hover:text-amber-500 dark:text-amber-400 uppercase tracking-widest font-mono"
              >
                Read Chapter →
              </button>
            </div>
          </motion.div>
        )}

        {/* --- DYNAMIC MAIN READER GLASSES CANVAS --- */}
        <div className={`rounded-3xl p-6 sm:p-9 md:p-11 shadow-lg transition-colors border ${getThemeContainerClass()} ${
          settings.zenMode ? 'my-2 md:my-6 rounded-2xl' : ''
        }`}>
          
          {/* Reader Head details */}
          <div className="flex items-center justify-between pb-4.5 border-b border-current/15 mb-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 font-mono">
                {TRANSLATIONS.find(t=>t.id===settings.translation)?.name}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
                {selectedBook.name} {selectedChapter}
              </h2>
            </div>

            {/* Quick Bookmark Status Banner key */}
            {!settings.zenMode && (
              <button
                onClick={handleToggleBookmark}
                className="p-2 py-1 flex items-center gap-1 bg-current/5 hover:bg-current/10 border-0 rounded-full transition text-xs font-semibold"
                title="Toggle chapter bookmark"
              >
                <Bookmark className={`w-4 h-4 ${isCurrentChapterBookmarked() ? 'fill-amber-500 text-amber-500' : 'opacity-70'}`} />
                <span className="text-[10px] uppercase font-mono mr-1">
                  {isCurrentChapterBookmarked() ? 'Saved' : 'Bookmark'}
                </span>
              </button>
            )}
          </div>

          {/* Local filter Search in chapter (only if not Zen mode) */}
          {!settings.zenMode && verses.length > 0 && (
            <div className="mb-6 relative flex flex-col w-full" ref={searchContainerRef}>
              <div className="relative flex items-center w-full">
                <Search className="w-4 h-4 text-current/50 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder={`Search/isolate terms in ${selectedBook.name} ${selectedChapter}...`}
                  value={activeSearch}
                  onChange={(e) => {
                    setActiveSearch(e.target.value);
                    setSearchFocused(true);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  onKeyDown={handleSearchKeyPress}
                  className="w-full bg-current/5 p-2 py-1.5 pl-9 pr-8 rounded-xl border-0 focus:ring-1 focus:ring-amber-500/20 text-xs font-sans outline-none text-current"
                />
                {activeSearch && (
                  <button 
                    onClick={() => { setActiveSearch(''); setSearchFocused(false); }}
                    className="absolute right-3 p-0.5 rounded hover:bg-zinc-400/20 text-xs text-rose-500 font-bold font-mono"
                  >
                    ✕
                  </button>
                )}
              </div>

              {searchFocused && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl z-40 max-h-[45vh] overflow-y-auto text-xs text-zinc-700 dark:text-zinc-200 p-2 space-y-4">
                  {(() => {
                    const data = getAutocompleteSuggestions();
                    const showHistoryList = data.history.length > 0;
                    const showTopicsList = data.topics && data.topics.length > 0;
                    const showBooksList = data.books.length > 0;
                    const showVersesList = data.verses.length > 0;

                    if (!showHistoryList && !showTopicsList && !showBooksList && !showVersesList) {
                      return (
                        <div className="text-center py-5 opacity-60 italic font-mono text-[10px]">
                          No matches found. Press Enter to search anyway.
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-3.5">
                        {/* Books matches */}
                        {showBooksList && (
                          <div>
                            <div className="px-2 pb-1.5 text-[9px] font-mono font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 select-none">
                              Go to Matching Books
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 px-1">
                              {data.books.map(b => (
                                <button
                                  key={b.id}
                                  onClick={() => {
                                    setSelectedBook(b);
                                    setSelectedChapter(1);
                                    setActiveSearch('');
                                    setSearchFocused(false);
                                  }}
                                  className="flex items-center gap-1.5 p-2 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-amber-500/10 hover:border-amber-500/20 text-left transition text-zinc-900 dark:text-zinc-50 shrink-0 cursor-pointer text-xs"
                                >
                                  <span className="font-bold">{b.name}</span>
                                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-extrabold select-none shrink-0 text-zinc-500">
                                    {b.testament}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Verse matches in current chapter */}
                        {showVersesList && (
                          <div>
                            <div className="px-2 pb-1 text-[9px] font-mono font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 select-none">
                              Matches in This Chapter
                            </div>
                            <div className="space-y-1 mt-1 px-1">
                              {data.verses.map(v => (
                                <button
                                  key={v.verse}
                                  onClick={() => {
                                    const targetId = `verse-line-${v.verse}`;
                                    const targetEl = document.getElementById(targetId);
                                    if (targetEl) {
                                      // Select & Scroll
                                      handleToggleVerseSelection(v);
                                      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                    setSearchFocused(false);
                                  }}
                                  className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 hover:bg-amber-500/10 hover:border-amber-500/20 text-left transition flex items-start gap-2 border border-transparent cursor-pointer"
                                >
                                  <sup className="text-[9px] font-black text-amber-600 mt-1 select-none">{v.verse}</sup>
                                  <p className="line-clamp-2 text-zinc-800 dark:text-zinc-200 leading-tight">
                                    {v.text.trim()}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* History log list */}
                        {showHistoryList && (
                          <div>
                            <div className="px-2 pb-1 text-[9px] font-mono font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center justify-between select-none">
                              <span>Recent Searches</span>
                              <button
                                onClick={handleClearSearchHistory}
                                className="text-[9px] hover:underline hover:text-rose-500 font-mono font-extrabold cursor-pointer p-0.5"
                              >
                                Clear
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-1.5 px-2 mt-1.5">
                              {data.history.map((term, index) => (
                                <button
                                  key={term + index}
                                  onClick={() => handleSelectSearchQuery(term)}
                                  className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500/20 hover:text-amber-650 dark:hover:text-amber-400 transition cursor-pointer"
                                >
                                  {term}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Trending Topics Suggestions */}
                        {showTopicsList && (
                          <div>
                            <div className="px-2 pb-1 text-[9px] font-mono font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 select-none">
                              Popular Biblical Topics
                            </div>
                            <div className="flex flex-wrap gap-1.5 px-2 mt-1.5">
                              {data.topics.map(topic => (
                                <button
                                  key={topic}
                                  onClick={() => handleSelectSearchQuery(topic)}
                                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-zinc-50 dark:bg-zinc-950 hover:bg-amber-500/25 border border-zinc-150 dark:border-zinc-850 hover:border-amber-500/30 transition cursor-pointer capitalize"
                                >
                                  {topic}
                                </button>
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

          {/* --- SKELETON LOADER --- */}
          {loading && (
            <div className="space-y-4 py-8 animate-pulse">
              <div className="h-4 bg-current/10 rounded-full w-2/3" />
              <div className="h-4 bg-current/10 rounded-full w-4/5" />
              <div className="h-4 bg-current/10 rounded-full w-3/4" />
              <div className="h-4 bg-current/10 rounded-full w-11/12" />
              <div className="h-4 bg-current/10 rounded-full w-5/6" />
            </div>
          )}

          {/* --- ERROR DIAGNOSTIC STATE --- */}
          {!loading && errorStatus && (
            <div className="text-center py-10">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3.5" />
              <p className="text-sm font-semibold mb-2">{errorStatus}</p>
              <p className="text-xs opacity-60 max-w-sm mx-auto mb-6">
                You are currently offline or standard network limits triggered. Read excellent preloaded Offline studies below:
              </p>
              
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <button
                  onClick={() => { setSelectedBook(BIBLE_BOOKS.find(b=>b.id==='PSA')!); setSelectedChapter(23); }}
                  className="py-2.5 px-4 bg-current/5 rounded-xl text-xs font-bold hover:bg-current/10 border-0 transition cursor-pointer"
                >
                  Psalms 23 (KJV/WEB)
                </button>
                <button
                  onClick={() => { setSelectedBook(BIBLE_BOOKS.find(b=>b.id==='JHN')!); setSelectedChapter(1); }}
                  className="py-2.5 px-4 bg-current/5 rounded-xl text-xs font-bold hover:bg-current/10 border-0 transition cursor-pointer"
                >
                  John 1 (KJV/WEB)
                </button>
              </div>
            </div>
          )}

          {/* --- ACTIVE BOOK READER DISPLAY CANVAS --- */}
          {!loading && !errorStatus && (
            <div>
              {/* If comparing, display comparison control panel */}
              {isComparing && (
                <div id="comparison-controls-header" className="mb-6 p-4.5 bg-current/5 border border-current/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest text-[9px] font-mono bg-amber-500/15 px-2 py-0.5 rounded-full">Comparison Lens</span>
                    <span className="font-semibold text-current opacity-80">Compare {TRANSLATIONS.find(t => t.id === settings.translation)?.short} with:</span>
                    <div className="relative">
                      <select
                        value={compareTranslation}
                        onChange={(e) => setCompareTranslation(e.target.value)}
                        className="appearance-none font-bold text-[10px] pl-2.5 pr-6 py-1 bg-current/10 hover:bg-current/15 text-current border-0 rounded-lg cursor-pointer outline-none uppercase tracking-wider text-xs"
                      >
                        {TRANSLATIONS.map(t => (
                          <option key={t.id} value={t.id} disabled={t.id === settings.translation} className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 font-sans">
                            {t.name}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[7px] opacity-75 pointer-events-none">▼</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto select-none">
                    <div className="flex bg-current/5 p-0.5 rounded-lg border border-current/10">
                      <button
                        onClick={() => setCompareLayout('side-by-side')}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition flex items-center gap-1 shrink-0 cursor-pointer ${
                          compareLayout === 'side-by-side' ? 'bg-amber-500 text-zinc-950 font-black' : 'opacity-65 hover:opacity-100'
                        }`}
                        title="Display translations side-by-side"
                      >
                        <Columns className="w-2.5 h-2.5" />
                        <span>Side-by-Side</span>
                      </button>
                      <button
                        onClick={() => setCompareLayout('interlinear')}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition flex items-center gap-1 shrink-0 cursor-pointer ${
                          compareLayout === 'interlinear' ? 'bg-amber-555 text-zinc-950 font-black' : 'opacity-65 hover:opacity-100'
                        }`}
                        title="Display stacked verse by verse"
                      >
                        <Layers className="w-2.5 h-2.5" />
                        <span>Interlinear</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setIsComparing(false)}
                      className="p-1 px-2 border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 rounded-lg transition text-[10px] font-bold cursor-pointer"
                      title="Exit comparison view"
                    >
                      ✕ Close
                    </button>
                  </div>
                </div>
              )}

              {/* Dynamic reading display */}
              {!isComparing ? (
                /* Regular single column reading */
                <div className={`${getBodyFontFamilyClass()} ${getFontSizeClass()} ${getLineHeightClass()} text-left`}>
                  {getFilteredVerses().length === 0 ? (
                    <div className="text-center py-10 opacity-60 text-xs">
                      No scriptures matching "{activeSearch}" found inside this chapter.
                    </div>
                  ) : (
                    getFilteredVerses().map((verse) => {
                      const isSelected = selectedVerses.some(v => v.verse === verse.verse);
                      
                      // Query highlight
                      const hlId = `${settings.translation}_${verse.book_id}_${verse.chapter}_${verse.verse}`;
                      const highlightObj = highlights.find(h => h.id === hlId);
                      const hasHighlight = !!highlightObj;
                      const highlightClass = hasHighlight ? getHighlightClass(highlightObj.color) : '';

                      // Query note indicator
                      const noteId = `${verse.book_id}_${verse.chapter}_${verse.verse}`;
                      const hasNote = notes.some(n => n.id === noteId);

                      return (
                        <span
                          key={verse.verse}
                          id={`verse-line-${verse.verse}`}
                          onClick={() => handleToggleVerseSelection(verse)}
                          className={`inline-block mr-1 rounded-md cursor-pointer hover:bg-amber-500/10 transition-all ${
                            isSelected ? 'ring-2 ring-amber-550/40 bg-amber-500/5' : ''
                          } ${highlightClass}`}
                        >
                          {/* Verse count index identifier */}
                          <sup className="text-[10px] font-sans font-bold text-amber-600/80 mr-1 select-none">
                            {verse.verse}
                          </sup>
                          
                          {/* Actual verse textual body */}
                          <span className="font-medium mr-1.5 selection:bg-amber-100">
                            {verse.text.trim()}
                          </span>

                          {/* Sticky local notepad icon indicator */}
                          {hasNote && (
                            <span className="inline-block px-1 ml-0.5 bg-amber-500/25 border-0 rounded text-[9px] font-bold text-amber-700 dark:text-amber-400 font-sans tracking-tight align-middle" title="Linked study note">
                              ✎ NOTE
                            </span>
                          )}
                        </span>
                      );
                    })
                  )}
                </div>
              ) : (
                /* Comparing layout */
                <div className={`${getBodyFontFamilyClass()} ${getFontSizeClass()} text-left`}>
                  {getFilteredVerses().length === 0 ? (
                    <div className="text-center py-10 opacity-60 text-xs">
                      No scriptures matching "{activeSearch}" found inside this chapter.
                    </div>
                  ) : compareLayout === 'side-by-side' ? (
                    /* Side-by-Side column layout aligned row-by-row */
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 pb-2 border-b border-current/15 uppercase font-mono text-[10px] font-black opacity-65 tracking-widest hidden md:grid select-none">
                        <div>Primary: {TRANSLATIONS.find(t=>t.id===settings.translation)?.name}</div>
                        <div>Comparison: {TRANSLATIONS.find(t=>t.id===compareTranslation)?.name}</div>
                      </div>
                      
                      {getFilteredVerses().map((verse) => {
                        const isSelected = selectedVerses.some(v => v.verse === verse.verse);
                        
                        // Highlights & Notes
                        const hlId = `${settings.translation}_${verse.book_id}_${verse.chapter}_${verse.verse}`;
                        const highlightObj = highlights.find(h => h.id === hlId);
                        const hasHighlight = !!highlightObj;
                        const highlightClass = hasHighlight ? getHighlightClass(highlightObj.color) : '';
                        const noteId = `${verse.book_id}_${verse.chapter}_${verse.verse}`;
                        const hasNote = notes.some(n => n.id === noteId);

                        // Find match in compared translation
                        const matchedCompareVerse = compareVerses.find(cv => cv.verse === verse.verse);

                        return (
                          <div
                            key={verse.verse}
                            id={`verse-line-${verse.verse}`}
                            onClick={() => handleToggleVerseSelection(verse)}
                            className={`grid grid-cols-1 md:grid-cols-2 gap-4 py-3 px-3.5 border-b border-dashed border-current/10 rounded-2xl transition cursor-pointer hover:bg-amber-500/5 ${
                              isSelected ? 'ring-2 ring-amber-550/40 bg-amber-500/5' : ''
                            } ${highlightClass}`}
                          >
                            {/* Column 1: Primary Translation */}
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 opacity-60 text-[10px] font-mono font-bold uppercase select-none md:hidden">
                                <span>{TRANSLATIONS.find(t=>t.id===settings.translation)?.short}</span>
                              </div>
                              <div>
                                <sup className="text-[10px] font-sans font-black text-amber-555/80 mr-1.5 select-none">{verse.verse}</sup>
                                <span className="font-medium">{verse.text.trim()}</span>
                                {hasNote && (
                                  <span className="inline-block px-1 ml-1.5 bg-amber-500/25 border-0 rounded text-[9px] font-bold text-amber-700 dark:text-amber-400 font-sans tracking-tight align-middle" title="Linked study note">
                                    ✎ NOTE
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Column 2: Comparison Translation */}
                            <div className="space-y-1 border-t md:border-t-0 border-current/10 pt-2.5 md:pt-0 opacity-90">
                              <div className="flex items-center gap-1.5 opacity-60 text-[10px] font-mono font-bold uppercase select-none md:hidden">
                                <span>{TRANSLATIONS.find(t=>t.id===compareTranslation)?.short}</span>
                              </div>
                              <div>
                                <sup className="text-[10px] font-sans font-black text-amber-555/80 mr-1.5 select-none">{verse.verse}</sup>
                                {compareLoading ? (
                                  <span className="text-xs opacity-55 animate-pulse font-sans italic">Connecting translate stream...</span>
                                ) : compareError ? (
                                  <span className="text-xs text-rose-500 font-sans italic">Not available in this version</span>
                                ) : matchedCompareVerse ? (
                                  <span>{matchedCompareVerse.text.trim()}</span>
                                ) : (
                                  <span className="text-xs opacity-40 font-sans italic">Verse missing</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Interlinear stacked verse-by-verse layout */
                    <div className="space-y-4">
                      {getFilteredVerses().map((verse) => {
                        const isSelected = selectedVerses.some(v => v.verse === verse.verse);
                        
                        // Highlights & Notes
                        const hlId = `${settings.translation}_${verse.book_id}_${verse.chapter}_${verse.verse}`;
                        const highlightObj = highlights.find(h => h.id === hlId);
                        const hasHighlight = !!highlightObj;
                        const highlightClass = hasHighlight ? getHighlightClass(highlightObj.color) : '';
                        const noteId = `${verse.book_id}_${verse.chapter}_${verse.verse}`;
                        const hasNote = notes.some(n => n.id === noteId);

                        // Find match in compared translation
                        const matchedCompareVerse = compareVerses.find(cv => cv.verse === verse.verse);

                        return (
                          <div
                            key={verse.verse}
                            id={`verse-line-${verse.verse}`}
                            onClick={() => handleToggleVerseSelection(verse)}
                            className={`py-3.5 px-4.5 border-b border-dashed border-current/10 rounded-2xl transition cursor-pointer hover:bg-amber-500/5 space-y-2.5 ${
                              isSelected ? 'ring-2 ring-amber-500/40 bg-amber-500/5' : ''
                            } ${highlightClass}`}
                          >
                            {/* Verse header line info */}
                            <div className="flex items-center justify-between select-none border-b border-current/5 pb-1">
                              <span className="text-xs font-black font-sans text-amber-555 flex items-center gap-1">
                                <span className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-[10px]">{verse.verse}</span>
                                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Verse Reference</span>
                              </span>
                              {hasNote && (
                                <span className="inline-block px-1.5 py-0.5 bg-amber-500/25 border-0 rounded text-[9px] font-bold text-amber-700 dark:text-amber-400 font-sans tracking-tight" title="Linked study note">
                                  ✎ Linked Note
                                </span>
                              )}
                            </div>

                            {/* Primary stack line */}
                            <div className="pl-4.5 border-l-2 border-amber-500/40 py-0.5">
                              <span className="text-[9px] uppercase font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded font-black mr-2 tracking-wider inline-block mb-1 select-none">
                                {TRANSLATIONS.find(t=>t.id===settings.translation)?.short}
                              </span>
                              <p className="leading-relaxed text-current font-medium">{verse.text.trim()}</p>
                            </div>

                            {/* Compared stack line */}
                            <div className="pl-4.5 border-l-2 border-current/25 py-0.5 opacity-90">
                              <span className="text-[9px] uppercase font-mono bg-current/10 px-1.5 py-0.5 rounded font-black mr-2 tracking-wider inline-block mb-1 select-none">
                                {TRANSLATIONS.find(t=>t.id===compareTranslation)?.short}
                              </span>
                              {compareLoading ? (
                                <p className="text-xs opacity-55 animate-pulse font-sans italic">Loading dynamic translation...</p>
                              ) : compareError ? (
                                <p className="text-xs text-rose-500 font-sans italic">This verse is translation-restricted or unavailable.</p>
                              ) : matchedCompareVerse ? (
                                <p className="leading-relaxed">{matchedCompareVerse.text.trim()}</p>
                              ) : (
                                <p className="text-xs opacity-40 font-sans italic">Not found</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* WordUp Africa - Beautiful Interactive Study & Commentary Companion */}
              {offlineCommentary && (
                <div id="wordup-offline-commentary-panel" className="mt-8 border border-amber-500/20 dark:border-amber-400/20 bg-amber-500/[0.04] dark:bg-amber-400/[0.02] rounded-3xl p-5 md:p-8 space-y-6 text-left">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-amber-500/10 dark:border-amber-400/10">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                        <BookOpen className="w-5 h-5 animate-pulse" />
                      </span>
                      <div>
                        <h4 className="font-extrabold text-[15px] text-zinc-900 dark:text-zinc-100 flex items-center gap-2 font-sans select-none">
                          WordUp Study Companion
                        </h4>
                        <p className="text-[10px] font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
                          Interactive Offline Commentary Guide
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs px-2.5 py-1 font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-full border border-amber-500/20 shadow-sm font-sans select-none">
                      🔒 Fully Offline Mode
                    </span>
                  </div>

                  {/* Badges metadata layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-current/5 shadow-xs">
                      <p className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest leading-none select-none">HISTORICAL AUTHOR</p>
                      <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 mt-1 font-sans">{offlineCommentary.author}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-current/5 shadow-xs">
                      <p className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest leading-none select-none">CHRONOLOGY PERIOD</p>
                      <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 mt-1 font-sans">{offlineCommentary.period}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-current/5 shadow-xs">
                      <p className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest leading-none select-none">MAJOR CENTRAL THEME</p>
                      <p className="text-sm font-black text-zinc-900 dark:text-zinc-100 mt-1 font-sans truncate" title={offlineCommentary.theme}>{offlineCommentary.theme}</p>
                    </div>
                  </div>

                  {/* Summary commentary paragraph */}
                  <div className="space-y-2">
                    <h5 className="font-bold text-xs uppercase font-sans text-zinc-400 tracking-wider select-none">Book Context Overview</h5>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif">
                      {offlineCommentary.summary}
                    </p>
                  </div>

                  {/* African Application & Reflection */}
                  <div className="p-4.5 rounded-2xl border border-amber-500/10 bg-amber-500/5 dark:bg-amber-400/5 space-y-2 relative overflow-hidden">
                    <div className="absolute right-2 bottom-0 text-amber-500/[0.04] pointer-events-none select-none">
                      <Flame className="w-24 h-24" />
                    </div>
                    <h5 className="font-extrabold text-xs uppercase font-sans text-amber-600 dark:text-amber-400 flex items-center gap-1.5 select-none animate-bounce">
                      <Flame className="w-4 h-4 text-amber-500" />
                      <span>African Communal Application & Reflection</span>
                    </h5>
                    <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 font-serif">
                      {offlineCommentary.africanFocus}
                    </p>
                  </div>

                  {/* Multi-chapter narrative structure outline */}
                  <div className="space-y-3">
                    <h5 className="font-bold text-xs uppercase font-sans text-zinc-400 tracking-wider select-none">Narrative Book Outlines</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {offlineCommentary.outlineParts.map((part, index) => {
                        const isCurrentRange = selectedChapter >= part.range[0] && selectedChapter <= part.range[1];
                        return (
                          <div 
                            key={index} 
                            className={`p-4 rounded-2xl transition border ${
                              isCurrentRange 
                                ? 'bg-amber-500/10 border-amber-500/30' 
                                : 'bg-white dark:bg-zinc-900/40 border-current/5 hover:border-current/15'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono leading-none bg-current/5 font-extrabold py-1 px-2 rounded-md uppercase select-none">
                                Chapters {part.range[0]} - {part.range[1]}
                              </span>
                              {isCurrentRange && (
                                <span className="text-[9px] font-mono font-extrabold leading-none bg-amber-500 text-zinc-950 dark:bg-amber-400 dark:text-zinc-950 py-1 px-1.5 rounded-md uppercase select-none font-sans">
                                  Current Course
                                </span>
                              )}
                            </div>
                            <h6 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mt-2 font-sans">{part.label}</h6>
                            <p className="text-xs text-zinc-500 dark:text-zinc-450 mt-1 leading-snug">{part.details}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clickable Key Verses */}
                  <div className="space-y-3 pt-2">
                    <h5 className="font-bold text-xs uppercase font-sans text-zinc-400 tracking-wider select-none">Famous Highlights of the Book (Click to Jump)</h5>
                    <div className="space-y-2.5">
                      {offlineCommentary.keyVerses.map((kv, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedChapter(kv.chapter);
                            // Highlight the verse on layout load
                            setTimeout(() => {
                              const elem = document.getElementById(`verse-line-${kv.verse}`);
                              if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 500);
                          }}
                          className={`w-full p-4 rounded-xl bg-white dark:bg-zinc-900 border border-current/5 hover:border-amber-500/30 hover:bg-amber-500/[0.02] text-left transition relative overflow-hidden flex flex-col md:flex-row md:items-start justify-between gap-2.5 cursor-pointer shadow-xs`}
                        >
                          <div className="space-y-1">
                            <span className="text-[10px] font-black font-mono text-amber-600 dark:text-amber-400 uppercase select-none">
                              {kv.ref}
                            </span>
                            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-snug font-serif italic">
                              "{kv.text}"
                            </p>
                          </div>
                          <span className="text-[9px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase flex items-center gap-1 shrink-0 self-end md:self-start border border-current/5 rounded px-1.5 py-0.5 select-none leading-none">
                            Jump to Chapter {kv.chapter} ↗
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* --- CHAPTER COMPLETION INDICATOR BAR --- */}
          {!loading && !errorStatus && !settings.zenMode && (
            <div className="mt-8 pt-4.5 border-t border-dashed border-current/10">
              <button
                onClick={() => {
                  const chapKey = `${selectedBook.id}_${selectedChapter}`;
                  if (completedChapters.includes(chapKey)) {
                    setCompletedChapters(completedChapters.filter(k => k !== chapKey));
                  } else {
                    setCompletedChapters([...completedChapters, chapKey]);
                    recordStreakActivity();
                  }
                }}
                className={`w-full py-4 px-5 rounded-2xl border transition flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-left cursor-pointer ${
                  completedChapters.includes(`${selectedBook.id}_${selectedChapter}`)
                    ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-550/30 text-emerald-850 dark:text-emerald-450 hover:bg-emerald-500/20'
                    : 'bg-current/5 hover:bg-current/10 border-current/10 text-current'
                }`}
              >
                <div className="flex items-center gap-3">
                  {completedChapters.includes(`${selectedBook.id}_${selectedChapter}`) ? (
                    <div className="w-5.5 h-5.5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white dark:text-zinc-950 fill-none" />
                    </div>
                  ) : (
                    <div className="w-5.5 h-5.5 rounded-full border border-current/35 flex items-center justify-center shrink-0 text-[10px] font-black" />
                  )}
                  <div>
                    <h4 className="text-xs font-bold leading-tight">
                      {completedChapters.includes(`${selectedBook.id}_${selectedChapter}`)
                        ? `You finished reading ${selectedBook.name} ${selectedChapter}!`
                        : `Finished reading ${selectedBook.name} ${selectedChapter}?`
                      }
                    </h4>
                    <p className="text-[10px] opacity-65 leading-none mt-1">
                      {completedChapters.includes(`${selectedBook.id}_${selectedChapter}`)
                        ? 'Great job keeping up your daily studies! Click to undo.'
                        : 'Record this chapter to increase your overall Bible progress.'
                      }
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-[10px] font-mono font-black uppercase tracking-wider bg-current/10 px-3 py-1 rounded-full text-center">
                  {completedChapters.includes(`${selectedBook.id}_${selectedChapter}`) ? 'Completed ✓' : 'Mark as Read'}
                </div>
              </button>
            </div>
          )}

          {/* Navigation Controls drawer (Skipped if Zen mode) */}
          {!settings.zenMode && (
            <div className="flex items-center justify-between border-t border-current/10 pt-6 mt-8">
              <button
                onClick={handlePrevChapter}
                className="flex items-center gap-1.5 py-2 px-3 hover:bg-current/5 rounded-xl transition text-xs font-semibold text-zinc-500"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Chapter</span>
              </button>
              
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-60 font-mono">
                {selectedBook.name} {selectedChapter} / {selectedBook.chapters}
              </div>

              <button
                onClick={handleNextChapter}
                className="flex items-center gap-1.5 py-2 px-3 hover:bg-current/5 rounded-xl transition text-xs font-semibold text-zinc-500"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* --- FLOATING SELECTION INTERACTIVE DOCK TOOLBAR --- */}
      <HighlightToolbar
        selectedVerses={selectedVerses}
        onClearSelection={() => setSelectedVerses([])}
        onApplyHighlight={handleApplyHighlight}
        onRemoveHighlight={handleRemoveHighlight}
        onOpenShareCard={() => setShowShareCard(true)}
        onSaveNote={handleSaveNote}
        existingNoteText={
          selectedVerses.length > 0 
            ? notes.find(n => n.id === `${selectedVerses[0].book_id}_${selectedVerses[0].chapter}_${selectedVerses[0].verse}`)?.text || ''
            : ''
        }
        isBookmarked={isCurrentChapterBookmarked()}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* --- SOCIAL IMAGE SHARE CARD GENERATOR MODAL --- */}
      <ShareCardModal
        isOpen={showShareCard}
        onClose={() => setShowShareCard(false)}
        selectedVerses={selectedVerses}
        translation={settings.translation}
      />

      {/* --- LANGUAGES & ABBREVIATION CODES REFERENCE GUIDE --- */}
      <AnimatePresence>
        {showLanguagesList && (
          <LanguagesGuideModal
            isOpen={showLanguagesList}
            onClose={() => setShowLanguagesList(false)}
            activeTranslation={settings.translation}
            onSelectTranslation={(id) => handleUpdateSettings({ translation: id as any })}
          />
        )}
      </AnimatePresence>

      {/* --- YOUVERSION-STYLE BOOK PICKER FULL OVERLAY --- */}
      {showBookPicker && (
        <div id="book-picker-overlay" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-2xl h-[80vh] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header select */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-sans font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Book className="w-4.5 h-4.5 text-amber-500" />
                Select Navigation Point
              </h3>
              <button 
                onClick={() => { setShowBookPicker(false); setPickedBook(null); setPickedChapter(null); setShowChapterPicker(false); setShowVersePicker(false); }}
                className="p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {/* Breadcrumb Steps selection bar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-150 dark:border-zinc-850 text-xs text-zinc-500 bg-zinc-50/50 dark:bg-zinc-955/50 font-sans select-none shrink-0">
              <button
                onClick={() => {
                  setShowChapterPicker(false);
                  setShowVersePicker(false);
                }}
                className={`font-semibold hover:text-amber-600 transition ${!showChapterPicker && !showVersePicker ? 'text-amber-550 font-bold underline decoration-2 underline-offset-4' : ''}`}
              >
                1. Book {pickedBook ? `(${pickedBook.name})` : ''}
              </button>
              
              <span className="opacity-40">/</span>

              <button
                disabled={!pickedBook}
                onClick={() => {
                  setShowChapterPicker(true);
                  setShowVersePicker(false);
                }}
                className={`font-semibold hover:text-amber-600 transition disabled:opacity-40 disabled:pointer-events-none ${showChapterPicker ? 'text-amber-550 font-bold underline decoration-2 underline-offset-4' : ''}`}
              >
                2. Chapter {pickedChapter ? `(${pickedChapter})` : ''}
              </button>

              <span className="opacity-40">/</span>

              <button
                disabled={pickedChapter === null}
                className={`font-semibold disabled:opacity-40 disabled:pointer-events-none ${showVersePicker ? 'text-amber-550 font-bold underline decoration-2 underline-offset-4' : ''}`}
              >
                3. Verse
              </button>
            </div>

            {/* If choosing book */}
            {!showChapterPicker && !showVersePicker && (
              <>
                {/* Testament Tabs */}
                <div className="grid grid-cols-2 border-b border-zinc-150 dark:border-zinc-850 shrink-0">
                  <button
                    onClick={() => setPickerTab('OT')}
                    className={`py-3 text-xs font-bold tracking-wider text-center border-b-2 uppercase ${
                      pickerTab === 'OT' ? 'border-amber-500 text-amber-600' : 'border-transparent text-zinc-500'
                    }`}
                  >
                    Old Testament (39)
                  </button>
                  <button
                    onClick={() => setPickerTab('NT')}
                    className={`py-3 text-xs font-bold tracking-wider text-center border-b-2 uppercase ${
                      pickerTab === 'NT' ? 'border-amber-500 text-amber-600' : 'border-transparent text-zinc-500'
                    }`}
                  >
                    New Testament (27)
                  </button>
                </div>

                {/* Books Grid */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {BIBLE_BOOKS.filter(b => b.testament === pickerTab).map(book => (
                    <button
                      key={book.id}
                      onClick={() => handleSelectBookFromMenu(book)}
                      className={`py-2 px-3 rounded-xl border border-zinc-150 dark:border-zinc-800 text-left hover:border-amber-550/40 hover:bg-amber-500/5 transition text-xs font-semibold ${
                        selectedBook.id === book.id 
                          ? 'border-amber-500 bg-amber-500/10 text-amber-600 font-bold' 
                          : 'text-zinc-800 dark:text-zinc-200 bg-zinc-50/50 dark:bg-zinc-850/50'
                      }`}
                    >
                      <div className="truncate">{book.name}</div>
                      <div className="text-[9px] font-mono opacity-50 font-normal">{book.chapters} Chapters</div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* If choosing chapter list */}
            {showChapterPicker && !showVersePicker && pickedBook && (
              <div className="flex-1 overflow-y-auto p-6">
                <button
                  onClick={() => { setShowChapterPicker(false); setShowVersePicker(false); }}
                  className="mb-4 text-xs font-bold text-amber-600 flex items-center gap-1 hover:underline"
                >
                  ← Back to Books
                </button>

                <h4 className="font-serif font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-4 border-b pb-2">
                  {pickedBook.name} Chapters
                </h4>

                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {Array.from({ length: pickedBook.chapters }, (_, idx) => idx + 1).map(num => (
                    <button
                      key={num}
                      onClick={() => handleSelectChapterFromMenu(num)}
                      className={`aspect-square w-full rounded-full border border-zinc-150 dark:border-zinc-800 font-mono text-xs font-bold flex items-center justify-center transition hover:border-amber-500 hover:bg-amber-500/10 ${
                        selectedBook.id === pickedBook.id && selectedChapter === num
                          ? 'bg-amber-500 text-zinc-950 font-black border-amber-500'
                          : 'text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-850'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* If choosing verse list */}
            {showVersePicker && pickedBook && pickedChapter !== null && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col h-full">
                <button
                  onClick={() => {
                    setShowVersePicker(false);
                    setShowChapterPicker(true);
                  }}
                  className="mb-4 text-xs font-bold text-amber-600 flex items-center gap-1 hover:underline self-start"
                >
                  ← Back to Chapters
                </button>

                <h4 className="font-serif font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-4 border-b pb-2 flex items-center justify-between">
                  <span>{pickedBook.name} {pickedChapter} : Select Verse</span>
                  {loadingVersesCount && (
                    <span className="text-xs font-sans font-normal opacity-50 animate-pulse">Loading exact verse count...</span>
                  )}
                </h4>

                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 pr-1">
                  {Array.from({ length: availableVerses }, (_, idx) => idx + 1).map(num => (
                    <button
                      key={num}
                      onClick={() => handleSelectVerseFromMenu(num)}
                      className="aspect-square w-full rounded-full border border-zinc-150 dark:border-zinc-800 font-mono text-xs font-bold flex items-center justify-center transition hover:border-amber-500 hover:bg-amber-500/10 text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-850"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* --- STANDARD FOOTER (Skips in Zen Mode) --- */}
      {!settings.zenMode && (
        <footer className="py-10 border-t border-zinc-200 dark:border-zinc-805 mt-20 bg-white dark:bg-zinc-900/60 transition-colors">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-1.5 mb-3">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#B45309]">
                WordUp Africa Bible Reader
              </span>
            </div>
            
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed mb-4">
              A distraction-free study terminal integrating legally free, public domain bibles.
            </p>

            <span className="text-[10px] font-mono text-zinc-400 block">
              100% Offline-First Caching Enabled
            </span>
          </div>
        </footer>
      )}
    </div>
  );
}
