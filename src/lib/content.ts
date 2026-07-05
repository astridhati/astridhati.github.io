import siteData from "../../content/site.json";
import type { Drawing, Project, SiteConfig } from "./types";

const projectModules = import.meta.glob<Project>(
  "../../content/projects/*.json",
  { eager: true, import: "default" },
);

const drawingModules = import.meta.glob<Drawing>(
  "../../content/drawings/*.json",
  { eager: true, import: "default" },
);

export function getSite(): SiteConfig {
  return siteData as SiteConfig;
}

function normalizeRelationIds(items: unknown[] | undefined): string[] {
  if (!items?.length) return [];

  return items
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const value = Object.values(item as Record<string, string>)[0];
        return typeof value === "string" ? value : "";
      }
      return "";
    })
    .filter(Boolean);
}

export function getProjects(): Project[] {
  return Object.values(projectModules)
    .sort((a, b) => a.name.localeCompare(b.name, "it"));
}

export function getProject(id: string): Project | undefined {
  return getProjects().find((project) => project.id === id);
}

export function getDrawings(): Drawing[] {
  return Object.values(drawingModules);
}

export function getDrawingsByProject(projectId: string): Drawing[] {
  return getDrawings().filter((drawing) => drawing.project === projectId);
}

export function getUnassignedDrawings(): Drawing[] {
  return getDrawings().filter((drawing) => !drawing.project);
}

export function getGalleryDrawings(): Drawing[] {
  return getDrawings().sort((a, b) => {
    const aUnassigned = !a.project;
    const bUnassigned = !b.project;
    if (aUnassigned !== bUnassigned) return aUnassigned ? -1 : 1;
    return a.title.localeCompare(b.title, "it");
  });
}

export function getDrawing(id: string): Drawing | undefined {
  return getDrawings().find((drawing) => drawing.id === id);
}

export function getFeaturedProjects(site: SiteConfig): Project[] {
  const ids = normalizeRelationIds(site.homepage?.featuredProjects);
  return ids
    .map((id) => getProject(id))
    .filter((project): project is Project => project !== undefined);
}

export function getFeaturedDrawings(site: SiteConfig): Drawing[] {
  const ids = normalizeRelationIds(site.homepage?.featuredDrawings);
  return ids
    .map((id) => getDrawing(id))
    .filter((drawing): drawing is Drawing => drawing !== undefined);
}

export function getProjectIds(): string[] {
  return getProjects().map((project) => project.id);
}
