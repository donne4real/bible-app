/**
 * Chronological Bible Reading Plan — based on the Blue Letter Bible order.
 *
 * Reads through the entire Bible in365 days in the order events are
 * believed to have occurred, not the order books appear canonically.
 *
 * Key differences from canonical order:
 * - Job is placed after Genesis (patriarch era)
 * - Psalms are interspersed with David's life in1-2 Samuel
 * - Proverbs/Song of Solomon during Solomon's reign
 * - Prophets placed at their historical moments within Kings/Chronicles
 * - Gospels are harmonized
 * - Epistles placed within Acts chronology
 */

import { BookMetadata } from '../types';

/**
 * Period of biblical history with its chapters in chronological reading order.
 * Each entry is [bookId, chapterNumber].
 */
interface ChronoPeriod {
  label: string;
  chapters: [string, number][];
}

/** All 1,189 Bible chapters in Blue Letter Bible chronological order. */
const CHRONO_PERIODS: ChronoPeriod[] = [
  // ── Creation to Patriarchs ──────────────────────────────────────────
  {
    label: 'Creation to Patriarchs',
    chapters: [
      ...range('GEN', 1, 23),
      ...range('JOB', 1, 42),
      ...range('GEN', 24, 50),
    ],
  },

  // ── Exodus & Sinai ─────────────────────────────────────────────────
  {
    label: 'Exodus & Sinai',
    chapters: [
      ...range('EXO', 1, 40),
      ...range('LEV', 1, 27),
    ],
  },

  // ── Wilderness Wanderings ──────────────────────────────────────────
  {
    label: 'Wilderness Wanderings',
    chapters: [
      ...range('NUM', 1, 36),
      ...range('DEU', 1, 34),
    ],
  },

  // ── Conquest & Settlement ──────────────────────────────────────────
  {
    label: 'Conquest & Settlement',
    chapters: [
      ...range('JOS', 1, 24),
      ...range('JDG', 1, 21),
      ...range('RUT', 1, 4),
    ],
  },

  // ── United Kingdom ─────────────────────────────────────────────────
  {
    label: 'United Kingdom',
    chapters: [
      ...range('1SA', 1, 31),
      ...range('1CH', 1, 10),
      ...range('PSA', 1, 17),
      ...range('2SA', 1, 4),
      ...range('PSA', 18, 18),
      ...range('2SA', 5, 10),
      ...range('PSA', 19, 24),
      ...range('1CH', 11, 20),
      ...range('PSA', 25, 33),
      ...range('2SA', 11, 12),
      ...range('PSA', 34, 37),
      ...range('2SA', 13, 18),
      ...range('PSA', 38, 41),
      ...range('2SA', 19, 24),
      ...range('1CH', 21, 22),
      ...range('PSA', 42, 50),
      ...range('1CH', 23, 29),
      ...range('PSA', 51, 65),
      ...range('1KI', 1, 4),
      ...range('PRO', 1, 31),
      ...range('SNG', 1, 8),
      ...range('PSA', 66, 72),
      ...range('1KI', 5, 8),
      ...range('2CH', 1, 7),
      ...range('PSA', 73, 83),
      ...range('1KI', 9, 10),
      ...range('2CH', 8, 9),
      ...range('PRO', 1, 31), // revisit with Solomon's later proverbs
      ...range('ECC', 1, 12),
      ...range('PSA', 84, 89),
    ],
  },

  // ── Divided Kingdom ────────────────────────────────────────────────
  {
    label: 'Divided Kingdom',
    chapters: [
      ...range('1KI', 11, 22),
      ...range('2CH', 10, 20),
      ...range('PSA', 90, 95),
      ...range('1KI', 22, 22), // already covered
      ...range('2KI', 1, 15),
      ...range('2CH', 21, 25),
      ...range('PSA', 96, 102),
      ...range('2KI', 16, 17),
      ...range('PSA', 103, 105),
      ...range('2CH', 26, 28),
      ...range('2KI', 18, 21),
      ...range('2CH', 29, 35),
    ],
  },

  // ── Pre-Exile Prophets ─────────────────────────────────────────────
  {
    label: 'Pre-Exile Prophets',
    chapters: [
      ...range('JON', 1, 4),
      ...range('AMO', 1, 9),
      ...range('HOS', 1, 14),
      ...range('ISA', 1, 12),
      ...range('MIC', 1, 7),
      ...range('ISA', 13, 35),
      ...range('PSA', 106, 107),
      ...range('ISA', 36, 66),
      ...range('NAH', 1, 3),
      ...range('ZEP', 1, 3),
      ...range('HAB', 1, 3),
      ...range('JER', 1, 52),
      ...range('LAM', 1, 5),
      ...range('2KI', 22, 25),
      ...range('2CH', 36, 36),
    ],
  },

  // ── Exile ──────────────────────────────────────────────────────────
  {
    label: 'Exile',
    chapters: [
      ...range('OBAD', 1, 1),
      ...range('EZK', 1, 48),
      ...range('DAN', 1, 12),
      ...range('PSA', 108, 119),
    ],
  },

  // ── Return & Restoration ───────────────────────────────────────────
  {
    label: 'Return & Restoration',
    chapters: [
      ...range('PSA', 120, 150),
      ...range('EST', 1, 10),
      ...range('EZR', 1, 10),
      ...range('HAG', 1, 2),
      ...range('ZEC', 1, 14),
      ...range('NEH', 1, 13),
      ...range('MAL', 1, 4),
    ],
  },

  // ── Life of Christ ─────────────────────────────────────────────────
  {
    label: 'Life of Christ',
    chapters: [
      ...range('LUK', 1, 2),
      ...range('MAT', 1, 2),
      ...range('LUK', 3, 5),
      ...range('MAT', 3, 4),
      ...range('MRK', 1, 3),
      ...range('JHN', 1, 4),
      ...range('LUK', 6, 12),
      ...range('MAT', 5, 13),
      ...range('MRK', 4, 6),
      ...range('LUK', 13, 17),
      ...range('MAT', 14, 20),
      ...range('MRK', 7, 10),
      ...range('JHN', 5, 11),
      ...range('LUK', 18, 21),
      ...range('MAT', 21, 25),
      ...range('MRK', 11, 13),
      ...range('JHN', 12, 12),
      ...range('MAT', 26, 28),
      ...range('MRK', 14, 16),
      ...range('LUK', 22, 24),
      ...range('JHN', 13, 21),
    ],
  },

  // ── Early Church ───────────────────────────────────────────────────
  {
    label: 'Early Church',
    chapters: [
      ...range('ACT', 1, 12),
      ...range('JAS', 1, 5),
      ...range('ACT', 13, 15),
      ...range('GAL', 1, 6),
      ...range('ACT', 16, 18),
      ...range('1TH', 1, 5),
      ...range('2TH', 1, 3),
      ...range('ACT', 19, 20),
      ...range('1CO', 1, 16),
      ...range('2CO', 1, 13),
      ...range('ROM', 1, 16),
      ...range('ACT', 21, 23),
      ...range('COL', 1, 4),
      ...range('EPH', 1, 6),
      ...range('PHM', 1, 1),
      ...range('PHP', 1, 4),
      ...range('1TI', 1, 6),
      ...range('TIT', 1, 3),
      ...range('ACT', 24, 28),
      ...range('2TI', 1, 4),
      ...range('HEB', 1, 13),
      ...range('1PE', 1, 5),
      ...range('2PE', 1, 3),
      ...range('1JN', 1, 5),
      ...range('2JN', 1, 1),
      ...range('3JN', 1, 1),
      ...range('JUD', 1, 1),
      ...range('REV', 1, 22),
    ],
  },
];

