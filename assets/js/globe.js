import LAND_DATA from './globe-land-data.js';

const canvas = document.getElementById('axe-globe');
const globeShell = document.querySelector('.hero__globe-shell');
const heroContent = document.querySelector('.hero__content');
const heroVisual = document.querySelector('.hero__visual');

if (canvas && globeShell && heroContent && heroVisual) {
  const context = canvas.getContext('2d', { alpha: true });
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktopQuery = window.matchMedia('(min-width: 1200px)');

  // Familiar, front-facing Eurasia/Russia angle. The land points are sampled
  // from real coastline geometry and jittered slightly, so only recognizable
  // continents remain: no polar spirals, no Fibonacci bands, no fake islands.
  let phi = 90 * Math.PI / 180;
  let theta = 38 * Math.PI / 180;
  let targetPhi = phi;
  let targetTheta = theta;
  let velocityPhi = 0;
  let velocityTheta = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let resumeAt = performance.now() + 1200;
  let lastFrame = performance.now();
  let readyDispatched = false;

  const DRAG_SENSITIVITY = 0.0030;
  const DRAG_INERTIA_FACTOR = 0.28;
  const ROTATION_SMOOTHING = 0.16;
  const INERTIA = 0.87;
  const AUTO_RESUME_DELAY = 1600;
  const AUTO_SPEED = reducedMotion ? 0 : 0.067;
  const VERTICAL_LIMIT = 68 * Math.PI / 180;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const wrapPi = (value) => {
    while (value > Math.PI) value -= Math.PI * 2;
    while (value < -Math.PI) value += Math.PI * 2;
    return value;
  };

  function decodeLandPoints(encoded) {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    const view = new DataView(bytes.buffer);
    const result = [];
    for (let offset = 0; offset + 3 < bytes.length; offset += 4) {
      const lat = view.getInt16(offset, true) / 100;
      const lon = view.getInt16(offset + 2, true) / 100;
      result.push({
        lat: lat * Math.PI / 180,
        lon: lon * Math.PI / 180
      });
    }
    return result;
  }

  const landPoints = decodeLandPoints(LAND_DATA);

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

  function resizeCanvas() {
    syncGlobeToHero();
    const size = canvasSize();
    const pixelSize = Math.max(1, Math.round(size * dpr));
    if (canvas.width !== pixelSize || canvas.height !== pixelSize) {
      canvas.width = pixelSize;
      canvas.height = pixelSize;
    }
    return size;
  }

  function drawGlobe(size) {
    if (!context) return;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.44;

    const glow = context.createRadialGradient(cx, cy, radius * 0.78, cx, cy, radius * 1.06);
    glow.addColorStop(0, 'rgba(0, 116, 127, 0)');
    glow.addColorStop(0.84, 'rgba(0, 148, 161, 0.035)');
    glow.addColorStop(0.97, 'rgba(0, 193, 207, 0.13)');
    glow.addColorStop(1, 'rgba(0, 193, 207, 0)');
    context.fillStyle = glow;
    context.beginPath();
    context.arc(cx, cy, radius * 1.06, 0, Math.PI * 2);
    context.fill();

    const sphere = context.createRadialGradient(
      cx - radius * 0.24,
      cy - radius * 0.22,
      radius * 0.07,
      cx,
      cy,
      radius
    );
    sphere.addColorStop(0, 'rgba(4, 87, 97, 0.94)');
    sphere.addColorStop(0.56, 'rgba(3, 68, 78, 0.97)');
    sphere.addColorStop(1, 'rgba(2, 47, 57, 0.995)');
    context.fillStyle = sphere;
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.fill();

    const sinCenter = Math.sin(theta);
    const cosCenter = Math.cos(theta);
    const baseDot = Math.max(0.72, size / 590);

    for (const point of landPoints) {
      const deltaLon = wrapPi(point.lon - phi);
      const sinLat = Math.sin(point.lat);
      const cosLat = Math.cos(point.lat);
      const sinDelta = Math.sin(deltaLon);
      const cosDelta = Math.cos(deltaLon);

      const x = cosLat * sinDelta;
      const y = cosCenter * sinLat - sinCenter * cosLat * cosDelta;
      const z = sinCenter * sinLat + cosCenter * cosLat * cosDelta;
      if (z <= 0.012) continue;

      const px = cx + radius * x;
      const py = cy - radius * y;
      const edge = clamp((z - 0.01) / 0.23, 0, 1);
      const alpha = (0.42 + 0.54 * z) * (0.48 + 0.52 * edge);
      const dotRadius = baseDot * (0.72 + 0.54 * z);

      context.fillStyle = `rgba(42, 225, 241, ${alpha.toFixed(3)})`;
      context.beginPath();
      context.arc(px, py, dotRadius, 0, Math.PI * 2);
      context.fill();
    }

    context.strokeStyle = 'rgba(42, 225, 241, 0.10)';
    context.lineWidth = Math.max(0.7, size / 900);
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.stroke();
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

  resizeCanvas();

  const resizeObserver = new ResizeObserver(() => resizeCanvas());
  resizeObserver.observe(heroContent);
  resizeObserver.observe(heroVisual);

  desktopQuery.addEventListener?.('change', resizeCanvas);
  window.addEventListener('resize', resizeCanvas, { passive: true });
  document.fonts?.ready?.then(resizeCanvas);

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
    const deltaPhi = -dx * DRAG_SENSITIVITY * dragScale;
    const deltaTheta = dy * DRAG_SENSITIVITY * dragScale;

    targetPhi = wrapPi(targetPhi + deltaPhi);
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
      targetPhi = wrapPi(targetPhi + velocityPhi);
      targetTheta = clamp(targetTheta + velocityTheta, -VERTICAL_LIMIT, VERTICAL_LIMIT);

      velocityPhi *= Math.pow(INERTIA, dt / 16.67);
      velocityTheta *= Math.pow(INERTIA, dt / 16.67);

      if (Math.abs(velocityPhi) < 0.00001) velocityPhi = 0;
      if (Math.abs(velocityTheta) < 0.00001) velocityTheta = 0;

      if (now > resumeAt && Math.abs(velocityPhi) < 0.00035 && Math.abs(velocityTheta) < 0.00035) {
        targetPhi = wrapPi(targetPhi + AUTO_SPEED * dt / 1000);
      }
    }

    const follow = 1 - Math.pow(1 - ROTATION_SMOOTHING, dt / 16.67);
    const phiDelta = wrapPi(targetPhi - phi);
    phi = wrapPi(phi + phiDelta * follow);
    theta += (targetTheta - theta) * follow;

    const size = resizeCanvas();
    drawGlobe(size);
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
          samples: landPoints.length,
          autoSpeed: AUTO_SPEED,
          renderer: 'real-continent-canvas'
        };
      }
    }
  });

  requestAnimationFrame(frame);
}
