# 42 — Asset Pipeline

**Role:** Every byte that ships: GLB optimization, texture compression, environment maps, images, video packaging, and font subsetting (Hebrew included). Author at full quality, compress ONCE at ship, verify with inspect tables.
**Phase:** 6 (HARDEN) — commands run when assets stabilize.
**Inputs:** models (`24`), textures (`22`), env (`23`), media (`15`/`16`), fonts (`13`).
**Outputs:** optimized `public/` + a byte manifest.
**Upstream:** all asset producers · **Downstream:** `34` (manifest → preloader), `41` (budgets), `45` (CDN/paths).

---

## glTF pipeline (gltf-transform CLI; gltfpack as zero-dep fallback)

**READ FIRST:** `npx @gltf-transform/cli inspect model.glb` — per-mesh/texture cost tables. Then surgical, in THIS order (simplify/weld BEFORE texture work, geometry compression LAST):

```bash
gltf-transform prune in.glb a.glb          # unused nodes/materials
gltf-transform dedup a.glb b.glb
gltf-transform weld b.glb c.glb
gltf-transform simplify c.glb d.glb --ratio 0.5 --error 0.001   # to tri budget
gltf-transform resize d.glb e.glb --width 1024 --height 1024
# textures: webp for a single hero product; ktx2 for texture-heavy scenes:
gltf-transform webp e.glb f.glb            # or: etc1s (baseColor/AO) / uastc (normal/ORM)
gltf-transform meshopt f.glb final.glb     # DEFAULT compressor (see below)
npx gltf-validator final.glb && gltf-transform inspect final.glb  # paste table into MODEL.md
```

- **Meshopt over Draco by default:** ~35KB decoder (vs ~110KB), ~1GB/s decode (protects INP on weak
  phones), compresses animation/morphs (Draco can't). Draco only for a stubbornly large static hero.
- One-shot `gltf-transform optimize` is a fine start but AUDIT it — it can strip uv1 (aoMap!) and
  over-join meshes you animate separately (`-kn -km` equivalent caution; keep named parts).
- **KTX2 is about VRAM, not just transfer:** 2048 RGBA8 ≈ 22.4MB in GPU memory with mips; KTX2 ≈
  2.8–5.6MB (AVIF/WebP decompress to FULL RGBA in VRAM — they don't help GPU memory). ETC1S for
  baseColor/AO; UASTC(+zstd) for normals/ORM. Mips must be baked in (WebGL can't generate them for
  compressed textures). Loaders: `KTX2Loader.detectSupport(renderer)`, MeshoptDecoder registered once.

## Environment maps (the classic 5MB mistake)

PMREM output is 256px regardless of source → never ship 2K .hdr. Ranked: RoomEnvironment
(0 bytes) → **gainmap JPEG/WebP** (`@monogrid/gainmap-js`: 4–6MB .hdr → 150–500KB) → 1k .hdr
(~1–2MB) only when the env is also visible background. Compositing case: the synthetic plate
equirect (`26`) costs ~30KB as a canvas — best value in the whole pipeline.

## DOM images (from `15`)

sharp pipeline: master → AVIF (quality ~50–60) + WebP fallback (q ~75–80) → srcset ladder
(480/768/1200/1920 as needed) → explicit width/height attrs (CLS 0) → LQIP blur-up or dominant-color
placeholder → `loading="lazy"` below fold, `fetchpriority="high"` ONLY the LCP image.
Backdrop plates: ≤2048px mobile / ≤4096 desktop longest side, 150–500KB target (`25`).

## Video packaging (from `16`)

ffmpeg: H.264 CRF 26–30 + `-movflags +faststart`, audio track STRIPPED (`-an`); WebM/AV1 variant
where budget allows; 720p mobile source via media query/JS pick; poster JPEG per clip. Scroll-scrub
encodes: all-intra (`-g 1`) — bigger files, ONE hero moment only.

## Fonts (incl. Hebrew — bake this in)

```bash
pip install fonttools brotli
# latin:
pyftsubset Font.ttf --unicodes="U+0000-00FF,U+2013-2014,U+2018-201D,U+2026,U+20AA" \
  --layout-features="kern,liga,calt" --no-hinting --desubroutinize --flavor=woff2 --output-file=font.latin.woff2
# hebrew (letters+niqqud U+0590-05FF, presentation forms U+FB1D-FB4F, ₪ U+20AA, ZWJ/dashes, dotted circle):
pyftsubset Font.ttf --unicodes="U+0590-05FF,U+200C-2010,U+20AA,U+25CC,U+FB1D-FB4F" \
  --layout-features="kern,liga,calt,mark,mkmk" --no-hinting --flavor=woff2 --output-file=font.hebrew.woff2
```

- **Keep `mark,mkmk` or niqqud breaks.** Two @font-face blocks (latin+hebrew), one font-family,
  each with its `unicode-range` — the browser downloads only what's used.
- Variable fonts: pin unused axes first (`fonttools varLib.instancer Font.ttf wght=400:700`).
- ≤ 60KB per woff2; preload the 1–2 above-fold files; metric-matched fallback (`13`).
- Auto-discovery: `npx glyphhanger ./dist/index.html --formats=woff2 --subset=Font.ttf`.
- WebGL text: troika-three-text (SDF from the same woff2) or MSDF atlas of the SAME faces (`13`).

## The byte manifest (feeds the honest preloader, `34`)

Build step emits `manifest.json`: `[{ url, bytes }]` for every preloaded asset (Content-Length lies
under brotli/chunked — measure at build). Preloader fetches via ReadableStream accumulating real
bytes → progress = received/total → `GLTFLoader.parse` the tracked buffer (no double-fetch).

## Load order (the choreography `34` executes)

DOM shell + subset fonts (LCP) → renderer boot → tiny env (lighting exists) → hero GLB
(byte-tracked, decoders parallel) → compileAsync + warm-up → reveal → secondary assets via
IntersectionObserver at rootMargin 200%.

---

## ✓ Verification

- [ ] gltf-transform inspect table pasted into MODEL.md — GLB within budget, named parts intact, aoMap uv1 survived.
- [ ] Cold load of the OPTIMIZED assets in the lab — visually identical to pre-compression (diff vs golden shots).
- [ ] Textures: right codec per slot (ETC1S/UASTC/WebP audit list); mips present; colorSpace re-verified post-compress.
- [ ] Env map bytes ≤ 500KB (or 0 procedural) — recorded.
- [ ] Images: AVIF+WebP+srcset+dimensions+LQIP on every one (grep the HTML); only the LCP image has fetchpriority.
- [ ] Video: -an stripped, faststart, poster present, sizes listed.
- [ ] Fonts: subset sizes ≤ 60KB each; Hebrew renders WITH niqqud correctly after subsetting (visual check of a niqqud string).
- [ ] manifest.json totals == network-tab reality (spot-check 3 assets).
- [ ] Total page weight vs `41` budget table — green.
