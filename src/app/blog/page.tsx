import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import BlogIndex from "@/components/BlogIndex";
import Newsletter from "@/components/Newsletter";
import { pageMeta } from "@/lib/site";
import { getPosts } from "@/lib/data";

export const metadata = pageMeta(
  "Journal",
  "Deep dives into user behavior, engineering, brand strategy, and creative systems from our global team.",
);

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <PageShell>
      <PageHero
        eyebrow="THE JOURNAL"
        titleLines={["INSIGHTS &", "IDEAS / 2026"]}
        sub="Deep dives into user behavior, technical engineering, brand strategies, and creative systems straight from our distributed global team."
      />
      <BlogIndex posts={posts} />
      <Newsletter />
    </PageShell>
  );
}
