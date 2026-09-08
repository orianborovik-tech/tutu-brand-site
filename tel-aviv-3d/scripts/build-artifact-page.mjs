// Build the claude.ai artifact variant: no <!doctype>/<html>/<head>/<body>
// wrappers (the artifact host supplies those), RTL set via script.
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = process.argv[2] || join(root, 'artifact.html');
const page = process.argv[3] || 'index.html';
const dataFile = process.argv[4] || 'telaviv-data.js';

const src = readFileSync(join(root, page), 'utf8');
const style = src.match(/<style>([\s\S]*?)<\/style>/)[1];
const body = src.match(/<body>([\s\S]*?)<\/body>/)[1]
  .replace(/<script src="[^"]*"><\/script>\s*/g, '');
const data = readFileSync(join(root, 'data', dataFile), 'utf8');
const bundle = readFileSync(join(root, 'bundle.js'), 'utf8').replace(/<\/script>/gi, '<\\/script>');

const title = page.includes('tzahala') ? 'צהלה 3D' : 'תל אביב 3D';
const html = `<title>${title}</title>
<style>${style}</style>
<script>document.documentElement.dir='rtl';document.documentElement.lang='he';</script>
${body}
<script>${data}</script>
<script>${bundle}</script>
`;
writeFileSync(out, html);
console.log('wrote', out, (html.length / 1e6).toFixed(2) + ' MB');
