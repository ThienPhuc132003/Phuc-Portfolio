import * as THREE from '../vendor/three.module.js';

// A decorative WebGL scene. The HTML surrounding it remains the accessible experience.
const canvas = document.querySelector('#scene-canvas');
if (canvas) {
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    scene.add(new THREE.HemisphereLight(0xe4fff1, 0x192d31, 2.5));
    const key = new THREE.DirectionalLight(0xffffff, 5);
    key.position.set(4, 6, 7); scene.add(key);
    const fill = new THREE.DirectionalLight(0x60ffbd, 3);
    fill.position.set(-6, 1, 1); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xa2baff, 4);
    rim.position.set(0, -5, -4); scene.add(rim);
    const sculpture = new THREE.Group(); scene.add(sculpture);
    const silver = new THREE.MeshPhysicalMaterial({ color: 0xdde8ed, metalness: .63, roughness: .2, clearcoat: 1, clearcoatRoughness: .13 });
    const green = new THREE.MeshPhysicalMaterial({ color: 0x68ef98, metalness: .18, roughness: .23, clearcoat: 1 });
    const cobalt = new THREE.MeshPhysicalMaterial({ color: 0x768dff, metalness: .38, roughness: .22, clearcoat: 1 });
    const core = new THREE.Mesh(new THREE.TorusKnotGeometry(1.22, .38, 220, 32, 2, 3), silver);
    sculpture.add(core);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.15, .045, 12, 140), green);
    ring.rotation.set(1.2, .4, -.45); sculpture.add(ring);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.95, .035, 12, 140), cobalt);
    ring2.rotation.set(.2, 1.15, .6); sculpture.add(ring2);
    const beads = [];
    for (let i = 0; i < 8; i++) {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(.07 + (i % 3) * .045, 20, 16), i % 2 ? green : cobalt);
      const a = i * Math.PI * 2 / 8;
      mesh.position.set(Math.cos(a) * (2.45 + (i % 2) * .15), Math.sin(a) * 1.85, (i % 3 - 1) * .5);
      sculpture.add(mesh); beads.push(mesh);
    }
    const pointer = { x: 0, y: 0 };
    let frame = 0, visible = true, started = performance.now();
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    function size() {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width)), height = Math.max(1, Math.round(rect.height));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 600 ? 11.8 : 10;
      camera.updateProjectionMatrix();
      render();
    }
    function render(time = performance.now()) {
      const seconds = preference.matches ? 0 : (time - started) / 1000;
      const scroll = preference.matches ? 0 : Math.min(1, Math.max(0, window.scrollY / Math.max(window.innerHeight, 1)));
      sculpture.rotation.x = -.25 + pointer.y * .16 + scroll * .3;
      sculpture.rotation.y = .35 + pointer.x * .22 + seconds * .08 + scroll * .8;
      sculpture.rotation.z = -.15 + Math.sin(seconds * .4) * .07;
      renderer.render(scene, camera);
    }
    function tick(time) { frame = 0; if (!visible || preference.matches || document.hidden) return; render(time); frame = requestAnimationFrame(tick); }
    function update() { if (frame) cancelAnimationFrame(frame); frame = 0; render(); if (visible && !preference.matches && !document.hidden) frame = requestAnimationFrame(tick); }
    window.addEventListener('pointermove', event => { if (!preference.matches) { pointer.x = event.clientX / innerWidth * 2 - 1; pointer.y = event.clientY / innerHeight * 2 - 1; } }, { passive: true });
    window.addEventListener('resize', size, { passive: true });
    preference.addEventListener('change', () => { if (preference.matches) { pointer.x = 0; pointer.y = 0; } update(); });
    document.addEventListener('visibilitychange', update);
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }, { threshold: 0 }).observe(canvas);
    size(); update();
  } catch (error) {
    // WebGL is optional; the surrounding HTML and CSS remain fully usable.
    canvas.hidden = true;
  }
}
