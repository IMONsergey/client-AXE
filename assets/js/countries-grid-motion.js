(() => {
  const grid = document.querySelector('.countries__grid');
  const cells = [...document.querySelectorAll('.country')];
  if (!grid || !cells.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let started = false;

  function start() {
    if (started) return;
    started = true;
    grid.classList.add('is-country-intro');
  }

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    start();
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      start();
      observer.disconnect();
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px'
    });
    observer.observe(grid);
  }

  reducedMotion.addEventListener?.('change', () => {
    if (reducedMotion.matches) start();
  });

  Object.defineProperty(window, '__AXE_COUNTRIES_GRID__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: true,
          started,
          cells: cells.length,
          traces: 0,
          visible: document.querySelectorAll('.country.is-visible').length
        };
      }
    }
  });
})();
