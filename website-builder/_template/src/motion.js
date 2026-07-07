/**
 * MOTION TOKENS — the JS twin of tokens.css motion block (system file 32).
 * ONE grammar for the whole site. Every gsap call references MOTION.* —
 * raw eases/durations sprinkled through code are a build-review failure.
 */
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

// TODO_DECIDE(32): THE brand curve — must match --ease-house in tokens.css
CustomEase.create('house', '0.25, 1, 0.5, 1');

export const MOTION = {
  ease: {
    house: 'house',
    in: 'power2.in',            // anticipation
    out: 'power3.out',          // TODO_DECIDE(32): entrance family
    settle: 'power3.out',       // TODO_DECIDE(32): elastic.out(1,0.6) for jelly worlds, expo for cinematic
    scene: 'power2.inOut',
  },
  dur: {
    micro: 0.18,
    ui: 0.4,                    // TODO_DECIDE(32)
    reveal: 0.8,
    hero: 1.6,
  },
  stagger: {
    unit: 0.07,                 // TODO_DECIDE(32): the ONE stagger unit
    char: 0.03,
  },
  physics: {
    overshoot: false,           // TODO_DECIDE(32): does this world overshoot/bounce?
  },
  // House rule constants (32): exits are 1.5–2x faster than entrances
  exitFactor: 0.6,
};
