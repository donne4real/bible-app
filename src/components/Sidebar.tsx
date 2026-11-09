/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { BookOpen, Highlighter, FileText, Bookmark, Calendar, Trash2, Search, X, ChevronRight, Check, BookMarked, Download, Upload } from 'lucide-react';
import { Highlight, Note, Bookmark as BookMarkType } from '../types';
import { exportStudyData, importStudyData, mergeStudyData } from '../exportImport';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  highlights: Highlight[];
  notes: Note[];
  bookmarks: BookMarkType[];
  onDeleteHighlight: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onDeleteBookmark: (id: string) => void;
  onNavigateTo: (bookId: string, chapter: number, verse?: number) => void;
  readingPlanSlot?: React.ReactNode;
  currentStreak?: number;
  longestStreak?: number;
  totalDaysRead?: number;
  onImportData?: (data: { highlights: Highlight[]; notes: Note[]; bookmarks: BookMarkType[] }) => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  highlights,
  notes,
  bookmarks,
  onDeleteHighlight,
  onDeleteNote,
  onDeleteBookmark,
  onNavigateTo,
  readingPlanSlot,
  currentStreak = 0,
  longestStreak = 0,
  totalDaysRead = 0,
  onImportData,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'highlights' | 'bookmarks' | 'plans'>('notes');
  const [searchQuery, setSearchQuery] = useState('');
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportStudyData(highlights, notes, bookmarks);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importStudyData(file);
      if (onImportData) {
        onImportData({
          highlights: imported.highlights,
          notes: imported.notes,
          bookmarks: imported.bookmarks,
        });
      }
      setImportStatus(`Imported ${imported.highlights.length} highlights, ${imported.notes.length} notes, ${imported.bookmarks.length} bookmarks`);
      setTimeout(() => setImportStatus(null), 4000);
    } catch (err) {
      setImportStatus('Import failed: ' + (err as Error).message);
      setTimeout(() => setImportStatus(null), 4000);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!isOpen) return null;

  // Filter notes based on query
  const filteredNotes = notes.filter(n => 
    n.book_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
    `${n.chapter}:${n.verse}`.includes(searchQuery)
  );

  // Filter highlights by search query and color
  const filteredHighlights = highlights.filter(h => {
    const matchesSearch = h.book_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${h.chapter}:${h.verse}`.includes(searchQuery);
    const matchesColor = !colorFilter || h.color === colorFilter;
    return matchesSearch && matchesColor;
  });

  // Get unique colors used in highlights
  const usedColors = [...new Set(highlights.map(h => h.color))];

  return (
    <div id="study-hub-sidebar" className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-45 flex flex-col shadow-2xl animate-slide-right">
      
      {/* Header */}
      <div className="p-4 border-b border-zinc-150 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-500" />
          <h2 className="font-sans font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">My Study Hub</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close study hub"
          className="p-1 px-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Reading Streak */}
      {currentStreak > 0 && (
        <div className="px-4 py-2.5 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🔥</span>
            <div>
              <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                {currentStreak} day streak
              </div>
              <div className="text-[9px] text-amber-600 dark:text-amber-500">
                Best: {longestStreak} · {totalDaysRead} total days
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="grid grid-cols-4 border-b border-zinc-150 dark:border-zinc-805 bg-zinc-50/50 dark:bg-zinc-950/20 text-xs">
        <button
          onClick={() => { setActiveTab('notes'); setSearchQuery(''); }}
          className={`py-3 font-semibold text-center flex items-center justify-center gap-1 border-b-2 transition ${
            activeTab === 'notes'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-zinc-900/60'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Notes</span> ({notes.length})
        </button>
        <button
          onClick={() => { setActiveTab('highlights'); setSearchQuery(''); }}
          className={`py-3 font-semibold text-center flex items-center justify-center gap-1 border-b-2 transition ${
            activeTab === 'highlights'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-zinc-900/60'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
          }`}
        >
          <Highlighter className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Highlights</span> ({highlights.length})
        </button>
        <button
          onClick={() => { setActiveTab('bookmarks'); setSearchQuery(''); }}
          className={`py-3 font-semibold text-center flex items-center justify-center gap-1 border-b-2 transition ${
            activeTab === 'bookmarks'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-zinc-900/60'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Saved</span> ({bookmarks.length})
        </button>
        <button
          onClick={() => { setActiveTab('plans'); setSearchQuery(''); }}
          className={`py-3 font-semibold text-center flex items-center justify-center gap-1 border-b-2 transition ${
            activeTab === 'plans'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-zinc-900/60'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
          }`}
        >
          <BookMarked className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Plans</span>
        </button>
      </div>

      {/* Search Filter input */}
      {activeTab !== 'bookmarks' && (
        <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-6 pointer-events-none" />
          <input
            type="text"
            placeholder={activeTab === 'notes' ? "Search journal, scripture text..." : "Filter book or chapter..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-100 dark:bg-zinc-800/80 rounded-xl py-2 pl-9 pr-4 text-xs font-sans border-0 focus:ring-1 focus:ring-amber-500/55 outline-none text-zinc-800 dark:text-zinc-200 placeholder-zinc-400"
          />
        </div>
      )}

      {/* List content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        
        {/* --- NOTES TAB --- */}
        {activeTab === 'notes' && (
          filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
              <p className="text-xs text-zinc-400">No journal reflections found.</p>
              <p className="text-[10px] text-zinc-500 mt-1">Tap any scripture verse to write a memo.</p>
            </div>
          ) : (
            filteredNotes.map(note => (
              <div 
                key={note.id}
                className="bg-zinc-50 dark:bg-zinc-850 p-3.5 rounded-xl border border-zinc-150 dark:border-zinc-800 hover:border-amber-500/30 transition group relative"
              >
                <div className="flex justify-between items-start">
                  <button
                    onClick={() => onNavigateTo(note.book_id, note.chapter, note.verse)}
                    className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5 text-left"
                  >
                    {note.book_name} {note.chapter}:{note.verse}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-rose-500 rounded transition absolute top-2 right-2"
                    aria-label="Delete note"
                    title="Delete note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-2 whitespace-pre-wrap leading-relaxed font-sans">
                  {note.text}
                </p>
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 block mt-2.5 flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3" />
                  {new Date(note.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            ))
          )
        )}

        {/* --- HIGHLIGHTS TAB --- */}
        {activeTab === 'highlights' && (
          <>
            {/* Color filter buttons */}
            {usedColors.length > 0 && (
              <div className="flex items-center gap-1.5 mb-3 p-2 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl">
                <button
                  onClick={() => setColorFilter(null)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                    !colorFilter ? 'bg-amber-500 text-zinc-900' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
                >
                  All
                </button>
                {usedColors.map(color => (
                  <button
                    key={color}
                    onClick={() => setColorFilter(colorFilter === color ? null : color)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition hover:scale-110 ${
                      colorFilter === color ? 'ring-2 ring-amber-500 ring-offset-1 ring-offset-white dark:ring-offset-zinc-900' : ''
                    }`}
                    title={`Filter by ${color}`}
                  >
                    <span className={`w-4 h-4 rounded-full ${
                      color === 'yellow' ? 'bg-amber-400' :
                      color === 'green' ? 'bg-emerald-400' :
                      color === 'blue' ? 'bg-sky-400' :
                      color === 'pink' ? 'bg-pink-400' : 'bg-orange-400'
                    }`} />
                  </button>
                ))}
              </div>
            )}

            {filteredHighlights.length === 0 ? (
              <div className="text-center py-12">
                <Highlighter className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
                <p className="text-xs text-zinc-400">
                  {highlights.length === 0 ? 'No highlights created yet.' : 'No highlights match this filter.'}
                </p>
                {highlights.length > 0 && colorFilter && (
                  <button 
                    onClick={() => setColorFilter(null)}
                    className="text-[10px] text-amber-500 hover:underline mt-2"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            ) : (
              filteredHighlights
                .sort((a, b) => b.createdAt - a.createdAt)
                .map(hl => (
                  <div
                    key={hl.id}
                    className="bg-zinc-50 dark:bg-zinc-850 p-3.5 rounded-xl border border-zinc-150 dark:border-zinc-800 hover:border-amber-500/30 transition group flex flex-col"
                  >
                    <div className="flex justify-between items-start">
                      <button
                        onClick={() => onNavigateTo(hl.book_id, hl.chapter, hl.verse)}
                        className="font-mono text-[11px] font-bold text-zinc-700 dark:text-zinc-350 hover:underline flex items-center gap-0.5"
                      >
                        {hl.book_name} {hl.chapter}:{hl.verse}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteHighlight(hl.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-rose-500 rounded transition"
                        aria-label="Delete highlight"
                        title="Delete highlight"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Color and style indicator with date */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          hl.color === 'yellow' ? 'bg-amber-400' :
                          hl.color === 'green' ? 'bg-emerald-400' :
                          hl.color === 'blue' ? 'bg-sky-400' :
                          hl.color === 'pink' ? 'bg-pink-400' : 'bg-orange-400'
                        }`} />
                        <span className="text-[10px] text-zinc-400 capitalize font-mono">
                          {hl.color}
                          {hl.style === 'underline' && ' · underline'}
                        </span>
                      </div>
                      <span className="text-[9px] text-zinc-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(hl.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))
            )}
          </>
        )}

        {/* --- BOOKMARKS TAB --- */}
        {activeTab === 'bookmarks' && (
          bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
              <p className="text-xs text-zinc-400">No bookmarks saved.</p>
              <p className="text-[10px] text-zinc-500 mt-1">Bookmark chapters from the active reading toolbar.</p>
            </div>
          ) : (
            bookmarks.map(bm => (
              <div
                key={bm.id}
                className="bg-zinc-50 dark:bg-zinc-850 p-3.5 rounded-xl border border-zinc-150 dark:border-zinc-800 hover:border-amber-500/30 transition group flex items-center justify-between"
              >
                <button
                  onClick={() => onNavigateTo(bm.book_id, bm.chapter)}
                  className="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:underline hover:text-amber-500 transition flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                  {bm.book_name} Chapter {bm.chapter}
                </button>
                <button
                  onClick={() => onDeleteBookmark(bm.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-rose-500 rounded transition"
                  aria-label="Remove bookmark"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )
        )}

        {/* --- READING PLANS TAB --- */}
        {activeTab === 'plans' && readingPlanSlot}
      </div>

      {/* Footer with export/import */}
      <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
        {importStatus && (
          <div className="text-[10px] text-center py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-medium">
            {importStatus}
          </div>
        )}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 transition cursor-pointer"
            title="Download backup of all highlights, notes, and bookmarks"
          >
            <Download className="w-3 h-3" /> Export
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 transition cursor-pointer"
            title="Restore from a backup file"
          >
            <Upload className="w-3 h-3" /> Import
          </button>
          <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        </div>
        <div className="text-center text-[9px] text-zinc-400 font-mono">
          Study data stored locally on this device
        </div>
      </div>
    </div>
  );
}
