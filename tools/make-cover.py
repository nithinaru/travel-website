#!/usr/bin/env python3
"""Draws the link-preview cover: the name, the year, and the line of trips.

Run after changing trips or photos:  python3 tools/make-cover.py
"""
import os, re
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H = 1200, 630
MARGIN = 76
BASELINE = H - 62          # the line the photos stand on
MAX_H = 330                # the tallest a photo may stand
GAP = 26
NAME = 'Nithin Aruswamy'
YEAR = '2026'

def font(size, bold=False):
    for path, idx in (('/System/Library/Fonts/Helvetica.ttc', 1 if bold else 0),
                      ('/System/Library/Fonts/Supplemental/Arial.ttf', 0)):
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size, index=idx)
            except Exception:
                pass
    return ImageFont.load_default()

# pull the trips straight out of data.js, in the order they appear
src = open(os.path.join(ROOT, 'js', 'data.js')).read()
trips = []
for m in re.finditer(
        r'image:\s*"([^"]+)",\s*\n\s*width:\s*(\d+),\s*\n\s*height:\s*(\d+),\s*\n\s*scale:\s*([\d.]+)',
        src):
    trips.append((m.group(1), int(m.group(2)), int(m.group(3)), float(m.group(4))))

canvas = Image.new('RGB', (W, H), 'white')
draw = ImageDraw.Draw(canvas)

x = MARGIN
for path, w, h, scale in trips:
    if x > W:
        break
    full = os.path.join(ROOT, path)
    if not os.path.exists(full):
        continue
    ph = int(MAX_H * scale)
    pw = max(1, int(ph * w / h))
    shot = Image.open(full).convert('RGB').resize((pw, ph), Image.LANCZOS)
    canvas.paste(shot, (x, BASELINE - ph))
    x += pw + GAP

# the header sits over the top, exactly as it does on the site
draw.rectangle([0, 0, W, 232], fill='white')
title = font(54)
draw.text((MARGIN, 96), NAME, font=title, fill=(0, 0, 0))
draw.text((MARGIN, 96 + 64), YEAR, font=title, fill=(0, 0, 0))

out = os.path.join(ROOT, 'og-cover.jpg')
canvas.save(out, 'JPEG', quality=88, optimize=True)
print('wrote', out, os.path.getsize(out) // 1024, 'KB', canvas.size)
