(function () {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const fileInput = form.querySelector("[data-contact-file]");
  const fileLabel = form.querySelector("[data-contact-file-label]");
  const defaultFileLabel = fileLabel?.textContent || "";

  fileInput?.addEventListener("change", () => {
    if (!fileLabel) return;
    fileLabel.textContent = fileInput.files?.[0]?.name || defaultFileLabel;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
})();
