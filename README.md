# Bible in African Languages

A fast, offline-first Bible reader with 22 translations in African and world languages. Built with React, TypeScript, and Tailwind CSS. Deployed on Cloudflare Workers.

**Live:** [bible-app.leyesapps.workers.dev](https://bible-app.leyesapps.workers.dev)

## Features

### Reading
- **22 translations** — Yoruba, Igbo, Hausa, Twi, Pidgin, Swahili, Amharic, Afrikaans, Shona, Ndebele, Ewe, Haitian Creole, Arabic (RTL), French, KJV, WEB, ASV, BBE, YLT, NLT, AMP, NIV
- **Offline-first** — 19 translations bundled as static JSON; works without internet
- **6 reading fonts** — Playfair Display (default), Inter (sans), Literata, Merriweather, Noto Serif, JetBrains Mono
- **4 themes** — Sepia, Light, Dark, OLED Charcoal (auto-switches with system preference)
- **Zen mode** — distraction-free reading
- **Swipe navigation** on mobile, keyboard arrows on desktop

### Study Tools
- **Verse highlights** — 5 colors, persist across translations
- **Notes** — attach reflections to any verse
- **Bookmarks** — save your place in any chapter
- **Cross-references** — tap a verse to see related passages
- **Export/Import** — backup and restore study data as JSON

### Reading Plans
- **New Testament in 30 Days** — ~9 chapters/day
- **Psalms in 30 Days** — 5 psalms/day
- **Proverbs in 30 Days** — 1 chapter/day
- **Chronological in 365 Days** — Blue Letter Bible order, multi-reading days

### Search & Navigation
- **Chapter search** with autocomplete
- **Whole-Bible search** across all chapters
- **Search by reference** — type "John 3:16" or "Gen 1" to jump directly
- **Fuzzy suggestions** — "Did you mean?" when search returns no matches

### Comparison & Sharing
- **Translation comparison** — side-by-side and interlinear layouts
- **Verse-level comparison** — select specific verses to compare
- **WhatsApp sharing** — one-tap share to WhatsApp
- **Native share** — Web Share API on mobile, clipboard on desktop
- **Verse card generator** — styled graphics for social media

### Engagement
- **Daily Verse** — featured verse that changes daily
- **Reading streaks** — track consecutive days reading
- **Reading plan progress** — streak counter, day tracking

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animations | Motion |
| Icons | Lucide React |
| Testing | Jest + Testing Library |
| Deployment | Cloudflare Workers |
| Android | Capacitor |

## Run Locally

**Prerequisites:** Node.js 22+

```bash
npm install
npm run dev
```

For licensed translations (NLT, AMP, NIV), add your [api.bible](https://scripture.api.bible/) key to `.env`:

```
API_BIBLE_KEY=your_key_here
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build to `dist/` |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage |
| `npm run deploy` | Build + deploy to Cloudflare Workers |
| `npm run android:sync` | Build + sync to Android |
| `npm run android:open` | Open in Android Studio |
| `npm run download-bibles` | Re-download Bible JSON data |

## Project Structure

```
src/
├── App.tsx                      # Main app shell
├── main.tsx                     # Entry point
├── bibleLoader.ts               # Bible data loading + LRU caching
├── bibleStructure.ts            # Book metadata (66 books)
├── bookNames.ts                 # Localized book names per translation
├── translations.ts              # Translation definitions (22)
├── readingPlans.ts              # Preset reading plans
├── chronoPlan.ts                # Chronological plan generator (365 days)
├── dailyVerse.ts                # Daily verse rotation (52 verses)
├── crossReferences.ts           # Static cross-reference data (~150 verses)
├── exportImport.ts              # Study data export/import utilities
├── constants.ts                 # Storage keys, cache limits, UI config
├── types.ts                     # TypeScript interfaces
├── index.css                    # Global styles + Tailwind @theme config
├── hooks/
│   ├── useBibleNavigation.ts    # Book/chapter/verse nav + swipe/keyboard
│   ├── useStudyData.ts          # Highlights, notes, bookmarks + import
│   ├── useSearch.ts             # Search + autocomplete + reference parsing
│   ├── useReadingStreak.ts      # Reading streak tracking
│   └── usePersistedState.ts     # localStorage-backed state hooks
├── components/
│   ├── BookPicker.tsx            # Book → chapter → verse picker modal
│   ├── VerseLine.tsx             # Single verse renderer
│   ├── HighlightToolbar.tsx      # Verse action toolbar (highlight, share, compare, cross-refs)
│   ├── ReadingPlanPanel.tsx      # Reading plan selection + progress
│   ├── DailyVerse.tsx            # Verse of the Day banner
│   ├── Sidebar.tsx               # Study hub (notes, highlights, plans, streaks, export/import)
│   ├── ShareCardModal.tsx        # Verse card generator
│   ├── ThemeSelector.tsx         # Display settings panel (fonts, themes, spacing)
│   ├── LanguagesGuideModal.tsx   # Translation info
│   └── ErrorBoundary.tsx         # Error recovery
├── test/
│   └── setup.ts                  # Jest test setup
worker/
└── index.ts                      # Cloudflare Worker (api.bible proxy)
public/
├── bibles/                       # 19 bundled translation JSON files (~90MB total)
├── sw.js                         # Service worker (network-first HTML, cache-first assets)
├── manifest.json                 # PWA manifest
├── privacy.html                  # Privacy policy
└── icons/                        # PWA icons (192px, 512px, maskable)
```

## Data Architecture

### Bible Data
- **19 bundled translations** stored as static JSON in `public/bibles/`
- **3 remote translations** (NLT, AMP, NIV) fetched per-chapter via Cloudflare Worker proxy
- **LRU cache** in memory: max 2 full translations, max 100 remote chapters
- **15-second fetch timeout** on all remote requests

### Study Data (localStorage)
| Key | Content |
|---|---|
| `bible_highlights` | Verse highlights with color and position |
| `bible_notes` | Verse-linked text notes |
| `bible_bookmarks` | Chapter bookmarks |
| `bible_reading_streak` | Current/longest streak, total days |
| `bible_reading_plan` | Active plan progress |
| `bible_search_history` | Recent search terms |
| `bible_reader_settings` | Font, theme, translation preferences |

### Highlight Key Format
Highlights use `{bookId}_{chapter}_{verse}` (translation-agnostic). Old `{translation}_{bookId}_{chapter}_{verse}` keys are auto-migrated on load.

## Deployment

### Cloudflare Workers
```bash
npm run deploy
```
This builds the app and deploys to Cloudflare Workers with static asset serving + API proxy routing.

### Environment Variables
| Variable | Required | Description |
|---|---|---|
| `API_BIBLE_KEY` | For NLT/AMP/NIV | [api.bible](https://scripture.api.bible/) API key |
| `GEMINI_API_KEY` | No | For AI features (optional) |

### Service Worker
- **HTML**: Network-first (always fetches latest `index.html`)
- **JS/CSS/Fonts**: Cache-first with dynamic caching
- **Bible JSON**: Pre-cached on install
- Cache version in `public/sw.js` — bump to force client updates

## Testing

```bash
npm test              # Watch mode
npm run test:run      # Single run
npm run test:coverage # With coverage report
```

**45 tests** covering:
- `bibleLoader.test.ts` — Remote translation detection, search matching, Arabic diacritics
- `readingPlans.test.ts` — Plan generation, NT/Psalms/Proverbs/Chronological coverage
- `usePersistedState.test.ts` — All 5 persisted state hooks with localStorage round-trips

## License

Apache-2.0