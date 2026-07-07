import gsap from 'gsap';
import { MOTION } from '../motion.js';

/**
 * Preloader (34): honest progress → warm-up under the overlay → ONE reveal
 * timeline. The loader is narrative beat zero — its ceremony (copy, game,
 * mask-wipe exit) is a project decision; the ORCHESTRATION below is fixed.
 */
export default class Preloader {
  constructor({ experience, reducedMotion, onComplete }) {
    this.experience = experience;
    this.reducedMotion = reducedMotion;
    this.onComplete = onComplete;
    this.el = document.querySelector('#preloader');
    this.valueEl = this.el?.querySelector('[data-preloader-value]');
    this.display = { value: 0 };
    this.minShownAt = performance.now() + (reducedMotion ? 0 : 1200); // min ceremony 1.2s (34)
  }

  init() {
    const returning = sessionStorage.getItem('visited') === '1'; // revisit skips ceremony (34)
    this.minShownAt = returning ? performance.now() : this.minShownAt;

    // real progress, smoothed toward actual (never faked)
    this.experience.resources.on('progress', (ratio) => {
      gsap.to(this.display, {
        value: Math.round(ratio * 100),
        duration: 0.6,
        ease: MOTION.ease.out,
        onUpdate: () => { if (this.valueEl) this.valueEl.textContent = this.display.value; },
      });
    });

    this.experience.resources.on('ready', () => this._finish());
    this.experience.resources.load();
  }

  async _finish() {
    await this.experience.warmUp();                 // compile + warm frames UNDER the overlay
    await document.fonts?.ready;
    const wait = Math.max(0, this.minShownAt - performance.now());
    setTimeout(() => this._reveal(), wait);
  }

  _reveal() {
    sessionStorage.setItem('visited', '1');
    document.documentElement.dataset.loaderState = 'revealing';

    if (this.reducedMotion) {
      this.el?.remove();
      document.documentElement.dataset.loaderState = 'done';
      this.onComplete();
      return;
    }

    // ONE timeline: loader exit → hero entrance. The exit IS the first impression.
    const tl = gsap.timeline({
      defaults: { ease: MOTION.ease.house },
      onComplete: () => {
        this.el?.remove();
        document.documentElement.dataset.loaderState = 'done';
      },
    });

    // TODO_DECIDE(34,12): the exit choreography — motif mask-wipe / counter completes /
    // camera dolly from intro pose. Placeholder: simple fade so the engine runs.
    tl.to(this.el, { autoAlpha: 0, duration: MOTION.dur.reveal });
    tl.add(() => this.onComplete(), '-=0.2'); // reveals/scroll release overlap the exit
  }
}
