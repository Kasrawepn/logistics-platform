/* Orbit-sphere hero: a glossy pearl core wrapped in tilted rings,
   orbiting satellites and a particle field. Pointer-parallax + slow drift. */

import * as THREE from '../vendor/three.module.js';

const CORE_RADIUS = 1.55;

function radialTexture(stops) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createOrbitScene(canvas) {
  const inactive = { setActive() {}, dispose() {} };
  if (!canvas) return inactive;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
  } catch (error) {
    console.warn('WebGL is unavailable, hero falls back to its CSS background.', error);
    return inactive;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
  camera.position.set(0, 0, 7.4);

  const world = new THREE.Group();
  scene.add(world);

  /* ---------- pearl core ---------- */
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(CORE_RADIUS, 96, 96),
    new THREE.MeshPhysicalMaterial({
      color: 0xf6fcff,
      roughness: 0.16,
      metalness: 0.06,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      sheen: 1,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color(0x8fd9ff),
      emissive: new THREE.Color(0x0d3346),
      emissiveIntensity: 0.55,
    }),
  );
  world.add(core);

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: radialTexture([
        [0, 'rgba(160, 240, 255, 0.85)'],
        [0.32, 'rgba(94, 234, 212, 0.32)'],
        [0.68, 'rgba(56, 189, 248, 0.12)'],
        [1, 'rgba(56, 189, 248, 0)'],
      ]),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  halo.scale.setScalar(7.8);
  halo.position.z = -1.3;
  world.add(halo);

  /* ---------- dotted shell ---------- */
  const shell = new THREE.Points(
    new THREE.SphereGeometry(2.12, 40, 26),
    new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.028,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  world.add(shell);

  /* ---------- rings ---------- */
  const ringSpecs = [
    { radius: 2.5, tube: 0.0055, color: 0x5eead4, opacity: 0.6, rotation: [1.16, 0, 0.22], spin: 0.05 },
    { radius: 3.0, tube: 0.005, color: 0x38bdf8, opacity: 0.42, rotation: [0.52, 0.4, -0.58], spin: -0.04 },
    { radius: 3.62, tube: 0.0045, color: 0xa78bfa, opacity: 0.3, rotation: [1.45, 0.2, 0.58], spin: 0.03 },
  ];

  const rings = ringSpecs.map((spec) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(spec.radius, spec.tube, 8, 260),
      new THREE.MeshBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: spec.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    ring.rotation.set(...spec.rotation);
    world.add(ring);
    return { mesh: ring, spin: spec.spin };
  });

  /* ---------- orbiting satellites ---------- */
  const orbitSpecs = [
    { radius: 2.5, size: 0.135, speed: 0.42, phase: 0.4, rotation: [1.16, 0, 0.22], color: 0x9ff7ea, glow: 0.4 },
    { radius: 2.5, size: 0.07, speed: 0.42, phase: 2.7, rotation: [1.16, 0, 0.22], color: 0xe6fdff, glow: 0.5 },
    { radius: 3.0, size: 0.17, speed: -0.3, phase: 1.2, rotation: [0.52, 0.4, -0.58], color: 0xbfe9ff, glow: 0.3 },
    { radius: 3.62, size: 0.105, speed: 0.22, phase: 3.9, rotation: [1.45, 0.2, 0.58], color: 0xd8ccff, glow: 0.45 },
    { radius: 3.62, size: 0.065, speed: 0.22, phase: 0.9, rotation: [1.45, 0.2, 0.58], color: 0xffffff, glow: 0.6 },
  ];

  const satellites = orbitSpecs.map((spec) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(spec.size, 24, 24),
      new THREE.MeshPhysicalMaterial({
        color: spec.color,
        roughness: 0.12,
        metalness: 0.15,
        clearcoat: 1,
        emissive: new THREE.Color(spec.color),
        emissiveIntensity: spec.glow,
      }),
    );
    world.add(mesh);
    return { mesh, spec, euler: new THREE.Euler(...spec.rotation) };
  });

  /* ---------- particle field ---------- */
  const starCount = 1400;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i += 1) {
    const radius = 3.4 + Math.random() * 5.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = radius * Math.cos(phi) * 0.72;
    starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }
  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({
      color: 0x9fd8ff,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  world.add(stars);

  /* ---------- lights ---------- */
  scene.add(new THREE.AmbientLight(0x9fc4ff, 0.6));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
  keyLight.position.set(4.5, 6, 6.5);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x7dd3fc, 1.8);
  rimLight.position.set(-5, -3.5, -4);
  scene.add(rimLight);

  const cyanLight = new THREE.PointLight(0x38bdf8, 45, 24, 2);
  cyanLight.position.set(-4.6, 2.6, 3.2);
  scene.add(cyanLight);

  const violetLight = new THREE.PointLight(0xa78bfa, 32, 24, 2);
  violetLight.position.set(4.2, -3.4, -2.2);
  scene.add(violetLight);

  /* ---------- sizing ---------- */
  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const wide = width >= 900;
    world.position.x = wide ? -1.3 : 0;
    world.position.y = wide ? 0.05 : -1.15;
    world.scale.setScalar(wide ? 1 : Math.min(0.92, Math.max(0.6, width / 720)));
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  /* ---------- pointer parallax ---------- */
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function onPointerMove(event) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });

  /* ---------- loop ---------- */
  const clock = new THREE.Clock();
  const orbitVector = new THREE.Vector3();
  let elapsed = 0;
  let active = true;
  let frameId = 0;

  function renderFrame() {
    const t = elapsed;

    pointer.x += (pointer.targetX - pointer.x) * 0.045;
    pointer.y += (pointer.targetY - pointer.y) * 0.045;

    world.rotation.y = Math.sin(t * 0.16) * 0.2 + pointer.x * 0.26;
    world.rotation.x = pointer.y * 0.14;

    core.rotation.y = t * 0.09;
    shell.rotation.y = -t * 0.05;
    stars.rotation.y = t * 0.018;

    rings.forEach(({ mesh, spin }) => {
      mesh.rotation.z += spin * 0.01;
    });

    satellites.forEach(({ mesh, spec, euler }) => {
      const angle = spec.phase + t * spec.speed;
      orbitVector
        .set(Math.cos(angle) * spec.radius, 0, Math.sin(angle) * spec.radius)
        .applyEuler(euler);
      mesh.position.copy(orbitVector);
      mesh.rotation.y = t * 0.7;
    });

    halo.material.opacity = 0.82 + Math.sin(t * 0.7) * 0.08;

    renderer.render(scene, camera);
  }

  function tick() {
    frameId = requestAnimationFrame(tick);
    if (!active || document.hidden) return;
    elapsed += Math.min(clock.getDelta(), 0.05);
    renderFrame();
  }

  if (prefersReduced) {
    resize();
    renderFrame();
  } else {
    tick();
  }

  function onVisibilityChange() {
    if (!document.hidden) clock.getDelta();
  }

  document.addEventListener('visibilitychange', onVisibilityChange);

  return {
    setActive(nextActive) {
      active = Boolean(nextActive);
      if (active) clock.getDelta();
    },
    dispose() {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      scene.traverse((object) => {
        object.geometry?.dispose?.();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose?.();
      });
      renderer.dispose();
    },
  };
}
