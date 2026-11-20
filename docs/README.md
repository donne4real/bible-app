# Bible in African Languages — Documentation

A fast, offline-first Bible reader with 22 translations in African and world languages. Built with React, TypeScript, and Tailwind CSS. Deployed on Cloudflare Workers with optional cloud sync via Cloudflare D1.

**Live:** [bible-app.leyesapps.workers.dev](https://bible-app.leyesapps.workers.dev) · **Code:** [github.com/donne4real/bible-app](https://github.com/donne4real/bible-app) · **Running cost:** $0 (Cloudflare free tier)

## Which guide do I need?

| If you are… | Read | It covers |
|---|---|---|
| **Someone using the app** | [User guide](user-guide.md) | Reading, study tools, sync, themes, reading plans, sharing |
| **The owner** | [Owner's guide](owner-guide.md) | Deployment, iOS builds, App Store submission, costs, accounts |
| **A developer** (or an AI assistant) maintaining it | [Developer guide](developer-guide.md) | Architecture, data flow, hooks, testing, adding translations |

## The one-minute version

```
┌─────────────────────────────────────────────────────────────┐
│  Bible in African Languages v2.4.1                          │
│                                                             │
│  22 translations  ·  Offline-first  ·  Cloud sync           │
│  19 bundled JSON  ·  3 remote (api.bible)                   │
│                                                             │
│  Deploy: Cloudflare Workers (static + API proxy)            │
│  Database: Cloudflare D1 (sync, optional)                   │
│  Mobile: Capacitor (iOS via GitHub Actions, Android local)  │
│  Cost: $0 (free tiers) + $99/yr Apple Developer             │
└─────────────────────────────────────────────────────────────┘
```

- **22 translations** — 19 bundled offline (~90MB total), 3 fetched remotely (NLT, AMP, NIV)
- **Offline-first** — works without internet; sync is optional
- **Study tools** — highlights, notes, bookmarks, cross-references, reading plans
- **Cloud sync** — optional cross-device sync via Cloudflare D1
- **iOS** — signed builds via GitHub Actions, uploaded to TestFlight automatically
- **Android** — Capacitor wrapper, built locally with Android Studio

## Other documents

- **Roadmap** (completed + planned features): [`../ROADMAP.md`](../ROADMAP.md)
- **Changelog** (version history): [`../CHANGELOG.md`](../CHANGELOG.md)
- **iOS build setup** (detailed): [`../IOS-SETUP.md`](../IOS-SETUP.md)
- **Privacy policy** (live page): [donne4real.github.io/bible-app/](https://donne4real.github.io/bible-app/)
- **Support page** (live page): [donne4real.github.io/bible-app/support.html](https://donne4real.github.io/bible-app/support.html)
- **Project README** (quick setup): [`../README.md`](../README.md)

*Documentation written November 20, 2026.*
