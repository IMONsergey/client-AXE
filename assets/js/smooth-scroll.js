(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');

  let enabled = false;
  let running = false;
  let currentY = window.scrollY;
  let targetY = window.scrollY;
  let raf = 0;
  let lastTime = performance.now();

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function maxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function shouldEnable() {
    return finePointer.matches && !reducedMotion.matches;
  }

  function scrollableAncestor(start, deltaY) {
    let node = start instanceof Element ? start : null;
    while (node && node !== document.body && node !== document.documentElement) {
      const style = getComputedStyle(node);
      const overflowY = style.overflowY;
      if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight + 1) {
        const canUp = deltaY < 0 && node.scrollTop > 0;
        const canDown = deltaY > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 1;
        if (canUp || canDown) return node;
      }
      node = node.parentElement;
    }
    return null;
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    running = false;
    currentY = window.scrollY;
    targetY = window.scrollY;
  }

  function frame(now) {
    if (!running) return;

    const dt = Math.min(40, Math.max(8, now - lastTime));
    lastTime = now;
    const follow = 1 - Math.pow(1 - 0.145, dt / 16.67);
    currentY += (targetY - currentY) * follow;

    if (Math.abs(targetY - currentY) < 0.35) {
      currentY = targetY;
      window.scrollTo(0, currentY);
      running = false;
      raf = 0;
      return;
    }

    window.scrollTo(0, currentY);
    raf = requestAnimationFrame(frame);
  }

  function begin() {
    if (running) return;
    running = true;
    currentY = window.scrollY;
    lastTime = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function normalizeWheel(event) {
    let delta = event.deltaY;
    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) delta *= 16;
    if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) delta *= window.innerHeight;
    return clamp(delta, -180, 180);
  }

  function onWheel(event) {
    if (!enabled || event.defaultPrevented || event.ctrlKey || event.metaKey) return;
    if (document.documentElement.classList.contains('menu-open')) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

    const delta = normalizeWheel(event);
    if (!delta || scrollableAncestor(event.target, delta)) return;

    event.preventDefault();
    if (!running) {
      currentY = window.scrollY;
      targetY = window.scrollY;
    }
    targetY = clamp(targetY + delta, 0, maxScroll());
    begin();
  }

  function syncMode() {
    const next = shouldEnable();
    if (next === enabled) return;
    enabled = next;
    if (!enabled) stop();
  }

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('resize', () => {
    targetY = clamp(targetY, 0, maxScroll());
  }, { passive: true });
  window.addEventListener('pageshow', stop, { passive: true });

  reducedMotion.addEventListener?.('change', syncMode);
  finePointer.addEventListener?.('change', syncMode);
  syncMode();

  Object.defineProperty(window, '__AXE_SMOOTH_SCROLL__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: true,
          enabled,
          running,
          currentY,
          targetY
        };
      },
      stop
    }
  });
})();
