export interface SiteConfig {
  name: string;
  tagline: string;
  tagline_en?: string;
  bio: string;
  bio_en?: string;
  welcome: string;
  welcome_en?: string;
  email: string;
  heroBackground: string;
  logo: string;
  instagramIcon?: string;
  social: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  name_en?: string;
  cover: string;
  year: string;
  description: string;
  description_en?: string;
  seoTitle?: string;
  seoTitle_en?: string;
  seoDescription?: string;
  seoDescription_en?: string;
}

export interface Drawing {
  id: string;
  title: string;
  title_en?: string;
  year: string;
  description: string;
  description_en?: string;
  grouped: "single" | "multiple";
  category?: string;
  /** @deprecated CMS legacy field */
  project?: string;
  image?: string;
  cover?: string;
  images?: string[];
}

export type Locale = "it" | "en";

/** Pick localized text; falls back to Italian when English is empty. */
export function t(it: string, en?: string, locale: Locale = "it"): string {
  if (locale === "en" && en?.trim()) return en.trim();
  return it;
}

export function assetPath(path: string): string {
  if (!path) return "";
  return path.startsWith("/") ? path : `/${path}`;
}

export function getEntryThumbnail(entry: Drawing): string {
  if (entry.grouped === "multiple" && entry.images?.length) {
    return entry.cover || entry.images[0];
  }
  return entry.image || "";
}

export function drawingCategoryId(drawing: Drawing): string | undefined {
  return drawing.category ?? drawing.project;
}

export function isUnassignedDrawing(drawing: Drawing): boolean {
  return !drawingCategoryId(drawing);
}

export function drawingTitle(drawing: Drawing, locale: Locale = "it"): string {
  return t(drawing.title, drawing.title_en, locale);
}

export function drawingDescription(drawing: Drawing, locale: Locale = "it"): string {
  return t(drawing.description ?? "", drawing.description_en, locale);
}

export function drawingSeoTitle(drawing: Drawing, siteName: string, locale: Locale = "it"): string {
  return `${drawingTitle(drawing, locale)} — ${siteName}`;
}

export function drawingSeoDescription(drawing: Drawing, siteName: string, locale: Locale = "it"): string {
  const desc = drawingDescription(drawing, locale);
  if (desc) return desc;
  return locale === "en"
    ? `${drawingTitle(drawing, locale)} — illustration by ${siteName}.`
    : `${drawingTitle(drawing, locale)} — illustrazione di ${siteName}.`;
}

export function categoryName(category: Category, locale: Locale = "it"): string {
  return t(category.name, category.name_en, locale);
}

export function categoryDescription(category: Category, locale: Locale = "it"): string {
  return t(category.description ?? "", category.description_en, locale);
}

export function categorySeoTitle(
  category: Category,
  siteName: string,
  locale: Locale = "it",
): string {
  const custom =
    locale === "en"
      ? category.seoTitle_en ?? category.seoTitle
      : category.seoTitle;
  if (custom?.trim()) return custom.trim();
  return `${categoryName(category, locale)} — ${siteName}`;
}

export function categorySeoDescription(
  category: Category,
  siteName: string,
  locale: Locale = "it",
): string {
  const custom =
    locale === "en"
      ? category.seoDescription_en ?? category.seoDescription
      : category.seoDescription;
  if (custom?.trim()) return custom.trim();
  const desc = categoryDescription(category, locale);
  if (desc) return desc;
  return locale === "en"
    ? `${categoryName(category, locale)} — illustration category by ${siteName}.`
    : `Categoria ${categoryName(category, locale)} di ${siteName}.`;
}
