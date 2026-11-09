/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { Verse } from '../types';
import { TRANSLATIONS } from '../translations';
import { STORAGE_KEYS } from '../constants';
import { getVerses } from '../bibleLoader';
import { usePersistedBooleanState, usePersistedJSONState, usePersistedStringState } from './usePersistedState';

/**
 * Manages translation comparison state and loading.
 *
 * Handles:
 * - Comparison mode toggle
 * - Translation selection (up to 3 additional translations)
 * - Layout switching (side-by-side vs interlinear)
 * - Verse filtering for selective comparison
 * - Loading comparison verses in parallel
 */
export function useComparison(selectedBookId: string, selectedBookName: string, selectedChapter: number, primaryTranslation: string) {
  const [isComparing, setIsComparing] = usePersistedBooleanState(STORAGE_KEYS.IS_COMPARING, false);
  const [compareTranslations, setCompareTranslations] = usePersistedJSONState<string[]>(
    STORAGE_KEYS.COMPARE_TRANSLATIONS,
    ['kjv']
  );
  const [compareLayout, setCompareLayout] = usePersistedStringState(
    STORAGE_KEYS.COMPARE_LAYOUT,
    'side-by-side'
  ) as ['side-by-side' | 'interlinear', (v: string) => void];

  const [compareVersesMap, setCompareVersesMap] = useState<Record<string, Verse[]>>({});
  const [compareLoadingMap, setCompareLoadingMap] = useState<Record<string, boolean>>({});
  const [compareErrorMap, setCompareErrorMap] = useState<Record<string, string | null>>({});
  const [compareVerseFilter, setCompareVerseFilter] = useState<number[] | null>(null);

  // Load comparison translations when comparing
  useEffect(() => {
    if (!isComparing) {
      setCompareVersesMap({});
      setCompareErrorMap({});
      return;
    }

    compareTranslations.forEach(transId => {
      setCompareLoadingMap(prev => ({ ...prev, [transId]: true }));
      setCompareErrorMap(prev => ({ ...prev, [transId]: null }));

      getVerses(transId, selectedBookId, selectedBookName, selectedChapter)
        .then(result => {
          if (result && result.length > 0) {
            setCompareVersesMap(prev => ({ ...prev, [transId]: result }));
          } else {
            setCompareErrorMap(prev => ({ ...prev, [transId]: 'Not available in this translation.' }));
          }
        })
        .catch(() => {
          setCompareErrorMap(prev => ({ ...prev, [transId]: 'Could not load comparison translation.' }));
        })
        .finally(() => {
          setCompareLoadingMap(prev => ({ ...prev, [transId]: false }));
        });
    });
  }, [selectedBookId, selectedBookName, selectedChapter, compareTranslations, isComparing]);

  const handleCompareSelectedVerses = useCallback((selectedVerses: Verse[]) => {
    if (selectedVerses.length === 0) return;
    setCompareVerseFilter(selectedVerses.map(v => v.verse));
    setIsComparing(true);
  }, [setIsComparing]);

  const handleAddComparisonTranslation = useCallback(() => {
    const usedIds = new Set([primaryTranslation, ...compareTranslations]);
    const next = TRANSLATIONS.find(t => !usedIds.has(t.id));
    if (next) setCompareTranslations(prev => [...prev, next.id]);
  }, [primaryTranslation, compareTranslations, setCompareTranslations]);

  const handleRemoveComparisonTranslation = useCallback((idx: number) => {
    setCompareTranslations(prev => prev.filter((_, i) => i !== idx));
  }, [setCompareTranslations]);

  const handleCloseComparison = useCallback(() => {
    setIsComparing(false);
    setCompareVerseFilter(null);
  }, [setIsComparing]);

  return {
    isComparing,
    setIsComparing,
    compareTranslations,
    setCompareTranslations,
    compareLayout,
    setCompareLayout,
    compareVersesMap,
    compareLoadingMap,
    compareErrorMap,
    compareVerseFilter,
    setCompareVerseFilter,
    handleCompareSelectedVerses,
    handleAddComparisonTranslation,
    handleRemoveComparisonTranslation,
    handleCloseComparison,
  };
}
