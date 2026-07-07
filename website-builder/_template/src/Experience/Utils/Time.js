import gsap from 'gsap';
import EventEmitter from './EventEmitter.js';

/**
 * Time (30): bridges gsap.ticker — the ONE RAF owner for the whole page.
 * Emits 'tick' with (dt, elapsed); dt clamped ≤ 1/30 to survive tab-switch spikes.
 */
export default class Time extends EventEmitter {
  constructor() {
    super();
    this.elapsed = 0;
    this._tick = (time, deltaMs) => {
      const dt = Math.min(deltaMs / 1000, 1 / 30);
      this.elapsed = time;
      this.trigger('tick', dt, time);
    };
    gsap.ticker.add(this._tick);
  }
  destroy() { gsap.ticker.remove(this._tick); }
}
