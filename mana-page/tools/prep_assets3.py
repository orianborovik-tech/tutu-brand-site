#!/usr/bin/env python3
"""Pass 3: orientation-checked wordmark + clean sprite boxes + synthesized melon ball."""
import os, math, numpy as np
from PIL import Image, ImageFilter, ImageDraw
from scipy import ndimage
import potrace, cairosvg

SRC = os.path.join(os.path.dirname(__file__), '..', 'assets-src')
OUT_PUB = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets')
OUT_BLD = os.path.join(os.path.dirname(__file__), '..', 'build')
label = Image.open(f'{SRC}/MANA_canette_melon_mint_mat.png').convert('RGB')

# ---------- wordmark: try both rotations, save mask previews ----------
crop = label.crop((770, 545, 1235, 1750))
for angle in (90, -90):
    rot = crop.rotate(angle, expand=True)
    m = (np.array(rot.convert('L')) > 200).astype(np.uint8)
    Image.fromarray(m * 255).resize((600, 232)).save(f'{OUT_BLD}/mask_rot_{angle}.png')

def trace_svg(mask):
    H, W = mask.shape
    bmp = potrace.Bitmap(mask)
    path = bmp.trace(turdsize=10, alphamax=1.0, opticurve=1, opttolerance=0.2)
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
    return W, H, ''.join(d)

def clean_mask(rot_img):
    m = (np.array(rot_img.convert('L')) > 200).astype(np.uint8)
    lbl, n = ndimage.label(m)
    sizes = ndimage.sum(m, lbl, range(1, n + 1))
    keep = {i + 1 for i, s in enumerate(sizes) if s > 30000}
    return np.isin(lbl, list(keep)).astype(np.uint8)

for angle in (90, -90):
    mask = clean_mask(crop.rotate(angle, expand=True))
    W, H, d = trace_svg(mask)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">'
           f'<path d="{d}" fill="#fff" fill-rule="evenodd"/></svg>')
    with open(f'{OUT_BLD}/logo_rot_{angle}.svg', 'w') as f:
        f.write(svg)
    cairosvg.svg2png(url=f'{OUT_BLD}/logo_rot_{angle}.svg', write_to=f'{OUT_BLD}/logo_rot_{angle}.png',
                     output_width=700, background_color='#69a85a')
print('wordmark orientation previews written')

# ---------- sprites: corrected boxes ----------
def cutout(name, box, blur=1.2, thresh=42):
    im = label.crop(box).convert('RGB')
    a = np.array(im).astype(np.int16)
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    bg = np.median(border, axis=0)
    dist = np.sqrt(((a - bg) ** 2).sum(axis=2))
    alpha = np.clip((dist - thresh * 0.55) / thresh * 255, 0, 255).astype(np.uint8)
    alpha = np.array(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(blur)))
    solid, n = ndimage.label(alpha > 120)
    if n:
        sizes = ndimage.sum(alpha > 120, solid, range(1, n + 1))
        keep = {i + 1 for i, s in enumerate(sizes) if s > 400}
        alpha = np.where(np.isin(solid, list(keep)), alpha, 0).astype(np.uint8)
    Image.fromarray(np.dstack([np.array(im), alpha]), 'RGBA').save(f'{OUT_PUB}/sprites/{name}.png')

cutout('leaf-upper',  (1180, 1128, 1332, 1318))
cutout('leaf-lower',  (1125, 1565, 1320, 1737))
cutout('melon-slice', (1213, 1302, 1366, 1456))
cutout('flowers',     (558, 1578, 789, 1808))
cutout('star-yellow', (338, 552, 578, 783))
cutout('sky-oval',    (1183, 928, 1432, 1188), thresh=50)

# ---------- synthesized melon ball (faithful to artwork style) ----------
S = 512
im = Image.new('RGBA', (S, S), (0, 0, 0, 0))
dr = ImageDraw.Draw(im)
cx = cy = S // 2
R = int(S * 0.46)
grad = Image.new('L', (S, S), 0)
gd = ImageDraw.Draw(grad)
for r in range(R, 0, -1):
    t = r / R
    gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=int(255 * (1 - t) ** 1.1))
base_dark = np.array([106, 160, 36], float)   # sampled melon greens
base_lite = np.array([170, 205, 70], float)
g = np.array(grad).astype(float)[..., None] / 255.0
# light comes from upper-left
yy, xx = np.mgrid[0:S, 0:S]
lightbias = np.clip(1.0 - (np.hypot(xx - S * 0.36, yy - S * 0.34) / (S * 0.9)), 0, 1)[..., None]
rgb = base_dark + (base_lite - base_dark) * np.clip(g * 0.4 + lightbias * 0.85, 0, 1)
alpha = np.zeros((S, S), np.uint8)
mask = (xx - cx) ** 2 + (yy - cy) ** 2 <= R * R
alpha[mask] = 255
ball = np.dstack([rgb.astype(np.uint8), alpha])
im = Image.fromarray(ball, 'RGBA')
dr = ImageDraw.Draw(im)
LW = int(S * 0.028)
white = (252, 250, 240, 255)
dr.arc([cx - R, cy - R, cx + R, cy + R], 0, 360, fill=white, width=LW // 2)
dr.arc([cx - R * 1.55, cy - R * 0.95, cx + R * 0.5, cy + R * 0.95], -70, 70, fill=white, width=LW)
dr.arc([cx - R * 0.5, cy - R * 0.95, cx + R * 1.55, cy + R * 0.95], 110, 250, fill=white, width=LW)
dr.line([cx - R * 0.72, cy - R * 0.7, cx + R * 0.78, cy + R * 0.62], fill=white, width=LW)
im = im.filter(ImageFilter.GaussianBlur(0.6))
im.save(f'{OUT_PUB}/sprites/melon-ball.png')

# recolored cream cloud + star from site svgs
def raster_recolor(src, out, size, recolor=None):
    with open(f'{SRC}/{src}') as f:
        s = f.read()
    for old, new in (recolor or {}).items():
        s = s.replace(old, new)
    cairosvg.svg2png(bytestring=s.encode(), write_to=f'{OUT_PUB}/sprites/{out}', output_width=size)

raster_recolor('nuage.svg', 'cloud.png', 480)
raster_recolor('etoile.svg', 'sparkle.png', 256)
raster_recolor('home_fleur.svg', 'flower-stem.png', 420)

# preview
names = ['melon-ball','leaf-upper','leaf-lower','melon-slice','flowers','star-yellow','sky-oval','cloud','sparkle','flower-stem']
sheet = Image.new('RGB', (5 * 250, 2 * 270), (105, 168, 90))
for i, name in enumerate(names):
    im = Image.open(f'{OUT_PUB}/sprites/{name}.png')
    im.thumbnail((230, 230))
    x, y = (i % 5) * 250 + 10, (i // 5) * 270 + 15
    sheet.paste(im, (x, y), im)
sheet.save(f'{OUT_BLD}/cutouts_preview2.png')
print('sprites v3 done')
