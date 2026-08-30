(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealTargets = [];
  const wordTargets = [];
  let ready = false;
  let visibleCount = 0;

  /* Load the dedicated countries-grid motion layer before scroll observers start. */
  if (!document.querySelector('link[data-axe-countries-motion]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/css/countries-grid-motion.css';
    link.dataset.axeCountriesMotion = 'true';
    document.head.appendChild(link);
  }
  import('./countries-grid-motion.js').catch((error) => console.error(error));

  function splitWords(element, step = 32, base = 0) {
    if (!element || element.dataset.motionSplit === 'true') return;

    const original = element.textContent.replace(/\s+/g, ' ').trim();
    if (!original) return;

    element.dataset.motionSplit = 'true';
    element.classList.add('motion-words');
    element.setAttribute('aria-label', original);
    element.textContent = '';

    const words = original.split(' ');
    words.forEach((word, index) => {
      if (index) element.appendChild(document.createTextNode(' '));

      const outer = document.createElement('span');
      outer.className = 'motion-word';
      outer.setAttribute('aria-hidden', 'true');

      const inner = document.createElement('span');
      inner.className = 'motion-word__inner';
      inner.style.setProperty('--word-delay', `${base + index * step}ms`);
      inner.textContent = word;

      outer.appendChild(inner);
      element.appendChild(outer);
    });

    wordTargets.push(element);
  }

  function registerReveal(element, options = {}) {
    if (!element || element.dataset.motionReveal === 'true') return;
    element.dataset.motionReveal = 'true';
    element.classList.add('motion-reveal');
    if (options.short) element.classList.add('motion-reveal--short');
    if (options.scale) element.classList.add('motion-reveal--scale');
    if (options.delay) element.style.setProperty('--motion-delay', `${options.delay}ms`);
    revealTargets.push(element);
  }

  function reveal(element) {
    if (!element || element.classList.contains('is-visible')) return;
    element.classList.add('is-visible');
    visibleCount += 1;
  }

  function setupContent() {
    if (!reducedMotion.matches) {
      /* Compact stagger values keep text reading as one sentence rather than a
         sequence of individual effects. */
      splitWords(document.querySelector('.hero__title'), 32, 90);
      splitWords(document.querySelector('.association-mosaic__about h2'), 38, 0);
      splitWords(document.querySelector('.countries h2'), 36, 0);
    }

    registerReveal(document.querySelector('.hero__copy'), { delay: 150 });
    registerReveal(document.querySelector('.hero__visual'), { delay: 90, scale: true });

    registerReveal(document.querySelector('.association-mosaic'), { delay: 55, scale: true });
    registerReveal(document.querySelector('.goal-statement__label'), { delay: 25, short: true });
    registerReveal(document.querySelector('.goal-statement__title'), { delay: 80 });

    document.querySelectorAll('.country').forEach((element, index) => {
      registerReveal(element, { delay: Math.min(index * 38, 228), short: true });
    });
  }

  function waitForSiteReady(callback) {
    const started = performance.now();

    function check() {
      const preloaderState = window.__AXE_PRELOADER__?.getState?.();
      if (root.classList.contains('is-ready') || preloaderState?.hidden || performance.now() - started > 13000) {
        callback();
        return;
      }
      requestAnimationFrame(check);
    }

    check();
  }

  function startObservers() {
    root.classList.add('motion-intro-visible');

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      [...wordTargets, ...revealTargets].forEach(reveal);
      ready = true;
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      /* Trigger a little earlier, while the next section is approaching the
         reading zone. This removes the stop-start feeling during slow scroll. */
      threshold: 0.1,
      rootMargin: '0px 0px -4% 0px'
    });

    [...wordTargets, ...revealTargets].forEach((element) => observer.observe(element));
    ready = true;
  }

  setupContent();
  root.classList.add('motion-ready');
  waitForSiteReady(startObservers);

  reducedMotion.addEventListener?.('change', () => {
    if (!reducedMotion.matches) return;
    root.classList.add('motion-intro-visible');
    [...wordTargets, ...revealTargets].forEach(reveal);
  });

  Object.defineProperty(window, '__AXE_MOTION__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready,
          reducedMotion: reducedMotion.matches,
          revealTargets: revealTargets.length,
          wordTargets: wordTargets.length,
          visibleCount
        };
      }
    }
  });
})();
