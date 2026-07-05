interface LightboxEntry {
  title: string;
  description: string;
  year: string;
  images: string[];
}

let lightboxImages: string[] = [];
let lightboxIndex = 0;
let lightboxEntry: LightboxEntry | null = null;

function renderLightboxDots() {
  const dotsContainer = document.getElementById("lightbox-dots");
  if (!dotsContainer) return;

  dotsContainer.innerHTML = "";

  lightboxImages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "lightbox-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Immagine ${index + 1} di ${lightboxImages.length}`);
    dot.addEventListener("click", () => showLightboxSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function updateLightboxDots() {
  document.querySelectorAll(".lightbox-dot").forEach((dot, index) => {
    const isActive = index === lightboxIndex;
    dot.classList.toggle("lightbox-dot--active", isActive);
    dot.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}

function showLightboxSlide(index: number) {
  const image = document.getElementById("lightbox-image") as HTMLImageElement | null;
  const dotsContainer = document.getElementById("lightbox-dots");
  const prevBtn = document.querySelector(".lightbox-nav--prev") as HTMLButtonElement | null;
  const nextBtn = document.querySelector(".lightbox-nav--next") as HTMLButtonElement | null;

  if (!image || !lightboxEntry) return;

  lightboxIndex =
    ((index % lightboxImages.length) + lightboxImages.length) % lightboxImages.length;

  image.src = lightboxImages[lightboxIndex];
  image.alt = lightboxEntry.description || lightboxEntry.title;

  const hasMultiple = lightboxImages.length > 1;
  if (prevBtn) prevBtn.hidden = !hasMultiple;
  if (nextBtn) nextBtn.hidden = !hasMultiple;
  if (dotsContainer) dotsContainer.hidden = !hasMultiple;

  if (hasMultiple) {
    updateLightboxDots();
  }
}

function openLightbox(entry: LightboxEntry) {
  const dialog = document.getElementById("lightbox") as HTMLDialogElement | null;
  const title = document.getElementById("lightbox-title");
  const description = document.getElementById("lightbox-description");
  const year = document.getElementById("lightbox-year");

  if (!dialog || !title || !description || !year) return;

  lightboxEntry = entry;
  lightboxImages = entry.images;
  renderLightboxDots();

  title.textContent = entry.title;
  description.textContent = entry.description || "";
  description.hidden = !entry.description;
  year.textContent = entry.year || "";
  year.hidden = !entry.year;

  showLightboxSlide(0);
  dialog.showModal();
}

function setupLightbox() {
  const dialog = document.getElementById("lightbox") as HTMLDialogElement | null;
  if (!dialog) return;

  const closeBtn = dialog.querySelector(".lightbox-close");
  const prevBtn = dialog.querySelector(".lightbox-nav--prev");
  const nextBtn = dialog.querySelector(".lightbox-nav--next");

  closeBtn?.addEventListener("click", () => dialog.close());
  prevBtn?.addEventListener("click", () => showLightboxSlide(lightboxIndex - 1));
  nextBtn?.addEventListener("click", () => showLightboxSlide(lightboxIndex + 1));

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const mouseEvent = event as MouseEvent;
    const clickedOutside =
      mouseEvent.clientX < rect.left ||
      mouseEvent.clientX > rect.right ||
      mouseEvent.clientY < rect.top ||
      mouseEvent.clientY > rect.bottom;

    if (clickedOutside) {
      dialog.close();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (lightboxImages.length > 1) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showLightboxSlide(lightboxIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showLightboxSlide(lightboxIndex + 1);
      }
    }
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    dialog.close();
  });

  document.querySelectorAll("[data-lightbox]").forEach((element) => {
    element.addEventListener("click", () => {
      const raw = element.getAttribute("data-lightbox");
      if (!raw) return;
      try {
        openLightbox(JSON.parse(raw) as LightboxEntry);
      } catch {
        /* ignore malformed data */
      }
    });
  });
}

setupLightbox();
