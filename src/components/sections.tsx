import { SectionLabel, PillButton } from "./ui";
import { Reveal, Counter, HorizontalScroll, PointerGlow, Tilt } from "./motion";

/* -------------------------------------------------------------- DesignProcess */
export type ProcessStep = { no: string; title: string; body: string };

/** Process steps; on desktop the steps scroll sideways while the section is pinned. */
export function DesignProcess({
  steps,
  label = "HOW WE WORK",
  heading = "OUR DESIGN THINKING PROCESS",
  dark = false,
}: {
  steps: ProcessStep[];
  label?: string;
  heading?: string;
  dark?: boolean;
}) {
  const header = (
    <div className="container-x flex flex-col gap-10">
      <Reveal><SectionLabel dark={dark}>{label}</SectionLabel></Reveal>
      <Reveal delay={80}>
        <h2
          className={`max-w-[900px] font-display text-[clamp(32px,5vw,56px)] font-bold uppercase leading-[1.05] ${
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
      <div className="[padding-block:120px] lg:[padding-block:0]">
        <HorizontalScroll
          header={header}
          gridClassName="container-x grid gap-x-10 gap-y-12 sm:grid-cols-2"
          trackClassName="gap-6 pl-[clamp(20px,5.5vw,80px)] pr-[clamp(20px,5.5vw,80px)]"
        >
          {steps.map((s, i) => (
            <Reveal key={s.no} delay={i * 90} className="lg:w-[min(36vw,520px)] lg:shrink-0">
              <div
                className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl p-8 lg:min-h-[340px] lg:justify-end lg:p-10 ${
                  dark ? "bg-white/[0.04]" : "bg-white"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-4 -top-8 font-display text-[160px] font-bold leading-none transition-transform duration-700 group-hover:-translate-y-2 ${
                    dark ? "text-white/[0.05]" : "text-ink/[0.05]"
                  }`}
                >
                  {s.no}
                </span>
                <span className="font-display text-[20px] font-semibold tracking-[-0.015em] text-accent">{s.no}</span>
                <div
                  className={`h-px w-full origin-left transition-transform duration-500 group-hover:scale-x-50 ${
                    dark ? "bg-white/15" : "bg-line"
                  }`}
                />
                <h3 className={`font-display text-[clamp(22px,2.2vw,28px)] font-semibold tracking-[-0.015em] uppercase ${dark ? "text-white" : "text-ink"}`}>
                  {s.title}
                </h3>
                <p className={`max-w-[420px] text-[15px] leading-[1.6] ${dark ? "text-on-dark" : "text-muted"}`}>
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </HorizontalScroll>
      </div>
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
  label = "METRICS",
  stats,
  dark = false,
}: {
  label?: string;
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
                  <span className="w-fit rounded-full bg-accent/10 px-3 py-1 font-display text-[12px] font-bold uppercase text-accent">
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

/* ---------------------------------------------------------------------- Awards */
export type Award = { year: string; title: string; status: string };

export function Awards({
  label = "RECOGNITION",
  tag = "( AWARDS! )",
  awards,
  dark = true,
}: {
  label?: string;
  tag?: string;
  awards: Award[];
  dark?: boolean;
}) {
  return (
    <section className={dark ? "bg-ink" : "bg-cloud"}>
      <div className="container-x flex flex-col gap-12 py-24 [padding-block:96px]">
        <Reveal>
          <div className="flex items-center gap-4">
            <SectionLabel dark={dark}>{label}</SectionLabel>
            <span className="font-display text-[13px] font-bold uppercase text-accent">{tag}</span>
          </div>
        </Reveal>
        <div className="flex flex-col">
          {awards.map((a, i) => (
            <Reveal key={i} delay={i * 70}>
              <div
                className={`group grid grid-cols-[80px_1fr_auto] items-center gap-4 border-t py-7 transition-colors sm:gap-8 ${
                  dark ? "border-white/10 hover:bg-white/[0.03]" : "border-line hover:bg-white"
                }`}
              >
                <span className="font-display text-[18px] font-bold text-accent">{a.year}</span>
                <span
                  className={`font-display text-[clamp(18px,2.4vw,28px)] font-bold uppercase transition-transform duration-300 group-hover:translate-x-2 ${
                    dark ? "text-white" : "text-ink"
                  }`}
                >
                  {a.title}
                </span>
                <span
                  className={`text-[13px] font-semibold uppercase tracking-wide ${
                    dark ? "text-on-dark" : "text-muted"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- CtaBanner */
export function CtaBanner({
  heading = "READY TO BUILD SOMETHING EXCEPTIONAL?",
  sub = "Let's turn your vision into a digital experience that performs.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="container-x py-24 [padding-block:96px]">
      <Reveal scale>
        <div className="brand-gradient-animated relative isolate overflow-hidden rounded-[32px] px-8 py-20 text-center sm:px-16">
          <PointerGlow />
          <div className="relative mx-auto flex max-w-[840px] flex-col items-center gap-8">
            <h2 className="font-display text-[clamp(32px,5.5vw,60px)] font-semibold tracking-[-0.015em] uppercase leading-[1.02] text-white">
              {heading}
            </h2>
            <p className="max-w-[520px] text-[17px] leading-[1.6] text-white/85">{sub}</p>
            <PillButton href="/contact" className="bg-white">
              Start a Project
            </PillButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
