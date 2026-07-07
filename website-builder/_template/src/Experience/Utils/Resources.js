import * as THREE from 'three';
import EventEmitter from './EventEmitter.js';

/**
 * Resources (30/42): one LoadingManager drives the honest preloader (34).
 * Loaders lazy-init so an empty manifest costs zero bytes.
 * Emits 'progress' (ratio) and 'ready' (items map).
 */
export default class Resources extends EventEmitter {
  constructor(sources, renderer) {
    super();
    this.sources = sources;
    this.renderer = renderer;
    this.items = {};

    this.manager = new THREE.LoadingManager(
      () => this.trigger('ready', this.items),
      (_url, loaded, total) => this.trigger('progress', total ? loaded / total : 1),
    );
  }

  async load() {
    if (!this.sources.length) {
      // Nothing to load — still async so the preloader flow is identical
      queueMicrotask(() => this.trigger('ready', this.items));
      return;
    }

    const need = (type) => this.sources.some((s) => s.type === type);

    if (need('gltf')) {
      const [{ GLTFLoader }, { MeshoptDecoder }] = await Promise.all([
        import('three/addons/loaders/GLTFLoader.js'),
        import('three/addons/libs/meshopt_decoder.module.js'),
      ]);
      this.gltfLoader = new GLTFLoader(this.manager);
      this.gltfLoader.setMeshoptDecoder(MeshoptDecoder);
      // KTX2 textures inside GLBs (42): uncomment when used —
      // const { KTX2Loader } = await import('three/addons/loaders/KTX2Loader.js');
      // this.gltfLoader.setKTX2Loader(new KTX2Loader(this.manager).setTranscoderPath('/basis/').detectSupport(this.renderer));
    }
    if (need('hdr')) {
      const { RGBELoader } = await import('three/addons/loaders/RGBELoader.js');
      this.hdrLoader = new RGBELoader(this.manager);
    }
    if (need('texture')) this.textureLoader = new THREE.TextureLoader(this.manager);

    for (const s of this.sources) {
      const done = (file) => { this.items[s.name] = file; };
      if (s.type === 'gltf') this.gltfLoader.load(s.path, done);
      else if (s.type === 'hdr') this.hdrLoader.load(s.path, done);
      else if (s.type === 'texture') this.textureLoader.load(s.path, (t) => {
        t.colorSpace = THREE.SRGBColorSpace; // color textures only — data maps stay linear (21)
        done(t);
      });
    }
  }
}
