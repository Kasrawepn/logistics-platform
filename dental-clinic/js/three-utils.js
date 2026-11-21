/* Small canvas-texture helpers shared by the three.js scenes. */

import * as THREE from '../vendor/three.module.js';

export function radialTexture(stops) {
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

export function roundedMaskTexture(width, height, radius) {
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

export function roundedRectPoints(width, height, radius) {
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
