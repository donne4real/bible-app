/**
 * download-door43.mjs
 *
 * Downloads full CC BY-SA 4.0 Bible translations from door43 (unfoldingWord catalog)
 * in USFM format and converts them to the app's JSON format.
 *
 * Currently downloads:
 *   - Swahili ULB  (sw_ulb) — 66 books, full OT + NT
 *   - Amharic ULB  (am_ulb) — 66 books, full OT + NT
 *
 * License: CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
 * Source:  https://git.door43.org/Door43-Catalog/
 *
 * Usage: node scripts/download-door43.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'public', 'bibles');

const BOOK_IDS = [
  'GEN','EXO','LEV','NUM','DEU','JOS','JDG','RUT','1SA','2SA',
  '1KI','2KI','1CH','2CH','EZR','NEH','EST','JOB','PSA','PRO',
  'ECC','SNG','ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO',
  'OBA','JON','MIC','NAH','HAB','ZEP','HAG','ZEC','MAL',
  'MAT','MRK','LUK','JHN','ACT','ROM','1CO','2CO','GAL','EPH',
  'PHP','COL','1TH','2TH','1TI','2TI','TIT','PHM','HEB','JAS',
  '1PE','2PE','1JN','2JN','3JN','JUD','REV'
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Remove all USFM markers (\word or \word*) leaving only plain text
function stripMarkers(text) {
  return text
    .replace(/\\[a-zA-Z0-9]+\*?\s*/g, '')
    .replace(/\|.*?\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Parse a USFM file into { "1": [{verse,text},...], "2": [...] }
function parseUSFM(usfm) {
  const chapters = {};
  let currentChapter = null;
  let currentVerseNum = null;
  const currentText = [];

  function flushVerse() {
    if (currentChapter !== null && currentVerseNum !== null) {
      const text = currentText.join(' ').replace(/\s+/g, ' ').trim();
      if (text) {
        const key = String(currentChapter);
        if (!chapters[key]) chapters[key] = [];
        chapters[key].push({ verse: currentVerseNum, text });
      }
    }
    currentText.length = 0;
  }

  for (const line of usfm.split('\n')) {
    const t = line.trim();
    if (!t) continue;

    // Chapter: \c N
    const chMatch = t.match(/^\\c\s+(\d+)/);
    if (chMatch) {
      flushVerse();
      currentChapter = parseInt(chMatch[1], 10);
      currentVerseNum = null;
      continue;
    }

    // Verse: \v N [optional inline text]
    const vMatch = t.match(/^\\v\s+(\d+)\s*(.*)?/);
    if (vMatch) {
      flushVerse();
      currentVerseNum = parseInt(vMatch[1], 10);
      const inline = stripMarkers(vMatch[2] || '');
      if (inline) currentText.push(inline);
      continue;
    }

    // Skip document-level markers
    if (/^\\(id|ide|h|toc[0-9]?|mt[0-9]?|ms[0-9]?|mr|s[0-9]?|r|d|rem|fig|periph|cl|cp|cd)\b/.test(t)) continue;

    // Continuation content within a verse
    if (currentChapter !== null && currentVerseNum !== null) {
      const cleaned = stripMarkers(t);
      if (cleaned) currentText.push(cleaned);
    }
  }
  flushVerse();
  return chapters;
}

async function downloadDoor43Repo(appId, repoId) {
  console.log(`\n[${appId}] door43 Door43-Catalog/${repoId} — 66 books`);
  const result = {};
  let ok = 0, missing = 0;

  for (let n = 1; n <= 66; n++) {
    const bookId = BOOK_IDS[n - 1];
    const filename = `${String(n).padStart(2, '0')}-${bookId}.usfm`;
    const url = `https://git.door43.org/api/v1/repos/Door43-Catalog/${repoId}/raw/${filename}?ref=master`;

    try {
      const r = await fetch(url, {
        headers: { 'User-Agent': 'wordupAfrica-bible-downloader' },
        signal: AbortSignal.timeout(25000),
      });

      if (!r.ok) {
        process.stdout.write(`[${bookId}:404] `);
        missing++;
        continue;
      }

      const usfm = await r.text();
      const chapters = parseUSFM(usfm);
      const chCount = Object.keys(chapters).length;

      if (chCount === 0) {
        process.stdout.write(`[${bookId}:empty] `);
        missing++;
        continue;
      }

      result[bookId] = chapters;
      process.stdout.write(`${bookId}(${chCount}) `);
      ok++;
    } catch (e) {
      process.stdout.write(`[${bookId}:ERR] `);
      missing++;
    }

    await sleep(130); // polite rate limit
  }

  console.log(`\n  Result: ${ok} books OK, ${missing} missing`);
  return result;
}

// Spot-check a parsed result
function spotCheck(data, label) {
  const gen1 = data['GEN']?.['1']?.slice(0, 2);
  const jhn316 = data['JHN']?.['3']?.[15];
  console.log(`  Spot-check ${label}:`);
  if (gen1) console.log(`    GEN 1:1 — ${gen1[0]?.text?.slice(0, 80)}`);
  if (jhn316) console.log(`    JHN 3:16 — ${jhn316.text?.slice(0, 80)}`);
}

// Main
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const TARGETS = [
  { appId: 'swa', repoId: 'sw_ulb', name: 'Swahili ULB (CC BY-SA 4.0)' },
  { appId: 'amh', repoId: 'am_ulb', name: 'Amharic ULB (CC BY-SA 4.0)' },
];

for (const t of TARGETS) {
  console.log(`\nDownloading ${t.name}...`);
  const data = await downloadDoor43Repo(t.appId, t.repoId);
  const bookCount = Object.keys(data).length;
  if (bookCount === 0) { console.log(`  No books — skipping.`); continue; }
  spotCheck(data, t.appId);
  const json = JSON.stringify(data);
  writeFileSync(join(OUTPUT_DIR, `${t.appId}.json`), json, 'utf8');
  console.log(`\n✓ ${t.appId}.json — ${bookCount} books, ${(json.length / 1024 / 1024).toFixed(2)} MB`);
}

console.log('\nAll done!');
