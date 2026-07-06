#!/usr/bin/env python3
"""Prepare all web/model assets for the MANA Melon & Mint 3D product page.

Inputs  (assets-src/): official label texture, ORM map, decorative SVGs.
Outputs (public/assets/ and build/): body albedo + ORM crops, droplet normal
map, rasterized sprites, extracted MANA logo letterform SVG.
"""
import io, json, math, os, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = os.path.join(os.path.dirname(__file__), '..', 'assets-src')
OUT_PUB = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets')
OUT_BLD = os.path.join(os.path.dirname(__file__), '..', 'build')
os.makedirs(OUT_PUB, exist_ok=True)
os.makedirs(OUT_BLD, exist_ok=True)

LABEL_TOP = 333          # first row of the printed body band in the 2048px texture
random.seed(7); np.random.seed(7)

# ---------- 1. body albedo + ORM crops ----------
label = Image.open(f'{SRC}/MANA_canette_melon_mint_mat.png').convert('RGB')
orm   = Image.open(f'{SRC}/MANA_canette_pamp_roughness__metal_maps.png').convert('RGB')
assert label.size == (2048, 2048) and orm.size == (2048, 2048)

body_albedo = label.crop((0, LABEL_TOP, 2048, 2048))          # 2048 x 1715
body_orm    = orm.crop((0, LABEL_TOP, 2048, 2048))
body_albedo.save(f'{OUT_BLD}/body_albedo.png')
body_orm.save(f'{OUT_BLD}/body_orm.png')
print('body maps:', body_albedo.size)

# lid disc texture: one of the brushed-aluminum circles in the top island
lid = label.crop((1580, 20, 1860, 300)).resize((256, 256))
lid.save(f'{OUT_BLD}/lid_albedo.png')

# ---------- 2. droplet normal map (condensation) ----------
W, H = 1024, 858   # same aspect as the body band (2048x1715)
nrm = np.zeros((H, W, 3), np.float32)
nrm[..., 2] = 1.0
mask_img = Image.new('L', (W, H), 0)
mdraw = ImageDraw.Draw(mask_img)

def add_droplet(cx, cy, r, elong=1.0):
    x0, x1 = int(cx - r), int(cx + r)
    y0, y1 = int(cy - r * elong), int(cy + r * elong)
    for y in range(max(0, y0), min(H, y1 + 1)):
        for x in range(max(0, x0), min(W, x1 + 1)):
            dx = (x - cx) / r
            dy = (y - cy) / (r * elong)
            d2 = dx * dx + dy * dy
            if d2 < 1.0:
                z = math.sqrt(1.0 - d2)
                # blend: droplet normal wins near center
                nrm[y, x, 0] = dx * 0.85
                nrm[y, x, 1] = -dy * 0.85
                nrm[y, x, 2] = z
    mdraw.ellipse([cx - r, cy - r * elong, cx + r, cy + r * elong], fill=255)

for _ in range(520):
    r = random.uniform(2.2, 7.5)
    if random.random() < 0.06:                    # occasional big drop
        r = random.uniform(8, 13)
    elong = random.uniform(1.0, 1.35)             # slight vertical run
    add_droplet(random.uniform(0, W), random.uniform(0, H), r, elong)

n = nrm / np.maximum(np.linalg.norm(nrm, axis=2, keepdims=True), 1e-6)
png = ((n * 0.5 + 0.5) * 255).astype(np.uint8)
Image.fromarray(png).save(f'{OUT_BLD}/droplet_normal.png')
mask_img.save(f'{OUT_BLD}/droplet_mask.png')
print('droplet normal map done')

# ---------- 3. extract MANA logo letterforms from the label ----------
# The white vertical wordmark sits roughly at x 700-1180, y 560-1730 (label px).
import potrace
crop_box = (690, 560, 1190, 1740)
logo = np.array(label.crop(crop_box).convert('L'))
white = (logo > 200).astype(np.uint8)

# connected components -> 4 letters (top to bottom: M, A, N, A), each rotated 90deg
from scipy import ndimage  # noqa: E402

