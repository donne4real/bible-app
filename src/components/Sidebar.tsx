/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Highlighter, FileText, Bookmark, Calendar, Trash2, Search, X, ChevronRight, Check } from 'lucide-react';
import { Highlight, Note, Bookmark as BookMarkType } from '../types';

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
  onNavigateTo
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'highlights' | 'notes' | 'bookmarks'>('notes');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Filter notes based on query
  const filteredNotes = notes.filter(n => 
    n.book_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
    `${n.chapter}:${n.verse}`.includes(searchQuery)
  );

  // Filter highlights
  const filteredHighlights = highlights.filter(h =>
    h.book_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${h.chapter}:${h.verse}`.includes(searchQuery)
  );

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
          className="p-1 px-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 border-b border-zinc-150 dark:border-zinc-805 bg-zinc-50/50 dark:bg-zinc-950/20 text-xs">
        <button
          onClick={() => { setActiveTab('notes'); setSearchQuery(''); }}
          className={`py-3 font-semibold text-center flex items-center justify-center gap-1 border-b-2 transition ${
            activeTab === 'notes'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-zinc-900/60'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Notes ({notes.length})
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
          Highlights ({highlights.length})
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
          Bookmarks ({bookmarks.length})
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
          filteredHighlights.length === 0 ? (
            <div className="text-center py-12">
              <Highlighter className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
              <p className="text-xs text-zinc-400">No highlights created yet.</p>
            </div>
          ) : (
            filteredHighlights.map(hl => (
              <div
                key={hl.id}
                className="bg-zinc-50 dark:bg-zinc-850 p-3.5 rounded-xl border border-zinc-150 dark:border-zinc-800 hover:border-amber-500/30 transition group flex flex-col justify-between"
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
                    title="Delete highlight"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                {/* Visual marker */}
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    hl.color === 'yellow' ? 'bg-amber-400' :
                    hl.color === 'green' ? 'bg-emerald-400' :
                    hl.color === 'blue' ? 'bg-sky-400' :
                    hl.color === 'pink' ? 'bg-pink-400' : 'bg-orange-400'
                  }`} />
                  <span className="text-[10px] text-zinc-400 capitalize font-mono">{hl.color} Category</span>
                </div>
              </div>
            ))
          )
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
                  title="Remove bookmark"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )
        )}
      </div>

      {/* Footer Branding of study space */}
      <div className="p-3 text-center border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-400 font-mono">
        Active local study journal
      </div>
    </div>
  );
}
