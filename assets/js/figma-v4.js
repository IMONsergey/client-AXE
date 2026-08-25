(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');

  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  menu?.addEventListener('click', () => {
    const open = !body.classList.contains('nav-open');
    body.classList.toggle('nav-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  nav?.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    body.classList.remove('nav-open');
    menu?.setAttribute('aria-expanded', 'false');
  });

  function setupSlider({ viewport, track, cards, prev, next, current }) {
    if (!viewport || !track || !cards.length) return;
    let index = 0;
    const visibleCount = () => {
      const cardWidth = cards[0].getBoundingClientRect().width;
      const viewportWidth = viewport.getBoundingClientRect().width;
      return Math.max(1, Math.round(viewportWidth / Math.max(1, cardWidth)));
    };
    const render = (nextIndex) => {
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.gap || styles.columnGap) || 0;
      const width = cards[0].getBoundingClientRect().width + gap;
      const max = Math.max(0, cards.length - visibleCount());
      index = Math.max(0, Math.min(nextIndex, max));
      track.style.transform = 'translate3d(' + (-index * width) + 'px,0,0)';
      prev?.toggleAttribute('disabled', index === 0);
      next?.toggleAttribute('disabled', index === max);
      if (current) current.textContent = String(index + 1);
    };
    prev?.addEventListener('click', () => render(index - 1));
    next?.addEventListener('click', () => render(index + 1));
    viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') render(index - 1);
      if (event.key === 'ArrowRight') render(index + 1);
    });
    window.addEventListener('resize', () => render(index), { passive: true });
    render(0);
  }

  const timelineViewport = document.querySelector('[data-timeline-slider]');
  setupSlider({
    viewport: timelineViewport,
    track: timelineViewport?.querySelector('.timeline__track'),
    cards: [...(timelineViewport?.querySelectorAll('.timeline-card') || [])],
    prev: document.querySelector('[data-timeline-prev]'),
    next: document.querySelector('[data-timeline-next]'),
    current: document.querySelector('[data-timeline-current]')
  });

  const quoteViewport = document.querySelector('[data-quote-slider]');
  if (quoteViewport) quoteViewport.tabIndex = 0;
  setupSlider({
    viewport: quoteViewport,
    track: quoteViewport?.querySelector('.quotes__track'),
    cards: [...(quoteViewport?.querySelectorAll('.quote-card') || [])],
    prev: document.querySelector('[data-quote-prev]'),
    next: document.querySelector('[data-quote-next]'),
    current: document.querySelector('[data-quote-current]')
  });

  document.querySelector('[data-feedback]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    event.currentTarget.reset();
  });

  const dotCanvases = [document.querySelector('.hero__dots'), document.querySelector('.association__dots')].filter(Boolean);
  const renderDots = (canvas) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const ctx = canvas.getContext('2d');
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

  Object.defineProperty(window, '__AXE_FIGMA_V4__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: true,
          headerVisible: Boolean(header),
          timelineCards: document.querySelectorAll('.timeline-card').length,
          quoteCards: document.querySelectorAll('.quote-card').length,
          memberCards: document.querySelectorAll('.member-card').length
        };
      }
    }
  });
})();
