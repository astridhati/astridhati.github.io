const SOCIAL_LABELS = {
  instagram: "Instagram",
  behance: "Behance",
  twitter: "Twitter",
  facebook: "Facebook",
  pinterest: "Pinterest",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

const SOCIAL_ICONS = {
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  behance: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 7h5.1c1.5 0 2.7 1.2 2.7 2.7 0 1.1-.7 2.1-1.7 2.5 1.3.4 2.2 1.6 2.2 3 0 1.8-1.5 3.3-3.3 3.3H6.5V7zm2.5 4.3h2.3c.6 0 1-.4 1-1s-.4-1-1-1H9v2zm0 4.4h2.6c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2H9v2.4zM17 9.5h-4.5V8H17v1.5zm-.3 6.2c0 2-1.5 3.5-3.5 3.5S9.7 17.7 9.7 15.7s1.5-3.5 3.5-3.5 3.5 1.5 3.5 3.5z"/></svg>`,
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  pinterest: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>`,
  tiktok: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.062 2.062 0 0 1 2.063-2.063 2.063 2.063 0 0 1 2.063 2.063 2.062 2.062 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
};

const EMAIL_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;

let allDrawings = [];
let allProjects = [];
let activeProjectFilter = null;

function createNavIcon(href, label, iconSvg, external = true) {
  const link = document.createElement("a");
  link.href = href;
  link.className = "nav-icon";
  link.setAttribute("aria-label", label);
  link.innerHTML = iconSvg;

  if (external) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  return link;
}

function renderNavActions(site) {
  const container = document.getElementById("nav-actions");
  container.innerHTML = "";

  if (site.social) {
    Object.entries(site.social).forEach(([platform, url]) => {
      if (!url) return;
      const label = SOCIAL_LABELS[platform] || platform;
      const icon = SOCIAL_ICONS[platform];
      if (!icon) return;
      container.appendChild(createNavIcon(url, label, icon));
    });
  }

  if (site.email) {
    container.appendChild(
      createNavIcon(`mailto:${site.email}`, "Invia un'email", EMAIL_ICON, false)
    );
  }
}

function setEmailLinks(email) {
  const contactEmail = document.getElementById("contact-email");

  if (!email) {
    contactEmail.hidden = true;
    return;
  }

  const mailto = `mailto:${email}`;
  contactEmail.href = mailto;
  contactEmail.hidden = false;
}

async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

function setHeroBackground(imagePath) {
  const hero = document.getElementById("hero");

  if (imagePath) {
    hero.style.backgroundImage = `url("${imagePath}")`;
    hero.classList.add("hero--has-background");
  } else {
    hero.style.backgroundImage = "";
    hero.classList.remove("hero--has-background");
  }
}

function renderSite(site) {
  document.title = `${site.name} — Portfolio`;
  document.getElementById("about-bio").textContent = site.bio;

  const logoLink = document.getElementById("nav-logo");
  const logoImage = document.getElementById("nav-logo-image");

  if (site.logo) {
    logoImage.src = site.logo;
    logoImage.alt = site.name;
    logoLink.setAttribute("aria-label", `${site.name} — torna all'inizio`);
  } else {
    logoLink.hidden = true;
  }

  setHeroBackground(site.heroBackground);

  renderNavActions(site);
  setEmailLinks(site.email);

  document.getElementById("footer-name").textContent = site.name;
  document.getElementById("footer-year").textContent = new Date().getFullYear();
}

function createCardItem({ image, title, year, ariaLabel, onClick, alt, lazy = true }) {
  const button = document.createElement("button");
  button.className = "gallery-item";
  button.type = "button";
  button.setAttribute("role", "listitem");
  button.setAttribute("aria-label", ariaLabel);

  const img = document.createElement("img");
  img.className = "gallery-item-image";
  img.src = image;
  img.alt = alt || title;
  if (lazy) img.loading = "lazy";

  const info = document.createElement("div");
  info.className = "gallery-item-info";

  const titleEl = document.createElement("h3");
  titleEl.className = "gallery-item-title";
  titleEl.textContent = title;

  const yearEl = document.createElement("p");
  yearEl.className = "gallery-item-year";
  yearEl.textContent = year || "";

  info.append(titleEl, yearEl);
  button.append(img, info);
  button.addEventListener("click", onClick);

  return button;
}

function isUnassignedDrawing(drawing) {
  return !drawing.project;
}

function getFilteredDrawings() {
  if (activeProjectFilter) {
    return allDrawings.filter((drawing) => drawing.project === activeProjectFilter);
  }

  return allDrawings.filter(isUnassignedDrawing);
}

