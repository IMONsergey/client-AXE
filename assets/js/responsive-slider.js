(() => {
  document.querySelectorAll('[data-responsive-slider]').forEach((root) => {
    const slides = [...root.querySelectorAll('[data-slider-slide]')];
    const controls = root.previousElementSibling?.querySelector('[data-slider-controls]') ?? root.querySelector('[data-slider-controls]');
    const previous = controls?.querySelector('[data-slider-previous]');
    const next = controls?.querySelector('[data-slider-next]');
    const breakpoint = Number(root.dataset.sliderBreakpoint) || 780;
    const mobile = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const trackMode = root.dataset.sliderMode === 'track';
    const responsiveTrackMode = root.dataset.sliderMode === 'responsive-track';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activeIndex = 0;
    let touchStartX = null;
    let scrollSyncTimer = null;
    let resizeFrame = null;

    function isTrackMode() {
      return trackMode || (responsiveTrackMode && !mobile.matches);
    }

    function getTrackStops() {
      if (!isTrackMode() || !slides.length) return [];

      const firstOffset = slides[0].offsetLeft;
      const maximum = Math.max(0, root.scrollWidth - root.clientWidth);
      const stride = slides[1] ? slides[1].offsetLeft - firstOffset : slides[0].offsetWidth;
      const mergeDistance = Math.max(1, stride * 0.5);
      const stops = [];

      slides.forEach((slide, index) => {
        if (stops.at(-1)?.left === maximum) return;
        const natural = Math.max(0, slide.offsetLeft - firstOffset);
        if (maximum - natural <= mergeDistance) {
          stops.push({ left: maximum, slideIndex: slides.length - 1 });
          return;
        }
        stops.push({ left: natural, slideIndex: index });
      });

      if (stops.at(-1)?.left !== maximum) {
        stops.push({ left: maximum, slideIndex: slides.length - 1 });
      }

      return stops.filter((stop, index) => index === 0 || Math.abs(stop.left - stops[index - 1].left) > 1);
    }

    function setActiveSlide(slideIndex) {
      slides.forEach((slide, index) => {
        const isActive = index === slideIndex;
        slide.classList.toggle('is-active', isActive);
        slide.hidden = !isTrackMode() && mobile.matches && !isActive;
        slide.setAttribute('aria-hidden', !isTrackMode() && mobile.matches && !isActive ? 'true' : 'false');
      });
    }

    function render() {
      if (isTrackMode()) {
        const stops = getTrackStops();
        activeIndex = Math.min(activeIndex, Math.max(0, stops.length - 1));
        const stop = stops[activeIndex] ?? { left: 0, slideIndex: 0 };
        setActiveSlide(stop.slideIndex);
        root.scrollTo({
          left: stop.left,
          behavior: reducedMotion.matches ? 'auto' : 'smooth'
        });
        return;
      }

      if (responsiveTrackMode) root.scrollTo({ left: 0, behavior: 'auto' });
      setActiveSlide(activeIndex);
    }

    function move(step) {
      const itemCount = isTrackMode() ? getTrackStops().length : slides.length;
      if (!itemCount) return;
      activeIndex = (activeIndex + step + itemCount) % itemCount;
      render();
    }

    function syncTrackPosition() {
      if (!isTrackMode()) return;
      const stops = getTrackStops();
      if (!stops.length) return;
      activeIndex = stops.reduce((closest, stop, index) => (
        Math.abs(stop.left - root.scrollLeft) < Math.abs(stops[closest].left - root.scrollLeft) ? index : closest
      ), 0);
      setActiveSlide(stops[activeIndex].slideIndex);
    }

    previous?.addEventListener('click', () => move(-1));
    next?.addEventListener('click', () => move(1));
    mobile.addEventListener?.('change', render);

    if (trackMode || responsiveTrackMode) {
      root.addEventListener('scroll', () => {
        window.clearTimeout(scrollSyncTimer);
        scrollSyncTimer = window.setTimeout(syncTrackPosition, 100);
      }, { passive: true });

      window.addEventListener('resize', () => {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(render);
      }, { passive: true });
    }

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
