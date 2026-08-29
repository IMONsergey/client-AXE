const app = document.querySelector(".bo-app");
const viewButtons = document.querySelectorAll("[data-view-target]");
const forms = document.querySelectorAll("form[data-next-view]");
const authCard = document.querySelector("[data-auth-card]");
const authStage = document.querySelector("[data-auth-stage]");
const authModeButtons = document.querySelectorAll("[data-auth-target]");
const authPanes = document.querySelectorAll("[data-auth-pane]");
const filters = document.querySelector("[data-filters]");
const requestsBody = document.querySelector("[data-requests-body]");
const requestForm = document.querySelector("[data-request-form]");
const drawer = document.querySelector(".bo-drawer");
const drawerBackdrop = document.querySelector(".bo-drawer-backdrop");
const drawerClosers = document.querySelectorAll("[data-close-drawer]");
const successModal = document.querySelector("[data-success-modal]");
const successClosers = document.querySelectorAll("[data-close-success]");
const sortButtons = document.querySelectorAll("[data-sort-key]");
const columnFilterButtons = document.querySelectorAll("[data-column-filter]");
const columnFilterValueButtons = document.querySelectorAll("[data-column-filter-value]");
const columnMenus = document.querySelectorAll("[data-column-menu]");
const typographWordPattern = /(^|[\s([{"'«„])((?:а|в|и|к|о|с|у|во|да|до|за|из|ли|на|не|но|об|от|по|со|то|же|бы|без|для|или|как|над|под|при|про))\s+([^\s])/giu;
const typographSkipTags = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT", "OPTION"]);
const successCloseDelay = 280;

const statusClasses = {
  "Активна": "bo-status--active",
  "Исполнена": "bo-status--done",
  "Отменена": "bo-status--canceled",
};

const typeClasses = {
  "Продажа": "bo-type--sell",
  "Покупка": "bo-type--buy",
};

const defaultSortDirections = {
  date: "desc",
  volume: "desc",
  price: "desc",
};

let sortState = {
  key: null,
  direction: "asc",
};

let lastSubmittedRequestId = null;

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
  if (view === "register") {
    setAuthMode("register");
    view = "login";
  }
  app.dataset.view = view;
  app.classList.remove("is-view-ready");
  requestAnimationFrame(() => {
    applyTypography(app);
    updateAuthStageHeight();
    app.classList.add("is-view-ready");
  });
  if (view === "login") {
    setAuthMode("login");
  }
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

function typographText(value) {
  return String(value || "").replace(typographWordPattern, "$1$2\u00a0$3");
}

function applyTypography(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || typographSkipTags.has(parent.tagName) || !/[а-яё]/i.test(node.nodeValue)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }
  nodes.forEach((node) => {
    node.nodeValue = typographText(node.nodeValue);
  });
}

function getActiveAuthPane() {
  return document.querySelector(".bo-auth-pane.is-active");
}

function updateAuthStageHeight() {
  if (!authStage) {
    return;
  }
  const activePane = getActiveAuthPane();
  if (activePane) {
    authStage.style.height = `${activePane.offsetHeight}px`;
  }
}

function setAuthMode(mode) {
  if (!authCard || !authStage) {
    return;
  }
  const currentPane = getActiveAuthPane();
  const currentHeight = currentPane ? currentPane.offsetHeight : authStage.getBoundingClientRect().height;
  authStage.style.height = `${currentHeight}px`;
  authCard.dataset.authMode = mode;
  authModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.authTarget === mode);
  });
  authPanes.forEach((pane) => {
    const active = pane.dataset.authPane === mode;
    pane.classList.toggle("is-active", active);
    pane.setAttribute("aria-hidden", active ? "false" : "true");
    pane.inert = !active;
    if (!active) {
      clearFormErrors(pane);
    }
  });
  requestAnimationFrame(() => {
    updateAuthStageHeight();
    applyTypography(authCard);
  });
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

function parseDate(value) {
  const match = String(value || "").match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) {
    return 0;
  }
  const [, day, month, year] = match;
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

function parseNumber(value) {
  const match = String(value || "").replace(",", ".").match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function sortValue(request, key) {
  if (key === "date") {
    return parseDate(request.date);
  }
  if (key === "volume") {
    return parseNumber(request.volume);
  }
  if (key === "price") {
    return parseNumber(request.price);
  }
  return 0;
}

function sortRequests(items) {
  if (!sortState.key) {
    return items;
  }
  return [...items].sort((a, b) => {
    const aValue = sortValue(a, sortState.key);
    const bValue = sortValue(b, sortState.key);
    if (aValue === null && bValue === null) {
      return 0;
    }
    if (aValue === null) {
      return 1;
    }
    if (bValue === null) {
      return -1;
    }
    const diff = aValue - bValue;
    return sortState.direction === "asc" ? diff : -diff;
  });
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
  const filtered = sortRequests(requests.filter(matchesFilters));
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
  syncControlState();
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
  applyTypography(drawer);
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

function openSuccessModal(requestId) {
  lastSubmittedRequestId = requestId;
  successModal.hidden = false;
  successModal.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => {
    app.classList.add("is-success-open");
    successModal.querySelector("[data-close-success]").focus({ preventScroll: true });
  });
}

function closeSuccessModal() {
  if (successModal.hidden) {
    return;
  }
  app.classList.remove("is-success-open");
  successModal.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    successModal.hidden = true;
    setView("requests");
    if (lastSubmittedRequestId) {
      window.setTimeout(() => openDrawer(lastSubmittedRequestId), 120);
    }
  }, successCloseDelay);
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

function getFieldErrorMessage(field) {
  const value = String(field.value || "").trim();
  if (field.required && !value) {
    return field.dataset.errorRequired || "Заполните обязательное поле.";
  }
  if (field.type === "email" && value && field.validity.typeMismatch) {
    return field.dataset.errorEmail || "Введите корректный e-mail.";
  }
  if (field.minLength > 0 && value && value.length < field.minLength) {
    return field.dataset.errorMinlength || "Минимум 6 символов.";
  }
  if (field.pattern && value && !new RegExp(`^(?:${field.pattern})$`).test(value)) {
    return field.dataset.errorPattern || "Заполните обязательное поле.";
  }
  if (field.dataset.match) {
    const matchedField = field.form.elements[field.dataset.match];
    if (matchedField && value && value !== matchedField.value) {
      return field.dataset.errorMatch || "Пароли должны совпадать.";
    }
  }
  return "";
}

function setFieldError(field, message) {
  const container = field.closest(".bo-field");
  const error = container ? container.querySelector(".bo-field__error") : null;
  field.setAttribute("aria-invalid", message ? "true" : "false");
  if (container) {
    container.classList.toggle("is-invalid", Boolean(message));
  }
  if (error) {
    error.textContent = message;
    error.hidden = false;
  }
  if (field.closest(".bo-auth-pane.is-active")) {
    requestAnimationFrame(updateAuthStageHeight);
  }
}

function prepareValidationSlots() {
  document.querySelectorAll(".bo-field__error").forEach((error) => {
    error.hidden = false;
  });
}

function validateField(field) {
  const message = getFieldErrorMessage(field);
  setFieldError(field, message);
  return !message;
}

function validateForm(form) {
  const fields = [...form.querySelectorAll("input, select, textarea")];
  let firstInvalid = null;
  fields.forEach((field) => {
    if (!validateField(field) && !firstInvalid) {
      firstInvalid = field;
    }
  });
  updateAuthStageHeight();
  if (firstInvalid) {
    firstInvalid.focus({ preventScroll: true });
    firstInvalid.scrollIntoView({ block: "center", behavior: "smooth" });
    return false;
  }
  return true;
}

function clearFormErrors(form) {
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    setFieldError(field, "");
  });
}

