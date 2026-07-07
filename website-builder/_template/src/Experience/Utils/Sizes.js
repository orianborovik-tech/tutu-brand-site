import EventEmitter from './EventEmitter.js';

/**
 * Sizes (30): ResizeObserver on the documentElement (catches URL-bar changes),
 * DPR-change listener for monitor moves. Emits 'resize'.
 */
export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this._read();

    this._ro = new ResizeObserver(() => this._onResize());
    this._ro.observe(document.documentElement);
    this._watchDPR();
  }

  _read() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = window.devicePixelRatio;
  }

  _onResize() {
    this._read();
    this.trigger('resize');
    clearTimeout(this._settle); // debounced second pass for expensive reallocation (43)
    this._settle = setTimeout(() => this.trigger('resize-settled'), 150);
  }

  _watchDPR() {
    matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      .addEventListener('change', () => { this._onResize(); this._watchDPR(); }, { once: true });
  }

  destroy() { this._ro.disconnect(); }
}
