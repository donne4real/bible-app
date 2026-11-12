import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Share2, Palette, Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Verse } from '../types';
import { TRANSLATIONS } from '../translations';
import { motion, AnimatePresence } from 'motion/react';

interface VerseImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVerses: Verse[];
  translation: string;
}

interface Theme {
  id: string;
  name: string;
  background: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
}

const THEMES: Theme[] = [
  {
    id: 'classic',
    name: 'Classic',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    fontFamily: 'Georgia, serif',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    background: '#ffffff',
    textColor: '#1a1a1a',
    accentColor: '#667eea',
    fontFamily: 'system-ui, sans-serif',
  },
  {
    id: 'dark',
    name: 'Dark',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    fontFamily: 'Georgia, serif',
  },
  {
    id: 'nature',
    name: 'Nature',
    background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    fontFamily: 'Georgia, serif',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    background: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)',
    textColor: '#2d3748',
    accentColor: '#764ba2',
    fontFamily: 'Georgia, serif',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    background: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    fontFamily: 'Georgia, serif',
  },
  {
    id: 'warm',
    name: 'Warm',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    fontFamily: 'Georgia, serif',
  },
  {
    id: 'earth',
    name: 'Earth',
    background: 'linear-gradient(135deg, #8B7355 0%, #D2B48C 100%)',
    textColor: '#ffffff',
    accentColor: '#ffd700',
    fontFamily: 'Georgia, serif',
  },
];

export default function VerseImageModal({ isOpen, onClose, selectedVerses, translation }: VerseImageModalProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(THEMES[0]);
  const [fontSize, setFontSize] = useState(24);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [showReference, setShowReference] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const trans = TRANSLATIONS.find(t => t.id === translation);
  const transName = trans?.short || translation.toUpperCase();

  // Format verse text
  const verseText = selectedVerses
    .sort((a, b) => a.verse - b.verse)
    .map(v => v.text.trim())
    .join(' ');

  const reference = selectedVerses.length > 0
    ? `${selectedVerses[0].book_name} ${selectedVerses[0].chapter}:${
        selectedVerses.length === 1
          ? selectedVerses[0].verse
          : `${Math.min(...selectedVerses.map(v => v.verse))}-${Math.max(...selectedVerses.map(v => v.verse))}`
      }`
    : '';

  // Draw canvas
  useEffect(() => {
    if (!canvasRef.current || !isOpen) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (Instagram square format)
    canvas.width = 1080;
    canvas.height = 1080;

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const bgColors = selectedTheme.background.match(/#[a-fA-F0-9]{6}/g) || ['#667eea', '#764ba2'];
    gradient.addColorStop(0, bgColors[0]);
    gradient.addColorStop(1, bgColors[1] || bgColors[0]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.fillStyle = selectedTheme.textColor;
    ctx.font = `${fontSize * 2}px ${selectedTheme.fontFamily}`;
    ctx.textAlign = textAlign;
    ctx.textBaseline = 'middle';

    // Calculate text position
    const maxWidth = canvas.width * 0.8;
    const lineHeight = fontSize * 2.5;
    const x = textAlign === 'left' ? canvas.width * 0.1 : textAlign === 'right' ? canvas.width * 0.9 : canvas.width / 2;
    
    // Wrap text
    const words = verseText.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    // Calculate total height
    const totalHeight = lines.length * lineHeight;
    const startY = showReference
      ? (canvas.height - totalHeight) / 2 - 40
      : (canvas.height - totalHeight) / 2;

    // Draw verse text
    lines.forEach((line, i) => {
      const y = startY + i * lineHeight;
      ctx.fillText(line, x, y);
    });

    // Draw reference
    if (showReference && reference) {
      ctx.font = `bold ${fontSize * 1.2}px ${selectedTheme.fontFamily}`;
      ctx.fillStyle = selectedTheme.accentColor;
      const refY = startY + totalHeight + lineHeight;
      ctx.fillText(reference, x, refY);

      // Draw translation
      ctx.font = `${fontSize * 0.8}px ${selectedTheme.fontFamily}`;
      ctx.fillStyle = selectedTheme.textColor;
      ctx.globalAlpha = 0.7;
      ctx.fillText(transName, x, refY + fontSize * 1.5);
      ctx.globalAlpha = 1;
    }
  }, [isOpen, selectedTheme, fontSize, textAlign, showReference, verseText, reference, transName]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `bible-verse-${reference.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], 'verse.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'Bible Verse',
            text: `${verseText}\n\n${reference} - ${transName}`,
          });
        } catch (err) {
          console.error('Share failed:', err);
        }
      } else {
        // Fallback: download the image
        handleDownload();
      }
    });
  };

  if (!isOpen || selectedVerses.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-serif font-bold flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Create Verse Image
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Preview */}
              <div className="flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  className="w-full max-w-md aspect-square rounded-xl shadow-lg"
                />
              </div>

              {/* Controls */}
              <div className="space-y-6">
                {/* Theme Selection */}
                <div>
                  <label className="text-sm font-bold mb-3 block">Theme</label>
                  <div className="grid grid-cols-4 gap-2">
                    {THEMES.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme)}
                        className={`aspect-square rounded-lg border-2 transition ${
                          selectedTheme.id === theme.id
                            ? 'border-amber-500 ring-2 ring-amber-500/50'
                            : 'border-zinc-200 dark:border-zinc-700'
                        }`}
                        style={{ background: theme.background }}
                        title={theme.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="text-sm font-bold mb-2 block flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="40"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Text Alignment */}
                <div>
                  <label className="text-sm font-bold mb-2 block">Alignment</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'left', icon: AlignLeft },
                      { value: 'center', icon: AlignCenter },
                      { value: 'right', icon: AlignRight },
                    ].map(({ value, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => setTextAlign(value as any)}
                        className={`flex-1 p-2 rounded-lg border-2 transition ${
                          textAlign === value
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                            : 'border-zinc-200 dark:border-zinc-700'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Show Reference Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold">Show Reference</label>
                  <button
                    onClick={() => setShowReference(!showReference)}
                    className={`w-12 h-6 rounded-full transition ${
                      showReference ? 'bg-amber-500' : 'bg-zinc-300 dark:bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        showReference ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
