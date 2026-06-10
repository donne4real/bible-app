/**
 * download-htc.mjs
 *
 * Downloads the Haitian Creole Bible (Bib La, 1985) from eBible.org.
 * Public domain — published without copyright notice in 1985.
 *
 * Usage: node scripts/download-htc.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { inflateRaw } from 'zlib';

const inflateRawAsync = promisify(inflateRaw);
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
const BOOK_ID_SET = new Set(BOOK_IDS);

// eBible uses 'NAM' for Nahum; remap to 'NAH' to match the other JSON files.
const EBIBLE_REMAP = { NAM: 'NAH' };

function parseZipEntries(buf) {
  let eocdOffset = -1;
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf[i]===0x50 && buf[i+1]===0x4B && buf[i+2]===0x05 && buf[i+3]===0x06) {
      eocdOffset = i; break;
    }
  }
  if (eocdOffset < 0) throw new Error('No EOCD record found in ZIP');

  const numEntries = buf.readUInt16LE(eocdOffset + 8);
  const cdOffset   = buf.readUInt32LE(eocdOffset + 16);

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

async function main() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  const url = 'https://ebible.org/Scriptures/hat_readaloud.zip';
  console.log('Downloading Haitian Creole Bible (Bib La, 1985)...');
  console.log(`URL: ${url}`);

  const res = await fetch(url, { signal: AbortSignal.timeout(120000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  console.log(`Downloaded ${(buf.length / 1024 / 1024).toFixed(2)} MB`);

  const entries = parseZipEntries(buf);
  const EXTENDED_SET = new Set([...BOOK_IDS, ...Object.keys(EBIBLE_REMAP)]);
  const chapterEntries = entries.filter(e => {
    const parts = e.name.replace('_read.txt', '').split('_');
    return parts.length >= 4 && EXTENDED_SET.has(parts[parts.length - 2]);
  });
  console.log(`Found ${chapterEntries.length} chapter files`);

  const result = {};
  let ok = 0;

  for (const entry of chapterEntries) {
    const nameParts = entry.name.replace('_read.txt', '').split('_');
    const rawId  = nameParts[nameParts.length - 2];
    const bookId = EBIBLE_REMAP[rawId] ?? rawId;
    const chNum  = parseInt(nameParts[nameParts.length - 1], 10);

    try {
      const text = await extractEntry(buf, entry);
      const verses = parseEBibleChapterText(text);
      if (verses.length === 0) continue;

      if (!result[bookId]) result[bookId] = {};
      result[bookId][String(chNum)] = verses;
      ok++;
    } catch (e) {
      console.warn(`  Warning: ${entry.name}: ${e.message}`);
    }
  }

  const books = Object.keys(result).length;
  console.log(`Extracted ${ok} chapters across ${books} books`);

  const outPath = join(OUTPUT_DIR, 'htc.json');
  const json = JSON.stringify(result);
  writeFileSync(outPath, json, 'utf8');
  console.log(`Saved htc.json (${(json.length / 1024 / 1024).toFixed(2)} MB, ${books} books)`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
