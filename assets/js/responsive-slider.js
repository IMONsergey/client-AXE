(() => {
  document.querySelectorAll('[data-responsive-slider]').forEach((root) => {
    const slides = [...root.querySelectorAll('[data-slider-slide]')];
    const controls = root.previousElementSibling?.querySelector('[data-slider-controls]') ?? root.querySelector('[data-slider-controls]');
    const previous = controls?.querySelector('[data-slider-previous]');
    const next = controls?.querySelector('[data-slider-next]');
    const breakpoint = Number(root.dataset.sliderBreakpoint) || 780;
    const mobile = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const trackMode = root.dataset.sliderMode === 'track';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activeIndex = 0;
    let touchStartX = null;

    function render() {
      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        slide.classList.toggle('is-active', isActive);
        slide.hidden = !trackMode && mobile.matches && !isActive;
        slide.setAttribute('aria-hidden', !trackMode && mobile.matches && !isActive ? 'true' : 'false');
      });

      if (trackMode) {
        const firstOffset = slides[0]?.offsetLeft ?? 0;
        root.scrollTo({
          left: (slides[activeIndex]?.offsetLeft ?? firstOffset) - firstOffset,
          behavior: reducedMotion.matches ? 'auto' : 'smooth'
        });
      }
    }

    function move(step) {
      activeIndex = (activeIndex + step + slides.length) % slides.length;
      render();
    }

    previous?.addEventListener('click', () => move(-1));
    next?.addEventListener('click', () => move(1));
    mobile.addEventListener?.('change', render);

    root.addEventListener('touchstart', (event) => {
      touchStartX = event.touches[0]?.clientX ?? null;
    }, { passive: true });

    root.addEventListener('touchend', (event) => {
      if (touchStartX === null) return;
      const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
      const distance = touchEndX - touchStartX;
      touchStartX = null;
      if (Math.abs(distance) < 45) return;
      move(distance > 0 ? -1 : 1);
    }, { passive: true });

    render();
  });
})();