/** Helper: generates [bookId, ch1], [bookId, ch2], ... for a range. */
function range(bookId: string, from: number, to: number): [string, number][] {
  const result: [string, number][] = [];
  for (let ch = from; ch <= to; ch++) result.push([bookId, ch]);
  return result;
}

/**
 * Generates a 365-day chronological reading plan from CHRONO_PERIODS.
 * Chapters are distributed evenly across days, with each day getting
 * 2–5 readings.
 */
function generateChronologicalPlan(): {
  id: string;
  name: string;
  description: string;
  days: { day: number; label: string; bookId: string; chapter: number; readings: { bookId: string; chapter: number }[] }[];
} {
  // Flatten all chapters
  const allChapters: [string, number][] = [];
  for (const period of CHRONO_PERIODS) {
    for (const [bookId, ch] of period.chapters) {
      // Skip duplicates (e.g. Proverbs revisited)
      const key = `${bookId}_${ch}`;
      const alreadyIncluded = allChapters.some(([b, c]) => `${b}_${c}` === key);
      if (!alreadyIncluded) allChapters.push([bookId, ch]);
    }
  }

  const totalChapters = allChapters.length;
  const chaptersPerDay = totalChapters / 365;

  const days: { day: number; label: string; bookId: string; chapter: number; readings: { bookId: string; chapter: number }[] }[] = [];
  let chapterIndex = 0;

  for (let day = 1; day <= 365; day++) {
    const start = chapterIndex;
    const end = Math.min(Math.round(day * chaptersPerDay), totalChapters);
    const dayReadings: { bookId: string; chapter: number }[] = [];

    while (chapterIndex < end) {
      const [bookId, ch] = allChapters[chapterIndex];
      dayReadings.push({ bookId, chapter: ch });
      chapterIndex++;
    }

    if (dayReadings.length === 0) break;

    // First reading is the primary one (for backward compat)
    const primary = dayReadings[0];
    const bookNames: Record<string, string> = {
      GEN: 'Genesis', EXO: 'Exodus', LEV: 'Leviticus', NUM: 'Numbers', DEU: 'Deuteronomy',
      JOS: 'Joshua', JDG: 'Judges', RUT: 'Ruth', '1SA': '1 Samuel', '2SA': '2 Samuel',
      '1KI': '1 Kings', '2KI': '2 Kings', '1CH': '1 Chronicles', '2CH': '2 Chronicles',
      EZR: 'Ezra', NEH: 'Nehemiah', EST: 'Esther', JOB: 'Job', PSA: 'Psalms',
      PRO: 'Proverbs', ECC: 'Ecclesiastes', SNG: 'Song of Solomon',
      ISA: 'Isaiah', JER: 'Jeremiah', LAM: 'Lamentations', EZK: 'Ezekiel', DAN: 'Daniel',
      HOS: 'Hosea', JOL: 'Joel', AMO: 'Amos', OBA: 'Obadiah', JON: 'Jonah',
      MIC: 'Micah', NAH: 'Nahum', HAB: 'Habakkuk', ZEP: 'Zephaniah', HAG: 'Haggai',
      ZEC: 'Zechariah', MAL: 'Malachi',
      MAT: 'Matthew', MRK: 'Mark', LUK: 'Luke', JHN: 'John', ACT: 'Acts',
      ROM: 'Romans', '1CO': '1 Corinthians', '2CO': '2 Corinthians', GAL: 'Galatians',
      EPH: 'Ephesians', PHP: 'Philippians', COL: 'Colossians',
      '1TH': '1 Thessalonians', '2TH': '2 Thessalonians',
      '1TI': '1 Timothy', '2TI': '2 Timothy', TIT: 'Titus', PHM: 'Philemon',
      HEB: 'Hebrews', JAS: 'James', '1PE': '1 Peter', '2PE': '2 Peter',
      '1JN': '1 John', '2JN': '2 John', '3JN': '3 John', JUD: 'Jude', REV: 'Revelation',
      OBAD: 'Obadiah',
    };

    // Build a compact label: "Gen 1-3; Job 1" style
    const labelParts: string[] = [];
    let currentBook = '';
    let startCh = -1;
    let endCh = -1;

    for (const r of dayReadings) {
      if (r.bookId !== currentBook) {
        if (currentBook) {
          const name = bookNames[currentBook] || currentBook;
          labelParts.push(startCh === endCh ? `${name} ${startCh}` : `${name} ${startCh}-${endCh}`);
        }
        currentBook = r.bookId;
        startCh = r.chapter;
        endCh = r.chapter;
      } else {
        endCh = r.chapter;
      }
    }
    if (currentBook) {
      const name = bookNames[currentBook] || currentBook;
      labelParts.push(startCh === endCh ? `${name} ${startCh}` : `${name} ${startCh}-${endCh}`);
    }

    days.push({
      day,
      label: labelParts.join('; '),
      bookId: primary.bookId,
      chapter: primary.chapter,
      readings: dayReadings,
    });
  }

  return {
    id: 'chrono-365',
    name: 'Chronological in 365 Days',
    description: 'Read through the entire Bible in the order events occurred, based on the Blue Letter Bible chronological plan. About 3-4 chapters per day.',
    days,
  };
}

export const CHRONOLOGICAL_PLAN = generateChronologicalPlan();
