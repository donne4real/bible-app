/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Copy, Share2, Check, AlignLeft, AlignCenter, AlignRight, Type, Sparkles } from 'lucide-react';
import { Verse } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVerses: Verse[];
  translation: string;
}

const PRESET_BACKGROUNDS = [
  { name: 'Warm Sunset', css: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', start: '#FF6B6B', end: '#FF8E53', text: '#FFFFFF' },
  { name: 'Midnight', css: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)', start: '#0F2027', end: '#2C5364', text: '#F8FAFC' },
  { name: 'Forest Mist', css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', start: '#11998e', end: '#38ef7d', text: '#FFFFFF' },
  { name: 'Lavender Dream', css: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', start: '#a18cd1', end: '#fbc2eb', text: '#1E293B' },
  { name: 'Golden Hour', css: 'linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)', start: '#F2994A', end: '#F2C94C', text: '#1E1B4B' },
  { name: 'Classic Charcoal', css: 'linear-gradient(135deg, #141E30 0%, #243B55 100%)', start: '#141E30', end: '#243B55', text: '#F8FAFC' },
  { name: 'Royal Velvet', css: 'linear-gradient(135deg, #3A1C71 0%, #D76D77 50%, #FFAF7B 100%)', start: '#3A1C71', end: '#FFAF7B', text: '#FFFFFF' },
  { name: 'Nordic Snow', css: 'linear-gradient(135deg, #F3F4F6 0%, #E2E8F0 100%)', start: '#F8FAFC', end: '#E2E8F0', text: '#0F172A' },
];

export default function ShareCardModal({ isOpen, onClose, selectedVerses, translation }: ShareCardModalProps) {
  const [bgIndex, setBgIndex] = useState(0);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [textAlignment, setTextAlignment] = useState<'left' | 'center' | 'right'>('center');
  const [fontSize, setFontSize] = useState<number>(20);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen || selectedVerses.length === 0) return null;

  const currentBg = PRESET_BACKGROUNDS[bgIndex];

  // Helper to format full verse text for copying
  const bookName = selectedVerses[0]?.book_name || '';
  const chapterNum = selectedVerses[0]?.chapter || 1;
  const verseNumbers = selectedVerses.map(v => v.verse).sort((a,b)=>a-b);
  const verseRef = `${bookName} ${chapterNum}:${verseNumbers.join(',')}`;
  
  const combineScriptureText = () => {
    return selectedVerses
      .map(v => `[${v.verse}] ${v.text.trim()}`)
      .join(' ');
  };

  const getFullCopyText = () => {
    return `“${combineScriptureText()}”\n\n— ${verseRef} (${translation.toUpperCase()})`;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(getFullCopyText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  // HTML5 Canvas Drawer for bulletproof offline dynamic download of the designed card
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-resolution size (1080x1080 square for Instagram)
    const size = 1080;
    canvas.width = size;
    canvas.height = size;

    // Draw background Gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, currentBg.start);
    gradient.addColorStop(1, currentBg.end);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Apply Overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, size, size);

    // Dynamic Fonts depending on font family selection
    let systemFont = 'sans-serif';
    if (fontFamily === 'serif') systemFont = '"Playfair Display", Georgia, "Times New Roman", serif';
    else if (fontFamily === 'mono') systemFont = '"JetBrains Mono", Courier, monospace';
    else systemFont = '"Inter", Helvetica, Arial, sans-serif';

    // Draw Quote Mark
    ctx.fillStyle = currentBg.text;
    ctx.globalAlpha = 0.15;
    ctx.font = 'bold 160px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('“', size / 2, size * 0.22);
    ctx.globalAlpha = 1.0;

    // Word wrapping and drawing text
    ctx.fillStyle = currentBg.text;
    ctx.textAlign = textAlignment;
    const paddingX = size * 0.12;
    const maxTextWidth = size - (paddingX * 2);
    
    // Scale the selected font size up for the high-res 1080px canvas
    const calculatedFontSize = Math.floor(fontSize * 1.8);
    ctx.font = `500 ${calculatedFontSize}px ${systemFont}`;

    const rawText = combineScriptureText();
    const words = rawText.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTextWidth && i > 0) {
        lines.push(currentLine.trim());
        currentLine = words[i] + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());

    // Calculate vertical alignment
    const lineSpacingMultiplier = 1.5;
    const lineHeight = calculatedFontSize * lineSpacingMultiplier;
    const totalTextHeight = lines.length * lineHeight;
    let startY = (size / 2) - (totalTextHeight / 2) + 20;

    // Draw actual text lines
    ctx.font = `italic 500 ${calculatedFontSize}px ${systemFont}`;
    const xCoord = textAlignment === 'center' ? size / 2 : textAlignment === 'right' ? size - paddingX : paddingX;

    lines.forEach(line => {
      ctx.fillText(line, xCoord, startY);
      startY += lineHeight;
    });

    // Draw Separator line
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.moveTo(size * 0.45, startY + 25);
    ctx.lineTo(size * 0.55, startY + 25);
    ctx.lineWidth = 2;
    ctx.strokeStyle = currentBg.text;
    ctx.stroke();
    ctx.globalAlpha = 1.0;

    // Draw Scripture reference
    ctx.font = `bold ${Math.floor(calculatedFontSize * 0.75)}px ${systemFont}`;
    ctx.fillText(`${verseRef} (${translation.toUpperCase()})`, size / 2, startY + 80);

    // Draw branding tag at the tail water-mark
    ctx.globalAlpha = 0.45;
    ctx.font = `400 24px "JetBrains Mono", sans-serif`;
    ctx.fillText('Bible Reader • Share truth in elegant design', size / 2, size - 70);

    // Save image trigger
    const imageURI = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.download = `${verseRef.replace(/[:\s,]+/g, '_')}_card.png`;
    downloadLink.href = imageURI;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      setSharing(true);
      try {
        await navigator.share({
          title: `Scripture Reflection: ${verseRef}`,
          text: getFullCopyText(),
        });
      } catch (err) {
        console.warn('Native share failed or dismissed.', err);
      } finally {
        setSharing(false);
      }
    } else {
      // Fallback
      handleCopyText();
    }
  };

  return (
    <AnimatePresence>
      <div id="share-card-overlay" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Hidden high-res canvas */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-4xl max-h-[85vh] md:max-h-[90vh] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-zinc-200 dark:border-zinc-800"
        >
          {/* Card Preview Area */}
          <div className="flex-1 p-6 md:p-8 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800">
            <div 
              id="share-card-preview"
              className="w-full max-w-xs aspect-square rounded-xl shadow-xl flex flex-col justify-between p-6 overflow-hidden relative"
              style={{ background: currentBg.css, color: currentBg.text }}
            >
              {/* Subtle top quotation accent */}
              <div 
                className="text-6xl font-serif text-center select-none" 
                style={{ color: currentBg.text, opacity: 0.15 }}
              >
                “
              </div>

              {/* Main Verse Core */}
              <div className="flex-1 flex flex-col justify-center my-2">
                <p 
                  className={`line-clamp-6 text-sm font-medium tracking-tight ${
                    fontFamily === 'serif' ? 'font-serif italic' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'
                  }`}
                  style={{ 
                    textAlign: textAlignment, 
                    fontSize: `${fontSize}px`, 
                    lineHeight: '1.45'
                  }}
                >
                  {combineScriptureText()}
                </p>
              </div>

              {/* Card Footer Reference Info */}
              <div className="border-t border-current/20 pt-3 text-center">
                <p 
                  className={`text-xs font-bold leading-none ${
                    fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'
                  }`}
                >
                  {verseRef}
                </p>
                <p className="text-[9px] uppercase tracking-wider opacity-60 mt-1 font-mono">
                  {translation.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Designer Controls Area */}
          <div className="w-full md:w-80 p-6 flex flex-col justify-between h-[50vh] md:h-auto overflow-y-auto bg-white dark:bg-zinc-900">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h3 className="font-sans font-medium text-zinc-900 dark:text-zinc-100">Card Designer</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Background presets picker */}
              <div className="mb-5">
                <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">
                  Background Concept
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_BACKGROUNDS.map((bg, idx) => (
                    <button
                      key={bg.name}
                      onClick={() => setBgIndex(idx)}
                      style={{ background: bg.css }}
                      className={`h-9 w-full rounded-lg border flex items-center justify-center transition-transform active:scale-95 ${
                        bgIndex === idx ? 'border-amber-500 ring-2 ring-amber-500/20 scale-102 font-bold' : 'border-black/5 dark:border-white/5'
                      }`}
                      title={bg.name}
                    >
                      {bgIndex === idx && (
                        <Check className="w-3.5 h-3.5" style={{ color: bg.text }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography selectors */}
              <div className="mb-5">
                <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">
                  Font Family
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <button
                    onClick={() => setFontFamily('serif')}
                    className={`py-1.5 text-xs font-serif rounded-md transition-colors ${
                      fontFamily === 'serif' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    Serif
                  </button>
                  <button
                    onClick={() => setFontFamily('sans')}
                    className={`py-1.5 text-xs font-sans rounded-md transition-colors ${
                      fontFamily === 'sans' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    Sans
                  </button>
                  <button
                    onClick={() => setFontFamily('mono')}
                    className={`py-1.5 text-xs font-mono rounded-md transition-colors ${
                      fontFamily === 'mono' ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    Mono
                  </button>
                </div>
              </div>

              {/* Sizing & Align controls */}
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-1">
                    Text Scale
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="28"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-1 text-center">
                    Align
                  </label>
                  <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg">
                    <button
                      onClick={() => setTextAlignment('left')}
                      className={`p-1 rounded-md ${
                        textAlignment === 'left' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white' : 'text-zinc-400'
                      }`}
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setTextAlignment('center')}
                      className={`p-1 rounded-md ${
                        textAlignment === 'center' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white' : 'text-zinc-400'
                      }`}
                    >
                      <AlignCenter className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setTextAlignment('right')}
                      className={`p-1 rounded-md ${
                        textAlignment === 'right' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white' : 'text-zinc-400'
                      }`}
                    >
                      <AlignRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="space-y-2 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-850">
              <button
                onClick={handleDownload}
                className="w-full bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 text-white rounded-xl py-2.5 px-4 font-sans text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-white active:scale-98 transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Graphic Card
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopyText}
                  className="bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 px-3 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 flex items-center justify-center gap-1.5 transition active:scale-98"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Text
                    </>
                  )}
                </button>

                <button
                  onClick={handleShareNative}
                  className="bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-xl py-2 px-3 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 flex items-center justify-center gap-1.5 transition active:scale-98"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {navigator.share ? 'System Share' : 'Copy Slate'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
