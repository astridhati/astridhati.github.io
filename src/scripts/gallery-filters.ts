function setupGalleryFilters() {
  const root = document.querySelector("[data-gallery-browser]");
  if (!root) return;

  const filters = root.querySelector(".gallery-filters");
  const grid = root.querySelector(".gallery-grid");
  if (!filters || !grid) return;

  const items = grid.querySelectorAll<HTMLElement>(".gallery-item");
  const chips = filters.querySelectorAll<HTMLButtonElement>(".filter-chip");
  const emptyFiltered = grid.querySelector<HTMLElement>(".gallery-empty--filtered");

  const validIds = new Set(
    Array.from(chips)
      .map((chip) => chip.dataset.filter)
      .filter((id): id is string => Boolean(id) && id !== "all"),
  );

  function getCategoryFromUrl(): string | null {
    const categoryId = new URLSearchParams(window.location.search).get("c");
    if (!categoryId || !validIds.has(categoryId)) return null;
    return categoryId;
  }

  function applyFilter(categoryId: string | null) {
    let visibleCount = 0;

    items.forEach((item) => {
      const itemCategory = item.dataset.category || "";
      const show = categoryId === null || itemCategory === categoryId;
      item.classList.toggle("gallery-item--hidden", !show);
      item.toggleAttribute("hidden", !show);
      if (show) visibleCount += 1;
    });

    chips.forEach((chip) => {
      const chipFilter = chip.dataset.filter ?? "all";
      const isActive =
        categoryId === null ? chipFilter === "all" : chipFilter === categoryId;
      chip.classList.toggle("filter-chip--active", isActive);
      chip.toggleAttribute("aria-current", isActive);
    });

    if (emptyFiltered) {
      const showEmpty = visibleCount === 0 && categoryId !== null;
      emptyFiltered.hidden = !showEmpty;
    }
  }

  function setFilter(categoryId: string | null, updateUrl = true) {
    applyFilter(categoryId);

    if (!updateUrl) return;

    const url = new URL(window.location.href);
    if (categoryId) {
      url.searchParams.set("c", categoryId);
    } else {
      url.searchParams.delete("c");
    }
    history.replaceState(null, "", url);
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter ?? "all";
      setFilter(filter === "all" ? null : filter);
    });
  });

  window.addEventListener("popstate", () => {
    setFilter(getCategoryFromUrl(), false);
  });

  setFilter(getCategoryFromUrl(), false);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupGalleryFilters, { once: true });
} else {
  setupGalleryFilters();
}
