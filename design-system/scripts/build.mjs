import { build } from 'esbuild';
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

await build({
  entryPoints: [join(root, 'src/index.ts')],
  outfile: join(root, 'dist/index.js'),
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  loader: { '.tsx': 'tsx', '.ts': 'ts' },
});

execSync('npx tsc -p tsconfig.json', { cwd: root, stdio: 'inherit' });

mkdirSync(join(root, 'dist'), { recursive: true });
const css =
  readFileSync(join(root, 'src/css/tokens.css'), 'utf8') +
  '\n' +
  readFileSync(join(root, 'src/css/components.css'), 'utf8');
writeFileSync(join(root, 'dist/styles.css'), css);

console.log('build complete: dist/index.js, dist/index.d.ts, dist/styles.css');
