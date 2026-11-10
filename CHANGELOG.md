# Changelog

All notable changes to Bible in African Languages.

## [2.4.0] — 2026-11-09

### New Features
- **Cloud sync** — Cross-device sync for highlights, notes, and bookmarks via Cloudflare D1. Users can create accounts, push data to cloud, and pull on other devices. JWT authentication with 30-day tokens.
- **Highlight list view** — Searchable list of all highlights sorted by date (newest first) in Sidebar.
- **Highlight color filter** — Filter highlights by color in Sidebar with color dot buttons.
- **Highlight date display** — Each highlight now shows when it was created.
- **Underline highlight style** — Toggle between background fill and underline styles in the highlight toolbar.
- **Sticky chapter indicator** — Fixed floating bar showing current book/chapter while scrolling through Bible content.
- **Improved dark mode highlights** — Brighter, more visible highlight colors in dark mode.

### Architecture
- **Extracted hooks** — `useComparison` and `useSettings` hooks extracted from App.tsx for better separation of concerns.
- **Code splitting** — React.lazy for Sidebar, ShareCardModal, LanguagesGuideModal, BookPicker components.
- **Service worker optimization** — Pre-caches only WEB translation (~5MB) instead of all 19 translations (~90MB). Other translations cached on-demand.
- **New sync infrastructure** — `worker/sync.ts` for API endpoints, `worker/schema.sql` for D1 schema, `useSync` hook for client-side sync.
- **New components** — `SyncPanel` for login/register/sync UI in Sidebar footer.

### Bug Fixes
- **chronoPlan.ts import** — Fixed incorrect import path (`../types` → `./types`).
- **activeTrans ordering** — Fixed variable reference error causing blank page.
- **Package rename** — Updated from `wordup-africa-bible-reader` to `bible-in-african-languages`.

### Database
- **Cloudflare D1** — New `bible-app-db` database with tables: users, highlights, notes, bookmarks, user_settings.

---

## [2.3.0] — 2026-09-27

### New Features
- **Multi-translation parallel view** — Compare up to 4 translations at once in side-by-side or interlinear layout. Dynamic grid columns (2-4) with add/remove translation controls.
- **Full translation names in dropdowns** — Translation selectors now show full names (e.g. "King James Version (KJV)") instead of abbreviated codes.

---

## [2.2.0] — 2026-09-26

### New Features
- **Google Fonts** — Added Literata (reading), Merriweather (classic), Noto Serif (multilingual) as font options. 6 total fonts in the selector.
- **Daily Verse / Verse of the Day** — 52 curated KJV verses rotating daily. Dismissible amber banner with click-to-navigate.
- **Cross-references** — Static data for ~150 popular verses with 3-6 related passages each. Shown in toolbar when a single verse is selected.
- **WhatsApp sharing** — One-tap share to WhatsApp with formatted verse text via `wa.me` deep link.
- **Native share** — Web Share API on mobile (system share sheet), clipboard fallback on desktop.
- **Verse-level comparison** — Select specific verses and compare only those across translations (vs full chapter).
- **Chronological reading plan** — 365-day plan based on Blue Letter Bible order. Multi-reading days with 2-5 chapters each.
- **Reading streaks** — Track current streak, longest streak, and total days read. Badge in Sidebar header.
- **Search by reference** — Type "John 3:16" or "Gen 1" to jump directly to that passage.
- **Fuzzy search suggestions** — "Did you mean?" with closest book name matches when search returns 0 results.
- **Highlight across translations** — Highlights now persist when switching translations (key changed to be translation-agnostic).
- **Notes export/import** — Export all study data as dated JSON backup. Import from file with merge.
- **Night mode auto-switch** — Detects system `prefers-color-scheme` on first load and listens for changes.

### Bug Fixes
- **Mobile blank page** — Service worker now uses network-first for HTML (always fetches latest `index.html` with correct asset hashes).
- **Comparison controls overlap** — Stacked layout on mobile with shorter labels ("Side" / "Inter").
- **WhatsApp toolbar corruption** — Fixed functions placed outside component by bash injection.
- **Service worker cache** — Bumped to v10 to clear stale cached JS files.

### Architecture
- **Refactored App.tsx** into custom hooks: `useBibleNavigation`, `useStudyData`, `useSearch`, `usePersistedState`, `useReadingStreak`
- **Extracted components**: `BookPicker`, `VerseLine`, `ReadingPlanPanel`, `ErrorBoundary`, `DailyVerse`
- **Centralized modules**: `constants.ts`, `translations.ts`, `crossReferences.ts`, `dailyVerse.ts`, `exportImport.ts`, `chronoPlan.ts`
- **Jest + Testing Library** test suite with 45 passing tests

---

## [2.1.0] — 2026-09-25

### Architecture
- Refactored `App.tsx` from ~1000 lines into focused modules
- Extracted components and hooks from monolithic file
- Centralized constants, translations, and storage keys

### New Features
- Reading Plans — NT in 30 Days, Psalms in 30 Days, Proverbs in 30 Days
- NLT, AMP, NIV translations via server-side api.bible proxy
- Whole-Bible search across all chapters
- Translation comparison (side-by-side and interlinear)
- Zen mode for distraction-free reading
- Share verse cards with styled graphics

### Testing
- Jest + Testing Library test suite with 37 tests

### Accessibility
- Added `aria-label` to all interactive buttons

### Bug Fixes
- 15-second fetch timeout on remote Bible loads
- Fixed `build-android.ps1` path
- Bumped service worker cache version
- Bumped Node engine to 22+

---

## [2.0.0] — 2026-08-22

### Cloudflare Workers Migration
- Migrated from Netlify to Cloudflare Workers with static assets + worker routing
- Added `wrangler.jsonc` with SPA routing
- API proxy routes handled by worker

### Translations (22 total)
- 19 bundled offline: WEB, KJV, French, Yoruba, Igbo, Hausa, Twi, Pidgin, Afrikaans, Ndebele, Amharic, Swahili, Shona, Ewe, Haitian Creole, ASV, BBE, YLT, Arabic
- 3 online: NLT, AMP, NIV

### Android
- Capacitor-based Android packaging with Play Store signing

---

## [1.0.0] — 2026-06-04

### Initial Release
- Static offline-first Bible reader with 8 bundled translations
- Book/chapter/verse navigation
- Verse highlighting, notes, and bookmarks
- Chapter search with autocomplete
- Display settings (font, themes)
- Mobile-responsive with swipe navigation
- Service worker for offline caching