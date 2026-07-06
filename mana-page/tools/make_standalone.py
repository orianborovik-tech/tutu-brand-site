#!/usr/bin/env python3
"""Bundle the built MANA page into one self-contained HTML file for the
interactive mouse-demo Artifact: inline the JS bundle and inject a
window.__ASSET_MAP__ of base64 data: URIs so main.js's assetURL() resolves
every glb/svg/png without any network request. Also patches the two
literal <img src="assets/mana-logo.svg"> occurrences in the markup.
"""
import base64, json, re, os

DIST = os.path.join(os.path.dirname(__file__), '..', 'dist')
OUT = os.path.join(os.path.dirname(__file__), '..', 'build', 'mana-demo-standalone.html')
os.makedirs(os.path.dirname(OUT), exist_ok=True)

html = open(f'{DIST}/index.html', encoding='utf-8').read()

m = re.search(r'<script type="module"[^>]*src="\.?/?(assets/index-[\w-]+\.js)"[^>]*></script>', html)
js_path = m.group(1)
js = open(f'{DIST}/{js_path}', encoding='utf-8').read()

def data_uri(path, mime):
    return f'data:{mime};base64,' + base64.b64encode(open(path, 'rb').read()).decode()

asset_map = {
    'assets/mana-can.glb': data_uri(f'{DIST}/assets/mana-can.glb', 'model/gltf-binary'),
    'assets/mana-logo.svg': data_uri(f'{DIST}/assets/mana-logo.svg', 'image/svg+xml'),
}
for name in os.listdir(f'{DIST}/assets/sprites'):
    asset_map[f'assets/sprites/{name}'] = data_uri(f'{DIST}/assets/sprites/{name}', 'image/png')

map_script = f'<script>window.__ASSET_MAP__={json.dumps(asset_map)};</script>'
html = html.replace(m.group(0), map_script + f'<script type="module">{js}</script>')

# the two <img src="assets/mana-logo.svg"> occurrences in the markup
html = html.replace('assets/mana-logo.svg', asset_map['assets/mana-logo.svg'])

open(OUT, 'w', encoding='utf-8').write(html)
print('wrote', OUT, os.path.getsize(OUT), 'bytes')
