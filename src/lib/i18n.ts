import type { Locale, SiteConfig } from "./types";
import { t } from "./types";

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "it";
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en" || pathname === "/en/") return "/";
  if (pathname.startsWith("/en/")) {
    const rest = pathname.slice(3);
    return rest.endsWith("/") ? rest : `${rest}/`;
  }
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  if (locale === "en") {
    return withSlash === "/" ? "/en/" : `/en${withSlash}`;
  }
  return withSlash;
}

export function switchLocalePath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  const path = stripLocalePrefix(pathname);
  return localizedPath(path, locale === "it" ? "en" : "it");
}

export const navRoutes = {
  about: "/chi-sono/",
  projects: "/progetti/",
  gallery: "/galleria/",
  contact: "/contatti/",
} as const;

export type NavKey = keyof typeof navRoutes;

export const ui = {
  it: {
    nav: {
      about: "Chi sono",
      projects: "Progetti",
      gallery: "Galleria",
      contact: "Contatti",
      aria: "Navigazione principale",
      social: "Social e contatti",
    },
    lang: {
      label: "Cambia lingua",
    },
    hero: { aria: "Introduzione" },
    home: {
      projects: "Progetti",
      seeAllProjects: "Vedi tutti i progetti",
      featured: "In evidenza",
      commissions: "Commissioni",
      commissionsIntro: "Per commissioni o collaborazioni, scrivimi.",
      contactMe: "Contattami",
    },
    about: {
      title: "Chi sono",
      pageTitle: (name: string) => `Chi sono — ${name}`,
    },
    contact: {
      title: "Contatti",
      pageTitle: (name: string) => `Contatti — ${name}`,
      pageDescription: (name: string) =>
        `Contatta ${name} per commissioni, collaborazioni e progetti illustrativi.`,
      intro: "Per commissioni o collaborazioni, scrivimi.",
      email: "Scrivimi un'email",
      social: "Social",
    },
    projects: {
      title: "Progetti",
      pageTitle: (name: string) => `Progetti — ${name}`,
      pageDescription: (name: string) =>
        `Scopri i progetti illustrativi di ${name}: fumetti, cover, attivismo e altro.`,
      empty: "Nessun progetto al momento.",
      works: "Opere",
      breadcrumb: "Progetti",
      openProject: (name: string) => `Apri progetto ${name}`,
    },
    gallery: {
      title: "Galleria",
      pageTitle: (name: string) => `Galleria — ${name}`,
      pageDescription: (name: string) =>
        `Galleria di illustrazioni e disegni di ${name}. Altri lavori e opere non assegnate a un progetto.`,
      intro: "Altri lavori — opere singole e collezioni non assegnate a un progetto.",
      empty: "Nessun lavoro al momento.",
      emptyProject: "Nessun disegno in questo progetto.",
      openItem: (title: string) => `Apri ${title}`,
      openGroup: (title: string) => `Apri gruppo ${title}`,
    },
    carousel: {
      label: "Progetti",
      prev: "Progetto precedente",
      next: "Progetto successivo",
      select: "Seleziona progetto",
    },
    lightbox: {
      close: "Chiudi",
      prev: "Immagine precedente",
      next: "Immagine successiva",
      dots: "Immagini del gruppo",
      imageOf: (n: number, total: number) => `Immagine ${n} di ${total}`,
    },
    mobileNav: {
      open: "Apri menu",
      close: "Chiudi menu",
    },
    logoHome: (name: string) => `${name} — torna all'inizio`,
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      gallery: "Gallery",
      contact: "Contact",
      aria: "Main navigation",
      social: "Social and contact",
    },
    lang: {
      label: "Change language",
    },
    hero: { aria: "Introduction" },
    home: {
      projects: "Projects",
      seeAllProjects: "View all projects",
      featured: "Featured",
      commissions: "Commissions",
      commissionsIntro: "For commissions or collaborations, get in touch.",
      contactMe: "Contact me",
    },
    about: {
      title: "About",
      pageTitle: (name: string) => `About — ${name}`,
    },
    contact: {
      title: "Contact",
      pageTitle: (name: string) => `Contact — ${name}`,
      pageDescription: (name: string) =>
        `Contact ${name} for commissions, collaborations, and illustration projects.`,
      intro: "For commissions or collaborations, get in touch.",
      email: "Send me an email",
      social: "Social",
    },
    projects: {
      title: "Projects",
      pageTitle: (name: string) => `Projects — ${name}`,
      pageDescription: (name: string) =>
        `Explore illustration projects by ${name}: comics, book covers, activism, and more.`,
      empty: "No projects yet.",
      works: "Works",
      breadcrumb: "Projects",
      openProject: (name: string) => `Open project ${name}`,
    },
    gallery: {
      title: "Gallery",
      pageTitle: (name: string) => `Gallery — ${name}`,
      pageDescription: (name: string) =>
        `Gallery of illustrations and drawings by ${name}. Other works not assigned to a project.`,
      intro: "Other works — single pieces and collections not assigned to a project.",
      empty: "No works yet.",
      emptyProject: "No drawings in this project.",
      openItem: (title: string) => `Open ${title}`,
      openGroup: (title: string) => `Open group ${title}`,
    },
    carousel: {
      label: "Projects",
      prev: "Previous project",
      next: "Next project",
      select: "Select project",
    },
    lightbox: {
      close: "Close",
      prev: "Previous image",
      next: "Next image",
      dots: "Group images",
      imageOf: (n: number, total: number) => `Image ${n} of ${total}`,
    },
    mobileNav: {
      open: "Open menu",
      close: "Close menu",
    },
    logoHome: (name: string) => `${name} — back to home`,
  },
} as const;

export type UiStrings = (typeof ui)["it"];

export function getUi(locale: Locale): UiStrings {
  return ui[locale];
}

export function siteTagline(site: SiteConfig, locale: Locale): string {
  return t(site.tagline, site.tagline_en, locale);
}

export function siteBio(site: SiteConfig, locale: Locale): string {
  return t(site.bio, site.bio_en, locale);
}

export function homeTitle(site: SiteConfig, locale: Locale): string {
  return `${site.name} — ${siteTagline(site, locale)}`;
}
