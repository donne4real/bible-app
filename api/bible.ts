import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(apiKey: string): GoogleGenAI {
  if (!aiClient) {
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

export default async function handler(req: any, res: any) {
  try {
    const translation = String(req.query.translation || 'web').toLowerCase();
    const bookId = String(req.query.book_id || '');
    const bookName = String(req.query.book_name || '');
    const chapter = parseInt(String(req.query.chapter || '1'), 10);

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
      const webUrl = `https://bible-api.com/${encodeURIComponent(bookName)}+${chapter}?translation=web`;
      const webResponse = await fetch(webUrl);
      if (!webResponse.ok) {
        throw new Error(`The specified scripture passage "${bookName} Chapter ${chapter}" was not found or failed to load in English.`);
      }
      const webData: any = await webResponse.json();
      if (!webData.verses || webData.verses.length === 0) {
        throw new Error(`No verses found in English for "${bookName} Chapter ${chapter}".`);
      }

      const versesList = webData.verses
        .map((v: any) => `[Verse ${v.verse}] ${v.text}`)
        .join('\n');

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is required');
      }
      
      const ai = getGeminiClient(apiKey);
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
        model: 'gemini-1.5-flash',
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

    res.status(200).json({ verses: mappedVerses });
  } catch (err: any) {
    console.error('Server error handling scripture fetch:', err);
    res.status(500).json({ error: err.message || 'An error occurred while loading holy scriptures.' });
  }
}
