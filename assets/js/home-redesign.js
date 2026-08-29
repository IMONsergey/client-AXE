const body = document.body;
const nav = document.querySelector('[data-nav]');
const menuButton = document.querySelector('[data-menu]');

if (nav && menuButton) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    body.classList.toggle('is-menu-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    nav.classList.remove('is-open');
    body.classList.remove('is-menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
}

document.querySelectorAll('[data-scroll-prev], [data-scroll-next]').forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-scroll-prev') || button.getAttribute('data-scroll-next');
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;

    const direction = button.hasAttribute('data-scroll-prev') ? -1 : 1;
    const amount = Math.max(240, Math.round(target.clientWidth * 0.78));
    target.scrollBy({ left: direction * amount, behavior: 'smooth' });
  });
});

document.addEventListener('click', (event) => {
  const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
  if (!(link instanceof HTMLAnchorElement)) return;

  const target = document.querySelector(link.hash);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

window.addEventListener('load', () => {
  document.documentElement.classList.remove('is-loading');
});
