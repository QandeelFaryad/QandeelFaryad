import { SectionLabel, PillButton } from "./ui";
import { getMessages } from "@/i18n/server";
import { Reveal, Counter, PointerGlow, Tilt } from "./motion";
import BookProcess from "./BookProcess";

/* -------------------------------------------------------------- DesignProcess */
export type ProcessStep = { no: string; title: string; body: string };

/** Process steps as a book whose pages turn while the section is pinned. */
export function DesignProcess({
  steps,
  label,
  heading,
  dark = false,
}: {
  steps: ProcessStep[];
  label: string;
  heading: string;
  dark?: boolean;
}) {
  const header = (
    <div className="container-x flex flex-col gap-6 lg:gap-8">
      <Reveal><SectionLabel dark={dark}>{label}</SectionLabel></Reveal>
      <Reveal delay={80}>
        <h2
          className={`max-w-[900px] font-display text-[clamp(28px,4.2vw,52px)] font-bold uppercase leading-[1.05] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {heading}
        </h2>
      </Reveal>
    </div>
  );

  return (
    <section className={dark ? "bg-ink" : "bg-cloud"}>
      <BookProcess steps={steps} header={header} />
    </section>
  );
}

/* --------------------------------------------------------------- StatsCounters */
export type Stat = {
  tag?: string;
  value: number;
  suffix?: string;
  prefix?: string;
  raw?: string; // for non-numeric values like "#1"
  label: string;
  accent?: boolean;
};

export function StatsCounters({
  label,
  stats,
  dark = false,
}: {
  label: string;
  stats: Stat[];
  dark?: boolean;
}) {
  return (
    <section className={dark ? "bg-ink" : "bg-cloud"}>
      <div className="container-x flex flex-col gap-14 py-24 [padding-block:96px]">
        <Reveal><SectionLabel dark={dark}>{label}</SectionLabel></Reveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 100} scale>
              <Tilt>
              <div
                className={`flex h-full flex-col gap-3 rounded-3xl p-8 ${
                  dark ? "bg-white/[0.04]" : "bg-white"
                }`}
              >
                {s.tag ? (
                  <span className="w-fit rounded-full bg-spark/10 px-3 py-1 font-display text-[12px] font-bold uppercase text-spark">
                    {s.tag}
                  </span>
                ) : null}
                <span
                  className={`font-display text-[clamp(48px,7vw,72px)] font-bold leading-none ${
                    s.accent ? "text-accent" : dark ? "text-white" : "text-ink"
                  }`}
                >
                  {s.raw ? (
                    s.raw
                  ) : (
                    <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
                  )}
                </span>
                <p className={`text-[15px] font-medium ${dark ? "text-on-dark" : "text-muted"}`}>
                  {s.label}
                </p>
              </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- CtaBanner */
export async function CtaBanner({ heading, sub }: { heading?: string; sub?: string }) {
  const t = await getMessages();
  return (
    <section className="container-x py-24 [padding-block:96px]">
      <Reveal scale>
        <div className="brand-gradient-animated relative isolate overflow-hidden rounded-[32px] px-8 py-20 text-center sm:px-16">
          <PointerGlow />
          <div className="relative mx-auto flex max-w-[840px] flex-col items-center gap-8">
            <h2 className="font-display text-[clamp(32px,5.5vw,60px)] font-bold tracking-[-0.015em] uppercase leading-[1.02] text-white">
              {heading ?? t.sections.ctaHeading}
            </h2>
            <p className="max-w-[520px] text-[17px] leading-[1.6] text-white/85">{sub ?? t.sections.ctaSub}</p>
            <PillButton href="/contact" className="bg-white">
              {t.common.startProject}
            </PillButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