function closeColumnMenus() {
  columnMenus.forEach((menu) => {
    menu.hidden = true;
    menu.style.removeProperty("--menu-top");
    menu.style.removeProperty("--menu-left");
  });
  columnFilterButtons.forEach((button) => {
    button.classList.remove("is-active");
  });
}

function positionColumnMenu(menu, button) {
  const rect = button.getBoundingClientRect();
  const menuWidth = Math.max(menu.offsetWidth, 138);
  const viewportGap = 12;
  const left = Math.min(
    Math.max(viewportGap, rect.left + 8),
    window.innerWidth - menuWidth - viewportGap,
  );
  menu.style.setProperty("--menu-left", `${left}px`);
  menu.style.setProperty("--menu-top", `${rect.bottom + 6}px`);
}

function repositionOpenColumnMenu() {
  const openMenu = [...columnMenus].find((menu) => !menu.hidden);
  if (!openMenu) {
    return;
  }
  const button = document.querySelector(`[data-column-filter="${openMenu.dataset.columnMenu}"]`);
  if (button) {
    positionColumnMenu(openMenu, button);
  }
}

function toggleColumnMenu(button) {
  const key = button.dataset.columnFilter;
  columnMenus.forEach((menu) => {
    const isCurrent = menu.dataset.columnMenu === key;
    const shouldOpen = isCurrent ? menu.hidden : false;
    menu.hidden = !shouldOpen;
    if (shouldOpen) {
      positionColumnMenu(menu, button);
    }
  });
  columnFilterButtons.forEach((button) => {
    const menu = document.querySelector(`[data-column-menu="${button.dataset.columnFilter}"]`);
    button.classList.toggle("is-active", menu && !menu.hidden);
  });
}

