(() => {
  const visuals = [...document.querySelectorAll('.direction-card__visual[data-pattern]')];
  if (!visuals.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const instances = [];
  const TWO_PI = Math.PI * 2;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function seeded(index, salt = 0) {
    const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
    return value - Math.floor(value);
  }

  function setup(visual, instanceIndex) {
    const canvas = visual.querySelector('.direction-card__pattern');
    if (!canvas) return null;

    const context = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!context) return null;

    const pattern = visual.dataset.pattern || 'dots';
    const state = {
      visual,
      canvas,
      context,
      pattern,
      index: instanceIndex,
      width: 1,
      height: 1,
      dpr: 1,
      frame: 0,
      frameId: 0,
      lastTime: performance.now(),
      visible: true,
      ready: false
    };

    function resize() {
      const rect = visual.getBoundingClientRect();
      state.width = Math.max(1, Math.round(rect.width));
      state.height = Math.max(1, Math.round(rect.height));
      state.dpr = Math.min(2, window.devicePixelRatio || 1);

      canvas.width = Math.max(1, Math.round(state.width * state.dpr));
      canvas.height = Math.max(1, Math.round(state.height * state.dpr));
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

      draw(performance.now());
      state.ready = true;
      canvas.dataset.patternReady = 'true';
    }

    // Card 01: a clean white dot field that drifts and breathes continuously.
    function drawDots(now) {
      const { width, height } = state;
      const spacing = clamp(width / 48, 8.5, 11.5);
      const cols = Math.ceil(width * 0.64 / spacing) + 3;
      const rows = Math.ceil(height / spacing) + 4;
      const time = reducedMotion.matches ? 0 : now * 0.00034;
      const driftX = reducedMotion.matches ? 0 : Math.sin(time * 1.25) * 2.2;
      const driftY = reducedMotion.matches ? 0 : (time * 13) % spacing;

      context.fillStyle = '#ffffff';

      for (let row = -2; row < rows; row += 1) {
        for (let col = -2; col < cols; col += 1) {
          const key = row * 97 + col * 17;
          if (seeded(key, 2.3) < 0.07) continue;

          const x = col * spacing + driftX + (seeded(key, 4.7) - 0.5) * 1.1;
          const y = row * spacing + driftY + (seeded(key, 8.1) - 0.5) * 1.1;
          const edge = clamp(1 - Math.max(0, x - width * 0.43) / (width * 0.23), 0, 1);
          if (edge <= 0.015) continue;

          const wave = reducedMotion.matches ? 0 : Math.sin(time * 5.2 + col * 0.20 + row * 0.15);
          const alpha = clamp((0.43 + seeded(key, 1.2) * 0.12 + wave * 0.045) * edge, 0, 0.60);
          const radius = 0.72 + seeded(key, 7.7) * 0.58 + wave * 0.055;

          context.globalAlpha = alpha;
          context.beginPath();
          context.arc(x, y, Math.max(0.55, radius), 0, TWO_PI);
          context.fill();
        }
      }
    }

    // Card 02: a finer, warped signal field instead of broad mechanical stripes.
    function drawLines(now) {
      const { width, height } = state;
      const time = reducedMotion.matches ? 0 : now * 0.00028;
      const spacing = 9.2;
      const slope = 0.48;
      const lineCount = Math.ceil((height + width * slope) / spacing) + 12;

      context.strokeStyle = '#ffffff';
      context.lineCap = 'round';
      context.lineJoin = 'round';

      for (let line = -6; line < lineCount; line += 1) {
        const base = line * spacing - width * slope * 0.18;
        const phase = time * 3.1 + line * 0.18;
        const emphasis = line % 7 === 0;

        context.globalAlpha = emphasis ? 0.58 : 0.38 + Math.sin(phase * 0.7) * 0.045;
        context.lineWidth = emphasis ? 0.78 : 0.52;
        context.beginPath();

        for (let x = -28; x <= width + 28; x += 9) {
          const warp = Math.sin(x * 0.021 + phase) * 3.8
            + Math.sin(x * 0.008 - phase * 0.62) * 2.2;
          const y = base + x * slope + warp;

          if (x === -28) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        context.stroke();
      }
    }

    // Card 03: an intentional network / transaction-flow diagram.
    function drawNetwork(now) {
      const { width, height } = state;
      const time = reducedMotion.matches ? 0 : now * 0.00022;
      const nodes = [
        [0.08, 0.28], [0.26, 0.28], [0.44, 0.28], [0.62, 0.28], [0.84, 0.28],
        [0.16, 0.52], [0.35, 0.52], [0.55, 0.52], [0.76, 0.52], [0.93, 0.52],
        [0.08, 0.76], [0.28, 0.76], [0.48, 0.76], [0.68, 0.76], [0.88, 0.76]
      ].map(([x, y]) => ({ x: x * width, y: y * height }));

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 4],
        [5, 6], [6, 7], [7, 8], [8, 9],
        [10, 11], [11, 12], [12, 13], [13, 14],
        [1, 5], [2, 6], [2, 7], [3, 7], [4, 8],
        [5, 10], [6, 11], [7, 12], [8, 13], [9, 14]
      ];

      context.strokeStyle = '#ffffff';
      context.lineWidth = 0.68;
      context.globalAlpha = 0.34;
      context.beginPath();

      edges.forEach(([from, to]) => {
        const a = nodes[from];
        const b = nodes[to];
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
      });
      context.stroke();

      context.fillStyle = '#ffffff';
      nodes.forEach((node, index) => {
        const pulse = reducedMotion.matches ? 0 : Math.sin(time * 7 + index * 0.72) * 0.05;
        context.globalAlpha = clamp(0.48 + pulse, 0.40, 0.58);
        context.beginPath();
        context.arc(node.x, node.y, index % 4 === 0 ? 1.45 : 1.05, 0, TWO_PI);
        context.fill();
      });

      const routes = [
        [0, 1, 2, 7, 8, 13, 14],
        [10, 11, 6, 7, 3, 4],
        [5, 6, 11, 12, 13, 8, 9]
      ];

      if (!reducedMotion.matches) {
        routes.forEach((route, routeIndex) => {
          const progress = (time * (0.52 + routeIndex * 0.08) + routeIndex * 0.31) % 1;
          const segments = route.length - 1;
          const scaled = progress * segments;
          const segment = Math.min(segments - 1, Math.floor(scaled));
          const local = scaled - segment;
          const a = nodes[route[segment]];
          const b = nodes[route[segment + 1]];
          const x = a.x + (b.x - a.x) * local;
          const y = a.y + (b.y - a.y) * local;

          context.globalAlpha = 0.60;
          context.beginPath();
          context.arc(x, y, 1.75, 0, TWO_PI);
          context.fill();
        });
      }
    }

    function draw(now) {
      context.clearRect(0, 0, state.width, state.height);

      if (state.pattern === 'lines') drawLines(now);
      else if (state.pattern === 'network') drawNetwork(now);
      else drawDots(now);

      context.globalAlpha = 1;
      state.frame += 1;
    }

    function animate(now) {
      state.lastTime = now;
      draw(now);

      if (!reducedMotion.matches && state.visible) {
        state.frameId = requestAnimationFrame(animate);
      } else {
        state.frameId = 0;
      }
    }

    function start() {
      if (reducedMotion.matches || !state.visible || state.frameId) return;
      state.lastTime = performance.now();
      state.frameId = requestAnimationFrame(animate);
    }

    function stop() {
      if (!state.frameId) return;
      cancelAnimationFrame(state.frameId);
      state.frameId = 0;
    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(visual);

    const intersectionObserver = new IntersectionObserver((entries) => {
      state.visible = entries[0]?.isIntersecting ?? true;
      if (state.visible) start();
      else stop();
    }, { rootMargin: '180px 0px' });
    intersectionObserver.observe(visual);

    reducedMotion.addEventListener?.('change', () => {
      if (reducedMotion.matches) {
        stop();
        draw(performance.now());
      } else {
        start();
      }
    });

    resize();
    start();
    return state;
  }

  visuals.forEach((visual, index) => {
    const instance = setup(visual, index);
    if (instance) instances.push(instance);
  });

  Object.defineProperty(window, '__AXE_DIRECTION_PATTERNS__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: instances.length === visuals.length && instances.every((item) => item.ready),
          instances: instances.map((item) => ({
            pattern: item.pattern,
            frame: item.frame,
            width: item.width,
            height: item.height,
            visible: item.visible,
            ready: item.ready,
            pointerStrength: 0
          }))
        };
      }
    }
  });
})();
