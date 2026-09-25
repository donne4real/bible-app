from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "instagram-announcement-1080x1080.png"
ICON = ROOT / "icon-play-store-512.png"
W = H = 1080
NAVY, BURNT = (2, 6, 23), (124, 45, 18)
PARCH, PARCH2 = (255, 247, 232), (246, 232, 205)
INK, MUTED, AMBER, GOLD, WHITE = (30, 20, 12), (102, 72, 43), (217, 119, 6), (251, 191, 36), (255, 255, 255)
FDIR = Path(r"C:\Windows\Fonts")
FONTS = {
    "sb": ["georgiab.ttf", "timesbd.ttf", "arialbd.ttf"],
    "s": ["georgia.ttf", "times.ttf", "arial.ttf"],
    "u": ["segoeui.ttf", "calibri.ttf", "arial.ttf"],
    "ub": ["segoeuib.ttf", "calibrib.ttf", "arialbd.ttf"],
}

def font(kind, size):
    for name in FONTS[kind]:
        p = FDIR / name
        if p.exists():
            return ImageFont.truetype(str(p), size=size)
    return ImageFont.load_default()

def ts(d, text, f):
    b = d.textbbox((0, 0), text, font=f)
    return b[2] - b[0], b[3] - b[1]

def fit(d, text, kind, size, maxw):
    while size > 22:
        f = font(kind, size)
        if ts(d, text, f)[0] <= maxw:
            return f
        size -= 2
    return font(kind, 22)

def center(d, y, text, f, fill, maxw=None, kind="ub"):
    if maxw:
        f = fit(d, text, kind, f.size, maxw)
    w, h = ts(d, text, f)
    d.text(((W - w) / 2, y), text, font=f, fill=fill)
    return y + h

def wrap(d, text, f, maxw):
    lines, cur = [], ""
    for word in text.split():
        trial = word if not cur else cur + " " + word
        if ts(d, trial, f)[0] <= maxw:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines

def grad(size, top, bottom):
    im = Image.new("RGB", size, top)
    px = im.load()
    for y in range(size[1]):
        t = y / (size[1] - 1)
        c = tuple(int(top[i] * (1 - t) + bottom[i] * t) for i in range(3))
        for x in range(size[0]):
            px[x, y] = c
    return im

def glow(im, center, radius, color, alpha):
    ov = Image.new("RGBA", im.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    x, y = center
    od.ellipse((x-radius, y-radius, x+radius, y+radius), fill=color + (alpha,))
    im.alpha_composite(ov.filter(ImageFilter.GaussianBlur(radius // 2)))

def rounded_icon(size=300, radius=68):
    icon = Image.open(ICON).convert("RGBA").resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size, size), radius=radius, fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(icon, (0, 0), mask)
    return out

def chip(d, x, y, text, f):
    px, py = 18, 12
    tw, th = ts(d, text, f)
    w, h = tw + px * 2, th + py * 2
    d.rounded_rectangle((x, y, x+w, y+h), radius=h//2, fill=WHITE, outline=(226, 190, 128), width=2)
    d.text((x+px, y+py-2), text, font=f, fill=(104, 63, 22))
    return w

def main():
    im = grad((W, H), NAVY, BURNT).convert("RGBA")
    glow(im, (540, 180), 330, GOLD, 54)
    glow(im, (880, 930), 300, (2, 132, 199), 42)
    glow(im, (150, 850), 280, AMBER, 38)
    d = ImageDraw.Draw(im)
    sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle((72, 74, W-56, H-42), radius=64, fill=(0, 0, 0, 100))
    im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(22)))
    d.rounded_rectangle((64, 58, W-64, H-58), radius=64, fill=PARCH)
    d.rounded_rectangle((74, 68, W-74, H-68), radius=54, outline=(218, 164, 75), width=3)
    d.rounded_rectangle((104, 104, W-104, H-104), radius=44, fill=PARCH2)

    bf = font("ub", 28)
    bw, bh = ts(d, "NOW LIVE", bf)
    bx, by = (W-bw)/2, 128
    d.rounded_rectangle((bx-24, by-12, bx+bw+24, by+bh+12), radius=25, fill=AMBER)
    d.text((bx, by-4), "NOW LIVE", font=bf, fill=WHITE)
    icon = rounded_icon()
    im.alpha_composite(icon, ((W-icon.width)//2, 178))

    y = center(d, 512, "Bible in African Languages", font("sb", 72), INK, 860, "sb") + 14
    sf = font("u", 36)
    for line in wrap(d, "Offline-first Scripture reading with 22 translations — African and world languages.", sf, 790):
        y = center(d, y, line, sf, MUTED) + 8
    cf = font("ub", 26)
    labels = ["22 translations", "Offline-first", "Highlights + notes", "Verse cards"]
    widths = [ts(d, c, cf)[0] + 36 for c in labels]
    x = (W - (sum(widths) + 12 * 3)) / 2
    y += 22
    for label, w in zip(labels, widths):
        chip(d, x, y, label, cf)
        x += w + 12

    vy = y + 104
    d.rounded_rectangle((150, vy, W-150, vy+166), radius=34, fill=(255, 252, 244), outline=(221, 184, 116), width=2)
    vf = font("s", 39)
    for i, line in enumerate(wrap(d, "“Your word is a lamp to my feet and a light to my path.”", vf, 690)):
        center(d, vy + 30 + i*48, line, vf, (69, 42, 18))
    center(d, vy+126, "Psalm 119:105", font("ub", 28), AMBER)
    center(d, H-128, "Try it: bible-app.leyesapps.workers.dev", font("ub", 34), (120, 53, 15), 880, "ub")
    im.convert("RGB").save(OUT, quality=95)
    print(OUT)

if __name__ == "__main__":
    main()
