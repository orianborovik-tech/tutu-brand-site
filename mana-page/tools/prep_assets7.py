#!/usr/bin/env python3
"""Pass 7: profile-based letter split for wordmark repair + white-island sprite filter."""
import os, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
import potrace, cairosvg

SRC = os.path.join(os.path.dirname(__file__), '..', 'assets-src')
OUT_PUB = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets')
OUT_BLD = os.path.join(os.path.dirname(__file__), '..', 'build')
label = Image.open(f'{SRC}/MANA_canette_melon_mint_mat.png').convert('RGB')

def disk(r):
    y, x = np.ogrid[-r:r + 1, -r:r + 1]
    return (x * x + y * y <= r * r)

# ---------- base mask ----------
crop = label.crop((770, 545, 1235, 1750)).rotate(90, expand=True)
m = (np.array(crop.convert('L')) > 200).astype(np.uint8)
lbl, n = ndimage.label(m)
sizes = ndimage.sum(m, lbl, range(1, n + 1))
keep = {i + 1 for i, s in enumerate(sizes) if s > 30000}
mask = np.isin(lbl, list(keep))
mask = ndimage.binary_opening(mask, structure=disk(6))
mask = ndimage.binary_closing(mask, structure=disk(9))
H, W = mask.shape

# ---------- letter boundaries from column profile ----------
prof = mask.sum(axis=0).astype(float)
def valley(lo, hi):
    seg = prof[int(W * lo):int(W * hi)]
    return int(W * lo) + int(np.argmin(seg))
b1, b2, b3 = valley(0.20, 0.36), valley(0.44, 0.60), valley(0.68, 0.84)
print('letter boundaries:', b1, b2, b3, 'of', W)

# ---------- repair: N top bite (between b2..b3) local closing ----------
region = mask[0:150, b2:b3].copy()
region = ndimage.binary_closing(region, structure=disk(22))
mask[0:150, b2:b3] = region

# ---------- repair: replace final A with clean first A ----------
A1 = mask[:, b1:b2].copy()
ys, xs = np.where(A1)
a1x0, a1x1 = xs.min(), xs.max()
ys2, xs2 = np.where(mask[:, b3:])
a2x0 = b3 + (xs2.min() if len(xs2) else 5)
mask[:, b3:] = False
a1w = a1x1 - a1x0 + 1
dst1 = min(W, a2x0 + a1w)
mask[:, a2x0:dst1] |= A1[:, a1x0:a1x0 + (dst1 - a2x0)]

Image.fromarray((mask * 255).astype(np.uint8)).resize((600, 232)).save(f'{OUT_BLD}/mask_repaired3.png')
path = potrace.Bitmap(mask).trace(turdsize=50, alphamax=1.0, opticurve=1, opttolerance=0.25)
d = []
for curve in path:
    s = curve.start_point
    d.append(f'M{s.x:.1f},{s.y:.1f}')
    for seg in curve:
        if seg.is_corner:
            c, e = seg.c, seg.end_point
            d.append(f'L{c.x:.1f},{c.y:.1f}L{e.x:.1f},{e.y:.1f}')
        else:
            c1, c2, e = seg.c1, seg.c2, seg.end_point
            d.append(f'C{c1.x:.1f},{c1.y:.1f} {c2.x:.1f},{c2.y:.1f} {e.x:.1f},{e.y:.1f}')
    d.append('Z')
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">'
       f'<path d="{"".join(d)}" fill="#fff" fill-rule="evenodd"/></svg>')
with open(f'{OUT_PUB}/mana-logo.svg', 'w') as f:
    f.write(svg)
cairosvg.svg2png(url=f'{OUT_PUB}/mana-logo.svg', write_to=f'{OUT_BLD}/wordmark_final4.png',
                 output_width=800, background_color='#69a85a')
print('wordmark curves:', len(list(path)))

# ---------- sprites ----------
def cutout(name, box, blur=1.2, thresh=42, k=1, drop_white=False):
    im = label.crop(box).convert('RGB')
    a = np.array(im).astype(np.int16)
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    bg = np.median(border, axis=0)
    dist = np.sqrt(((a - bg) ** 2).sum(axis=2))
    alpha = np.clip((dist - thresh * 0.55) / thresh * 255, 0, 255).astype(np.uint8)
    alpha = np.array(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(blur)))
    Hh, Ww = alpha.shape
    solid, nn = ndimage.label(alpha > 200)
    if nn:
        objs = ndimage.find_objects(solid)
        scores = []
        for i in range(nn):
            reg = solid == i + 1
            sz = reg.sum()
            if sz < 300:
                scores.append(-1); continue
            if drop_white:
                med = np.median(np.array(im)[reg], axis=0)
                if med.min() > 195:
                    scores.append(-1); continue
            cy = (objs[i][0].start + objs[i][0].stop) / 2 / Hh - 0.5
            cx = (objs[i][1].start + objs[i][1].stop) / 2 / Ww - 0.5
            scores.append(sz * np.exp(-4.0 * (cx * cx + cy * cy)))
        order = np.argsort(scores)[::-1][:k]
        kp = {int(i) + 1 for i in order if scores[int(i)] > 0}
        keepmask = ndimage.binary_dilation(np.isin(solid, list(kp)), structure=disk(3))
        alpha = np.where(keepmask, alpha, 0).astype(np.uint8)
    out = np.dstack([np.array(im), alpha])
    ys, xs = np.where(alpha > 8)
    if len(xs):
        out = out[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    Image.fromarray(out, 'RGBA').save(f'{OUT_PUB}/sprites/{name}.png')

cutout('leaf-lower', (1128, 1545, 1462, 1748), drop_white=True)
cutout('flowers',    (350, 1588, 640, 1798), k=2, drop_white=True)

names = ['melon-ball','leaf-upper','leaf-lower','melon-star','flowers','star-yellow','sky-oval','cloud','sparkle','flower-stem']
sheet = Image.new('RGB', (5 * 250, 2 * 270), (105, 168, 90))
for i, name in enumerate(names):
    im = Image.open(f'{OUT_PUB}/sprites/{name}.png')
    im.thumbnail((230, 230))
    x, y = (i % 5) * 250 + 10, (i // 5) * 270 + 15
    sheet.paste(im, (x, y), im)
sheet.save(f'{OUT_BLD}/cutouts_preview6.png')
print('done')
