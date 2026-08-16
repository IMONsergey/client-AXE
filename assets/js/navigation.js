(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');

  if (!toggle || !nav || !header) return;

  const mobileQuery = window.matchMedia('(max-width: 1320px)');
  const links = [...nav.querySelectorAll('a')];
  let open = false;

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

  syncState(false);

  /* Sticky header: preserve the original flow slot, then move the real header to body
     while pinned so it is not constrained by .visual-stage's stacking context. */
  const anchor = document.createComment('axe-header-anchor');
  const placeholder = document.createElement('div');
  placeholder.className = 'site-header-placeholder';
  placeholder.setAttribute('aria-hidden', 'true');
  header.parentNode.insertBefore(anchor, header);
  header.insertAdjacentElement('afterend', placeholder);

  let pinned = false;
  let flowHeight = 0;
  let ticking = false;

  function measureHeader() {
    if (pinned) return;
    flowHeight = Math.max(1, Math.round(header.getBoundingClientRect().height));
    document.documentElement.style.setProperty('--axe-header-flow-height', `${flowHeight}px`);
  }

  function pinHeader() {
    if (pinned) return;
    measureHeader();
    pinned = true;
    placeholder.classList.add('is-active');
    header.classList.add('is-pinned');
    document.body.appendChild(header);
  }

  function unpinHeader() {
    if (!pinned) return;
    pinned = false;
    header.classList.remove('is-pinned');
    placeholder.classList.remove('is-active');
    anchor.parentNode.insertBefore(header, placeholder);
    measureHeader();
  }

  function syncPinnedState() {
    ticking = false;
    const shouldPin = window.scrollY > 28;
    if (shouldPin) pinHeader();
    else unpinHeader();
  }

  function schedulePinnedState() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(syncPinnedState);
  }

  measureHeader();
  syncPinnedState();
  window.addEventListener('scroll', schedulePinnedState, { passive: true });
  window.addEventListener('resize', () => {
    if (!pinned) measureHeader();
    schedulePinnedState();
  }, { passive: true });

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
          pinned,
          flowHeight,
          inBody: header.parentElement === document.body
        };
      }
    }
  });
})();
