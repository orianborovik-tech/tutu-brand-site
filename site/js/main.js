/* ============================================================
   Taste of Asia — global site behavior (original implementation)
   i18n · header/menus · cart drawer · sliders · accordions ·
   reveal animations · preloader · marquee · footer runner game
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ================= i18n ================= */
  const LANG_KEY = 'toa-lang';
  TOA.lang = localStorage.getItem(LANG_KEY) || 'he';

  TOA.t = function (key) {
    const entry = TOA.i18n[key];
    if (!entry) return key;
    return entry[TOA.lang] || entry.he;
  };

  function applyLang() {
    const he = TOA.lang === 'he';
    document.documentElement.lang = TOA.lang;
    document.documentElement.dir = he ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(el => { el.textContent = TOA.t(el.dataset.i18n); });
    $$('[data-i18n-ph]').forEach(el => { el.placeholder = TOA.t(el.dataset.i18nPh); });
    $$('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', TOA.t(el.dataset.i18nAria)); });
    $$('.js-lang-label').forEach(el => { el.textContent = TOA.t('lang.switch'); });
    buildMarquee();
    splitLetters();
    renderCart();
    document.dispatchEvent(new CustomEvent('toa:lang', { detail: TOA.lang }));
  }

  window.toaToggleLang = function () {
    TOA.lang = TOA.lang === 'he' ? 'en' : 'he';
    localStorage.setItem(LANG_KEY, TOA.lang);
    applyLang();
  };

  /* ================= money ================= */
  TOA.money = v => '₪' + (Math.round(v * 100) / 100).toFixed(2).replace(/\.00$/, '');
  TOA.variantById = id => TOA.product.variants.find(v => v.id === id);

  /* ================= cart ================= */
  const CART_KEY = 'toa-cart';
  function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  let cart = loadCart();
  const saveCart = () => localStorage.setItem(CART_KEY, JSON.stringify(cart));

  TOA.cartCount = () => cart.reduce((n, l) => n + l.qty, 0);
  const linePrice = l => {
    const v = TOA.variantById(l.variantId);
    if (!v) return 0;
    return (l.plan === 'subscribe' ? v.price * 0.9 : v.price) * l.qty;
  };
  TOA.cartSubtotal = () => cart.reduce((s, l) => s + linePrice(l), 0);

  TOA.addToCart = function (variantId, qty, opts) {
    qty = qty || 1;
    const line = cart.find(l => l.variantId === variantId && l.plan === (opts && opts.plan));
    if (line) line.qty += qty;
    else cart.push({ variantId: variantId, qty: qty, plan: opts && opts.plan });
    saveCart(); renderCart(); toast(TOA.t('cart.added')); openDrawer('cart');
  };

  function setQty(i, qty) {
    if (qty <= 0) cart.splice(i, 1);
    else cart[i].qty = qty;
    saveCart(); renderCart();
  }

  function renderCart() {
    const badge = $('.js-cart-count');
    const count = TOA.cartCount();
    if (badge) {
      badge.textContent = count;
      badge.classList.toggle('is-off', count === 0);
    }
    const body = $('.js-cart-body');
    if (!body) return;
    if (!cart.length) {
      body.innerHTML =
        '<div class="cart-empty"><p>' + esc(TOA.t('cart.empty')) + '</p>' +
        '<a class="btn btn--red btn--pop" href="product.html">' + esc(TOA.t('cart.empty.cta')) + '</a></div>';
    } else {
      body.innerHTML = cart.map((l, i) => {
        const v = TOA.variantById(l.variantId);
        if (!v) return '';
        const plan = l.plan ? '<div class="cart-line__variant">' + esc(TOA.t('sub.save')) + '</div>' : '';
        return '<div class="cart-line">' +
          '<div class="ph" style="width:74px;height:88px;border-radius:12px;border:2px solid var(--ink)">🍜</div>' +
          '<div><div class="cart-line__name">' + esc(TOA.t('pdp.title')) + '</div>' +
          '<div class="cart-line__variant">' + esc(v.qtyLabel[TOA.lang] || v.qtyLabel.he) + '</div>' + plan +
          '<div class="qty">' +
          '<button type="button" data-cart-minus="' + i + '" aria-label="-">−</button>' +
          '<output>' + l.qty + '</output>' +
          '<button type="button" data-cart-plus="' + i + '" aria-label="+">+</button>' +
          '</div></div>' +
          '<div style="margin-inline-start:auto;font-weight:800">' + TOA.money(linePrice(l)) + '</div>' +
          '<button class="cart-line__x" type="button" data-cart-remove="' + i + '" aria-label="' + esc(TOA.t('cart.remove')) + '">✕</button>' +
          '</div>';
      }).join('');
    }
    const totalEl = $('.js-cart-total');
    if (totalEl) totalEl.textContent = TOA.money(TOA.cartSubtotal());
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  let toastTimer;
  function toast(msg) {
    let el = $('.toast');
    if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-on'), 2600);
  }
  TOA.toast = toast;

  /* ================= drawers / overlay ================= */
  function openDrawer(name) {
    $$('.drawer').forEach(d => d.classList.toggle('is-on', d.dataset.drawer === name));
    const ov = $('.js-overlay'); if (ov) ov.classList.add('is-on');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawers() {
    $$('.drawer').forEach(d => d.classList.remove('is-on'));
    const ov = $('.js-overlay'); if (ov) ov.classList.remove('is-on');
    document.body.style.overflow = '';
  }
  TOA.openDrawer = openDrawer;
  TOA.closeDrawers = closeDrawers;

  /* ================= preloader ================= */
  function runIntro() {
    const intro = $('#intro');
    if (!intro) return;
    if (sessionStorage.getItem('toa-intro-done')) { intro.remove(); return; }
    sessionStorage.setItem('toa-intro-done', '1');
    const line = $('.intro-line', intro);
    if (line) {
      const text = TOA.t('intro.line');
      line.innerHTML = '';
      text.split('').forEach((ch, i) => {
        const s = document.createElement('span');
        s.className = 'letter';
        s.style.animationDelay = (i * 0.045) + 's';
        s.textContent = ch === ' ' ? ' ' : ch;
        line.appendChild(s);
      });
    }
    setTimeout(() => {
      const tr = $('#transition');
      if (tr) {
        tr.classList.add('is-covering');
        setTimeout(() => { intro.classList.add('is-done'); tr.classList.remove('is-covering'); }, 450);
        setTimeout(() => intro.remove(), 1300);
      } else {
        intro.classList.add('is-done');
        setTimeout(() => intro.remove(), 800);
      }
    }, 1600);
  }

  /* ================= marquee ================= */
  function buildMarquee() {
    $$('.marquee').forEach(m => {
      const track = $('.marquee__track', m);
      if (!track) return;
      const text = TOA.t(track.dataset.i18nMarquee || 'marquee.text');
      track.innerHTML = '';
      for (let i = 0; i < 8; i++) {
        const s = document.createElement('span');
        s.textContent = text;
        if (i >= 4) s.setAttribute('aria-hidden', 'true');
        track.appendChild(s);
      }
    });
  }

  /* ================= letter splitting for giant words ================= */
  function splitLetters() {
    $$('[data-split]').forEach(el => {
      const text = el.dataset.i18n ? TOA.t(el.dataset.i18n) : (el.dataset.text || el.textContent);
      el.innerHTML = '';
      text.split('').forEach((ch, i) => {
        const s = document.createElement('span');
        s.className = 'letter';
        s.style.transitionDelay = (i * 0.04) + 's';
        s.textContent = ch === ' ' ? ' ' : ch;
        el.appendChild(s);
      });
    });
  }

  /* ================= header behavior ================= */
  function initHeader() {
    const zone = $('.header-zone');
    if (!zone) return;
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      zone.classList.toggle('is-hidden', y > lastY && y > 260 && !$('.mmenu.is-open'));
      lastY = y;
    }, { passive: true });

    // mega menu
    $$('[data-menu]').forEach(btn => {
      btn.addEventListener('click', e => {
        if (btn.tagName === 'A') e.preventDefault();
        const mega = $('.mega');
        const target = btn.dataset.menu;
        const panel = $('.mega__panel[data-panel="' + target + '"]');
        const wasOpen = mega.classList.contains('is-open') && panel.classList.contains('is-active');
        $$('.mega__panel').forEach(p => p.classList.remove('is-active'));
        if (wasOpen) { mega.classList.remove('is-open'); return; }
        panel.classList.add('is-active');
        mega.classList.add('is-open');
      });
    });
    document.addEventListener('click', e => {
      const mega = $('.mega');
      if (mega && mega.classList.contains('is-open') &&
          !e.target.closest('.mega') && !e.target.closest('[data-menu]')) {
        mega.classList.remove('is-open');
      }
    });

    // burger
    const burger = $('.js-burger');
    if (burger) {
      burger.addEventListener('click', () => {
        const menu = $('.mmenu');
        const open = menu.classList.toggle('is-open');
        burger.classList.toggle('is-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
    }
    // mobile accordion
    $$('.js-macc').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('is-open');
        const sub = btn.nextElementSibling;
        if (sub) sub.classList.toggle('is-open');
      });
    });
    // announcement bar
    const bar = $('.bar');
    if (bar) {
      if (localStorage.getItem('toa-bar-off')) bar.classList.add('is-off');
      const x = $('.bar__close', bar);
      if (x) x.addEventListener('click', () => {
        bar.classList.add('is-off');
        localStorage.setItem('toa-bar-off', '1');
      });
    }
  }

  /* ================= sliders (drag + arrows) ================= */
  function initSliders() {
    $$('.js-slider').forEach(track => {
      let down = false, startX = 0, startScroll = 0, moved = false;
      track.addEventListener('pointerdown', e => {
        down = true; moved = false;
        startX = e.clientX; startScroll = track.scrollLeft;
        track.classList.add('is-dragging');
      });
      window.addEventListener('pointermove', e => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 6) moved = true;
        track.scrollLeft = startScroll - dx;
      });
      window.addEventListener('pointerup', () => {
        down = false; track.classList.remove('is-dragging');
      });
      track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);

      const scope = track.closest('section') || document;
      const step = () => {
        const card = track.firstElementChild;
        return card ? card.getBoundingClientRect().width + 24 : 320;
      };
      const dirMul = () => document.documentElement.dir === 'rtl' ? -1 : 1;
      $$('.js-slide-next', scope).forEach(b => b.addEventListener('click', () =>
        track.scrollBy({ left: step() * dirMul(), behavior: 'smooth' })));
      $$('.js-slide-prev', scope).forEach(b => b.addEventListener('click', () =>
        track.scrollBy({ left: -step() * dirMul(), behavior: 'smooth' })));
    });
  }

  /* ================= accordions (exclusive single-open, like the original) ================= */
  function initAccordions() {
    const items = $$('.acc-item');
    items.forEach(item => {
      const q = $('.acc-q', item), a = $('.acc-a', item);
      if (!q || !a) return;
      q.addEventListener('click', () => {
        const open = item.classList.toggle('is-open');
        q.classList.toggle('is-open', open);
        a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
        if (open) {
          items.forEach(other => {
            if (other !== item && other.classList.contains('is-open')) {
              other.classList.remove('is-open');
              const oq = $('.acc-q', other), oa = $('.acc-a', other);
              if (oq) oq.classList.remove('is-open');
              if (oa) oa.style.maxHeight = '0';
            }
          });
        }
      });
    });
  }

  /* ================= scroll parallax + curved text marquee ================= */
  function initParallax() {
    const els = $$('.js-parallax');
    const curves = $$('.js-curve-marquee textPath');
    if (!els.length && !curves.length) return;
    let ticking = false;
    function update() {
      ticking = false;
      const vh = window.innerHeight;
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -0.5..0.5-ish
        el.style.transform = 'translateY(' + (p * -40) + 'px)';
      });
      curves.forEach(tp => {
        const svg = tp.closest('svg');
        const r = svg.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, 1 - (r.top + r.height) / (vh + r.height)));
        tp.setAttribute('startOffset', (50 - p * 24) + '%');
      });
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ================= scroll reveal ================= */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-vis'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    $$('.reveal, [data-split]').forEach(el => io.observe(el));
  }

  /* ================= hero scenes ================= */
  const SCENES = ['wok', 'soup', 'cold'];
  function initHeroScenes() {
    const hero = $('.hero');
    if (!hero) return;
    let idx = 0;
    function setScene(i) {
      idx = (i + SCENES.length) % SCENES.length;
      const scene = SCENES[idx];
      hero.dataset.scene = scene;
      $$('.scene-pill').forEach(p => p.classList.toggle('is-current', p.dataset.scene === scene));
      const kicker = $('.js-scene-kicker');
      if (kicker) kicker.textContent = TOA.t('ideas.' + (idx + 1) + '.title');
      $$('[data-scene-img]').forEach(el =>
        el.classList.toggle('hidden', el.dataset.sceneImg !== scene));
    }
    $$('.scene-pill').forEach(p => p.addEventListener('click', () => setScene(SCENES.indexOf(p.dataset.scene))));
    const next = $('.js-scene-next'), prev = $('.js-scene-prev');
    if (next) next.addEventListener('click', () => setScene(idx + 1));
    if (prev) prev.addEventListener('click', () => setScene(idx - 1));
    document.addEventListener('toa:lang', () => setScene(idx));
    setScene(0);

    // pack drift on pointer
    const pack = $('.hero__pack img, .hero__pack .ph');
    if (pack && matchMedia('(pointer:fine)').matches) {
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        pack.style.transform = 'rotateY(' + (x * 14) + 'deg) rotateX(' + (-y * 10) + 'deg)';
      });
      hero.addEventListener('pointerleave', () => { pack.style.transform = ''; });
    }
  }

  /* ================= forms (demo) ================= */
  function initForms() {
    $$('.js-newsletter').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const email = $('input[type="email"]', form).value.trim();
        const msg = $('.msg', form.parentElement) || $('.msg', form);
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (msg) msg.textContent = ok ? TOA.t('news.success') : TOA.t('news.error');
        if (ok) form.reset();
      });
    });
    $$('.js-contact').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        toast(TOA.t('contact.success'));
        form.reset();
      });
    });
    $$('.js-checkout').forEach(btn => btn.addEventListener('click', () => toast(TOA.t('cart.demo'))));
  }

  /* ================= footer runner game (original) ================= */
  function initGame() {
    const canvas = $('.js-game');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, raf, running = false, dead = false;
    let t = 0, speed = 4, score = 0, best = +(localStorage.getItem('toa-best') || 0);
    const bowl = { x: 70, y: 0, vy: 0, r: 26, ground: 0 };
    let obstacles = [];

    function resize() {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      bowl.ground = H - 40;
      if (!running) drawIdle();
    }

    const ink = () => getComputedStyle(document.body).getPropertyValue('--cream').trim() || '#FBF2E0';

    function drawBowl(x, y, squash) {
      ctx.save(); ctx.translate(x, y); ctx.scale(1, squash || 1);
      // bowl
      ctx.fillStyle = '#CE2127'; ctx.strokeStyle = ink(); ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(0, 0, 24, 0, Math.PI, false); ctx.closePath(); ctx.fill(); ctx.stroke();
      // noodles
      ctx.strokeStyle = ink();
      for (let i = -14; i <= 14; i += 7) {
        ctx.beginPath();
        ctx.moveTo(i, -2);
        ctx.quadraticCurveTo(i + 4, -14 - Math.sin((t + i) * 0.2) * 3, i, -18);
        ctx.stroke();
      }
      // eyes
      ctx.fillStyle = ink();
      ctx.beginPath(); ctx.arc(-7, 8, 2.6, 0, 7); ctx.arc(7, 8, 2.6, 0, 7); ctx.fill();
      ctx.restore();
    }

    function drawChopsticks(o) {
      ctx.save(); ctx.translate(o.x, bowl.ground + 12);
      ctx.strokeStyle = ink(); ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(-2, -o.h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(4, -o.h); ctx.stroke();
      ctx.restore();
    }

    function drawGround() {
      ctx.strokeStyle = ink(); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, bowl.ground + 26); ctx.lineTo(W, bowl.ground + 26); ctx.stroke();
      ctx.setLineDash([2, 18]);
      ctx.beginPath(); ctx.moveTo(-(t * speed % 20), bowl.ground + 34); ctx.lineTo(W, bowl.ground + 34); ctx.stroke();
      ctx.setLineDash([]);
    }

    function drawScore() {
      ctx.fillStyle = ink(); ctx.font = '700 15px Heebo, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('🍜 ' + score + '   ★ ' + best, 14, 24);
    }

    function drawIdle() {
      ctx.clearRect(0, 0, W, H);
      drawGround();
      bowl.y = bowl.ground;
      drawBowl(bowl.x, bowl.y, 1);
      drawScore();
    }

    function reset() {
      obstacles = []; score = 0; speed = 4; t = 0; dead = false;
      bowl.y = bowl.ground; bowl.vy = 0;
    }

    function jump() {
      if (!running) { start(); return; }
      if (dead) { reset(); return; }
      if (bowl.y >= bowl.ground - 1) bowl.vy = -12.5;
    }

    function loop() {
      raf = requestAnimationFrame(loop);
      t++;
      ctx.clearRect(0, 0, W, H);
      drawGround();

      if (!dead) {
        bowl.vy += 0.65; bowl.y += bowl.vy;
        if (bowl.y > bowl.ground) { bowl.y = bowl.ground; bowl.vy = 0; }
        if (t % Math.max(50, 110 - Math.floor(speed * 6)) === 0) {
          obstacles.push({ x: W + 30, h: 34 + Math.random() * 26, passed: false });
        }
        speed += 0.0012;
        obstacles.forEach(o => { o.x -= speed; });
        obstacles = obstacles.filter(o => o.x > -40);
        obstacles.forEach(o => {
          if (!o.passed && o.x < bowl.x - 14) { o.passed = true; score++; }
          const hitX = Math.abs(o.x - bowl.x) < 22;
          const hitY = bowl.y > bowl.ground - o.h + 8;
          if (hitX && hitY) {
            dead = true;
            best = Math.max(best, score);
            localStorage.setItem('toa-best', best);
          }
        });
      }

      obstacles.forEach(drawChopsticks);
      const squash = bowl.y >= bowl.ground - 1 && bowl.vy === 0 ? 1 + Math.sin(t * 0.3) * 0.03 : 1;
      drawBowl(bowl.x, bowl.y, dead ? 0.6 : squash);
      drawScore();

      if (dead) {
        ctx.font = '700 17px Heebo, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(TOA.lang === 'he' ? 'איי! לחצו שוב כדי לנסות שוב' : 'Ouch! Press again to retry', W / 2, H / 2);
      }
    }

    function start() {
      if (running) return;
      running = true; reset();
      cancelAnimationFrame(raf); loop();
    }

    window.addEventListener('keydown', e => {
      if (e.code === 'Space' && (running || document.activeElement === document.body)) {
        const inView = canvas.getBoundingClientRect().top < innerHeight;
        if (inView) { e.preventDefault(); jump(); }
      }
    });
    canvas.addEventListener('pointerdown', jump);
    $$('.js-game-start').forEach(b => b.addEventListener('click', () => { start(); jump(); }));

    resize();
    window.addEventListener('resize', resize);
  }

  /* ================= image slot hydration =================
     Drop a real image at assets/img/<slot>.jpg|png|webp and the
     matching placeholder is replaced automatically. */
  function hydrateImageSlots() {
    const exts = ['jpg', 'png', 'webp'];
    $$('[data-img-slot]').forEach(el => {
      const slot = el.dataset.imgSlot;
      const isImg = el.tagName === 'IMG';
      (function tryNext(i) {
        if (i >= exts.length) return;
        const probe = new Image();
        probe.onload = () => {
          if (isImg) { el.src = probe.src; return; }
          // keep the element (layout/JS references intact), fill it with the image
          el.classList.remove('ph');
          el.textContent = '';
          el.style.padding = '0';
          const img = document.createElement('img');
          img.src = probe.src;
          img.alt = el.dataset.alt || '';
          img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block;';
          el.appendChild(img);
        };
        probe.onerror = () => tryNext(i + 1);
        probe.src = 'assets/img/' + slot + '.' + exts[i];
      })(0);
    });
  }

  /* ================= wire up ================= */
  document.addEventListener('DOMContentLoaded', () => {
    applyLang();
    runIntro();
    initHeader();
    initSliders();
    initAccordions();
    initParallax();
    initReveal();
    initHeroScenes();
    initForms();
    initGame();
    hydrateImageSlots();
    renderCart();

    // delegated cart + drawer events
    document.addEventListener('click', e => {
      const openCart = e.target.closest('.js-open-cart');
      if (openCart) { e.preventDefault(); openDrawer('cart'); }
      if (e.target.closest('.js-open-credits')) { e.preventDefault(); openDrawer('credits'); }
      if (e.target.closest('.js-close-drawer') || e.target.closest('.js-overlay')) closeDrawers();
      const add = e.target.closest('[data-add-variant]');
      if (add) { e.preventDefault(); TOA.addToCart(add.dataset.addVariant, 1); }
      const minus = e.target.closest('[data-cart-minus]');
      if (minus) setQty(+minus.dataset.cartMinus, cart[+minus.dataset.cartMinus].qty - 1);
      const plus = e.target.closest('[data-cart-plus]');
      if (plus) setQty(+plus.dataset.cartPlus, cart[+plus.dataset.cartPlus].qty + 1);
      const rem = e.target.closest('[data-cart-remove]');
      if (rem) setQty(+rem.dataset.cartRemove, 0);
      const lang = e.target.closest('.js-lang');
      if (lang) { e.preventDefault(); window.toaToggleLang(); }
    });

    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawers(); });

    // cookie banner (demo)
    const cb = $('.js-cookies');
    if (cb && !localStorage.getItem('toa-cookies')) cb.classList.remove('hidden');
    if (cb) $('button', cb).addEventListener('click', () => {
      localStorage.setItem('toa-cookies', '1'); cb.classList.add('hidden');
    });
  });
})();
