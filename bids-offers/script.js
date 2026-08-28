const app = document.querySelector(".bo-app");
const viewButtons = document.querySelectorAll("[data-view-target]");
const forms = document.querySelectorAll("form[data-next-view]");
const drawerOpeners = document.querySelectorAll("[data-open-drawer]");
const drawerClosers = document.querySelectorAll("[data-close-drawer]");
const drawer = document.querySelector(".bo-drawer");
const drawerBackdrop = document.querySelector(".bo-drawer-backdrop");

function setView(view) {
  app.dataset.view = view;
  app.classList.remove("is-drawer-open");
  document.querySelectorAll(".bo-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.viewTarget === view);
  });
  window.scrollTo({ top: 0, behavior: "instant" });
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.viewTarget));
});

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    setView(form.dataset.nextView);
  });
});

drawerOpeners.forEach((row) => {
  row.addEventListener("click", () => {
    drawer.hidden = false;
    drawerBackdrop.hidden = false;
    drawer.setAttribute("aria-hidden", "false");
    app.classList.add("is-drawer-open");
  });
});

drawerClosers.forEach((button) => {
  button.addEventListener("click", closeDrawer);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
  }
});

function closeDrawer() {
  app.classList.remove("is-drawer-open");
  drawer.setAttribute("aria-hidden", "true");
  drawer.hidden = true;
  drawerBackdrop.hidden = true;
}
