# iOS Build Setup Guide

This guide explains how to set up iOS builds for the Bible app using GitHub Actions.

---

## Overview

We have two GitHub Actions workflows:

1. **ios-build.yml** — Builds unsigned IPA (for testing)
2. **ios-signed-build.yml** — Builds signed IPA (for App Store submission)

---

## Workflow 1: Unsigned Build (Testing)

### What it does:
- Builds the web app
- Adds iOS platform to Capacitor
- Creates an unsigned IPA
- Uploads as GitHub artifact

### How to use:
1. Push to `main` branch or trigger manually
2. Go to **Actions** tab in GitHub
3. Click **iOS Build** workflow
4. Download the `bible-app-ios-unsigned.ipa` artifact

### Limitations:
- Cannot be installed on real devices (unsigned)
- Cannot be submitted to App Store
- Good for testing build process

---

## Workflow 2: Signed Build (App Store)

### What it does:
- Builds the web app
- Imports your signing certificate
- Creates a signed IPA
- Ready for App Store submission

### Prerequisites:

#### 1. Apple Developer Account ($99/year)
- Sign up at [developer.apple.com](https://developer.apple.com)
- Required for code signing and App Store submission

#### 2. Create Distribution Certificate
1. Go to [Apple Developer Certificates](https://developer.apple.com/account/resources/certificates/list)
2. Click **+** to create new certificate
3. Select **Apple Distribution** (for App Store)
4. Follow instructions to create CSR (Certificate Signing Request)
5. Download the `.cer` file

#### 3. Create App ID
1. Go to [App IDs](https://developer.apple.com/account/resources/identifiers/list/appId)
2. Click **+** to register new App ID
3. Select **App** → Continue
4. Enter:
   - **Bundle ID:** `com.leyesapps.bible` (or your chosen ID)
   - **Capabilities:** Enable what you need (Push Notifications, etc.)

#### 4. Create Distribution Provisioning Profile
1. Go to [Profiles](https://developer.apple.com/account/resources/profiles/list)
2. Click **+** to create new profile
3. Select **App Store Connect** → Continue
4. Select your App ID
5. Select your Distribution Certificate
6. Name it (e.g., "Bible App Distribution")
7. Download the `.mobileprovision` file

#### 5. Export Certificate as .p12
1. Open **Keychain Access** on Mac
2. Find your distribution certificate
3. Right-click → **Export**
4. Save as `.p12` file
5. Set a password (remember it!)

#### 6. Convert Certificate to Base64
On your Mac, run:
```bash
base64 -i certificate.p12 | pbcopy
```
This copies the base64 string to clipboard.

---

### GitHub Secrets Setup

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `BUILD_CERTIFICATE_BASE64` | Base64-encoded .p12 certificate |
| `P12_PASSWORD` | Password you set when exporting .p12 |
| `KEYCHAIN_PASSWORD` | Any password (e.g., "temp123") |
| `TEAM_ID` | Your Apple Developer Team ID (found in [Membership Details](https://developer.apple.com/account#MembershipDetailsCard)) |

---

### How to trigger signed build:

1. Go to **Actions** tab in GitHub
2. Click **iOS Signed Build** workflow
3. Click **Run workflow**
4. Enter version (e.g., `1.0.0`) and build number (e.g., `1`)
5. Click **Run workflow**
6. Download the signed IPA from artifacts

---

## Submitting to App Store

### Option A: Using Transporter (Mac required)
1. Download [Transporter](https://apps.apple.com/us/app/transporter/id1450874784) from Mac App Store
2. Open Transporter
3. Drag the IPA file into Transporter
4. Click **Deliver**

### Option B: Using Xcode (Mac required)
1. Open Xcode
2. Window → Organizer
3. Drag IPA file
4. Click **Distribute App**

### Option C: Using altool (command line)
```bash
xcrun altool --upload-app -f bible-app.ipa -t ios --apiKey YOUR_API_KEY --apiIssuer YOUR_ISSUER_ID
```

---

## Updating capacitor.config.ts for iOS

Add iOS-specific configuration:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.leyesapps.bible',
  appName: 'Bible in African Languages',
  webDir: 'dist',
  ios: {
    scheme: 'Bible in African Languages',
    // Add iOS-specific settings here
  },
  // ... other config
};

export default config;
```

---

## Troubleshooting

### Build fails with "No signing certificate found"
- Check that `BUILD_CERTIFICATE_BASE64` secret is set correctly
- Verify the .p12 password is correct

### Build fails with "No matching provisioning profile"
- Ensure App ID bundle ID matches your app's bundle ID
- Check that the provisioning profile is for Distribution (not Development)

### CocoaPods install fails
- Try adding `pod repo update` before `pod install`

### xcodebuild fails
- Check Xcode version compatibility
- Ensure iOS deployment target is set correctly in capacitor.config.ts

---

## Cost Summary

| Item | Cost |
|------|------|
| Apple Developer Account | $99/year |
| GitHub Actions (macOS runners) | Free (2,000 min/month) |
| Additional minutes | ~$0.008/minute |

---

## Next Steps

1. ✅ GitHub Actions workflows created
2. ⏳ Get Apple Developer account
3. ⏳ Create certificates and provisioning profiles
4. ⏳ Add GitHub secrets
5. ⏳ Run signed build workflow
6. ⏳ Submit to App Store

---

## Alternative: No Mac, No Certificates

If you don't want to deal with certificates yet:
- Use the **unsigned build** workflow for testing
- The unsigned IPA can be run in iOS Simulator
- For real device testing, you'll eventually need certificates

---

## Support

- [Capacitor iOS Docs](https://capacitorjs.com/docs/ios)
- [Apple Code Signing Guide](https://developer.apple.com/support/code-signing/)
- [GitHub Actions macOS](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources)
