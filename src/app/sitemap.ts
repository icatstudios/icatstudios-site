import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE = "https://icatstudios.com";

/** Content pages that exist under every locale. */
const STATIC_PATHS = [
  "",
  "/products",
  "/about",
  "/support",
  "/privacy-policy",
  "/term-of-use",
  "/delete-account",
];

/**
 * Per-app legal pages. Score Hunter's privacy/terms redirect to
 * scorehunter.app (see next.config.ts), so they are intentionally left out.
 */
const LEGAL_APPS = ["potentials", "fast-and-blocky", "swapmap"];
const DELETE_ACCOUNT_APPS = ["score-hunter", "swapmap", "potentials"];

/** hreflang alternates for a given path across all locales, plus x-default. */
function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${BASE}/${locale}${path}`;
  }
  languages["x-default"] = `${BASE}/${routing.defaultLocale}${path}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: string[] = [...STATIC_PATHS];

  for (const app of LEGAL_APPS) {
    paths.push(`/privacy-policy/${app}`);
    paths.push(`/term-of-use/${app}`);
  }
  for (const app of DELETE_ACCOUNT_APPS) {
    paths.push(`/delete-account/${app}`);
  }

  const lastModified = new Date();

  return paths.map((path) => ({
    url: `${BASE}/${routing.defaultLocale}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
    alternates: { languages: languageAlternates(path) },
  }));
}
