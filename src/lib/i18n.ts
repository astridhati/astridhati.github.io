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

/** UI strings that stay in code (accessibility, templates). */
export const ui = {
  it: {
    nav: {
      aria: "Navigazione principale",
      categoriesMenu: "Categorie opere",
      categoriesEmpty: "Nessuna categoria al momento",
    },
    lang: {
      label: "Cambia lingua",
    },
    hero: { aria: "Introduzione" },
    gallery: {
      openItem: (title: string) => `Apri ${title}`,
      viewGroup: (title: string) => `Vedi gruppo ${title}`,
      pageTitle: (name: string, pageTitle: string) => `${pageTitle} — ${name}`,
      pageDescription: (name: string) =>
        `Galleria completa di illustrazioni e disegni di ${name}, per categoria e altri lavori.`,
    },
    about: {
      pageTitle: (name: string, pageTitle: string) => `${pageTitle} — ${name}`,
    },
    contact: {
      pageTitle: (name: string, pageTitle: string) => `${pageTitle} — ${name}`,
      pageDescription: (name: string) =>
        `Contatta ${name} per commissioni, collaborazioni e progetti illustrativi.`,
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
    skipToContent: "Vai al contenuto principale",
    footer: {
      social: "Reti sociali",
      rightsReserved: "Tutti i diritti riservati",
    },
    social: {
      instagram: "Instagram",
      behance: "Behance",
      twitter: "Twitter",
      facebook: "Facebook",
      pinterest: "Pinterest",
      tiktok: "TikTok",
      linkedin: "LinkedIn",
      youtube: "YouTube",
      email: "Invia un'email",
    },
    notFound: {
      title: "Pagina non trovata",
      description: "La pagina che stai cercando non esiste o è stata spostata.",
      heading: "Pagina non trovata",
      message: "La pagina che stai cercando non esiste o è stata spostata.",
      home: "Torna alla home",
    },
    logoHome: (name: string) => `${name} — torna all'inizio`,
  },
  en: {
    nav: {
      aria: "Main navigation",
      categoriesMenu: "Work categories",
      categoriesEmpty: "No categories yet",
    },
    lang: {
      label: "Change language",
    },
    hero: { aria: "Introduction" },
    gallery: {
      openItem: (title: string) => `Open ${title}`,
      viewGroup: (title: string) => `View group ${title}`,
      pageTitle: (name: string, pageTitle: string) => `${pageTitle} — ${name}`,
      pageDescription: (name: string) =>
        `Full gallery of illustrations and drawings by ${name}, by category and standalone works.`,
    },
    about: {
      pageTitle: (name: string, pageTitle: string) => `${pageTitle} — ${name}`,
    },
    contact: {
      pageTitle: (name: string, pageTitle: string) => `${pageTitle} — ${name}`,
      pageDescription: (name: string) =>
        `Contact ${name} for commissions, collaborations, and illustration projects.`,
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
    skipToContent: "Skip to main content",
    footer: {
      social: "Social media",
      rightsReserved: "All rights reserved",
    },
    social: {
      instagram: "Instagram",
      behance: "Behance",
      twitter: "Twitter",
      facebook: "Facebook",
      pinterest: "Pinterest",
      tiktok: "TikTok",
      linkedin: "LinkedIn",
      youtube: "YouTube",
      email: "Send an email",
    },
    notFound: {
      title: "Page not found",
      description: "The page you are looking for does not exist or has been moved.",
      heading: "Page not found",
      message: "The page you are looking for does not exist or has been moved.",
      home: "Back to home",
    },
    logoHome: (name: string) => `${name} — back to home`,
  },
} as const;

export type UiStrings = (typeof ui)["it"];

export function getUi(locale: Locale): UiStrings {
  return ui[locale];
}

export function siteName(site: SiteConfig): string {
  return site.identity.name;
}

export function siteTagline(site: SiteConfig, locale: Locale): string {
  return t(site.identity.tagline, site.identity.tagline_en, locale);
}

export function siteBio(site: SiteConfig, locale: Locale): string {
  return t(site.identity.bio, site.identity.bio_en, locale);
}

export function siteWelcome(site: SiteConfig, locale: Locale): string {
  return t(site.home.welcome, site.home.welcome_en, locale);
}

export function siteContactButton(site: SiteConfig, locale: Locale): string {
  return t(site.header.contactButton, site.header.contactButton_en, locale);
}

export function siteNavLabel(
  site: SiteConfig,
  key: NavKey,
  locale: Locale,
): string {
  const labels = {
    about: t(site.header.nav.about, site.header.nav.about_en, locale),
    categories: t(site.header.nav.categories, site.header.nav.categories_en, locale),
    gallery: t(site.header.nav.gallery, site.header.nav.gallery_en, locale),
    contact: t(site.header.nav.contact, site.header.nav.contact_en, locale),
  };
  return labels[key];
}

export function siteAboutTitle(site: SiteConfig, locale: Locale): string {
  return t(site.identity.title, site.identity.title_en, locale);
}

export function siteGalleryTitle(site: SiteConfig, locale: Locale): string {
  return t(site.pages.gallery.title, site.pages.gallery.title_en, locale);
}

export function siteGalleryIntro(site: SiteConfig, locale: Locale): string {
  return t(site.pages.gallery.intro, site.pages.gallery.intro_en, locale);
}

export function siteGalleryEmpty(site: SiteConfig, locale: Locale): string {
  return t(site.pages.gallery.empty, site.pages.gallery.empty_en, locale);
}

export function siteContactTitle(site: SiteConfig, locale: Locale): string {
  return t(site.pages.contact.title, site.pages.contact.title_en, locale);
}

export function siteContactIntro(site: SiteConfig, locale: Locale): string {
  return t(site.pages.contact.intro, site.pages.contact.intro_en, locale);
}

export function siteContactEmailPrefix(site: SiteConfig, locale: Locale): string {
  return t(site.pages.contact.emailPrefix, site.pages.contact.emailPrefix_en, locale);
}

export function siteContactEmailButton(site: SiteConfig, locale: Locale): string {
  return t(site.pages.contact.emailButton, site.pages.contact.emailButton_en, locale);
}

export function siteContactSocialHeading(site: SiteConfig, locale: Locale): string {
  return t(site.pages.contact.socialHeading, site.pages.contact.socialHeading_en, locale);
}

export function siteCategoriesWorksLabel(site: SiteConfig, locale: Locale): string {
  return t(site.pages.categories.worksLabel, site.pages.categories.worksLabel_en, locale);
}

export function siteCategoriesEmpty(site: SiteConfig, locale: Locale): string {
  return t(site.pages.categories.empty, site.pages.categories.empty_en, locale);
}

export function homeTitle(site: SiteConfig, locale: Locale): string {
  return `${siteName(site)} — ${siteTagline(site, locale)}`;
}

export function socialLabel(
  platform: string,
  locale: Locale,
): string {
  const labels = ui[locale].social as Record<string, string>;
  return labels[platform] ?? platform;
}
