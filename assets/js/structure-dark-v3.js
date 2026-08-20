(() => {
  // Document-aligned candidate interactions: reveal + key-events slider.
  // QA trigger: validates the complete dark + map candidate at desktop and mobile widths.
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealTargets = [...document.querySelectorAll('.v3-reveal')];
  root.classList.add('js-v3-motion');

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealTargets.forEach((node) => node.classList.add('is-v3-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-v3-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    revealTargets.forEach((node) => observer.observe(node));
  }

  const slider = document.querySelector('[data-event-slider]');
  const slides = slider ? [...slider.querySelectorAll('.event-slide')] : [];
  const track = slider?.querySelector('.event-slider__track');
  const prev = document.querySelector('[data-event-prev]');
  const next = document.querySelector('[data-event-next]');
  const current = document.querySelector('[data-event-current]');
  let index = 0;

  function renderSlider(nextIndex) {
    if (!slides.length || !track) return;
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    if (current) current.textContent = String(index + 1).padStart(2, '0');
  }

  prev?.addEventListener('click', () => renderSlider(index - 1));
  next?.addEventListener('click', () => renderSlider(index + 1));
  slider?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') renderSlider(index - 1);
    if (event.key === 'ArrowRight') renderSlider(index + 1);
  });
  if (slider) slider.tabIndex = 0;
  renderSlider(0);

  Object.defineProperty(window, '__AXE_STRUCTURE_V3__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: true,
          reveals: revealTargets.length,
          eventSlides: slides.length,
          eventIndex: index,
          tasks: document.querySelectorAll('.tasks-v3__list li').length,
          directions: document.querySelectorAll('.direction-row').length,
          timeline: document.querySelectorAll('.timeline-item').length,
          quotes: document.querySelectorAll('.quote-v3').length
        };
      }
    }
  });
})();
