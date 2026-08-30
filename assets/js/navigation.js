(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');

  if (!toggle || !nav || !header) return;

  const mobileQuery = window.matchMedia('(max-width: 1320px)');
  const links = [...nav.querySelectorAll('a')];
  let open = false;
  let scrolled = false;
  let scrollFrame = 0;

  function syncState(nextOpen, { restoreFocus = false } = {}) {
    open = Boolean(nextOpen && mobileQuery.matches);
    toggle.classList.toggle('is-open', open);
    nav.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    nav.setAttribute('aria-hidden', mobileQuery.matches ? String(!open) : 'false');

    if (open) {
      requestAnimationFrame(() => links[0]?.focus({ preventScroll: true }));
    } else if (restoreFocus) {
      toggle.focus({ preventScroll: true });
    }
  }

  function close(options) {
    syncState(false, options);
  }

  toggle.addEventListener('click', () => {
    syncState(!open, { restoreFocus: open });
  });

  links.forEach((link) => {
    link.addEventListener('click', () => close());
  });

  document.addEventListener('keydown', (event) => {
    if (!open) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      close({ restoreFocus: true });
      return;
    }

    if (event.key !== 'Tab') return;

    const focusables = [toggle, ...links].filter((element) => !element.hasAttribute('disabled'));
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  mobileQuery.addEventListener?.('change', () => {
    if (!mobileQuery.matches) {
      close();
      nav.setAttribute('aria-hidden', 'false');
    } else {
      nav.setAttribute('aria-hidden', String(!open));
    }
  });

  function updateScrollState() {
    scrollFrame = 0;
    const next = window.scrollY > 18;
    if (next === scrolled) return;
    scrolled = next;
    header.classList.toggle('is-scrolled', scrolled);
  }

  function scheduleScrollState() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(updateScrollState);
  }

  syncState(false);
  updateScrollState();
  window.addEventListener('scroll', scheduleScrollState, { passive: true });

  Object.defineProperty(window, '__AXE_NAVIGATION__', {
    configurable: true,
    value: {
      getState() {
        return {
          open,
          mobile: mobileQuery.matches,
          expanded: toggle.getAttribute('aria-expanded') === 'true'
        };
      },
      close
    }
  });

  Object.defineProperty(window, '__AXE_STICKY_HEADER__', {
    configurable: true,
    value: {
      getState() {
        return {
          fixed: getComputedStyle(header).position === 'fixed',
          scrolled,
          inBody: header.parentElement === document.body
        };
      }
    }
  });
})();
