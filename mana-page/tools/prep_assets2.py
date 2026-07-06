#!/usr/bin/env python3
"""Pass 2: fixed logo extraction (horizontal wordmark) + label-art sprite cutouts."""
import os, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
import potrace

SRC = os.path.join(os.path.dirname(__file__), '..', 'assets-src')
OUT_PUB = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets')
OUT_BLD = os.path.join(os.path.dirname(__file__), '..', 'build')
os.makedirs(f'{OUT_PUB}/sprites', exist_ok=True)

label = Image.open(f'{SRC}/MANA_canette_melon_mint_mat.png').convert('RGB')

# ---------- horizontal MANA wordmark ----------
crop = label.crop((770, 545, 1235, 1750))          # tight box around the vertical logo
crop = crop.rotate(-90, expand=True)               # PIL: negative = clockwise; letters upright, M first
mask = (np.array(crop.convert('L')) > 200).astype(np.uint8)
lbl, n = ndimage.label(mask)
sizes = ndimage.sum(mask, lbl, range(1, n + 1))
keep = {i + 1 for i, s in enumerate(sizes) if s > 30000}
mask = np.isin(lbl, list(keep)).astype(np.uint8)
print('wordmark components kept:', len(keep), 'coverage px:', int(mask.sum()))
Image.fromarray(mask * 255).save(f'{OUT_BLD}/wordmark_mask.png')

bmp = potrace.Bitmap(mask)
path = bmp.trace(turdsize=10, alphamax=1.0, opticurve=1, opttolerance=0.2)
H, W = mask.shape
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
print(f'wordmark svg {W}x{H} written')

# ---------- sprite cutouts from the label artwork ----------
def cutout(name, box, blur=1.2, thresh=42):
    im = label.crop(box).convert('RGB')
    a = np.array(im).astype(np.int16)
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    bg = np.median(border, axis=0)
    dist = np.sqrt(((a - bg) ** 2).sum(axis=2))
    alpha = np.clip((dist - thresh * 0.55) / thresh * 255, 0, 255).astype(np.uint8)
    alpha_im = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(blur))
    alpha = np.array(alpha_im)
    # drop tiny specks
    solid, n = ndimage.label(alpha > 120)
    if n:
        sizes = ndimage.sum(alpha > 120, solid, range(1, n + 1))
        keep = {i + 1 for i, s in enumerate(sizes) if s > 400}
        alpha = np.where(np.isin(solid, list(keep)), alpha, 0).astype(np.uint8)
    out = np.dstack([np.array(im), alpha])
    Image.fromarray(out, 'RGBA').save(f'{OUT_PUB}/sprites/{name}.png')
    print('sprite', name, out.shape[1], 'x', out.shape[0])

cutout('melon-ball',  (695, 640, 895, 835))
cutout('leaf-upper',  (1140, 1095, 1360, 1320))
cutout('leaf-lower',  (1100, 1570, 1325, 1770))
cutout('melon-slice', (1210, 1300, 1385, 1475))
cutout('flowers',     (558, 1578, 812, 1808))
cutout('star-yellow', (335, 548, 600, 800))

# preview sheet
sheet = Image.new('RGB', (6 * 240, 260), (105, 168, 90))
x = 8
for name in ['melon-ball', 'leaf-upper', 'leaf-lower', 'melon-slice', 'flowers', 'star-yellow']:
    im = Image.open(f'{OUT_PUB}/sprites/{name}.png')
    im.thumbnail((224, 224))
    sheet.paste(im, (x, 12), im)
    x += 240
sheet.save(f'{OUT_BLD}/cutouts_preview.png')

# wordmark render preview (white on green)
import cairosvg
cairosvg.svg2png(url=f'{OUT_PUB}/mana-logo.svg', write_to=f'{OUT_BLD}/wordmark_preview.png',
                 output_width=900, background_color='#69a85a')
print('previews written')
