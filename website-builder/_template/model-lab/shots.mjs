/**
 * Screenshot harness (24): deterministic angles → PNGs the agent Reads.
 * Usage: npm run lab (keep serving) → node model-lab/shots.mjs [--port 5180]
 * CPU-safe flags (SwiftShader); set CHROMIUM_PATH if auto-detection fails.
 */
import { chromium } from 'playwright-core';
import { mkdirSync, existsSync } from 'node:fs';

const PORT = process.argv.includes('--port')
  ? process.argv[process.argv.indexOf('--port') + 1]
  : '5180';
const OUT = new URL('./out/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const SHOTS = [
  // the shot protocol (24): ref-matched, pseudo-ortho front, 3/4, silhouette
  { name: 'ref-view', q: 'az=25&el=8&fov=30&dist=2.5' },   // match to the reference camera!
  { name: 'front',    q: 'az=0&el=0&fov=15&dist=6' },
  { name: 'three-quarter', q: 'az=40&el=15&fov=30&dist=2.8' },
  { name: 'silhouette',    q: 'az=0&el=0&fov=15&dist=6&silhouette=1' },
  { name: 'matcap',        q: 'az=25&el=8&fov=30&dist=2.5&matcap=1' },
];

function chromiumPath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  for (const p of ['/opt/pw-browsers/chromium', '/usr/bin/chromium', '/usr/bin/chromium-browser']) {
    if (existsSync(p)) return p;
  }
  return undefined; // let playwright-core try its registry; run `npx playwright install chromium` if this fails
}

const browser = await chromium.launch({
  executablePath: chromiumPath(),
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });

for (const shot of SHOTS) {
  await page.goto(`http://localhost:${PORT}/?${shot.q}`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__renderedOnce, null, { timeout: 30000 }); // never screenshot black
  await page.screenshot({ path: `${OUT}${shot.name}.png` });
  console.log(`✓ ${shot.name}.png`);
}

await browser.close();
console.log(`\nShots in model-lab/out/ — build the side-by-side with: npm run lab:compare`);
