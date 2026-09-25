/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Core TypeScript interfaces for the Bible reader app.
 *
 * Data models: Verse, Highlight, Note, Bookmark
 * Settings: ReaderSettings, VerseCardStyle
 * Metadata: BookMetadata
 * Reading plans: ReadingPlan, ReadingPlanDay, ReadingPlanProgress
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

export interface ReadingPlanDay {
  day: number;
  label: string;
  bookId: string;
  chapter: number;
  /** For multi-reading days (e.g. chronological plans): all readings for this day. */
  readings?: { bookId: string; chapter: number }[];
}

export interface ReadingPlan {
  id: string;
  name: string;
  description: string;
  days: ReadingPlanDay[];
  /** If true, each day may have multiple readings from different books. */
  multiReading?: boolean;
}

export interface ReadingPlanProgress {
  planId: string;
  startedAt: number;
  completedDays: number[];
  currentDay: number;
}
