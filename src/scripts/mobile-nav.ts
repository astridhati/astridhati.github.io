function setupMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (!toggle || !menu) return;

  let menuScrollPosition = 0;

  function closeMenu() {
    const wasOpen = document.body.classList.contains("nav-open");

    menu.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Apri menu");

    if (wasOpen) {
      document.body.classList.remove("nav-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, menuScrollPosition);
    }
  }

  function openMenu() {
    menuScrollPosition = window.scrollY;
    menu.classList.add("is-open");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Chiudi menu");
    document.body.classList.add("nav-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${menuScrollPosition}px`;
    document.body.style.width = "100%";
  }

  toggle.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}

setupMobileNav();
