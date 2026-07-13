interface LightboxEntry {
  title: string;
  description: string;
  year: string;
  images: string[];
  startIndex?: number;
  hideCaption?: boolean;
}

let lightboxImages: string[] = [];
let lightboxIndex = 0;
let lightboxEntry: LightboxEntry | null = null;
let previousFocus: HTMLElement | null = null;
let lightboxHasCaption = false;
let lightboxScrollPosition = 0;

function lockPageScroll() {
  lightboxScrollPosition = window.scrollY;
  document.documentElement.classList.add("lightbox-open");
  document.body.classList.add("lightbox-open");
  document.body.style.position = "fixed";
  document.body.style.top = `-${lightboxScrollPosition}px`;
  document.body.style.width = "100%";
}

function unlockPageScroll() {
  document.documentElement.classList.remove("lightbox-open");
  document.body.classList.remove("lightbox-open");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, lightboxScrollPosition);
}

function usesFlipCard(): boolean {
  return lightboxHasCaption;
}

function isLightboxFlipBlocked(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return true;
  return Boolean(
    target.closest(".lightbox-close, .lightbox-nav, .lightbox-dot"),
  );
}

function isLightboxFlipped(): boolean {
  return document.getElementById("lightbox-flip-inner")?.classList.contains("is-flipped") ?? false;
}

function toggleLightboxFlip() {
  if (!usesFlipCard()) return;
  setLightboxFlipped(!isLightboxFlipped());
}

function lightboxImageLabel(index: number, total: number): string {
  const n = index + 1;
  if (document.documentElement.lang === "en") {
    return `Image ${n} of ${total}`;
  }
  return `Immagine ${n} di ${total}`;
}

function renderLightboxDots() {
  const dotsContainer = document.getElementById("lightbox-dots");
  if (!dotsContainer) return;

  dotsContainer.innerHTML = "";

  lightboxImages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "lightbox-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", lightboxImageLabel(index, lightboxImages.length));
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

function announceLightboxSlide() {
  const status = document.getElementById("lightbox-status");
  if (!status || lightboxImages.length === 0) return;
  status.textContent = lightboxImageLabel(lightboxIndex, lightboxImages.length);
}

function setLightboxFlipped(flipped: boolean) {
  const flipInner = document.getElementById("lightbox-flip-inner");
  const flipBack = document.getElementById("lightbox-flip-back");
  const flipToBack = document.querySelector(
    ".lightbox-flip-trigger--to-back",
  ) as HTMLButtonElement | null;

  if (!flipInner) return;

  flipInner.classList.toggle("is-flipped", flipped);
  flipBack?.setAttribute("aria-hidden", flipped ? "false" : "true");
  flipToBack?.toggleAttribute("hidden", flipped);
}

function resetLightboxFlip() {
  setLightboxFlipped(false);
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

  resetLightboxFlip();
  announceLightboxSlide();
}

function openLightbox(entry: LightboxEntry) {
  const dialog = document.getElementById("lightbox") as HTMLDialogElement | null;
  const figure = dialog?.querySelector(".lightbox-figure");
  const flipBack = document.getElementById("lightbox-flip-back");
  const flipToBack = document.querySelector(
    ".lightbox-flip-trigger--to-back",
  ) as HTMLButtonElement | null;
  const title = document.getElementById("lightbox-title");
  const description = document.getElementById("lightbox-description");
  const year = document.getElementById("lightbox-year");

  if (!dialog || !title || !description || !year) return;

  previousFocus = document.activeElement as HTMLElement | null;
  lightboxEntry = entry;
  lightboxImages = entry.images;
  renderLightboxDots();

  const hideCaption = entry.hideCaption === true;
  lightboxHasCaption = !hideCaption;
  flipBack?.toggleAttribute("hidden", hideCaption);
  flipToBack?.toggleAttribute("hidden", hideCaption);
  figure?.classList.toggle("lightbox-figure--image-only", hideCaption);

  if (hideCaption) {
    dialog.removeAttribute("aria-labelledby");
    dialog.setAttribute("aria-label", entry.description || entry.title);
  } else {
    dialog.setAttribute("aria-labelledby", "lightbox-title");
    dialog.removeAttribute("aria-label");
    title.textContent = entry.title;
    description.textContent = entry.description || "";
    description.hidden = !entry.description;
    year.textContent = entry.year || "";
    year.hidden = !entry.year;
  }

  resetLightboxFlip();
  const startIndex = entry.startIndex ?? 0;
  showLightboxSlide(startIndex);
  lockPageScroll();
  dialog.showModal();
  dialog.querySelector<HTMLElement>(".lightbox-close")?.focus();
}

function setupLightbox() {
  const dialog = document.getElementById("lightbox") as HTMLDialogElement | null;
  if (!dialog) return;

  const closeBtn = dialog.querySelector(".lightbox-close");
  const prevBtn = dialog.querySelector(".lightbox-nav--prev");
  const nextBtn = dialog.querySelector(".lightbox-nav--next");
  const figure = dialog.querySelector(".lightbox-figure") as HTMLElement | null;

  closeBtn?.addEventListener("click", () => dialog.close());
  prevBtn?.addEventListener("click", () => showLightboxSlide(lightboxIndex - 1));
  nextBtn?.addEventListener("click", () => showLightboxSlide(lightboxIndex + 1));

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
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

  dialog.addEventListener("close", () => {
    unlockPageScroll();
    resetLightboxFlip();
    previousFocus?.focus();
    previousFocus = null;
  });

  if (figure) {
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerMoved = false;
    let activePointerId: number | null = null;

    figure.addEventListener("pointerdown", (event) => {
      if (isLightboxFlipBlocked(event.target)) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      activePointerId = event.pointerId;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      pointerMoved = false;
      figure.setPointerCapture(event.pointerId);
    });

    figure.addEventListener("pointermove", (event) => {
      if (event.pointerId !== activePointerId) return;

      const deltaX = Math.abs(event.clientX - pointerStartX);
      const deltaY = Math.abs(event.clientY - pointerStartY);
      if (deltaX > 8 || deltaY > 8) {
        pointerMoved = true;
      }
    });

    figure.addEventListener("pointerup", (event) => {
      if (event.pointerId !== activePointerId) return;

      if (figure.hasPointerCapture(event.pointerId)) {
        figure.releasePointerCapture(event.pointerId);
      }

      activePointerId = null;

      if (isLightboxFlipBlocked(event.target)) return;

      const deltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;

      if (usesFlipCard() && !pointerMoved && Math.abs(deltaX) < 12 && Math.abs(deltaY) < 12) {
        toggleLightboxFlip();
        return;
      }

      if (isLightboxFlipped() || lightboxImages.length <= 1) return;
      if (Math.abs(deltaX) < 50 || Math.abs(deltaY) > Math.abs(deltaX)) return;

      if (deltaX > 0) {
        showLightboxSlide(lightboxIndex - 1);
      } else {
        showLightboxSlide(lightboxIndex + 1);
      }
    });

    figure.addEventListener("pointercancel", (event) => {
      if (event.pointerId !== activePointerId) return;

      if (figure.hasPointerCapture(event.pointerId)) {
        figure.releasePointerCapture(event.pointerId);
      }

      activePointerId = null;
    });
  }

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
