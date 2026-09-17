import type { ReactNode } from "react";
import { Reveal, Counter, FadeWords, SplitReveal, PointerGlow, ScrollFade } from "./motion";
import { SectionLabel } from "./ui";

export type HeroStat = { value: number; suffix?: string; label: string };

export default function PageHero({
  eyebrow,
  titleLines,
  sub,
  stats,
  children,
}: {
  eyebrow: string;
  titleLines: string[];
  sub?: string;
  stats?: HeroStat[];
  children?: ReactNode;
}) {
  return (
    <section className="brand-gradient-animated relative isolate overflow-hidden px-[clamp(20px,5.5vw,80px)] pb-24 pt-[clamp(140px,22vh,220px)]">
      <PointerGlow />
      <ScrollFade speed={0.25}>
      <Reveal><SectionLabel dark>{eyebrow}</SectionLabel></Reveal>
      <h1 className="mt-8 flex flex-col gap-2">
        {titleLines.map((line, i) => (
          <SplitReveal
            key={line}
            text={line}
            delay={i * 120}
            onLoad
            className="block font-display text-[clamp(36px,8.5vw,104px)] font-bold tracking-[-0.015em] uppercase leading-[0.95] text-white"
          />
        ))}
      </h1>
      </ScrollFade>
      {sub ? (
        <FadeWords
          text={sub}
          delay={titleLines.length * 120 + 250}
          onLoad
          className="mt-8 max-w-[720px] text-[clamp(16px,1.6vw,20px)] leading-[1.55] text-white/85"
        />
      ) : null}

      {stats ? (
        <Reveal delay={320}>
          <div className="mt-14 flex flex-wrap gap-12">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-display text-[clamp(36px,5vw,56px)] font-semibold tracking-[-0.015em] text-white">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="text-[14px] font-medium uppercase tracking-wide text-white/70">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      ) : null}

      {children ? <Reveal delay={320}>{children}</Reveal> : null}
    </section>
  );
}
