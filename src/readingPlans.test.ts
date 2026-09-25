import { READING_PLANS, NT_IN_30_DAYS, PSALMS_IN_A_MONTH, PROVERBS_IN_A_MONTH } from './readingPlans';
import { BIBLE_BOOKS } from './bibleStructure';

describe('READING_PLANS', () => {
  it('should have 3 plans', () => {
    expect(READING_PLANS).toHaveLength(3);
  });

  it('each plan should have unique id', () => {
    const ids = READING_PLANS.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('each plan should have a name, description, and non-empty days', () => {
    for (const plan of READING_PLANS) {
      expect(plan.name).toBeTruthy();
      expect(plan.description).toBeTruthy();
      expect(plan.days.length).toBeGreaterThan(0);
    }
  });
});

describe('NT_IN_30_DAYS', () => {
  it('should cover all NT books', () => {
    const ntBooks = BIBLE_BOOKS.filter(b => b.testament === 'NT').map(b => b.id);
    const planBooks = new Set(NT_IN_30_DAYS.days.map(d => d.bookId));
    for (const bookId of ntBooks) {
      expect(planBooks.has(bookId)).toBe(true);
    }
  });

  it('should have ~45 unique day numbers (NT has ~260 chapters, ~6/day)', () => {
    const uniqueDays = new Set(NT_IN_30_DAYS.days.map(d => d.day));
    expect(uniqueDays.size).toBeGreaterThanOrEqual(30);
    expect(uniqueDays.size).toBeLessThanOrEqual(50);
  });

  it('should have sequential day numbers starting at 1', () => {
    const uniqueDays = [...new Set(NT_IN_30_DAYS.days.map(d => d.day))].sort((a, b) => a - b);
    expect(uniqueDays[0]).toBe(1);
    for (let i = 1; i < uniqueDays.length; i++) {
      expect(uniqueDays[i]).toBe(uniqueDays[i - 1] + 1);
    }
  });
});

describe('PSALMS_IN_A_MONTH', () => {
  it('should cover all 150 Psalms', () => {
    const chapters = PSALMS_IN_A_MONTH.days.map(d => d.chapter).sort((a, b) => a - b);
    expect(chapters).toHaveLength(150);
    expect(chapters[0]).toBe(1);
    expect(chapters[149]).toBe(150);
  });

  it('should all reference PSA book', () => {
    for (const day of PSALMS_IN_A_MONTH.days) {
      expect(day.bookId).toBe('PSA');
    }
  });

  it('should have 30 days', () => {
    const uniqueDays = new Set(PSALMS_IN_A_MONTH.days.map(d => d.day));
    expect(uniqueDays.size).toBe(30);
  });
});

describe('PROVERBS_IN_A_MONTH', () => {
  it('should cover all 31 Proverbs chapters', () => {
    const chapters = PROVERBS_IN_A_MONTH.days.map(d => d.chapter);
    expect(chapters).toHaveLength(31);
    expect(chapters[0]).toBe(1);
    expect(chapters[30]).toBe(31);
  });

  it('should all reference PRO book', () => {
    for (const day of PROVERBS_IN_A_MONTH.days) {
      expect(day.bookId).toBe('PRO');
    }
  });

  it('each day should have exactly 1 reading', () => {
    for (const day of PROVERBS_IN_A_MONTH.days) {
      const readings = PROVERBS_IN_A_MONTH.days.filter(d => d.day === day.day);
      expect(readings).toHaveLength(1);
    }
  });
});