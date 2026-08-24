/* ============================================================
   Taste of Asia — shared page chrome (header / menus / drawers /
   footer / intro), injected into every page. Original markup.
   Load order: data.js → partials.js → main.js
   ============================================================ */
(function () {
  'use strict';

  /* Small original SVG icon set */
  const ICONS = {
    logo:
      '<svg viewBox="0 0 250 56" role="img" aria-label="Taste of Asia" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="2" y="2" width="52" height="52" rx="14" fill="#CE2127" stroke="#171210" stroke-width="3"/>' +
      '<path d="M12 30h32a16 16 0 0 1-32 0z" fill="#FBF2E0"/>' +
      '<path d="M20 24c0-4 3-4 3-8m7 8c0-4 3-4 3-8" stroke="#FBF2E0" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<text x="66" y="38" font-family="Secular One, Heebo, sans-serif" font-size="25" fill="currentColor" textLength="176" lengthAdjust="spacingAndGlyphs" style="direction:ltr" text-anchor="start">Taste of Asia</text>' +
      '</svg>',
    cart:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1.5 12.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5L6 7z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>',
    user:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="9" r="3.4"/><path d="M5.5 19.5a6.8 6.8 0 0 1 13 0"/><circle cx="12" cy="12" r="10.4"/></svg>',
    burger:
      '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 9h16M4 15h16"/></svg>',
    x:
      '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    chevron:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M13 5l7 7-7 7"/></svg>',
    ig:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" stroke="none"/></svg>',
    fb:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.6l.5-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.8c-.3 0-1.2-.1-2.3-.1-2.4 0-4 1.4-4 4V11H7.8v3h2.6v7h3.1z"/></svg>',
    tiktok:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 4c.4 1.8 1.6 3.1 3.4 3.4v3c-1.3 0-2.5-.4-3.4-1.1v5.5A5.7 5.7 0 1 1 10 9.2v3.1a2.6 2.6 0 1 0 3.4 2.5V4h3.2z"/></svg>',
  };
  window.TOA_ICONS = ICONS;

  const PH = (slot, label, cls) =>
    '<div class="ph ' + (cls || '') + '" data-img-slot="' + slot + '">🍜 ' + label + '</div>';
  window.TOA_PH = PH;

  const roundBtn = (extra, icon, aria) =>
    '<button type="button" class="btn btn--round ' + extra + '" aria-label="' + aria + '">' + ICONS[icon] + '</button>';

  /* ---------- header + menus ---------- */
  const headerHTML =
  '<div id="transition"><div class="circle"></div></div>' +
  '<div id="intro"><div><p class="intro-line rainbow"></p>' +
  '<p class="intro-sub"><span>UDON</span><span>NOODLES</span></p></div></div>' +

  '<div class="header-zone">' +
    '<div class="bar"><span data-i18n="cart.shipping"></span>' +
      '<button class="bar__close" type="button" aria-label="close">' + ICONS.x + '</button></div>' +
    '<header class="header rel">' +
      '<a class="logo" href="index.html">' + ICONS.logo + '</a>' +
      '<nav class="header__side desk-only" aria-label="main">' +
        '<button type="button" class="btn" data-menu="shop"><span data-i18n="nav.buy"></span>' + ICONS.chevron + '</button>' +
        '<button type="button" class="btn" data-menu="learn"><span data-i18n="nav.about"></span>' + ICONS.chevron + '</button>' +
        '<a class="btn" href="product.html" data-i18n="nav.product"></a>' +
      '</nav>' +
      '<div class="header__side">' +
        '<button type="button" class="btn btn--round js-lang" aria-label="language"><b class="js-lang-label"></b></button>' +
        '<a class="btn btn--round desk-only" href="contact.html" aria-label="account">' + ICONS.user + '</a>' +
        '<button type="button" class="btn btn--round js-open-cart rel" aria-label="cart">' + ICONS.cart +
          '<span class="badge-count js-cart-count is-off">0</span></button>' +
        '<button type="button" class="btn btn--round js-burger mob-only" aria-label="menu">' + ICONS.burger + '</button>' +
      '</div>' +
      '<div class="mega">' +
        '<div class="mega__panel" data-panel="shop">' +
          '<a class="mega__item" href="product.html">' + PH('menu-single', 'שקית בודדת') + '<span data-i18n="pdp.title"></span></a>' +
          '<a class="mega__item" href="product.html#bundles">' + PH('menu-trio', 'מארז שלישייה') + '<span data-i18n="slider.title"></span></a>' +
          '<a class="mega__item" href="index.html#ideas">' + PH('menu-ideas', 'רעיונות הגשה') + '<span data-i18n="ideas.title"></span></a>' +
        '</div>' +
        '<div class="mega__panel" data-panel="learn">' +
          '<a class="mega__item" href="stores.html">' + PH('menu-stores', 'נקודות מכירה') + '<span data-i18n="nav.stores"></span></a>' +
          '<a class="mega__item" href="about.html">' + PH('menu-about', 'הסיפור') + '<span data-i18n="nav.about"></span></a>' +
          '<a class="mega__item" href="faq.html">' + PH('menu-faq', 'שו״ת') + '<span data-i18n="nav.faq"></span></a>' +
          '<a class="mega__item" href="contact.html">' + PH('menu-contact', 'צרו קשר') + '<span data-i18n="nav.contact"></span></a>' +
        '</div>' +
      '</div>' +
    '</header>' +
  '</div>' +

  '<section class="mmenu" aria-label="mobile menu">' +
    '<a href="product.html" data-i18n="nav.product"></a>' +
    '<button type="button" class="mmenu__link js-macc"><span class="flex flex-c flex-sb" style="width:100%"><span data-i18n="nav.buy"></span><span class="plus-icon"></span></span></button>' +
    '<div class="mmenu__sub">' +
      '<a href="product.html"><span data-i18n="pdp.title"></span></a>' +
      '<a href="product.html#bundles"><span data-i18n="slider.title"></span></a>' +
    '</div>' +
    '<a href="about.html" data-i18n="nav.about"></a>' +
    '<a href="stores.html" data-i18n="nav.stores"></a>' +
    '<a href="faq.html" data-i18n="nav.faq"></a>' +
    '<a href="contact.html" data-i18n="nav.contact"></a>' +
    '<div class="mmenu__foot">' +
      '<button type="button" class="btn js-lang"><b class="js-lang-label"></b></button>' +
      '<div class="flex" style="gap:.6rem">' +
        '<a class="btn btn--round" href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.ig + '</a>' +
        '<a class="btn btn--round" href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">' + ICONS.fb + '</a>' +
        '<a class="btn btn--round" href="https://tiktok.com" target="_blank" rel="noopener" aria-label="TikTok">' + ICONS.tiktok + '</a>' +
      '</div>' +
    '</div>' +
  '</section>';

  /* ---------- footer + drawers ---------- */
  const footerHTML =
  '<footer class="footer dark">' +
    '<div class="footer__socials">' +
      '<a class="btn btn--round" style="background:transparent;border-color:currentColor" href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.ig + '</a>' +
      '<a class="btn btn--round" style="background:transparent;border-color:currentColor" href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">' + ICONS.fb + '</a>' +
      '<a class="btn btn--round" style="background:transparent;border-color:currentColor" href="https://tiktok.com" target="_blank" rel="noopener" aria-label="TikTok">' + ICONS.tiktok + '</a>' +
    '</div>' +
    '<p class="footer__giant" aria-hidden="true">UDON!</p>' +
    '<div class="footer__game">' +
      '<div class="game-ui"><button type="button" class="btn btn--pop js-game-start desk-only"><span data-i18n="game.desktop"></span></button>' +
      '<button type="button" class="btn btn--pop js-game-start mob-only"><span data-i18n="game.mobile"></span></button></div>' +
      '<canvas class="js-game" aria-label="mini game"></canvas>' +
    '</div>' +
    '<div class="footer__legal">' +
      '<p data-i18n="footer.rights"></p>' +
      '<ul>' +
        '<li><a href="faq.html" data-i18n="footer.terms"></a></li>' +
        '<li><a href="faq.html" data-i18n="footer.refund"></a></li>' +
        '<li><button type="button" class="js-open-credits" data-i18n="footer.credits"></button></li>' +
      '</ul>' +
    '</div>' +
  '</footer>' +

  '<button class="overlay js-overlay" aria-label="close" tabindex="-1"></button>' +

  '<aside class="drawer" data-drawer="cart" aria-label="cart">' +
    '<div class="drawer__head"><h2 data-i18n="cart.title"></h2>' +
    '<button type="button" class="btn btn--round js-close-drawer" aria-label="close">' + ICONS.x + '</button></div>' +
    '<div class="drawer__body js-cart-body"></div>' +
    '<div class="drawer__foot">' +
      '<div class="cart-total"><span data-i18n="cart.subtotal"></span><span class="js-cart-total">₪0</span></div>' +
      '<p class="cart-note" data-i18n="cart.shipping"></p>' +
      '<button type="button" class="btn btn--red btn--pop btn--big js-checkout" style="width:100%" data-i18n="cart.checkout"></button>' +
    '</div>' +
  '</aside>' +

  '<aside class="drawer" data-drawer="credits" aria-label="credits">' +
    '<div class="drawer__head"><h2 data-i18n="footer.credits"></h2>' +
    '<button type="button" class="btn btn--round js-close-drawer" aria-label="close">' + ICONS.x + '</button></div>' +
    '<div class="drawer__body">' +
      '<h3 style="font-weight:800;margin-bottom:.5rem">Taste of Asia</h3>' +
      '<p style="margin-bottom:1.5rem" data-i18n="footer.tagline"></p>' +
      '<p style="opacity:.7;font-size:.9rem">Site concept & build — Taste of Asia team.<br>Inspired by the great indie food-brand sites of the web.</p>' +
    '</div>' +
  '</aside>' +

  '<div class="js-cookies hidden" style="position:fixed;bottom:1rem;inset-inline-start:1rem;z-index:140;background:var(--cream);border:2px solid var(--ink);border-radius:999px;padding:.6em 1.2em;display:flex;gap:1rem;align-items:center;font-size:.9rem;color:var(--ink)">' +
    '<span data-i18n="cookies.text"></span><button type="button" class="btn" style="padding:.4em 1.1em" data-i18n="cookies.ok"></button>' +
  '</div>';

  /* extra dictionary entries used only by the chrome */
  Object.assign(TOA.i18n, {
    'game.desktop': { he: 'לחצו רווח כדי לקפוץ', en: 'Press Space to jump' },
    'game.mobile':  { he: 'הקישו כדי לקפוץ', en: 'Tap to jump' },
    'cookies.text': { he: 'האתר משתמש בעוגיות (מהסוג הלא טעים).', en: 'This site uses cookies (the less tasty kind).' },
    'cookies.ok':   { he: 'סבבה', en: 'Okay' },
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  });
})();
