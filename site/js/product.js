/* ============================================================
   Taste of Asia — product page behavior
   gallery · variant/price · qty · subscription UI · add-to-cart ·
   nutrition table render · interactive pack stage (canvas noodles)
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  let variantId = 'single';
  let qty = 1;
  let buyType = 'single';

  /* ---------- variant select + price ---------- */
  function fillVariants() {
    const sel = $('.js-variant');
    if (!sel) return;
    sel.innerHTML = TOA.product.variants.map(v =>
      '<option value="' + v.id + '">' + (v.qtyLabel[TOA.lang] || v.qtyLabel.he) +
      ' · ' + TOA.money(v.price) + '</option>'
    ).join('');
    sel.value = variantId;
    updatePrice();
  }

  function updatePrice() {
    const v = TOA.variantById(variantId);
    if (!v) return;
    const sub = buyType === 'subscribe';
    const price = sub ? v.price * 0.9 : v.price;
    $('.js-price').textContent = TOA.money(price * qty);
    const note = $('.js-price-note');
    if (note) {
      const per = v.packs > 1 ? TOA.money(price / v.packs) + ' ' + TOA.t('pdp.perunit') : '';
      note.textContent = sub ? (per ? per + ' · ' : '') + TOA.t('sub.save') : per;
    }
    // demo low-stock: show for the six-pack
    const low = $('.js-low-stock');
    if (low) low.classList.toggle('hidden', v.id !== 'six');
  }

  /* ---------- gallery ---------- */
  function initGallery() {
    const frame = $('.js-gallery');
    if (!frame) return;
    const slides = Array.from(frame.children);
    const dots = $('.js-gal-dots');
    let idx = 0;
    slides.forEach((s, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'image ' + (i + 1));
      b.addEventListener('click', () => go(i));
      dots.appendChild(b);
    });
    function go(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, j) => {
        s.classList.toggle('is-current', j === idx);
        s.style.opacity = j === idx ? 1 : 0;
      });
      $$('button', dots).forEach((b, j) => b.classList.toggle('is-current', j === idx));
    }
    $('.js-gal-next').addEventListener('click', () => go(idx + 1));
    $('.js-gal-prev').addEventListener('click', () => go(idx - 1));
    go(0);
  }

  /* ---------- nutrition table ---------- */
  function renderNutrition() {
    const ul = $('.js-nutrition');
    if (!ul) return;
    const head = '<li class="head"><span>' + (TOA.lang === 'he' ? 'רכיב' : 'Content') + '</span><span>' +
      (TOA.lang === 'he' ? 'כמות' : 'Amount') + '</span></li>';
    ul.innerHTML = head + TOA.product.nutrition.map(row =>
      '<li class="' + (row.sub ? 'sub' : '') + '"><span>' + (row[TOA.lang] || row.he) + '</span>' +
      '<span>' + row.value + ' ' + (row.unit[TOA.lang] || row.unit.he) + '</span></li>'
    ).join('');
  }

  /* ---------- interactive pack stage (canvas noodle strands) ---------- */
  function initStage() {
    const stage = $('.js-spin-stage');
    const canvas = $('.js-noodle-canvas');
    const pack = $('.js-spin-pack');
    if (!stage || !canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, mouse = { x: -999, y: -999 };
    const STRANDS = 9;
    let strands = [];

    function resize() {
      W = stage.clientWidth; H = stage.clientHeight;
      canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      strands = [];
      for (let i = 0; i < STRANDS; i++) {
        const pts = [];
        const y = (H / (STRANDS + 1)) * (i + 1);
        for (let x = 0; x <= W; x += 24) pts.push({ x: x, y: y, oy: y, vy: 0 });
        strands.push(pts);
      }
    }

    let t = 0;
    function loop() {
      requestAnimationFrame(loop);
      t += 0.02;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(251,242,224,.35)';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      strands.forEach((pts, si) => {
        pts.forEach(p => {
          const wave = Math.sin(t * 1.4 + p.x * 0.02 + si) * 6;
          const dx = p.x - mouse.x, dy = p.oy - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const push = d < 90 ? (1 - d / 90) * 42 * Math.sign(dy || 1) : 0;
          const target = p.oy + wave + push;
          p.vy += (target - p.y) * 0.08;
          p.vy *= 0.86;
          p.y += p.vy;
        });
        ctx.beginPath();
        pts.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else {
            const prev = pts[i - 1];
            ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + p.x) / 2, (prev.y + p.y) / 2);
          }
        });
        ctx.stroke();
      });
    }

    stage.addEventListener('pointermove', e => {
      const r = stage.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      if (pack) {
        const nx = mouse.x / r.width - 0.5, ny = mouse.y / r.height - 0.5;
        pack.style.transform = 'rotateY(' + (nx * 26) + 'deg) rotateX(' + (-ny * 16) + 'deg)';
      }
    });
    stage.addEventListener('pointerleave', () => {
      mouse.x = -999; mouse.y = -999;
      if (pack) pack.style.transform = '';
    });
    stage.style.perspective = '900px';

    resize();
    window.addEventListener('resize', resize);
    loop();
  }

  /* ---------- wiring ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    fillVariants();
    renderNutrition();
    initGallery();
    initStage();

    const sel = $('.js-variant');
    if (sel) sel.addEventListener('change', () => { variantId = sel.value; updatePrice(); });

    const qtyInput = $('.js-qty');
    $('.js-qty-plus').addEventListener('click', () => { qty++; qtyInput.value = qty; updatePrice(); });
    $('.js-qty-minus').addEventListener('click', () => { qty = Math.max(1, qty - 1); qtyInput.value = qty; updatePrice(); });

    $$('.js-buy-type').forEach(opt => opt.addEventListener('click', () => {
      buyType = opt.dataset.type;
      $$('.js-buy-type').forEach(o => o.classList.toggle('is-checked', o === opt));
      $('.js-freqs').classList.toggle('hidden', buyType !== 'subscribe');
      updatePrice();
    }));
    $$('.js-freq').forEach(opt => opt.addEventListener('click', () => {
      $$('.js-freq').forEach(o => o.classList.toggle('is-checked', o === opt));
    }));

    const form = $('.js-buy-form');
    if (form) form.addEventListener('submit', e => {
      e.preventDefault();
      TOA.addToCart(variantId, qty, buyType === 'subscribe' ? { plan: 'subscribe' } : undefined);
    });

    document.addEventListener('toa:lang', () => { fillVariants(); renderNutrition(); });
  });
})();
