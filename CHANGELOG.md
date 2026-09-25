# Changelog

All notable changes to Bible in African Languages.

## [2.1.0] — 2026-09-25

### Architecture
- **Refactored `App.tsx`** from ~1000 lines into focused modules:
  - `useBibleNavigation` — book/chapter/verse navigation, swipe gestures, keyboard arrows
  - `useStudyData` — highlights, notes, bookmarks with localStorage persistence
  - `useSearch` — chapter search, autocomplete, whole-Bible search
  - `usePersistedState` — generic localStorage-backed state hooks (JSON, string, number, boolean)
- **Extracted components** from App.tsx:
  - `BookPicker` — full-screen modal for book → chapter → verse navigation
  - `VerseLine` — individual verse rendering with highlights and note indicators
  - `ReadingPlanPanel` — reading plan selection and progress tracking
  - `ErrorBoundary` — React error boundary with recovery UI
- **Centralized modules:**
  - `constants.ts` — storage keys, cache limits, UI timing, highlight colors, share card presets
  - `translations.ts` — all 22 translation definitions in one place

### New Features
- **Reading Plans** — three preset plans accessible from the Sidebar's new "Plans" tab:
  - New Testament in 30 Days (~9 chapters/day)
  - Psalms in 30 Days (5 psalms/day)
  - Proverbs in 30 Days (1 chapter/day)
  - Progress tracking with day completion, streak counter, and direct navigation to readings
- **NLT, AMP, NIV translations** — 3 premium English translations via server-side api.bible proxy (requires `API_BIBLE_KEY`)
- **Whole-Bible search** — search across all chapters of the current translation with highlighted results
- **Translation comparison** — side-by-side and interlinear layout for comparing any two translations
- **Zen mode** — distraction-free reading with minimal UI
- **Share verse cards** — generate styled graphics from selected verses

### Testing
- **Jest + Testing Library** test suite with 37 passing tests:
  - `bibleLoader.test.ts` — remote translation detection, search matching, Arabic diacritics, match ranges
  - `readingPlans.test.ts` — plan generation, NT/Psalms/Proverbs coverage and structure
  - `usePersistedState.test.ts` — all 5 persisted state hooks with localStorage round-trips
- Jest config (`jest.config.cjs`) with jsdom environment and ts-jest transform

### Accessibility
- Added `aria-label` to all interactive buttons in `HighlightToolbar` (7 buttons)
- Added `aria-label` to all interactive buttons in `Sidebar` (4 buttons)
- Added `aria-label` to `ReadingPlanPanel` reset button

### Bug Fixes
- Added 15-second fetch timeout to `bibleLoader` for remote chapter and translation loads (prevents indefinite hangs on slow connections)
- Fixed `build-android.ps1` path to match Claude project directory structure
- Bumped service worker cache version to force client updates after deploy
- Bumped Node engine requirement to 22+ for Cloudflare Workers Builds compatibility

### Infrastructure
- Added `.claude/` and `superseded/` to `.gitignore`
- Updated `.env.example` with `API_BIBLE_KEY`, `GEMINI_API_KEY`, `APP_URL`, and `VITE_API_BASE_URL`
- Added test scripts: `npm test`, `npm run test:run`, `npm run test:coverage`
- Added testing devDependencies: jest, @testing-library/react, @testing-library/jest-dom, ts-jest, jsdom

---

## [2.0.0] — 2026-08-22

### Cloudflare Workers Migration
- Migrated from Netlify to Cloudflare Workers with static assets + worker routing
- Added `wrangler.jsonc` with SPA routing (`not_found_handling: single-page-application`)
- API proxy routes (`/api/*`) handled by worker; all other routes serve static assets
- Added observability logging

### Translations (22 total)
- **Bundled offline (19):** WEB, KJV, French (LSG), Yoruba, Igbo, Hausa, Twi, Nigerian Pidgin, Afrikaans, Ndebele, Amharic, Swahili, Shona (NT only), Ewe, Haitian Creole, ASV, BBE, YLT, Arabic (RTL)
- **Online-only (3):** NLT, AMP, NIV — streamed via api.bible proxy

### Android
- Capacitor-based Android packaging with Play Store signing
- Splash screen and status bar integration

---

## [1.0.0] — 2026-06-04

### Initial Release
- Static offline-first Bible reader with 8 bundled public domain translations
- Book/chapter/verse navigation with OT/NT picker
- Verse highlighting (5 colors), notes, and bookmarks
- Chapter search with autocomplete
- Display settings: font size, font family, line height, themes (sepia, light, dark, charcoal)
- Mobile-responsive design with swipe navigation
- Service worker for offline caching
- Privacy policy page
