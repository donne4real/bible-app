/**
 * Preset reading plans.
 * Each plan is a sequence of daily readings (book + chapter).
 *
 * Plans are generated from BIBLE_BOOKS metadata at module load time.
 * Four built-in plans:
 * - NT in 30 Days: ~9 chapters/day across all 27 NT books
 * - Psalms in 30 Days: 5 psalms/day (150 total)
 * - Proverbs in 30 Days: 1 chapter/day (31 total)
 * - Chronological in 365 Days: entire Bible in event order (Blue Letter Bible)
 */

import { ReadingPlan } from './types';
import { BIBLE_BOOKS } from './bibleStructure';
import { CHRONOLOGICAL_PLAN } from './chronoPlan';

function genPlanFromChapters(
  id: string,
  name: string,
  description: string,
  bookIds: string[],
  chaptersPerDay: number
): ReadingPlan {
  const days: ReadingPlan['days'] = [];
  let day = 1;
  for (const bookId of bookIds) {
    const book = BIBLE_BOOKS.find(b => b.id === bookId);
    if (!book) continue;
    for (let ch = 1; ch <= book.chapters; ch += chaptersPerDay) {
      const endCh = Math.min(ch + chaptersPerDay - 1, book.chapters);
      for (let c = ch; c <= endCh; c++) {
        days.push({ day, label: `Day ${day}`, bookId, chapter: c });
      }
      day++;
    }
  }
  return { id, name, description, days };
}

// NT in 30 days (~8-9 chapters/day across 260 chapters)
export const NT_IN_30_DAYS: ReadingPlan = (() => {
  const ntBooks = BIBLE_BOOKS.filter(b => b.testament === 'NT').map(b => b.id);
  const totalChapters = BIBLE_BOOKS.filter(b => b.testament === 'NT').reduce((s, b) => s + b.chapters, 0);
  const chaptersPerDay = Math.ceil(totalChapters / 30);
  return genPlanFromChapters('nt-30', 'New Testament in 30 Days', 'Read through the entire New Testament in one month — about 9 chapters per day.', ntBooks, chaptersPerDay);
})();

// Psalms in a month (5 psalms/day, 150 total)
export const PSALMS_IN_A_MONTH: ReadingPlan = (() => {
  const days: ReadingPlan['days'] = [];
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 5; j++) {
      const psalm = i * 5 + j + 1;
      if (psalm > 150) break;
      days.push({ day: i + 1, label: `Day ${i + 1}`, bookId: 'PSA', chapter: psalm });
    }
  }
  return {
    id: 'psalms-30',
    name: 'Psalms in 30 Days',
    description: 'Read 5 Psalms each day to complete all 150 in a month.',
    days,
  };
})();

// Proverbs in a month (1 chapter/day, 31 chapters)
export const PROVERBS_IN_A_MONTH: ReadingPlan = {
  id: 'proverbs-30',
  name: 'Proverbs in 30 Days',
  description: 'One chapter of Proverbs each day — wisdom for every day of the month.',
  days: Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    label: `Day ${i + 1}`,
    bookId: 'PRO',
    chapter: i + 1,
  })),
};

export const READING_PLANS: ReadingPlan[] = [
  NT_IN_30_DAYS,
  PSALMS_IN_A_MONTH,
  PROVERBS_IN_A_MONTH,
  { ...CHRONOLOGICAL_PLAN, multiReading: true },
];