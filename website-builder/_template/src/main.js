/**
 * BOOT — the invariant order from system file 40. Do not reorder.
 * 1 scrollRestoration  2 reduced-motion gate  3 GPU tier  4 Experience
 * 5 Scroll system      6 Preloader            7 refresh sequencing
 */
import { getGPUTier } from 'detect-gpu';
import Experience from './Experience/Experience.js';
import ScrollManager from './Experience/Scroll/ScrollManager.js';
import SectionManager from './Experience/Scroll/SectionManager.js';
import Preloader from './ui/Preloader.js';
import { initReveals } from './ui/TextReveals.js';
import Cursor from './ui/Cursor.js';

// 1 — never let the browser restore mid-page scroll (breaks pinned intros)
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// 2 — reduced-motion gate BEFORE anything heavy (44)
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.toggle('js-motion', !reducedMotion);

async function boot() {
  // 3 — GPU tier → quality flags (41). Tier 0 = designed static fallback.
  let tier = 2;
  try {
    const gpu = await getGPUTier();
    tier = gpu.tier;
  } catch {
    /* detection failed → keep conservative default */
  }
  if (tier === 0) {
    document.documentElement.dataset.tier = '0';
    document.documentElement.dataset.loaderState = 'done';
    // TODO_DECIDE(41): the tier-0 static fallback is a DESIGNED page, not this bail-out.
    return;
  }

  // 4 — the WebGL experience (single canvas, single RAF via gsap.ticker)
  const experience = new Experience({
    canvas: document.querySelector('#webgl'),
    tier,
    reducedMotion,
  });

  // 5 — scroll system (Lenis + ScrollTrigger, one RAF — 31)
  const scroll = new ScrollManager({ reducedMotion });
  const sections = new SectionManager({ experience });

  // 6 — preloader: real progress → warm-up → one reveal timeline (34)
  const preloader = new Preloader({
    experience,
    reducedMotion,
    onComplete: () => {
      scroll.start();
      sections.init();
      initReveals({ reducedMotion });
      scroll.refresh(); // after fonts + preloader + reveals exist
    },
  });
  preloader.init();

  // Global niceties — each is a project decision to keep, restyle, or remove
  if (matchMedia('(pointer: fine)').matches && !reducedMotion) new Cursor();

  // Lifecycle invariants (30/40)
  document.addEventListener('visibilitychange', () => {
    document.hidden ? experience.pause() : experience.resume();
  });
  experience.canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    // TODO_DECIDE(33): designed context-lost surface (reload prompt in-voice)
    location.reload();
  });
}

boot();
