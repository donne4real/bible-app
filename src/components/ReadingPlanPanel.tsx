/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Reading plan panel shown inside the Sidebar's "Plans" tab.
 *
 * Two modes:
 * - Selection mode: lists available plans (NT 30-day, Psalms, Proverbs)
 *   when no plan is active.
 * - Active mode: shows progress bar, today's readings with navigation
 *   links, and a "Mark Complete" button when a plan is in progress.
 */

import React from 'react';
import { Calendar, Check, ChevronRight, Play, RotateCcw } from 'lucide-react';
import { ReadingPlan, ReadingPlanProgress } from '../types';
import { READING_PLANS } from '../readingPlans';
import { BIBLE_BOOKS } from '../bibleStructure';

interface ReadingPlanPanelProps {
  progress: ReadingPlanProgress | null;
  onStartPlan: (planId: string) => void;
  onResetPlan: () => void;
  onCompleteDay: (day: number) => void;
  onNavigateTo: (bookId: string, chapter: number) => void;
}

export default function ReadingPlanPanel({
  progress,
  onStartPlan,
  onResetPlan,
  onCompleteDay,
  onNavigateTo,
}: ReadingPlanPanelProps) {
  const activePlan = progress ? READING_PLANS.find(p => p.id === progress.planId) : null;

  if (!activePlan) {
    return (
      <div className="space-y-3">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Start a reading plan to build a daily Bible habit.
        </p>
        {READING_PLANS.map(plan => (
          <button
            key={plan.id}
            onClick={() => onStartPlan(plan.id)}
            className="w-full p-3 rounded-xl border border-zinc-150 dark:border-zinc-800 hover:border-amber-500/30 hover:bg-amber-500/5 transition text-left group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                  {plan.name}
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">{plan.days.length} days</div>
              </div>
              <Play className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 transition" />
            </div>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1.5 leading-relaxed">{plan.description}</p>
          </button>
        ))}
      </div>
    );
  }

  const todaysReadings = activePlan.days.filter(d => d.day === progress.currentDay);
  const completedCount = progress.completedDays.length;
  const totalDays = Math.max(...activePlan.days.map(d => d.day));
  const pct = Math.round((completedCount / totalDays) * 100);

  return (
    <div className="space-y-4">
      {/* Progress header */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{activePlan.name}</span>
          <button
            onClick={onResetPlan}
            className="text-[9px] text-zinc-400 hover:text-rose-500 transition flex items-center gap-0.5"
            aria-label="Reset reading plan"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[9px] text-zinc-400 font-mono">{completedCount}/{totalDays} days</span>
          <span className="text-[9px] text-amber-600 dark:text-amber-400 font-mono font-bold">{pct}%</span>
        </div>
      </div>

      {/* Today's reading */}
      <div>
        <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
          Day {progress.currentDay} Readings
        </div>
        <div className="space-y-1.5">
          {todaysReadings.map(r => {
            const book = BIBLE_BOOKS.find(b => b.id === r.bookId);
            return (
              <button
                key={`${r.bookId}-${r.chapter}`}
                onClick={() => onNavigateTo(r.bookId, r.chapter)}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 hover:border-amber-500/30 hover:bg-amber-500/5 transition text-left group"
              >
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                  {book?.name || r.bookId} {r.chapter}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 transition" />
              </button>
            );
          })}
        </div>
        <button
          onClick={() => onCompleteDay(progress.currentDay)}
          className="w-full mt-3 py-2 rounded-lg bg-amber-500 text-zinc-950 text-xs font-bold hover:bg-amber-400 transition active:scale-95 flex items-center justify-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" /> Mark Day {progress.currentDay} Complete
        </button>
      </div>

      {/* Completed days summary */}
      {completedCount > 0 && (
        <div className="text-[9px] text-zinc-400 font-mono text-center">
          Streak: {completedCount} day{completedCount !== 1 ? 's' : ''} completed
          {progress.startedAt > 0 && (
            <> since {new Date(progress.startedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</>
          )}
        </div>
      )}
    </div>
  );
}