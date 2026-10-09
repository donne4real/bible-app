# Developer Guide

Everything you need to know to work on Bible in African Languages.

## Quick Start

```bash
git clone https://github.com/donne4real/bible-app.git
cd bible-app
npm install
npm run dev
```

Opens at `http://localhost:5173`. No environment variables needed for local dev — all 19 bundled translations work offline.

## Prerequisites

- **Node.js 22+** (check with `node -v`)
- **npm** (comes with Node)
- **Git**

For Android builds: Android Studio with SDK 34+.

## Tech Stack

| What | Why |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 6 | Build tool (fast HMR) |
| Tailwind CSS v4 | Utility-first styling via `@tailwindcss/vite` plugin |
| Motion | Animations (AnimatePresence, layout transitions) |
| Lucide React | Icon library |
| Jest + Testing Library | Unit testing |
| Cloudflare Workers | Deployment (static assets + API proxy) |
| Capacitor | Android native wrapper |

## Scripts

```bash
npm run dev              # Dev server with HMR
npm run build            # Production build → dist/
npm test                 # Jest in watch mode
npm run test:run         # Jest single run
npm run test:coverage    # Jest with coverage
npm run deploy           # Build + deploy to Cloudflare Workers
npm run android:sync     # Build + sync to Capacitor Android
npm run android:open     # Open in Android Studio
npm run download-bibles  # Re-download Bible JSON data
npm run lint             # TypeScript type check (no emit)
```

## Architecture

### Data Flow

```
User taps verse
    ↓
App.tsx (state management)
    ↓
useBibleNavigation (selectedBook, selectedChapter)
    ↓
bibleLoader.ts (getVerses → cache → fetch)
    ↓
Verse data returned as Verse[]
    ↓
Components render (VerseLine, HighlightToolbar, etc.)
```

### State Management

All state is local React state + localStorage. No Redux, no Zustand, no external state library.

**Persisted state** (survives page reload) via `usePersistedState` hooks:
- `usePersistedJSONState<T>(key, default)` — objects, arrays
- `usePersistedStringState(key, default)` — strings
- `usePersistedBooleanState(key, default)` — booleans
- `usePersistedNumberState(key, default)` — numbers

**Ephemeral state** (clears on reload) via regular `useState`:
- Loading, error, UI toggles, search input

### Custom Hooks

| Hook | File | Purpose |
|---|---|---|
| `useBibleNavigation` | `hooks/useBibleNavigation.ts` | Book/chapter/verse selection, swipe gestures, keyboard arrows, picker state |
| `useStudyData` | `hooks/useStudyData.ts` | Highlights, notes, bookmarks — CRUD + import/merge |
| `useSearch` | `hooks/useSearch.ts` | Chapter search, whole-Bible search, autocomplete, reference parsing, fuzzy matching |
| `useReadingStreak` | `hooks/useReadingStreak.ts` | Streak tracking (current, longest, total days) |
| `usePersistedState` | `hooks/usePersistedState.ts` | Generic localStorage-backed state with serialization |

### Bible Data Loading

`bibleLoader.ts` handles two kinds of translations:

**Bundled (19 translations):**
- Stored as JSON in `public/bibles/{id}.json` (~5MB each)
- Full translation loaded once, cached in memory (LRU, max 2)
- Chapters served from in-memory cache

**Remote (NLT, AMP, NIV):**
- Fetched per-chapter from `/api/bible/{id}/{book}/{chapter}`
- Proxied through Cloudflare Worker → api.bible API
- Chapters cached individually (LRU, max 100)
- 15-second fetch timeout

### Service Worker (`public/sw.js`)

- **HTML navigations:** Network-first (always fetches latest index.html)
- **JS/CSS/fonts:** Cache-first with dynamic caching
- **Bible JSON:** Pre-cached on install
- Cache version: bump `CACHE_NAME` to force client updates after deploys

### Highlight Key Format

Highlights use `{bookId}_{chapter}_{verse}` (translation-agnostic). This means highlights persist when switching translations. Old `{translation}_{bookId}_{chapter}_{verse}` keys are auto-migrated on load by `migrateHighlightKeys()` in `useStudyData.ts`.

## File Reference

### Core Modules

| File | Purpose |
|---|---|
| `App.tsx` | Main component — orchestrates all state, rendering, and navigation |
| `bibleLoader.ts` | Bible data loading, caching, search, and text matching |
| `bibleStructure.ts` | Canonical list of 66 books with chapter counts |
| `bookNames.ts` | Localized book names per translation (French, Yoruba, Arabic, etc.) |
| `translations.ts` | Translation definitions (id, name, short, ntOnly, remote, dir) |
| `readingPlans.ts` | NT 30-day, Psalms, Proverbs plans + chronological plan import |
| `chronoPlan.ts` | Chronological 365-day plan generator (Blue Letter Bible order) |
| `dailyVerse.ts` | 52 curated verses rotating by day of year |
| `crossReferences.ts` | Static cross-reference data for ~150 popular verses |
| `exportImport.ts` | Study data export/import as JSON with merge logic |
| `constants.ts` | Storage keys, cache limits, UI timing, highlight colors |

### Components

