# Bible App — Explain Like I'm New

**What this file is:** the plain-language version of this project, no jargon. If you (or anyone else — a friend, a future employer, your past self after a long break) needs a "wait, what is this project again and what's actually happened" refresher, read this instead of digging through code or commit history.

**How this file works:** the top section is a snapshot — replaced each time, always reflects "right now." The "Story So Far" section below it is a running log in date order, built from the project's actual commit history, so you can watch it evolve from a weekend AI-Studio experiment into a real shipped app.

---

## 📍 Right now (updated Sep 18, 2026)

- **What it is:** A Bible reading app — web and Android — that works in African languages (plus English, Arabic, French, and Haitian Creole), and works fully offline once installed.
- **Version:** 2.0.0, live on the web (Cloudflare) and packaged for the Google Play Store.
- **Translations available:** 19 bundled directly into the app (so they work with zero internet), plus 3 more (NLT, Amplified, NIV) that stream in live from a licensed Bible-text service, because those are copyrighted and can't legally be bundled for free.
- **Last major change:** added those 3 copyrighted translations (Sep 4, 2026) — the first time the app talks to a paid, licensed data source instead of only free public-domain text.
- **Overall shape:** it's a "static app" — meaning almost everything (the Bible text itself) is just files sitting in the app, not fetched from a server on every read. That's *why* it works offline and loads fast.

---

## The goal, in one paragraph

Build a Bible app that actually serves African-language readers — Yoruba, Igbo, Hausa, Twi, Nigerian Pidgin, and others — alongside the usual English/French options, in a way that works even with no or spotty internet (a real constraint for a lot of the target audience), and that can be installed as a real Android app, not just a website.

## Why this was interesting, in one paragraph

Most Bible apps either (a) only support a handful of major world languages, or (b) fetch everything from a server every time, which fails the moment your internet does. This project solves both: it hunts down legitimate, free-to-use Bible translations in African languages from places like eBible.org, bundles the full text *inside* the app itself (so there's nothing to download or wait on later), and only reaches out to the internet for the handful of translations that are copyrighted and legally can't be given away for free.

---

## Story so far

### June 3–4, 2026 — Starting point: an AI Studio prototype that talked to Gemini for everything
- The app began as an export from Google's "AI Studio" — a quick way to spin up an AI-powered app. In this first version, translating a verse meant calling Google's Gemini AI live, using an API key typed in by whoever was using the app.
- **Found and fixed a real security problem the same day:** that Gemini API key was being used directly from the browser, which means anyone using the app could see (and steal) it just by watching their own network traffic. Fixed by moving all AI calls behind a backend server instead, so the key never leaves the server. Also fixed a wrong AI model name that had been silently failing.
- A code review turned up 6 more small-but-real bugs: a loading spinner that could hang forever if a network request failed and was never told to stop; a "read offline" fallback that only worked for full-page loads, not for the pieces (scripts, fonts, Bible text) a page needs; a rare glitch where clicking through chapters fast could apply the wrong verse count to the wrong chapter; and a keyboard-navigation bug from React state not being wired up quite right. All fixed same day.

### June 4, 2026 — The big pivot: cut the AI and the server out entirely
- Realized that live AI-translated Bible text isn't the right approach anyway — actual Bible translations already exist, are already reviewed by real translators, and don't need an AI making things up on the fly.
- **Rebuilt the app as a pure offline-first app with no backend and no API keys at all.** Downloaded 8 complete, legally free-to-use ("public domain") Bible translations — English (2 versions), French, Yoruba, Igbo, Hausa, Twi, and Nigerian Pidgin — and packaged the full text as files that ship inside the app itself (about 35 MB total). Loading a verse went from roughly 300 lines of fetch/AI/fallback logic down to about 2 lines of "just read the file."
- Added a privacy policy page (now that there's no API key or account, this is much simpler to write honestly) and a small dashboard for managing offline storage.

### June 5, 2026 — Growing the language list, and going mobile
- Added 5 more African-language translations: Afrikaans, Amharic, Swahili, Shona, and Ndebele. Later upgraded the Amharic and Swahili files from partial to near-complete Bibles.
- Set the app up to be packaged as a real Android app (using a tool called Capacitor, which wraps a web app into something installable from the Play Store) and connected it to the actual Play Store signing credentials, fixing an app ID mismatch along the way.
- Added a full Ewe-language Bible (spoken in Ghana/Togo), sourced from eBible.org.

### June 9–10, 2026 — Polish and bug hunting
- Added Haitian Creole as a supported language, and made sure every language's book list (Genesis, Exodus, etc.) shows book names *in that language*, not just English.
- Fixed two data-accuracy bugs (two Old Testament books were mislabeled internally), added a stronger offline cache for the Haitian Creole translation specifically, and made the download script more resilient to bad data going forward.
- Fixed a mobile-specific display bug where the header would overflow on small screens.

### June 19, 2026 — Renaming and rebranding
- Renamed the app from "WordUp Africa Bible Reader" to **"Bible in African Languages"** — a clearer, more descriptive name — and gave it a proper icon. Cleaned up leftover references to the old name across the codebase.

### August 21–22, 2026 — Adding more mainstream translations, and switching hosting
- After about a two-month gap, added English and Arabic translations, plus the ability to search the *entire* Bible at once (not just one chapter), along with several mobile usability fixes.
- **Moved web hosting from Netlify to Cloudflare** (specifically, "Cloudflare Workers" serving static files) — a different hosting provider. Along the way, fixed how the app handles direct links to inner pages (a classic single-page-app routing gotcha: the new host needed a different setting to know "this isn't a real folder, just show the app anyway").

### September 4, 2026 — Adding real, licensed, mainstream translations
- Added three widely-used, **copyrighted** translations: the New Living Translation (NLT), the Amplified Bible (AMP), and the NIV. Unlike the 19 free translations, these can't legally be bundled into the app for everyone to download — so instead, each chapter is fetched live, on demand, through a paid service called api.bible.
- Built this as a small proxy: the app asks *our* server for a chapter, our server asks api.bible (using a secret key that never reaches the visitor's browser — learning directly applied from June 4's security fix), and hands back just the verse text.
- **Built it to work identically on both hosting providers** — the proxy logic itself lives in one shared file, with a thin adapter for Cloudflare and a separate thin adapter for Netlify, so the app behaves the same no matter which one is actually serving it at the time.
- Also fixed a couple of small infrastructure snags: the app had stopped updating for existing users because the "please refresh, there's a new version" cache-versioning number hadn't been bumped, and the hosting provider's build system needed a newer Node.js version than the app was pinned to.

---

## Where things stand today

- **19 languages/translations** are fully bundled and work with zero internet: 11 African languages (Yoruba, Igbo, Hausa, Twi, Nigerian Pidgin, Afrikaans, Amharic, Swahili, Shona, Ndebele, Ewe), Haitian Creole, Arabic, and 6 English/French classics.
- **3 more translations** (NLT, AMP, NIV) work only when online, since they're licensed rather than free.
- The app ships on the **web** (Cloudflare) and as an **Android app** (Play Store-ready, signed).
- No AI, no accounts, no API keys visible to end users — the only "server" involvement left is the small proxy for the 3 licensed translations.
