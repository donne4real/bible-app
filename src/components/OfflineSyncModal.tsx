/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Wifi, 
  WifiOff, 
  DownloadCloud, 
  Database, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  DatabaseBackup,
  RefreshCw,
  Clock,
  HelpCircle
} from 'lucide-react';
import { BIBLE_BOOKS, getBookById } from '../bibleStructure';
import { Verse } from '../types';

interface OfflineSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTranslation: string;
  translationsList: { id: string; name: string; short: string }[];
  currentBookId: string;
  geminiApiKey?: string;
  onRefreshTrigger?: () => void; // Trigger UI update in primary reader after caching newly fetched chapters
}

interface CachedBookStats {
  translation: string;
  translationName: string;
  bookId: string;
  bookName: string;
  totalChapters: number;
  cachedChapters: number;
  progressPercent: number;
}

// Client-side translator identical to App.tsx logic
async function translateVersesClientSide(
  apiKey: string,
  translation: string,
  bookId: string,
  bookName: string,
  chapter: number,
  englishVerses: any[]
): Promise<any[]> {
  const dynamicLangs: { [key: string]: { name: string; native: string } } = {
    lsg: { name: 'French (Louis Segond)', native: 'Louis Segond' },
    yor: { name: 'Yoruba', native: 'Bibeli Mimọ' },
    ibo: { name: 'Igbo', native: 'Biblia Nso' },
    hau: { name: 'Hausa', native: 'Littafi Mai Tsarki' },
    pcm: { name: 'Nigerian Pidgin', native: 'Pidgin Bible' },
    ije: { name: 'Ijebu (Yoruba dialect)', native: 'Bíbélì Mímọ́ l’édè Ìjẹ̀bú' },
    tiv: { name: 'Tiv', native: 'Bibilo kachizha' },
    urh: { name: 'Urhobo', native: 'Obe Rere' },
    efi: { name: 'Efik / Ibibio', native: 'Edisana Ñwed Abasi' },
    edo: { name: 'Edo / Benin', native: 'Ebe Nọhuanrẹn l’ede Edo' },
    ijw: { name: 'Ijaw', native: 'Ebi Eni l’ede Ijaw' },
    igl: { name: 'Igala', native: 'Abakwane l’ede Igala' },
    ewe: { name: 'Ewe', native: 'Biblia' },
    twi: { name: 'Twi', native: 'Twere Kronkron' },
    swa: { name: 'Swahili', native: 'Biblia Takatifu' },
    zul: { name: 'Zulu', native: 'IBhayibheli Elingcwele' },
    xho: { name: 'Xhosa', native: 'IBhayibhile' },
    sna: { name: 'Shona', native: 'Bhaibheri' },
    amh: { name: 'Amharic', native: 'መጽሐፍ ቅዱስ' },
  };

  const langDetail = dynamicLangs[translation];
  if (!langDetail) return englishVerses;

  const versesList = englishVerses
    .map((v: any) => `[Verse ${v.verse}] ${v.text}`)
    .join('\n');

  const prompt = `You are an expert translator specializing in translating holy scriptures into different world languages.
Translate the following English Bible verses (from the World English Bible version) into accurate, beautiful, and theologically clean ${langDetail.name} (${langDetail.native}) translation.

Maintain the exact original verse numbers and formatting.
Render complete verses—do not skip, abbreviate, or merge any verses.
Ensure the translation sounds natural, poetic, elegant, and respectful to a native speaker.

Provide your output ONLY as a raw JSON array of objects, with no external markdown annotations, conversational text, or wrapper.
The JSON array must be structured exactly like this:
[
  { "verse": 1, "text": "..." },
  { "verse": 2, "text": "..." }
]

Input Verses:
${versesList}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini client translation request failed with status ${response.status}`);
  }

  const resJson = await response.json();
  const replyText = resJson.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '[]';
  const translatedArray = JSON.parse(replyText);

  return englishVerses.map((orig: any) => {
    const translationMatch = Array.isArray(translatedArray)
      ? translatedArray.find((item: any) => Number(item.verse) === orig.verse)
      : null;

    return {
      book_id: bookId,
      book_name: bookName,
      chapter: chapter,
      verse: orig.verse,
      text: translationMatch ? translationMatch.text : orig.text,
    };
  });
}

