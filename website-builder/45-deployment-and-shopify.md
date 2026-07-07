# 45 — Deployment, Shopify & Meta

**Role:** Ship it: static deploys, the three Shopify embedding paths (award-level WebGL inside Shopify is PROVEN — the #1 reference site IS a Shopify theme), commerce integration patterns, and the meta/SEO surfaces juries actually judge.
**Phase:** 7 (SHIP).
**Inputs:** the hardened build. **Outputs:** a live, verified URL.
**Upstream:** `40`–`44` · **Downstream:** `51` (live checks), SHIP-REPORT.

---

## Static deploy targets

| Target | Method | Notes |
|---|---|---|
| Netlify | git-connect / drop `dist` | `_headers`: `Cache-Control: immutable` on hashed assets; MIME for `.glb` (model/gltf-binary), `.ktx2` |
| Vercel | zero-config Vite | same caching discipline |
| GitHub Pages | actions deploy | `base: './'` already set (`40`) |

HTML itself: short cache (revalidate); hashed assets: immutable, 1y. Verify decoders (`draco/`,
`basis/`) serve with correct MIME (wasm). Precompress where the host doesn't (brotli).

## Shopify — three paths (the user has Shopify; first-class)

1. **Custom theme section + bundled assets** (the reference-proven path): `vite build` (IIFE/lib) →
   upload `experience.js` + css + models/textures to theme `assets/` → `sections/webgl-experience.liquid`
   with `{% schema %}` settings (copy, product handle) + `<canvas>` + `<script src="{{ 'experience.js' | asset_url }}" defer>`.
   Theme-check's 10KB JS rule is a LINT WARNING, not a limit (the reference ships 100× that,
   knowingly). Keep the experience on dedicated templates, not every page.
2. **Dedicated landing template** — `templates/page.experience.json` suppressing default chrome;
   the campaign-page-inside-the-store pattern; cart/checkout stay native.
3. **Subdomain campaign site** (`world.brand.com` static) linking into the store — simplest ops.

(Theme App Extensions: wrong tool — 100KB hard caps.)

**The Liquid→JS bridge** (`40`): all dynamic values (asset URLs via `asset_url`, product data,
variant IDs) emitted as data-attributes on `<body>` / `<script type="application/json">` blobs —
the JS bundle stays Liquid-free and asset-agnostic.

**Commerce patterns:** AJAX cart (`/cart/add.js`, `/cart.js`) with a custom drawer in the site's
design; selling-plan (subscription) support in the buy box; stock scarcity only when true (≤3);
variant switch drives BOTH texture swap (`22`) and DOM re-theme (`12`). Delight never touches
checkout (`33`). Localization: subdomain/Weglot-class → language links full-reload, `lang`/`dir`
correct per locale (`44`).

## Meta & SEO (judged surfaces — designed, not chores)

- `<title>` in-voice (`14`) · meta description written as copy · **OG image 1200×630 rendered from
  the actual 3D scene** (the money shot, `15` grade) + twitter:card · favicon set (SVG + fallbacks)
  matching the motif (`12`) · `theme-color` = base token.
- Real HTML content behind the visuals (`44`) is the SEO story; structured data (Product/
  Organization JSON-LD) on commerce pages; canonical; sitemap.xml + robots.txt.
- The 404 returns real 404 status (`33`); redirects for legacy paths.
- Analytics only if asked; if included: lightweight, cookieless-first, consent surface designed (`33`).

## Go-live protocol (evidence, per `04`)

Deploy → fetch the LIVE URL (200, correct headers, HTTPS) → run `51`'s live subset ON PRODUCTION
(cold-cache load, fonts, models, OG preview via a card debugger, 404 status, mobile real device) →
record everything in SHIP-REPORT → send the user the URL + the ✓ report.

---

## ✓ Verification

- [ ] Live URL returns 200 over HTTPS; cold-cache load verified on production (filmstrip).
- [ ] Cache headers: hashed assets immutable, HTML revalidate; .glb/.ktx2/wasm MIME correct (curl -I each type).
- [ ] Shopify path (if used): section renders in theme, asset_url bridge works, cart add/drawer round-trip on a test product.
- [ ] Variant switch: texture + DOM re-theme in sync on production.
- [ ] OG image + title + description render correctly in a share-card debugger (screenshot).
- [ ] Favicon set + theme-color live; 404 page live AND returns 404 (curl -I proof).
- [ ] sitemap/robots/canonical present; JSON-LD validates.
- [ ] SHIP-REPORT.md written with the full ✓ evidence list — delivered to the user.
