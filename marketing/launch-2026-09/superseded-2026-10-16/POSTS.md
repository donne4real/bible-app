# Launch announcement — Bible in African Languages

**Play Store link (use this everywhere):**
https://play.google.com/store/apps/details?id=com.wordupafrica.biblereader

(The `&pcampaignid=web_share` part of the link Google gives you is only a tracking tag, so it's left off to keep the link short.)

## Which image goes where

| Platform | What to post | Images |
|---|---|---|
| Instagram feed | Carousel (swipe post) | 1 → 2 → 3 → 4 → 5 |
| Instagram Story | Single story + **link sticker** | `story-…1080x1920.png` |
| Facebook feed | Multi-photo post | 1 → 2 → 3 → 4 → 5 (or just `square-…png`) |
| Facebook Story | Single story + link sticker | `story-…1080x1920.png` |
| WhatsApp Status | Image + caption | `story-…1080x1920.png` |
| WhatsApp chats / groups | Image + message | `square-…1080x1080.png` |

Slide 5 and the square image carry a QR code. People can scan it when the image is shown on another screen, or printed (church bulletin, flyer).

---

## Instagram — feed carousel caption

> Instagram doesn't make links in captions clickable. Put the Play Store link in your bio first, then post.

```
The Bible, in your mother tongue. 📖

Bible in African Languages is now free on Google Play.

Read Scripture in Yorùbá, Igbo, Hausa, Pidgin, Swahili, Twi, Amharic, Ewe and more — 22 translations in one app.

✅ Works without internet (19 translations built in)
✅ Put Yorùbá and English side by side, verse by verse
✅ Highlights, notes and bookmarks
✅ Search the whole Bible and share verses as images
✅ Free. No ads. No sign-up.

Swipe to see Psalm 119:105 in eight languages 👉

📲 Download: link in bio, or search "Bible in African Languages" on Google Play.

Tag someone who prays in their mother tongue 🙏🏾

#BibleInAfricanLanguages #Bible #BibleApp #YorubaBible #BibeliMimo #IgboBible #HausaBible #PidginBible #SwahiliBible #AfricanChristians #Scripture #WordOfGod
```

## Instagram / Facebook Story

1. Post `story-instagram-facebook-whatsapp-status-1080x1920.png`.
2. Add a **Link sticker** with the Play Store link, and set its text to **Download free**.
3. Place the sticker in the **dark gap between the language list and the phone**.

---

## Facebook — feed post

```
📖 The Bible, in your mother tongue.

I built a free app so our families can read God's Word in the languages we pray in. Bible in African Languages is now on Google Play:
👉 https://play.google.com/store/apps/details?id=com.wordupafrica.biblereader

• 22 translations — Yorùbá, Igbo, Hausa, Pidgin, Swahili, Twi, Amharic, Ewe, Afrikaans, Ndebele, Shona, plus English (KJV, WEB and more), French, Arabic and Haitian Creole
• Works offline — no data needed to read (19 translations are built in)
• Compare two translations side by side — great for learning, teaching children, and following along in church
• Highlights, notes and bookmarks
• Search the whole Bible and share any verse as an image
• Free, no ads, no sign-up

Please download it, and share this post with someone who would love to read the Bible in their own language. 🙏🏾
```

---

## WhatsApp — message for chats and groups

Send `square-whatsapp-facebook-1080x1080.png` first, then this message (or paste it as the image caption):

```
📖 *The Bible, in your mother tongue*

I'm happy to share *Bible in African Languages* — a free app on Google Play with 22 translations: Yorùbá, Igbo, Hausa, Pidgin, Swahili, Twi, Amharic, Ewe and more.

✅ Reads *without internet*
✅ Yorùbá and English *side by side*
✅ Highlights, notes, bookmarks
✅ Free · No ads · No sign-up

Download here 👇
https://play.google.com/store/apps/details?id=com.wordupafrica.biblereader

Please forward to your family and church groups 🙏🏾
```

## WhatsApp Status caption

Post `story-instagram-facebook-whatsapp-status-1080x1920.png` with this caption. Links in Status captions are clickable.

```
The Bible in Yorùbá, Igbo, Hausa, Pidgin & more — free, works offline 📖
https://play.google.com/store/apps/details?id=com.wordupafrica.biblereader
```

---

## Posting tips
- Put the Play Store link in your Instagram bio **before** you post the carousel.
- Post the carousel, then share it to your Story right away. Use the Story image, or share the post itself.
- Ask 3–5 friends from different language groups to share it on day one. Early shares help the post reach more people.
- Pin the Facebook post to your profile or page for a week.

## Editing the images
The source is in `source/`. Edit `slides.html`, then re-render each image with:

```
cd source
python -m http.server 8766
node shoot.mjs "http://localhost:8766/slides.html?s=cover" out-cover.png 1080 1350 1 0 5000
```

Slide ids: `cover`, `verse`, `compare`, `inside`, `getit` (1080×1350), `story` (1080×1920), `square` (1080×1080).
