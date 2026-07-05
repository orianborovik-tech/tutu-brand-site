// Screenshot helper: node shot.js <url-or-file> <out.png> [waitMs] [width] [height] [scrollToY]
// External requests are fetched via Node (proxy-aware) and fulfilled into the browser,
// bypassing Chromium's network stack which the egress proxy resets.
// Run with: NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt node shot.js ...
const { chromium } = require('playwright-core');

const cache = new Map();
async function nodeFetch(url) {
  if (cache.has(url)) return cache.get(url);
  const p = (async () => {
    const resp = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) Chrome/126 Safari/537.36' } });
    const body = Buffer.from(await resp.arrayBuffer());
    const headers = {};
    for (const [k, v] of resp.headers.entries()) {
      if (!/^(content-encoding|content-length|transfer-encoding|connection|set-cookie|strict-transport|content-security)/i.test(k)) headers[k] = v;
    }
    headers['access-control-allow-origin'] = '*';
    return { status: resp.status, headers, body };
  })();
  cache.set(url, p);
  return p;
}

(async () => {
  const [, , target, out, waitMs = '4500', width = '1440', height = '900', scrollY = ''] = process.argv;
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    headless: true,
    args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader', '--disable-background-networking', '--disable-component-update'],
  });
  const ctx = await browser.newContext({
    viewport: { width: +width, height: +height },
    ignoreHTTPSErrors: true,
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push('[console.error] ' + m.text().slice(0, 300)); });
  page.on('pageerror', (e) => errors.push('[pageerror] ' + String(e).slice(0, 300)));
  await page.route(/^https?:\/\/(?!127\.0\.0\.1|localhost)/, async (route) => {
    const url = route.request().url();
    try {
      const r = await nodeFetch(url);
      await route.fulfill({ status: r.status, headers: r.headers, body: r.body });
    } catch (e) {
      errors.push('[fetchfail] ' + url.slice(0, 160) + ' :: ' + e.message.slice(0, 120));
      await route.abort();
    }
  });
  const url = target.startsWith('http') ? target : 'file://' + target;
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 90000 });
  } catch (e) {
    console.log('GOTO-ERROR: ' + e.message.slice(0, 200));
  }
  await page.waitForTimeout(+waitMs);
  if (scrollY) {
    await page.evaluate((y) => window.scrollTo({ top: +y, behavior: 'instant' }), scrollY);
    await page.waitForTimeout(3000);
  }
  await page.screenshot({ path: out });
  console.log('ERRORS: ' + (errors.length ? '\n' + [...new Set(errors)].slice(0, 15).join('\n') : 'none'));
  await browser.close();
})();
