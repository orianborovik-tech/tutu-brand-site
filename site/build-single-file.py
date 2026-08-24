#!/usr/bin/env python3
"""Bundle the multi-page site into one self-contained HTML file (for sharing/preview).
Run: python3 site/build-single-file.py -> site/taste-of-asia-single.html"""
import base64, re, pathlib

SITE = pathlib.Path(__file__).resolve().parent
OUT = SITE / 'taste-of-asia-single.html'

PAGES = ['index', 'product', 'about', 'faq', 'stores', 'contact']
BODY_CLASS = {'index': 'home', 'product': 'pdp', 'about': '', 'faq': 'faq-page',
              'stores': '', 'contact': 'contact-page'}


def read(p):
    return (SITE / p).read_text(encoding='utf-8')


def data_uri(path):
    b = (SITE / path).read_bytes()
    return 'data:image/svg+xml;base64,' + base64.b64encode(b).decode()


def inline_assets(html):
    for m in set(re.findall(r'assets/img/([\w-]+\.svg)', html)):
        html = html.replace('assets/img/' + m, data_uri('assets/img/' + m))
    return html


def extract_main(name):
    html = read(name + '.html')
    m = re.search(r'<main\b[^>]*>(.*)</main>', html, re.S)
    body = m.group(1)
    return body


def extract_defs(name):
    """grab svg defs blocks that sit outside <main> (product blobMask)"""
    html = read(name + '.html')
    m = re.search(r'(<svg width="0"[^>]*>.*?</svg>)', html, re.S)
    return m.group(1) if m else ''


# ---------- CSS ----------
css = read('css/style.css')
css = re.sub(r"@import url\('https://fonts\.googleapis\.com[^']*'\);\n?", '', css)

# ---------- JS ----------
js_files = ['js/data.js', 'js/partials.js', 'js/main.js', 'js/product.js']
js = '\n;\n'.join(read(f) for f in js_files)

# stores page inline logic (from its <script> tag)
stores_html = read('stores.html')
sm = re.search(r'<script>\s*(document\.addEventListener.*?)\s*</script>', stores_html, re.S)
stores_js = sm.group(1) if sm else ''
js += '\n;\n' + stores_js

# safe storage shim: never let a throwing storage kill the scripts
shim = """
var __mls = {}, __mss = {};
var __safeLS, __safeSS;
try { window.localStorage.getItem('__t'); __safeLS = window.localStorage; }
catch (e) { __safeLS = { getItem: function(k){ return (k in __mls) ? __mls[k] : null; }, setItem: function(k,v){ __mls[k]=String(v); }, removeItem: function(k){ delete __mls[k]; } }; }
try { window.sessionStorage.getItem('__t'); __safeSS = window.sessionStorage; }
catch (e) { __safeSS = { getItem: function(k){ return (k in __mss) ? __mss[k] : null; }, setItem: function(k,v){ __mss[k]=String(v); }, removeItem: function(k){ delete __mss[k]; } }; }
"""
js = re.sub(r'\blocalStorage\.', '__safeLS.', js)
js = re.sub(r'\bsessionStorage\.', '__safeSS.', js)
js = shim + '\n' + js

router = """
/* ---- single-file router: swaps the visible page, like the original SPA ---- */
(function () {
  var MAP = { index: 'home', product: 'pdp', about: '', faq: 'faq-page', stores: '', contact: 'contact-page' };
  function show(name, hash) {
    if (!(name in MAP)) name = 'index';
    document.querySelectorAll('.page').forEach(function (p) { p.hidden = p.dataset.page !== name; });
    document.body.className = MAP[name];
    document.body.style.overflow = '';
    var mm = document.querySelector('.mmenu'); if (mm) mm.classList.remove('is-open');
    var bg = document.querySelector('.js-burger'); if (bg) bg.classList.remove('is-open');
    var mega = document.querySelector('.mega'); if (mega) mega.classList.remove('is-open');
    if (window.TOA && TOA.closeDrawers) TOA.closeDrawers();
    window.dispatchEvent(new Event('resize'));
    if (hash) {
      var el = document.getElementById(hash);
      if (el) { el.scrollIntoView(); } else { window.scrollTo(0, 0); }
    } else { window.scrollTo(0, 0); }
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var m = href.match(/^(index|product|about|faq|stores|contact|404)\\.html(?:#([\\w-]+))?$/);
    if (m) {
      e.preventDefault();
      var tr = document.getElementById('transition');
      var go = function () { show(m[1] === '404' ? 'index' : m[1], m[2]); };
      if (tr) {
        tr.classList.add('is-covering');
        setTimeout(go, 380);
        setTimeout(function () { tr.classList.remove('is-covering'); }, 750);
      } else { go(); }
    }
  }, true);
  document.addEventListener('DOMContentLoaded', function () { show('index'); });
})();
"""
js += '\n;\n' + router

# ---------- pages ----------
sections = [extract_defs('product')]
for name in PAGES:
    body = extract_main(name)
    sections.append('<div class="page" data-page="%s" hidden>%s</div>' % (name, body))
pages_html = '\n'.join(sections)

page_css_extra = """
.page[hidden] { display: none !important; }
"""

html = f"""<meta charset="utf-8">
<title>Taste of Asia</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Secular+One&family=Heebo:wght@300;400;500;700;800&display=swap">
<style>
{css}
{page_css_extra}
</style>
{pages_html}
<script>
{js}
</script>
"""
html = inline_assets(html)
OUT.write_text(html, encoding='utf-8')
print('wrote', OUT, len(html), 'bytes')
