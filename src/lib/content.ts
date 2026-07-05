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

export function getProjectIds(): string[] {
  return getProjects().map((project) => project.id);
}
