export interface SiteConfig {
  name: string;
  tagline: string;
  tagline_en?: string;
  bio: string;
  bio_en?: string;
  email: string;
  heroBackground: string;
  logo: string;
  instagramIcon?: string;
  social: Record<string, string>;
  homepage?: {
    featuredProjects?: string[];
    featuredDrawings?: string[];
  };
}

export interface Project {
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

export function isUnassignedDrawing(drawing: Drawing): boolean {
  return !drawing.project;
}

export function drawingTitle(drawing: Drawing, locale: Locale = "it"): string {
  return t(drawing.title, drawing.title_en, locale);
}

export function drawingDescription(drawing: Drawing, locale: Locale = "it"): string {
  return t(drawing.description ?? "", drawing.description_en, locale);
}

export function projectName(project: Project, locale: Locale = "it"): string {
  return t(project.name, project.name_en, locale);
}

export function projectDescription(project: Project, locale: Locale = "it"): string {
  return t(project.description ?? "", project.description_en, locale);
}

export function projectSeoTitle(project: Project, siteName: string, locale: Locale = "it"): string {
  const custom =
    locale === "en"
      ? project.seoTitle_en ?? project.seoTitle
      : project.seoTitle;
  if (custom?.trim()) return custom.trim();
  return `${projectName(project, locale)} — ${siteName}`;
}

export function projectSeoDescription(project: Project, siteName: string, locale: Locale = "it"): string {
  const custom =
    locale === "en"
      ? project.seoDescription_en ?? project.seoDescription
      : project.seoDescription;
  if (custom?.trim()) return custom.trim();
  const desc = projectDescription(project, locale);
  if (desc) return desc;
  return locale === "en"
    ? `${projectName(project, locale)} — illustration project by ${siteName}.`
    : `Progetto ${projectName(project, locale)} di ${siteName}.`;
}