function syncControlState() {
  sortButtons.forEach((button) => {
    const th = button.closest("th");
    const active = sortState.key === button.dataset.sortKey;
    button.classList.toggle("is-active", active);
    th.dataset.sortState = active ? sortState.direction : "none";
  });

  columnFilterValueButtons.forEach((button) => {
    const menu = button.closest("[data-column-menu]");
    const value = filters.elements[menu.dataset.columnMenu].value;
    button.classList.toggle("is-active", button.dataset.columnFilterValue === value);
  });
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.viewTarget));
});

authModeButtons.forEach((button) => {
  button.addEventListener("click", () => setAuthMode(button.dataset.authTarget));
});

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm(form)) {
      return;
    }
    if (form === requestForm) {
      const request = requestFromForm(form);
      requests = [request, ...requests];
      form.reset();
      clearFormErrors(form);
      renderRequests();
      openSuccessModal(request.id);
      return;
    }
    setView(form.dataset.nextView);
  });

  form.addEventListener("input", (event) => {
    if (!event.target.matches("input, select, textarea")) {
      return;
    }
    validateField(event.target);
    if (event.target.name === "password") {
      const confirm = form.elements.password_confirm;
      if (confirm && confirm.value) {
        validateField(confirm);
      }
    }
  });

  form.addEventListener("blur", (event) => {
    if (event.target.matches("input, select, textarea")) {
      validateField(event.target);
    }
  }, true);
});

filters.addEventListener("input", renderRequests);
filters.addEventListener("change", renderRequests);

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.sortKey;
    if (sortState.key === key) {
      sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
    } else {
      sortState = {
        key,
        direction: defaultSortDirections[key],
      };
    }
    renderRequests();
  });
});

columnFilterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleColumnMenu(button);
  });
});

columnFilterValueButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const menu = button.closest("[data-column-menu]");
    filters.elements[menu.dataset.columnMenu].value = button.dataset.columnFilterValue;
    closeColumnMenus();
    renderRequests();
  });
});

document.addEventListener("click", closeColumnMenus);

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

successClosers.forEach((button) => {
  button.addEventListener("click", closeSuccessModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSuccessModal();
    closeDrawer();
    closeColumnMenus();
  }
});

renderRequests();
prepareValidationSlots();
setAuthMode("login");
applyTypography(app);
app.classList.add("is-view-ready");
window.addEventListener("resize", updateAuthStageHeight);
window.addEventListener("resize", repositionOpenColumnMenu);
window.addEventListener("scroll", repositionOpenColumnMenu, true);
