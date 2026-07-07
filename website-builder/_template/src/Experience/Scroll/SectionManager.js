import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Experience from '../Experience.js';
import CameraPath from './CameraPath.js';
import { MOTION } from '../../motion.js';

/**
 * SectionManager (31): sections are read from the DOM contract
 * ([data-section] + [data-camera-state] + optional [data-pin]).
 * enter/leave restage the ONE continuous world; update() runs in the render loop.
 *
 * The two-grammar rule lives here:
 *   scrub  → world/environment (pinned timelines, camera)
 *   one-shot → content entrances (TextReveals handles those)
 */
export default class SectionManager {
  constructor({ experience }) {
    this.experience = experience ?? new Experience();
    this.experience.sectionManager = this;
    this.sections = [];
    this.active = null;
  }

  init() {
    this.cameraPath = new CameraPath();

    document.querySelectorAll('[data-section]').forEach((el) => {
      const section = {
        id: el.dataset.section,
        el,
        cameraState: el.dataset.cameraState,
        progress: 0,
      };
      this.sections.push(section);

      ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && this._setActive(section, self.direction),
        onUpdate: (self) => {
          section.progress = self.progress;
          if (this.active === section) this.experience.uniforms.uSectionProgress.value = self.progress;
        },
      });

      // pinned transformation beats (31): [data-pin] + [data-pin-distance]
      if (el.hasAttribute('data-pin')) {
        const distance = Number(el.dataset.pinDistance || 200);
        section.pinTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: `+=${distance}%`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        // The project's choreography populates section.pinTimeline (world tweens,
        // ease:'none' for scroll-linear moves). Children only — never the pinned el.
      }
    });
  }

  _setActive(section, direction) {
    this.active?.onLeave?.(direction);
    this.active = section;
    this.cameraPath.goTo(section.cameraState, direction);
    // Per-section world restage (25/31): light lerps, background Color tween,
    // fog density, post intensity — register handlers per project:
    section.onEnter?.(direction);
    // chrome retheme via the DOM contract (12): html data-theme follows section
    if (section.el.dataset.theme) document.documentElement.dataset.theme = section.el.dataset.theme;
  }

  update(dt) {
    this.active?.onUpdate?.(this.active.progress, dt);
  }
}
