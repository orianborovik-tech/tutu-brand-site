import gsap from 'gsap';

/**
 * Cursor follower plumbing (33): rAF-lerped via quickTo (never raw mousemove),
 * desktop-only (gated in main.js), contextual via [data-cursor] attributes.
 * The LOOK of the cursor is a project decision — this ships unstyled hooks.
 * If the concept has no cursor idea: delete this and keep the native cursor.
 */
export default class Cursor {
  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'cursor';
    this.el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(this.el);

    const x = gsap.quickTo(this.el, 'x', { duration: 0.35, ease: 'power3' });
    const y = gsap.quickTo(this.el, 'y', { duration: 0.35, ease: 'power3' });
    window.addEventListener('mousemove', (e) => { x(e.clientX); y(e.clientY); });

    // contextual states via the DOM contract: [data-cursor="grow|label:TEXT|hide"]
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest?.('[data-cursor]');
      this.el.dataset.state = t ? t.dataset.cursor.split(':')[0] : '';
      const label = t?.dataset.cursor.startsWith('label:') ? t.dataset.cursor.slice(6) : '';
      this.el.textContent = label;
    });
  }
}
