const app = document.querySelector(".bo-app");
const viewButtons = document.querySelectorAll("[data-view-target]");
const forms = document.querySelectorAll("form[data-next-view]");
const filters = document.querySelector("[data-filters]");
const requestsBody = document.querySelector("[data-requests-body]");
const requestForm = document.querySelector("[data-request-form]");
const drawer = document.querySelector(".bo-drawer");
const drawerBackdrop = document.querySelector(".bo-drawer-backdrop");
const drawerClosers = document.querySelectorAll("[data-close-drawer]");

const statusClasses = {
  "Активна": "bo-status--active",
  "Исполнена": "bo-status--done",
  "Отменена": "bo-status--canceled",
};

const typeClasses = {
  "Продажа": "bo-type--sell",
  "Покупка": "bo-type--buy",
};

let requests = [
  {
    id: "spimex-wheat-2026",
    date: "01.08.2026",
    type: "Продажа",
    participant: "Петербургская Биржа",
    product: "Пшеница 3 класса, урожай 2026",
    volume: "5000 т",
    volumeNote: "мин. партия 500 т",
    price: "320 USD/т, предоплата 30%",
    delivery: "FOB, порт Новороссийск",
    status: "Активна",
    flag: "assets/russia-flag.png",
    logo: "assets/spimex-logo.png",
  },
  {
    id: "etc-metal-2026",
    date: "30.07.2026",
    type: "Покупка",
    participant: "ETC (Казахстан)",
    product: "Металлопрокат г/к",
    volume: "1200 т",
    price: "по договорённости, KZT/USD",
    delivery: "DAP, склад покупателя",
    status: "Активна",
  },
  {
    id: "butb-lumber-2026",
    date: "25.07.2026",
    type: "Продажа",
    participant: "БУТБ (Беларусь)",
    product: "Пиломатериалы хвойных пород",
    volume: "800 куб. м",
    price: "190 USD/куб.м, отсрочка 14 дней",
    delivery: "Самовывоз со склада",
    status: "Исполнена",
  },
  {
    id: "ncdex-soy-2026",
    date: "18.07.2026",
    type: "Покупка",
    participant: "NCDEX (Индия)",
    product: "Соевые бобы",
    volume: "от 2000 т",
    price: "Цена и график оплаты согласуются после подтверждения объема и порта назначения.",
    delivery: "Любой способ, порт назначения - по согласованию",
    status: "Отменена",
  },
];

function setView(view) {
  closeDrawer(false);
  app.dataset.view = view;
  app.classList.remove("is-view-ready");
  requestAnimationFrame(() => app.classList.add("is-view-ready"));
  document.querySelectorAll(".bo-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.viewTarget === view);
  });
  window.scrollTo({ top: 0, behavior: "auto" });
}

function normalize(value) {
  return String(value || "").trim().toLocaleLowerCase("ru-RU");
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  })[char]);
}

function splitDetail(value) {
  const parts = String(value || "").split(/,\s(.+)/);
  if (parts.length < 3) {
    return escapeHtml(value);
  }
  return `${escapeHtml(parts[0])}, <small>${escapeHtml(parts[1])}</small>`;
}

function volumeMarkup(request) {
  if (!request.volumeNote) {
    return escapeHtml(request.volume);
  }
  return `${escapeHtml(request.volume)} <small>(${escapeHtml(request.volumeNote)})</small>`;
}

function matchesFilters(request) {
  const values = new FormData(filters);
  const type = values.get("type");
  const status = values.get("status");
  const participant = normalize(values.get("participant"));
  const product = normalize(values.get("product"));
  const delivery = normalize(values.get("delivery"));

  return (!type || request.type === type)
    && (!status || request.status === status)
    && (!participant || normalize(request.participant).includes(participant))
    && (!product || normalize(request.product).includes(product))
    && (!delivery || normalize(request.delivery).includes(delivery));
}

