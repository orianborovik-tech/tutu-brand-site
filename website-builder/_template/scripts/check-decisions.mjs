/**
 * Decision-enforcement gate (CREATIVITY-CONTRACT).
 * Build fails while any TODO_DECIDE marker remains — an undecided site
 * cannot ship. Each marker names the system file that governs the decision.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['index.html', 'src'];
const MARKER = 'TODO' + '_DECIDE'; // split so this file doesn't flag itself
const hits = [];

function scan(path) {
  const st = statSync(path);
  if (st.isDirectory()) {
    for (const entry of readdirSync(path)) scan(join(path, entry));
    return;
  }
  if (!/\.(html|css|js|mjs|glsl|vert|frag|json)$/.test(path)) return;
  const lines = readFileSync(path, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (line.includes(MARKER)) hits.push(`${path}:${i + 1}  ${line.trim().slice(0, 100)}`);
  });
}

for (const root of ROOTS) {
  try { scan(root); } catch { /* missing root is fine */ }
}

if (hits.length) {
  console.error(`\n✗ ${hits.length} creative decision(s) not yet made — build blocked.\n`);
  for (const h of hits) console.error('  ' + h);
  console.error(
    '\nEach marker names the governing system file (website-builder/<nn>-*.md).' +
    '\nDecide from THIS project\'s concept and references, log it in _process/CONCEPT.md, replace the marker.\n'
  );
  process.exit(1);
}
console.log('✓ all creative decisions made — no TODO markers remain.');
