/**
 * download-bibles.mjs
 *
 * Downloads public domain Bible translations and saves them as static JSON
 * files in public/bibles/{id}.json for a fully offline PWA.
 *
 * Sources:
 *   getbible.net  — WEB, KJV
 *   ebible.org    — LSG (French), Yoruba, Igbo, Hausa, Twi, Nigerian Pidgin
 *
 * Output format per file:
 * {
 *   "GEN": { "1": [{ "verse": 1, "text": "..." }, ...], "2": [...] },
 *   ...
 * }
 *
 * Usage: node scripts/download-bibles.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { inflateRaw } from 'zlib';

const inflateRawAsync = promisify(inflateRaw);
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'public', 'bibles');

// Book number (1-66) → app book ID
const BOOK_IDS = [
  'GEN','EXO','LEV','NUM','DEU','JOS','JDG','RUT','1SA','2SA',
  '1KI','2KI','1CH','2CH','EZR','NEH','EST','JOB','PSA','PRO',
  'ECC','SNG','ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO',
  'OBA','JON','MIC','NAH','HAB','ZEP','HAG','ZEC','MAL',
  'MAT','MRK','LUK','JHN','ACT','ROM','1CO','2CO','GAL','EPH',
  'PHP','COL','1TH','2TH','1TI','2TI','TIT','PHM','HEB','JAS',
  '1PE','2PE','1JN','2JN','3JN','JUD','REV'
];
const BOOK_ID_SET = new Set(BOOK_IDS);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── getbible.net downloader ──────────────────────────────────────────────────

async function downloadFromGetBible(appId, getbibleId) {
  console.log(`\n[${appId}] getbible.net "${getbibleId}"`);
  const result = {};
  let ok = 0, missing = 0;

  for (let bookNum = 1; bookNum <= 66; bookNum++) {
    const bookId = BOOK_IDS[bookNum - 1];
    process.stdout.write(`  ${String(bookNum).padStart(2)}/66 ${bookId.padEnd(4)} `);
    try {
      const url = `https://api.getbible.net/v2/${getbibleId}/${bookNum}.json`;
      const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!res.ok) { process.stdout.write('MISSING\n'); missing++; continue; }
      const book = await res.json();
      if (!book?.chapters) { process.stdout.write('MISSING\n'); missing++; continue; }

      result[bookId] = {};
      for (const ch of book.chapters) {
        result[bookId][String(ch.chapter)] = ch.verses.map(v => ({
          verse: Number(v.verse),
          text: String(v.text).replace(/\n/g, ' ').trim(),
        }));
      }
      process.stdout.write(`OK (${book.chapters.length} ch)\n`);
      ok++;
    } catch (e) {
      process.stdout.write(`ERR: ${e.message}\n`);
      missing++;
    }
    await sleep(80);
  }
  console.log(`  ${ok} books OK, ${missing} missing`);
  return result;
}

// ─── eBible.org ZIP downloader ────────────────────────────────────────────────

function parseZipEntries(buf) {
  // Find End of Central Directory record
  let eocdOffset = -1;
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf[i]===0x50 && buf[i+1]===0x4B && buf[i+2]===0x05 && buf[i+3]===0x06) {
      eocdOffset = i; break;
    }
  }
  if (eocdOffset < 0) throw new Error('No EOCD record found in ZIP');

  const numEntries = buf.readUInt16LE(eocdOffset + 8);
  const cdOffset   = buf.readUInt32LE(eocdOffset + 16);

  // Parse central directory
  const entries = [];
  let pos = cdOffset;
  for (let i = 0; i < numEntries; i++) {
    if (buf[pos]!==0x50||buf[pos+1]!==0x4B||buf[pos+2]!==0x01||buf[pos+3]!==0x02) break;
    const compMethod = buf.readUInt16LE(pos + 10);
    const compSize   = buf.readUInt32LE(pos + 20);
    const uncompSize = buf.readUInt32LE(pos + 24);
    const nameLen    = buf.readUInt16LE(pos + 28);
    const extraLen   = buf.readUInt16LE(pos + 30);
    const cmtLen     = buf.readUInt16LE(pos + 32);
    const localOffset= buf.readUInt32LE(pos + 42);
    const name       = buf.slice(pos + 46, pos + 46 + nameLen).toString('utf8');
    entries.push({ name, compMethod, compSize, uncompSize, localOffset });
    pos += 46 + nameLen + extraLen + cmtLen;
  }
  return entries;
}

async function extractEntry(buf, entry) {
  // Read local file header at localOffset
  const lhOffset = entry.localOffset;
  const lhNameLen  = buf.readUInt16LE(lhOffset + 26);
  const lhExtraLen = buf.readUInt16LE(lhOffset + 28);
  const dataStart  = lhOffset + 30 + lhNameLen + lhExtraLen;
  const compData   = buf.slice(dataStart, dataStart + entry.compSize);

  if (entry.compMethod === 0) return compData.toString('utf8');
  if (entry.compMethod === 8) return (await inflateRawAsync(compData)).toString('utf8');
  throw new Error(`Unsupported compression method: ${entry.compMethod}`);
}

function parseEBibleChapterText(text) {
  // Format:
  //   Line 0: Book name (skip)
  //   Line 1: Chapter number (skip)
  //   Lines 2+: One verse per line (sequential, starting at verse 1)
  const lines = text.replace(/^﻿/, '').split('\n');
  const verses = [];
  let verseNum = 1;
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      verses.push({ verse: verseNum, text: line });
      verseNum++;
    }
  }
  return verses;
}

// eBible uses 'NAM' for Nahum in ZIP filenames; remap to 'NAH' to match app IDs.
const EBIBLE_ID_REMAP = { NAM: 'NAH' };
const EBIBLE_EXTENDED_SET = new Set([...BOOK_IDS, ...Object.keys(EBIBLE_ID_REMAP)]);

async function downloadFromEBible(appId, ebibleCode) {
  console.log(`\n[${appId}] ebible.org "${ebibleCode}"`);

  const url = `https://ebible.org/Scriptures/${ebibleCode}_readaloud.zip`;
  console.log(`  Downloading ZIP...`);
  const res = await fetch(url, { signal: AbortSignal.timeout(120000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const sizeMB = (buf.length / 1024 / 1024).toFixed(2);
  console.log(`  Downloaded ${sizeMB} MB, parsing...`);

  const entries = parseZipEntries(buf);

  // Filter to chapter files: pattern {code}_NNN_{BOOKID}_CC_read.txt
  // Use the extended set so eBible-specific codes (e.g. NAM for Nahum) are included.
  const chapterEntries = entries.filter(e => {
    const parts = e.name.replace('_read.txt', '').split('_');
    return parts.length >= 4 && EBIBLE_EXTENDED_SET.has(parts[parts.length - 2]);
  });

  console.log(`  Found ${chapterEntries.length} chapter files`);

  const result = {};
  let ok = 0;

  for (const entry of chapterEntries) {
    // Filename: {code}_NNN_{BOOKID}_CC_read.txt
    const nameParts = entry.name.replace('_read.txt', '').split('_');
    const rawId  = nameParts[nameParts.length - 2];
    const bookId = EBIBLE_ID_REMAP[rawId] ?? rawId;   // e.g. NAM → NAH
    const chNum  = parseInt(nameParts[nameParts.length - 1], 10); // e.g. 01 → 1

    try {
      const text = await extractEntry(buf, entry);
      const verses = parseEBibleChapterText(text);
      if (verses.length === 0) continue;

      if (!result[bookId]) result[bookId] = {};
      result[bookId][String(chNum)] = verses;
      ok++;
    } catch (e) {
      console.warn(`  Warning: could not extract ${entry.name}: ${e.message}`);
    }
  }

  const books = Object.keys(result).length;
  console.log(`  ${ok} chapters across ${books} books extracted`);
  return result;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const TRANSLATIONS = [
  { appId: 'web', source: 'getbible', id: 'web',        name: 'World English Bible' },
  { appId: 'kjv', source: 'getbible', id: 'kjv',        name: 'King James Version' },
  { appId: 'lsg', source: 'ebible',   id: 'fraLSG',     name: 'Louis Segond 1910 (French)' },
  { appId: 'yor', source: 'ebible',   id: 'yor',         name: 'Yoruba Bible' },
  { appId: 'ibo', source: 'ebible',   id: 'ibo',         name: 'Igbo Bible' },
  { appId: 'hau', source: 'ebible',   id: 'hausa',       name: 'Hausa Bible' },
  { appId: 'twi', source: 'ebible',   id: 'twiasante',   name: 'Twi / Akan Asante Bible' },
  { appId: 'pcm', source: 'ebible',   id: 'pcm',         name: 'Nigerian Pidgin Bible' },
  // New additions
  { appId: 'afr', source: 'getbible', id: 'aov',        name: 'Afrikaans Ou Vertaling' },
  { appId: 'amh', source: 'ebible',   id: 'amh',        name: 'Amharic Bible' },
  { appId: 'swa', source: 'getbible', id: 'swahili',    name: 'Swahili Bible (NT)' },
  { appId: 'sna', source: 'getbible', id: 'shona',      name: 'Shona Bible (NT)' },
  { appId: 'nde', source: 'getbible', id: 'ndebele',    name: 'Ndebele Bible' },
  // Haitian Creole — public domain (published 1985 without copyright notice)
  // eBible uses 'NAM' for Nahum; remap to 'NAH' to match other JSON files.
  { appId: 'htc', source: 'ebible',   id: 'hat',        name: 'Haitian Creole Bible (Bib La)' },
];

async function main() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  const summary = [];

  for (const t of TRANSLATIONS) {
    try {
      let data;
      if (t.source === 'getbible') {
        data = await downloadFromGetBible(t.appId, t.id);
      } else {
        data = await downloadFromEBible(t.appId, t.id);
      }

      const bookCount = Object.keys(data).length;
      if (bookCount === 0) {
        summary.push({ appId: t.appId, name: t.name, status: 'FAILED — 0 books' });
        continue;
      }

      const json = JSON.stringify(data);
      const outPath = join(OUTPUT_DIR, `${t.appId}.json`);
      writeFileSync(outPath, json, 'utf8');
      const sizeMB = (json.length / 1024 / 1024).toFixed(2);
      console.log(`\n  ✓ Saved ${t.appId}.json (${sizeMB} MB, ${bookCount} books)`);
      summary.push({ appId: t.appId, name: t.name, status: `OK — ${bookCount} books, ${sizeMB} MB` });
    } catch (e) {
      console.error(`\n  ✗ ${t.appId} failed:`, e.message);
      summary.push({ appId: t.appId, name: t.name, status: `ERROR: ${e.message}` });
    }
  }

  console.log('\n\n=== Summary ===');
  for (const s of summary) {
    console.log(`  ${s.appId.padEnd(5)} ${s.name.padEnd(35)} ${s.status}`);
  }
  console.log('\nDone! Files saved to public/bibles/');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
