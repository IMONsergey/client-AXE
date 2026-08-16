import createGlobe from '../vendor/cobe.js';

const canvas = document.getElementById('axe-globe');
const globeShell = document.querySelector('.hero__globe-shell');
const heroContent = document.querySelector('.hero__content');
const heroVisual = document.querySelector('.hero__visual');

if (canvas && globeShell && heroContent && heroVisual) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktopQuery = window.matchMedia('(min-width: 1200px)');

  let phi = 3.08;
  let theta = 0.50;
  let targetPhi = phi;
  let targetTheta = theta;
  let velocityPhi = 0;
  let velocityTheta = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let resumeAt = performance.now() + 1200;
  let lastFrame = performance.now();
  let globe;
  let readyDispatched = false;

  const DRAG_SENSITIVITY = 0.00235;
  const DRAG_INERTIA_FACTOR = 0.34;
  const ROTATION_SMOOTHING = 0.17;
  const INERTIA = 0.88;
  const AUTO_RESUME_DELAY = 1350;
  const AUTO_SPEED = reducedMotion ? 0 : 0.067;
  const VERTICAL_LIMIT = 1.03;
  // COBE's current dot shader encodes sample indices in 15 bits. Keep this below 32768
  // so rotated views do not wrap high sample indices into thin streaks on some GPUs/WebKit.
  const MAP_SAMPLES = 30000;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function syncGlobeToHero() {
    if (!desktopQuery.matches) {
      globeShell.style.removeProperty('width');
      globeShell.style.removeProperty('height');
      return;
    }

    const contentHeight = Math.round(heroContent.getBoundingClientRect().height);
    const visualWidth = Math.round(heroVisual.getBoundingClientRect().width);
    const size = Math.min(contentHeight, visualWidth);

    if (size > 0) {
      globeShell.style.width = `${size}px`;
      globeShell.style.height = `${size}px`;
    }
  }

  function canvasSize() {
    const rect = canvas.getBoundingClientRect();
    return Math.max(1, Math.round(Math.min(rect.width, rect.height)));
  }

  function markReadyAfterPaint() {
    if (readyDispatched) return;
    readyDispatched = true;

    requestAnimationFrame(() => {
      canvas.dataset.globeReady = 'true';
      window.__AXE_GLOBE_READY__ = true;
      window.dispatchEvent(new Event('axe:globe-ready'));
    });
  }

  syncGlobeToHero();
  const initialSize = canvasSize();

  globe = createGlobe(canvas, {
    devicePixelRatio: dpr,
    width: initialSize,
    height: initialSize,
    phi,
    theta,
    dark: 0.72,
    diffuse: 1.04,
    mapSamples: MAP_SAMPLES,
    mapBrightness: 4.65,
    mapBaseBrightness: 0,
    baseColor: [0.018, 0.61, 0.69],
    glowColor: [0.00, 0.21, 0.25],
    markerColor: [0.04, 0.74, 0.84],
    markers: [],
    arcs: [],
    scale: 1.14,
    opacity: 0.99
  });

  function updateDimensions() {
    syncGlobeToHero();
    requestAnimationFrame(() => {
      const size = canvasSize();
      globe.update({ width: size, height: size });
    });
  }

  const resizeObserver = new ResizeObserver(updateDimensions);
  resizeObserver.observe(heroContent);
  resizeObserver.observe(heroVisual);

  desktopQuery.addEventListener?.('change', updateDimensions);
  window.addEventListener('resize', updateDimensions, { passive: true });
  document.fonts?.ready?.then(updateDimensions);

  canvas.addEventListener('pointerdown', (event) => {
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    targetPhi = phi;
    targetTheta = theta;
    velocityPhi = 0;
    velocityTheta = 0;
    resumeAt = Infinity;
    canvas.setPointerCapture?.(event.pointerId);
  });

  canvas.addEventListener('pointermove', (event) => {
    if (!dragging) return;

    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;

    const dragScale = 420 / Math.max(340, canvas.clientWidth);
    const deltaPhi = dx * DRAG_SENSITIVITY * dragScale;
    const deltaTheta = dy * DRAG_SENSITIVITY * dragScale;

    targetPhi += deltaPhi;
    targetTheta = clamp(targetTheta + deltaTheta, -VERTICAL_LIMIT, VERTICAL_LIMIT);
    velocityPhi = deltaPhi * DRAG_INERTIA_FACTOR;
    velocityTheta = deltaTheta * DRAG_INERTIA_FACTOR;
  });

  function finishDrag(event) {
    if (!dragging) return;
    dragging = false;
    resumeAt = performance.now() + AUTO_RESUME_DELAY;
    canvas.releasePointerCapture?.(event.pointerId);
  }

  canvas.addEventListener('pointerup', finishDrag);
  canvas.addEventListener('pointercancel', finishDrag);
  canvas.addEventListener('lostpointercapture', () => {
    if (!dragging) return;
    dragging = false;
    resumeAt = performance.now() + AUTO_RESUME_DELAY;
  });

  function frame(now) {
    const dt = Math.min(50, now - lastFrame);
    lastFrame = now;

    if (!dragging) {
      targetPhi += velocityPhi;
      targetTheta = clamp(targetTheta + velocityTheta, -VERTICAL_LIMIT, VERTICAL_LIMIT);

      velocityPhi *= Math.pow(INERTIA, dt / 16.67);
      velocityTheta *= Math.pow(INERTIA, dt / 16.67);

      if (Math.abs(velocityPhi) < 0.00001) velocityPhi = 0;
      if (Math.abs(velocityTheta) < 0.00001) velocityTheta = 0;

      if (now > resumeAt && Math.abs(velocityPhi) < 0.00035 && Math.abs(velocityTheta) < 0.00035) {
        targetPhi += AUTO_SPEED * dt / 1000;
      }
    }

    const follow = 1 - Math.pow(1 - ROTATION_SMOOTHING, dt / 16.67);
    phi += (targetPhi - phi) * follow;
    theta += (targetTheta - theta) * follow;

    const idleTilt = !dragging && !reducedMotion && now > resumeAt
      ? Math.sin(now * 0.00022) * 0.016
      : 0;

    const size = canvasSize();
    globe.update({
      phi,
      theta: theta + idleTilt,
      width: size,
      height: size
    });

    if (size > 24) markReadyAfterPaint();
    requestAnimationFrame(frame);
  }

  Object.defineProperty(window, '__AXE_GLOBE__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: canvas.dataset.globeReady === 'true',
          phi,
          theta,
          dragging,
          size: canvasSize(),
          samples: MAP_SAMPLES,
          autoSpeed: AUTO_SPEED
        };
      }
    }
  });

  requestAnimationFrame(frame);
}
