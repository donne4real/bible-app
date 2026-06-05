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
  id: string;
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  color: string;
  createdAt: number;
}

export interface Note {
  id: string;
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
  background: string;
  textColor: string;
  fontFamily: 'serif' | 'sans' | 'mono' | 'handwriting';
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  textAlignment: 'left' | 'center' | 'right';
  cardRatio: 'square' | 'portrait' | 'story';
  overlayOpacity: number;
}

export interface BookMetadata {
  id: string;
  name: string;
  chapters: number;
  testament: 'OT' | 'NT';
}
