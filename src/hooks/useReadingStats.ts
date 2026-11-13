import { useState, useEffect, useCallback, useRef } from 'react';
import { BIBLE_BOOKS } from '../bibleStructure';

export interface ReadingSession {
  date: string; // YYYY-MM-DD
  bookId: string;
  chapter: number;
  timestamp: number; // Unix timestamp
}

export interface ReadingStats {
  sessions: ReadingSession[];
  totalChaptersRead: number;
  totalTimeSpent: number; // seconds
  booksRead: string[]; // book IDs
  firstReadDate: string;
}

const STORAGE_KEY = 'bible_reading_stats_v2';

function loadStats(): ReadingStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    sessions: [],
    totalChaptersRead: 0,
    totalTimeSpent: 0,
    booksRead: [],
    firstReadDate: new Date().toISOString().split('T')[0],
  };
}

function saveStats(stats: ReadingStats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {}
}

export function useReadingStats() {
  const [stats, setStats] = useState<ReadingStats>(loadStats);
  const sessionStartRef = useRef<number>(Date.now());

  // Save stats whenever they change
  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  // Track session time
  useEffect(() => {
    sessionStartRef.current = Date.now();

    const handleVisibilityChange = () => {
      if (document.hidden && sessionStartRef.current) {
        const timeSpent = Math.floor((Date.now() - sessionStartRef.current) / 1000);
        if (timeSpent > 0 && timeSpent < 3600) { // Max 1 hour per session
          setStats(prev => ({
            ...prev,
            totalTimeSpent: prev.totalTimeSpent + timeSpent,
          }));
        }
      } else if (!document.hidden) {
        sessionStartRef.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const recordChapterRead = useCallback((bookId: string, chapter: number) => {
    const today = new Date().toISOString().split('T')[0];
    const session: ReadingSession = {
      date: today,
      bookId,
      chapter,
      timestamp: Date.now(),
    };

    setStats(prev => {
      // Check if this chapter was already read today
      const alreadyReadToday = prev.sessions.some(
        s => s.date === today && s.bookId === bookId && s.chapter === chapter
      );

      if (alreadyReadToday) return prev;

      const newSessions = [...prev.sessions, session];
      const uniqueBooks = Array.from(new Set([...prev.booksRead, bookId]));

      return {
        ...prev,
        sessions: newSessions,
        totalChaptersRead: prev.totalChaptersRead + 1,
        booksRead: uniqueBooks,
        firstReadDate: prev.firstReadDate || today,
      };
    });
  }, []);

  const getChaptersReadForBook = useCallback((bookId: string): number => {
    const uniqueChapters = new Set(
      stats.sessions
        .filter(s => s.bookId === bookId)
        .map(s => s.chapter)
    );
    return uniqueChapters.size;
  }, [stats.sessions]);

  const getReadingDays = useCallback((): string[] => {
    const days = new Set(stats.sessions.map(s => s.date));
    return Array.from(days).sort();
  }, [stats.sessions]);

  const getStreak = useCallback((): { current: number; longest: number } => {
    const days = getReadingDays();
    if (days.length === 0) return { current: 0, longest: 0 };

    let current = 0;
    let longest = 0;
    let tempStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if read today
    const todayStr = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const readToday = days.includes(todayStr);
    const readYesterday = days.includes(yesterdayStr);

    // Calculate current streak
    if (readToday || readYesterday) {
      const startDate = readToday ? today : yesterday;
      for (let i = 0; i < 365; i++) {
        const checkDate = new Date(startDate);
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        
        if (days.includes(dateStr)) {
          tempStreak++;
          current = tempStreak;
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    tempStreak = 0;
    for (let i = 0; i < days.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(days[i - 1] + 'T00:00:00');
        const currDate = new Date(days[i] + 'T00:00:00');
        const diff = (currDate.getTime() - prevDate.getTime()) / 86400000;
        
        if (diff === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      longest = Math.max(longest, tempStreak);
    }

    return { current, longest };
  }, [getReadingDays]);

  const getBookProgress = useCallback(() => {
    return BIBLE_BOOKS.map(book => {
      const chaptersRead = getChaptersReadForBook(book.id);
      const totalChapters = book.chapters;
      const percentage = totalChapters > 0 ? (chaptersRead / totalChapters) * 100 : 0;
      
      return {
        bookId: book.id,
        bookName: book.name,
        chaptersRead,
        totalChapters,
        percentage,
        completed: chaptersRead >= totalChapters,
      };
    });
  }, [getChaptersReadForBook]);

  const getRecentActivity = useCallback((days: number = 7): ReadingSession[] => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().split('T')[0];

    return stats.sessions
      .filter(s => s.date >= cutoffStr)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [stats.sessions]);

  const resetStats = useCallback(() => {
    const empty: ReadingStats = {
      sessions: [],
      totalChaptersRead: 0,
      totalTimeSpent: 0,
      booksRead: [],
      firstReadDate: new Date().toISOString().split('T')[0],
    };
    setStats(empty);
  }, []);

  return {
    stats,
    recordChapterRead,
    getChaptersReadForBook,
    getReadingDays,
    getStreak,
    getBookProgress,
    getRecentActivity,
    resetStats,
  };
}
