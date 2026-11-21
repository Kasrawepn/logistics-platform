/* 3D photo gallery: the practice's own photos float as glass cards on a
   slowly turning ring. Drag to spin it, tap a photo to bring it to the front. */

import * as THREE from '../vendor/three.module.js';
import { radialTexture, roundedMaskTexture, roundedRectPoints } from './three-utils.js';

const CARD_W = 2.25;
const CARD_H = 1.5;
const FRAME_PAD = 0.14;

export function createGalleryScene(canvas, items) {
  const stage = canvas?.parentElement;
  const inactive = { available: false, setActive() {} };
  if (!canvas || !stage || !items?.length) return inactive;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (error) {
    console.warn('WebGL is unavailable, the 3D gallery falls back to a flat grid.', error);
    return inactive;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 80);
  camera.position.set(0, 0.3, 8.4);

  scene.add(new THREE.AmbientLight(0xa9ccff, 0.9));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(4, 5, 7);
  scene.add(keyLight);

  const cyanLight = new THREE.PointLight(0x38bdf8, 46, 26, 2);
  cyanLight.position.set(-6, 2.2, 4);
  scene.add(cyanLight);

  const mintLight = new THREE.PointLight(0x5eead4, 32, 26, 2);
  mintLight.position.set(5.4, -3, -2);
  scene.add(mintLight);

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: radialTexture([
        [0, 'rgba(120, 220, 255, 0.34)'],
        [0.45, 'rgba(94, 234, 212, 0.14)'],
        [1, 'rgba(56, 189, 248, 0)'],
      ]),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  halo.scale.setScalar(13);
  halo.position.set(0, 0.2, -3.6);
  scene.add(halo);

  /* ---------- orbit guide ---------- */
  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.0016, 6, 220),
    new THREE.MeshBasicMaterial({
      color: 0x5eead4,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  orbit.rotation.x = Math.PI / 2;
  orbit.position.y = -1.42;
  scene.add(orbit);

  /* ---------- photo cards ---------- */
  const mask = roundedMaskTexture(512, 340, 28);
  const loader = new THREE.TextureLoader();
  let settled = 0;

  const cards = items.map((item, index) => {
    const group = new THREE.Group();

    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(CARD_W + FRAME_PAD, CARD_H + FRAME_PAD, 0.08),
      new THREE.MeshPhysicalMaterial({
        color: 0x0b1724,
        roughness: 0.3,
        metalness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.2,
        transparent: true,
        opacity: 1,
      }),
    );
    group.add(frame);

    const photo = new THREE.Mesh(
      new THREE.PlaneGeometry(CARD_W, CARD_H),
      new THREE.MeshBasicMaterial({
        transparent: true,
        alphaMap: mask,
        toneMapped: false,
        opacity: 1,
      }),
    );
    photo.position.z = 0.055;
    photo.userData.cardIndex = index;
    group.add(photo);

    const outline = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        roundedRectPoints(CARD_W + FRAME_PAD, CARD_H + FRAME_PAD, 0.2),
      ),
      new THREE.LineBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.4 }),
    );
    outline.position.z = 0.06;
    group.add(outline);

    const done = () => {
      settled += 1;
      if (settled >= items.length) canvas.dataset.ready = 'true';
    };

    loader.load(
      item.src,
      (texture) => {
        // Crop to the card's aspect instead of stretching the photo.
        const source = texture.image;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 340;
        const ctx = canvas.getContext('2d');
        const scale = Math.max(canvas.width / source.width, canvas.height / source.height);
        const width = source.width * scale;
        const height = source.height * scale;
        ctx.drawImage(source, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);

        const cover = new THREE.CanvasTexture(canvas);
        cover.colorSpace = THREE.SRGBColorSpace;
        cover.anisotropy = renderer.capabilities.getMaxAnisotropy();
        photo.material.map = cover;
        photo.material.needsUpdate = true;
        done();
      },
      undefined,
      () => done(),
    );

    scene.add(group);
    return {
      group,
      photo,
      frame,
      outline,
      baseAngle: (index / items.length) * Math.PI * 2,
    };
  });

  canvas.dataset.cards = String(cards.length);

  /* ---------- sizing ---------- */
  let radius = 3.9;
  let cardScale = 1;

  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const narrow = width < 560;
    radius = narrow ? 3.1 : 3.9;
    cardScale = narrow ? 0.74 : 1;
    camera.position.z = narrow ? 10.1 : 8.4;
    orbit.scale.setScalar(radius);
    orbit.position.y = narrow ? -1.2 : -1.42;
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  /* ---------- drag to spin ---------- */
  let rotation = 0;
  let velocity = 0;
  let dragging = false;
  let pointerX = 0;
  let travelled = 0;
  let targetRotation = null;
  let active = true;
  let visible = true;

  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();

  function onPointerDown(event) {
    dragging = true;
    pointerX = event.clientX;
    travelled = 0;
    velocity = 0;
    targetRotation = null;
    try {
      canvas.setPointerCapture?.(event.pointerId);
    } catch {
      /* synthetic pointer events have no capture target */
    }
    canvas.classList.add('is-grabbing');
  }

  function onPointerMove(event) {
    if (!dragging) return;
    const dx = event.clientX - pointerX;
    pointerX = event.clientX;
    travelled += Math.abs(dx);
    rotation += dx * 0.0065;
    velocity = dx * 0.0011;
  }

  function focusCardAt(event) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    ndc.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);

    const hit = raycaster.intersectObjects(cards.map((card) => card.photo), false)[0];
    if (!hit) return;

    const card = cards[hit.object.userData.cardIndex];
    if (!card) return;

    const twoPi = Math.PI * 2;
    const desired = -card.baseAngle;
    const delta = (((desired - rotation + Math.PI) % twoPi) + twoPi) % twoPi - Math.PI;
    targetRotation = rotation + delta;
  }

  function onPointerUp(event) {
    if (!dragging) return;
    dragging = false;
    canvas.classList.remove('is-grabbing');
    if (travelled < 8) focusCardAt(event);
  }

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);

  /* ---------- pause when off screen ---------- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);
  }

  document.addEventListener('visibilitychange', () => {
    active = document.visibilityState === 'visible';
  });

  /* ---------- loop ---------- */
  let last = performance.now();
  let frameId = 0;

  function renderFrame(now) {
    frameId = requestAnimationFrame(renderFrame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!active || !visible) return;

    if (targetRotation !== null) {
      rotation += (targetRotation - rotation) * Math.min(1, dt * 6);
      if (Math.abs(targetRotation - rotation) < 0.003) {
        rotation = targetRotation;
        targetRotation = null;
      }
    } else if (!dragging) {
      rotation += velocity * dt * 60;
      velocity *= 0.93;
      if (!prefersReduced) rotation += 0.1 * dt;
    }

    canvas.galleryRotation = rotation;

    cards.forEach((card, index) => {
      const angle = card.baseAngle + rotation;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      card.group.position.set(x, Math.sin(angle * 1.6 + index) * 0.14, z);
      card.group.lookAt(camera.position.x, camera.position.y, camera.position.z);

      const depth = (z + radius) / (radius * 2);
      const scale = cardScale * (0.78 + depth * 0.22);
      card.group.scale.setScalar(scale);
      card.photo.material.opacity = 0.3 + depth * 0.7;
      card.frame.material.opacity = 0.28 + depth * 0.72;
      card.outline.material.opacity = 0.08 + depth * 0.5;
    });

    renderer.render(scene, camera);
  }

  frameId = requestAnimationFrame(renderFrame);

  return {
    available: true,
    setActive(next) {
      active = next && document.visibilityState === 'visible';
      last = performance.now();
    },
    dispose() {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      renderer.dispose();
    },
  };
}
