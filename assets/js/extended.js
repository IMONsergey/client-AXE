(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.documentElement.classList.add('ext-motion');

  function initReveals() {
    const targets = [...document.querySelectorAll('.ext-reveal, .ext-stagger')];
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    targets.forEach((el) => observer.observe(el));
  }

  function initCarousel(rootSelector, slideSelector, prevSelector, nextSelector, counterSelector) {
    const root = document.querySelector(rootSelector);
    if (!root) return null;
    const slides = [...root.querySelectorAll(slideSelector)];
    const prev = root.querySelector(prevSelector);
    const next = root.querySelector(nextSelector);
    const counter = root.querySelector(counterSelector);
    let index = 0;

    const render = () => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
        slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      });
      if (counter) counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    };

    const move = (delta) => {
      index = (index + delta + slides.length) % slides.length;
      render();
    };

    prev?.addEventListener('click', () => move(-1));
    next?.addEventListener('click', () => move(1));
    render();
    return { get index() { return index; }, move };
  }

  const gallery = initCarousel(
    '.media-gallery',
    '.media-slide',
    '[data-gallery-prev]',
    '[data-gallery-next]',
    '[data-gallery-counter]'
  );

  const quotes = initCarousel(
    '.quote-carousel',
    '.quote-card',
    '[data-quote-prev]',
    '[data-quote-next]',
    '[data-quote-counter]'
  );

  function initNews() {
    document.querySelectorAll('.news-item').forEach((item) => {
      const trigger = item.querySelector('.news-item__trigger');
      const panel = item.querySelector('.news-item__panel');
      if (!trigger || !panel) return;
      trigger.addEventListener('click', () => {
        const open = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', String(open));
        panel.setAttribute('aria-hidden', String(!open));
      });
    });
  }

  function initPrototypeForms() {
    const form = document.querySelector('.contact-form');
    form?.addEventListener('submit', (event) => event.preventDefault());
    document.querySelectorAll('a[data-prototype-link]').forEach((link) => {
      link.addEventListener('click', (event) => event.preventDefault());
    });
  }

  initReveals();
  initNews();
  initPrototypeForms();

  Object.defineProperty(window, '__AXE_EXTENDED__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: true,
          gallerySlides: document.querySelectorAll('.media-slide').length,
          galleryIndex: gallery?.index ?? -1,
          quoteSlides: document.querySelectorAll('.quote-card').length,
          quoteIndex: quotes?.index ?? -1,
          newsItems: document.querySelectorAll('.news-item').length,
          members: document.querySelectorAll('.member-card').length,
          documents: document.querySelectorAll('.document-row').length
        };
      }
    }
  });
})();
