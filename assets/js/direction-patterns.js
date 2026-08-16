(() => {
  const visuals = [...document.querySelectorAll('.direction-card__visual[data-pattern]')];
  if (!visuals.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const instances = [];
  const TWO_PI = Math.PI * 2;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function setup(visual, instanceIndex) {
    const canvas = visual.querySelector('.direction-card__pattern');
    if (!canvas) return null;

    const context = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!context) return null;

    const state = {
      visual,
      canvas,
      context,
      pattern: visual.dataset.pattern || 'dots',
      index: instanceIndex,
      width: 1,
      height: 1,
      dpr: 1,
      frame: 0,
      frameId: 0,
      visible: true,
      ready: false,
      lastTime: performance.now()
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

    /* Card 01 — full-area halftone field. Clean grid, subtle breathing and drift. */
    function drawDots(now) {
      const { width, height } = state;
      const t = reducedMotion.matches ? 0 : now * 0.00022;
      const spacing = clamp(width / 52, 7.8, 10.4);
      const cols = Math.ceil(width / spacing) + 4;
      const rows = Math.ceil(height / spacing) + 4;
      const driftX = reducedMotion.matches ? 0 : Math.sin(t * 2.0) * 2.3;
      const driftY = reducedMotion.matches ? 0 : Math.cos(t * 1.55) * 1.8;

      context.fillStyle = '#ffffff';

      for (let row = -2; row < rows; row += 1) {
        for (let col = -2; col < cols; col += 1) {
          const x = col * spacing + driftX;
          const y = row * spacing + driftY;
          const nx = x / Math.max(1, width);
          const ny = y / Math.max(1, height);
          const spatial = 0.5 + 0.5 * Math.sin(nx * 10.1 - ny * 5.2 + 0.75);
          const wave = reducedMotion.matches ? 0 : Math.sin(t * 4.2 + col * 0.17 + row * 0.13);
          const radius = 0.58 + spatial * 0.78 + wave * 0.09;
          const alpha = clamp(0.34 + spatial * 0.20 + wave * 0.035, 0.26, 0.60);

          context.globalAlpha = alpha;
          context.beginPath();
          context.arc(x, y, Math.max(0.42, radius), 0, TWO_PI);
          context.fill();
        }
      }
    }

    /* Card 02 — fine diagonal signal field over the entire image.
       A broad moving refraction band bends the field instead of introducing a separate graphic. */
    function drawLines(now) {
      const { width, height } = state;
      const t = reducedMotion.matches ? 0 : now * 0.00018;
      const spacing = clamp(width / 78, 5.0, 6.8);
      const slope = 0.48;
      const lineCount = Math.ceil((height + width * slope) / spacing) + 28;
      const bandCenter = width * (0.48 + (reducedMotion.matches ? 0 : Math.sin(t * 1.4) * 0.025));
      const bandWidth = width * 0.19;

      context.strokeStyle = '#ffffff';
      context.lineCap = 'round';
      context.lineJoin = 'round';

      for (let line = -14; line < lineCount; line += 1) {
        const base = line * spacing - width * slope * 0.22;
        const pulse = reducedMotion.matches ? 0 : Math.sin(t * 4 + line * 0.14);
        context.globalAlpha = clamp(0.40 + pulse * 0.035, 0.33, 0.48);
        context.lineWidth = 0.55;
        context.beginPath();

        let started = false;
        for (let x = -40; x <= width + 40; x += 7) {
          const normalized = (x - bandCenter) / bandWidth;
          const band = Math.exp(-(normalized * normalized) * 2.7);
          const refraction = band * (14 + Math.sin(t * 5 + line * 0.18) * 3.2);
          const micro = Math.sin(x * 0.018 + line * 0.11 + t * 2.7) * 1.15;
          const y = base + x * slope + refraction + micro;

          if (!started) {
            context.moveTo(x, y);
            started = true;
          } else {
            context.lineTo(x, y);
          }
        }
        context.stroke();
      }
    }

    /* Card 03 — two overlapping large halftone domes, close to the original reference:
       recognizable circular volumes made only from dots, clipped naturally by the image bounds. */
    function drawHalftoneDomes(now) {
      const { width, height } = state;
      const t = reducedMotion.matches ? 0 : now * 0.00017;
      const spacing = clamp(width / 58, 6.7, 8.6);
      const cols = Math.ceil(width / spacing) + 4;
      const rows = Math.ceil(height / spacing) + 4;
      const breathe = reducedMotion.matches ? 0 : Math.sin(t * 2.4) * 0.018;

      const domes = [
        {
          cx: width * (0.13 + (reducedMotion.matches ? 0 : Math.sin(t * 1.1) * 0.010)),
          cy: height * 1.08,
          rx: width * (0.57 + breathe),
          ry: height * (1.36 + breathe * 0.8)
        },
        {
          cx: width * (0.73 + (reducedMotion.matches ? 0 : Math.cos(t * 0.95) * 0.010)),
          cy: height * 1.00,
          rx: width * (0.48 - breathe * 0.7),
          ry: height * (1.13 - breathe * 0.5)
        }
      ];

      context.fillStyle = '#ffffff';

      for (let row = -2; row < rows; row += 1) {
        for (let col = -2; col < cols; col += 1) {
          const x = col * spacing;
          const y = row * spacing;

          let strongest = 0;
          let second = 0;
          domes.forEach((dome) => {
            const dx = (x - dome.cx) / dome.rx;
            const dy = (y - dome.cy) / dome.ry;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const inside = clamp(1 - distance, 0, 1);
            if (inside > strongest) {
              second = strongest;
              strongest = inside;
            } else if (inside > second) {
              second = inside;
            }
          });

          if (strongest <= 0.01) continue;

          const ripple = reducedMotion.matches ? 0 : Math.sin(t * 5.5 + col * 0.14 + row * 0.11) * 0.035;
          const overlap = Math.min(strongest, second) * 0.16;
          const radius = 0.52 + strongest * 1.18 + overlap * 0.45;
          const alpha = clamp(0.27 + strongest * 0.27 + overlap + ripple, 0.22, 0.60);

          context.globalAlpha = alpha;
          context.beginPath();
          context.arc(x, y, radius, 0, TWO_PI);
          context.fill();
        }
      }
    }

    function draw(now) {
      context.clearRect(0, 0, state.width, state.height);

      if (state.pattern === 'lines') drawLines(now);
      else if (state.pattern === 'network' || state.pattern === 'arcs') drawHalftoneDomes(now);
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

    const resizeObserver = new ResizeObserver(resize);
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