function renderRequests() {
  const filtered = requests.filter(matchesFilters);
  requestsBody.innerHTML = filtered.map((request, index) => `
    <tr data-request-id="${escapeHtml(request.id)}" tabindex="0" style="--row-index: ${index}" aria-label="${escapeHtml(request.type)} ${escapeHtml(request.product)}">
      <td>${escapeHtml(request.date)}</td>
      <td><strong class="bo-type ${typeClasses[request.type]}">${escapeHtml(request.type)}</strong></td>
      <td>${escapeHtml(request.participant)}</td>
      <td>${escapeHtml(request.product)}</td>
      <td>${volumeMarkup(request)}</td>
      <td>${splitDetail(request.price)}</td>
      <td>${escapeHtml(request.delivery)}</td>
      <td><span class="bo-status ${statusClasses[request.status]}">${escapeHtml(request.status)}</span></td>
    </tr>
  `).join("");
}

function getRequestById(id) {
  return requests.find((request) => request.id === id);
}

function setClassByMap(element, map, value, baseClass) {
  element.className = baseClass;
  element.classList.add(map[value]);
}

function fillDrawer(request) {
  drawer.querySelector("[data-drawer-date]").textContent = request.date;
  drawer.querySelector("[data-drawer-product]").textContent = request.product;
  drawer.querySelector("[data-drawer-participant]").textContent = request.participant;
  drawer.querySelector("[data-drawer-volume]").textContent = request.volumeNote
    ? `${request.volume} (${request.volumeNote})`
    : request.volume || "-";
  drawer.querySelector("[data-drawer-delivery]").textContent = request.delivery || "-";
  drawer.querySelector("[data-drawer-price]").textContent = request.price || "-";

  const type = drawer.querySelector("[data-drawer-type]");
  type.textContent = request.type;
  setClassByMap(type, typeClasses, request.type, "bo-type");

  const status = drawer.querySelector("[data-drawer-status]");
  status.textContent = request.status;
  setClassByMap(status, statusClasses, request.status, "bo-status");

  const flag = drawer.querySelector("[data-drawer-flag]");
  flag.hidden = !request.flag;
  if (request.flag) {
    flag.src = request.flag;
  }

  const logo = drawer.querySelector("[data-drawer-logo]");
  logo.hidden = !request.logo;
  if (request.logo) {
    logo.src = request.logo;
  }
}

function openDrawer(id) {
  const request = getRequestById(id);
  if (!request) {
    return;
  }
  fillDrawer(request);
  drawer.hidden = false;
  drawerBackdrop.hidden = false;
  drawer.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => {
    app.classList.add("is-drawer-open");
    drawer.querySelector("[data-close-drawer]").focus({ preventScroll: true });
  });
}

function closeDrawer(animate = true) {
  if (drawer.hidden) {
    return;
  }
  app.classList.remove("is-drawer-open");
  drawer.setAttribute("aria-hidden", "true");
  const finish = () => {
    drawer.hidden = true;
    drawerBackdrop.hidden = true;
  };
  if (animate) {
    window.setTimeout(finish, 220);
  } else {
    finish();
  }
}

function requestFromForm(form) {
  const values = new FormData(form);
  const id = `request-${Date.now()}`;
  return {
    id,
    date: values.get("date"),
    type: values.get("type"),
    participant: values.get("participant"),
    product: values.get("product"),
    volume: values.get("volume") || "-",
    price: values.get("price") || "-",
    delivery: values.get("delivery") || "-",
    status: values.get("status"),
  };
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.viewTarget));
});

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) {
      return;
    }
    if (form === requestForm) {
      const request = requestFromForm(form);
      requests = [request, ...requests];
      form.reset();
      renderRequests();
      setView("requests");
      window.setTimeout(() => openDrawer(request.id), 120);
      return;
    }
    setView(form.dataset.nextView);
  });
});

filters.addEventListener("input", renderRequests);
filters.addEventListener("change", renderRequests);

requestsBody.addEventListener("click", (event) => {
  const row = event.target.closest("[data-request-id]");
  if (row) {
    openDrawer(row.dataset.requestId);
  }
});

requestsBody.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }
  const row = event.target.closest("[data-request-id]");
  if (row) {
    event.preventDefault();
    openDrawer(row.dataset.requestId);
  }
});

drawerClosers.forEach((button) => {
  button.addEventListener("click", () => closeDrawer());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
  }
});

renderRequests();
app.classList.add("is-view-ready");
