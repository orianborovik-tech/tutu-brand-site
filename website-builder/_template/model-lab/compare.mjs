/**
 * Comparison tooling (24):
 *   node model-lab/compare.mjs montage <ref.jpg> <shot.png>   → out/side-by-side.png (agent READS this)
 *   node model-lab/compare.mjs iou <refSilhouette.png> <shotSilhouette.png>  → prints IoU (gate: > 0.93)
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const [, , cmd, aPath, bPath] = process.argv;
const OUT = new URL('./out/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

if (cmd === 'montage') {
  const H = 900;
  const a = await sharp(aPath).resize({ height: H }).toBuffer();
  const b = await sharp(bPath).resize({ height: H }).toBuffer();
  const aw = (await sharp(a).metadata()).width;
  const bw = (await sharp(b).metadata()).width;
  await sharp({ create: { width: aw + bw + 20, height: H, channels: 3, background: '#ffffff' } })
    .composite([{ input: a, left: 0, top: 0 }, { input: b, left: aw + 20, top: 0 }])
    .png().toFile(`${OUT}side-by-side.png`);
  console.log(`✓ ${OUT}side-by-side.png  (reference left · render right — critique per 24)`);
} else if (cmd === 'iou') {
  // threshold both to binary silhouettes, center-normalize by height, compute IoU
  async function mask(path) {
    const { data, info } = await sharp(path)
      .resize({ height: 800 }).greyscale().threshold(128).raw()
      .toBuffer({ resolveWithObject: true });
    return { data, w: info.width, h: info.height };
  }
  const A = await mask(aPath), B = await mask(bPath);
  const w = Math.min(A.w, B.w), h = Math.min(A.h, B.h);
  const offA = Math.floor((A.w - w) / 2), offB = Math.floor((B.w - w) / 2);
  let inter = 0, union = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const a = A.data[y * A.w + x + offA] < 128; // dark = object
    const b = B.data[y * B.w + x + offB] < 128;
    if (a && b) inter++;
    if (a || b) union++;
  }
  const iou = union ? inter / union : 0;
  console.log(`IoU = ${iou.toFixed(4)}  ${iou > 0.93 ? '✓ PASS (>0.93)' : '✗ FAIL — iterate proportions (24)'}`);
  process.exit(iou > 0.93 ? 0 : 1);
} else {
  console.log('usage: compare.mjs montage <ref> <shot> | iou <refSil> <shotSil>');
}
