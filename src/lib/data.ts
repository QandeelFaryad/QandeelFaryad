import "server-only";
import { unstable_cache } from "next/cache";
import {
  CASE_STUDIES,
  OPEN_APPLICATION,
  POSTS,
  ROLES,
  type CaseStudy,
  type Post,
  type PostBlock,
  type Role,
} from "./content";
import { SITE } from "./site";
import { isSupabaseConfigured } from "./supabase/config";
import { createPublicClient } from "./supabase/public";

/**
 * Content the admin panel manages. Reads come from Supabase when it is
 * configured (cached, and refreshed whenever an admin saves) and fall back to
 * the hard-coded content in content.ts otherwise.
 */

export type Stats = typeof SITE.stats;

/** Cache tags. Admin actions revalidate these after a change. */
export const TAGS = {
  posts: "posts",
  roles: "roles",
  caseStudies: "case-studies",
  settings: "settings",
} as const;

const DAY = 60 * 60 * 24;

function cached<T>(tag: string, key: string, load: () => Promise<T>, fallback: T) {
  if (!isSupabaseConfigured()) return async () => fallback;
  return unstable_cache(
    async () => {
      try {
        return await load();
      } catch (err) {
        console.error(`[data] Failed to load ${key}`, err);
        return fallback;
      }
    },
    [key],
    { tags: [tag], revalidate: DAY },
  );
}

/* --------------------------------------------------------------------- Posts */
type PostRow = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image: string | null;
  read_time: string;
  published_on: string;
  featured: boolean;
  body: PostBlock[] | null;
};

export function formatDate(iso: string) {
  const d = new Date(`${iso.slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

const toPost = (r: PostRow): Post => ({
  slug: r.slug,
  title: r.title,
  excerpt: r.excerpt,
  cat: r.category,
  author: r.author,
  image: r.image ?? "",
  readTime: r.read_time,
  date: formatDate(r.published_on),
  featured: r.featured,
  body: Array.isArray(r.body) ? r.body : [],
});

export const getPosts = cached(
  TAGS.posts,
  "posts",
  async () => {
    const { data, error } = await createPublicClient()
      .from("posts")
      .select("slug,title,excerpt,category,author,image,read_time,published_on,featured,body")
      .eq("status", "published")
      .order("published_on", { ascending: false });
    if (error) throw error;
    return (data as PostRow[]).map(toPost);
  },
  POSTS,
);

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function getRelatedPosts(slug: string, count = 3) {
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);
  const others = posts.filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.cat === post?.cat);
  const rest = others.filter((p) => p.cat !== post?.cat);
  return [...same, ...rest].slice(0, count);
}

/* --------------------------------------------------------------------- Roles */
type RoleRow = {
  slug: string;
  title: string;
  department: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const getRoles = cached(
  TAGS.roles,
  "roles",
  async () => {
    const { data, error } = await createPublicClient()
      .from("roles")
      .select("slug,title,department,location,summary,responsibilities,requirements")
      .eq("status", "open")
      .order("sort")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as RoleRow[]).map(
      (r): Role => ({
        slug: r.slug,
        title: r.title,
        dept: r.department,
        loc: r.location,
        summary: r.summary,
        responsibilities: r.responsibilities ?? [],
        requirements: r.requirements ?? [],
      }),
    );
  },
  ROLES,
);

export async function getRole(slug: string) {
  if (slug === OPEN_APPLICATION.slug) return OPEN_APPLICATION;
  return (await getRoles()).find((r) => r.slug === slug);
}

/* -------------------------------------------------------------- Case studies */
export const getCaseStudies = cached(
  TAGS.caseStudies,
  "case-studies",
  async () => {
    const { data, error } = await createPublicClient()
      .from("case_studies")
      .select("slug,name,subtitle,sector,industry,summary,tags,image,challenge,delivered,solution,results")
      .eq("status", "published")
      .order("sort")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as (Omit<CaseStudy, "image"> & { image: string | null })[]).map(
      (c): CaseStudy => ({ ...c, image: c.image ?? "", tags: c.tags ?? [] }),
    );
  },
  CASE_STUDIES,
);

export async function getCaseStudy(slug: string) {
  return (await getCaseStudies()).find((c) => c.slug === slug);
}

/* ------------------------------------------------------------------ Settings */
export const getStats = cached(
  TAGS.settings,
  "settings",
  async (): Promise<Stats> => {
    const { data, error } = await createPublicClient()
      .from("settings")
      .select("projects,countries,industries,satisfaction")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw error;
    return data ?? SITE.stats;
  },
  SITE.stats,
);
