# Bible in African Languages — Developer guide

Enough detail for a developer (or an AI assistant) to understand, maintain and extend the Bible app.

## 1. Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Client (React 19 + TypeScript + Vite)                      │
│  ├── 19 bundled translations (public/bibles/*.json)         │
│  ├── 3 remote translations (via Worker proxy)               │
│  ├── localStorage (study data)                              │
│  └── Cloudflare D1 sync (optional)                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│  Cloudflare Worker (worker/index.ts)                        │
│  ├── Static asset serving (dist/)                           │
│  ├── /api/bible/* → api.bible proxy (NLT, AMP, NIV)        │
│  └── /api/sync/* → D1 sync endpoints                        │
└─────────────────────────────────────────────────────────────┘
```

- **No server framework** — Cloudflare Workers handles static files + API routing
- **Offline-first** — 19 translations bundled as JSON; remote translations fetched per-chapter
- **State** — React local state + localStorage; no Redux/Zustand

## 2. Repository layout

```
bible-app/
├── package.json              npm scripts + Capacitor config
├── capacitor.config.ts       Capacitor mobile config
├── wrangler.jsonc            Cloudflare Workers config
├── .env / .env.example       local keys (git-ignored) / template
├── src/
│   ├── App.tsx               Main app shell
│   ├── bibleLoader.ts        Bible data loading + LRU caching
│   ├── bibleStructure.ts     66 books metadata
│   ├── bookNames.ts          Localized book names per translation
│   ├── translations.ts       Translation definitions (22)
│   ├── readingPlans.ts       Preset reading plans
│   ├── chronoPlan.ts         Chronological 365-day plan generator
│   ├── dailyVerse.ts         365 daily verses
│   ├── crossReferences.ts    Static cross-reference data (~732 entries)
│   ├── exportImport.ts       Study data export/import
│   ├── constants.ts          Storage keys, cache limits, UI config
│   ├── types.ts              TypeScript interfaces
│   ├── index.css             Global styles + Tailwind @theme
│   ├── hooks/
│   │   ├── useAutoSync.ts    Debounced auto-push + visibility auto-pull
│   │   ├── useBibleNavigation.ts  Book/chapter/verse nav + swipe/keyboard
│   │   ├── useStudyData.ts   Highlights, notes, bookmarks + cloud delete
│   │   ├── useSearch.ts      Search + autocomplete + reference parsing
│   │   ├── useReadingStats.ts    Reading sessions, streaks, book progress
│   │   ├── useSettings.ts    Reader settings + theme helpers
│   │   ├── useComparison.ts  Translation comparison state
│   │   ├── useSync.ts        Cloud sync API client
│   │   └── usePersistedState.ts   localStorage-backed state hooks
│   ├── components/
│   │   ├── BookPicker.tsx    Book → chapter → verse picker modal
│   │   ├── VerseLine.tsx     Single verse renderer
│   │   ├── HighlightToolbar.tsx   Verse action toolbar
│   │   ├── Sidebar.tsx       Study hub (notes, highlights, plans, sync)
│   │   ├── ShareCardModal.tsx    Verse card generator
│   │   ├── ThemeSelector.tsx     Display settings (fonts, themes)
│   │   ├── SyncPanel.tsx     Cloud sync login/push/pull UI
│   │   ├── ReadingStatsPanel.tsx   Reading analytics modal
│   │   └── ...               (other components)
│   └── test/
│       └── setup.ts          Jest test setup
├── worker/
│   ├── index.ts              Cloudflare Worker (proxy + sync router)
│   ├── sync.ts               Sync API endpoints
│   └── schema.sql            D1 database schema
├── public/
│   ├── bibles/               19 bundled translation JSON files (~90MB)
│   ├── sw.js                 Service worker
│   ├── manifest.json         PWA manifest
│   ├── privacy.html          Privacy policy
│   └── icons/                PWA icons
├── resources/
│   ├── icon.png              1024x1024 app icon
│   ├── icon-design.svg       SVG source for the icon
│   └── splash.png            2732x2732 splash screen
├── .github/workflows/
│   ├── ios-build.yml         Unsigned iOS build (auto on push)
│   └── ios-signed-build.yml  Signed iOS build + TestFlight upload (manual)
└── docs/                     This documentation
```

## 3. Data sources

### Bundled translations (19)
- Stored as JSON in `public/bibles/{id}.json` (~5MB each, ~90MB total)
- Full translation loaded once, cached in memory (LRU, max 2 translations)
- Service worker caches on-demand when selected

### Remote translations (3)
- NLT, AMP, NIV fetched per-chapter via `/api/bible/{id}/{book}/{chapter}`
- Proxied through Cloudflare Worker → api.bible API
- Chapters cached individually (LRU, max 100)
- 15-second fetch timeout

### Study data (localStorage)
| Key | Content |
|---|---|
| `bible_highlights` | Verse highlights (color, style, position) |
| `bible_notes` | Verse-linked text notes |
| `bible_bookmarks` | Chapter bookmarks |
| `bible_reading_streak` | Current/longest streak, total days |
| `bible_reading_plan` | Active plan progress |
| `bible_search_history` | Recent search terms |
| `bible_reader_settings` | Font, theme, translation preferences |

**Highlight key format:** `{bookId}_{chapter}_{verse}` (translation-agnostic). Old `{translation}_{bookId}_{chapter}_{verse}` keys are auto-migrated on load.

## 4. Cloud sync

### Architecture
- **Database:** Cloudflare D1 (SQLite at the edge)
- **Auth:** PBKDF2-SHA256 (100k iterations, per-user salt) + HMAC-SHA256 JWT (30-day expiry)
- **API:** `/api/sync/*` endpoints (register, login, push, pull, delete)
- **Auto-sync:** `useAutoSync` hook — debounced push (3s) + visibility/interval pull

### How it works
1. User creates account in Sidebar → Sync Panel
2. Changes auto-push 3 seconds after edits
3. Changes auto-pull on tab focus or every 5 minutes
4. Deleting locally removes from cloud

## 5. iOS build pipeline

### Workflow: `ios-signed-build.yml`
- **Trigger:** Manual (`workflow_dispatch`) with version, build number, and upload toggle
- **Runner:** macOS-latest (free for public repos)
- **Steps:**
  1. Checkout code
  2. Setup Node.js 22
  3. Install dependencies (`npm ci`)
  4. Build web app
  5. Add iOS platform (Capacitor)
  6. Sync Capacitor iOS
  7. Generate app icons
  8. Import certificate + provisioning profile
  9. Update version in Info.plist
  10. Archive iOS app (`xcodebuild archive`)
  11. Export IPA (`xcodebuild -exportArchive`)
  12. Upload to TestFlight (if `upload=true`)
  13. Upload IPA artifact

### Key technical details
- **P12 format:** Must use SHA1/3DES encryption (`-certpbe PBE-SHA1-3DES -keypbe PBE-SHA1-3DES -macalg SHA1`) — OpenSSL 3.x default AES is rejected by macOS
- **xcodebuild:** Must include explicit `archive` action
- **Export plist:** Must include `signingStyle: manual` and `provisioningProfiles` dict
- **Bundle ID:** `com.leyesapps.bibleapp` (must match provisioning profile)

### GitHub secrets
| Secret | Type | Value |
|---|---|---|
| `BUILD_CERTIFICATE_BASE64` | Secret | SHA1 p12 (base64) |
| `P12_PASSWORD` | Secret | `BibleApp2026!` |
| `KEYCHAIN_PASSWORD` | Secret | `KeychainPass2026!` |
| `TEAM_ID` | Secret | `4268AM9U37` |
| `PROVISIONING_PROFILE_BASE64` | Secret | Profile (base64) |
| `APPSTORE_ISSUER_ID` | Variable | Issuer ID (UUID) |
| `APPSTORE_API_KEY_ID` | Variable | Key ID |
| `APPSTORE_API_PRIVATE_KEY` | Secret | .p8 file contents |

## 6. Local development

```bash
npm ci                                   # Node ≥ 22
npm run dev                              # Dev server at localhost:5173
npm test                                 # Jest in watch mode
npm run typecheck                        # TypeScript check
npm run build                            # Production build → dist/
npm run deploy                           # Build + deploy to Cloudflare
```

For remote translations (NLT/AMP/NIV), add `API_BIBLE_KEY` to `.env`.

## 7. Tests

**45 tests** covering:
- `bibleLoader.test.ts` — Remote translation detection, search matching, Arabic diacritics
- `readingPlans.test.ts` — Plan generation, NT/Psalms/Proverbs/Chronological coverage
- `usePersistedState.test.ts` — All 5 persisted state hooks with localStorage round-trips

```bash
npm test              # Watch mode
npm run test:run      # Single run
npm run test:coverage # With coverage report
```

## 8. Adding a new translation

1. **Download the Bible JSON** — run `npm run download-bibles` or manually add `{id}.json` to `public/bibles/`
2. **Add to `translations.ts`**:
   ```ts
   { id: 'xxx', name: 'Language Name', short: 'XXX', ntOnly: false }
   ```
3. **Add to service worker** — add `/bibles/xxx.json` to `BIBLE_FILES` in `public/sw.js`
4. **Add localized book names** (optional) — add entry in `bookNames.ts`
5. **Test** — verify the translation loads and renders correctly

For remote translations (requires API key):
1. Set `remote: true` in the translation definition
2. Add the api.bible Bible ID to `worker/index.ts`
3. Set `API_BIBLE_KEY` in `.dev.vars` (local) and Cloudflare dashboard (production)

## 9. Performance

- **Bundle size:** ~505KB JS (gzipped: ~153KB)
- **Bible JSON:** Each translation ~5MB; total ~90MB in `public/bibles/`
- **First load:** Service worker pre-caches only `web.json` (~5MB); others cached on-demand
- **Code splitting:** Heavy modals lazy-loaded via `React.lazy`

## 10. Troubleshooting

| Issue | Fix |
|---|---|
| Blank page after deploy | Bump `CACHE_NAME` in `public/sw.js` |
| Stale content on mobile | Clear site data in browser settings |
| Translation not loading | Check `public/bibles/{id}.json` exists |
| Remote translation fails | Check `API_BIBLE_KEY` in Cloudflare dashboard |
| iOS build fails | Check Actions logs; verify p12 is SHA1 format |
| Tests failing | Run `npx jest --no-cache` |
