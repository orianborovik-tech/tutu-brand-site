import Experience from '../Experience.js';
import Environment from './Environment.js';
import Hero from './Hero.js';

/** World (30): builds contents once resources are ready. */
export default class World {
  constructor() {
    this.experience = new Experience();
    this.experience.resources.on('ready', (items) => {
      this.environment = new Environment(items);
      this.hero = new Hero(items);
      this.ready = true;
    });
  }

  update(dt, elapsed) {
    if (!this.ready) return;
    this.hero.update(dt, elapsed);
    this.environment.update(dt, elapsed);
  }
}
