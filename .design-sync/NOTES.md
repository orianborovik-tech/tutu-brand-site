# design-sync notes — mana-yerba-mate-ds

- This DS was **created from scratch in this repo** (`design-system/`) by extracting the design language of https://en.manayerbamate.com/ (Shopify theme CSS + homepage markup). It is not the site's own code; components are original React implementations of the site's visual system.
- Palette/typography source of truth: the site's `app.css` (theme 18). Body font "Neue Montreal 2020" (Book 300 / Regular 400 / Medium 500), woff2 files downloaded from the site's public CDN into `design-system/fonts/`. **Licensing**: Neue Montreal is a Pangram Pangram commercial font — the user should hold a license before shipping products with it.
- Build: `cd design-system && npm run build` (esbuild bundle + tsc declarations + CSS concat into `dist/`). Converter runs from repo root with `--node-modules design-system/node_modules --entry ./design-system/dist/index.js`.
- Playwright for the render check: chromium cache at `/opt/pw-browsers` is build **1194** → pin `playwright@1.56.0` in `.ds-sync` (1.61.x wants build 1228 and fails to launch).
- Preview quirk: `currentColor` inside ProductCard's can SVG resolves to ink — flavour band colour comes from `.mana-product--<color> .mana-product__art` CSS rules; keep those in sync when adding flavours.
- Text components need the cream page background to read correctly — previews wrap cells in `#fef7e6`; the conventions header tells the design agent to use `.mana-root`.
- Known render warns: none outstanding ([GRID_OVERFLOW] resolved via cardMode column overrides for AnnouncementBar, Button, Card, DisplayTitle, FeatureRow, Footer, Header, Hero, Marquee, ProductCard, ProductGrid, SubscribeBanner).

## Re-sync risks

- The site may change (it's a live Shopify store) — this DS snapshots its July 2026 look; re-syncs do NOT re-scrape the site. To track a redesign, re-run the extraction against `app.css` and update `design-system/src/css/*`.
- Fonts are network-fetched artifacts committed into `design-system/fonts/` — nothing re-downloads them; if they're deleted, re-fetch from the site CDN (URLs in git history of this file's first version).
- `.design-sync/previews/*.tsx` mirror site copy (flavour names, benefit lines). If the brand renames flavours, previews and `flavorColors` in `design-system/src/tokens.ts` must change together.
- ProductGrid "ShopGrid" review sheet crops the second row (capture viewport) — cells verified whole in the html; not a defect.
