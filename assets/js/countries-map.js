(() => {
  const root = document.querySelector('[data-countries-map]');
  const scene = root?.querySelector('[data-map-scene]');
  const connections = root?.querySelector('[data-map-connections]');
  const cards = [...(root?.querySelectorAll('[data-map-country]') ?? [])];
  const desktop = window.matchMedia('(min-width: 901px)');
  const svgNamespace = 'http://www.w3.org/2000/svg';
  let activeCard = null;

  if (!root || !scene || !connections || !cards.length) return;

  function clearConnections() {
    connections.replaceChildren();
    cards.forEach((card) => card.classList.remove('is-active'));
    root.querySelectorAll('[data-map-logo]').forEach((logo) => logo.classList.remove('is-active'));
    activeCard = null;
  }

  function drawConnections(card) {
    if (!desktop.matches) {
      clearConnections();
      return;
    }

    const country = card.dataset.mapCountry;
    const logos = [...root.querySelectorAll(`[data-map-logo="${country}"]`)];
    const sceneRect = scene.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    connections.replaceChildren();
    connections.setAttribute('viewBox', `0 0 ${sceneRect.width} ${sceneRect.height}`);
    connections.setAttribute('preserveAspectRatio', 'none');
    cards.forEach((item) => item.classList.toggle('is-active', item === card));
    root.querySelectorAll('[data-map-logo]').forEach((logo) => {
      logo.classList.toggle('is-active', logo.dataset.mapLogo === country);
    });

    const startX = cardRect.right - sceneRect.left;
    const startY = cardRect.top + (cardRect.height / 2) - sceneRect.top;

    logos.forEach((logo) => {
      const logoRect = logo.getBoundingClientRect();
      const targetX = logoRect.left + (logoRect.width / 2) - sceneRect.left;
      const targetY = logoRect.top - sceneRect.top - 8;
      const path = document.createElementNS(svgNamespace, 'path');
      path.classList.add('countries-map__connection');
      path.setAttribute('pathLength', '1');
      path.setAttribute('d', `M ${startX.toFixed(2)} ${startY.toFixed(2)} H ${targetX.toFixed(2)} V ${targetY.toFixed(2)}`);
      connections.appendChild(path);
    });

    activeCard = card;
  }

  cards.forEach((card) => {
    card.addEventListener('pointerenter', () => drawConnections(card));
    card.addEventListener('pointerleave', () => {
      if (document.activeElement !== card) clearConnections();
    });
    card.addEventListener('focus', () => drawConnections(card));
    card.addEventListener('blur', clearConnections);
  });

  const resizeObserver = new ResizeObserver(() => {
    if (activeCard) drawConnections(activeCard);
  });
  resizeObserver.observe(scene);

  desktop.addEventListener?.('change', () => {
    if (!desktop.matches) clearConnections();
  });

  Object.defineProperty(window, '__AXE_COUNTRIES_MAP__', {
    configurable: true,
    value: {
      getState() {
        return {
          activeCountry: activeCard?.dataset.mapCountry ?? null,
          connections: connections.childElementCount,
          desktop: desktop.matches,
          logos: root.querySelectorAll('[data-map-logo]').length
        };
      }
    }
  });
})();
