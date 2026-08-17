(() => {
  const grid = document.querySelector('.countries__grid');
  const stage = document.querySelector('.visual-stage');
  if (!grid) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isLight = getComputedStyle(stage || document.body).color === 'rgb(31, 50, 63)';

  const countries = [
    { code: 'RUS', name: 'Россия', color: isLight ? '#3b7fc1' : '#2fe0fd', lon: 96, lat: 61 },
    { code: 'BLR', name: 'Беларусь', color: isLight ? '#008998' : '#18c6de', lon: 28, lat: 53.7 },
    { code: 'KAZ', name: 'Казахстан', color: isLight ? '#5aa7b5' : '#0fa9bd', lon: 68, lat: 48 },
    { code: 'UZB', name: 'Узбекистан', color: isLight ? '#779bb5' : '#548bad', lon: 64.5, lat: 41 },
    { code: 'CHN', name: 'Китай', color: isLight ? '#b6435c' : '#00b7c8', lon: 104, lat: 35 },
    { code: 'IRN', name: 'Иран', color: isLight ? '#6eafbb' : '#79c4d3', lon: 53, lat: 32 },
    { code: 'EGY', name: 'Египет', color: isLight ? '#8eafc5' : '#bdf8ff', lon: 30, lat: 27 }
  ];

  const WIDTH = 1000;
  const HEIGHT = 520;
  const MIN_LON = 15;
  const MAX_LON = 180;
  const MIN_LAT = 15;
  const MAX_LAT = 82;
  const PAD_X = 28;
  const PAD_Y = 24;

  const project = ([rawLon, lat]) => {
    let lon = rawLon;
    if (lon < MIN_LON - 20) lon += 360;
    const x = PAD_X + ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * (WIDTH - PAD_X * 2);
    const y = PAD_Y + ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * (HEIGHT - PAD_Y * 2);
    return [x, y];
  };

  const polygonPath = (ring) => ring.map((point, index) => {
    const [x, y] = project(point);
    return `${index ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ') + ' Z';

  const geometryPath = (geometry) => {
    if (!geometry) return '';
    if (geometry.type === 'Polygon') return geometry.coordinates.map(polygonPath).join(' ');
    if (geometry.type === 'MultiPolygon') {
      return geometry.coordinates.flatMap((polygon) => polygon.map(polygonPath)).join(' ');
    }
    return '';
  };

  const graticule = [];
  for (let lon = 20; lon <= 180; lon += 20) {
    const [x] = project([lon, MIN_LAT]);
    graticule.push(`<line x1="${x.toFixed(2)}" y1="${PAD_Y}" x2="${x.toFixed(2)}" y2="${HEIGHT - PAD_Y}" />`);
  }
  for (let lat = 20; lat <= 80; lat += 10) {
    const [, y] = project([MIN_LON, lat]);
    graticule.push(`<line x1="${PAD_X}" y1="${y.toFixed(2)}" x2="${WIDTH - PAD_X}" y2="${y.toFixed(2)}" />`);
  }

  const routePoints = ['EGY', 'IRN', 'UZB', 'KAZ', 'CHN', 'RUS', 'BLR']
    .map((code) => countries.find((country) => country.code === code))
    .map((country) => project([country.lon, country.lat]))
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');

  grid.className = `countries__grid members-map${isLight ? ' members-map--light' : ''}`;
  grid.innerHTML = `
    <div class="members-map__topline">
      <span class="members-map__count">7 стран-участниц</span>
      <span class="members-map__active" aria-live="polite">Россия</span>
    </div>
    <div class="members-map__canvas">
      <svg class="members-map__svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Карта стран-участниц">
        <g class="members-map__graticule" aria-hidden="true">${graticule.join('')}</g>
        <polyline class="members-map__route" points="${routePoints}" aria-hidden="true" />
        <g class="members-map__shapes" aria-label="Страны"></g>
        <g class="members-map__nodes" aria-hidden="true"></g>
      </svg>
      <div class="members-map__tooltip" role="status" aria-hidden="true"></div>
    </div>
    <div class="members-map__legend" role="list" aria-label="Страны—участники">
      ${countries.map((country, index) => `
        <button class="members-map__legend-item" type="button" role="listitem" data-code="${country.code}" style="--country-color:${country.color}">
          <span class="members-map__legend-dot" aria-hidden="true"></span>
          <span>${country.name}</span>
          <small>${String(index + 1).padStart(2, '0')}</small>
        </button>
      `).join('')}
    </div>
  `;

  const shapes = grid.querySelector('.members-map__shapes');
  const nodes = grid.querySelector('.members-map__nodes');
  const activeLabel = grid.querySelector('.members-map__active');
  const tooltip = grid.querySelector('.members-map__tooltip');
  const svg = grid.querySelector('.members-map__svg');
  const legendItems = [...grid.querySelectorAll('.members-map__legend-item')];

  let activeCode = 'RUS';
  let loaded = 0;
  let started = false;

  function setActive(code, pointer = null) {
    const country = countries.find((item) => item.code === code);
    if (!country) return;
    activeCode = code;
    grid.dataset.activeCountry = code;
    activeLabel.textContent = country.name;

    grid.querySelectorAll('[data-country]').forEach((node) => {
      node.classList.toggle('is-active', node.dataset.country === code);
    });
    legendItems.forEach((item) => item.classList.toggle('is-active', item.dataset.code === code));

    if (pointer) {
      const rect = grid.querySelector('.members-map__canvas').getBoundingClientRect();
      tooltip.textContent = country.name;
      tooltip.style.left = `${pointer.clientX - rect.left}px`;
      tooltip.style.top = `${pointer.clientY - rect.top}px`;
      tooltip.setAttribute('aria-hidden', 'false');
    }
  }

  function hideTooltip() {
    tooltip.setAttribute('aria-hidden', 'true');
  }

  function wireCountry(element, country) {
    element.addEventListener('pointerenter', (event) => setActive(country.code, event));
    element.addEventListener('pointermove', (event) => setActive(country.code, event));
    element.addEventListener('pointerleave', hideTooltip);
    element.addEventListener('focus', () => setActive(country.code));
  }

  function addShape(country, pathData) {
    const ns = 'http://www.w3.org/2000/svg';
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('tabindex', '0');
    path.setAttribute('role', 'button');
    path.setAttribute('aria-label', country.name);
    path.setAttribute('data-country', country.code);
    path.style.setProperty('--country-color', country.color);
    path.classList.add('members-map__country');
    shapes.appendChild(path);
    wireCountry(path, country);

    const [cx, cy] = project([country.lon, country.lat]);
    const group = document.createElementNS(ns, 'g');
    group.setAttribute('data-country', country.code);
    group.classList.add('members-map__node');
    group.innerHTML = `<circle class="members-map__node-ring" cx="${cx}" cy="${cy}" r="10"/><circle class="members-map__node-core" cx="${cx}" cy="${cy}" r="3.2" style="--country-color:${country.color}"/>`;
    nodes.appendChild(group);
  }

  function addFallback(country) {
    const [cx, cy] = project([country.lon, country.lat]);
    const size = country.code === 'RUS' ? 46 : country.code === 'CHN' ? 28 : 18;
    addShape(country, `M${cx - size} ${cy} C${cx - size * .55} ${cy - size * .7}, ${cx + size * .5} ${cy - size * .62}, ${cx + size} ${cy} C${cx + size * .5} ${cy + size * .6}, ${cx - size * .5} ${cy + size * .68}, ${cx - size} ${cy} Z`);
  }

  const sourceFor = (code) => `https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries/${code}.geo.json`;

  Promise.all(countries.map(async (country) => {
    try {
      const response = await fetch(sourceFor(country.code), { mode: 'cors', cache: 'force-cache' });
      if (!response.ok) throw new Error(`${country.code}: ${response.status}`);
      const geojson = await response.json();
      const feature = geojson.type === 'FeatureCollection' ? geojson.features?.[0] : geojson;
      const pathData = geometryPath(feature?.geometry);
      if (!pathData) throw new Error(`${country.code}: empty geometry`);
      addShape(country, pathData);
      loaded += 1;
    } catch (error) {
      console.warn('AXE map fallback', country.code, error);
      addFallback(country);
    }
  })).then(() => {
    grid.classList.add('is-map-ready');
    setActive(activeCode);
    window.dispatchEvent(new Event('axe:countries-map-ready'));
  });

  legendItems.forEach((item) => {
    item.addEventListener('pointerenter', () => setActive(item.dataset.code));
    item.addEventListener('focus', () => setActive(item.dataset.code));
    item.addEventListener('click', () => setActive(item.dataset.code));
  });

  svg.addEventListener('pointerleave', hideTooltip);

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
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    observer.observe(grid);
  }

  reducedMotion.addEventListener?.('change', () => {
    if (reducedMotion.matches) start();
  });

  Object.defineProperty(window, '__AXE_COUNTRIES_MAP__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: grid.classList.contains('is-map-ready'),
          started,
          activeCode,
          countries: countries.length,
          loaded,
          paths: grid.querySelectorAll('.members-map__country').length,
          light: isLight
        };
      }
    }
  });

  Object.defineProperty(window, '__AXE_COUNTRIES_GRID__', {
    configurable: true,
    value: {
      getState() {
        return { ready: true, started, cells: 0, traces: 0, visible: 0 };
      }
    }
  });
})();
