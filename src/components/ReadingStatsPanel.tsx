import React, { useState } from 'react';
import { X, BookOpen, Clock, Calendar, TrendingUp, Award, RotateCcw } from 'lucide-react';
import { useReadingStats } from '../hooks/useReadingStats';
import { BIBLE_BOOKS } from '../bibleStructure';
import { motion, AnimatePresence } from 'motion/react';

interface ReadingStatsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReadingStatsPanel({ isOpen, onClose }: ReadingStatsPanelProps) {
  const {
    stats,
    getStreak,
    getBookProgress,
    getRecentActivity,
    resetStats,
  } = useReadingStats();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'books' | 'activity'>('overview');

  const streak = getStreak();
  const bookProgress = getBookProgress();
  const recentActivity = getRecentActivity(7);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const completedBooks = bookProgress.filter(b => b.completed).length;
  const totalBooks = BIBLE_BOOKS.length;
  const overallProgress = (stats.totalChaptersRead / 1189) * 100; // 1189 total chapters in Bible

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-serif font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Reading Statistics
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-800">
            {(['overview', 'books', 'activity'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 text-sm font-bold transition ${
                  activeTab === tab
                    ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-600 dark:border-amber-400'
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Key Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">Current Streak</span>
                    </div>
                    <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">{streak.current}</div>
                    <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                      {streak.current === 1 ? 'day' : 'days'} · Best: {streak.longest}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Chapters Read</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.totalChaptersRead}</div>
                    <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      {completedBooks} books completed
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-xs font-bold text-green-700 dark:text-green-300 uppercase tracking-wide">Time Spent</span>
                    </div>
                    <div className="text-3xl font-bold text-green-900 dark:text-green-100">{formatTime(stats.totalTimeSpent)}</div>
                    <div className="text-xs text-green-700 dark:text-green-300 mt-1">
                      {stats.totalTimeSpent > 0 ? 'Keep it up!' : 'Start reading!'}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wide">Days Read</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.sessions.length > 0 ? new Set(stats.sessions.map(s => s.date)).size : 0}</div>
                    <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                      Total reading days
                    </div>
                  </div>
                </div>

                {/* Overall Progress */}
                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold">Overall Bible Progress</span>
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{overallProgress.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                    {stats.totalChaptersRead} of 1,189 chapters · {completedBooks} of {totalBooks} books
                  </div>
                </div>

                {/* Recent Activity */}
                {recentActivity.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold mb-3">Recent Activity (Last 7 Days)</h3>
                    <div className="space-y-2">
                      {recentActivity.slice(0, 5).map((session, i) => {
                        const book = BIBLE_BOOKS.find(b => b.id === session.bookId);
                        return (
                          <div key={i} className="flex items-center gap-3 p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold">{book?.name || session.bookId} {session.chapter}</div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {new Date(session.timestamp).toLocaleDateString()} at {new Date(session.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'books' && (
              <div className="space-y-3">
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  Track your progress through each book of the Bible
                </div>
                {bookProgress.map(book => (
                  <div key={book.bookId} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{book.bookName}</span>
                        {book.completed && (
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full font-bold">
                            ✓ Complete
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        {book.chaptersRead}/{book.totalChapters}
                      </span>
                    </div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          book.completed
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500'
                        }`}
                        style={{ width: `${book.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-4">
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  Your complete reading history
                </div>
                {stats.sessions.length === 0 ? (
                  <div className="text-center py-12 text-zinc-400">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No reading activity yet</p>
                    <p className="text-xs mt-1">Start reading to see your history here</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {stats.sessions
                      .sort((a, b) => b.timestamp - a.timestamp)
                      .map((session, i) => {
                        const book = BIBLE_BOOKS.find(b => b.id === session.bookId);
                        return (
                          <div key={i} className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold">{book?.name || session.bookId} {session.chapter}</div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {new Date(session.timestamp).toLocaleDateString()} at {new Date(session.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
            {showResetConfirm ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-600 dark:text-red-400">Reset all statistics?</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      resetStats();
                      setShowResetConfirm(false);
                    }}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-2 text-xs text-zinc-500 hover:text-red-600 dark:hover:text-red-400 transition"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Statistics
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
