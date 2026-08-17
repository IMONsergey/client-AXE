(() => {
  const grid = document.querySelector('.countries__grid');
  const stage = document.querySelector('.visual-stage');
  if (!grid) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isLight = getComputedStyle(stage || document.body).color === 'rgb(31, 50, 63)';

  /* Map variants intentionally share one palette. The dark-page alternative
     uses the same cartographic colors as the light-page alternative. */
  const countries = [
    { code: 'RUS', name: 'Россия', flag: 'flag-russia.png', color: '#3b7fc1' },
    { code: 'BLR', name: 'Беларусь', flag: 'flag-belarus.png', color: '#008998' },
    { code: 'KAZ', name: 'Казахстан', flag: 'flag-kazakhstan.png', color: '#5aa7b5' },
    { code: 'UZB', name: 'Узбекистан', flag: 'flag-uzbekistan.png', color: '#7899b4' },
    { code: 'CHN', name: 'Китай', flag: 'flag-china.png', color: '#b6435c' },
    { code: 'IRN', name: 'Иран', flag: 'flag-iran.png', color: '#6eafbb' },
    { code: 'EGY', name: 'Египет', flag: 'flag-egypt.png', color: '#91afc2' }
  ];

  /* Focus on AXE geography, but leave enough longitude on the right to keep
     Russia's dateline-crossing Far East complete. */
  const WIDTH = 1200;
  const HEIGHT = 560;
  const MIN_LON = 5;
  const MAX_LON = 195;
  const MIN_LAT = 15;
  const MAX_LAT = 82;
  const PAD_X = 48;
  const PAD_Y = 18;
  const countryByCode = new Map(countries.map((country) => [country.code, country]));

  const normalizeLon = (lon, wrapDateline = false) => {
    if (wrapDateline && lon < 0) return lon + 360;
    return lon;
  };

  const project = ([rawLon, lat], wrapDateline = false) => {
    const lon = normalizeLon(rawLon, wrapDateline);
    const x = PAD_X + ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * (WIDTH - PAD_X * 2);
    const y = PAD_Y + ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * (HEIGHT - PAD_Y * 2);
    return [x, y];
  };

  function simplifyRing(ring, limit = 520) {
    if (!Array.isArray(ring) || ring.length <= limit) return ring || [];
    const step = Math.max(1, Math.ceil(ring.length / limit));
    const result = ring.filter((_, index) => index % step === 0);
    const last = ring[ring.length - 1];
    if (result[result.length - 1] !== last) result.push(last);
    return result;
  }

  const polygonPath = (ring, limit, wrapDateline = false) => simplifyRing(ring, limit).map((point, index) => {
    const [x, y] = project(point, wrapDateline);
    return `${index ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ') + ' Z';

  const geometryPath = (geometry, limit = 520, wrapDateline = false) => {
    if (!geometry) return '';
    if (geometry.type === 'Polygon') return geometry.coordinates.map((ring) => polygonPath(ring, limit, wrapDateline)).join(' ');
    if (geometry.type === 'MultiPolygon') {
      return geometry.coordinates.flatMap((polygon) => polygon.map((ring) => polygonPath(ring, limit, wrapDateline))).join(' ');
    }
    return '';
  };

  function geometryTouchesViewport(geometry) {
    let visible = false;
    const visit = (value) => {
      if (visible || !Array.isArray(value)) return;
      if (typeof value[0] === 'number' && typeof value[1] === 'number') {
        const [lon, lat] = value;
        if (lon >= MIN_LON && lon <= MAX_LON && lat >= MIN_LAT && lat <= MAX_LAT) visible = true;
        return;
      }
      value.forEach(visit);
    };
    visit(geometry?.coordinates);
    return visible;
  }

  const inner = grid.parentElement;
  const title = inner?.querySelector('#countries-title');
  const head = document.createElement('div');
  head.className = 'countries__head';
  if (title) head.appendChild(title);

  const legend = document.createElement('div');
  legend.className = 'members-map__legend';
  legend.setAttribute('role', 'list');
  legend.setAttribute('aria-label', 'Страны—участники');
  legend.innerHTML = countries.map((country) => `
    <button class="members-map__legend-item" type="button" role="listitem" data-code="${country.code}" style="--country-color:${country.color}">
      <img class="members-map__flag" src="assets/images/${country.flag}" alt="" width="32" height="32">
      <span>${country.name}</span>
    </button>
  `).join('');
  head.appendChild(legend);
  inner?.insertBefore(head, grid);

  grid.className = `countries__grid members-map${isLight ? ' members-map--light' : ''}`;
  grid.innerHTML = `
    <div class="members-map__canvas">
      <svg class="members-map__svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Карта региона со странами-участницами. Границы Российской Федерации отображены в соответствии с официальной российской картографической трактовкой.">
        <g class="members-map__world" aria-hidden="true"></g>
        <g class="members-map__selected" aria-label="Страны—участники"></g>
      </svg>
      <div class="members-map__tooltip" role="status" aria-hidden="true"></div>
    </div>
  `;

  const worldLayer = grid.querySelector('.members-map__world');
  const selectedLayer = grid.querySelector('.members-map__selected');
  const tooltip = grid.querySelector('.members-map__tooltip');
  const canvas = grid.querySelector('.members-map__canvas');
  const legendItems = [...legend.querySelectorAll('.members-map__legend-item')];

  let activeCode = 'RUS';
  let started = false;
  let loaded = 0;
  let rfOverrideLoaded = false;

  function setActive(code, pointer = null) {
    const country = countryByCode.get(code);
    if (!country) return;
    activeCode = code;
    grid.dataset.activeCountry = code;

    grid.querySelectorAll('[data-country]').forEach((node) => {
      node.classList.toggle('is-active', node.dataset.country === code);
    });
    legendItems.forEach((item) => item.classList.toggle('is-active', item.dataset.code === code));

    if (pointer) {
      const rect = canvas.getBoundingClientRect();
      tooltip.textContent = country.name;
      tooltip.style.left = `${pointer.clientX - rect.left}px`;
      tooltip.style.top = `${pointer.clientY - rect.top}px`;
      tooltip.setAttribute('aria-hidden', 'false');
    }
  }

  const hideTooltip = () => tooltip.setAttribute('aria-hidden', 'true');

  function wireCountry(path, country) {
    path.addEventListener('pointerenter', (event) => setActive(country.code, event));
    path.addEventListener('pointermove', (event) => setActive(country.code, event));
    path.addEventListener('pointerleave', hideTooltip);
    path.addEventListener('focus', () => setActive(country.code));
  }

  function makePath(className, pathData) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill-rule', 'evenodd');
    path.classList.add(className);
    return path;
  }

  const WORLD_URL = 'https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json';
  const RF_REGION_URLS = [
    'https://raw.githubusercontent.com/EugeneBorshch/ukraine_geojson/master/UA_43_Avtonomna_Respublika_Krym.geojson',
    'https://raw.githubusercontent.com/EugeneBorshch/ukraine_geojson/master/UA_14_Donetska.geojson',
    'https://raw.githubusercontent.com/EugeneBorshch/ukraine_geojson/master/UA_09_Luhanska.geojson',
    'https://raw.githubusercontent.com/EugeneBorshch/ukraine_geojson/master/UA_23_Zaporizka.geojson',
    'https://raw.githubusercontent.com/EugeneBorshch/ukraine_geojson/master/UA_65_Khersonska.geojson'
  ];

  async function loadJson(url) {
    const response = await fetch(url, { mode: 'cors', cache: 'force-cache' });
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    return response.json();
  }

  async function buildMap() {
    const world = await loadJson(WORLD_URL);
    const features = (world.features || []).filter((feature) => feature.id !== 'ATA');
    const selectedFeatures = new Map();

    features.forEach((feature) => {
      if (countryByCode.has(feature.id)) {
        selectedFeatures.set(feature.id, feature);
        return;
      }
      if (!geometryTouchesViewport(feature.geometry)) return;

      const pathData = geometryPath(feature.geometry, 300);
      if (!pathData) return;
      const path = makePath('members-map__land', pathData);
      path.dataset.worldCountry = feature.id || '';
      worldLayer.appendChild(path);
    });

    let rfExtraPath = '';
    try {
      const regions = await Promise.all(RF_REGION_URLS.map(loadJson));
      rfExtraPath = regions.map((feature) => geometryPath(feature.geometry, 620)).join(' ');
      rfOverrideLoaded = Boolean(rfExtraPath);
    } catch (error) {
      console.warn('AXE map: RF border override unavailable, base geometry used', error);
    }

    countries.forEach((country, index) => {
      const feature = selectedFeatures.get(country.code);
      if (!feature) return;
      const wrapDateline = country.code === 'RUS';
      let pathData = geometryPath(feature.geometry, 620, wrapDateline);
      if (country.code === 'RUS' && rfExtraPath) pathData += ` ${rfExtraPath}`;

      const path = makePath('members-map__country', pathData);
      path.dataset.country = country.code;
      path.style.setProperty('--country-color', country.color);
      path.style.setProperty('--country-index', index);
      path.setAttribute('tabindex', '0');
      path.setAttribute('role', 'button');
      path.setAttribute('aria-label', country.name);
      selectedLayer.appendChild(path);
      wireCountry(path, country);
      loaded += 1;
    });

    grid.classList.add('is-map-ready');
    setActive(activeCode);
    window.dispatchEvent(new Event('axe:countries-map-ready'));
  }

  buildMap().catch((error) => {
    console.error('AXE regional map failed', error);
    grid.classList.add('is-map-error');
  });

  legendItems.forEach((item) => {
    item.addEventListener('pointerenter', () => setActive(item.dataset.code));
    item.addEventListener('focus', () => setActive(item.dataset.code));
    item.addEventListener('click', () => setActive(item.dataset.code));
  });

  canvas.addEventListener('pointerleave', hideTooltip);

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
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
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
          worldPaths: grid.querySelectorAll('.members-map__land').length,
          rfOverrideLoaded,
          light: isLight,
          viewport: { minLon: MIN_LON, maxLon: MAX_LON, minLat: MIN_LAT, maxLat: MAX_LAT }
        };
      }
    }
  });

  Object.defineProperty(window, '__AXE_COUNTRIES_GRID__', {
    configurable: true,
    value: { getState: () => ({ ready: true, started, cells: 0, traces: 0, visible: 0 }) }
  });
})();