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

  const timelineSlider = document.querySelector('[data-timeline-slider]');
  const timelineTrack = timelineSlider?.querySelector('.timeline-v3__track');
  const timelineItems = timelineTrack ? [...timelineTrack.querySelectorAll('.timeline-item')] : [];
  const timelinePrev = document.querySelector('[data-timeline-prev]');
  const timelineNext = document.querySelector('[data-timeline-next]');
  const timelineCurrent = document.querySelector('[data-timeline-current]');
  let timelineIndex = 0;

  function renderTimeline(nextIndex) {
    if (!timelineSlider || !timelineTrack || !timelineItems.length) return;
    timelineIndex = Math.max(0, Math.min(nextIndex, timelineItems.length - 1));
    const itemWidth = timelineItems[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(timelineTrack).columnGap || getComputedStyle(timelineTrack).gap) || 0;
    timelineTrack.style.transform = `translate3d(${-(timelineIndex * (itemWidth + gap))}px, 0, 0)`;
    timelinePrev?.toggleAttribute('disabled', timelineIndex === 0);
    timelineNext?.toggleAttribute('disabled', timelineIndex === timelineItems.length - 1);
    if (timelineCurrent) timelineCurrent.textContent = String(timelineIndex + 1).padStart(2, '0');
  }

  timelinePrev?.addEventListener('click', () => renderTimeline(timelineIndex - 1));
  timelineNext?.addEventListener('click', () => renderTimeline(timelineIndex + 1));
  timelineSlider?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') renderTimeline(timelineIndex - 1);
    if (event.key === 'ArrowRight') renderTimeline(timelineIndex + 1);
  });
  window.addEventListener('resize', () => renderTimeline(timelineIndex), { passive: true });
  if (timelineSlider) timelineSlider.tabIndex = 0;
  renderTimeline(0);

  Object.defineProperty(window, '__AXE_STRUCTURE_V3__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: true,
          reveals: revealTargets.length,
          eventSlides: slides.length,
          eventIndex: index,
          timelineIndex,
          tasks: document.querySelectorAll('[data-task]').length,
          directions: document.querySelectorAll('.direction-row').length,
          timeline: document.querySelectorAll('.timeline-item').length,
          quotes: document.querySelectorAll('.quote-v3').length
        };
      }
    }
  });
})();
