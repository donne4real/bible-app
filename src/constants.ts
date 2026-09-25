/**
 * Application constants.
 * Centralizes magic strings and configuration values used across the app.
 *
 * Organized into:
 * - STORAGE_KEYS: localStorage keys for persisted state
 * - DEFAULT_SETTINGS: default reader configuration
 * - CACHE_LIMITS: in-memory cache size caps
 * - UI constants: timing delays, swipe thresholds
 * - HIGHLIGHT_COLORS: the 5 available verse highlight colors
 * - SHARE_CARD_BACKGROUNDS: gradient presets for verse card generation
 */

// localStorage keys
export const STORAGE_KEYS = {
  SELECTED_BOOK: 'bible_selected_book',
  SELECTED_CHAPTER: 'bible_selected_chapter',
  READER_SETTINGS: 'bible_reader_settings',
  HIGHLIGHTS: 'bible_highlights',
  NOTES: 'bible_notes',
  BOOKMARKS: 'bible_bookmarks',
  SEARCH_HISTORY: 'bible_search_history',
  IS_COMPARING: 'bible_is_comparing',
  COMPARE_TRANSLATION: 'bible_compare_translation',
  COMPARE_LAYOUT: 'bible_compare_layout',
} as const;

// Default reader settings
export const DEFAULT_SETTINGS = {
  translation: 'web',
  fontSize: 'lg',
  fontFamily: 'serif',
  lineHeight: 'relaxed',
  zenMode: false,
  theme: 'sepia',
} as const;

// Default search history topics
export const DEFAULT_SEARCH_TOPICS = ['faith', 'love', 'grace', 'beginning', 'light'];

// Cache limits
export const CACHE_LIMITS = {
  TRANSLATION_CACHE_SIZE: 2,
  REMOTE_CHAPTER_CACHE_SIZE: 100,
  SEARCH_HISTORY_MAX: 8,
  WHOLE_BIBLE_SEARCH_LIMIT: 200,
} as const;

// UI constants
export const SWIPE_THRESHOLD = 60;
export const SWIPE_RATIO = 1.5;
export const SCROLL_DELAY_MS = 700;
export const HIGHLIGHT_REMOVE_DELAY_MS = 3000;
export const NAV_DEBOUNCE_MS = 150;

// Highlight colors
export const HIGHLIGHT_COLORS = [
  { id: 'yellow', label: 'Amber', colorBg: 'bg-amber-200 dark:bg-amber-900', colorDot: 'bg-amber-250 border-amber-300' },
  { id: 'green', label: 'Sage', colorBg: 'bg-emerald-250 dark:bg-emerald-900', colorDot: 'bg-emerald-300 border-emerald-400' },
  { id: 'blue', label: 'Sky', colorBg: 'bg-sky-200 dark:bg-sky-900', colorDot: 'bg-sky-300 border-sky-400' },
  { id: 'pink', label: 'Blush', colorBg: 'bg-pink-200 dark:bg-pink-900', colorDot: 'bg-pink-300 border-pink-400' },
  { id: 'orange', label: 'Coral', colorBg: 'bg-orange-200 dark:bg-orange-900', colorDot: 'bg-orange-300 border-orange-400' },
] as const;

// Share card presets
export const SHARE_CARD_BACKGROUNDS = [
  { name: 'Warm Sunset', css: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', start: '#FF6B6B', end: '#FF8E53', text: '#FFFFFF' },
  { name: 'Midnight', css: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)', start: '#0F2027', end: '#2C5364', text: '#F8FAFC' },
  { name: 'Forest Mist', css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', start: '#11998e', end: '#38ef7d', text: '#FFFFFF' },
  { name: 'Lavender Dream', css: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', start: '#a18cd1', end: '#fbc2eb', text: '#1E293B' },
  { name: 'Golden Hour', css: 'linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)', start: '#F2994A', end: '#F2C94C', text: '#1E1B4B' },
  { name: 'Classic Charcoal', css: 'linear-gradient(135deg, #141E30 0%, #243B55 100%)', start: '#141E30', end: '#243B55', text: '#F8FAFC' },
  { name: 'Royal Velvet', css: 'linear-gradient(135deg, #3A1C71 0%, #D76D77 50%, #FFAF7B 100%)', start: '#3A1C71', end: '#FFAF7B', text: '#FFFFFF' },
  { name: 'Nordic Snow', css: 'linear-gradient(135deg, #F3F4F6 0%, #E2E8F0 100%)', start: '#F8FAFC', end: '#E2E8F0', text: '#0F172A' },
] as const;
