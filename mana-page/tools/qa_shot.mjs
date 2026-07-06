import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';

// usage: node tools/qa_shot.mjs <url> <out.png> [w] [h] [waitMs] [mouseX,mouseY]
const [url, out, w = '760', h = '900', waitMs = '1200', mouse = ''] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
page.on('console', (m) => { if (m.type() === 'error') console.log('PAGE ERR:', m.text().slice(0, 300)); });
page.on('pageerror', (e) => console.log('PAGE EXC:', String(e).slice(0, 300)));
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
try {
  await page.waitForFunction('window.__sceneReady === true', { timeout: 30000 });
} catch {
  console.log('WARN: sceneReady flag not set');
}
if (mouse) {
  const [mx, my] = mouse.split(',').map(Number);
  await page.mouse.move(mx, my, { steps: 12 });
}
await page.waitForTimeout(+waitMs);
await page.screenshot({ path: out });
console.log('SHOT', out);
await browser.close();
