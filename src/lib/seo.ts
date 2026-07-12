const FALLBACK_SITE = "https://www.astridhati.com";

export function getSiteUrl(siteHref?: string | URL): string {
  const href = siteHref?.toString() ?? FALLBACK_SITE;
  return href.replace(/\/$/, "");
}

export function truncateDescription(text: string, max = 160): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;

  const slice = trimmed.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");

  if (lastSpace > max * 0.6) {
    return `${slice.slice(0, lastSpace).trimEnd()}…`;
  }

  return `${slice.trimEnd()}…`;
}

export function absoluteAssetUrl(path: string, siteUrl: string): string {
  if (!path) return "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}
