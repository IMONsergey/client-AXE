(() => {
  const grid = document.querySelector('.countries__grid');
  const cells = [...document.querySelectorAll('.country')];
  if (!grid || !cells.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let started = false;

  cells.forEach((cell, index) => {
    cell.style.setProperty('--country-trace-delay', `${index * 90}ms`);

    if (cell.querySelector('.country__trace')) return;

    const trace = document.createElement('span');
    trace.className = 'country__trace';
    trace.setAttribute('aria-hidden', 'true');

    ['top', 'right', 'bottom', 'left'].forEach((side) => {
      const line = document.createElement('i');
      line.className = `country__trace-line country__trace-line--${side}`;
      trace.appendChild(line);
    });

    cell.appendChild(trace);
  });

  function startTracing() {
    if (started) return;
    started = true;
    grid.classList.add('is-tracing');
  }

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    startTracing();
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      startTracing();
      observer.disconnect();
    }, {
      threshold: 0.22,
      rootMargin: '0px 0px -8% 0px'
    });

    observer.observe(grid);
  }

  reducedMotion.addEventListener?.('change', () => {
    if (reducedMotion.matches) startTracing();
  });

  Object.defineProperty(window, '__AXE_COUNTRIES_GRID__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: true,
          started,
          cells: cells.length,
          traces: document.querySelectorAll('.country__trace').length,
          visible: document.querySelectorAll('.country.is-visible').length
        };
      }
    }
  });
})();