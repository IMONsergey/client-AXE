(() => {
  const visuals = [...document.querySelectorAll('.direction-card__visual[data-pattern]')];
  if (!visuals.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
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
      ready: false,
      pointer: { x: 0, y: 0, strength: 0, target: 0, active: false }
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

    function drawDots(now) {
      const { width, height, pointer } = state;
      const spacing = clamp(width / 48, 8.5, 11.5);
      const cols = Math.ceil(width * 0.62 / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      const time = now * 0.00062;
      const pointerRadius = 92;

      context.fillStyle = 'rgb(224 250 252)';

      for (let row = -1; row < rows; row += 1) {
        for (let col = -1; col < cols; col += 1) {
          const key = row * 97 + col * 17;
          if (seeded(key, 2.3) < 0.08) continue;

          const x = col * spacing + (seeded(key, 4.7) - 0.5) * 1.2;
          const y = row * spacing + (seeded(key, 8.1) - 0.5) * 1.2;
          const edge = clamp(1 - Math.max(0, x - width * 0.42) / (width * 0.22), 0, 1);
          if (edge <= 0.015) continue;

          const wave = reducedMotion.matches ? 0 : Math.sin(time + col * 0.19 + row * 0.14);
          let alpha = (0.34 + seeded(key, 1.2) * 0.18 + wave * 0.055) * edge;
          let radius = 0.75 + seeded(key, 7.7) * 0.72;

          if (pointer.strength > 0.01) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < pointerRadius) {
              const influence = Math.pow(1 - distance / pointerRadius, 2) * pointer.strength;
              alpha += influence * 0.28;
              radius += influence * 0.58;
            }
          }

          context.globalAlpha = clamp(alpha, 0, 0.74);
          context.beginPath();
          context.arc(x, y, radius, 0, TWO_PI);
          context.fill();
        }
      }
    }

    function drawLines(now) {
      const { width, height, pointer } = state;
      const time = reducedMotion.matches ? 0 : now * 0.00009;
      const offset = Math.sin(time * 2.1) * 4;
      const spacing = 6.1;
      const diagonalSpan = width + height * 1.5;

      context.save();
      context.translate(width * 0.47, height * 0.5);
      context.rotate(-0.68);
      context.translate(-width * 0.47, -height * 0.5);
      context.lineCap = 'round';

      for (let x = -height * 1.4; x < diagonalSpan; x += spacing) {
        const pulse = reducedMotion.matches ? 0 : Math.sin(time * 5 + x * 0.025) * 0.07;
        context.globalAlpha = 0.42 + pulse;
        context.strokeStyle = 'rgb(24 104 145)';
        context.lineWidth = 1.05;
        context.beginPath();
        context.moveTo(x + offset, -height * 1.5);
        context.lineTo(x + offset, height * 2.5);
        context.stroke();
      }

      context.restore();

      if (pointer.strength > 0.01) {
        const gradient = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 105);
        gradient.addColorStop(0, `rgba(213, 249, 255, ${0.20 * pointer.strength})`);
        gradient.addColorStop(1, 'rgba(213, 249, 255, 0)');
        context.globalAlpha = 1;
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      }
    }

    function drawOrbit(now) {
      const { width, height, pointer } = state;
      const time = reducedMotion.matches ? 0 : now * 0.00012;
      const cx = width * 0.67;
      const cy = height * 0.78;
      const baseRx = Math.max(width * 0.19, 92);
      const baseRy = Math.max(height * 0.42, 62);
      const pointerRadius = 104;

      context.fillStyle = 'rgb(38 125 148)';

      for (let ring = 0; ring < 6; ring += 1) {
        const rx = baseRx + ring * 15;
        const ry = baseRy + ring * 7.2;
        const count = 82 + ring * 14;
        const phase = ring * 0.15 + time * (ring % 2 ? -1 : 1);

        for (let dot = 0; dot < count; dot += 1) {
          const t = dot / count;
          const angle = -Math.PI * 0.96 + t * Math.PI * 1.92 + phase;
          if (Math.sin(angle) > 0.92 && ring > 3) continue;

          const x = cx + Math.cos(angle) * rx;
          const y = cy + Math.sin(angle) * ry;
          if (x < -4 || x > width + 4 || y < -4 || y > height + 4) continue;

          const shimmer = reducedMotion.matches ? 0 : Math.sin(time * 7 + dot * 0.31 + ring) * 0.045;
          let alpha = 0.42 + shimmer - ring * 0.018;
          let radius = 0.78 + (ring % 3) * 0.12;

          if (pointer.strength > 0.01) {
            const distance = Math.hypot(x - pointer.x, y - pointer.y);
            if (distance < pointerRadius) {
              const influence = Math.pow(1 - distance / pointerRadius, 2) * pointer.strength;
              alpha += influence * 0.24;
              radius += influence * 0.48;
            }
          }

          context.globalAlpha = clamp(alpha, 0.12, 0.68);
          context.beginPath();
          context.arc(x, y, radius, 0, TWO_PI);
          context.fill();
        }
      }
    }

    function draw(now) {
      context.clearRect(0, 0, state.width, state.height);

      if (state.pattern === 'lines') drawLines(now);
      else if (state.pattern === 'orbit') drawOrbit(now);
      else drawDots(now);

      context.globalAlpha = 1;
      state.frame += 1;
    }

    function animate(now) {
      const delta = Math.min(64, Math.max(1, now - state.lastTime));
      state.lastTime = now;
      const follow = 1 - Math.exp(-delta / 140);
      state.pointer.strength += (state.pointer.target - state.pointer.strength) * follow;

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

    visual.addEventListener('pointermove', (event) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      const rect = visual.getBoundingClientRect();
      state.pointer.x = event.clientX - rect.left;
      state.pointer.y = event.clientY - rect.top;
      state.pointer.target = 1;
      state.pointer.active = true;
    }, { passive: true });

    visual.addEventListener('pointerleave', () => {
      state.pointer.target = 0;
      state.pointer.active = false;
    });

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(visual);

    const intersectionObserver = new IntersectionObserver((entries) => {
      state.visible = entries[0]?.isIntersecting ?? true;
      if (state.visible) start();
      else stop();
    }, { rootMargin: '180px 0px' });
    intersectionObserver.observe(visual);

    reducedMotion.addEventListener?.('change', () => {
      state.pointer.target = 0;
      state.pointer.strength = 0;
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
            pointerStrength: item.pointer.strength
          }))
        };
      }
    }
  });
})();
