/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sliders } from 'lucide-react';
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
    <div className="absolute right-0 top-12 z-40 w-72 max-h-[85vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xl font-sans text-sm animate-fade-in">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-3.5">
        <span className="font-sans font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-amber-500" />
          Display Settings
        </span>
        <button onClick={onClose} className="text-xs font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">Done</button>
      </div>

      {/* Font family */}
      <div className="mb-4">
        <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">Typography Font</label>
        <div className="grid grid-cols-2 gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg">
          {([
            { id: 'serif', label: 'Serif', preview: 'Playfair' },
            { id: 'sans', label: 'Sans', preview: 'Inter' },
            { id: 'literata', label: 'Literata', preview: 'Reading' },
            { id: 'merriweather', label: 'Merriweather', preview: 'Classic' },
            { id: 'noto-serif', label: 'Noto Serif', preview: 'Global' },
            { id: 'mono', label: 'Mono', preview: 'JetBrains' },
          ] as const).map(f => (
            <button key={f.id} onClick={() => onUpdateSettings({ fontFamily: f.id as any })} className={`py-1.5 px-2 rounded-md text-[11px] font-medium transition text-left ${settings.fontFamily === f.id ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>
              <span className="block leading-tight">{f.label}</span>
              <span className="block text-[9px] opacity-50">{f.preview}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font size */}
      <div className="mb-4">
        <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">Text Size</label>
        <div className="flex items-center justify-between gap-1 p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          {(['sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map(sz => (
            <button key={sz} onClick={() => onUpdateSettings({ fontSize: sz })} className={`flex-1 py-1 text-xs rounded-md font-sans transition capitalize ${settings.fontSize === sz ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-sm font-bold' : 'text-zinc-400 hover:text-zinc-600'}`}>{sz}</button>
          ))}
        </div>
      </div>

      {/* Color theme */}
      <div className="mb-4">
        <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">Color Theme</label>
        <div className="grid grid-cols-4 gap-1.5 p-0.5">
          {[
            { id: 'light',    label: 'Light',  bg: '#FAFAFA', text: '#18181b', border: '#e4e4e7' },
            { id: 'sepia',    label: 'Sepia',  bg: '#F4ECD8', text: '#433422', border: '#EADFC9' },
            { id: 'dark',     label: 'Dark',   bg: '#1E1E24', text: '#d4d4d8', border: '#3f3f46' },
            { id: 'charcoal', label: 'OLED',   bg: '#0A0A0C', text: '#a1a1aa', border: '#18181b' },
          ].map(t => (
            <button key={t.id} onClick={() => onUpdateSettings({ theme: t.id as any })} style={{ background: t.bg, color: t.text, borderColor: t.border }} className={`aspect-video rounded-lg border text-xs font-semibold flex items-center justify-center transition ${settings.theme === t.id ? 'ring-2 ring-amber-500' : 'hover:scale-105'}`} title={t.label}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Line spacing */}
      <div className="mb-4">
        <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-1.5">Line Spacing</label>
        <div className="grid grid-cols-4 gap-1 p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          {(['tight', 'normal', 'relaxed', 'loose'] as const).map(lh => (
            <button key={lh} onClick={() => onUpdateSettings({ lineHeight: lh })} className={`py-1 rounded text-[11px] font-medium capitalize transition ${settings.lineHeight === lh ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>{lh}</button>
          ))}
        </div>
      </div>

      {/* Zen mode */}
      <div>
        <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-1.5">Reading Mode</label>
        <button
          onClick={() => { onUpdateSettings({ zenMode: true }); onClose(); }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition text-left"
        >
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">Enter Zen Mode</span>
          <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Distraction-free</span>
        </button>
      </div>
    </div>
  );
}
