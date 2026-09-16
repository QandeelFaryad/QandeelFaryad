import type { MetadataRoute } from "next";
import { CASE_STUDIES, OPEN_APPLICATION, POSTS, ROLES } from "@/lib/content";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...NAV_LINKS.map((l) => l.href),
    ...CASE_STUDIES.map((c) => `/case-studies/${c.slug}`),
    ...POSTS.map((p) => `/blog/${p.slug}`),
    ...[...ROLES, OPEN_APPLICATION].map((r) => `/careers/${r.slug}`),
  ];
  return paths.map((p) => ({ url: new URL(p, SITE.url).toString() }));
}
