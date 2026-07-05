export interface SiteConfig {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  heroBackground: string;
  logo: string;
  social: Record<string, string>;
}

export interface Project {
  id: string;
  name: string;
  cover: string;
  year: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Drawing {
  title: string;
  year: string;
  description: string;
  grouped: "single" | "multiple";
  project?: string;
  image?: string;
  group?: string;
  cover?: string;
  images?: string[];
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

export function getEntryImages(entry: Drawing): string[] {
  if (entry.grouped === "multiple" && entry.images) {
    return entry.images;
  }
  return entry.image ? [entry.image] : [];
}

export function isUnassignedDrawing(drawing: Drawing): boolean {
  return !drawing.project;
}
