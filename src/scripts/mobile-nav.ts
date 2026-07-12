function setupMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const main = document.getElementById("main-content");
  const footer = document.querySelector(".site-footer");

  if (!toggle || !menu) return;

  const labelOpen = toggle.dataset.labelOpen ?? "Open menu";
  const labelClose = toggle.dataset.labelClose ?? "Close menu";
  let menuScrollPosition = 0;
  let previousFocus: HTMLElement | null = null;

  function getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hidden && element.getAttribute("aria-hidden") !== "true");
  }

  function setBackgroundInert(inert: boolean) {
    main?.toggleAttribute("inert", inert);
    footer?.toggleAttribute("inert", inert);

    if (inert) {
      main?.setAttribute("aria-hidden", "true");
      footer?.setAttribute("aria-hidden", "true");
    } else {
      main?.removeAttribute("aria-hidden");
      footer?.removeAttribute("aria-hidden");
    }
  }

  function closeMenu() {
    const wasOpen = document.body.classList.contains("nav-open");

    menu.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", labelOpen);
    setBackgroundInert(false);
    document.removeEventListener("keydown", handleKeydown);

    if (wasOpen) {
      document.body.classList.remove("nav-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, menuScrollPosition);
      previousFocus?.focus();
      previousFocus = null;
    }
  }

  function openMenu() {
    menuScrollPosition = window.scrollY;
    previousFocus = document.activeElement as HTMLElement | null;
    menu.classList.add("is-open");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", labelClose);
    setBackgroundInert(true);
    document.body.classList.add("nav-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${menuScrollPosition}px`;
    document.body.style.width = "100%";
    document.addEventListener("keydown", handleKeydown);

    const firstFocusable = getFocusableElements(menu)[0];
    firstFocusable?.focus();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeMenu();
      return;
    }

    if (event.key !== "Tab" || !menu.classList.contains("is-open")) return;

    const focusable = [toggle, ...getFocusableElements(menu)];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  toggle.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll(".nav-links > .nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  menu.querySelectorAll(".nav-dropdown__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}

setupMobileNav();
