/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Renders a single Bible verse as an inline element with:
 * - Superscript verse number
 * - Highlight background (if the verse has a saved highlight)
 * - Note indicator badge
 * - Selection ring when tapped
 *
 * Designed to flow inline with surrounding verses for a natural
 * reading experience (not block-level).
 */

import React from 'react';
import { Verse, Highlight, Note } from '../types';
import { getHighlightClass } from './HighlightToolbar';

interface VerseLineProps {
  verse: Verse;
  translation: string;
  highlights: Highlight[];
  notes: Note[];
  isSelected: boolean;
  direction: 'rtl' | 'ltr';
  onClick: (verse: Verse) => void;
}

export default function VerseLine({
  verse,
  translation,
  highlights,
  notes,
  isSelected,
  direction,
  onClick,
}: VerseLineProps) {
  const hlId = `${translation}_${verse.book_id}_${verse.chapter}_${verse.verse}`;
  const hlObj = highlights.find(h => h.id === hlId);
  const hlClass = hlObj ? getHighlightClass(hlObj.color) : '';
  const hasNote = notes.some(n => n.id === `${verse.book_id}_${verse.chapter}_${verse.verse}`);

  return (
    <span
      id={`verse-line-${verse.verse}`}
      onClick={() => onClick(verse)}
      className={`inline-block ${direction === 'rtl' ? 'ml-1' : 'mr-1'} rounded-md cursor-pointer hover:bg-amber-500/10 transition-all ${isSelected ? 'ring-2 ring-amber-500/40 bg-amber-500/5' : ''} ${hlClass}`}
    >
      <sup className={`text-[10px] font-sans font-bold text-amber-600/80 ${direction === 'rtl' ? 'ml-1' : 'mr-1'} select-none`}>
        {verse.verse}
      </sup>
      <span className={`font-medium ${direction === 'rtl' ? 'ml-1.5' : 'mr-1.5'} selection:bg-amber-100`}>
        {verse.text.trim()}
      </span>
      {hasNote && (
        <span className="inline-block px-1 ml-0.5 bg-amber-500/25 rounded text-[9px] font-bold text-amber-700 dark:text-amber-400 font-sans align-middle">
          ✎ NOTE
        </span>
      )}
    </span>
  );
}
