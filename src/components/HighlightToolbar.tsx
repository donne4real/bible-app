/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Palette, FileText, Share2, Copy, Trash2, X, Check, Bookmark, BookmarkCheck } from 'lucide-react';
import { Verse, Highlight, Note } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HighlightToolbarProps {
  selectedVerses: Verse[];
  onClearSelection: () => void;
  onApplyHighlight: (color: string) => void;
  onRemoveHighlight: () => void;
  onOpenShareCard: () => void;
  onSaveNote: (text: string) => void;
  existingNoteText?: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const HIGHLIGHT_COLORS = [
  { id: 'yellow', label: 'Amber', colorBg: 'bg-amber-200 dark:bg-amber-900', colorDot: 'bg-amber-250 border-amber-300' },
  { id: 'green', label: 'Sage', colorBg: 'bg-emerald-250 dark:bg-emerald-900', colorDot: 'bg-emerald-300 border-emerald-400' },
  { id: 'blue', label: 'Sky', colorBg: 'bg-sky-200 dark:bg-sky-900', colorDot: 'bg-sky-300 border-sky-400' },
  { id: 'pink', label: 'Blush', colorBg: 'bg-pink-200 dark:bg-pink-900', colorDot: 'bg-pink-300 border-pink-400' },
  { id: 'orange', label: 'Coral', colorBg: 'bg-orange-200 dark:bg-orange-900', colorDot: 'bg-orange-300 border-orange-400' },
];

export function getHighlightClass(colorId: string): string {
  switch (colorId) {
    case 'yellow': return 'bg-amber-100/90 dark:bg-amber-900/40 border-b-2 border-amber-400 text-amber-950 dark:text-amber-100/90';
    case 'green': return 'bg-emerald-100/90 dark:bg-emerald-900/40 border-b-2 border-emerald-400 text-emerald-950 dark:text-emerald-100/90';
    case 'blue': return 'bg-sky-100/90 dark:bg-sky-900/40 border-b-2 border-sky-400 text-sky-950 dark:text-sky-100/90';
    case 'pink': return 'bg-pink-100/90 dark:bg-pink-900/40 border-b-2 border-pink-400 text-pink-950 dark:text-pink-100/90';
    case 'orange': return 'bg-orange-100/90 dark:bg-orange-900/40 border-b-2 border-orange-400 text-orange-950 dark:text-orange-100/90';
    default: return '';
  }
}

export default function HighlightToolbar({
  selectedVerses,
  onClearSelection,
  onApplyHighlight,
  onRemoveHighlight,
  onOpenShareCard,
  onSaveNote,
  existingNoteText = '',
  isBookmarked,
  onToggleBookmark
}: HighlightToolbarProps) {
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [noteText, setNoteText] = useState(existingNoteText);
  const [noteSaved, setNoteSaved] = useState(false);

  // Sync state if selection shifts
  React.useEffect(() => {
    setNoteText(existingNoteText);
    setShowNoteEditor(false);
  }, [selectedVerses, existingNoteText]);

  if (selectedVerses.length === 0) return null;

  const sortedVerses = [...selectedVerses].sort((a, b) => a.verse - b.verse);
  const bookName = sortedVerses[0]?.book_name || '';
  const chapterNum = sortedVerses[0]?.chapter || 1;
  const verseRef = `${bookName} ${chapterNum}:${sortedVerses.map(v => v.verse).join(',')}`;

  const handleSaveNoteLocal = () => {
    onSaveNote(noteText);
    setNoteSaved(true);
    setTimeout(() => {
      setNoteSaved(false);
      setShowNoteEditor(false);
    }, 1200);
  };

  const handleCopySimple = () => {
    const textToCopy = sortedVerses.map(v => `[${v.verse}] ${v.text.trim()}`).join(' ');
    navigator.clipboard.writeText(`“${textToCopy}” — ${verseRef}`);
  };

  return (
    <div id="highlight-toolbar-dock" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-xl">
      <AnimatePresence>
        <motion.div
          key="toolbar-main"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="bg-zinc-900 dark:bg-zinc-950 shadow-2xl rounded-2xl p-4 border border-zinc-800 flex flex-col gap-3"
        >
          {/* Reference Header & Clear tool */}
          <div className="flex items-center justify-between text-zinc-300 font-sans text-xs pb-2 border-b border-zinc-800">
            <span className="font-semibold tracking-wide font-mono text-amber-500">
              {verseRef} ({selectedVerses.length} {selectedVerses.length === 1 ? 'verse' : 'verses'})
            </span>
            <button
              onClick={onClearSelection}
              className="p-1 rounded-md hover:bg-zinc-800 transition text-zinc-400 hover:text-white"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Core Controls */}
          {!showNoteEditor && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Highlight colors circles */}
              <div className="flex items-center gap-1.5 p-1 bg-zinc-800/50 rounded-lg">
                {HIGHLIGHT_COLORS.map(color => (
                  <button
                    key={color.id}
                    onClick={() => onApplyHighlight(color.id)}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition hover:scale-110 active:scale-95 cursor-pointer relative group"
                    title={`Highlight in ${color.label}`}
                  >
                    <span className={`absolute inset-0.5 rounded-full ${color.colorBg}`} />
                    <span className="sr-only">{color.label}</span>
                  </button>
                ))}
                
                {/* Clear highlighter */}
                <button
                  onClick={onRemoveHighlight}
                  className="w-7 h-7 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-rose-400 hover:bg-zinc-700 transition"
                  title="Remove highlight"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Utility actions */}
              <div className="flex items-center gap-1.5 ml-auto">
                {/* Note composer button */}
                <button
                  onClick={() => setShowNoteEditor(true)}
                  className="p-2 bg-zinc-800/80 hover:bg-zinc-800 hover:text-white text-zinc-300 rounded-lg transition active:scale-95 flex items-center justify-center gap-1"
                  title="Add reflections note"
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">Note</span>
                </button>

                {/* Designers visual shares Card */}
                <button
                  onClick={onOpenShareCard}
                  className="p-2 bg-zinc-800/80 hover:bg-zinc-800 hover:text-white text-zinc-300 rounded-lg transition active:scale-95 flex items-center justify-center gap-1"
                  title="Create Verse Card graphic"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider hidden sm:inline">Design</span>
                </button>

                {/* Chapter Bookmark */}
                <button
                  onClick={onToggleBookmark}
                  className={`p-2 rounded-lg transition active:scale-95 flex items-center justify-center gap-1 ${
                    isBookmarked 
                      ? 'bg-amber-500/20 text-amber-400' 
                      : 'bg-zinc-800/80 hover:bg-zinc-800 hover:text-white text-zinc-300'
                  }`}
                  title={isBookmarked ? 'Remove chapter bookmark' : 'Bookmark this chapter'}
                >
                  {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                </button>

                {/* Text Copy */}
                <button
                  onClick={handleCopySimple}
                  className="p-2 bg-zinc-800/80 hover:bg-zinc-800 hover:text-white text-zinc-300 rounded-lg transition active:scale-95 flex items-center justify-center"
                  title="Copy formatted verse text"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Compact Note Composers Section */}
          {showNoteEditor && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-2 pt-1 overflow-hidden"
            >
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={`Write down your prayer, study notes, or reflections on ${verseRef}...`}
                className="w-full bg-zinc-850 dark:bg-zinc-900 text-zinc-100 p-2.5 rounded-xl border border-zinc-700/60 focus:border-amber-500/80 outline-none text-xs font-sans min-h-[75px] resize-none"
                autoFocus
              />
              <div className="flex items-center justify-end gap-2 text-xs">
                <button
                  onClick={() => setShowNoteEditor(false)}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-400 hover:text-zinc-200 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNoteLocal}
                  disabled={noteSaved}
                  className="px-4.5 py-1.5 bg-amber-500 text-zinc-950 font-semibold rounded-lg hover:bg-amber-400 hover:text-zinc-950 transition active:scale-95 flex items-center gap-1 cursor-pointer disabled:bg-emerald-500 disabled:text-zinc-950"
                >
                  {noteSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Saved
                    </>
                  ) : (
                    'Save Note'
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
