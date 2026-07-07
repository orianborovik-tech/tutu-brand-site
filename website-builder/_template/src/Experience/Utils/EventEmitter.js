/** Tiny pub/sub base (30). */
export default class EventEmitter {
  constructor() { this._listeners = {}; }
  on(event, fn) { (this._listeners[event] ||= []).push(fn); return this; }
  off(event, fn) {
    if (!fn) delete this._listeners[event];
    else this._listeners[event] = (this._listeners[event] || []).filter((f) => f !== fn);
    return this;
  }
  trigger(event, ...args) {
    for (const fn of this._listeners[event] || []) fn(...args);
    return this;
  }
}
