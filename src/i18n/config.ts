/**
 * The site's languages. English is the default and keeps its URLs unprefixed
 * (/services); every other language lives under its code (/ar/services). The proxy
 * maps unprefixed URLs onto app/[lang] as "en", and redirects /en/... back to the
 * unprefixed address so each page has one URL per language.
 */
export const LOCALES = ["en", "ar", "ru", "es", "fr", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Remembers a visitor's explicit choice from the language switcher. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Each language in its own name and script, for the switcher. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  ru: "Русский",
  es: "Español",
  fr: "Français",
  pt: "Português",
};

export const RTL_LOCALES: readonly Locale[] = ["ar"];
export const dir = (locale: Locale) => (RTL_LOCALES.includes(locale) ? "rtl" : "ltr");

/** For <meta property="og:locale">. */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_GB",
  ar: "ar_AR",
  ru: "ru_RU",
  es: "es_ES",
  fr: "fr_FR",
  pt: "pt_BR",
};

/** For Intl date formatting. */
export const DATE_LOCALES: Record<Locale, string> = {
  en: "en-GB",
  ar: "ar",
  ru: "ru-RU",
  es: "es-ES",
  fr: "fr-FR",
  pt: "pt-BR",
};

/** "/services" in `locale`: unprefixed for English, "/ar/services" otherwise. */
export function localePath(locale: Locale, path: string) {
  if (!path.startsWith("/")) return path; // external, mailto:, #hash
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** The locale a pathname is in, and the pathname without it. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const seg = pathname.split("/")[1];
  if (isLocale(seg) && seg !== DEFAULT_LOCALE) {
    const rest = pathname.slice(seg.length + 1);
    return { locale: seg, path: rest || "/" };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}

/** Every language's URL for a site path, plus x-default (English), for hreflang. */
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
    "x-default": localePath(DEFAULT_LOCALE, path),
  };
}
