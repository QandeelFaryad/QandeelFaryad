import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { OG_LOCALES, languageAlternates, localePath } from "./config";
import { getLocale } from "./server";

/**
 * Title, description, canonical URL and hreflang alternates for a page, in the
 * current language. `path` is the English (unprefixed) path, e.g. "/services".
 */
export async function pageMetadata(path: string, title: string, description: string): Promise<Metadata> {
  const locale = await getLocale();
  const url = localePath(locale, path);
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    // Child metadata replaces the parent's openGraph object, so restate it here.
    openGraph: {
      siteName: SITE.name,
      type: "website",
      locale: OG_LOCALES[locale],
      url,
      title: `${title} — ${SITE.name}`,
      description,
      images: [{ url: localePath(locale, "/opengraph-image"), width: 1200, height: 630 }],
    },
  };
}
