/**
 * Debug rig (30): ?debug → tweak panels + stats + pose logging.
 * Always shipped, hidden — the system uses it for its own verification loops.
 * lil-gui is optional: install `lil-gui` when actively tuning.
 */
export default class Debug {
  constructor() {
    this.active = new URLSearchParams(location.search).has('debug');
    if (!this.active) return;
    this._init();
  }

  async _init() {
    try {
      // optional dep — resolved at runtime only, never bundled
      const { default: GUI } = await import(/* @vite-ignore */ 'lil-' + 'gui');
      this.gui = new GUI({ title: 'experience' });
    } catch {
      console.info('[debug] lil-gui not installed — `npm i -D lil-gui` for tweak panels');
    }
  }

  folder(name) { return this.gui?.addFolder(name); }
}
