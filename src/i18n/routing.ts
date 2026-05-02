import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
    "en",
    "tr",
    "de",
    "fr",
    "es",
    "it",
    "pt-br",
    "pt",
    "nl",
    "no",
    "da",
    "sv",
    "cs",
    "pl",
    "ru",
    "ja",
    "ko",
    "zh",
    "ar",
  ],
  defaultLocale: "en",
  localePrefix: "always",
});

/** Locale → native display name (for switcher menu). */
export const localeNames: Record<string, string> = {
  en: "English",
  tr: "Türkçe",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  "pt-br": "Português",
  nl: "Nederlands",
  no: "Norsk",
  da: "Dansk",
  sv: "Svenska",
  cs: "Čeština",
  pl: "Polski",
  ru: "Русский",
  ar: "العربية",
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
};

/** Right-to-left locales (currently only Arabic). */
export const rtlLocales = new Set(["ar"]);

/**
 * Locale → ISO 3166-1 alpha-2 country code for flag display.
 * Each language is mapped to the most representative country.
 */
export const localeFlags: Record<string, string> = {
  en: "GB",
  tr: "TR",
  de: "DE",
  fr: "FR",
  es: "ES",
  it: "IT",
  pt: "PT",
  "pt-br": "BR",
  nl: "NL",
  no: "NO",
  da: "DK",
  sv: "SE",
  cs: "CZ",
  pl: "PL",
  ru: "RU",
  ar: "SA",
  ja: "JP",
  ko: "KR",
  zh: "CN",
};

export type Locale = (typeof routing.locales)[number];
