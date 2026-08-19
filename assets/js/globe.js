const canvas = document.getElementById('axe-globe');
const globeShell = document.querySelector('.hero__globe-shell');
const heroContent = document.querySelector('.hero__content');
const heroVisual = document.querySelector('.hero__visual');

if (canvas && globeShell && heroContent && heroVisual) {
  const context = canvas.getContext('2d', { alpha: true });
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktopQuery = window.matchMedia('(min-width: 1200px)');

  // A conventional, front-facing Eurasia/Russia view. Unlike the previous
  // Fibonacci-sampled COBE shader, this renderer uses real continent geometry
  // and a regular geo-dot lattice, so polar spirals / false land artifacts are gone.
  let phi = 86 * Math.PI / 180;
  let theta = 44 * Math.PI / 180;
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
  let landPoints = [];
  let geometryReady = false;
  let loadError = null;

  const DRAG_SENSITIVITY = 0.0030;
  const DRAG_INERTIA_FACTOR = 0.28;
  const ROTATION_SMOOTHING = 0.16;
  const INERTIA = 0.87;
  const AUTO_RESUME_DELAY = 1600;
  const AUTO_SPEED = reducedMotion ? 0 : 0.067;
  const VERTICAL_LIMIT = 68 * Math.PI / 180;
  const WORLD_URL = 'https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json';
  const DOT_STEP = 1.72;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const wrapPi = (value) => {
    while (value > Math.PI) value -= Math.PI * 2;
    while (value < -Math.PI) value += Math.PI * 2;
    return value;
  };

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

  function unwrapRing(ring) {
    const points = [];
    let previous = null;
    for (const coordinate of ring || []) {
      let lon = Number(coordinate?.[0]);
      const lat = Number(coordinate?.[1]);
      if (!Number.isFinite(lon) || !Number.isFinite(lat)) continue;
      if (previous !== null) {
        while (lon - previous > 180) lon -= 360;
        while (lon - previous < -180) lon += 360;
      }
      previous = lon;
      points.push([lon, lat]);
    }
    if (points.length < 3) return null;
    const lons = points.map((point) => point[0]);
    const lats = points.map((point) => point[1]);
    return {
      points,
      minLon: Math.min(...lons),
      maxLon: Math.max(...lons),
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats)
    };
  }

  function prepPolygon(rings) {
    const prepared = (rings || []).map(unwrapRing).filter(Boolean);
    if (!prepared.length) return null;
    const outer = prepared[0];
    return {
      rings: prepared,
      minLon: outer.minLon,
      maxLon: outer.maxLon,
      minLat: outer.minLat,
      maxLat: outer.maxLat
    };
  }

  function prepGeometry(geometry) {
    if (!geometry) return [];
    if (geometry.type === 'Polygon') {
      const polygon = prepPolygon(geometry.coordinates);
      return polygon ? [polygon] : [];
    }
    if (geometry.type === 'MultiPolygon') {
      return geometry.coordinates.map(prepPolygon).filter(Boolean);
    }
    return [];
  }

  function pointInRing(lon, lat, ring) {
    let testLon = lon;
    while (testLon < ring.minLon - 180) testLon += 360;
    while (testLon > ring.maxLon + 180) testLon -= 360;

    const candidates = [testLon, testLon + 360, testLon - 360];
    for (const candidateLon of candidates) {
      if (candidateLon < ring.minLon || candidateLon > ring.maxLon || lat < ring.minLat || lat > ring.maxLat) continue;
      let inside = false;
      const points = ring.points;
      for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const [xi, yi] = points[i];
        const [xj, yj] = points[j];
        const crosses = ((yi > lat) !== (yj > lat)) &&
          (candidateLon < (xj - xi) * (lat - yi) / ((yj - yi) || 1e-9) + xi);
        if (crosses) inside = !inside;
      }
      if (inside) return true;
    }
    return false;
  }

  function pointInPolygon(lon, lat, polygon) {
    if (lat < polygon.minLat || lat > polygon.maxLat) return false;
    const outer = polygon.rings[0];
    if (!pointInRing(lon, lat, outer)) return false;
    for (let i = 1; i < polygon.rings.length; i += 1) {
      if (pointInRing(lon, lat, polygon.rings[i])) return false;
    }
    return true;
  }

  function buildLandPoints(features) {
    const polygons = features.flatMap((feature) => prepGeometry(feature.geometry));
    const points = [];
    let row = 0;

    for (let lat = -78; lat <= 84; lat += DOT_STEP) {
      const cosLat = Math.max(0.22, Math.cos(lat * Math.PI / 180));
      const lonStep = Math.min(6.5, DOT_STEP / cosLat);
      const offset = (row % 2) * lonStep * 0.5;

      for (let lon = -180 + offset; lon < 180; lon += lonStep) {
        let land = false;
        for (const polygon of polygons) {
          if (pointInPolygon(lon, lat, polygon)) {
            land = true;
            break;
          }
        }
        if (land) {
          points.push({
            lat: lat * Math.PI / 180,
            lon: lon * Math.PI / 180
          });
        }
      }
      row += 1;
    }

    return points;
  }

  function drawGlobe(size) {
    if (!context) return;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.445;

    const atmosphere = context.createRadialGradient(cx, cy, radius * 0.76, cx, cy, radius * 1.09);
    atmosphere.addColorStop(0, 'rgba(0, 73, 82, 0)');
    atmosphere.addColorStop(0.78, 'rgba(0, 114, 126, 0.035)');
    atmosphere.addColorStop(0.96, 'rgba(0, 184, 198, 0.16)');
    atmosphere.addColorStop(1, 'rgba(0, 184, 198, 0)');
    context.fillStyle = atmosphere;
    context.beginPath();
    context.arc(cx, cy, radius * 1.09, 0, Math.PI * 2);
    context.fill();

    const sphere = context.createRadialGradient(
      cx - radius * 0.28,
      cy - radius * 0.24,
      radius * 0.08,
      cx,
      cy,
      radius
    );
    sphere.addColorStop(0, 'rgba(5, 89, 99, 0.93)');
    sphere.addColorStop(0.54, 'rgba(3, 70, 80, 0.965)');
    sphere.addColorStop(1, 'rgba(2, 48, 58, 0.99)');
    context.fillStyle = sphere;
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.fill();

    if (geometryReady && landPoints.length) {
      const sinCenter = Math.sin(theta);
      const cosCenter = Math.cos(theta);
      const baseDot = Math.max(0.78, size / 570);

      for (const point of landPoints) {
        const deltaLon = wrapPi(point.lon - phi);
        const sinLat = Math.sin(point.lat);
        const cosLat = Math.cos(point.lat);
        const sinDelta = Math.sin(deltaLon);
        const cosDelta = Math.cos(deltaLon);

        const x = cosLat * sinDelta;
        const y = cosCenter * sinLat - sinCenter * cosLat * cosDelta;
        const z = sinCenter * sinLat + cosCenter * cosLat * cosDelta;
        if (z <= 0.015) continue;

        const px = cx + radius * x;
        const py = cy - radius * y;
        const edge = clamp((z - 0.01) / 0.25, 0, 1);
        const alpha = (0.45 + 0.52 * z) * (0.52 + 0.48 * edge);
        const dotRadius = baseDot * (0.70 + 0.58 * z);

        context.fillStyle = `rgba(42, 225, 241, ${alpha.toFixed(3)})`;
        context.beginPath();
        context.arc(px, py, dotRadius, 0, Math.PI * 2);
        context.fill();
      }
    }

    context.strokeStyle = 'rgba(42, 225, 241, 0.11)';
    context.lineWidth = Math.max(0.7, size / 900);
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.stroke();
  }

  function markReadyAfterPaint() {
    if (readyDispatched || !geometryReady) return;
    readyDispatched = true;
    requestAnimationFrame(() => {
      canvas.dataset.globeReady = 'true';
      window.__AXE_GLOBE_READY__ = true;
      window.dispatchEvent(new Event('axe:globe-ready'));
    });
  }

  async function loadGeometry() {
    try {
      const response = await fetch(WORLD_URL, { mode: 'cors', cache: 'force-cache' });
      if (!response.ok) throw new Error(`world geometry ${response.status}`);
      const world = await response.json();
      const features = (world.features || []).filter((feature) => feature.id !== 'ATA');
      landPoints = buildLandPoints(features);
      geometryReady = landPoints.length > 500;
      if (!geometryReady) throw new Error(`not enough land points: ${landPoints.length}`);
    } catch (error) {
      loadError = String(error?.message || error);
      console.error('AXE globe geometry failed', error);
      // Keep the sphere visible rather than falling back to the old distorted
      // Fibonacci map. The ready flag stays false so QA detects the failure.
    }
  }

  resizeCanvas();
  loadGeometry();

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
    let phiDelta = wrapPi(targetPhi - phi);
    phi = wrapPi(phi + phiDelta * follow);
    theta += (targetTheta - theta) * follow;

    const size = resizeCanvas();
    drawGlobe(size);
    if (geometryReady && size > 24) markReadyAfterPaint();
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
          renderer: 'geo-dot-canvas',
          geometryReady,
          loadError
        };
      }
    }
  });

  requestAnimationFrame(frame);
}
