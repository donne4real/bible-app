# Bible in African Languages

A fast, offline-first Bible reader with 22 translations in African and world languages. Built with React, TypeScript, and Tailwind CSS. Deployed on Cloudflare Workers.

**Live:** [bible-app.leyesapps.workers.dev](https://bible-app.leyesapps.workers.dev)

## Features

- **22 translations** — Yoruba, Igbo, Hausa, Twi, Pidgin, Swahili, Amharic, Afrikaans, Shona, Ndebele, Ewe, Haitian Creole, Arabic (RTL), French, KJV, WEB, ASV, BBE, YLT, NLT, AMP, NIV
- **Offline-first** — 19 translations bundled as static JSON; works without internet
- **Translation comparison** — side-by-side and interlinear layouts
- **Study tools** — verse highlights (5 colors), notes, bookmarks
- **Reading plans** — NT in 30 Days, Psalms in 30 Days, Proverbs in 30 Days
- **Whole-Bible search** — full-text search across all chapters
- **Share verse cards** — generate styled graphics from selected verses
- **Zen mode** — distraction-free reading
- **Display settings** — font size, font family, line height, 4 themes (sepia, light, dark, charcoal)
- **Mobile** — swipe navigation, responsive design, PWA installable
- **Android** — Capacitor-packaged APK with Play Store signing

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Motion (animations)
- Lucide React (icons)
- Capacitor (Android)
- Cloudflare Workers (deployment)
- Jest + Testing Library (testing)

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

## Project Structure

```
src/
├── App.tsx                    # Main app shell
├── main.tsx                   # Entry point
├── bibleLoader.ts             # Bible data loading + caching
├── bibleStructure.ts          # Book metadata (66 books)
├── bookNames.ts               # Localized book names
├── translations.ts            # Translation definitions (22)
├── readingPlans.ts            # Preset reading plans
├── constants.ts               # Storage keys, cache limits, UI config
├── types.ts                   # TypeScript interfaces
├── hooks/
│   ├── useBibleNavigation.ts  # Book/chapter/verse nav + swipe/keyboard
│   ├── useStudyData.ts        # Highlights, notes, bookmarks
│   ├── useSearch.ts           # Search + autocomplete
│   └── usePersistedState.ts   # localStorage-backed state
├── components/
│   ├── BookPicker.tsx          # Book → chapter → verse picker modal
│   ├── VerseLine.tsx           # Single verse renderer
│   ├── HighlightToolbar.tsx    # Verse action toolbar
│   ├── ReadingPlanPanel.tsx    # Reading plan UI
│   ├── Sidebar.tsx             # Study hub (notes, highlights, plans)
│   ├── ShareCardModal.tsx      # Verse card generator
│   ├── ThemeSelector.tsx       # Display settings panel
│   ├── LanguagesGuideModal.tsx # Translation info
│   └── ErrorBoundary.tsx       # Error recovery
worker/
└── index.ts                   # Cloudflare Worker (API proxy)
public/
├── bibles/                    # 19 bundled translation JSON files
├── sw.js                      # Service worker
└── manifest.json              # PWA manifest
```

## License

Apache-2.0
