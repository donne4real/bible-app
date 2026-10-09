/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Globe, 
  Users, 
  MapPin, 
  BookOpen, 
  Check, 
  Languages,
  BookMarked
} from 'lucide-react';
import { LANGUAGES_REGISTRY, LanguageInfo } from '../languagesData';
import { motion, AnimatePresence } from 'motion/react';

interface LanguagesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTranslation: string;
  onSelectTranslation: (id: string) => void;
  availableIds?: string[];
}

export default function LanguagesGuideModal({
  isOpen,
  onClose,
  activeTranslation,
  onSelectTranslation,
  availableIds,
}: LanguagesGuideModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageInfo | null>(null);

  // Derive unique regions for tab filter
  const regions = useMemo(() => {
    const list = new Set<string>();
    LANGUAGES_REGISTRY.forEach(lang => {
      if (lang.region.includes('Africa')) {
        list.add(lang.region);
      }
    });
    return ['all', 'Global standard', ...Array.from(list)];
  }, []);

  // Filtered languages list
  const filteredLanguages = useMemo(() => {
    return LANGUAGES_REGISTRY.filter(lang => {
      const matchSearch = 
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.short.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.translationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.abbreviationExplanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.majorCountries.toLowerCase().includes(searchTerm.toLowerCase());

      const matchRegion = 
        selectedRegion === 'all' || 
        lang.region.toLowerCase().includes(selectedRegion.toLowerCase());

      return matchSearch && matchRegion;
    });
  }, [searchTerm, selectedRegion]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-4xl h-[85vh] shadow-2xl flex flex-col overflow-hidden text-zinc-900 dark:text-zinc-100"
      >
        {/* Banner/Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500/10 via-amber-550/5 to-transparent border-b border-zinc-150 dark:border-zinc-800 flex items-start justify-between shrink-0">
          <div className="flex gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-zinc-950 hidden sm:block">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                Languages & Translation Abbreviation Guide
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Detailed breakdowns of official Bible abbreviations, regional dialects, and native classifications.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls Bar */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-150 dark:border-zinc-850 flex flex-col md:flex-row gap-3 items-center shrink-0">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search code, language, speaker, etc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-zinc-90 w-full pl-9 pr-8 py-2 rounded-xl border border-zinc-250 dark:border-zinc-805 text-xs outline-none focus:ring-1 focus:ring-amber-550 focus:border-amber-550 font-sans text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650 text-xs py-0.5 px-1 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none font-sans select-none">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => { setSelectedRegion(region); setSelectedLanguage(null); }}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                  selectedRegion === region 
                    ? 'bg-amber-550 text-zinc-950 shadow-sm'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600 dark:bg-zinc-850 dark:hover:bg-zinc-800 dark:text-zinc-300'
                }`}
              >
                {region === 'all' ? 'All Areas' : region.replace(' standard', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body Pane split */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0 bg-zinc-50/10 dark:bg-zinc-950/20">
          
          {/* Left Block: List of Languages & Codes */}
          <div className={`flex-1 overflow-y-auto p-4 md:p-5 border-r border-zinc-150 dark:border-zinc-850 ${selectedLanguage ? 'hidden lg:block lg:max-w-md xl:max-w-lg' : ''}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {filteredLanguages.map(lang => {
                const isActive = lang.id === activeTranslation;
                const isSelected = selectedLanguage?.id === lang.id;
                
                return (
                  <div
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition flex justify-between items-start group ${
                      isSelected 
                        ? 'bg-amber-550/10 dark:bg-amber-500/10 border-amber-550 shadow-sm' 
                        : 'bg-white dark:bg-zinc-900 border-zinc-150 dark:border-zinc-850 hover:border-amber-550/30 hover:bg-zinc-50 dark:hover:bg-zinc-850/60'
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black tracking-widest px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-amber-550 group-hover:text-zinc-950 transition">
                          {lang.short}
                        </span>
                        <div className="flex items-center gap-1">
                          <h4 className="font-sans font-bold text-xs truncate text-zinc-900 dark:text-zinc-100">
                            {lang.name}
                          </h4>
                          <span className="text-[10px] font-mono opacity-50">({lang.nativeName})</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-1 font-sans">
                        {lang.abbreviationExplanation}
                      </p>

                      <div className="flex flex-wrap gap-x-2.5 gap-y-1 mt-2.5">
                        <span className="text-[9px] font-mono text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          {lang.region}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-400 flex items-center gap-1">
                          <Users className="w-2.5 h-2.5" />
                          {lang.speakers}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0 self-center">
                      {isActive && (
                        <span className="text-[8px] font-bold bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-450 px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-0.5 font-sans border border-emerald-500/20">
                          <Check className="w-2.5 h-2.5" />
                          Active
                        </span>
                      )}
                      <span className="text-[9px] font-bold text-amber-550 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-x-1 transition font-sans">
                        Details →
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredLanguages.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-2xl">
                  <Globe className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
                  <p className="text-xs font-bold text-zinc-500">No matching language translations</p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 max-w-xs mx-auto">
                    Try searching for different abbreviations or regions (e.g. TWI, SWA, West Africa, Zulu).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Block: Selected Details Sheet */}
          <div className={`flex-1 overflow-y-auto p-5 md:p-6 bg-white dark:bg-zinc-900 flex flex-col min-h-0 ${!selectedLanguage ? 'hidden lg:flex justify-center items-center text-zinc-400 opacity-60 text-center py-10' : ''}`}>
            {selectedLanguage ? (
              <div className="flex-1 flex flex-col justify-between h-full space-y-5">
                {/* Close sheet back helper for mobile/tablet screens */}
                <button
                  onClick={() => setSelectedLanguage(null)}
                  className="lg:hidden text-xs font-bold text-amber-550 flex items-center gap-1 mb-2 hover:underline"
                >
                  ← Back to List
                </button>

                {/* Main Content */}
                <div className="space-y-4">
                  {/* Badge Row */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] font-mono font-black py-0.5 px-2 rounded-md bg-amber-550 text-zinc-950 tracking-wider">
                      CODE: {selectedLanguage.short}
                    </span>
                    <span className="text-[9px] font-mono font-bold py-0.5 px-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                      {selectedLanguage.classification}
                    </span>
                  </div>

                  {/* Title block */}
                  <div>
                    <h3 className="text-2xl font-serif font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                      {selectedLanguage.name}
                    </h3>
                    <p className="text-sm italic text-zinc-500 mt-0.5">
                      Native Script: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{selectedLanguage.nativeName}</span> ({selectedLanguage.translationName})
                    </p>
                  </div>

                  {/* Long description explanation */}
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-150/60 dark:border-zinc-850/60">
                    <h5 className="text-[10px] font-mono uppercase font-black text-amber-600 dark:text-amber-400 tracking-wider mb-1.5 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> Description & Abbreviation Info
                    </h5>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {selectedLanguage.description}
                    </p>
                  </div>

                  {/* Scientific & demographic metadata grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-zinc-50/50 dark:bg-zinc-950/20 rounded-xl border border-zinc-100 dark:border-zinc-850">
                      <span className="text-[9px] font-mono uppercase text-zinc-400 block mb-0.5">Translation Code</span>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{selectedLanguage.abbreviationExplanation}</span>
                    </div>

                    <div className="p-3 bg-zinc-50/50 dark:bg-zinc-950/20 rounded-xl border border-zinc-100 dark:border-zinc-850">
                      <span className="text-[9px] font-mono uppercase text-zinc-400 block mb-0.5">Linguistic Family</span>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{selectedLanguage.family}</span>
                    </div>

                    <div className="p-3 bg-zinc-50/50 dark:bg-zinc-950/20 rounded-xl border border-zinc-100 dark:border-zinc-850">
                      <span className="text-[9px] font-mono uppercase text-zinc-400 block mb-0.5">Primary Location</span>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">{selectedLanguage.region}</span>
                    </div>

                    <div className="p-3 bg-zinc-50/50 dark:bg-zinc-950/20 rounded-xl border border-zinc-100 dark:border-zinc-850">
                      <span className="text-[9px] font-mono uppercase text-zinc-400 block mb-0.5">Representative Size</span>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{selectedLanguage.speakers} speakers</span>
                    </div>
                  </div>

                  {/* Geographics scope */}
                  <div className="p-3 rounded-xl border border-zinc-150 dark:border-zinc-850">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase block mb-1">Major Countries where spoken</span>
                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{selectedLanguage.majorCountries}</p>
                  </div>
                </div>

                {/* Action button bar */}
                <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800 flex gap-2">
                  {(() => {
                    const isAvailable = !availableIds || availableIds.includes(selectedLanguage.id);
                    return (
                      <button
                        onClick={() => { if (isAvailable) { onSelectTranslation(selectedLanguage.id); onClose(); } }}
                        disabled={!isAvailable}
                        className={`flex-1 py-3 font-sans font-bold text-xs rounded-2xl transition flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] ${
                          isAvailable
                            ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 cursor-pointer'
                            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
                        }`}
                        title={isAvailable ? undefined : 'This translation is not available in the current build'}
                      >
                        <BookMarked className="w-4 h-4" />
                        {isAvailable
                          ? `Select & Read ${selectedLanguage.name} (${selectedLanguage.id.toUpperCase()})`
                          : `${selectedLanguage.name} — Not Available`}
                      </button>
                    );
                  })()}
                </div>
              </div>
            ) : (
              <div className="space-y-3 font-sans select-none text-center">
                <Languages className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto" />
                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Select a Language version</h4>
                <p className="text-xs text-zinc-405 dark:text-zinc-400 max-w-xs leading-relaxed">
                  Click on any translation from the left list to view precise dialects details, speaker demography, and abbreviation definitions.
                </p>
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
