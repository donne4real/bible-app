/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Flame, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  CheckCircle,
  HelpCircle,
  Clock,
  Compass,
  ArrowRight
} from 'lucide-react';
import { BIBLE_BOOKS } from '../bibleStructure';
import { BookMetadata } from '../types';

interface BibleProgressDashboardProps {
  completedChapters: string[];
  onSelectBook: (book: BookMetadata) => void;
  onSelectChapter: (chapter: number) => void;
  readingStreak: { count: number; lastDate: string | null };
  onResetProgress: () => void;
}

export default function BibleProgressDashboard({
  completedChapters,
  onSelectBook,
  onSelectChapter,
  readingStreak,
  onResetProgress
}: BibleProgressDashboardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showBookListTestament, setShowBookListTestament] = useState<'OT' | 'NT' | null>(null);

  // Compute stats
  const totalChaptersCount = 1189;
  const otChaptersCount = 929;
  const ntChaptersCount = 260;

  const completedStats = (() => {
    let otCount = 0;
    let ntCount = 0;
    const bookProgressMap: { [bookId: string]: number } = {};

    completedChapters.forEach(key => {
      const parts = key.split('_');
      if (parts.length >= 2) {
        const bookId = parts[0];
        bookProgressMap[bookId] = (bookProgressMap[bookId] || 0) + 1;
        const bk = BIBLE_BOOKS.find(b => b.id === bookId);
        if (bk) {
          if (bk.testament === 'OT') otCount++;
          else if (bk.testament === 'NT') ntCount++;
        }
      }
    });

    return {
      total: completedChapters.length,
      percent: Math.round((completedChapters.length / totalChaptersCount) * 100 * 10) / 10,
      otCount,
      otPercent: Math.round((otCount / otChaptersCount) * 100 * 10) / 10,
      ntCount,
      ntPercent: Math.round((ntCount / ntChaptersCount) * 100 * 10) / 10,
      bookProgressMap
    };
  })();

  const handleBookClick = (book: BookMetadata) => {
    onSelectBook(book);
    onSelectChapter(1);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleConfirmReset = () => {
    if (window.confirm("Are you sure you want to clear your entire Bible Reading Progress? This resets all marked chapters and cannot be undone.")) {
      onResetProgress();
    }
  };

  return (
    <div id="general-reading-progress-block" className="mb-8 font-sans">
      <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        
        {/* Main Header / Collapsed Row */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-5 flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-950/40 select-none transition"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-zinc-950 shadow-sm flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400 font-mono">
                  General Bible Progress
                </span>
                {completedStats.percent >= 5 && (
                  <span className="text-[8px] font-black uppercase tracking-widest bg-emerald-500 text-white dark:text-zinc-950 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5 animate-pulse">
                    <Award className="w-2.5 h-2.5" /> Growing
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mt-0.5">
                {completedStats.total === 0 
                  ? "Mark chapters completed as you read" 
                  : `${completedStats.percent}% Completed • ${completedStats.total} / ${totalChaptersCount} Chapters`
                }
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {readingStreak.count > 0 && (
              <div className="flex items-center gap-1 bg-amber-500/10 dark:bg-amber-450/5 text-amber-600 dark:text-amber-450 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                <Flame className="w-4 h-4 fill-current animate-bounce text-amber-550" />
                <span>{readingStreak.count}d Streak</span>
              </div>
            )}
            
            <div id="toggle-chevron-btn" className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-805 transition">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* Nested Progress Bar when collapsed */}
        {!isExpanded && (
          <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-850">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(1, completedStats.percent))}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
            />
          </div>
        )}

        {/* Detailed Dashboard Area */}
        {isExpanded && (
          <div className="p-5.5 border-t border-zinc-100 dark:border-zinc-850/60 bg-zinc-50/20 dark:bg-zinc-950/20 space-y-6 animate-fade-in">
            
            {/* Split Metrics Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Old Testament Meter */}
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                    Old Testament
                  </span>
                  <span className="text-lg font-serif font-black text-zinc-800 dark:text-zinc-100 block mt-1.5">
                    {completedStats.otPercent}%
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium block">
                    {completedStats.otCount} of {otChaptersCount} Chapters
                  </span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${completedStats.otPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-amber-500"
                  />
                </div>
              </div>

              {/* New Testament Meter */}
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                    New Testament
                  </span>
                  <span className="text-lg font-serif font-black text-zinc-800 dark:text-zinc-100 block mt-1.5">
                    {completedStats.ntPercent}%
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium block">
                    {completedStats.ntCount} of {ntChaptersCount} Chapters
                  </span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${completedStats.ntPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-amber-600"
                  />
                </div>
              </div>

              {/* Streak Tracker & Guide */}
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                    Daily Devotional Streak_
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Flame className="w-5 h-5 text-amber-550 fill-current animate-pulse shrink-0" />
                    <span className="text-lg font-serif font-black text-zinc-800 dark:text-zinc-100">
                      {readingStreak.count} Days
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 block leading-tight mt-1">
                    {readingStreak.count > 0 
                      ? "Keep completing book chapters daily to protect your active devotion streak!"
                      : "Click 'Mark as Read' at the bottom of any chapter page to record and start a streak!"
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Expandable book completion list */}
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-2.5">
                Detailed Progress Checklist
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setShowBookListTestament(showBookListTestament === 'OT' ? null : 'OT')}
                  className={`flex-1 p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                    showBookListTestament === 'OT' 
                      ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400' 
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Old Testament Books
                  </span>
                  <span className="text-[10px] font-mono bg-current/10 px-2 py-0.5 rounded">
                    Explore 39 Books
                  </span>
                </button>

                <button
                  onClick={() => setShowBookListTestament(showBookListTestament === 'NT' ? null : 'NT')}
                  className={`flex-1 p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                    showBookListTestament === 'NT' 
                      ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400' 
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> New Testament Books
                  </span>
                  <span className="text-[10px] font-mono bg-current/10 px-2 py-0.5 rounded">
                    Explore 27 Books
                  </span>
                </button>
              </div>

              {/* Collapsed books content check list block */}
              {showBookListTestament && (
                <div className="mt-3.5 p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[35vh] overflow-y-auto">
                  {BIBLE_BOOKS.filter(b => b.testament === showBookListTestament).map(book => {
                    const readCount = completedStats.bookProgressMap[book.id] || 0;
                    const bPercent = Math.round((readCount / book.chapters) * 100);
                    const isFullyRead = readCount === book.chapters;

                    return (
                      <div
                        key={book.id}
                        onClick={() => handleBookClick(book)}
                        className={`p-2 rounded-xl border text-left cursor-pointer transition select-none flex flex-col justify-between group h-14 ${
                          isFullyRead 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-450'
                            : readCount > 0 
                              ? 'bg-amber-500/5 border-amber-500/20 text-zinc-800 dark:text-zinc-150'
                              : 'bg-zinc-50/50 dark:bg-zinc-900/40 border-zinc-100 dark:border-zinc-850 hover:border-amber-500/25'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold truncate pr-1 group-hover:underline">
                            {book.name}
                          </span>
                          {isFullyRead && <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />}
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-[9px] text-zinc-400 dark:text-zinc-500 font-mono mt-1">
                            <span>{readCount} / {book.chapters} chap</span>
                            <span>{bPercent}%</span>
                          </div>
                          
                          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden mt-1">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${bPercent}%` }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                              className={`h-full ${isFullyRead ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dashboard footer control buttons */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-850/60 flex items-center justify-between text-xs text-zinc-400 select-none">
              <span className="flex items-center gap-1.5 leading-none">
                <Clock className="w-3.5 h-3.5" /> Checked progress lists are cached automatically.
              </span>

              <button
                onClick={handleConfirmReset}
                className="text-[10px] font-bold text-rose-550 dark:text-rose-405 hover:bg-rose-500/5 p-1 px-2.5 rounded-lg transition"
              >
                Clear Entire History
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
