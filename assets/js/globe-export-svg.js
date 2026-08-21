import LAND_DATA from './globe-land-data.js';
import {
  GLOBE_STYLE,
  GLOBE_VIEW,
  pointAppearance,
  prepareLandPoints,
  projectPoint
} from './globe-model.js';

const SIZE = 1200;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RADIUS = SIZE * GLOBE_STYLE.radiusRatio;
const model = prepareLandPoints(LAND_DATA);

const visible = [];
for (const point of model.points) {
  const projected = projectPoint(point, GLOBE_VIEW.phi, GLOBE_VIEW.theta);
  if (projected.z <= 0.012) continue;
  const appearance = pointAppearance(projected.z, SIZE);
  visible.push({
    x: CX + RADIUS * projected.x,
    y: CY - RADIUS * projected.y,
    r: appearance.radius,
    a: appearance.alpha
  });
}

const [r, g, b] = GLOBE_STYLE.dot;
const circles = visible.map((point) =>
  `<circle cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="${point.r.toFixed(2)}" fill="rgb(${r} ${g} ${b})" fill-opacity="${point.a.toFixed(3)}"/>`
).join('');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <title>AXE globe — Russia view</title>
  <desc>Exact SVG export of the current dark globe model. Real coastline point cloud, reduced blue-noise density, enlarged dots and Russia-facing view.</desc>
  <defs>
    <radialGradient id="axe-sphere" cx="37%" cy="34%" r="68%">
      <stop offset="0" stop-color="#045761" stop-opacity="0.94"/>
      <stop offset="0.56" stop-color="#03444e" stop-opacity="0.97"/>
      <stop offset="1" stop-color="#022f39" stop-opacity="0.995"/>
    </radialGradient>
    <radialGradient id="axe-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0.82" stop-color="#0094a1" stop-opacity="0"/>
      <stop offset="0.97" stop-color="#00c1cf" stop-opacity="0.075"/>
      <stop offset="1" stop-color="#00c1cf" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="${CX}" cy="${CY}" r="${(RADIUS * 1.04).toFixed(2)}" fill="url(#axe-glow)"/>
  <circle cx="${CX}" cy="${CY}" r="${RADIUS.toFixed(2)}" fill="url(#axe-sphere)"/>
  <g id="continents">${circles}</g>
  <circle cx="${CX}" cy="${CY}" r="${RADIUS.toFixed(2)}" fill="none" stroke="rgb(${r} ${g} ${b})" stroke-opacity="0.055" stroke-width="1"/>
</svg>`;

document.getElementById('export-root').innerHTML = svg.replace(/^<\?xml[^>]+>\s*/, '');
window.__AXE_GLOBE_EXPORT__ = {
  ready: true,
  svg,
  sourceSamples: model.sourceCount,
  samples: model.points.length,
  visibleSamples: visible.length,
  phi: GLOBE_VIEW.phi,
  theta: GLOBE_VIEW.theta
};
