/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  Compass, 
  Heart, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  Calendar, 
  Trophy, 
  CheckCircle, 
  Circle, 
  Play, 
  ArrowRight, 
  RotateCcw, 
  Plus, 
  Award, 
  Info,
  Layers,
  Sparkle
} from 'lucide-react';
import { CURATED_READING_PLANS, ReadingPlan, UserPlanProgress, ReadingAssignment } from '../readingPlansData';
import { BookMetadata } from '../types';
import { BIBLE_BOOKS } from '../bibleStructure';

interface ReadingPlansTrackerProps {
  activeProgress: UserPlanProgress | null;
  onSelectBook: (book: BookMetadata) => void;
  onSelectChapter: (chapter: number) => void;
  onUpdateProgress: (progress: UserPlanProgress | null) => void;
}

export default function ReadingPlansTracker({
  activeProgress,
  onSelectBook,
  onSelectChapter,
  onUpdateProgress
}: ReadingPlansTrackerProps) {
  const [showPlansSelectorModal, setShowPlansSelectorModal] = useState(false);
  const [selectedPlanTab, setSelectedPlanTab] = useState<'all' | 'Gospels' | 'Poetry & Advice' | 'Epistles' | 'Prophets'>('all');

  // Find currently active plan
  const activePlan = activeProgress 
    ? CURATED_READING_PLANS.find(p => p.id === activeProgress.planId) 
    : null;

  // Render correct category icon
  const getPlanIcon = (iconName: string, className = "w-5 h-5 text-amber-500") => {
    switch (iconName) {
      case 'Flame': return <Flame className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  // Start/Activate a reading plan
  const handleStartPlan = (plan: ReadingPlan) => {
    const newProgress: UserPlanProgress = {
      planId: plan.id,
      currentDay: 1,
      completedAssignmentIds: [],
      completedDays: [],
      startDate: new Date().toISOString()
    };
    onUpdateProgress(newProgress);
    setShowPlansSelectorModal(false);
  };

  // Reset or leave Current Plan
  const handleAbandonOrReset = () => {
    if (window.confirm("Are you sure you want to restart or change your active Reading Plan? Your current progress for this plan will be cleared.")) {
      onUpdateProgress(null);
    }
  };

  // Mark an assignment as complete/incomplete
  const handleToggleAssignment = (assignmentId: string, dayNumber: number) => {
    if (!activeProgress || !activePlan) return;

    let updatedAssignmentIds = [...activeProgress.completedAssignmentIds];
    const isCompleted = updatedAssignmentIds.includes(assignmentId);

    if (isCompleted) {
      updatedAssignmentIds = updatedAssignmentIds.filter(id => id !== assignmentId);
    } else {
      updatedAssignmentIds.push(assignmentId);
    }

    // Check if all assignments for this day are completed
    const day = activePlan.days.find(d => d.dayNumber === dayNumber);
    let updatedCompletedDays = [...activeProgress.completedDays];
    
    if (day) {
      const allDayAssignments = day.assignments.map(a => a.id);
      const allCompleted = allDayAssignments.every(id => updatedAssignmentIds.includes(id));
      
      const dayAlreadyMarked = updatedCompletedDays.includes(dayNumber);
      if (allCompleted && !dayAlreadyMarked) {
        updatedCompletedDays.push(dayNumber);
      } else if (!allCompleted && dayAlreadyMarked) {
        updatedCompletedDays = updatedCompletedDays.filter(d => d !== dayNumber);
      }
    }

    onUpdateProgress({
      ...activeProgress,
      completedAssignmentIds: updatedAssignmentIds,
      completedDays: updatedCompletedDays
    });
  };

  // Jump core bible reader layout to the target book/chapter
  const handleNavigateToScripture = (bookId: string, chapter: number) => {
    const book = BIBLE_BOOKS.find(b => b.id === bookId);
    if (book) {
      onSelectBook(book);
      onSelectChapter(chapter);
      // Smooth scroll reader top
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  // Progress calculations
  const progressPercent = activePlan && activeProgress
    ? Math.round(
        (activeProgress.completedAssignmentIds.length / 
        activePlan.days.reduce((acc, d) => acc + d.assignments.length, 0)) * 100
      )
    : 0;

  const currentLevelDay = activeProgress?.currentDay || 1;
  const currentDayAssignments = activePlan?.days.find(d => d.dayNumber === currentLevelDay)?.assignments || [];
  const isCurrentDayDone = currentDayAssignments.length > 0 && currentDayAssignments.every(a => 
    activeProgress?.completedAssignmentIds.includes(a.id)
  );

  const totalPlanAssignmentsCount = activePlan 
    ? activePlan.days.reduce((acc, d) => acc + d.assignments.length, 0)
    : 0;

  // Advance day
  const handleNextDay = () => {
    if (!activeProgress || !activePlan) return;
    if (activeProgress.currentDay < activePlan.durationDays) {
      onUpdateProgress({
        ...activeProgress,
        currentDay: activeProgress.currentDay + 1
      });
    }
  };

  // Go back day
  const handlePrevDay = () => {
    if (!activeProgress || !activePlan) return;
    if (activeProgress.currentDay > 1) {
      onUpdateProgress({
        ...activeProgress,
        currentDay: activeProgress.currentDay - 1
      });
    }
  };

  const filteredPlans = selectedPlanTab === 'all'
    ? CURATED_READING_PLANS
    : CURATED_READING_PLANS.filter(p => p.category === selectedPlanTab);

  return (
    <div id="reading-plan-integration-block" className="mb-8 font-sans">
      
      {/* 1. STATE: NO ACTIVE PLAN - HERO CARD TO JOIN ONE */}
      {!activePlan ? (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white dark:to-zinc-900 border border-amber-500/20 dark:border-zinc-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-3">
              <div className="p-3 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center shrink-0 self-start shadow-sm">
                <Compass className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400 font-mono">
                  Scriptural Habit Builder
                </span>
                <h3 className="text-base sm:text-lg font-serif font-black tracking-tight text-zinc-900 dark:text-zinc-50 mt-0.5">
                  Start an Active Bible Reading Plan
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-lg leading-relaxed">
                  Enhance your daily devotional routine. Deepen historical context, trace structural theology, and build satisfying streaks with interactive goal milestones.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPlansSelectorModal(true)}
              className="px-4 py-2 bg-amber-550 hover:bg-amber-500 text-zinc-950 font-bold text-xs rounded-xl shadow-sm transition active:scale-95 flex items-center gap-1.5 shrink-0 self-end sm:self-center cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Browse Plans
            </button>
          </div>
        </div>
      ) : (
        /* 2. STATE: HAS ACTIVE PLAN - PROGRESS TRACKER RING & CHECKBOXES */
        <div className="p-5.5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
          
          {/* Header Action Row */}
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-850 pb-3.5 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                {getPlanIcon(activePlan.icon, "w-4.5 h-4.5")}
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400 font-mono bg-amber-500/10 dark:bg-amber-500/5 px-2 py-0.5 rounded-full">
                    {activePlan.category} Plan
                  </span>
                  <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full ${
                    activePlan.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                    activePlan.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'
                  }`}>
                    {activePlan.difficulty}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mt-0.5">
                  {activePlan.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setShowPlansSelectorModal(true)}
                className="px-2.5 py-1 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-amber-550 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
              >
                Switch Plan
              </button>
              <button 
                onClick={handleAbandonOrReset}
                title="Restart this active plan"
                className="p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            
            {/* Left Block: Day Selector & Assignment Checkbox List */}
            <div className="md:col-span-8 space-y-3">
              
              {/* Day Switcher */}
              <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60 p-1.5 rounded-xl border border-zinc-100 dark:border-zinc-850">
                <button
                  disabled={currentLevelDay <= 1}
                  onClick={handlePrevDay}
                  className="p-1 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold disabled:opacity-40 disabled:hover:bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 transition text-zinc-700 dark:text-zinc-300"
                >
                  ◀ Prev Day
                </button>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono font-black text-amber-550 dark:text-amber-400 uppercase tracking-widest">
                    Milestone Progress
                  </span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    Day {currentLevelDay} of {activePlan.durationDays}
                  </span>
                </div>

                <button
                  disabled={currentLevelDay >= activePlan.durationDays}
                  onClick={handleNextDay}
                  className="p-1 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-bold disabled:opacity-40 disabled:hover:bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 transition text-zinc-700 dark:text-zinc-300"
                >
                  Next Day ▶
                </button>
              </div>

              {/* Assignment checkpoints */}
              <div className="space-y-2">
                {currentDayAssignments.map((assignment) => {
                  const isChecked = activeProgress.completedAssignmentIds.includes(assignment.id);
                  return (
                    <div
                      key={assignment.id}
                      className={`flex items-center justify-between p-3 rounded-xl border transition ${
                        isChecked 
                          ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/25 text-emerald-800 dark:text-emerald-300' 
                          : 'bg-zinc-50/50 dark:bg-zinc-950/10 border-zinc-150 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-950/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <button
                          onClick={() => handleToggleAssignment(assignment.id, currentLevelDay)}
                          className="shrink-0 p-0.5 text-zinc-400 hover:text-amber-550 dark:hover:text-amber-400 transition"
                        >
                          {isChecked ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                          ) : (
                            <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-700 hover:border-amber-550" />
                          )}
                        </button>
                        <div className="min-w-0">
                          <button
                            onClick={() => handleNavigateToScripture(assignment.bookId, assignment.chapter)}
                            className={`text-xs font-bold hover:underline text-left inline-flex items-center gap-1 ${
                              isChecked ? 'line-through opacity-60 text-zinc-500' : 'text-zinc-800 dark:text-zinc-200'
                            }`}
                          >
                            <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>{assignment.bookName} {assignment.chapter}</span>
                          </button>
                          <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                            Click reference or tick check circle to read and record.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleNavigateToScripture(assignment.bookId, assignment.chapter)}
                        className="py-1 px-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-amber-550/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition whitespace-nowrap cursor-pointer"
                      >
                        Read Now 📖
                      </button>
                    </div>
                  );
                })}

                {currentDayAssignments.length === 0 && (
                  <p className="text-xs text-zinc-400 p-2 text-center">No assignments configured for this day.</p>
                )}
              </div>

              {/* Congratulatory state if day completed */}
              {isCurrentDayDone && (
                <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 rounded-2xl flex items-center justify-between text-emerald-800 dark:text-emerald-400 shrink-0 select-none animate-fade-in">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4.5 h-4.5 shrink-0 text-amber-400" />
                    <span className="text-xs font-black">All assignments complete for Day {currentLevelDay}!</span>
                  </div>
                  {currentLevelDay < activePlan.durationDays && (
                    <button
                      onClick={handleNextDay}
                      className="text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white dark:text-zinc-950 px-2.5 py-1 rounded-lg hover:bg-emerald-600 transition"
                    >
                      Advance to Day {currentLevelDay + 1} →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right Block: Progress Dashboard metrics */}
            <div className="md:col-span-4 p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-150 dark:border-zinc-850 flex flex-col items-center justify-center text-center h-full relative">
              
              {/* Radial or Ring Visual progress indicator */}
              <div className="relative w-20 h-20 flex items-center justify-center mb-2 select-none">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    strokeWidth="5"
                    stroke="currentColor"
                    className="text-zinc-200 dark:text-zinc-800"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="34"
                    strokeWidth="5"
                    strokeDasharray={2 * Math.PI * 34}
                    initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - progressPercent / 100) }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    strokeLinecap="round"
                    stroke="currentColor"
                    className="text-amber-500"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Tracked</span>
                  <span className="text-sm font-mono font-black text-zinc-900 dark:text-zinc-50 leading-none">{progressPercent}%</span>
                </div>
              </div>

              {/* Progress summary stats */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Total Accomplished</span>
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
                  {activeProgress.completedAssignmentIds.length} / {totalPlanAssignmentsCount} Chapters
                </span>
                {progressPercent === 100 && (
                  <span className="text-[9px] font-black uppercase tracking-widest bg-amber-500 text-zinc-950 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <Award className="w-3 h-3" /> Certified Reader
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. MODAL: PLANS BROWSER & SELECTOR */}
      {showPlansSelectorModal && (
        <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-3xl h-[80vh] shadow-2xl flex flex-col overflow-hidden text-zinc-900 dark:text-zinc-100">
            
            {/* Modal header */}
            <div className="p-5 sm:p-6 border-b border-zinc-150 dark:border-zinc-800 flex items-center justify-between shrink-0 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500 text-zinc-950 rounded-xl">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-black tracking-tight">
                    Explore Scriptural Habit Plans
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Choose from curated programs of the scriptures to structure your daily exploration.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPlansSelectorModal(false)}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-250 transition"
              >
                ✕
              </button>
            </div>

            {/* Filter tab bar */}
            <div className="px-5 py-3 border-b border-zinc-100 dark:border-zinc-850 flex gap-1.5 overflow-x-auto bg-zinc-50 dark:bg-zinc-950/30 select-none pb-3 sm:pb-3 shrink-0">
              {(['all', 'Gospels', 'Poetry & Advice', 'Epistles', 'Prophets'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedPlanTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                    selectedPlanTab === tab
                      ? 'bg-amber-550 text-zinc-950 font-bold shadow-sm'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  {tab === 'all' ? 'All Plans' : tab}
                </button>
              ))}
            </div>

            {/* Models list block viewport */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPlans.map(plan => {
                  const isActive = activeProgress?.planId === plan.id;
                  const totalChapters = plan.days.reduce((acc, d) => acc + d.assignments.length, 0);
                  
                  return (
                    <div
                      key={plan.id}
                      className={`p-5 rounded-2xl border transition flex flex-col justify-between ${
                        isActive 
                          ? 'bg-amber-550/10 dark:bg-amber-500/10 border-amber-550 shadow-sm' 
                          : 'bg-white dark:bg-zinc-900 border-zinc-150 dark:border-zinc-850 hover:border-amber-550/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                              {getPlanIcon(plan.icon, "w-4.5 h-4.5")}
                            </div>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase">{plan.category}</span>
                          </div>
                          <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            plan.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                            plan.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'
                          }`}>
                            {plan.difficulty}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                          {plan.title}
                        </h4>
                        
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                          {plan.description}
                        </p>

                        <div className="flex items-center gap-4 mt-4 text-[10px] font-mono text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" />
                            {plan.durationDays} Days Duration
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                            {totalChapters} Chapters
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between">
                        {isActive ? (
                          <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 font-bold px-2.5 py-1 rounded-lg">
                            ✓ Currently Active Plan
                          </span>
                        ) : (
                          <span className="text-[10px] text-zinc-400">
                            Builds reading streak
                          </span>
                        )}

                        <button
                          onClick={() => handleStartPlan(plan)}
                          className={`px-3.5 py-1.5 font-bold text-xs rounded-xl transition cursor-pointer ${
                            isActive
                              ? 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-300'
                              : 'bg-amber-550 hover:bg-amber-500 text-zinc-950 font-bold shadow-sm'
                          }`}
                        >
                          {isActive ? 'Restart Plan' : 'Activate Plan'}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal footer information */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-150 dark:border-zinc-800 text-center shrink-0 flex items-center justify-center gap-2">
              <Info className="w-3.5 h-3.5 text-amber-500" />
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-sans">
                Ticking an assignment marks that specific chapter as finished. Progress is fully cached locally on your device.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
