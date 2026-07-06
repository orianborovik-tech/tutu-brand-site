#!/usr/bin/env python3
"""Pass 5: wordmark morphological repair + sprite island filtering."""
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

# ---------- wordmark with repair ----------
crop = label.crop((770, 545, 1235, 1750)).rotate(90, expand=True)
m = (np.array(crop.convert('L')) > 200).astype(np.uint8)
lbl, n = ndimage.label(m)
sizes = ndimage.sum(m, lbl, range(1, n + 1))
keep = {i + 1 for i, s in enumerate(sizes) if s > 30000}
mask = np.isin(lbl, list(keep))

mask = ndimage.binary_opening(mask, structure=disk(10))    # shave thin external junk
mask = ndimage.binary_closing(mask, structure=disk(26))    # fill leaf bites
# fill small interior holes (basketball line cuts) but keep real counters (A/M holes are big)
holes, hn = ndimage.label(~mask)
hs = ndimage.sum(~mask, holes, range(1, hn + 1))
border_ids = set(np.unique(np.concatenate([holes[0], holes[-1], holes[:, 0], holes[:, -1]])))
for i, s in enumerate(hs):
    hid = i + 1
    if hid not in border_ids and s < 5500:
        mask[holes == hid] = True

Image.fromarray((mask * 255).astype(np.uint8)).resize((600, 232)).save(f'{OUT_BLD}/mask_repaired.png')
H, W = mask.shape
path = potrace.Bitmap(mask).trace(turdsize=50, alphamax=1.1, opticurve=1, opttolerance=0.3)
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
cairosvg.svg2png(url=f'{OUT_PUB}/mana-logo.svg', write_to=f'{OUT_BLD}/wordmark_final2.png',
                 output_width=800, background_color='#69a85a')
print('wordmark repaired, curves:', len(list(path)))

# ---------- sprites with island filtering ----------
def cutout(name, box, blur=1.2, thresh=42, keep_islands=1):
    im = label.crop(box).convert('RGB')
    a = np.array(im).astype(np.int16)
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    bg = np.median(border, axis=0)
    dist = np.sqrt(((a - bg) ** 2).sum(axis=2))
    alpha = np.clip((dist - thresh * 0.55) / thresh * 255, 0, 255).astype(np.uint8)
    alpha = np.array(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(blur)))
    solid, nn = ndimage.label(alpha > 120)
    if nn:
        ss = list(ndimage.sum(alpha > 120, solid, range(1, nn + 1)))
        order = np.argsort(ss)[::-1][:keep_islands]
        kp = {int(i) + 1 for i in order}
        alpha = np.where(np.isin(solid, list(kp)), alpha, 0).astype(np.uint8)
    out = np.dstack([np.array(im), alpha])
    # autocrop to content
    ys, xs = np.where(alpha > 8)
    if len(xs):
        out = out[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    Image.fromarray(out, 'RGBA').save(f'{OUT_PUB}/sprites/{name}.png')

cutout('leaf-upper', (1185, 1095, 1450, 1300), keep_islands=1)
cutout('leaf-lower', (1128, 1545, 1462, 1748), keep_islands=1)
cutout('melon-star', (1218, 1318, 1478, 1540), keep_islands=1)
cutout('flowers',    (345, 1575, 675, 1800), keep_islands=2)
cutout('sky-oval',   (1283, 540, 1475, 1085), thresh=50, keep_islands=1)

names = ['melon-ball','leaf-upper','leaf-lower','melon-star','flowers','star-yellow','sky-oval','cloud','sparkle','flower-stem']
sheet = Image.new('RGB', (5 * 250, 2 * 270), (105, 168, 90))
for i, name in enumerate(names):
    im = Image.open(f'{OUT_PUB}/sprites/{name}.png')
    im.thumbnail((230, 230))
    x, y = (i % 5) * 250 + 10, (i // 5) * 270 + 15
    sheet.paste(im, (x, y), im)
sheet.save(f'{OUT_BLD}/cutouts_preview4.png')
print('sprites v5 done')
