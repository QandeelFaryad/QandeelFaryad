"use client";

import Link from "next/link";
import { useState, ViewTransition } from "react";
import { ImageFill } from "./ui";
import { Reveal } from "./motion";
import { CASE_STUDIES } from "@/lib/content";

const FILTERS = ["ALL WORK", "WEB DESIGN", "BRANDING", "PRODUCT DESIGN", "DEVELOPMENT"];

function matches(filter: string, tags: string[]) {
  if (filter === "ALL WORK") return true;
  const f = filter.toLowerCase();
  return tags.some((t) => t.toLowerCase().includes(f.split(" ")[0]));
}

export default function WorkGrid() {
  const [filter, setFilter] = useState("ALL WORK");
  const shown = CASE_STUDIES.filter((w) => matches(filter, w.tags));

  return (
    <>
      {/* Filter strip — sits just below the header when it's showing */}
      <div
        className="sticky z-30 border-b border-line bg-white/90 backdrop-blur transition-[top] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ top: "var(--header-offset, 0px)" }}
      >
        <div className="container-x flex flex-wrap items-center gap-3 py-5" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-5 py-2.5 font-display text-[12px] font-bold uppercase transition-colors ${
                filter === f ? "border-accent bg-accent text-ink" : "border-line text-ink hover:border-accent"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto hidden text-[13px] font-semibold text-muted sm:inline" aria-live="polite">
            {shown.length} project{shown.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <section className="bg-white">
        <div className="container-x grid gap-8 py-20 md:grid-cols-2">
          {shown.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 2) * 90} scale>
              <Link href={`/case-studies/${w.slug}`} data-cursor="View" className="group flex flex-col gap-5">
                <ViewTransition name={`work-${w.slug}`} share="morph" default="none">
                  <div className="h-[340px] w-full overflow-hidden rounded-3xl">
                    <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                      <ImageFill label={`${w.name} — ${w.sector.toLowerCase()}`} src={w.image} seed={CASE_STUDIES.indexOf(w)} />
                    </div>
                  </div>
                </ViewTransition>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-[13px] font-bold uppercase tracking-wide text-accent">{w.sector}</p>
                    <h2 className="mt-1 font-display text-[clamp(22px,2.6vw,30px)] font-bold uppercase text-ink transition-colors group-hover:text-accent">
                      {w.name}
                    </h2>
                  </div>
                  <span className="text-ink/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">↗</span>
                </div>
                <p className="max-w-[520px] text-[15px] leading-[1.6] text-muted">{w.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {w.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 text-[12px] font-medium uppercase text-ink/70">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
