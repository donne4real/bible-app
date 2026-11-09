/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect } from 'react';
import { ReaderSettings } from '../types';
import { STORAGE_KEYS } from '../constants';
import { usePersistedJSONState } from './usePersistedState';

/**
 * Manages reader settings with localStorage persistence and theme helpers.
 *
 * Provides:
 * - Settings state (translation, font, theme, etc.)
 * - Auto-switch theme based on system preference
 * - CSS class helpers for rendering
 */
export function useSettings() {
  const [settings, setSettings] = usePersistedJSONState<ReaderSettings>(
    STORAGE_KEYS.READER_SETTINGS,
    {
      translation: 'web',
      fontSize: 'lg',
      fontFamily: 'serif',
      lineHeight: 'relaxed',
      zenMode: false,
      theme: typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'sepia',
    }
  );

  // Auto-switch theme when system preference changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (!mq) return;
    const handler = (e: MediaQueryListEvent) => {
      setSettings(prev => {
        if (prev.theme === 'dark' || prev.theme === 'sepia') {
          return { ...prev, theme: e.matches ? 'dark' : 'sepia' };
        }
        return prev;
      });
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [setSettings]);

  const handleUpdateSettings = useCallback((updates: Partial<ReaderSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, [setSettings]);

  // CSS class helpers
  const getBodyFontFamilyClass = useCallback(() => {
    switch (settings.fontFamily) {
      case 'serif': return 'font-serif tracking-normal';
      case 'mono': return 'font-mono tracking-tight';
      case 'literata': return 'font-literata tracking-normal';
      case 'merriweather': return 'font-merriweather tracking-normal';
      case 'noto-serif': return 'font-noto-serif tracking-normal';
      default: return 'font-sans tracking-tight';
    }
  }, [settings.fontFamily]);

  const getFontSizeClass = useCallback(() => {
    switch (settings.fontSize) {
      case 'sm': return 'text-sm';
      case 'md': return 'text-base';
      case 'xl': return 'text-xl';
      case '2xl': return 'text-2xl';
      case '3xl': return 'text-3xl';
      default: return 'text-lg';
    }
  }, [settings.fontSize]);

  const getLineHeightClass = useCallback(() => {
    switch (settings.lineHeight) {
      case 'tight': return 'leading-snug space-y-3';
      case 'normal': return 'leading-normal space-y-4';
      case 'loose': return 'leading-loose space-y-7';
      default: return 'leading-relaxed space-y-5';
    }
  }, [settings.lineHeight]);

  const getThemeContainerClass = useCallback(() => {
    switch (settings.theme) {
      case 'light': return 'bg-[#FAFAFA] text-zinc-900 border-zinc-200';
      case 'dark': return 'bg-[#1C1C24] text-zinc-200 border-zinc-900';
      case 'charcoal': return 'bg-[#0B0B0E] text-zinc-400 border-zinc-950';
      default: return 'bg-[#F4ECD8] text-[#362719] border-[#E5DAC3]';
    }
  }, [settings.theme]);

  const getThemeOuterClass = useCallback(() => {
    switch (settings.theme) {
      case 'light': return 'bg-zinc-100 min-h-screen';
      case 'dark': return 'bg-zinc-950 min-h-screen';
      case 'charcoal': return 'bg-[#000000] min-h-screen';
      default: return 'bg-[#EADFCA] min-h-screen';
    }
  }, [settings.theme]);

  return {
    settings,
    setSettings,
    handleUpdateSettings,
    getBodyFontFamilyClass,
    getFontSizeClass,
    getLineHeightClass,
    getThemeContainerClass,
    getThemeOuterClass,
  };
}
