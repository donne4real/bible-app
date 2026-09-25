/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Book, X } from 'lucide-react';
import { motion } from 'motion/react';
import { BIBLE_BOOKS } from '../bibleStructure';
import { getLocalizedBookName } from '../bookNames';
import { BookMetadata } from '../types';

interface BookPickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBook: BookMetadata;
  selectedChapter: number;
  translation: string;
  pickerTab: 'OT' | 'NT';
  onPickerTabChange: (tab: 'OT' | 'NT') => void;
  showChapterPicker: boolean;
  showVersePicker: boolean;
  pickedBook: BookMetadata | null;
  pickedChapter: number | null;
  availableVerses: number;
  onSelectBook: (book: BookMetadata) => void;
  onSelectChapter: (chapter: number) => void;
  onSelectVerse: (verse: number) => void;
  onBackToBooks: () => void;
  onBackToChapters: () => void;
}

export default function BookPicker({
  isOpen,
  onClose,
  selectedBook,
  selectedChapter,
  translation,
  pickerTab,
  onPickerTabChange,
  showChapterPicker,
  showVersePicker,
  pickedBook,
  pickedChapter,
  availableVerses,
  onSelectBook,
  onSelectChapter,
  onSelectVerse,
  onBackToBooks,
  onBackToChapters,
}: BookPickerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-2xl h-[80vh] overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-150 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="font-sans font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
            <Book className="w-4 h-4 text-amber-500" />
            Select Navigation Point
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-150 dark:border-zinc-800 text-xs text-zinc-500 bg-zinc-50/50 dark:bg-zinc-950/50 font-sans select-none shrink-0">
          <button
            onClick={onBackToBooks}
            className={`font-semibold hover:text-amber-600 transition ${!showChapterPicker && !showVersePicker ? 'text-amber-600 font-bold underline decoration-2 underline-offset-4' : ''}`}
          >
            1. Book {pickedBook ? `(${getLocalizedBookName(pickedBook.id, translation, pickedBook.name)})` : ''}
          </button>
          <span className="opacity-40">/</span>
          <button
            disabled={!pickedBook}
            onClick={() => onBackToChapters()}
            className={`font-semibold hover:text-amber-600 transition disabled:opacity-40 disabled:pointer-events-none ${showChapterPicker ? 'text-amber-600 font-bold underline decoration-2 underline-offset-4' : ''}`}
          >
            2. Chapter {pickedChapter ? `(${pickedChapter})` : ''}
          </button>
          <span className="opacity-40">/</span>
          <button
            disabled={pickedChapter === null}
            className={`font-semibold disabled:opacity-40 disabled:pointer-events-none ${showVersePicker ? 'text-amber-600 font-bold underline decoration-2 underline-offset-4' : ''}`}
          >
            3. Verse
          </button>
        </div>

        {/* Book grid */}
        {!showChapterPicker && !showVersePicker && (
          <>
            <div className="grid grid-cols-2 border-b border-zinc-150 dark:border-zinc-800 shrink-0">
              {(['OT', 'NT'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => onPickerTabChange(tab)}
                  className={`py-3 text-xs font-bold tracking-wider text-center border-b-2 uppercase ${pickerTab === tab ? 'border-amber-500 text-amber-600' : 'border-transparent text-zinc-500'}`}
                >
                  {tab === 'OT' ? 'Old Testament (39)' : 'New Testament (27)'}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {BIBLE_BOOKS.filter(b => b.testament === pickerTab).map(book => (
                <button
                  key={book.id}
                  onClick={() => onSelectBook(book)}
                  className={`py-2 px-3 rounded-xl border text-left hover:border-amber-500/40 hover:bg-amber-500/5 transition text-xs font-semibold ${selectedBook.id === book.id ? 'border-amber-500 bg-amber-500/10 text-amber-600 font-bold' : 'border-zinc-150 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 bg-zinc-50/50 dark:bg-zinc-850/50'}`}
                >
                  <div className="truncate">{getLocalizedBookName(book.id, translation, book.name)}</div>
                  <div className="text-[9px] font-mono opacity-50 font-normal">{book.chapters} Ch</div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Chapter grid */}
        {showChapterPicker && !showVersePicker && pickedBook && (
          <div className="flex-1 overflow-y-auto p-6">
            <button
              onClick={onBackToBooks}
              className="mb-4 text-xs font-bold text-amber-600 flex items-center gap-1 hover:underline"
            >
              ← Back to Books
            </button>
            <h4 className="font-serif font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-4 border-b pb-2">
              {getLocalizedBookName(pickedBook.id, translation, pickedBook.name)} Chapters
            </h4>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {Array.from({ length: pickedBook.chapters }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => onSelectChapter(num)}
                  className={`aspect-square w-full rounded-full border font-mono text-xs font-bold flex items-center justify-center transition hover:border-amber-500 hover:bg-amber-500/10 ${selectedBook.id === pickedBook.id && selectedChapter === num ? 'bg-amber-500 text-zinc-950 font-black border-amber-500' : 'border-zinc-150 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-850'}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Verse grid */}
        {showVersePicker && pickedBook && pickedChapter !== null && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            <button
              onClick={onBackToChapters}
              className="mb-4 text-xs font-bold text-amber-600 flex items-center gap-1 hover:underline self-start"
            >
              ← Back to Chapters
            </button>
            <h4 className="font-serif font-bold text-lg text-zinc-800 dark:text-zinc-100 mb-4 border-b pb-2">
              {getLocalizedBookName(pickedBook.id, translation, pickedBook.name)} {pickedChapter}: Select Verse
            </h4>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {Array.from({ length: availableVerses }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => onSelectVerse(num)}
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
  );
}