function updateFilterChips() {
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    const chipProject = chip.dataset.project || null;
    const isActive =
      chipProject === (activeProjectFilter || "") ||
      (!chipProject && !activeProjectFilter);

    chip.classList.toggle("filter-chip--active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });
}

function setActiveProject(projectId, { scrollToGallery = false } = {}) {
  activeProjectFilter = projectId;
  updateFilterChips();
  renderGallery();

  if (scrollToGallery) {
    document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
  }
}

function createProjectCard(project) {
  const button = document.createElement("button");
  button.className = "project-card";
  button.type = "button";
  button.setAttribute("role", "listitem");
  button.setAttribute("aria-label", `Apri progetto ${project.name}`);

  const img = document.createElement("img");
  img.className = "project-card-image";
  img.src = project.cover;
  img.alt = project.name;
  img.loading = "lazy";

  const body = document.createElement("div");
  body.className = "project-card-body";

  const title = document.createElement("h3");
  title.className = "project-card-title";
  title.textContent = project.name;

  const year = document.createElement("p");
  year.className = "project-card-year";
  year.textContent = project.year || "";

  const description = document.createElement("p");
  description.className = "project-card-description";
  description.textContent = project.description || "";

  body.append(title, year, description);
  button.append(img, body);
  button.addEventListener("click", () =>
    setActiveProject(project.id, { scrollToGallery: true })
  );

  return button;
}

function initProjectsCarousel(projects) {
  const carousel = document.getElementById("projects-carousel");
  const track = document.getElementById("projects-grid");
  const controls = carousel.querySelector(".projects-carousel__controls");
  const dotsContainer = carousel.querySelector(".projects-carousel__dots");
  const prevBtn = carousel.querySelector(".projects-carousel__arrow--prev");
  const nextBtn = carousel.querySelector(".projects-carousel__arrow--next");
  const slides = [...track.querySelectorAll(".project-card")];

  if (slides.length <= 1) {
    controls.hidden = true;
    return;
  }

  controls.hidden = false;
  dotsContainer.innerHTML = "";

  let currentIndex = 0;

  function goToSlide(index) {
    currentIndex = ((index % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, i) => {
      slide.setAttribute("aria-hidden", i !== currentIndex ? "true" : "false");
    });

    dotsContainer.querySelectorAll(".projects-carousel__dot").forEach((dot, i) => {
      const isActive = i === currentIndex;
      dot.classList.toggle("projects-carousel__dot--active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
      dot.tabIndex = isActive ? 0 : -1;
    });
  }

  projects.forEach((project, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "projects-carousel__dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", project.name);
    dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
    dot.tabIndex = i === 0 ? 0 : -1;
    if (i === 0) dot.classList.add("projects-carousel__dot--active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  prevBtn.onclick = () => goToSlide(currentIndex - 1);
  nextBtn.onclick = () => goToSlide(currentIndex + 1);

  carousel.onkeydown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(currentIndex + 1);
    }
  };

  goToSlide(0);
}

function renderProjects(projects) {
  const carousel = document.getElementById("projects-carousel");
  const track = document.getElementById("projects-grid");
  const controls = carousel.querySelector(".projects-carousel__controls");
  const dotsContainer = carousel.querySelector(".projects-carousel__dots");

  track.innerHTML = "";
  track.style.transform = "";
  dotsContainer.innerHTML = "";
  controls.hidden = true;
  carousel.onkeydown = null;

  if (!projects.length) {
    const empty = document.createElement("p");
    empty.className = "gallery-empty";
    empty.textContent = "Nessun progetto al momento.";
    track.appendChild(empty);
    return;
  }

  projects.forEach((project) => {
    track.appendChild(createProjectCard(project));
  });

  initProjectsCarousel(projects);
}

function renderGalleryFilters(projects) {
  const container = document.getElementById("gallery-filters");
  container.innerHTML = "";

  const defaultChip = document.createElement("button");
  defaultChip.type = "button";
  defaultChip.className = "filter-chip filter-chip--active";
  defaultChip.textContent = "Altri lavori";
  defaultChip.setAttribute("aria-pressed", "true");
  defaultChip.addEventListener("click", () => {
    if (!activeProjectFilter) return;
    setActiveProject(null);
  });
  container.appendChild(defaultChip);

  projects.forEach((project) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "filter-chip";
    chip.dataset.project = project.id;
    chip.textContent = project.name;
    chip.setAttribute("aria-pressed", "false");
    chip.addEventListener("click", () => {
      if (activeProjectFilter === project.id) {
        setActiveProject(null);
        return;
      }
      setActiveProject(project.id);
    });
    container.appendChild(chip);
  });
}

function createGalleryItem(drawing, index) {
  return createCardItem({
    image: drawing.image,
    title: drawing.title,
    year: drawing.year,
    alt: drawing.description || drawing.title,
    ariaLabel: `Apri ${drawing.title}`,
    lazy: index >= 3,
    onClick: () => openLightbox(drawing),
  });
}

function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  const filtered = getFilteredDrawings();
  grid.innerHTML = "";

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "gallery-empty";
    empty.textContent = activeProjectFilter
      ? "Nessun disegno in questo progetto."
      : "Nessun lavoro singolo al momento.";
    grid.appendChild(empty);
    return;
  }

  filtered.forEach((drawing, index) => {
    grid.appendChild(createGalleryItem(drawing, index));
  });
}

function openLightbox(drawing) {
  const dialog = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-image");
  const title = document.getElementById("lightbox-title");
  const description = document.getElementById("lightbox-description");
  const year = document.getElementById("lightbox-year");

  image.src = drawing.image;
  image.alt = drawing.description || drawing.title;
  title.textContent = drawing.title;
  description.textContent = drawing.description || "";
  description.hidden = !drawing.description;
  year.textContent = drawing.year || "";
  year.hidden = !drawing.year;

  dialog.showModal();
}

function setupLightbox() {
  const dialog = document.getElementById("lightbox");
  const closeBtn = dialog.querySelector(".lightbox-close");

  closeBtn.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) {
      dialog.close();
    }
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    dialog.close();
  });
}

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

async function init() {
  try {
    const [site, drawings, projects] = await Promise.all([
      loadJSON("content/site.json"),
      loadJSON("content/drawings.json"),
      loadJSON("content/projects.json"),
    ]);

    allDrawings = drawings;
    allProjects = projects;

    renderSite(site);
    renderProjects(projects);
    renderGalleryFilters(projects);
    renderGallery();
    setupLightbox();
    setupMobileNav();
  } catch (error) {
    console.error("Errore nel caricamento del sito:", error);
    document.getElementById("gallery-grid").innerHTML =
      '<p class="gallery-empty">Impossibile caricare i contenuti. Verifica che i file JSON siano presenti.</p>';
  }
}

init();
