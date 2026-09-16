import type { MetadataRoute } from "next";
import { OPEN_APPLICATION } from "@/lib/content";
import { getCaseStudies, getPosts, getRoles } from "@/lib/data";
import { NAV_LINKS, SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [CASE_STUDIES, POSTS, ROLES] = await Promise.all([getCaseStudies(), getPosts(), getRoles()]);
  const paths = [
    ...NAV_LINKS.map((l) => l.href),
    ...CASE_STUDIES.map((c) => `/case-studies/${c.slug}`),
    ...POSTS.map((p) => `/blog/${p.slug}`),
    ...[...ROLES, OPEN_APPLICATION].map((r) => `/careers/${r.slug}`),
  ];
  return paths.map((p) => ({ url: new URL(p, SITE.url).toString() }));
}
