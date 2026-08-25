(() => {
  const panels = [...document.querySelectorAll('[data-auth-panel]')];
  const panelNames = new Set(panels.map((panel) => panel.dataset.authPanel));
  const showPanel = () => {
    if (!panels.length) return;
    const requested = window.location.hash.slice(1);
    const active = panelNames.has(requested) ? requested : 'login';
    panels.forEach((panel) => { panel.hidden = panel.dataset.authPanel !== active; });
  };
  window.addEventListener('hashchange', showPanel);
  showPanel();

  document.querySelector('[data-login]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    window.location.href = 'app.html';
  });

  document.querySelector('[data-register]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const email = event.currentTarget.querySelector('input[type="email"]').value || 'test@test.ru';
    document.querySelectorAll('[data-auth-email]').forEach((node) => { node.textContent = email; });
    window.location.hash = 'confirm';
  });

  document.querySelector('[data-recover]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const email = event.currentTarget.querySelector('input[type="email"]').value || 'test@test.ru';
    document.querySelectorAll('[data-auth-email]').forEach((node) => { node.textContent = email; });
    window.location.hash = 'reset-sent';
  });

  const filters = document.querySelector('[data-filters]');
  const rows = [...document.querySelectorAll('[data-request]')];
  const normalize = (value) => String(value || '').trim().toLocaleLowerCase('ru');
  const applyFilters = () => {
    if (!filters) return;
    const data = new FormData(filters);
    const type = normalize(data.get('type'));
    const participant = normalize(data.get('participant'));
    const product = normalize(data.get('product'));
    const delivery = normalize(data.get('delivery'));
    const status = normalize(data.get('status'));
    rows.forEach((row) => {
      const visible = (!type || normalize(row.dataset.type) === type)
        && (!participant || normalize(row.dataset.participant).includes(participant))
        && (!product || normalize(row.dataset.product).includes(product))
        && (!delivery || normalize(row.dataset.delivery).includes(delivery))
        && (!status || normalize(row.dataset.status) === status);
      row.hidden = !visible;
    });
  };
  filters?.addEventListener('input', applyFilters);
  filters?.addEventListener('change', applyFilters);

  document.querySelector('[data-request-form]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    window.location.href = 'app.html';
  });

  Object.defineProperty(window, '__AXE_TRADE_REQUESTS__', {
    configurable: true,
    value: {
      getState() {
        return {
          ready: true,
          panel: document.querySelector('[data-auth-panel]:not([hidden])')?.dataset.authPanel || null,
          rows: rows.length,
          visibleRows: rows.filter((row) => !row.hidden).length
        };
      }
    }
  });
})();
