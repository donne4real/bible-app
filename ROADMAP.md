# Bible App Roadmap

## Completed

### Architecture & Foundation (Sep 25, 2026)
- [x] Refactored App.tsx into custom hooks (useBibleNavigation, useStudyData, useSearch, usePersistedState)
- [x] Extracted components (BookPicker, VerseLine, ReadingPlanPanel, ErrorBoundary)
- [x] Centralized constants, translations, and storage keys
- [x] Jest + Testing Library test suite (45 tests)
- [x] Accessibility: aria-labels on all interactive buttons
- [x] 15s fetch timeout on remote Bible loads
- [x] JSDoc and module-level documentation on all source files

### Reading Plans
- [x] NT in 30 Days, Psalms in 30 Days, Proverbs in 30 Days
- [x] Chronological in 365 Days (Blue Letter Bible order)
- [x] Multi-reading day support for chronological plan

### Comparison & Study Tools
- [x] Translation comparison (side-by-side + interlinear)
- [x] Verse-level comparison (select specific verses to compare)
- [x] Cross-references (~150 popular verses with 3-6 connections each)
- [x] Highlights, notes, bookmarks with localStorage persistence
- [x] Highlight across translations (key changed to be translation-agnostic)
- [x] Notes export/import as JSON backup

### Engagement Features
- [x] Daily Verse / Verse of the Day (52 curated KJV verses, rotating)
- [x] Reading streaks (current streak, longest streak, total days)
- [x] WhatsApp deep link sharing
- [x] Native share (Web Share API with clipboard fallback)
- [x] Verse card generator (ShareCardModal)

### Search
- [x] Chapter-scoped search with autocomplete
- [x] Whole-Bible search
- [x] Search by reference ("John 3:16", "Gen 1:1")
- [x] Fuzzy book suggestions ("Did you mean?")
- [x] Search history persistence

### Display & UX
- [x] Google Fonts: Literata, Merriweather, Noto Serif (6 font options)
- [x] 4 themes: Sepia, Light, Dark, OLED Charcoal
- [x] Night mode auto-switch (system preference detection)
- [x] Zen mode (distraction-free reading)
- [x] RTL support for Arabic
- [x] Swipe navigation on mobile
- [x] Keyboard navigation (arrow keys)

### Infrastructure
- [x] Cloudflare Workers deployment
- [x] Service worker with network-first HTML (fixes stale cache issues)
- [x] PWA manifest and icons
- [x] Capacitor Android packaging
- [x] CHANGELOG.md and updated README.md

### Translations (22 total)
- [x] 19 bundled offline: WEB, KJV, French, Yoruba, Igbo, Hausa, Twi, Pidgin, Afrikaans, Ndebele, Amharic, Swahili, Shona, Ewe, Haitian Creole, ASV, BBE, YLT, Arabic
- [x] 3 online via api.bible proxy: NLT, AMP, NIV

---

## Remaining Roadmap

### Quick Wins (< 1 hour each)
| Feature | Lift | Description |
|---|---|---|
| More cross-reference data | 1-2 hrs | Expand from ~150 to 500+ verse mappings |
| More Daily Verse content | 1-2 hrs | Expand from 52 to 365 unique verses |
| Bundle size optimization | 1-2 hrs | Code-split the 500KB+ JS bundle via dynamic imports |

### Small Features (1-3 hours each)
| Feature | Lift | Description |
|---|---|---|
| Verse memorization tool | 2-3 hrs | Flashcard UI: show reference → tap to reveal text. Track known vs learning in localStorage. |
| 3-4 translation parallel view | 1-2 hrs | Extend comparison mode to N translations with dynamic grid layout. |
| More translations | Ongoing | Community requests for additional African languages. |

### Medium Features (half day to full day)
| Feature | Lift | Description |
|---|---|---|
| Prayer journal | 4-6 hrs | New data model (prayer text, linked verse, date, answered status). New tab in Sidebar. |
| Daily devotionals | 2-3 days | 365 short devotionals (curate from public domain sources). New page/panel. |
| Church/group reading plans | 6-8 hrs | Shareable link with plan ID + group code. No backend needed for basic version. |
| Cloud sync (optional) | 2-3 days | Firebase/Supabase for optional account + data sync. Auth, conflict resolution. |

### Deferred
| Feature | Reason | Future Path |
|---|---|---|
| Audio Bible | Too heavy for web PWA (~750MB per translation). | TTS as v1 (limited African language support). Streaming via Faith Comes by Hearing API as v2. |
| Church/group features (real-time) | Needs backend infrastructure. | Start with shareable plan links (no backend). Firebase Realtime DB for sync later. |
| Offline audio | Would make app 500MB+. | Native-only (Capacitor asset bundles). Per-book download manager. |

---

## Competitive Position vs YouVersion

### Where we're better
- 22 African languages (YouVersion has fewer)
- Offline-first, no account required
- Clean UI, no ads, no login wall
- Translation comparison (side-by-side + interlinear)
- Chronological reading plan
- WhatsApp sharing (critical for African church context)

### Where YouVersion leads
- Audio Bible (huge retention driver)
- Daily devotionals (content library)
- Social/community features
- Notifications and reminders
- Larger brand recognition

### Gap closers (in progress)
- [x] Daily Verse → Daily devotionals (next)
- [x] Reading streaks → Gamification
- [x] Share improvements → Viral growth
- [ ] Verse memorization → Engagement depth
- [ ] Audio (TTS) → Accessibility