"use client";

import Link from "next/link";
import { useState, ViewTransition } from "react";
import { SectionLabel, ImageFill } from "./ui";
import { Reveal } from "./motion";
import { POSTS, POST_CATEGORIES } from "@/lib/content";

const TABS = ["ALL INSIGHTS", ...POST_CATEGORIES];

export default function BlogIndex() {
  const [tab, setTab] = useState("ALL INSIGHTS");
  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];
  const rest = POSTS.filter((p) => p !== featured);
  const shown = tab === "ALL INSIGHTS" ? rest : rest.filter((p) => p.cat.toUpperCase() === tab);

  return (
    <>
      {/* Featured post */}
      <section className="bg-white">
        <div className="container-x py-20">
          <Reveal><SectionLabel>FEATURED POST</SectionLabel></Reveal>
          <Reveal delay={100} scale>
            <Link href={`/blog/${featured.slug}`} data-cursor="Read" className="group mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
              <ViewTransition name={`post-${featured.slug}`} share="morph" default="none">
                <div className="h-[380px] w-full overflow-hidden rounded-3xl">
                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                    <ImageFill label={featured.title} src={featured.image} seed={POSTS.indexOf(featured) + 2} priority />
                  </div>
                </div>
              </ViewTransition>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-accent px-3 py-1 font-display text-[12px] font-bold uppercase text-ink">{featured.cat}</span>
                  <span className="text-[13px] text-muted">• {featured.date} • {featured.readTime}</span>
                </div>
                <h2 className="font-display text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.1] text-ink transition-colors group-hover:text-accent">
                  {featured.title}
                </h2>
                <p className="text-[17px] leading-[1.6] text-muted">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-ink">{featured.author}</span>
                  <span className="font-display text-[13px] font-bold uppercase text-accent transition-transform group-hover:translate-x-1">Read More →</span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="border-y border-line bg-white">
        <div className="container-x flex flex-wrap gap-3 py-5" role="group" aria-label="Filter articles">
          {TABS.map((t) => (
            <button
              key={t}
              aria-pressed={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-full border px-5 py-2.5 font-display text-[12px] font-bold uppercase transition-colors ${
                tab === t ? "border-accent bg-accent text-ink" : "border-line text-ink hover:border-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="bg-white">
        <div className="container-x grid gap-8 py-20 md:grid-cols-2 lg:grid-cols-3">
          {shown.length === 0 ? (
            <p className="text-[16px] text-muted">No articles in this category yet — check back soon.</p>
          ) : null}
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

export function PostCard({ post, seed }: { post: (typeof POSTS)[number]; seed: number }) {
  return (
    <Link href={`/blog/${post.slug}`} data-cursor="Read" className="group flex h-full flex-col gap-4">
      <ViewTransition name={`post-${post.slug}`} share="morph" default="none">
        <div className="h-[220px] w-full overflow-hidden rounded-3xl">
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
            <ImageFill label={post.title} src={post.image} seed={seed} />
          </div>
        </div>
      </ViewTransition>
      <div className="flex items-center gap-3">
        <span className="font-display text-[12px] font-bold uppercase text-accent">{post.cat}</span>
        <span className="text-[12px] text-muted">{post.date} · {post.readTime}</span>
      </div>
      <h3 className="font-display text-[21px] font-bold leading-[1.15] text-ink transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="text-[14px] leading-[1.6] text-muted">{post.excerpt}</p>
      <span className="mt-auto pt-2 text-[13px] font-semibold text-ink/70">By {post.author}</span>
    </Link>
  );
}
