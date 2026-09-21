import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import BlogIndex from "@/components/BlogIndex";
import Newsletter from "@/components/Newsletter";
import { getPosts } from "@/lib/data";
import { getMessages } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()).meta.blog;
  return pageMetadata("/blog", t.title, t.description);
}

export default async function BlogPage() {
  const [posts, m] = await Promise.all([getPosts(), getMessages()]);
  const t = m.blog;
  return (
    <PageShell>
      <PageHero eyebrow={t.eyebrow} titleLines={t.title} sub={t.sub} />
      <BlogIndex posts={posts} />
      <Newsletter />
    </PageShell>
  );
}
