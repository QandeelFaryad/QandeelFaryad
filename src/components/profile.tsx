import { Reveal, Tilt } from "./motion";
import { ImageFill, SectionLabel } from "./ui";
import {
  BADGES,
  CEO_MESSAGE,
  MISSION,
  PARTNERS,
  PHOTOS,
  PROJECT_AREAS,
  STRENGTHS,
  VALUES,
  VISION,
} from "@/lib/content";
import { SITE } from "@/lib/site";

/* --------------------------------------------------------------- Strengths */
/** Why businesses choose QORLIQ, with the credential badges underneath. */
export function Strengths({
  limit,
  dark = false,
  label = "WHY CHOOSE US",
  heading = "WHY BUSINESSES CHOOSE QORLIQ",
  showBadges = true,
}: {
  limit?: number;
  dark?: boolean;
  label?: string;
  heading?: string;
  showBadges?: boolean;
}) {
  const items = limit ? STRENGTHS.slice(0, limit) : STRENGTHS;
  return (
    <section className={dark ? "bg-ink" : "bg-cloud"}>
      <div className="container-x flex flex-col gap-14 [padding-block:120px]">
        <div className="flex flex-col gap-6">
          <Reveal><SectionLabel dark={dark}>{label}</SectionLabel></Reveal>
          <Reveal delay={80}>
            <h2 className={`max-w-[900px] font-display text-[clamp(28px,4.4vw,52px)] font-semibold tracking-[-0.015em] uppercase leading-[1.05] ${dark ? "text-white" : "text-ink"}`}>
              {heading}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className={`max-w-[760px] text-[17px] leading-[1.65] ${dark ? "text-on-dark" : "text-ink/75"}`}>
              QORLIQ is built for businesses that need professional digital services with clear
              communication, practical solutions, and reliable delivery.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 90} scale>
              <Tilt max={4}>
                <div className={`flex h-full flex-col gap-3 rounded-3xl p-8 ${dark ? "bg-white/[0.04]" : "bg-white"}`}>
                  <h3 className={`font-display text-[19px] font-bold uppercase ${dark ? "text-white" : "text-ink"}`}>
                    {s.title}
                  </h3>
                  <p className={`text-[15px] leading-[1.65] ${dark ? "text-on-dark" : "text-muted"}`}>{s.body}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        {showBadges ? (
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-3">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className={`rounded-full border px-4 py-2 font-display text-[12px] font-bold uppercase ${
                    dark ? "border-white/20 text-white" : "border-line text-ink"
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ ProjectAreas */
/** The kinds of project we take on. */
export function ProjectAreas({ dark = false }: { dark?: boolean }) {
  return (
    <section className={dark ? "bg-ink" : "bg-white"}>
      <div className="container-x flex flex-col gap-12 [padding-block:120px] lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-6 lg:w-[380px] lg:shrink-0">
          <Reveal><SectionLabel dark={dark}>OUR PROJECTS</SectionLabel></Reveal>
          <Reveal delay={80}>
            <h2 className={`font-display text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.015em] uppercase leading-[1.05] ${dark ? "text-white" : "text-ink"}`}>
              Our project areas
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className={`max-w-[420px] text-[16px] leading-[1.7] ${dark ? "text-on-dark" : "text-muted"}`}>
              Each project is planned according to the client&apos;s business goals, target audience,
              and growth needs.
            </p>
          </Reveal>
        </div>
        <div className="flex-1 border-l-2 border-accent pl-6 sm:pl-10">
          <ul className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
            {PROJECT_AREAS.map((item, i) => (
              <Reveal as="li" key={item} delay={(i % 10) * 40}>
                <span className={`group flex items-center gap-3 py-2.5 text-[clamp(15px,1.5vw,17px)] transition-colors ${dark ? "text-on-dark hover:text-white" : "text-ink/80 hover:text-ink"}`}>
                  <span className="size-1.5 shrink-0 rotate-45 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{item}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ PartnerStrip */
/** Partners and platforms we work with. */
export function PartnerStrip({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`border-y ${dark ? "border-white/10 bg-ink" : "border-line bg-cloud"}`}>
      <div className="container-x flex flex-col gap-8 [padding-block:64px]">
        <Reveal>
          <div className="flex flex-wrap items-center gap-4">
            <SectionLabel dark={dark}>PARTNERSHIPS & CERTIFICATIONS</SectionLabel>
            <span className="font-display text-[13px] font-bold uppercase text-accent">
              ( {PARTNERS.length} partners )
            </span>
          </div>
        </Reveal>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
          {PARTNERS.map((p, i) => (
            <Reveal key={p} delay={(i % 6) * 60}>
              <span className={`font-display text-[clamp(16px,1.8vw,22px)] font-semibold tracking-[-0.015em] uppercase transition-colors ${dark ? "text-white/40 hover:text-white" : "text-ink/35 hover:text-ink"}`}>
                {p}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- VisionMissionValues */
export function VisionMissionValues() {
  return (
    <section className="bg-cloud">
      <div className="container-x flex flex-col gap-14 [padding-block:120px]">
        <Reveal><SectionLabel>VISION, MISSION & VALUES</SectionLabel></Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { title: "OUR VISION", body: VISION },
            { title: "OUR MISSION", body: MISSION },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 100} scale>
              <Tilt max={4}>
                <div className="flex h-full flex-col gap-4 rounded-3xl bg-ink p-8 sm:p-10">
                  <h3 className="font-display text-[22px] font-semibold tracking-[-0.015em] uppercase text-white">{b.title}</h3>
                  <p className="text-[16px] leading-[1.7] text-on-dark">{b.body}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-1 flex-col gap-8">
            <Reveal delay={60}>
              <h3 className="font-display text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.015em] uppercase text-ink">
                Our core values
              </h3>
            </Reveal>
            <ul className="flex flex-col">
              {VALUES.map((v, i) => (
                <Reveal as="li" key={v} delay={i * 60}>
                  <span className="group flex items-center gap-4 border-b border-line py-4">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-accent font-display text-[13px] font-bold text-ink">
                      ✓
                    </span>
                    <span className="font-display text-[clamp(16px,2vw,22px)] font-semibold tracking-[-0.015em] uppercase text-ink transition-transform duration-300 group-hover:translate-x-1">
                      {v}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal clip delay={120} className="h-[360px] w-full lg:h-[520px] lg:w-[46%]">
            <ImageFill label={PHOTOS.culture.alt} src={PHOTOS.culture.src} rounded="rounded-none" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- CeoMessage */
/** Typographic treatment — no portrait, since we have no photo of the CEO. */
export function CeoMessage() {
  return (
    <section className="bg-white">
      <div className="container-x flex flex-col gap-12 [padding-block:120px] lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-6 lg:w-[380px] lg:shrink-0">
          <Reveal><SectionLabel>CEO MESSAGE</SectionLabel></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-[clamp(26px,3.4vw,42px)] font-semibold tracking-[-0.015em] uppercase leading-[1.05] text-ink">
              {CEO_MESSAGE.heading}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <figure className="rounded-3xl bg-ink p-8">
              <blockquote className="font-display text-[clamp(17px,1.9vw,21px)] font-semibold tracking-[-0.015em] leading-[1.4] text-white">
                &ldquo;{CEO_MESSAGE.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-[12px] font-semibold uppercase tracking-widest text-accent">
                {CEO_MESSAGE.attribution}
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          {CEO_MESSAGE.body.map((para, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="max-w-[720px] text-[17px] leading-[1.75] text-ink/80">{para}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- CompanyOverview */
/** Registered company details. */
export function CompanyOverview({ dark = true }: { dark?: boolean }) {
  const rows = [
    ["Legal company name", SITE.legal.entity],
    ["Company reg. no.", SITE.legal.companyNo],
    ["VAT registration", SITE.legal.vat],
    ["Country of registration", SITE.legal.country],
    ["Year established", SITE.legal.established],
    ["Headquarters", SITE.location],
  ];
  return (
    <section className={dark ? "bg-ink" : "bg-cloud"}>
      <div className="container-x flex flex-col gap-10 [padding-block:96px]">
        <Reveal><SectionLabel dark={dark}>COMPANY OVERVIEW</SectionLabel></Reveal>
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(([k, v], i) => (
            <Reveal key={k} delay={(i % 3) * 80}>
              <div className={`flex flex-col gap-1 border-t pt-4 ${dark ? "border-white/15" : "border-line"}`}>
                <dt className={`text-[12px] font-semibold uppercase tracking-widest ${dark ? "text-white/60" : "text-muted"}`}>
                  {k}
                </dt>
                <dd className={`text-[16px] font-medium ${dark ? "text-white" : "text-ink"}`}>{v}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
