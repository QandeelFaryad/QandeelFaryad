"use client";

import Link from "@/i18n/link";
import { useState, ViewTransition } from "react";
import { SectionLabel, ImageFill } from "./ui";
import { Reveal } from "./motion";
import { POST_CATEGORIES, type Post } from "@/lib/content";
import { useLocale, useMessages } from "@/i18n/client";
import { DATE_LOCALES } from "@/i18n/config";
import { fmt, formatDate } from "@/i18n/format";

const ALL = "ALL";

export default function BlogIndex({ posts: POSTS }: { posts: Post[] }) {
  const t = useMessages();
  const b = t.blog;
  const [tab, setTab] = useState(ALL);
  const catLabel = (c: string) => b.categories[c.toUpperCase()] ?? c;

  if (POSTS.length === 0) {
    return (
      <section className="bg-white">
        <div className="container-x flex flex-col items-start gap-6 [padding-block:120px]">
          <Reveal><SectionLabel>{b.comingSoon}</SectionLabel></Reveal>
          <Reveal delay={80}>
            <h2 className="max-w-[760px] font-display text-[clamp(26px,3.6vw,44px)] font-bold tracking-[-0.015em] uppercase leading-[1.08] text-ink">
              {b.comingHeading}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-[560px] text-[17px] leading-[1.7] text-muted">{b.comingBody}</p>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/case-studies"
              className="font-display text-[14px] font-bold uppercase text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {b.seeCaseStudies}
            </Link>
          </Reveal>
        </div>
      </section>
    );
  }

  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];
  const rest = POSTS.filter((p) => p !== featured);
  const shown = tab === ALL ? rest : rest.filter((p) => p.cat.toUpperCase() === tab);

  return (
    <>
      {/* Featured post */}
      <section className="bg-white">
        <div className="container-x py-20">
          <Reveal><SectionLabel>{b.featured}</SectionLabel></Reveal>
          <Reveal delay={100} scale>
            <Link href={`/blog/${featured.slug}`} data-cursor={t.common.cursor.read} className="group mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
              <ViewTransition name={`post-${featured.slug}`} share="morph" default="none">
                <div className="h-[380px] w-full overflow-hidden rounded-3xl">
                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                    <ImageFill label={featured.title} src={featured.image} seed={POSTS.indexOf(featured) + 2} priority />
                  </div>
                </div>
              </ViewTransition>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-accent px-3 py-1 font-display text-[12px] font-bold uppercase text-ink">{catLabel(featured.cat)}</span>
                  <span className="text-[13px] text-muted">• <PostDate post={featured} /> • {featured.readTime}</span>
                </div>
                <h2 className="font-display text-[clamp(28px,3.6vw,44px)] font-bold tracking-[-0.015em] leading-[1.1] text-ink transition-colors group-hover:text-accent">
                  {featured.title}
                </h2>
                <p className="text-[17px] leading-[1.6] text-muted">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-ink">{featured.author}</span>
                  <span className="font-display text-[13px] font-bold uppercase text-accent transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    {b.readMore}
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="border-y border-line bg-white">
        <div className="container-x flex flex-wrap gap-3 py-5" role="group" aria-label={b.filterLabel}>
          {[ALL, ...POST_CATEGORIES].map((c) => (
            <button
              key={c}
              aria-pressed={tab === c}
              onClick={() => setTab(c)}
              className={`rounded-full border px-5 py-2.5 font-display text-[12px] font-bold uppercase transition-colors ${
                tab === c ? "border-accent bg-accent text-ink" : "border-line text-ink hover:border-accent"
              }`}
            >
              {c === ALL ? b.all : catLabel(c)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="bg-white">
        <div className="container-x grid gap-8 py-20 md:grid-cols-2 lg:grid-cols-3">
          {shown.length === 0 ? <p className="text-[16px] text-muted">{b.empty}</p> : null}
          {shown.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80} scale>
              <PostCard post={p} seed={POSTS.indexOf(p)} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

/** A post's date in the page's language. */
export function PostDate({ post }: { post: Post }) {
  const locale = useLocale();
  return <>{formatDate(post.published, DATE_LOCALES[locale], post.date)}</>;
}

export function PostCard({ post, seed }: { post: Post; seed: number }) {
  const t = useMessages();
  const cat = t.blog.categories[post.cat.toUpperCase()] ?? post.cat;
  return (
    <Link href={`/blog/${post.slug}`} data-cursor={t.common.cursor.read} className="group flex h-full flex-col gap-4">
      <ViewTransition name={`post-${post.slug}`} share="morph" default="none">
        <div className="h-[220px] w-full overflow-hidden rounded-3xl">
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
            <ImageFill label={post.title} src={post.image} seed={seed} />
          </div>
        </div>
      </ViewTransition>
      <div className="flex items-center gap-3">
        <span className="font-display text-[12px] font-bold uppercase text-accent">{cat}</span>
        <span className="text-[12px] text-muted">
          <PostDate post={post} /> · {post.readTime}
        </span>
      </div>
      <h3 className="font-display text-[21px] font-bold tracking-[-0.015em] leading-[1.15] text-ink transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="text-[14px] leading-[1.6] text-muted">{post.excerpt}</p>
      <span className="mt-auto pt-2 text-[13px] font-semibold text-ink/70">{fmt(t.blog.by, { author: post.author })}</span>
    </Link>
  );
}