| File | Purpose |
|---|---|
| `BookPicker.tsx` | Full-screen modal: Book → Chapter → Verse selection |
| `VerseLine.tsx` | Single verse with highlight, note indicator, selection ring |
| `HighlightToolbar.tsx` | Floating toolbar: highlights, notes, share, compare, cross-refs |
| `ReadingPlanPanel.tsx` | Plan selection + progress tracking in Sidebar |
| `DailyVerse.tsx` | Verse of the Day banner (dismissible) |
| `Sidebar.tsx` | Study hub: notes, highlights, bookmarks, plans, streaks, export/import |
| `ShareCardModal.tsx` | Verse card generator with backgrounds and styles |
| `ThemeSelector.tsx` | Display settings: fonts, themes, spacing, zen mode |
| `LanguagesGuideModal.tsx` | Translation info and language guide |
| `ErrorBoundary.tsx` | React error boundary with recovery UI |

## Adding a New Translation

1. **Download the Bible JSON** — run `npm run download-bibles` or manually add `{id}.json` to `public/bibles/`
2. **Add to `translations.ts`**:
   ```ts
   { id: 'xxx', name: 'Language Name', short: 'XXX', ntOnly: false }
   ```
3. **Add to service worker** — add `/bibles/xxx.json` to `BIBLE_FILES` in `public/sw.js`
4. **Add localized book names** (optional) — add a new entry in `bookNames.ts`
5. **Test** — verify the translation loads and renders correctly

For remote translations (requires API key):
1. Set `remote: true` in the translation definition
2. Add the api.bible Bible ID to `worker/index.ts`
3. Set `API_BIBLE_KEY` in `.dev.vars` (local) and Cloudflare dashboard (production)

## Adding a New Reading Plan

1. **Define the plan** in `readingPlans.ts` or create a new file:
   ```ts
   const MY_PLAN: ReadingPlan = {
     id: 'my-plan',
     name: 'My Custom Plan',
     description: 'Description of the plan',
     days: [
       { day: 1, label: 'Day 1', bookId: 'GEN', chapter: 1 },
       // ...
     ],
   };
   ```
2. **Add to `READING_PLANS`** array in `readingPlans.ts`
3. **For multi-reading days**, add a `readings` array to each day and set `multiReading: true` on the plan
4. **Test** — verify the plan appears in the Sidebar and navigation works

## Testing

Tests are in `src/` alongside the source files (co-located):

```
src/
├── bibleLoader.test.ts
├── readingPlans.test.ts
├── hooks/
│   └── usePersistedState.test.ts
└── test/
    └── setup.ts          # Jest setup (jsdom, localStorage mock)
```

**Writing a test:**
```ts
import { myFunction } from './myModule';

describe('myFunction', () => {
  it('should do the thing', () => {
    expect(myFunction('input')).toBe('expected');
  });
});
```

Test config: `jest.config.cjs` (ts-jest, jsdom environment).

## Deployment

### Cloudflare Workers

```bash
npm run deploy
```

This runs `npm run build` then `wrangler deploy`. The `wrangler.jsonc` config:
- `assets.directory: ./dist` — serves built static files
- `assets.not_found_handling: single-page-application` — SPA routing
- `assets.run_worker_first: ["/api/*"]` — API routes go to the worker

### Environment Variables (Production)

Set in Cloudflare dashboard → Workers → Settings → Variables:

| Variable | Description |
|---|---|
| `API_BIBLE_KEY` | api.bible API key for NLT/AMP/NIV |

### Android

```bash
npm run android:sync    # Build web + sync to Android project
npm run android:open    # Open in Android Studio
```

Signing config in `android/keystore.properties` (not committed to git).

## Common Tasks

### Change the default theme
Edit `src/App.tsx` → `usePersistedJSONState` defaults → `theme: 'sepia'`

### Add a highlight color
Edit `HIGHLIGHT_COLORS` in `src/constants.ts` and `getHighlightClass()` in `src/components/HighlightToolbar.tsx`

### Change the Daily Verse list
Edit `DAILY_VERSES` array in `src/dailyVerse.ts`

### Add cross-references for a verse
Add an entry to `CROSS_REFS` in `src/crossReferences.ts`:
```ts
'GEN:1:1': ['JHN:1:1', 'HEB:11:3', 'PSA:33:6'],
```

### Force clients to update after deploy
Bump `CACHE_NAME` version in `public/sw.js` (e.g., `v10` → `v11`).

## Performance Notes

- **Bundle size:** ~505KB JS (gzipped: ~153KB). The cross-reference data and daily verses add ~15KB.
- **Bible JSON:** Each translation is ~5MB. Total ~90MB in `public/bibles/`.
- **First load:** Service worker pre-caches all Bible JSON (~90MB). Subsequent loads are instant.
- **Code splitting:** Not yet implemented. The main JS bundle could be split by route.

## Troubleshooting

| Issue | Fix |
|---|---|
| Blank page after deploy | Bump `CACHE_NAME` in `public/sw.js` |
| Stale content on mobile | Clear site data in browser settings |
| Translation not loading | Check `public/bibles/{id}.json` exists and is valid JSON |
| Remote translation fails | Check `API_BIBLE_KEY` is set in Cloudflare dashboard |
| Tests failing | Run `npx jest --no-cache` to clear transform cache |
| Build fails on type errors | Run `npm run lint` to see TypeScript errors |