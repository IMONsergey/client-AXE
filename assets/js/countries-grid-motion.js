(() => {
  const grid = document.querySelector('.countries__grid');
  const stage = document.querySelector('.visual-stage');
  if (!grid) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isLight = getComputedStyle(stage || document.body).color === 'rgb(31, 50, 63)';

  const countries = [
    { code: 'RUS', name: 'Россия', flag: 'flag-russia.png', color: isLight ? '#3b7fc1' : '#2fcfe2' },
    { code: 'BLR', name: 'Беларусь', flag: 'flag-belarus.png', color: isLight ? '#008998' : '#149cb0' },
    { code: 'KAZ', name: 'Казахстан', flag: 'flag-kazakhstan.png', color: isLight ? '#5aa7b5' : '#55b6c5' },
    { code: 'UZB', name: 'Узбекистан', flag: 'flag-uzbekistan.png', color: isLight ? '#7899b4' : '#6d9fbd' },
    { code: 'CHN', name: 'Китай', flag: 'flag-china.png', color: isLight ? '#b6435c' : '#168ea8' },
    { code: 'IRN', name: 'Иран', flag: 'flag-iran.png', color: isLight ? '#6eafbb' : '#7bc3cf' },
    { code: 'EGY', name: 'Египет', flag: 'flag-egypt.png', color: isLight ? '#91afc2' : '#a8d9df' }
  ];

  const WIDTH = 1200;
  const HEIGHT = 560;
  const MIN_LAT = -60;
  const MAX_LAT = 85;
  const countryByCode = new Map(countries.map((country) => [country.code, country]));

  const project = ([lon, lat]) => [
    ((lon + 180) / 360) * WIDTH,
    ((MAX_LAT - Math.max(MIN_LAT, Math.min(MAX_LAT, lat))) / (MAX_LAT - MIN_LAT)) * HEIGHT
  ];

  function simplifyRing(ring, limit = 180) {
    if (!Array.isArray(ring) || ring.length <= limit) return ring || [];
    const step = Math.max(1, Math.ceil(ring.length / limit));
    const result = ring.filter((_, index) => index % step === 0);
    const last = ring[ring.length - 1];
    if (result[result.length - 1] !== last) result.push(last);
    return result;
  }

  const polygonPath = (ring) => simplifyRing(ring).map((point, index) => {
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

  grid.className = `countries__grid members-map${isLight ? ' members-map--light' : ''}`;
  grid.innerHTML = `
    <div class="members-map__meta" aria-hidden="true">
      <span class="members-map__count">7 стран-участниц</span>
      <span class="members-map__active">Россия</span>
    </div>
    <div class="members-map__canvas">
      <svg class="members-map__svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Карта мира со странами-участницами. Границы Российской Федерации отображены в соответствии с официальной российской картографической трактовкой.">
        <g class="members-map__world" aria-hidden="true"></g>
        <g class="members-map__selected" aria-label="Страны—участники"></g>
      </svg>
      <div class="members-map__tooltip" role="status" aria-hidden="true"></div>
    </div>
    <div class="members-map__legend" role="list" aria-label="Страны—участники">
      ${countries.map((country) => `
        <button class="members-map__legend-item" type="button" role="listitem" data-code="${country.code}" style="--country-color:${country.color}">
          <img class="members-map__flag" src="assets/images/${country.flag}" alt="" width="34" height="34">
          <span>${country.name}</span>
        </button>
      `).join('')}
    </div>
  `;

  const worldLayer = grid.querySelector('.members-map__world');
  const selectedLayer = grid.querySelector('.members-map__selected');
  const activeLabel = grid.querySelector('.members-map__active');
  const tooltip = grid.querySelector('.members-map__tooltip');
  const canvas = grid.querySelector('.members-map__canvas');
  const legendItems = [...grid.querySelectorAll('.members-map__legend-item')];

  let activeCode = 'RUS';
  let started = false;
  let loaded = 0;
  let rfOverrideLoaded = false;

  function setActive(code, pointer = null) {
    const country = countryByCode.get(code);
    if (!country) return;
    activeCode = code;
    grid.dataset.activeCountry = code;
    activeLabel.textContent = country.name;

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
      const pathData = geometryPath(feature.geometry);
      if (!pathData) return;

      if (countryByCode.has(feature.id)) {
        selectedFeatures.set(feature.id, feature);
        return;
      }

      const path = makePath('members-map__land', pathData);
      worldLayer.appendChild(path);
    });

    let rfExtraPath = '';
    try {
      const regions = await Promise.all(RF_REGION_URLS.map(loadJson));
      rfExtraPath = regions.map((feature) => geometryPath(feature.geometry)).join(' ');
      rfOverrideLoaded = Boolean(rfExtraPath);
    } catch (error) {
      console.warn('AXE map: RF border override unavailable, base geometry used', error);
    }

    countries.forEach((country, index) => {
      const feature = selectedFeatures.get(country.code);
      if (!feature) return;
      let pathData = geometryPath(feature.geometry);
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
    console.error('AXE world map failed', error);
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
          light: isLight
        };
      }
    }
  });

  Object.defineProperty(window, '__AXE_COUNTRIES_GRID__', {
    configurable: true,
    value: { getState: () => ({ ready: true, started, cells: 0, traces: 0, visible: 0 }) }
  });
})();
