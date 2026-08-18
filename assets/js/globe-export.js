import createGlobe from '../vendor/cobe.js';

const canvas = document.getElementById('export-globe');
const params = new URLSearchParams(location.search);
const phi = Number(params.get('phi') ?? 3.08);
const theta = Number(params.get('theta') ?? 0.14);
const size = 900;
const dpr = 2;

if (canvas) {
  const globe = createGlobe(canvas, {
    devicePixelRatio: dpr,
    width: size,
    height: size,
    phi,
    theta,
    dark: 0.72,
    diffuse: 1.04,
    mapSamples: 30000,
    mapBrightness: 4.65,
    mapBaseBrightness: 0,
    baseColor: [0.018, 0.61, 0.69],
    glowColor: [0.00, 0.21, 0.25],
    markerColor: [0.04, 0.74, 0.84],
    markers: [],
    arcs: [],
    scale: 1.08,
    opacity: 0.99
  });

  let frames = 0;
  function render() {
    globe.update({ phi, theta, width: size, height: size });
    frames += 1;
    if (frames > 12) {
      canvas.dataset.ready = 'true';
      window.__AXE_GLOBE_EXPORT__ = { ready: true, phi, theta, size };
    }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
