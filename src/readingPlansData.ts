/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ReadingAssignment {
  id: string; // bookId + "_" + chapter (e.g., "JHN_1")
  bookId: string;
  bookName: string;
  chapter: number;
  completed?: boolean;
}

export interface ReadingPlanDay {
  dayNumber: number;
  assignments: ReadingAssignment[];
}

export interface ReadingPlan {
  id: string;
  title: string;
  category: string;
  description: string;
  durationDays: number;
  icon: string; // name of Lucide icon to display (e.g. 'Flame', 'Compass', 'BookOpen', 'Heart', 'Award')
  difficulty: 'Easy' | 'Medium' | 'Deep';
  days: ReadingPlanDay[];
}

// Simple curated plans for our users
export const CURATED_READING_PLANS: ReadingPlan[] = [
  {
    id: 'gospels_intro',
    title: 'The Great Gospel Light',
    category: 'Gospels',
    description: 'An immersive 5-day journey exploring core highlight chapters from Matthew, Mark, Luke, and John.',
    durationDays: 5,
    icon: 'Compass',
    difficulty: 'Easy',
    days: [
      {
        dayNumber: 1,
        assignments: [
          { id: 'gospels_1_1', bookId: 'JHN', bookName: 'John', chapter: 1 },
          { id: 'gospels_1_2', bookId: 'JHN', bookName: 'John', chapter: 3 }
        ]
      },
      {
        dayNumber: 2,
        assignments: [
          { id: 'gospels_2_1', bookId: 'MAT', bookName: 'Matthew', chapter: 5 },
          { id: 'gospels_2_2', bookId: 'MAT', bookName: 'Matthew', chapter: 6 }
        ]
      },
      {
        dayNumber: 3,
        assignments: [
          { id: 'gospels_3_1', bookId: 'LUK', bookName: 'Luke', chapter: 2 }
        ]
      },
      {
        dayNumber: 4,
        assignments: [
          { id: 'gospels_4_1', bookId: 'MRK', bookName: 'Mark', chapter: 14 },
          { id: 'gospels_4_2', bookId: 'LUK', bookName: 'Luke', chapter: 22 }
        ]
      },
      {
        dayNumber: 5,
        assignments: [
          { id: 'gospels_5_1', bookId: 'JHN', bookName: 'John', chapter: 20 },
          { id: 'gospels_5_2', bookId: 'ACT', bookName: 'Acts', chapter: 1 }
        ]
      }
    ]
  },
  {
    id: 'wisdom_literature',
    title: 'Wisdom & Living Truths',
    category: 'Poetry & Advice',
    description: 'A thoughtful 6-day reflection focusing on Psalms, Proverbs, and the philosophical wisdom of Ecclesiastes.',
    durationDays: 6,
    icon: 'Flame',
    difficulty: 'Medium',
    days: [
      {
        dayNumber: 1,
        assignments: [
          { id: 'wisdom_1_1', bookId: 'PSA', bookName: 'Psalms', chapter: 1 },
          { id: 'wisdom_1_2', bookId: 'PSA', bookName: 'Psalms', chapter: 23 }
        ]
      },
      {
        dayNumber: 2,
        assignments: [
          { id: 'wisdom_2_1', bookId: 'PRO', bookName: 'Proverbs', chapter: 1 },
          { id: 'wisdom_2_2', bookId: 'PRO', bookName: 'Proverbs', chapter: 3 }
        ]
      },
      {
        dayNumber: 3,
        assignments: [
          { id: 'wisdom_3_1', bookId: 'ECC', bookName: 'Ecclesiastes', chapter: 3 }
        ]
      },
      {
        dayNumber: 4,
        assignments: [
          { id: 'wisdom_4_1', bookId: 'PSA', bookName: 'Psalms', chapter: 46 },
          { id: 'wisdom_4_2', bookId: 'PSA', bookName: 'Psalms', chapter: 91 }
        ]
      },
      {
        dayNumber: 5,
        assignments: [
          { id: 'wisdom_5_1', bookId: 'PRO', bookName: 'Proverbs', chapter: 4 },
          { id: 'wisdom_5_2', bookId: 'ECC', bookName: 'Ecclesiastes', chapter: 12 }
        ]
      },
      {
        dayNumber: 6,
        assignments: [
          { id: 'wisdom_6_1', bookId: 'PSA', bookName: 'Psalms', chapter: 121 },
          { id: 'wisdom_6_2', bookId: 'PSA', bookName: 'Psalms', chapter: 150 }
        ]
      }
    ]
  },
  {
    id: 'romans_faith',
    title: 'The Grace of Romans',
    category: 'Epistles',
    description: 'Explore the deepest theological arguments of Apostle Paul regarding righteousness, grace, faith, and transformation over 4 days.',
    durationDays: 4,
    icon: 'Heart',
    difficulty: 'Deep',
    days: [
      {
        dayNumber: 1,
        assignments: [
          { id: 'romans_1_1', bookId: 'ROM', bookName: 'Romans', chapter: 1 },
          { id: 'romans_1_2', bookId: 'ROM', bookName: 'Romans', chapter: 3 }
        ]
      },
      {
        dayNumber: 2,
        assignments: [
          { id: 'romans_2_1', bookId: 'ROM', bookName: 'Romans', chapter: 5 },
          { id: 'romans_2_2', bookId: 'ROM', bookName: 'Romans', chapter: 6 }
        ]
      },
      {
        dayNumber: 3,
        assignments: [
          { id: 'romans_3_1', bookId: 'ROM', bookName: 'Romans', chapter: 8 }
        ]
      },
      {
        dayNumber: 4,
        assignments: [
          { id: 'romans_4_1', bookId: 'ROM', bookName: 'Romans', chapter: 12 },
          { id: 'romans_4_2', bookId: 'ROM', bookName: 'Romans', chapter: 13 }
        ]
      }
    ]
  },
  {
    id: 'prophets_and_visions',
    title: 'Prophecies & Devotion',
    category: 'Prophets',
    description: 'A 4-day summary study of Isaiah, Daniel, and Jonah highlighting major vision revelations and survival.',
    durationDays: 4,
    icon: 'Sparkles',
    difficulty: 'Medium',
    days: [
      {
        dayNumber: 1,
        assignments: [
          { id: 'prophetic_1_1', bookId: 'ISA', bookName: 'Isaiah', chapter: 40 },
          { id: 'prophetic_1_2', bookId: 'ISA', bookName: 'Isaiah', chapter: 53 }
        ]
      },
      {
        dayNumber: 2,
        assignments: [
          { id: 'prophetic_2_1', bookId: 'DAN', bookName: 'Daniel', chapter: 1 }
        ]
      },
      {
        dayNumber: 3,
        assignments: [
          { id: 'prophetic_3_1', bookId: 'JON', bookName: 'Jonah', chapter: 1 },
          { id: 'prophetic_3_2', bookId: 'JON', bookName: 'Jonah', chapter: 2 }
        ]
      },
      {
        dayNumber: 4,
        assignments: [
          { id: 'prophetic_4_1', bookId: 'DAN', bookName: 'Daniel', chapter: 6 },
          { id: 'prophetic_4_2', bookId: 'ISA', bookName: 'Isaiah', chapter: 55 }
        ]
      }
    ]
  }
];

export interface UserPlanProgress {
  planId: string;
  currentDay: number;
  completedAssignmentIds: string[]; // Set of assignments checked off
  completedDays: number[]; // days that are fully finished
  startDate: string; // ISO string
}