def trace_to_svg_path(bitmap_arr, scale=1.0):
    bmp = potrace.Bitmap(bitmap_arr)
    path = bmp.trace(turdsize=8, alphamax=1.0, opticurve=1, opttolerance=0.2)
    d = []
    for curve in path:
        s = curve.start_point
        d.append(f'M{s.x * scale:.1f},{s.y * scale:.1f}')
        for seg in curve:
            if seg.is_corner:
                c = seg.c; e = seg.end_point
                d.append(f'L{c.x * scale:.1f},{c.y * scale:.1f}L{e.x * scale:.1f},{e.y * scale:.1f}')
            else:
                c1, c2, e = seg.c1, seg.c2, seg.end_point
                d.append(f'C{c1.x * scale:.1f},{c1.y * scale:.1f} {c2.x * scale:.1f},{c2.y * scale:.1f} {e.x * scale:.1f},{e.y * scale:.1f}')
        d.append('Z')
    return ''.join(d)

try:
    lbl, nlab = ndimage.label(white)
    sizes = ndimage.sum(white, lbl, range(1, nlab + 1))
    keep = [i + 1 for i, s in enumerate(sizes) if s > 4000]
    boxes = ndimage.find_objects(lbl)
    letters = []
    for k in keep:
        sl = boxes[k - 1]
        piece = (lbl[sl] == k).astype(np.uint8)
        piece = np.rot90(piece, k=1)      # letters are rotated 90deg cw in the vertical logo
        letters.append((sl[0].start, piece))
    letters.sort(key=lambda t: t[0])       # top-to-bottom == reading order M A N A
    paths, x_cursor, max_h = [], 0.0, max(p.shape[0] for _, p in letters)
    GAP = 14
    for _, piece in letters:
        h, w = piece.shape
        d = trace_to_svg_path(piece)
        paths.append((d, x_cursor, max_h - h))
        x_cursor += w + GAP
    total_w, total_h = x_cursor - GAP, max_h
    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total_w:.0f} {total_h:.0f}">']
    for d, tx, ty in paths:
        svg.append(f'<g transform="translate({tx:.1f},{ty:.1f})"><path d="{d}" fill="#fff"/></g>')
    svg.append('</svg>')
    with open(f'{OUT_PUB}/mana-logo.svg', 'w') as f:
        f.write(''.join(svg))
    print(f'logo letters: {len(letters)} traced, canvas {total_w:.0f}x{total_h:.0f}')
except Exception as e:
    print('LOGO EXTRACTION FAILED:', e)

# ---------- 4. rasterize decorative SVGs (grid preview + recolored sprites) ----------
import cairosvg  # noqa: E402

def raster(svg_file, out_png, size=512, recolor=None):
    with open(f'{SRC}/{svg_file}') as f:
        s = f.read()
    if recolor:
        for old, new in recolor.items():
            s = s.replace(old, new)
    cairosvg.svg2png(bytestring=s.encode(), write_to=out_png,
                     output_width=size, output_height=None, background_color='rgba(0,0,0,0)')

grid_srcs = ['obs1.svg','obs2.svg','obs3.svg','obs4.svg','obs5.svg','obs6.svg','obs7.svg',
             'nuage.svg','home_fleur.svg','mangue.svg','etoile.svg','home_eau.svg']
tiles = []
for s in grid_srcs:
    p = f'{OUT_BLD}/prev_{s}.png'
    try:
        raster(s, p, 256)
        tiles.append((s, Image.open(p).convert('RGBA')))
    except Exception as e:
        print('raster fail', s, e)

cols = 4
rows = (len(tiles) + cols - 1) // cols
sheet = Image.new('RGBA', (cols * 280, rows * 300), (40, 90, 40, 255))
dd = ImageDraw.Draw(sheet)
for i, (name, im) in enumerate(tiles):
    x, y = (i % cols) * 280 + 12, (i // cols) * 300 + 12
    im.thumbnail((256, 256))
    sheet.paste(im, (x, y), im)
    dd.text((x, y + 262), name, fill=(255, 255, 255, 255))
sheet.convert('RGB').save(f'{OUT_BLD}/sprites_preview.png')
print('sprite preview sheet written')
