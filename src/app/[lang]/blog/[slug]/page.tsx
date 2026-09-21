import type { Metadata } from "next";
import Link from "@/i18n/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import Newsletter from "@/components/Newsletter";
import { PostCard, PostDate } from "@/components/BlogIndex";
import { ImageFill, SectionLabel } from "@/components/ui";
import { ReadingProgress, Reveal } from "@/components/motion";
import { getPost, getPosts, getRelatedPosts } from "@/lib/data";
import { getMessages } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPost(slug);
  if (!post) return {};
  const meta = await pageMetadata(`/blog/${slug}`, post.title, post.excerpt);
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", authors: [post.author] } };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, posts, related, m] = await Promise.all([getPost(slug), getPosts(), getRelatedPosts(slug), getMessages()]);
  const t = m.blog;
  if (!post) notFound();
  const index = posts.findIndex((p) => p.slug === post.slug);
  const seed = post.featured ? index + 2 : index;

  return (
    <PageShell>
      <ReadingProgress />
      <PageHero eyebrow={`${t.categories[post.cat.toUpperCase()] ?? post.cat.toUpperCase()} · ${post.readTime.toUpperCase()}`} titleLines={[post.title]}>
        <div className="mt-10 flex items-center gap-4">
          <div>
            <p className="font-display text-[16px] font-bold text-white">{post.author}</p>
            <p className="text-[14px] text-white/70">
              <PostDate post={post} />
            </p>
          </div>
        </div>
      </PageHero>

      <article id="article" className="bg-white">
        <div className="container-x pt-16">
          <Link href="/blog" className="font-display text-[13px] font-bold uppercase text-muted transition-colors hover:text-accent">
            {t.allArticles}
          </Link>
          <ViewTransition name={`post-${post.slug}`} share="morph" default="none">
            <div className="mt-6 h-[clamp(260px,45vw,520px)] w-full overflow-hidden rounded-3xl">
              <ImageFill label={post.title} src={post.image} seed={seed} priority />
            </div>
          </ViewTransition>
        </div>

        <div className="container-x">
          <div className="prose-qorliq mx-auto flex max-w-[720px] flex-col gap-6 [padding-block:80px]">
            <p className="!text-[22px] !leading-[1.6] !text-ink">{post.excerpt}</p>
            {post.body.map((b, i) =>
              b.type === "h2" ? (
                <h2 key={i}>{b.text}</h2>
              ) : b.type === "quote" ? (
                <blockquote
                  key={i}
                  className="my-4 border-s-4 border-accent ps-6 font-display text-[clamp(22px,2.6vw,30px)] font-semibold tracking-[-0.015em] leading-[1.25] text-ink"
                >
                  {b.text}
                </blockquote>
              ) : b.type === "list" ? (
                <ul key={i}>
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{b.text}</p>
              ),
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-cloud p-8">
              <div>
                <p className="font-display text-[20px] font-semibold tracking-[-0.015em] text-ink">{t.similarHeading}</p>
                <p className="text-[15px] text-muted">{t.similarBody}</p>
              </div>
              <Link href="/contact" className="font-display text-[14px] font-bold uppercase text-accent hover:underline">
                {t.startConversation}
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-cloud">
        <div className="container-x flex flex-col gap-12 [padding-block:96px]">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SectionLabel>{t.keepReading}</SectionLabel>
              <Link href="/blog" className="font-display text-[13px] font-bold uppercase text-ink hover:text-accent">
                {t.viewAll}
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80} scale>
                <PostCard post={p} seed={posts.findIndex((x) => x.slug === p.slug)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
