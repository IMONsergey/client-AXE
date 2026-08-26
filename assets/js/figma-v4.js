(() => {
  'use strict';

  const doc = document;
  const body = doc.body;
  const root = doc.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Load the recovery layer without changing the established HTML entry point. */
  if (!doc.querySelector('link[data-axe-recovery]')) {
    const link = doc.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/css/figma-v5-overrides.css?v=2026-08-26';
    link.dataset.axeRecovery = 'true';
    doc.head.appendChild(link);
  }

  /* Header and mobile navigation. */
  const header = doc.querySelector('[data-header]');
  const menu = doc.querySelector('[data-menu]');
  const nav = doc.querySelector('[data-nav]');
  const mobileNav = window.matchMedia('(max-width: 900px)');
  let navOpen = false;
  let scrollFrame = 0;

  function syncHeader() {
    scrollFrame = 0;
    header?.classList.toggle('is-scrolled', window.scrollY > 18);
  }

  function setNav(open, { restoreFocus = false } = {}) {
    navOpen = Boolean(open && mobileNav.matches);
    body.classList.toggle('nav-open', navOpen);
    menu?.setAttribute('aria-expanded', String(navOpen));
    menu?.setAttribute('aria-label', navOpen ? 'Закрыть меню' : 'Открыть меню');
    nav?.setAttribute('aria-hidden', mobileNav.matches ? String(!navOpen) : 'false');
    if (navOpen) {
      requestAnimationFrame(() => nav?.querySelector('a')?.focus({ preventScroll: true }));
    } else if (restoreFocus) {
      menu?.focus({ preventScroll: true });
    }
  }

  menu?.addEventListener('click', () => setNav(!navOpen, { restoreFocus: navOpen }));
  nav?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) setNav(false);
  });
  doc.addEventListener('keydown', (event) => {
    if (!navOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setNav(false, { restoreFocus: true });
      return;
    }
    if (event.key !== 'Tab' || !nav || !menu) return;
    const focusables = [menu, ...nav.querySelectorAll('a')].filter((item) => !item.hasAttribute('disabled'));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && doc.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && doc.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  mobileNav.addEventListener?.('change', () => setNav(false));
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(syncHeader);
  }, { passive: true });
  syncHeader();
  setNav(false);

  /* Generic keyboard-friendly slider. */
  function setupSlider({ viewport, track, cards, prev, next, current, total }) {
    if (!viewport || !track || !cards.length) return null;
    let index = 0;

    const geometry = () => {
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      const width = cards[0].getBoundingClientRect().width;
      const viewportWidth = viewport.getBoundingClientRect().width;
      const visible = Math.max(1, Math.floor((viewportWidth + gap + 1) / Math.max(1, width + gap)));
      return { gap, width, visible, max: Math.max(0, cards.length - visible) };
    };

    const render = (nextIndex) => {
      const { gap, width, max } = geometry();
      index = Math.max(0, Math.min(nextIndex, max));
      track.style.transform = `translate3d(${-index * (width + gap)}px,0,0)`;
      prev?.toggleAttribute('disabled', index === 0);
      next?.toggleAttribute('disabled', index === max);
      if (current) current.textContent = String(index + 1);
      if (total) total.textContent = String(cards.length);
      cards.forEach((card, cardIndex) => card.setAttribute('aria-hidden', String(cardIndex < index || cardIndex >= index + geometry().visible)));
    };

    prev?.addEventListener('click', () => render(index - 1));
    next?.addEventListener('click', () => render(index + 1));
    viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        render(index - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        render(index + 1);
      }
    });
    if (!viewport.hasAttribute('tabindex')) viewport.tabIndex = 0;
    window.addEventListener('resize', () => render(index), { passive: true });
    render(0);
    return { render, getIndex: () => index };
  }

  const timelineViewport = doc.querySelector('[data-timeline-slider]');
  const timeline = setupSlider({
    viewport: timelineViewport,
    track: timelineViewport?.querySelector('.timeline__track'),
    cards: [...(timelineViewport?.querySelectorAll('.timeline-card') || [])],
    prev: doc.querySelector('[data-timeline-prev]'),
    next: doc.querySelector('[data-timeline-next]'),
    current: doc.querySelector('[data-timeline-current]')
  });

  const quoteViewport = doc.querySelector('[data-quote-slider]');
  const quotes = setupSlider({
    viewport: quoteViewport,
    track: quoteViewport?.querySelector('.quotes__track'),
    cards: [...(quoteViewport?.querySelectorAll('.quote-card') || [])],
    prev: doc.querySelector('[data-quote-prev]'),
    next: doc.querySelector('[data-quote-next]'),
    current: doc.querySelector('[data-quote-current]')
  });

  /* Restore the correct dedicated goals icon. */
  const goalsIcon = doc.querySelector('.metric--link > img');
  if (goalsIcon) goalsIcon.src = 'assets/images/figma/metric-icon-goals.png';

  /* Current Figma has one populated key-event item. Keep that content only,
     but restore the slider shell so future cards work without a redesign. */
  function enhanceEvents() {
    const section = doc.querySelector('.events');
    const container = section?.querySelector(':scope > .container');
    const title = container?.querySelector(':scope > .section-title');
    const cards = container ? [...container.querySelectorAll(':scope > .event-card')] : [];
    if (!section || !container || !title || !cards.length || container.querySelector('.events__head')) return null;

    const head = doc.createElement('div');
    head.className = 'events__head';
    title.before(head);
    head.appendChild(title);

    const controls = doc.createElement('div');
    controls.className = 'events__controls';
    controls.setAttribute('aria-label', 'Переключение ключевых событий');
    controls.innerHTML = `
      <span><b data-event-current>1</b> / <i data-event-total>${cards.length}</i></span>
      <button type="button" data-event-prev aria-label="Предыдущее событие"><img src="assets/images/document-arrow.svg" alt=""></button>
      <button type="button" data-event-next aria-label="Следующее событие"><img src="assets/images/document-arrow.svg" alt=""></button>`;
    head.appendChild(controls);

    const viewport = doc.createElement('div');
    viewport.className = 'events__viewport';
    viewport.dataset.eventSlider = 'true';
    const track = doc.createElement('div');
    track.className = 'events__track';
    cards[0].before(viewport);
    viewport.appendChild(track);
    cards.forEach((card) => track.appendChild(card));

    return setupSlider({
      viewport,
      track,
      cards,
      prev: controls.querySelector('[data-event-prev]'),
      next: controls.querySelector('[data-event-next]'),
      current: controls.querySelector('[data-event-current]'),
      total: controls.querySelector('[data-event-total]')
    });
  }
  const events = enhanceEvents();

  /* Keep the exact Figma map render, but move it into an SVG interaction surface.
     Hit areas are the flag markers only: no disputed country-border geometry is introduced. */
  const mapState = { ready: false, activeCountry: null, countries: 0 };
  function enhanceCountriesMap() {
    const wrap = doc.querySelector('.countries__map-wrap');
    const raster = wrap?.querySelector('img.countries__map');
    if (!wrap || !raster || wrap.querySelector('svg.countries__map--interactive')) return;

    const NS = 'http://www.w3.org/2000/svg';
    const WIDTH = 1880;
    const HEIGHT = 972;
    const markers = [
      { code: 'RUS', name: 'Россия', cx: 1296.746, cy: 192.487 },
      { code: 'BLR', name: 'Беларусь', cx: 1056.435, cy: 234.229 },
      { code: 'KAZ', name: 'Казахстан', cx: 1256.482, cy: 260.237 },
      { code: 'UZB', name: 'Узбекистан', cx: 1222.431, cy: 311.197 },
      { code: 'CHN', name: 'Китай', cx: 1434.033, cy: 334.705 },
      { code: 'IRN', name: 'Иран', cx: 1196.589, cy: 354.843 },
      { code: 'EGY', name: 'Египет', cx: 1088.410, cy: 387.076 }
    ];

    const svg = doc.createElementNS(NS, 'svg');
    svg.classList.add('countries__map', 'countries__map--interactive');
    svg.setAttribute('viewBox', `0 0 ${WIDTH} ${HEIGHT}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('role', 'group');
    svg.setAttribute('aria-label', 'Интерактивная карта стран-участниц Ассоциации');

    const image = doc.createElementNS(NS, 'image');
    image.setAttribute('href', raster.getAttribute('src') || 'assets/images/figma-v4/countries-map.png');
    image.setAttribute('x', '0');
    image.setAttribute('y', '0');
    image.setAttribute('width', String(WIDTH));
    image.setAttribute('height', String(HEIGHT));
    image.setAttribute('preserveAspectRatio', 'none');
    image.setAttribute('aria-hidden', 'true');
    svg.appendChild(image);

    const layer = doc.createElementNS(NS, 'g');
    layer.setAttribute('aria-label', 'Маркеры стран');
    svg.appendChild(layer);

    const tooltip = doc.createElement('div');
    tooltip.className = 'countries__map-tooltip';
    tooltip.setAttribute('role', 'status');
    tooltip.setAttribute('aria-live', 'polite');
    wrap.appendChild(tooltip);

    const hotspots = [];
    const placeTooltip = (marker) => {
      const svgRect = svg.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      tooltip.style.left = `${svgRect.left - wrapRect.left + (marker.cx / WIDTH) * svgRect.width}px`;
      tooltip.style.top = `${svgRect.top - wrapRect.top + (marker.cy / HEIGHT) * svgRect.height}px`;
    };
    const setActive = (marker, visible = true) => {
      mapState.activeCountry = marker.code;
      hotspots.forEach((node) => node.classList.toggle('is-active', node.dataset.country === marker.code));
      tooltip.textContent = marker.name;
      placeTooltip(marker);
      tooltip.classList.toggle('is-visible', visible);
    };
    const hideTooltip = () => tooltip.classList.remove('is-visible');

    markers.forEach((marker) => {
      const group = doc.createElementNS(NS, 'g');
      group.classList.add('country-hotspot');
      group.dataset.country = marker.code;
      group.setAttribute('transform', `translate(${marker.cx} ${marker.cy})`);
      group.setAttribute('tabindex', '0');
      group.setAttribute('role', 'button');
      group.setAttribute('aria-label', marker.name);

      const title = doc.createElementNS(NS, 'title');
      title.textContent = marker.name;
      group.appendChild(title);
      const circle = doc.createElementNS(NS, 'circle');
      circle.classList.add('country-hotspot__ring');
      circle.setAttribute('r', '37');
      group.appendChild(circle);

      group.addEventListener('pointerenter', () => setActive(marker));
      group.addEventListener('pointerleave', hideTooltip);
      group.addEventListener('focus', () => setActive(marker));
      group.addEventListener('blur', hideTooltip);
      group.addEventListener('click', () => setActive(marker));
      group.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        setActive(marker);
      });
      layer.appendChild(group);
      hotspots.push(group);
    });

    window.addEventListener('resize', () => {
      const marker = markers.find((item) => item.code === mapState.activeCountry);
      if (marker && tooltip.classList.contains('is-visible')) placeTooltip(marker);
    }, { passive: true });

    raster.replaceWith(svg);
    mapState.ready = true;
    mapState.countries = markers.length;
    window.dispatchEvent(new Event('axe:countries-map-ready'));
  }
  enhanceCountriesMap();

  /* Correct the third quote attribution from the previously approved content. */
  const quoteCards = [...doc.querySelectorAll('.quote-card')];
  if (quoteCards[2]) {
    const name = quoteCards[2].querySelector('footer b');
    const role = quoteCards[2].querySelector('footer span');
    if (name && name.textContent.trim() === 'Игорь Артемьев') name.textContent = 'Курмет Оразаев';
    if (role && role.textContent.trim() === 'Президент Петербургской Биржи') role.textContent = 'Председатель правления АО «Товарная биржа «Евразийская Торговая Система»';
  }

  /* Restore the footer logo without changing the source HTML structure. */
  const footerContainer = doc.querySelector('.footer .container');
  if (footerContainer && !footerContainer.querySelector('.footer__brand')) {
    const brand = doc.createElement('a');
    brand.className = 'footer__brand';
    brand.href = '#top';
    brand.setAttribute('aria-label', 'Наверх');
    brand.innerHTML = '<img src="assets/images/logo-ace.svg" alt=""><img src="assets/images/logo-caption.svg" alt="">';
    footerContainer.prepend(brand);
  }

  /* Feedback remains front-end only; validation is real, no fake network request. */
  doc.querySelector('[data-feedback]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const button = event.currentTarget.querySelector('button[type="submit"]');
    if (button) {
      const original = button.innerHTML;
      button.textContent = 'Отправлено';
      setTimeout(() => { button.innerHTML = original; }, 1600);
    }
    event.currentTarget.reset();
  });

  /* Dot field fallback used by the current Figma implementation. */
  const dotCanvases = [doc.querySelector('.hero__dots'), doc.querySelector('.association__dots')].filter(Boolean);
  const renderDots = (canvas) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(43,217,232,.13)';
    const spacing = width < 680 ? 46 : 58;
    for (let y = spacing / 2; y < height; y += spacing) {
      for (let x = spacing / 2; x < width; x += spacing) {
        const key = ((Math.round(x / spacing) * 17) + (Math.round(y / spacing) * 31)) % 11;
        if (key < 3) continue;
        ctx.beginPath();
        ctx.arc(x, y, key === 10 ? 2.1 : 1.15, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };
  const renderAllDots = () => dotCanvases.forEach(renderDots);
  renderAllDots();
  window.addEventListener('resize', renderAllDots, { passive: true });

  /* Small, selective reveal system. */
  const revealTargets = [
    ...doc.querySelectorAll('.trade-promo__card, .metrics-grid, .association__intro, .tasks__grid, .directions__grid, .timeline__viewport, .event-card, .governance__grid, .members__grid, .documents__grid, .news__grid, .contacts__grid')
  ];
  revealTargets.forEach((node) => node.classList.add('axe-reveal'));
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    root.classList.add('js-axe-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .06, rootMargin: '0px 0px -4% 0px' });
    revealTargets.forEach((node) => observer.observe(node));
  } else {
    revealTargets.forEach((node) => node.classList.add('is-visible'));
  }

  Object.defineProperty(window, '__AXE_FIGMA_V4__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: true,
          recovery: '2026-08-26',
          headerVisible: Boolean(header),
          navOpen,
          timelineCards: doc.querySelectorAll('.timeline-card').length,
          timelineIndex: timeline?.getIndex() ?? 0,
          quoteCards: doc.querySelectorAll('.quote-card').length,
          quoteIndex: quotes?.getIndex() ?? 0,
          eventCards: doc.querySelectorAll('.event-card').length,
          eventIndex: events?.getIndex() ?? 0,
          memberCards: doc.querySelectorAll('.member-card').length,
          map: { ...mapState }
        };
      }
    }
  });
})();
