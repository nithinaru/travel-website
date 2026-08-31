#!/usr/bin/env python3
"""Generates the placeholder trip images in ../images.

These are stand-ins so the layout has something to show. Delete them and drop
your own photos into images/ (then update js/data.js) when you add real trips.
"""
import math
import os
import random

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "images")

# name, width, height, kind, palette (sky top, sky bottom, sun, layer colours...)
SCENES = [
    ("tokyo",       900, 1500, "city",     ["#1b2a4a", "#7d5a8c", "#f0a5a0", "#ffd9b0", ["#3d3357", "#2a2340", "#171426"]]),
    ("patagonia",  2200, 1500, "mountain", ["#bcd6e8", "#f3e2d0", "#fff3d6", "#ffffff", ["#8fa8be", "#5f7a8e", "#3b4d61"]]),
    ("lisbon",     1500, 1500, "city",     ["#f6d9b8", "#f0a878", "#fff0c9", "#ffe2b0", ["#c9835f", "#a2604a", "#6f3f36"]]),
    ("marrakech",  2000, 1300, "desert",   ["#f6c99a", "#e98f5f", "#fff1cf", "#ffd9a0", ["#d98a58", "#b96a43", "#8a4a30"]]),
    ("iceland",    2200, 1400, "mountain", ["#0d1b33", "#1f3f5c", "#8de8c8", "#c9f7e6", ["#1b3350", "#12243a", "#0a1626"]]),
    ("amalfi",     1000, 1500, "coast",    ["#7ec8e8", "#dff1f7", "#fff6d8", "#ffffff", ["#3f8fb5", "#2c6f92", "#1d4f6b"]]),
    ("capetown",   2000, 1350, "mountain", ["#f2b8a0", "#f7dfc9", "#fff2d2", "#ffe0bb", ["#9a6f78", "#6f5261", "#463847"]]),
    ("bali",       1500, 1500, "forest",   ["#dff0d8", "#a8cf9a", "#fff5cf", "#ffffff", ["#6f9c62", "#4e7a49", "#2f5232"]]),
    ("peru",       1900, 1500, "mountain", ["#cfe3f0", "#f0e6d8", "#fff6de", "#ffffff", ["#8b9aa8", "#6a7684", "#49535f"]]),
    ("newzealand", 2100, 1300, "coast",    ["#8fd0e0", "#e6f4f2", "#fffae0", "#ffffff", ["#4f9c93", "#377a75", "#22534f"]]),
]


def hillpath(w, h, base, amp, seed, steps=14):
    rnd = random.Random(seed)
    pts = []
    for i in range(steps + 1):
        x = w * i / steps
        y = base + math.sin(i * 0.9 + seed) * amp * 0.5 + rnd.uniform(-amp * 0.5, amp * 0.5)
        pts.append((x, y))
    d = "M -20 %.1f " % pts[0][1]
    for i in range(1, len(pts)):
        x0, y0 = pts[i - 1]
        x1, y1 = pts[i]
        cx = (x0 + x1) / 2
        d += "C %.1f %.1f %.1f %.1f %.1f %.1f " % (cx, y0, cx, y1, x1, y1)
    d += "L %.1f %.1f L -20 %.1f Z" % (w + 20, h + 20, h + 20)
    return d


def peaks(w, h, base, height, seed, n=5):
    rnd = random.Random(seed)
    d = "M -20 %.1f " % base
    step = (w + 40) / n
    x = -20
    for i in range(n):
        pw = step * rnd.uniform(0.7, 1.3)
        ph = height * rnd.uniform(0.55, 1.0)
        d += "L %.1f %.1f L %.1f %.1f " % (x + pw / 2, base - ph, x + pw, base)
        x += pw
    d += "L %.1f %.1f L %.1f %.1f L -20 %.1f Z" % (w + 20, base, w + 20, h + 20, h + 20)
    return d


def skyline(w, h, base, seed):
    rnd = random.Random(seed)
    d = "M -20 %.1f " % base
    x = -20
    while x < w + 20:
        bw = rnd.uniform(w * 0.03, w * 0.09)
        bh = rnd.uniform(h * 0.06, h * 0.30)
        d += "L %.1f %.1f L %.1f %.1f L %.1f %.1f " % (x, base - bh, x + bw, base - bh, x + bw, base)
        x += bw + rnd.uniform(2, w * 0.012)
    d += "L %.1f %.1f L -20 %.1f Z" % (w + 20, h + 20, h + 20)
    return d


def build(name, w, h, kind, pal):
    top, bottom, sun, sun2, layers = pal
    horizon = h * (0.62 if kind != "city" else 0.70)
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d">' % (w, h, w, h),
        '<defs>',
        '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">'
        '<stop offset="0%%" stop-color="%s"/><stop offset="100%%" stop-color="%s"/></linearGradient>' % (top, bottom),
        '<radialGradient id="sun" cx="50%%" cy="50%%" r="50%%">'
        '<stop offset="0%%" stop-color="%s" stop-opacity="1"/>'
        '<stop offset="60%%" stop-color="%s" stop-opacity="0.55"/>'
        '<stop offset="100%%" stop-color="%s" stop-opacity="0"/></radialGradient>' % (sun2, sun, sun),
        '<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3"/>'
        '<feColorMatrix type="saturate" values="0"/></filter>',
        '</defs>',
        '<rect width="%d" height="%d" fill="url(#sky)"/>' % (w, h),
    ]
    sr = min(w, h) * 0.30
    parts.append('<circle cx="%.0f" cy="%.0f" r="%.0f" fill="url(#sun)"/>' % (w * 0.68, horizon * 0.55, sr))
    parts.append('<circle cx="%.0f" cy="%.0f" r="%.0f" fill="%s" opacity="0.85"/>' % (w * 0.68, horizon * 0.55, sr * 0.24, sun2))

    seed = sum(ord(c) for c in name)
    for i, colour in enumerate(layers):
        base = horizon + (h - horizon) * (i * 0.30)
        if kind == "mountain":
            d = peaks(w, h, base, (h - horizon) * (0.85 - i * 0.2), seed + i * 7, 4 + i)
        elif kind == "city":
            d = skyline(w, h, base, seed + i * 11)
        else:
            d = hillpath(w, h, base, (h - horizon) * (0.16 - i * 0.03), seed + i * 5)
        parts.append('<path d="%s" fill="%s"/>' % (d, colour))

    if kind == "coast":
        parts.append('<rect x="0" y="%.0f" width="%d" height="%.0f" fill="%s" opacity="0.35"/>'
                     % (horizon, w, h - horizon, layers[0]))
    parts.append('<rect width="%d" height="%d" filter="url(#grain)" opacity="0.045"/>' % (w, h))
    parts.append('</svg>')
    return "".join(parts)


os.makedirs(OUT, exist_ok=True)
for name, w, h, kind, pal in SCENES:
    path = os.path.join(OUT, name + ".svg")
    with open(path, "w") as f:
        f.write(build(name, w, h, kind, pal))
    print("wrote", os.path.relpath(path))
