/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Verse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface Highlight {
  id: string; // unique combo of book_id + chapter + verse + translation
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  color: string; // e.g. "yellow" | "green" | "blue" | "pink" | "orange"
  createdAt: number;
}

export interface Note {
  id: string; // combo of book_id + chapter + verse
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
  createdAt: number;
}

export interface Bookmark {
  id: string;
  book_id: string;
  book_name: string;
  chapter: number;
  createdAt: number;
}

export interface ReaderSettings {
  translation: string;
  fontSize: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  fontFamily: 'serif' | 'sans' | 'mono';
  lineHeight: 'tight' | 'normal' | 'relaxed' | 'loose';
  zenMode: boolean;
  theme: 'light' | 'sepia' | 'dark' | 'charcoal';
}

export interface VerseCardStyle {
  background: string; // linear-gradient or single color or image placeholder background
  textColor: string;
  fontFamily: 'serif' | 'sans' | 'mono' | 'handwriting';
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  textAlignment: 'left' | 'center' | 'right';
  cardRatio: 'square' | 'portrait' | 'story';
  overlayOpacity: number; // 0 to 1
}

export interface BookMetadata {
  id: string;
  name: string;
  chapters: number;
  testament: 'OT' | 'NT';
}
