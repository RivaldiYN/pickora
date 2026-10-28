/**
 * Centralized SEO configuration and metadata helpers for Pickora.
 * Follows Google Search Central best practices and Schema.org standards.
 */

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.includes("localhost")) {
    return process.env.NEXTAUTH_URL.replace(/\/+$/, "");
  }
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    return "https://usepickora.vercel.app";
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Pickora",
  title: "Pickora: Curated Product Picks & Tested Gear Index",
  shortTitle: "Pickora",
  description:
    "Curated product recommendations across running, cycling, audio, and desk gear. Every item is verified with direct retail partner links.",
  keywords: [
    "curated products",
    "product recommendations",
    "tested gear",
    "running gear picks",
    "cycling accessories",
    "audiophile headphones",
    "desk setup hardware",
    "best affiliate recommendations",
    "expert gear guide",
  ],
  authors: [{ name: "Pickora Editorial Team", url: getSiteUrl() }],
  creator: "Pickora",
  publisher: "Pickora",
  category: "technology",
  themeColor: "#f7f6f2",
};

/**
 * Returns an absolute URL for images or assets.
 */
export function toAbsoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const baseUrl = getSiteUrl();
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${baseUrl}${cleanPath}`;
}
