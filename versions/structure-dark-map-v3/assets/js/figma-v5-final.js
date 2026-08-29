(() => {
  'use strict';

  const doc = document;
  const root = doc.documentElement;
  const NS = 'http://www.w3.org/2000/svg';
  const WIDTH = 1880;
  const HEIGHT = 972;

  const layers = [
    { href: 'assets/images/figma-v4/map/neutral-land-silhouette.svg', x: 32.9, y: 92.48110961914062, width: 1814.199951171875, height: 787.037841796875 },
    { href: 'assets/images/figma-v4/map/digital-dot-field.svg', x: 275.08316802978516, y: 97.65464639663696, width: 1439.9310302734375, height: 742.90576171875 },
    { href: 'assets/images/figma-v4/map/digital-network-lines.svg', x: 289.7001419067383, y: 102.06784343719482, width: 1386.3824462890625, height: 734.7930297851562 },
    { href: 'assets/images/figma-v4/map/digital-network-nodes.svg', x: 288.4076614379883, y: 99.98274421691895, width: 1485.309814453125, height: 738.1712646484375 }
  ];

  const markers = [
    { code: 'RUS', name: 'Россия', cx: 1296.746, cy: 192.487, flag: 'assets/images/flag-russia.png' },
    { code: 'BLR', name: 'Беларусь', cx: 1056.435, cy: 234.229, flag: 'assets/images/flag-belarus.png' },
    { code: 'KAZ', name: 'Казахстан', cx: 1256.482, cy: 260.237, flag: 'assets/images/flag-kazakhstan.png' },
    { code: 'UZB', name: 'Узбекистан', cx: 1222.431, cy: 311.197, flag: 'assets/images/flag-uzbekistan.png' },
    { code: 'CHN', name: 'Китай', cx: 1434.033, cy: 334.705, flag: 'assets/images/flag-china.png' },
    { code: 'IRN', name: 'Иран', cx: 1196.589, cy: 354.843, flag: 'assets/images/flag-iran.png' },
    { code: 'EGY', name: 'Египет', cx: 1088.410, cy: 387.076, flag: 'assets/images/flag-egypt.png' }
  ];

  const state = {
    ready: false,
    mapReady: false,
    vectorLayers: 0,
    countries: 0,
    activeCountry: null
  };

  const svgNode = (name, attrs = {}) => {
    const node = doc.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    return node;
  };

  const keepContentVisible = () => {
    root.classList.remove('js-axe-reveal');
    doc.querySelectorAll('.axe-reveal').forEach((node) => {
      node.classList.add('is-visible');
      node.style.removeProperty('opacity');
      node.style.removeProperty('transform');
    });
  };

  function renderMap() {
    const wrap = doc.querySelector('.countries__map-wrap');
    if (!wrap) return false;

    const oldSvg = wrap.querySelector('svg.countries__map--interactive');
    const oldRaster = wrap.querySelector('img.countries__map');
    if (!oldSvg && !oldRaster) return false;

    wrap.querySelectorAll('.countries__map-tooltip').forEach((node) => node.remove());

    const svg = svgNode('svg', {
      viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
      preserveAspectRatio: 'xMidYMid meet',
      role: 'group',
      'aria-label': 'Интерактивная карта стран-участниц Ассоциации'
    });
    svg.classList.add('countries__map', 'countries__map--interactive', 'countries__map--final');

    layers.forEach((layerData) => {
      const image = svgNode('image', {
        href: layerData.href,
        x: layerData.x,
        y: layerData.y,
        width: layerData.width,
        height: layerData.height,
        preserveAspectRatio: 'none',
        'aria-hidden': 'true',
        'pointer-events': 'none'
      });
      image.classList.add('countries__map-layer');
      svg.appendChild(image);
    });

    const defs = svgNode('defs');
    svg.appendChild(defs);
    const markerLayer = svgNode('g', { 'aria-label': 'Страны-участницы' });
    markerLayer.classList.add('countries__marker-layer');
    svg.appendChild(markerLayer);

    const tooltip = doc.createElement('div');
    tooltip.className = 'countries__map-tooltip countries__map-tooltip--final';
    tooltip.setAttribute('role', 'status');
    tooltip.setAttribute('aria-live', 'polite');

    const hotspotNodes = [];

    const placeTooltip = (marker) => {
      const svgRect = svg.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      tooltip.style.left = `${svgRect.left - wrapRect.left + (marker.cx / WIDTH) * svgRect.width}px`;
      tooltip.style.top = `${svgRect.top - wrapRect.top + (marker.cy / HEIGHT) * svgRect.height}px`;
    };

    const setActive = (marker) => {
      state.activeCountry = marker.code;
      hotspotNodes.forEach((node) => node.classList.toggle('is-active', node.dataset.country === marker.code));
      tooltip.textContent = marker.name;
      placeTooltip(marker);
      tooltip.classList.add('is-visible');
    };

    const hideTooltip = () => tooltip.classList.remove('is-visible');

    markers.forEach((marker, index) => {
      const clip = svgNode('clipPath', { id: `country-clip-${marker.code}`, clipPathUnits: 'userSpaceOnUse' });
      clip.appendChild(svgNode('circle', { cx: 0, cy: 0, r: 28 }));
      defs.appendChild(clip);

      const group = svgNode('g', {
        transform: `translate(${marker.cx} ${marker.cy})`,
        tabindex: 0,
        role: 'button',
        'aria-label': marker.name
      });
      group.classList.add('country-hotspot', 'country-hotspot--final');
      group.dataset.country = marker.code;

      const shell = svgNode('circle', { cx: 0, cy: 0, r: 32.9 });
      shell.classList.add('country-hotspot__shell');
      group.appendChild(shell);

      const flag = svgNode('image', {
        href: marker.flag,
        x: -28,
        y: -28,
        width: 56,
        height: 56,
        preserveAspectRatio: 'xMidYMid slice',
        'clip-path': `url(#country-clip-${marker.code})`,
        'pointer-events': 'none',
        'aria-hidden': 'true'
      });
      flag.classList.add('country-hotspot__flag');
      group.appendChild(flag);

      const ring = svgNode('circle', { cx: 0, cy: 0, r: 37 });
      ring.classList.add('country-hotspot__ring');
      group.appendChild(ring);

      group.addEventListener('pointerenter', () => setActive(marker));
      group.addEventListener('pointerleave', hideTooltip);
      group.addEventListener('focus', () => setActive(marker));
      group.addEventListener('blur', hideTooltip);
      group.addEventListener('click', () => setActive(marker));
      group.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          event.preventDefault();
          hotspotNodes[(index + 1) % markers.length]?.focus();
          return;
        }
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          event.preventDefault();
          hotspotNodes[(index - 1 + markers.length) % markers.length]?.focus();
          return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setActive(marker);
        }
      });

      markerLayer.appendChild(group);
      hotspotNodes.push(group);
    });

    if (oldSvg) oldSvg.replaceWith(svg);
    else oldRaster.replaceWith(svg);
    wrap.appendChild(tooltip);

    window.addEventListener('resize', () => {
      const marker = markers.find((item) => item.code === state.activeCountry);
      if (marker && tooltip.classList.contains('is-visible')) placeTooltip(marker);
    }, { passive: true });

    state.mapReady = true;
    state.vectorLayers = layers.length;
    state.countries = markers.length;
    return true;
  }

  keepContentVisible();
  const mapReady = renderMap();

  if (!mapReady) {
    requestAnimationFrame(() => {
      renderMap();
      keepContentVisible();
      state.ready = state.mapReady;
    });
  } else {
    state.ready = true;
  }

  window.addEventListener('load', keepContentVisible, { once: true });

  Object.defineProperty(window, '__AXE_FINAL__', {
    configurable: true,
    value: {
      getState() {
        return { ...state };
      }
    }
  });
})();
