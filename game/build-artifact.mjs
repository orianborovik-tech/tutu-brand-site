// Produces a body-only copy of index.html for hosts that wrap the page in their own
// <html>/<head>/<body> skeleton (e.g. Claude Artifacts). Usage: node game/build-artifact.mjs <outDir>
import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = process.argv[2];
if (!out) { console.error('usage: node build-artifact.mjs <outDir>'); process.exit(1); }
const html = readFileSync(join(here, 'index.html'), 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1]
  .replace(/<meta[^>]*>\s*/g, '');
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
const fragment = `${head.trim()}\n${body.trim()}\n`;
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'index.html'), fragment);
cpSync(join(here, 'js'), join(out, 'js'), { recursive: true });
console.log('artifact fragment written to', join(out, 'index.html'), fragment.length, 'bytes');
