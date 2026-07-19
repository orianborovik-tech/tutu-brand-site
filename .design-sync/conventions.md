# Mana Yerba Mate — build conventions

Sparkling yerba-mate brand system (modeled on manayerbamate.com): warm cream pages, near-black ink, four flavour colours, huge light uppercase display type, pill-shaped everything, 1px ink hairlines.

## Page setup (required)

There is no provider. But every page MUST sit on the brand cream, never white: wrap your app in `<div className="mana-root">` — it sets the cream background (`#fef7e6`), ink text (`#0e0e0e`), and the "Neue Montreal 2020" brand font. Skipping it leaves pages white and system-fonted.

## Styling idiom

Style comes from **component props + CSS custom properties** — never invent your own class names (the shipped `mana-*` classes are internal). For your own layout glue use inline styles or CSS referencing the tokens:

- Base: `--mana-cream` #fef7e6 (page bg), `--mana-ink` #0e0e0e (text, borders), `--mana-white`, `--mana-grey`
- Flavours: `--mana-yellow` = Grapefruit, `--mana-pink` = Tropical Punch, `--mana-blue` = Blackberry & Hibiscus, `--mana-green` = Melon & Mint
- Accents: `--mana-magenta`, `--mana-orange`, `--mana-navy`, `--mana-forest`
- Type: `--mana-font`; sizes `--mana-text-xs`, `--mana-text-sm`, `--mana-text-md`, `--mana-text-body`, `--mana-subtitle`, `--mana-title-product`, `--mana-title-md`, `--mana-title-lg`, `--mana-title-xl`
- Shape: `--mana-radius-pill` (2em — buttons/tags), `--mana-radius-card` (7px), `--mana-radius-dialog` (.75em)
- Layout/motion: `--mana-gutter` (20px), `--mana-ease-bounce`

Rules of the look: headings are uppercase, weight 300, line-height ≤ 1 — always use `DisplayTitle`/`Subtitle`, never hand-styled headings. Dividers and borders are always `1px solid var(--mana-ink)`. Actions are pills (`Button`) or circles (`RoundButton`). Section backgrounds are flat flavour colours, no gradients or shadows.

Colour props carry the palette: `color` on Button/RoundButton/Tag/AnnouncementBar/Marquee/Hero/SubscribeBanner accepts `'white' | 'cream' | 'yellow' | 'pink' | 'blue' | 'green' | 'magenta' | 'orange' | 'ink'` (subset varies — see each `<Name>.d.ts`). `ProductCard` takes `flavor`: `'grapefruit' | 'tropical-punch' | 'blackberry-hibiscus' | 'melon-mint'`; the exported `flavorColors` / `flavorToColor` maps convert flavour → colour.

## Where the truth lives

Read `styles.css` (imports the tokens and `_ds_bundle.css`, the full component CSS) before styling. Per-component API: `components/general/<Name>/<Name>.d.ts`; usage examples: `components/general/<Name>/<Name>.prompt.md`.

## Idiomatic page

```jsx
const { AnnouncementBar, Header, Hero, Button, ProductGrid, ProductCard, Footer } = window.ManaDS;

<div className="mana-root" style={{ minHeight: '100vh' }}>
  <AnnouncementBar>Free shipping on all purchases of $35 or more</AnnouncementBar>
  <Header nav={[{ label: 'Shop', href: '#' }, { label: 'Learn', href: '#' }]} languageLabel="Fr" cartCount={2} />
  <Hero title="Yerba Mate" subtitle="Fresh, fruity, sparkling — an energizing infusion made in Quebec.">
    <Button color="yellow" size="lg">Shop</Button>
    <Button color="white" size="lg">Learn</Button>
  </Hero>
  <ProductGrid columns={3}>
    <ProductCard name="Grapefruit" flavor="grapefruit" quantityInfo="355 ml" price="$3.75" />
    <ProductCard name="Tropical Punch" flavor="tropical-punch" quantityInfo="355 ml" price="$3.75" />
    <ProductCard name="Melon & Mint" flavor="melon-mint" quantityInfo="355 ml" price="$3.75" />
  </ProductGrid>
  <Footer brand="MANA" rainbow copyright="2026 © Mana Yerba Maté"
    links={[{ label: 'Terms of use', href: '#' }, { label: 'Refund policy', href: '#' }]} />
</div>
```
