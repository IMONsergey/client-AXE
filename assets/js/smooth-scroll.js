(() => {
  /* Custom wheel smoothing was intentionally removed. Scrolling is fully native. */
  document.documentElement.style.scrollBehavior = 'auto';

  Object.defineProperty(window, '__AXE_SMOOTH_SCROLL__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: true,
          enabled: false,
          running: false,
          native: true,
          currentY: window.scrollY,
          targetY: window.scrollY
        };
      },
      stop() {}
    }
  });
})();
