// Bundle index.html + data + bundle.js into one self-contained HTML file.
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = process.argv[2] || join(root, 'telaviv-3d-standalone.html');

let html = readFileSync(join(root, 'index.html'), 'utf8');
const data = readFileSync(join(root, 'data', 'telaviv-data.js'), 'utf8');
const bundle = readFileSync(join(root, 'bundle.js'), 'utf8');

html = html.replace('<script src="data/telaviv-data.js"></script>',
  '<script>\n' + data + '\n</script>');
html = html.replace('<script src="bundle.js"></script>',
  '<script>\n' + bundle.replace(/<\/script>/gi, '<\\/script>') + '\n</script>');

writeFileSync(out, html);
console.log('wrote', out, (html.length / 1e6).toFixed(2) + ' MB');
