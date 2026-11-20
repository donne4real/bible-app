# Bible in African Languages — Owner's guide

Everything you need to run, deploy, and maintain the Bible app.

## 1. The moving parts

| Part | What it does | Where you manage it |
|---|---|---|
| **GitHub repository** `donne4real/bible-app` (public) | Holds the code, iOS CI/CD, and GitHub Pages docs | github.com → the repo |
| **Cloudflare Workers** | Hosts the live site at bible-app.leyesapps.workers.dev | dash.cloudflare.com → Workers |
| **Cloudflare D1** | Database for optional cloud sync | dash.cloudflare.com → D1 |
| **Apple Developer** ($99/yr) | iOS distribution certificate + provisioning profile | developer.apple.com |
| **App Store Connect** | TestFlight + App Store submission | appstoreconnect.apple.com |
| **GitHub Actions** | Builds, signs, and uploads iOS builds automatically | github.com → repo → Actions |
| **Your PC** | Local development | `Vibe Coding\Claude\bible-app` |

## 2. Costs

| Service | Plan | Cost |
|---|---|---|
| Cloudflare Workers | Free | $0 |
| Cloudflare D1 | Free | $0 |
| GitHub Actions (public repo) | Free macOS minutes | $0 |
| Apple Developer Program | Annual | $99/yr |
| Domain (leyesapps.workers.dev) | Cloudflare subdomain | $0 |
| **Total** | | **$99/yr** |

## 3. Deployment (web)

```bash
npm run deploy
```

This builds the app and deploys to Cloudflare Workers. The site is live within seconds.

**Environment variables** (set in Cloudflare dashboard → Workers → Settings → Variables):

| Variable | Required | Description |
|---|---|---|
| `API_BIBLE_KEY` | For NLT/AMP/NIV | [api.bible](https://scripture.api.bible/) API key |
| `JWT_SECRET` | For sync | Secret for signing sync JWT tokens |

## 4. iOS builds

### Signed build pipeline (automatic)

The repo has a GitHub Actions workflow that builds, signs, and uploads to TestFlight — **no Mac needed**.

**To trigger a build:**
```bash
gh workflow run ios-signed-build.yml -f version=2.4.1 -f build_number=1 -f upload=true
```

Or via GitHub UI: Actions → iOS Signed Build → Run workflow.

**What it does:**
1. Builds the web app
2. Adds iOS platform (Capacitor)
3. Generates app icons
4. Imports signing certificate + provisioning profile
5. Archives and signs the IPA
6. Uploads to TestFlight (if `upload=true`)

### GitHub secrets required

| Secret | Value |
|---|---|
| `BUILD_CERTIFICATE_BASE64` | SHA1-compatible p12 (base64) |
| `P12_PASSWORD` | `BibleApp2026!` |
| `KEYCHAIN_PASSWORD` | `KeychainPass2026!` |
| `TEAM_ID` | `4268AM9U37` |
| `PROVISIONING_PROFILE_BASE64` | Provisioning profile (base64) |
| `APPSTORE_ISSUER_ID` | App Store Connect Issuer ID (variable) |
| `APPSTORE_API_KEY_ID` | App Store Connect Key ID (variable) |
| `APPSTORE_API_PRIVATE_KEY` | AuthKey .p8 file contents (secret) |

### App Store submission checklist

- [x] App record created (Bundle ID: `com.leyesapps.bibleapp`)
- [x] API key created (App Manager role)
- [x] GitHub secrets configured
- [x] Privacy policy: [donne4real.github.io/bible-app/](https://donne4real.github.io/bible-app/)
- [x] Support page: [donne4real.github.io/bible-app/support.html](https://donne4real.github.io/bible-app/support.html)
- [x] Screenshots uploaded (iPhone + iPad)
- [x] App description, keywords, promotional text
- [x] Age ratings completed
- [x] Export compliance: "None of the algorithms mentioned above"
- [x] Third-party content: "Yes, with necessary rights"
- [x] **Submitted for review** ✅

## 5. Android builds

```bash
npm run android:sync    # Build web + sync to Android project
npm run android:open    # Open in Android Studio
```

Signing config in `android/keystore.properties` (not committed to git).

## 6. Checking that it's working

- **The site:** [bible-app.leyesapps.workers.dev](https://bible-app.leyesapps.workers.dev) — should load instantly
- **GitHub Actions:** Check the Actions tab for any failed builds
- **TestFlight:** [appstoreconnect.apple.com](https://appstoreconnect.apple.com) → TestFlight tab

## 7. When something goes wrong

| Symptom | Likely cause | What to do |
|---|---|---|
| Site shows stale content | Service worker cache | Bump `CACHE_NAME` in `public/sw.js` and redeploy |
| Remote translations fail | `API_BIBLE_KEY` expired | Get new key from api.bible, update Cloudflare variable |
| Sync not working | `JWT_SECRET` changed or D1 issue | Check Cloudflare Workers logs |
| iOS build fails | Certificate expired or secret wrong | Check Actions logs; regenerate p12 if needed |
| App Store review rejected | Metadata issue | Read rejection reason, fix, resubmit |

## 8. Maintenance

- **Once a year:** Renew Apple Developer membership ($99)
- **Once a year:** Check dependency updates: `npm outdated`, update, test, push
- **As needed:** Add new translations, update daily verses, expand cross-references
- **Service worker:** Bump `CACHE_NAME` version after major changes to force client updates

## 9. Making changes

The simplest way is to ask your coding agent (in this project folder) for the change. For hands-on work, see the [Developer guide](developer-guide.md).

| Command | Does |
|---|---|
| `npm run dev` | Start dev server |
| `npm test` | Run tests |
| `npm run build` | Production build |
| `npm run deploy` | Build + deploy to Cloudflare |
| `gh workflow run ios-signed-build.yml -f version=X.Y.Z -f build_number=N -f upload=true` | Build + upload to TestFlight |

Always `git pull` before editing — the iOS bot commits to `main` after each build.
