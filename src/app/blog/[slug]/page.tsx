import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import Newsletter from "@/components/Newsletter";
import { PostCard } from "@/components/BlogIndex";
import { ImageFill, SectionLabel } from "@/components/ui";
import { ReadingProgress, Reveal } from "@/components/motion";
import { POSTS, avatar, getPost, relatedPosts } from "@/lib/content";
import { pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const meta = pageMeta(post.title, post.excerpt);
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", authors: [post.author] } };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = relatedPosts(slug);
  const seed = post.featured ? POSTS.indexOf(post) + 2 : POSTS.indexOf(post);

  return (
    <PageShell>
      <ReadingProgress />
      <PageHero eyebrow={`${post.cat.toUpperCase()} · ${post.readTime.toUpperCase()}`} titleLines={[post.title]}>
        <div className="mt-10 flex items-center gap-4">
          <span className="size-12 overflow-hidden rounded-2xl">
            <ImageFill label={post.author} src={avatar(POSTS.indexOf(post))} rounded="rounded-2xl" />
          </span>
          <div>
            <p className="font-display text-[16px] font-bold text-white">{post.author}</p>
            <p className="text-[14px] text-white/70">{post.date}</p>
          </div>
        </div>
      </PageHero>

      <article id="article" className="bg-white">
        <div className="container-x pt-16">
          <Link href="/blog" className="font-display text-[13px] font-bold uppercase text-muted transition-colors hover:text-accent">
            ← All articles
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
                  className="my-4 border-l-4 border-accent pl-6 font-display text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.25] text-ink"
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
                <p className="font-display text-[20px] font-bold text-ink">Working on something similar?</p>
                <p className="text-[15px] text-muted">We&apos;d love to hear about it.</p>
              </div>
              <Link href="/contact" className="font-display text-[14px] font-bold uppercase text-accent hover:underline">
                Start a conversation →
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-cloud">
        <div className="container-x flex flex-col gap-12 [padding-block:96px]">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SectionLabel>KEEP READING</SectionLabel>
              <Link href="/blog" className="font-display text-[13px] font-bold uppercase text-ink hover:text-accent">
                View all →
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80} scale>
                <PostCard post={p} seed={POSTS.indexOf(p)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </PageShell>
  );
}
