import { useState, useEffect, useCallback } from 'react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastReadDate: string; // YYYY-MM-DD
  totalDaysRead: number;
}

const STORAGE_KEY = 'bible_reading_streak';

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db.getTime() - da.getTime()) / 86400000);
}

function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { currentStreak: 0, longestStreak: 0, lastReadDate: '', totalDaysRead: 0 };
}

function saveStreak(data: StreakData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

/**
 * Tracks daily reading streaks.
 * Call `recordRead()` whenever the user opens a new chapter.
 * Returns current streak, longest streak, and total days read.
 */
export function useReadingStreak() {
  const [streak, setStreak] = useState<StreakData>(loadStreak);

  // Check if streak should reset on day change
  useEffect(() => {
    const today = getToday();
    if (streak.lastReadDate && daysBetween(streak.lastReadDate, today) > 1) {
      const updated = { ...streak, currentStreak: 0 };
      setStreak(updated);
      saveStreak(updated);
    }
  }, []);

  const recordRead = useCallback(() => {
    const today = getToday();
    setStreak(prev => {
      if (prev.lastReadDate === today) return prev; // already counted today

      const gap = prev.lastReadDate ? daysBetween(prev.lastReadDate, today) : 999;
      const newStreak = gap === 1 ? prev.currentStreak + 1 : 1;
      const longest = Math.max(newStreak, prev.longestStreak);
      const total = prev.lastReadDate === today ? prev.totalDaysRead : prev.totalDaysRead + 1;

      const updated: StreakData = {
        currentStreak: newStreak,
        longestStreak: longest,
        lastReadDate: today,
        totalDaysRead: total,
      };
      saveStreak(updated);
      return updated;
    });
  }, []);

  return {
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    totalDaysRead: streak.totalDaysRead,
    recordRead,
  };
}