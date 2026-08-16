import createGlobe from '../vendor/cobe.js';

const canvas = document.getElementById('axe-globe');

if (canvas) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);

  const connections = [
    { from: [37.7749, -122.4194], to: [51.5074, -0.1278], phase: 0.00 },
    { from: [40.7128, -74.0060],  to: [52.5200, 13.4050], phase: 0.17 },
    { from: [48.8566, 2.3522],    to: [25.2048, 55.2708], phase: 0.34 },
    { from: [25.2048, 55.2708],   to: [1.3521, 103.8198], phase: 0.51 },
    { from: [1.3521, 103.8198],   to: [35.6762, 139.6503], phase: 0.68 },
    { from: [35.6762, 139.6503],  to: [-33.8688, 151.2093], phase: 0.85 },
    { from: [-23.5505, -46.6333], to: [40.7128, -74.0060], phase: 0.25 },
    { from: [34.0522, -118.2437], to: [35.6762, 139.6503], phase: 0.59 }
  ];

  // Recolor the prepared COBE fragment to the Figma hero palette.
  const ARC_ON = [0.02, 0.70, 0.79];
  const ARC_OFF = [0.01, 0.20, 0.24];

  const clamp01 = (value) => Math.max(0, Math.min(1, value));
  const smoothstep = (a, b, value) => {
    const t = clamp01((value - a) / (b - a));
    return t * t * (3 - 2 * t);
  };
  const mix = (a, b, t) => a + (b - a) * t;
  const mix3 = (a, b, t) => [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t)];

  // The reference frames Europe/Africa on the left and Asia through the center.
  let phi = 3.08;
  const theta = 0.52;
  let globe;

  const resize = () => {
    const size = Math.max(1, Math.round(canvas.parentElement.getBoundingClientRect().width));
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    return size;
  };

  const cssSize = resize();

  globe = createGlobe(canvas, {
    devicePixelRatio: dpr,
    width: cssSize,
    height: cssSize,
    phi,
    theta,
    dark: 0.70,
    diffuse: 1.05,
    mapSamples: 50000,
    mapBrightness: 4.8,
    mapBaseBrightness: 0,
    baseColor: [0.02, 0.64, 0.72],
    glowColor: [0.00, 0.24, 0.28],
    markerColor: [0.05, 0.74, 0.84],
    markers: [],
    arcs: [],
    arcColor: ARC_ON,
    arcWidth: 0.28,
    arcHeight: 0.20,
    markerElevation: 0.012,
    scale: 1.23,
    opacity: 0.98
  });

  let start = performance.now();
  let last = start;

  const envelope = (t) => {
    if (t < 0.18) return smoothstep(0.00, 0.18, t);
    if (t < 0.66) return 1;
    if (t < 0.88) return 1 - smoothstep(0.66, 0.88, t);
    return 0;
  };

  const frame = (now) => {
    const dt = Math.min(50, now - last);
    last = now;
    phi += dt * 0.000055;

    const seconds = (now - start) / 1000;
    const cycle = 6.4;

    const arcs = connections.map((connection, index) => {
      const local = ((seconds / cycle + connection.phase) % 1 + 1) % 1;
      let visibility = envelope(local);
      visibility = Math.pow(visibility, 1.35) * 0.58;

      return {
        id: `arc-${index}`,
        from: connection.from,
        to: connection.to,
        color: mix3(ARC_OFF, ARC_ON, visibility)
      };
    });

    const size = canvas.parentElement.clientWidth;
    globe.update({
      phi,
      theta,
      width: size,
      height: size,
      arcs
    });

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);

  window.addEventListener('resize', () => {
    const size = resize();
    globe.update({ width: size, height: size });
  });
}
