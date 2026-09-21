import type { MetadataRoute } from "next";
import { OPEN_APPLICATION } from "@/lib/content";
import { getCaseStudies, getPosts, getRoles } from "@/lib/data";
import { NAV_LINKS, SITE } from "@/lib/site";
import { LOCALES, languageAlternates, localePath } from "@/i18n/config";

const LEGAL = ["/legal/privacy", "/legal/terms", "/legal/cookies"];

/** Every page in every language, each listing its other-language versions. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [CASE_STUDIES, POSTS, ROLES] = await Promise.all([getCaseStudies(), getPosts(), getRoles()]);
  const paths = [
    ...NAV_LINKS.map((l) => l.href),
    ...LEGAL,
    ...CASE_STUDIES.map((c) => `/case-studies/${c.slug}`),
    ...POSTS.map((p) => `/blog/${p.slug}`),
    ...[...ROLES, OPEN_APPLICATION].map((r) => `/careers/${r.slug}`),
  ];
  const abs = (p: string) => new URL(p, SITE.url).toString();
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(Object.entries(languageAlternates(path)).map(([l, p]) => [l, abs(p)]));
    return LOCALES.map((locale) => ({ url: abs(localePath(locale, path)), alternates: { languages } }));
  });
}
