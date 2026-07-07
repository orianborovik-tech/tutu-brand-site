import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Experience from '../Experience.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollManager — the one true Lenis + ScrollTrigger bootstrap (system file 31).
 * ONE RAF: gsap.ticker drives lenis. Lenis animates native scrollTop → no proxy,
 * anchors/keyboard/a11y keep working. Never combine with normalizeScroll.
 */
export default class ScrollManager {
  constructor({ reducedMotion = false } = {}) {
    this.experience = new Experience();
    this.reducedMotion = reducedMotion;

    if (!reducedMotion) {
      this.lenis = new Lenis({
        anchors: true,
        // TODO_DECIDE(31,32): lerp 0.05–0.08 heavy-cinematic / 0.1 default — motion personality
        lerp: 0.1,
      });
      this.lenis.stop(); // preloader owns scroll until reveal (34)
      this.lenis.on('scroll', ScrollTrigger.update);
      this._raf = (time) => this.lenis.raf(time * 1000);
      gsap.ticker.add(this._raf);
      gsap.ticker.lagSmoothing(0);

      // scroll velocity → shared uniform (31): speed-reactive materials/marquees
      this._velTrigger = ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: (self) => {
          const u = this.experience.uniforms;
          gsap.to(u.uVelocity, { value: self.getVelocity() / 1000, duration: 0.3, overwrite: true });
          u.uScrollProgress.value = self.progress;
        },
      });
    }

    // fonts affect layout → measurements must refresh (31/13)
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    this.experience.sizes.on('resize-settled', () => ScrollTrigger.refresh());
  }

  start() { this.lenis?.start(); }
  stop() { this.lenis?.stop(); }
  refresh() { ScrollTrigger.refresh(); }

  destroy() {
    gsap.ticker.remove(this._raf);
    this._velTrigger?.kill();
    this.lenis?.destroy();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }
}
