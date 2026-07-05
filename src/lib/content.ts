import identity from "../../content/site/identity.json";
import header from "../../content/site/header.json";
import home from "../../content/site/home.json";
import pagesGallery from "../../content/site/pages-gallery.json";
import pagesContact from "../../content/site/pages-contact.json";
import pagesCategories from "../../content/site/pages-categories.json";
import footer from "../../content/site/footer.json";
import type { Category, Drawing, SiteConfig } from "./types";
import { drawingCategoryId } from "./types";

const site: SiteConfig = {
  identity,
  header,
  home,
  pages: {
    gallery: pagesGallery,
    contact: pagesContact,
    categories: pagesCategories,
  },
  footer,
};

const categoryModules = import.meta.glob<Category>(
  "../../content/categories/*.json",
  { eager: true, import: "default" },
);

const drawingModules = import.meta.glob<Drawing>(
  "../../content/drawings/*.json",
  { eager: true, import: "default" },
);

export function getSite(): SiteConfig {
  return site;
}

export function getCategories(): Category[] {
  return Object.values(categoryModules).sort((a, b) =>
    a.name.localeCompare(b.name, "it"),
  );
}

export function getCategory(id: string): Category | undefined {
  return getCategories().find((category) => category.id === id);
}

export function getDrawings(): Drawing[] {
  return Object.values(drawingModules);
}

export function getDrawingsByCategory(categoryId: string): Drawing[] {
  return getDrawings().filter(
    (drawing) => drawingCategoryId(drawing) === categoryId,
  );
}

export function getUnassignedDrawings(): Drawing[] {
  return getDrawings().filter((drawing) => !drawingCategoryId(drawing));
}

export function getGalleryDrawings(categoryId?: string): Drawing[] {
  const drawings = categoryId
    ? getDrawingsByCategory(categoryId)
    : getDrawings();

  return drawings.sort((a, b) => {
    if (!categoryId) {
      const aUnassigned = !drawingCategoryId(a);
      const bUnassigned = !drawingCategoryId(b);
      if (aUnassigned !== bUnassigned) return aUnassigned ? -1 : 1;
    }
    return a.title.localeCompare(b.title, "it");
  });
}

export function getDrawing(id: string): Drawing | undefined {
  return getDrawings().find((drawing) => drawing.id === id);
}

export function getGroupDrawings(): Drawing[] {
  return getDrawings().filter((drawing) => drawing.grouped === "multiple");
}

export function getGroupDrawingIds(): string[] {
  return getGroupDrawings().map((drawing) => drawing.id);
}

export function getCategoryIds(): string[] {
  return getCategories().map((category) => category.id);
}
