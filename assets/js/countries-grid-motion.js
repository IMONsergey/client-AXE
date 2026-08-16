(() => {
  const cells = [...document.querySelectorAll('.country')];
  if (!cells.length) return;

  cells.forEach((cell, index) => {
    cell.style.setProperty('--country-trace-delay', `${index * 85}ms`);

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

  Object.defineProperty(window, '__AXE_COUNTRIES_GRID__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: true,
          cells: cells.length,
          traces: document.querySelectorAll('.country__trace').length,
          visible: document.querySelectorAll('.country.is-visible').length
        };
      }
    }
  });
})();