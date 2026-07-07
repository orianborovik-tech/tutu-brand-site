import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MOTION } from '../motion.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * The HOUSE text reveal (32/13): defined once, applied to every [data-reveal].
 * Double-split masked lines, yPercent 100→0, one stagger unit, one ease.
 * A11y: SplitText keeps real text readable (aria) — verify per 44.
 */
export function initReveals({ reducedMotion = false } = {}) {
  const targets = document.querySelectorAll('[data-reveal]');

  if (reducedMotion) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  targets.forEach((el) => {
    const split = new SplitText(el, { type: 'lines', mask: 'lines', linesClass: 'reveal-line' });
    el.classList.add('is-revealed');
    gsap.from(split.lines, {
      yPercent: 100,
      // TODO_DECIDE(32): + rotate 2–6deg origin-left if the motion personality wants it
      duration: MOTION.dur.reveal,
      ease: MOTION.ease.out,
      stagger: MOTION.stagger.unit * 2,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }, // one-shot grammar (31)
      onComplete: () => split.revert(), // clearProps hygiene (32)
    });
  });
}
