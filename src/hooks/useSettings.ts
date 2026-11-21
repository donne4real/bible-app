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
      dyslexicMode: false,
      highContrast: false,
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
    if (settings.dyslexicMode) return 'font-sans tracking-wide';
    switch (settings.fontFamily) {
      case 'serif': return 'font-serif tracking-normal';
      case 'mono': return 'font-mono tracking-tight';
      case 'literata': return 'font-literata tracking-normal';
      case 'merriweather': return 'font-merriweather tracking-normal';
      case 'noto-serif': return 'font-noto-serif tracking-normal';
      case 'source-serif': return 'font-source-serif tracking-normal';
      case 'crimson': return 'font-crimson tracking-normal';
      case 'eb-garamond': return 'font-eb-garamond tracking-normal';
      case 'lora': return 'font-lora tracking-normal';
      case 'vollkorn': return 'font-vollkorn tracking-normal';
      case 'spectral': return 'font-spectral tracking-normal';
      default: return 'font-sans tracking-tight';
    }
  }, [settings.fontFamily, settings.dyslexicMode]);

  const getFontSizeClass = useCallback(() => {
    switch (settings.fontSize) {
      case 'sm': return 'text-sm';
      case 'md': return 'text-base';
      case 'xl': return 'text-xl';
      case '2xl': return 'text-2xl';
      case '3xl': return 'text-3xl';
      case '4xl': return 'text-4xl';
      case '5xl': return 'text-5xl';
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
    if (settings.highContrast) {
      return settings.theme === 'dark' || settings.theme === 'charcoal'
        ? 'bg-black text-white border-white'
        : 'bg-white text-black border-black';
    }
    switch (settings.theme) {
      case 'light': return 'bg-[#FAFAFA] text-zinc-900 border-zinc-200';
      case 'dark': return 'bg-[#1C1C24] text-zinc-200 border-zinc-900';
      case 'charcoal': return 'bg-[#0B0B0E] text-zinc-400 border-zinc-950';
      default: return 'bg-[#F4ECD8] text-[#362719] border-[#E5DAC3]';
    }
  }, [settings.theme, settings.highContrast]);

  const getThemeOuterClass = useCallback(() => {
    if (settings.highContrast) {
      return settings.theme === 'dark' || settings.theme === 'charcoal'
        ? 'bg-black min-h-screen'
        : 'bg-white min-h-screen';
    }
    switch (settings.theme) {
      case 'light': return 'bg-zinc-100 min-h-screen';
      case 'dark': return 'bg-zinc-950 min-h-screen';
      case 'charcoal': return 'bg-[#000000] min-h-screen';
      default: return 'bg-[#EADFCA] min-h-screen';
    }
  }, [settings.theme, settings.highContrast]);

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
