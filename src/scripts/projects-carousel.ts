function initProjectsCarousel() {
  const carousel = document.getElementById("projects-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".projects-carousel__track") as HTMLElement | null;
  const controls = carousel.querySelector(".projects-carousel__controls") as HTMLElement | null;
  const dotsContainer = carousel.querySelector(".projects-carousel__dots");
  const prevBtn = carousel.querySelector(".projects-carousel__arrow--prev");
  const nextBtn = carousel.querySelector(".projects-carousel__arrow--next");

  if (!track || !controls || !dotsContainer || !prevBtn || !nextBtn) return;

  const slides = [...track.querySelectorAll(".project-card")];

  if (slides.length <= 1) {
    controls.hidden = true;
    return;
  }

  controls.hidden = false;
  let currentIndex = 0;

  function goToSlide(index: number) {
    currentIndex = ((index % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, i) => {
      slide.setAttribute("aria-hidden", i !== currentIndex ? "true" : "false");
    });

    dotsContainer.querySelectorAll(".projects-carousel__dot").forEach((dot, i) => {
      const isActive = i === currentIndex;
      dot.classList.toggle("projects-carousel__dot--active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
      (dot as HTMLButtonElement).tabIndex = isActive ? 0 : -1;
    });
  }

  dotsContainer.querySelectorAll(".projects-carousel__dot").forEach((dot, i) => {
    dot.addEventListener("click", () => goToSlide(i));
  });

  prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(currentIndex + 1);
    }
  });

  goToSlide(0);
}

initProjectsCarousel();