export default function OfflineSyncModal({
  isOpen,
  onClose,
  currentTranslation,
  translationsList,
  currentBookId,
  geminiApiKey,
  onRefreshTrigger
}: OfflineSyncModalProps) {
  // Connection state
  const [online, setOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  // Settings selection
  const [selectedTrans, setSelectedTrans] = useState<string>(currentTranslation);
  const [selectedBook, setSelectedBook] = useState<string>(currentBookId);

  // Sync operations
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0); // overall percentage
  const [downloadText, setDownloadText] = useState('');
  const [cancelRequested, setCancelRequested] = useState(false);

  // Stats
  const [cachedStats, setCachedStats] = useState<CachedBookStats[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateOnline = () => setOnline(true);
    const updateOffline = () => setOnline(false);
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOffline);
    return () => {
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOffline);
    };
  }, []);

  // Recalculate stats when modal opens or downloads completes
  const loadCacheStats = () => {
    try {
      const scanned: { [transId: string]: { [bookId: string]: Set<number> } } = {};
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('cached_bible_')) {
          const parts = key.split('_');
          if (parts.length >= 5) {
            const trans = parts[2];
            const bookId = parts[3];
            const chapter = parseInt(parts[4]);
            if (!isNaN(chapter)) {
              if (!scanned[trans]) scanned[trans] = {};
              if (!scanned[trans][bookId]) scanned[trans][bookId] = new Set();
              scanned[trans][bookId].add(chapter);
            }
          }
        }
      }

      const stats: CachedBookStats[] = [];

      Object.keys(scanned).forEach((transId) => {
        const transObj = translationsList.find((t) => t.id === transId);
        const transName = transObj ? transObj.name : transId.toUpperCase();

        Object.keys(scanned[transId]).forEach((bookId) => {
          const bookObj = BIBLE_BOOKS.find((b) => b.id === bookId);
          if (!bookObj) return;

          const totalChapters = bookObj.chapters;
          const cachedChapters = scanned[transId][bookId].size;
          const progressPercent = Math.round((cachedChapters / totalChapters) * 100);

          stats.push({
            translation: transId,
            translationName: transName,
            bookId,
            bookName: bookObj.name,
            totalChapters,
            cachedChapters,
            progressPercent,
          });
        });
      });

      // Sort by translation, then by book name
      stats.sort((a, b) => {
        if (a.translation !== b.translation) return a.translation.localeCompare(b.translation);
        return a.bookName.localeCompare(b.bookName);
      });

      setCachedStats(stats);
    } catch (e) {
      console.error("Failed to load local storage cache statistics", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadCacheStats();
      // Sync selections from props when opened
      setSelectedTrans(currentTranslation);
      setSelectedBook(currentBookId);
    }
  }, [isOpen, currentTranslation, currentBookId]);

  if (!isOpen) return null;

  const handleStartDownload = async () => {
    if (!online) {
      alert("You are currently offline. Please check your internet connection before pre-downloading books.");
      return;
    }

    const bookObj = BIBLE_BOOKS.find((b) => b.id === selectedBook);
    const transObj = translationsList.find((t) => t.id === selectedTrans);
    if (!bookObj || !transObj) return;

    setIsDownloading(true);
    setCancelRequested(false);
    setDownloadProgress(0);

    const totalChapters = bookObj.chapters;
    const bookName = bookObj.name;
    const bookId = bookObj.id;
    const translation = transObj.id;

    let successfulDownloads = 0;

    for (let currentCh = 1; currentCh <= totalChapters; currentCh++) {
      if (cancelRequested) {
        break;
      }

      setDownloadText(`Downloading ${bookName} (${transObj.short}) - Chapter ${currentCh} of ${totalChapters}...`);
      
      try {
        const standardTranslations = ['web', 'kjv', 'asv', 'bbe', 'ylt', 'darby', 'oeb-us', 'cherokee'];
        let payload: any = null;

        // Fetch using custom client Gemini engine if Key is available
        if (geminiApiKey && !standardTranslations.includes(translation)) {
          const webUrl = `https://bible-api.com/${encodeURIComponent(bookName)}+${currentCh}?translation=web`;
          const webResponse = await fetch(webUrl);
          if (webResponse.ok) {
            const webData = await webResponse.json();
            if (webData && webData.verses && webData.verses.length > 0) {
              const clientTranslatedVerses = await translateVersesClientSide(
                geminiApiKey,
                translation,
                bookId,
                bookName,
                currentCh,
                webData.verses
              );
              if (clientTranslatedVerses && clientTranslatedVerses.length > 0) {
                payload = { verses: clientTranslatedVerses };
              }
            }
          }
        }

        // If client-side Gemini didn't run, fetch normally
        if (!payload) {
          const isClientOnlyHost = typeof window !== 'undefined' && 
            window.location.hostname !== 'localhost' && 
            window.location.hostname !== '127.0.0.1' && 
            !window.location.hostname.includes('ais-dev-') && 
            !window.location.hostname.includes('ais-pre-') && 
            !window.location.hostname.includes('run.app');

          const apiBase = isClientOnlyHost 
            ? 'https://ais-pre-hpaahtl46w3udogfkuqmxr-565813577069.us-west2.run.app' 
            : '';

          const url = `${apiBase}/api/bible?translation=${translation}&book_id=${bookId}&book_name=${encodeURIComponent(bookName)}&chapter=${currentCh}`;
          const response = await fetch(url);
          
          let isResponseHtmlJsonFallback = false;
          if (response.ok) {
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('text/html')) {
              isResponseHtmlJsonFallback = true;
            } else {
              payload = await response.json();
            }
          }

          if (!response.ok || isResponseHtmlJsonFallback) {
            if (standardTranslations.includes(translation)) {
              const directUrl = `https://bible-api.com/${encodeURIComponent(bookName)}+${currentCh}?translation=${translation}`;
              const directResponse = await fetch(directUrl);
              if (directResponse.ok) {
                const directPayload = await directResponse.json();
                if (directPayload && directPayload.verses && directPayload.verses.length > 0) {
                  payload = {
                    verses: directPayload.verses.map((v: any) => ({
                      book_id: bookId,
                      book_name: bookName,
                      chapter: currentCh,
                      verse: v.verse,
                      text: v.text
                    }))
                  };
                }
              }
            }
          }
        }

        if (payload && payload.verses && payload.verses.length > 0) {
          const storageCacheKey = `cached_bible_${translation}_${bookId}_${currentCh}`;
          localStorage.setItem(storageCacheKey, JSON.stringify(payload.verses));
          successfulDownloads++;
        }
      } catch (err) {
        console.warn(`Error caching ${bookName} Ch ${currentCh}:`, err);
      }

      setDownloadProgress(Math.round((currentCh / totalChapters) * 100));
      // Small pause to prevent browser socket clamping
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setIsDownloading(false);
    setDownloadText('');
    loadCacheStats();
    if (onRefreshTrigger) {
      onRefreshTrigger();
    }
  };

  const handleCancelDownload = () => {
    setCancelRequested(true);
    setIsDownloading(false);
    setDownloadText('');
    loadCacheStats();
  };

  const handleDeleteCache = (transId: string, bookId: string) => {
    if (!confirm(`Are you sure you want to clear the locally downloaded cache of this book? It will no longer be available offline.`)) {
      return;
    }

    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`cached_bible_${transId}_${bookId}_`)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach((key) => localStorage.removeItem(key));
      loadCacheStats();
      if (onRefreshTrigger) {
        onRefreshTrigger();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const selectedBookObj = BIBLE_BOOKS.find((b) => b.id === selectedBook);
  const selectedTransObj = translationsList.find((t) => t.id === selectedTrans);

  return (
    <AnimatePresence>
      <div 
        id="offline-sync-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-955/60 dark:bg-zinc-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="offline-sync-modal-body"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden font-sans text-sm flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <DatabaseBackup className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                  Offline & Storage Manager
                </h3>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-none mt-0.5">
                  Prepare your library for offline or remote reading
                </p>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Connection Banner */}
          <div className={`px-5 py-2.5 text-xs flex items-center justify-between border-b ${
            online 
              ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border-emerald-100/35 dark:border-emerald-900/35' 
              : 'bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 border-amber-100/35 dark:border-amber-900/35'
          }`}>
            <div className="flex items-center gap-2">
              {online ? (
                <>
                  <Wifi className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-medium">Device is Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-amber-500 shrink-0 select-none animate-pulse" />
                  <span className="font-medium">Device is Offline</span>
                </>
              )}
            </div>
            <span className="text-[10px] opacity-80 uppercase tracking-wider font-bold">
              {online ? 'Ready to Cache' : 'Reading Local Database Only'}
            </span>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            
            {/* Guide section */}
            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
              <div className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 mb-1 text-[13px]">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                How does offline reading work?
              </div>
              <p>
                1. <strong className="text-zinc-800 dark:text-zinc-200">Instant Page Capture:</strong> Every single chapter you click on or read while online is automatically downloaded and saved to your browser database.
              </p>
              <p>
                2. <strong className="text-zinc-800 dark:text-zinc-200">Pre-Cache Entire Books:</strong> Use the sync tool below to pre-download all chapters of a book (e.g. Genesis, Matthew) in one go so that you or non-connected users can read them offline anytime!
              </p>
            </div>

            {/* Downloader Section */}
            <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl p-4 bg-zinc-50/50 dark:bg-zinc-900/30">
              <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                Download Books for Offline Read
              </h4>

              {isDownloading ? (
                /* Downloading State UI */
                <div className="space-y-3 py-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-800 dark:text-zinc-200 animate-pulse flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                      {downloadText}
                    </span>
                    <span className="font-mono font-semibold text-amber-500">{downloadProgress}%</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full transition-all duration-150 rounded-full" 
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleCancelDownload}
                      className="text-xs font-medium text-red-500 hover:text-red-600 transition hover:underline"
                    >
                      Cancel Cache Operation
                    </button>
                  </div>
                </div>
              ) : (
                /* Static Setup UI */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Translation Choice */}
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 mb-1">
                        Select Translation:
                      </label>
                      <select
                        value={selectedTrans}
                        onChange={(e) => setSelectedTrans(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none text-zinc-800 dark:text-zinc-100"
                      >
                        {translationsList.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} ({t.short})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Book Choice */}
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 mb-1">
                        Select Bible Book:
                      </label>
                      <select
                        value={selectedBook}
                        onChange={(e) => setSelectedBook(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-2 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none text-zinc-800 dark:text-zinc-100"
                      >
                        {BIBLE_BOOKS.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name} ({b.chapters} Ch)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Warning if AI translation needed but user does not have client API key, though they can still fetch if connected */}
                  {!geminiApiKey && !['web', 'kjv', 'asv', 'bbe', 'ylt', 'darby', 'oeb-us', 'cherokee'].includes(selectedTrans) && (
                    <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[11px] text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                      <span>
                        Note: Downloading <strong>{selectedTransObj?.name}</strong> needs either an active internet connection to retrieve translations from the server, or a Gemini API key. Standard translations like standard KJV or WEB download directly in seconds from the public repository!
                      </span>
                    </div>
                  )}

                  {/* Sync Action Trigger */}
                  <button
                    onClick={handleStartDownload}
                    className="w-full bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 text-white py-2 px-4 rounded-lg font-medium text-xs transition duration-150 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] cursor-pointer"
                  >
                    <DownloadCloud className="w-4 h-4" />
                    Download {selectedBookObj?.name} ({selectedTransObj?.short}) for Offline Use
                  </button>
                </div>
              )}
            </div>

            {/* Offline Catalog List */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-zinc-400" />
                Your Locally Cached Library ({cachedStats.length} books found)
              </h4>

              {cachedStats.length === 0 ? (
                <div className="py-8 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1 bg-white dark:bg-zinc-900/10">
                  <Clock className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mx-auto" />
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Your local cache is currently empty</p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Any books or chapters you pre-download or read will appear here!</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                  {cachedStats.map((stat, idx) => (
                    <div 
                      key={`${stat.translation}_${stat.bookId}_${idx}`}
                      className="p-3 bg-white dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-800/80 rounded-xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-zinc-800 dark:text-zinc-100 flex items-center gap-1.5">
                          {stat.bookName}
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold uppercase font-mono">
                            {stat.translation.toUpperCase()}
                          </span>
                          {stat.progressPercent === 100 && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          )}
                        </div>
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                          {stat.cachedChapters} of {stat.totalChapters} chapters saved ({stat.progressPercent}%)
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {stat.progressPercent < 100 && (
                          <div className="w-12 bg-zinc-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden shrink-0">
                            <div className="bg-amber-500 h-full" style={{ width: `${stat.progressPercent}%` }} />
                          </div>
                        )}
                        <button
                          onClick={() => handleDeleteCache(stat.translation, stat.bookId)}
                          className="p-1.5 text-zinc-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/15 rounded-lg transition"
                          title="Delete downloaded cache"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500">
            <span>Powered by HTML5 Storage Mechanism</span>
            <span>Stand-alone Progressive App Ready</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
