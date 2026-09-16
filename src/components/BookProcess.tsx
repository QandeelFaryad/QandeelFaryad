"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getLenis } from "./experience";

export type BookStep = { no: string; title: string; body: string };

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const pad2 = (n: number) => String(n).padStart(2, "0");

/** Page edges seen from the side: one thin line per page, alternating paper and shadow. */
function edges(pages: number, dir: 1 | -1) {
  const n = Math.round(pages * 2);
  if (n <= 0) return "none";
  return Array.from({ length: n }, (_, k) => {
    const d = k + 1;
    return `${dir * d}px ${(d * 0.6).toFixed(1)}px 0 ${d % 2 ? "#d6dbe8" : "#fbfbf8"}`;
  }).join(", ");
}

/**
 * Process steps as a hardback book that opens and turns its pages while the
 * section is pinned. Desktop shows a two-page spread (chapter opener on the
 * left, the description on the right); small screens turn single pages.
 * Reduced-motion users get a plain grid.
 */
export default function BookProcess({ steps, header }: { steps: BookStep[]; header: ReactNode }) {
  const outer = useRef<HTMLDivElement | null>(null);
  const book = useRef<HTMLDivElement | null>(null);
  const stackL = useRef<HTMLDivElement | null>(null);
  const stackR = useRef<HTMLDivElement | null>(null);
  const leaves = useRef<(HTMLDivElement | null)[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [spread, setSpread] = useState(0);

  // Leaves: the cover, then every step but the last; the last step is the page underneath.
  const flips = steps.length;
  const last = steps[steps.length - 1];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    let current = -1;
    let shadowL = "";
    let shadowR = "";

    const update = () => {
      raf = 0;
      const o = outer.current;
      if (!o) return;
      const rect = o.getBoundingClientRect();
      const span = o.offsetHeight - window.innerHeight;
      const p = (span > 0 ? clamp(-rect.top / span, 0, 1) : 0) * flips;

      let open = 0;
      let cover = 0;
      let turned = 0;
      leaves.current.forEach((leaf, i) => {
        if (!leaf) return;
        // Each page turns in the middle of its stretch of scroll, with a short hold either side.
        const raw = clamp((p - i - 0.12) / 0.76, 0, 1);
        const t = raw * raw * (3 - 2 * raw);
        if (i === 0) cover = t;
        else turned += t;
        if (t > 0.5) open = i + 1;
        leaf.style.transform = `perspective(2400px) rotateY(${(-180 * t).toFixed(2)}deg)`;
        // Unturned pages stack first-on-top on the right; turned pages stack last-on-top on the left.
        leaf.style.zIndex = String(t > 0.5 ? 20 + 2 * i : 20 + 2 * (flips - i));
        leaf.style.setProperty("--shade", Math.sin(t * Math.PI).toFixed(3));
      });

      if (book.current) {
        book.current.style.setProperty("--open", cover.toFixed(3));
        // A closed book sits centred on its cover, then slides over as it opens.
        book.current.style.transform = wide.matches ? `translateX(${(-25 * (1 - cover)).toFixed(2)}%)` : "";
      }
      // Paper pages still to turn thicken the right edge; turned ones build up on the left.
      const l = edges(turned, -1);
      const r = edges(flips - turned, 1);
      if (stackL.current && l !== shadowL) stackL.current.style.boxShadow = shadowL = l;
      if (stackR.current && r !== shadowR) stackR.current.style.boxShadow = shadowR = r;

      if (open !== current) {
        current = open;
        setSpread(open);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [enabled, flips]);

  // Jump to the point where a spread lies fully open.
  const goTo = (index: number) => {
    const o = outer.current;
    if (!o) return;
    const span = o.offsetHeight - window.innerHeight;
    const top = o.getBoundingClientRect().top + window.scrollY + (span * (index + 1)) / flips;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(top, { duration: 1.2 });
    else window.scrollTo({ top, behavior: "smooth" });
  };

  if (!enabled) {
    return (
      <div className="flex flex-col gap-16 [padding-block:120px]">
        {header}
        <div className="container-x grid gap-6 sm:grid-cols-2">
          {steps.map((s) => (
            <div key={s.no} className="flex flex-col gap-4 rounded-3xl bg-white p-8">
              <span className="font-display text-[20px] font-semibold text-spark">{s.no}</span>
              <h3 className="font-display text-[clamp(22px,2.2vw,28px)] font-semibold uppercase tracking-[-0.015em] text-ink">
                {s.title}
              </h3>
              <p className="max-w-[420px] text-[15px] leading-[1.6] text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={outer} style={{ height: `calc(100svh + ${flips * 80}svh)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-8 overflow-hidden pt-20 lg:gap-10 lg:pt-24">
        {header}
        <div className="container-x">
          <div ref={book} className="book">
            <div className="book-floor" aria-hidden="true" />
            <div className="book-board" aria-hidden="true" />
            <div className="book-spine" aria-hidden="true" />
            <div className="book-ribbon" aria-hidden="true" />
            <div ref={stackR} className="book-stack is-right" aria-hidden="true" />
            <div ref={stackL} className="book-stack is-left" aria-hidden="true" />

            {Array.from({ length: flips }, (_, i) => (
              <div
                key={i}
                ref={(el) => {
                  leaves.current[i] = el;
                }}
                className={`book-leaf${i === 0 ? " is-cover" : ""}`}
                style={{ zIndex: 20 + 2 * (flips - i) }}
              >
                <div className="book-face">
                  {i === 0 ? (
                    <Cover count={steps.length} />
                  ) : (
                    <RightPage step={steps[i - 1]} index={i - 1} next={steps[i]} total={steps.length} />
                  )}
                </div>
                <div className="book-face is-back">
                  {i === 0 ? (
                    <div className="h-full bg-ink py-[var(--pad)] pl-[var(--pad)]">
                      <LeftPage step={steps[0]} index={0} total={steps.length} />
                    </div>
                  ) : (
                    <LeftPage step={steps[i]} index={i} total={steps.length} />
                  )}
                </div>
              </div>
            ))}
            <div className="book-leaf" style={{ zIndex: 3 }}>
              <div className="book-face">
                <RightPage step={last} index={steps.length - 1} total={steps.length} />
              </div>
            </div>
          </div>

          <ol className="mx-auto mt-12 flex max-w-[760px] flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Steps">
            {steps.map((s, i) => {
              const active = spread === i + 1;
              return (
                <li key={s.no}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={active ? "step" : undefined}
                    className={`flex items-center gap-2 py-1 font-display text-[12px] font-bold uppercase tracking-wide transition-colors duration-300 hover:text-ink ${
                      active ? "text-ink" : "text-ink/35"
                    }`}
                  >
                    <span className={`h-[2px] rounded-full transition-all duration-500 ${active ? "w-6 bg-spark" : "w-3 bg-ink/20"}`} />
                    <span className="hidden sm:inline">{s.title}</span>
                    <span className="sm:hidden">{s.no}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

function Cover({ count }: { count: number }) {
  return (
    <div className="book-cover relative flex h-full flex-col items-center justify-between px-[clamp(28px,3.6vw,48px)] py-[clamp(28px,3.6vw,48px)] text-center text-white">
      <div className="book-cover-glow" aria-hidden="true" />
      <div className="book-cover-frame" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/brand/qorliq-mark-white.svg" alt="" aria-hidden="true" className="book-cover-emboss" />

      <span className="relative mt-3 font-display text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
        The QORLIQ Method
      </span>
      <div className="relative flex flex-col items-center gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brand/qorliq-mark-white.svg" alt="" className="h-11 w-auto" />
        <p className="font-display text-[clamp(30px,3.4vw,46px)] font-bold uppercase leading-[0.95] tracking-[-0.015em]">
          How we
          <br />
          work
        </p>
        <span className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">
          <span className="h-px w-6 bg-white/30" />
          {pad2(count)} chapters
          <span className="h-px w-6 bg-white/30" />
        </span>
      </div>
      <span className="relative mb-3 flex items-center gap-2 text-[12px] text-white/60">
        <span className="book-scroll-hint h-[2px] w-6 rounded-full bg-spark" />
        Scroll to open
      </span>
    </div>
  );
}

function Progress({ index, total }: { index: number; total: number }) {
  return (
    <span className="flex gap-1.5" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-[3px] w-5 rounded-full ${i === index ? "bg-spark" : i < index ? "bg-ink" : "bg-ink/15"}`}
        />
      ))}
    </span>
  );
}

function LeftPage({ step, index, total }: { step: BookStep; index: number; total: number }) {
  return (
    <div className="book-paper flex h-full flex-col justify-between p-[clamp(24px,3.2vw,44px)]">
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em]">
        <span className="text-spark-deep">Chapter {step.no}</span>
        <span className="text-muted">
          {step.no} / {pad2(total)}
        </span>
      </div>

      <div className="flex flex-col gap-5">
        <span className="book-numeral font-display text-[clamp(96px,11vw,176px)] font-bold leading-[0.8]" data-no={step.no}>
          {step.no}
        </span>
        <span className="h-[3px] w-12 rounded-full bg-spark" />
        <h3 className="font-display text-[clamp(22px,2.1vw,32px)] font-semibold uppercase leading-[1.02] [overflow-wrap:anywhere] tracking-[-0.015em] text-ink">
          {step.title}
        </h3>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-display text-[12px] font-semibold text-muted">{(index + 1) * 2}</span>
        <Progress index={index} total={total} />
      </div>
    </div>
  );
}

function RightPage({ step, index, next, total }: { step: BookStep; index: number; next?: BookStep; total: number }) {
  return (
    <div className="book-paper relative flex h-full flex-col justify-between p-[clamp(24px,3.2vw,44px)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/brand/qorliq-mark.svg" alt="" aria-hidden="true" className="book-watermark" />

      <div className="relative flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em]">
        <span className="text-muted">QORLIQ · How we work</span>
        {/* Small screens show one page at a time, so the chapter lives here too. */}
        <span className="text-spark-deep lg:hidden">
          {step.no} / {pad2(total)}
        </span>
      </div>

      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-3 lg:hidden">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-spark-deep">Chapter {step.no}</span>
          <h3 className="font-display text-[clamp(26px,7vw,34px)] font-semibold uppercase leading-[1.02] tracking-[-0.015em] text-ink">
            {step.title}
          </h3>
        </div>
        <p className="book-body text-[clamp(17px,1.6vw,22px)] leading-[1.55] text-ink/85">{step.body}</p>
        <span className="book-ornament" aria-hidden="true">
          <span />
          <i />
          <span />
        </span>
      </div>

      <div className="relative flex items-center justify-between gap-4 border-t border-ink/10 pt-4 text-[12px] font-bold uppercase tracking-wide">
        {next ? (
          <span className="flex items-center gap-2">
            <span className="text-muted">Next</span>
            <span className="font-display text-ink">{next.title} →</span>
          </span>
        ) : (
          <Link href="/contact" className="font-display text-accent-deep underline-offset-4 hover:underline">
            Start your project →
          </Link>
        )}
        <span className="font-display font-semibold text-muted">{(index + 1) * 2 + 1}</span>
      </div>
    </div>
  );
}
