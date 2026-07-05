function setupNavDropdowns() {
  const dropdowns = document.querySelectorAll<HTMLElement>("[data-nav-dropdown]");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector<HTMLButtonElement>(".nav-dropdown__toggle");
    const menu = dropdown.querySelector<HTMLElement>(".nav-dropdown__menu");
    if (!toggle || !menu) return;

    dropdown.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    toggle.addEventListener("click", () => {
      const isOpen = dropdown.classList.contains("is-open");

      closeAllDropdowns();

      if (!isOpen) {
        dropdown.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", () => {
    closeAllDropdowns();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllDropdowns();
    }
  });

  function closeAllDropdowns() {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");
      const toggle = dropdown.querySelector<HTMLButtonElement>(".nav-dropdown__toggle");
      toggle?.setAttribute("aria-expanded", "false");
    });
  }
}

setupNavDropdowns();
