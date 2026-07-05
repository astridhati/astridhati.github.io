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

export function categoryPath(categoryId: string, locale: Locale): string {
  return localizedPath(`/categorie/${categoryId}/`, locale);
}

export function drawingGroupPath(drawingId: string, locale: Locale): string {
  return localizedPath(`/galleria/${drawingId}/`, locale);
}

export function switchLocalePath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  const path = stripLocalePrefix(pathname);
  return localizedPath(path, locale === "it" ? "en" : "it");
}

export const navRoutes = {
  about: "/chi-sono/",
  categories: "/categorie/",
  gallery: "/galleria/",
  contact: "/contatti/",
} as const;

export type NavKey = keyof typeof navRoutes;

export const ui = {
  it: {
    nav: {
      about: "Chi sono",
      categories: "Categorie",
      categoriesMenu: "Categorie opere",
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
      emailAtPrefix: "Puoi contattarmi a questo indirizzo email:",
      social: "Social",
    },
    categories: {
      works: "Opere",
      empty: "Nessun disegno in questa categoria.",
    },
    gallery: {
      title: "Galleria",
      pageTitle: (name: string) => `Galleria — ${name}`,
      pageDescription: (name: string) =>
        `Galleria completa di illustrazioni e disegni di ${name}, per categoria e altri lavori.`,
      intro: "Tutte le opere — altri lavori e disegni per categoria.",
      empty: "Nessun lavoro al momento.",
      emptyCategory: "Nessun disegno in questa categoria.",
      openItem: (title: string) => `Apri ${title}`,
      openGroup: (title: string) => `Vedi gruppo ${title}`,
      viewGroup: (title: string) => `Vedi gruppo ${title}`,
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
      categories: "Categories",
      categoriesMenu: "Work categories",
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
      emailAtPrefix: "You can contact me at this email address:",
      social: "Social",
    },
    categories: {
      works: "Works",
      empty: "No drawings in this category.",
    },
    gallery: {
      title: "Gallery",
      pageTitle: (name: string) => `Gallery — ${name}`,
      pageDescription: (name: string) =>
        `Full gallery of illustrations and drawings by ${name}, by category and standalone works.`,
      intro: "All works — standalone pieces and drawings by category.",
      empty: "No works yet.",
      emptyCategory: "No drawings in this category.",
      openItem: (title: string) => `Open ${title}`,
      openGroup: (title: string) => `Open group ${title}`,
      viewGroup: (title: string) => `View group ${title}`,
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

export function siteWelcome(site: SiteConfig, locale: Locale): string {
  return t(site.welcome, site.welcome_en, locale);
}

export function homeTitle(site: SiteConfig, locale: Locale): string {
  return `${site.name} — ${siteTagline(site, locale)}`;
}
