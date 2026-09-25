/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Daily Verse banner — shows a featured verse that rotates daily.
 * Dismissible, remembers dismissal per day in sessionStorage.
 */

import React, { useState } from 'react';
import { BookOpen, X } from 'lucide-react';
import { getDailyVerse, DailyVerseEntry } from '../dailyVerse';
import { BookMetadata } from '../types';

interface DailyVerseProps {
  onNavigate: (book: BookMetadata, chapter: number, verse: number) => void;
  translation: string;
}

export default function DailyVerse({ onNavigate, translation }: DailyVerseProps) {
  const verse = getDailyVerse();
  const today = new Date().toISOString().split('T')[0];
  const dismissedKey = `daily_verse_dismissed_${today}`;
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(dismissedKey) === 'true');

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(dismissedKey, 'true');
  };

  const handleClick = () => {
    onNavigate(
      { id: verse.bookId, name: verse.bookName, chapters: 0, testament: 'NT' },
      verse.chapter,
      verse.verse
    );
    handleDismiss();
  };

  return (
    <div className="mb-6 relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-5 pr-10 animate-fade-in">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-amber-200/50 dark:hover:bg-amber-900/30 text-amber-600 dark:text-amber-500 transition"
        aria-label="Dismiss daily verse"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-start gap-3">
        <div className="shrink-0 w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center mt-0.5">
          <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <div className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-1.5 font-mono">
            Verse of the Day
          </div>
          <p className="text-sm font-serif leading-relaxed text-zinc-800 dark:text-zinc-200 mb-2">
            &ldquo;{verse.text}&rdquo;
          </p>
          <button
            onClick={handleClick}
            className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition cursor-pointer"
          >
            {verse.bookName} {verse.chapter}:{verse.verse} →
          </button>
        </div>
      </div>
    </div>
  );
}