import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  base: './', // works on GH Pages, Netlify subpaths, and Shopify CDN alike (system file 40)
  plugins: [glsl()],
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
  },
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.ktx2'],
});
