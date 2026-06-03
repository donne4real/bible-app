import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

// Ensure bible cache directory exists
const cacheDir = path.join(process.cwd(), '.bible_cache');
if (!fs.existsSync(cacheDir)) {
  try {
    fs.mkdirSync(cacheDir, { recursive: true });
  } catch (err) {
    console.error('Failed to create cache directory:', err);
  }
}

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

<<<<<<< HEAD
  // Enable CORS manually for cross-origin requests (Netlify, native Android app, etc.)
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

=======
>>>>>>> b60020c6a79047027a29eb304c41ec93355cdec2
  // API Route to fetch and dynamically translate Bible text
  app.get('/api/bible', async (req, res) => {
    try {
      const translation = String(req.query.translation || 'web').toLowerCase();
      const bookId = String(req.query.book_id || '');
      const bookName = String(req.query.book_name || '');
      const chapter = parseInt(String(req.query.chapter || '1'), 10);

      // Create deterministic and safe cache key
      const cleanLang = translation.replace(/[^a-z0-9_-]/gi, '').toLowerCase();
      const cleanBookId = bookId.replace(/[^a-z0-9_-]/gi, '').toLowerCase();
      const cleanChapter = chapter.toString().replace(/[^0-9]/g, '');
      const cacheKey = `${cleanLang}_${cleanBookId}_${cleanChapter}.json`;
      const cachePath = path.join(cacheDir, cacheKey);

      // Check on-disk cache first
      if (cleanLang && cleanBookId && cleanChapter) {
        if (fs.existsSync(cachePath)) {
          try {
            const cachedContent = fs.readFileSync(cachePath, 'utf8');
            const cachedPayload = JSON.parse(cachedContent);
            if (cachedPayload && Array.isArray(cachedPayload.verses) && cachedPayload.verses.length > 0) {
              res.json(cachedPayload);
              return;
            }
          } catch (cacheErr) {
            console.warn('[Cache Read Failure]', cacheErr);
          }
        }
      }

      const dynamicLangs: { [key: string]: { name: string; native: string } } = {
        lsg: { name: 'French (Louis Segond)', native: 'Louis Segond' },
        yor: { name: 'Yoruba', native: 'Bibeli Mimọ' },
        ibo: { name: 'Igbo', native: 'Biblia Nso' },
        hau: { name: 'Hausa', native: 'Littafi Mai Tsarki' },
        pcm: { name: 'Nigerian Pidgin', native: 'Pidgin Bible' },
        ije: { name: 'Ijebu (Yoruba dialect)', native: 'Bíbélì Mímọ́ l’édè Ìjẹ̀bú' },
        tiv: { name: 'Tiv', native: 'Bibilo kachizha' },
        urh: { name: 'Urhobo', native: 'Obe Rere' },
        efi: { name: 'Efik / Ibibio', native: 'Edisana Ñwed Abasi' },
        edo: { name: 'Edo / Benin', native: 'Ebe Nọhuanrẹn l’ede Edo' },
        ijw: { name: 'Ijaw', native: 'Ebi Eni l’ede Ijaw' },
        igl: { name: 'Igala', native: 'Abakwane l’ede Igala' },
        ewe: { name: 'Ewe', native: 'Biblia' },
        twi: { name: 'Twi', native: 'Twere Kronkron' },
        swa: { name: 'Swahili', native: 'Biblia Takatifu' },
        zul: { name: 'Zulu', native: 'IBhayibheli Elingcwele' },
        xho: { name: 'Xhosa', native: 'IBhayibhile' },
        sna: { name: 'Shona', native: 'Bhaibheri' },
        amh: { name: 'Amharic', native: 'መጽሐፍ ቅዱስ' },
      };

      let mappedVerses: any[] = [];

      if (dynamicLangs[translation]) {
        const langDetail = dynamicLangs[translation];
        // 1. Fetch the chapter's verses in English (WEB) from bible-api.com
        const webUrl = `https://bible-api.com/${encodeURIComponent(bookName)}+${chapter}?translation=web`;
        const webResponse = await fetch(webUrl);
        if (!webResponse.ok) {
          throw new Error(
            `The specified scripture passage "${bookName} Chapter ${chapter}" was not found or failed to load in English.`
          );
        }
        const webData: any = await webResponse.json();
        if (!webData.verses || webData.verses.length === 0) {
          throw new Error(`No verses found in English for "${bookName} Chapter ${chapter}".`);
        }

        // 2. Prepare formatting list of verses for translation prompt
        const versesList = webData.verses
          .map((v: any) => `[Verse ${v.verse}] ${v.text}`)
          .join('\n');

        // 3. Translate using Gemini API
        const ai = getGeminiClient();
        const prompt = `You are an expert translator specializing in translating holy scriptures into different world languages.
Translate the following English Bible verses (from the World English Bible version) into accurate, beautiful, and theologically clean ${langDetail.name} (${langDetail.native}) translation.

Maintain the exact original verse numbers and formatting.
Render complete verses—do not skip, abbreviate, or merge any verses.
Ensure the translation sounds natural, poetic, elegant, and respectful to a native speaker, using standard conventions of the ${langDetail.name} version where applicable.

Provide your output ONLY as a raw JSON array of objects, with no external markdown annotations, conversational text, or wrapper.
The JSON array must be structured exactly like this:
[
  { "verse": 1, "text": "..." },
  { "verse": 2, "text": "..." }
]

Input Verses:
${versesList}`;

        const geminiResponse = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const replyText = geminiResponse.text?.trim() || '[]';
        let translatedArray: any[] = [];
        try {
          translatedArray = JSON.parse(replyText);
        } catch (parseErr) {
          console.error('Failed to parse Gemini translation JSON response:', replyText, parseErr);
          throw new Error('The translation service returned an invalid response format.');
        }

        // Map translated verses back into the standard structure
        mappedVerses = webData.verses.map((orig: any) => {
          const translationMatch = Array.isArray(translatedArray)
            ? translatedArray.find((item: any) => Number(item.verse) === orig.verse)
            : null;

          return {
            book_id: bookId,
            book_name: bookName,
            chapter: chapter,
            verse: orig.verse,
            text: translationMatch ? translationMatch.text : orig.text,
          };
        });

      } else {
        // Standard translations: proxy request directly to bible-api.com
        const url = `https://bible-api.com/${encodeURIComponent(bookName)}+${chapter}?translation=${translation}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Scripture book-chapter reference not found for translation "${translation}".`);
        }
        const payload: any = await response.json();

        if (payload && payload.verses && payload.verses.length > 0) {
          mappedVerses = payload.verses.map((v: any) => ({
            book_id: bookId,
            book_name: bookName,
            chapter: chapter,
            verse: v.verse,
            text: v.text,
          }));
        } else {
          throw new Error('Unknown or empty response format from scripture API.');
        }
      }

      // Write standard/dynamic verses to disk cache for future instant loads
      if (cleanLang && cleanBookId && cleanChapter && mappedVerses && mappedVerses.length > 0) {
        try {
          fs.writeFileSync(cachePath, JSON.stringify({ verses: mappedVerses }), 'utf8');
        } catch (saveErr) {
          console.warn('[Cache Save Failure]', saveErr);
        }
      }

      res.json({ verses: mappedVerses });
    } catch (err: any) {
      console.error('Server error handling scripture fetch:', err);
      res.status(500).json({ error: err.message || 'An error occurred while loading holy scriptures.' });
    }
  });

  // Vite or static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
