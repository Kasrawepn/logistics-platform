/* 3D portrait stage: the dentist's photo floats as a glass card inside a
   slowly orbiting scene. Tilts with the pointer and drifts on its own. */

import * as THREE from '../vendor/three.module.js';

const PHOTO_URL = '/assets/dr-hosseini.jpg';
const PHOTO_W = 2.4;
const PHOTO_H = 3.2;
const FRAME_W = 2.62;
const FRAME_H = 3.42;

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

function roundedMaskTexture(width, height, radius) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(width - radius, 0);
  ctx.quadraticCurveTo(width, 0, width, radius);
  ctx.lineTo(width, height - radius);
  ctx.quadraticCurveTo(width, height, width - radius, height);
  ctx.lineTo(radius, height);
  ctx.quadraticCurveTo(0, height, 0, height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}

function roundedRectPoints(width, height, radius) {
  const halfW = width / 2;
  const halfH = height / 2;
  const points = [];
  const corner = (cx, cy, startAngle) => {
    for (let i = 0; i <= 6; i += 1) {
      const angle = startAngle + (i / 6) * (Math.PI / 2);
      points.push(new THREE.Vector3(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius, 0));
    }
  };
  corner(halfW - radius, halfH - radius, 0);
  corner(-halfW + radius, halfH - radius, Math.PI / 2);
  corner(-halfW + radius, -halfH + radius, Math.PI);
  corner(halfW - radius, -halfH + radius, (Math.PI * 3) / 2);
  return points;
}

export function createDentistScene(canvas) {
  const inactive = { dispose() {} };
  const stage = canvas?.parentElement;
  if (!canvas || !stage) return inactive;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (error) {
    console.warn('WebGL is unavailable for the portrait stage.', error);
    return inactive;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 6.6);

  const group = new THREE.Group();
  scene.add(group);

  /* ---------- portrait card ---------- */
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(FRAME_W, FRAME_H, 0.14),
    new THREE.MeshPhysicalMaterial({
      color: 0x0b1724,
      roughness: 0.3,
      metalness: 0.45,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
    }),
  );
  group.add(frame);

  const photo = new THREE.Mesh(
    new THREE.PlaneGeometry(PHOTO_W, PHOTO_H),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      alphaMap: roundedMaskTexture(600, 800, 44),
      toneMapped: false,
    }),
  );
  photo.position.z = 0.08;
  group.add(photo);

  new THREE.TextureLoader().load(PHOTO_URL, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    photo.material.map = texture;
    photo.material.needsUpdate = true;
  });

  const outline = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(roundedRectPoints(FRAME_W, FRAME_H, 0.22)),
    new THREE.LineBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.55 }),
  );
  outline.position.z = 0.09;
  group.add(outline);

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: radialTexture([
        [0, 'rgba(120, 220, 255, 0.55)'],
        [0.45, 'rgba(94, 234, 212, 0.2)'],
        [1, 'rgba(56, 189, 248, 0)'],
      ]),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  halo.scale.setScalar(7);
  halo.position.z = -1.2;
  group.add(halo);

  /* ---------- orbit + satellites ---------- */
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.05, 0.006, 8, 240),
    new THREE.MeshBasicMaterial({
      color: 0x5eead4,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  ring.rotation.set(1.22, 0.15, 0.2);
  group.add(ring);

  const satellites = [
    { radius: 3.05, size: 0.12, speed: 0.34, phase: 0.5, color: 0x9ff7ea, rotation: [1.22, 0.15, 0.2] },
    { radius: 3.05, size: 0.07, speed: 0.34, phase: 3.2, color: 0xffffff, rotation: [1.22, 0.15, 0.2] },
  ].map((spec) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(spec.size, 24, 24),
      new THREE.MeshPhysicalMaterial({
        color: spec.color,
        roughness: 0.12,
        metalness: 0.15,
        clearcoat: 1,
        emissive: new THREE.Color(spec.color),
        emissiveIntensity: 0.45,
      }),
    );
    group.add(mesh);
    return { mesh, spec, euler: new THREE.Euler(...spec.rotation) };
  });

  /* ---------- particles ---------- */
  const particleCount = 520;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    const radius = 3 + Math.random() * 3.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi) * 0.8;
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 0.6;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      color: 0x9fd8ff,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  group.add(particles);

  /* ---------- lights ---------- */
  scene.add(new THREE.AmbientLight(0x9fc4ff, 0.9));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(3.5, 4.5, 6);
  scene.add(keyLight);

  const cyanLight = new THREE.PointLight(0x38bdf8, 34, 20, 2);
  cyanLight.position.set(-4, 2.4, 3);
  scene.add(cyanLight);

  const violetLight = new THREE.PointLight(0xa78bfa, 22, 20, 2);
  violetLight.position.set(3.4, -3, -1.6);
  scene.add(violetLight);

  /* ---------- sizing ---------- */
  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const scale = Math.max(0.66, Math.min(1, width / 560));
    group.scale.setScalar(scale);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  /* ---------- pointer tilt ---------- */
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function onPointerMove(event) {
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  }

  function onPointerLeave() {
    pointer.targetX = 0;
    pointer.targetY = 0;
  }

  stage.addEventListener('pointermove', onPointerMove, { passive: true });
  stage.addEventListener('pointerleave', onPointerLeave);

  /* ---------- loop ---------- */
  const clock = new THREE.Clock();
  const orbitVector = new THREE.Vector3();
  let elapsed = 0;
  let active = true;
  let inView = true;
  let frameId = 0;

  function renderFrame() {
    const t = elapsed;

    pointer.x += (pointer.targetX - pointer.x) * 0.06;
    pointer.y += (pointer.targetY - pointer.y) * 0.06;

    group.rotation.y = Math.sin(t * 0.22) * 0.2 + pointer.x * 0.45;
    group.rotation.x = Math.sin(t * 0.33) * 0.04 - pointer.y * 0.22;
    group.position.y = Math.sin(t * 0.75) * 0.07;

    outline.material.opacity = 0.42 + Math.sin(t * 1.4) * 0.14;
    particles.rotation.y = t * 0.03;

    satellites.forEach(({ mesh, spec, euler }) => {
      const angle = spec.phase + t * spec.speed;
      orbitVector
        .set(Math.cos(angle) * spec.radius, 0, Math.sin(angle) * spec.radius)
        .applyEuler(euler);
      mesh.position.copy(orbitVector);
    });

    renderer.render(scene, camera);
  }

  function tick() {
    frameId = requestAnimationFrame(tick);
    if (!active || !inView || document.hidden) return;
    elapsed += Math.min(clock.getDelta(), 0.05);
    renderFrame();
  }

  if (prefersReduced) {
    renderFrame();
  } else {
    tick();
  }

  const viewObserver = new IntersectionObserver(
    (entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      if (inView) clock.getDelta();
    },
    { threshold: 0.05 },
  );
  viewObserver.observe(stage);

  function onVisibilityChange() {
    if (!document.hidden) clock.getDelta();
  }

  document.addEventListener('visibilitychange', onVisibilityChange);

  return {
    dispose() {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerleave', onPointerLeave);
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
