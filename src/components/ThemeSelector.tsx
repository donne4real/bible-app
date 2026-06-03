/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Type, Moon, Sun, Minimize2, Sparkles, Sliders } from 'lucide-react';
import { ReaderSettings } from '../types';

interface ThemeSelectorProps {
  settings: ReaderSettings;
  onUpdateSettings: (updates: Partial<ReaderSettings>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeSelector({ settings, onUpdateSettings, isOpen, onClose }: ThemeSelectorProps) {
  if (!isOpen) return null;

  return (
    <div id="theme-configuration-popup" className="absolute right-0 top-12 z-40 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4.5 shadow-xl font-sans text-sm animate-fade-in">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-3.5">
        <span className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-amber-500" />
          Display Settings
        </span>
        <button 
          onClick={onClose}
          className="text-xs font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
        >
          Done
        </button>
      </div>

      {/* Translations selector */}
      <div className="mb-4">
        <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">
          Typography Font
        </label>
        <div className="grid grid-cols-3 gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg">
          <button
            onClick={() => onUpdateSettings({ fontFamily: 'serif' })}
            className={`py-1 rounded-md text-[11px] font-medium transition ${
              settings.fontFamily === 'serif' ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-sm' : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Serif
          </button>
          <button
            onClick={() => onUpdateSettings({ fontFamily: 'sans' })}
            className={`py-1 rounded-md text-[11px] font-medium transition ${
              settings.fontFamily === 'sans' ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-sm' : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Sans
          </button>
          <button
            onClick={() => onUpdateSettings({ fontFamily: 'mono' })}
            className={`py-1 rounded-md text-[11px] font-medium transition ${
              settings.fontFamily === 'mono' ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-sm' : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Mono
          </button>
        </div>
      </div>

      {/* Font Size adjustments */}
      <div className="mb-4">
        <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">
          Text Size
        </label>
        <div className="flex items-center justify-between gap-1 p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          {(['sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map((sz) => (
            <button
              key={sz}
              onClick={() => onUpdateSettings({ fontSize: sz })}
              className={`flex-1 py-1 text-xs rounded-md font-sans transition capitalize ${
                settings.fontSize === sz ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-sm font-bold' : 'text-zinc-400 hover:text-zinc-650'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Reading Background Theme */}
      <div className="mb-4">
        <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">
          Color Canvas Accent
        </label>
        <div className="grid grid-cols-4 gap-1.5 p-0.5">
          {/* Light */}
          <button
            onClick={() => onUpdateSettings({ theme: 'light' })}
            className={`aspect-video rounded-lg border text-xs font-semibold flex items-center justify-center transition border-zinc-200 bg-[#FAFAFA] text-zinc-800 ${
              settings.theme === 'light' ? 'ring-2 ring-amber-500' : 'hover:scale-102'
            }`}
            title="Light canvas"
          >
            Light
          </button>
          {/* Sepia (Great for reading) */}
          <button
            onClick={() => onUpdateSettings({ theme: 'sepia' })}
            className={`aspect-video rounded-lg border text-xs font-semibold flex items-center justify-center transition border-[#EADFC9] bg-[#F4ECD8] text-[#433422] ${
              settings.theme === 'sepia' ? 'ring-2 ring-amber-500' : 'hover:scale-102'
            }`}
            title="Sepia canvas"
          >
            Sepia
          </button>
          {/* Dark */}
          <button
            onClick={() => onUpdateSettings({ theme: 'dark' })}
            className={`aspect-video rounded-lg border text-xs font-semibold flex items-center justify-center transition border-zinc-800 bg-[#1E1E24] text-zinc-300 ${
              settings.theme === 'dark' ? 'ring-2 ring-amber-500' : 'hover:scale-102'
            }`}
            title="Muted Dark"
          >
            Dark
          </button>
          {/* Charcoal */}
          <button
            onClick={() => onUpdateSettings({ theme: 'charcoal' })}
            className={`aspect-video rounded-lg border text-xs font-semibold flex items-center justify-center transition border-zinc-950 bg-[#0A0A0C] text-zinc-400 ${
              settings.theme === 'charcoal' ? 'ring-2 ring-amber-500' : 'hover:scale-102'
            }`}
            title="OLED Charcoal"
          >
            OLED
          </button>
        </div>
      </div>

      {/* Line spacing adjustments */}
      <div className="mb-2">
        <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-1.5">
          Line Spacing
        </label>
        <div className="grid grid-cols-4 gap-1 p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          {(['tight', 'normal', 'relaxed', 'loose'] as const).map((lh) => (
            <button
              key={lh}
              onClick={() => onUpdateSettings({ lineHeight: lh })}
              className={`py-1 rounded text-[11px] font-medium capitalize transition ${
                settings.lineHeight === lh ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-650'
              }`}
            >
              {lh}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
