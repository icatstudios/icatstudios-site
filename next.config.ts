import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Locales where scorehunter.app does not (yet) have a translated legal page.
 * Map them to the closest supported locale.
 */
const SH_LOCALE_FALLBACK: Record<string, string> = {
  pt: "pt-br",
  zh: "en",
};

function shRedirects(path: "privacy-policy" | "terms-of-use") {
  // Specific fallbacks for locales SH doesn't support, then a catch-all.
  return [
    ...Object.entries(SH_LOCALE_FALLBACK).map(([from, to]) => ({
      source: `/${from}/${path === "privacy-policy" ? "privacy-policy" : "term-of-use"}/score-hunter`,
      destination: `https://scorehunter.app/${to}/${path}`,
      permanent: false,
    })),
    {
      source: `/:locale/${path === "privacy-policy" ? "privacy-policy" : "term-of-use"}/score-hunter`,
      destination: `https://scorehunter.app/:locale/${path}`,
      permanent: false,
    },
  ];
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Score Hunter privacy + terms live on scorehunter.app — redirect there
      // while keeping a stable icatstudios.com URL for store metadata.
      ...shRedirects("privacy-policy"),
      ...shRedirects("terms-of-use"),
    ];
  },
};

export default withNextIntl(nextConfig);
