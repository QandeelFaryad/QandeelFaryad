"use client";

import Link from "@/i18n/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./motion";
import { ImageFill } from "./ui";
import { SERVICE_IMAGES } from "@/lib/content";

/** A service as shown here, already in the page's language. */
export type ShowcaseService = { slug: string; no: string; title: string; body: string; imageAlt: string };

/**
 * The home page's service list beside a sticky image. On large screens the image
 * follows along: it crossfades to the service in the middle of the viewport as the
 * list scrolls past, and to whichever one is hovered or focused. Small screens stack
 * the image under the list, so they show only the first one (the others are
 * display:none and never download).
 *
 * Each service has its own entrance (see .svc-in-* in globals.css): the incoming
 * picture animates in on top while the previous one stays put underneath, so a
 * wipe or reveal always uncovers the last image rather than a blank frame.
 */
const ENTRANCES = [
  "svc-in-wipe-up",
  "svc-in-circle",
  "svc-in-slide",
  "svc-in-split",
  "svc-in-diagonal",
  "svc-in-zoom",
  "svc-in-wipe-left",
  "svc-in-blur",
  "svc-in-wipe-down",
];
export default function ServiceShowcase({ services }: { services: ShowcaseService[] }) {
  const [{ active, previous }, setShown] = useState({ active: 0, previous: -1 });
  const setActive = useCallback(
    (next: number) => setShown((cur) => (cur.active === next ? cur : { active: next, previous: cur.active })),
    [],
  );
  const rows = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    let io: IntersectionObserver | null = null;
    const sync = () => {
      io?.disconnect();
      io = null;
      if (!wide.matches) return setActive(0);
      // A thin band across the middle of the viewport: whichever row crosses it is current.
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
          }
        },
        { rootMargin: "-45% 0px -45% 0px" },
      );
      rows.current.forEach((row) => row && io!.observe(row));
    };
    sync();
    wide.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      io?.disconnect();
    };
  }, [setActive]);

  const current = services[active];

  return (
    <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
      <div className="flex flex-1 flex-col">
        {services.map((s, i) => (
          <div
            key={s.no}
            ref={(el) => {
              rows.current[i] = el;
            }}
            data-index={i}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <Reveal delay={i * 60}>
              <Link href={`/services#${s.slug}`} className="group flex flex-col gap-4 border-b border-[#e7e7ea] py-8">
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                  <div className="flex min-w-0 items-center gap-6">
                    <span className="font-display text-[18px] font-bold text-spark">{s.no}</span>
                    <h3
                      className={`font-display text-[clamp(20px,2.3vw,30px)] font-bold tracking-[-0.015em] leading-[1.05] transition-colors group-hover:text-accent ${
                        i === active ? "lg:text-accent-deep" : "text-ink"
                      }`}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <span className="text-ink/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent rtl:-scale-x-100 rtl:group-hover:-translate-x-1">↗</span>
                </div>
                <p className="max-w-[560px] text-[15px] leading-[1.6] text-ink/70">{s.body}</p>
              </Link>
            </Reveal>
          </div>
        ))}
      </div>

      <div className="h-[420px] w-full lg:sticky lg:top-24 lg:h-[600px] lg:w-[420px] lg:shrink-0">
        <Reveal clip className="h-full w-full overflow-hidden rounded-3xl">
          <div className="relative h-full w-full">
            {services.map((s, i) => {
              const img = SERVICE_IMAGES[s.slug];
              if (!img) return null;
              return (
                <div
                  key={s.slug}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 overflow-hidden ${
                    i === active
                      ? // The first paint has nothing underneath to reveal, so it just shows.
                        `z-20 ${previous === -1 ? "" : ENTRANCES[i % ENTRANCES.length]}`
                      : i === previous
                        ? "z-10"
                        : "z-0 opacity-0"
                  } ${i === 0 ? "" : "hidden lg:block"}`}
                >
                  <div className={`h-full w-full ${i === active && previous !== -1 ? "svc-settle" : ""}`}>
                    <ImageFill label={s.imageAlt} src={img.src} rounded="rounded-none" />
                  </div>
                </div>
              );
            })}
            {/* Which service the picture belongs to. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden bg-gradient-to-t from-ink/80 to-transparent p-6 pt-16 lg:block">
              <p key={current.slug} className="animate-step flex items-baseline gap-3 font-display text-[14px] font-bold uppercase text-white">
                <span className="text-spark">{current.no}</span>
                {current.title}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
