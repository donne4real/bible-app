# Presentation Notes — "Bible in African Languages" (bible-app)

> Living document. Add presentation talking points here as the project progresses.
> When we're ready, we'll turn this into the final presentation.

---

## 1. Project Overview (confirmed facts)

- **App name:** Bible in African Languages (originally "WordUp Africa Bible Reader", renamed in v2.0.0)
- **Package:** `com.wordupafrica.biblereader` — v2.0.0
- **Origin story:** Started as a Google AI Studio export (README links to ai.studio app; initially used a Gemini API key)
- **Purpose:** A Bible reader focused on African languages, plus English & Arabic — making scripture accessible in local tongues

## 2. Tech Stack

- **Frontend:** React 19, TypeScript 5.8, Vite 6
- **Styling:** Tailwind CSS 4 (via Vite plugin)
- **Animations:** Motion (framer-motion successor) + lucide-react icons
- **Mobile:** Capacitor 8 (Android) with SplashScreen & StatusBar plugins
- **Deployment:** Originally Netlify → migrated to **Cloudflare Workers static assets** (wrangler.jsonc)
- **Node:** >= 20 (pinned via .nvmrc)

## 3. Features (talking points)

- Multiple Bible translations in African languages (downloaded via automated scripts)
- **Ewe Bible (Bibla)** — 65 books via eBible.org
- **Haitian Creole Bible (Bib La, 1985)**
- **English & Arabic** translations added
- **Whole-Bible search**
- **Localized book names** per language (e.g., book picker shows names in the selected language)
- **Verse highlighting** (HighlightToolbar component)
- **Share cards** (ShareCardModal — share verses as images/cards)
- **Theme selector** (multiple reading themes)
- **Offline caching** (HTC offline cache; hardened downloader)
- **Mobile-first UX** — mobile header overflow fixes, language guide modal (LanguagesGuideModal)

## 4. Data Pipeline

- `scripts/download-bibles.mjs` — automated Bible downloads (eBible.org)
- `scripts/download-door43.mjs` — Door43 translation downloads
- `scripts/download-htc.mjs` — Haitian Creole source
- Data integrity fixes along the way: corrected Obadiah/Nahum IDs, translation abbreviations

## 5. Release & Deployment Story

- **Android:** Play Store keystore wired into signing config; generated Play Store 512px icon (generate-icons scripts using sharp)
- **Web:** Cloudflare migration — fixed SPA routing using `not_found_handling` instead of `_redirects`
- **Android build:** `build-android.ps1` + Capacitor sync workflow (`npm run android:sync`)

## 6. Journey / Narrative Arc (good for a story-driven deck)

1. Started as an AI Studio prototype (Gemini-powered)
2. Evolved into a full React + TypeScript production app
3. Named & branded → "Bible in African Languages" with custom icon
4. Grew translation by translation (Ewe → Haitian Creole → English/Arabic...)
5. Shipped to Android (Play Store signing) and web (Netlify → Cloudflare)

## 7. Stats & Milestones

- Git history: 34 commits (visible)
- Version: 2.0.0
- **19 Bible translations supported:**
  - African languages: Yoruba (Bibeli Mimo), Igbo (Biblia Nso), Hausa (Littafi Mai Tsarki), Twi Asante (TWI), Nigerian Pidgin (PCM), Afrikaans (Ou Vertaling), Amharic (AMH), Swahili (SWA), Shona (SNA), Ndebele (NDE), Ewe (Bibla)
  - Diaspora/other: Haitian Creole (Bib La)
  - European: Louis Segond 1910 (French), World English Bible, King James Version, American Standard Version, Bible in Basic English, Young's Literal Translation
  - Arabic: Van Dyck (ARB)

## 8. Open Questions for the Deck

- [x] Total number of languages supported? → **19 translations** (11 African languages + Arabic, French, Haitian Creole, and 6 English/classic translations)
- [ ] User/download numbers from Play Store?
- [ ] Demo: live app or screenshots? (web deploy URL?)
- [ ] Audience: technical (developers) or general?

## 9. New Points to Add (append below as we go)

- **Licensed translations added (2026-09-04):** api.bible key issue resolved — added NLT, Amplified Bible, and NIV. Since these are copyrighted (unlike the public-domain feeds), they're streamed live per-chapter through a server-side proxy rather than bundled, respecting each publisher's license and keeping the API key off the client.
- **Dual-host parity:** the proxy logic is shared between a Cloudflare Worker (`worker/`) and a Netlify Edge Function (`netlify/edge-functions/`) via a common module (`shared/apiBibleProxy.ts`), so the app behaves identically whichever host serves it.
