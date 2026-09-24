import { Reveal, Tilt } from "./motion";
import { ImageFill, SectionLabel } from "./ui";
import { PARTNERS, PHOTOS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { getMessages } from "@/i18n/server";
import { fmt } from "@/i18n/format";

/* --------------------------------------------------------------- Strengths */
/** Why businesses choose QORLIQ, with the credential badges underneath. */
export async function Strengths({
  limit,
  dark = false,
  showBadges = true,
}: {
  limit?: number;
  dark?: boolean;
  showBadges?: boolean;
}) {
  const t = (await getMessages()).profile;
  const items = limit ? t.strengths.slice(0, limit) : t.strengths;
  return (
    <section className={dark ? "bg-ink" : "bg-cloud"}>
      <div className="container-x flex flex-col gap-14 [padding-block:120px]">
        <div className="flex flex-col gap-6">
          <Reveal><SectionLabel dark={dark}>{t.strengthsLabel}</SectionLabel></Reveal>
          <Reveal delay={80}>
            <h2 className={`max-w-[900px] font-display text-[clamp(28px,4.4vw,52px)] font-bold tracking-[-0.015em] uppercase leading-[1.05] ${dark ? "text-white" : "text-ink"}`}>
              {t.strengthsHeading}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className={`max-w-[760px] text-[17px] leading-[1.65] ${dark ? "text-on-dark" : "text-ink/75"}`}>{t.strengthsIntro}</p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 90} scale>
              <Tilt max={4}>
                <div className={`flex h-full flex-col gap-3 rounded-3xl p-8 ${dark ? "bg-white/[0.04]" : "bg-white"}`}>
                  <h3 className={`font-display text-[19px] font-bold uppercase ${dark ? "text-white" : "text-ink"}`}>{s.title}</h3>
                  <p className={`text-[15px] leading-[1.65] ${dark ? "text-on-dark" : "text-muted"}`}>{s.body}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        {showBadges ? (
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-3">
              {t.badges.map((b) => (
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
export async function ProjectAreas({ dark = false }: { dark?: boolean }) {
  const t = (await getMessages()).profile;
  return (
    <section className={dark ? "bg-ink" : "bg-white"}>
      <div className="container-x flex flex-col gap-12 [padding-block:120px] lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-6 lg:w-[380px] lg:shrink-0">
          <Reveal><SectionLabel dark={dark}>{t.projectAreasLabel}</SectionLabel></Reveal>
          <Reveal delay={80}>
            <h2 className={`font-display text-[clamp(28px,3.6vw,44px)] font-bold tracking-[-0.015em] uppercase leading-[1.05] ${dark ? "text-white" : "text-ink"}`}>
              {t.projectAreasHeading}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className={`max-w-[420px] text-[16px] leading-[1.7] ${dark ? "text-on-dark" : "text-muted"}`}>{t.projectAreasIntro}</p>
          </Reveal>
        </div>
        <div className="flex-1 border-s-2 border-accent ps-6 sm:ps-10">
          <ul className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
            {t.projectAreas.map((item, i) => (
              <Reveal as="li" key={item} delay={(i % 10) * 40}>
                <span className={`group flex items-center gap-3 py-2.5 text-[clamp(15px,1.5vw,17px)] transition-colors ${dark ? "text-on-dark hover:text-white" : "text-ink/80 hover:text-ink"}`}>
                  <span className="size-1.5 shrink-0 rotate-45 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">{item}</span>
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
/** Partners and platforms we work with. Names stay as the partners write them. */
export async function PartnerStrip({ dark = false }: { dark?: boolean }) {
  const t = (await getMessages()).profile;
  return (
    <section className={`border-y ${dark ? "border-white/10 bg-ink" : "border-line bg-cloud"}`}>
      <div className="container-x flex flex-col gap-8 [padding-block:64px]">
        <Reveal>
          <div className="flex flex-wrap items-center gap-4">
            <SectionLabel dark={dark}>{t.partnersLabel}</SectionLabel>
            <span className="font-display text-[13px] font-bold uppercase text-spark">{fmt(t.partnersCount, { n: PARTNERS.length })}</span>
          </div>
        </Reveal>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-8 sm:gap-x-14">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 6) * 60}>
              <img
                src={p.logo}
                alt={p.name}
                width={p.w}
                height={p.h}
                loading="lazy"
                decoding="async"
                className={`partner-logo${dark ? " partner-logo--dark" : ""}`}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- VisionMissionValues */
export async function VisionMissionValues() {
  const t = (await getMessages()).profile;
  return (
    <section className="bg-cloud">
      <div className="container-x flex flex-col gap-14 [padding-block:120px]">
        <Reveal><SectionLabel>{t.vmvLabel}</SectionLabel></Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {[
            { title: t.visionTitle, body: t.vision },
            { title: t.missionTitle, body: t.mission },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 100} scale>
              <Tilt max={4}>
                <div className="flex h-full flex-col gap-4 rounded-3xl bg-ink p-8 sm:p-10">
                  <h3 className="font-display text-[22px] font-bold tracking-[-0.015em] uppercase text-white">{b.title}</h3>
                  <p className="text-[16px] leading-[1.7] text-on-dark">{b.body}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-1 flex-col gap-8">
            <Reveal delay={60}>
              <h3 className="font-display text-[clamp(28px,3.6vw,44px)] font-bold tracking-[-0.015em] uppercase text-ink">{t.valuesHeading}</h3>
            </Reveal>
            <ul className="flex flex-col">
              {t.values.map((v, i) => (
                <Reveal as="li" key={v} delay={i * 60}>
                  <span className="group flex items-center gap-4 border-b border-line py-4">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-accent font-display text-[13px] font-bold text-ink">
                      ✓
                    </span>
                    <span className="font-display text-[clamp(16px,2vw,22px)] font-semibold tracking-[-0.015em] uppercase text-ink transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                      {v}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal clip delay={120} className="h-[360px] w-full lg:h-[520px] lg:w-[46%]">
            <ImageFill label={t.photos.culture} src={PHOTOS.culture.src} rounded="rounded-none" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- CeoMessage */
/** Typographic treatment — no portrait, since we have no photo of the CEO. */
export async function CeoMessage() {
  const t = (await getMessages()).profile;
  return (
    <section className="bg-white">
      <div className="container-x flex flex-col gap-12 [padding-block:120px] lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-6 lg:w-[380px] lg:shrink-0">
          <Reveal><SectionLabel>{t.ceoLabel}</SectionLabel></Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-[clamp(26px,3.4vw,42px)] font-bold tracking-[-0.015em] uppercase leading-[1.05] text-ink">{t.ceoHeading}</h2>
          </Reveal>
          <Reveal delay={140}>
            <figure className="rounded-3xl bg-ink p-8">
              <blockquote className="font-display text-[clamp(17px,1.9vw,21px)] font-semibold tracking-[-0.015em] leading-[1.4] text-white">
                &ldquo;{t.ceoQuote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-[12px] font-semibold uppercase tracking-widest text-accent">{t.ceoAttribution}</figcaption>
            </figure>
          </Reveal>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          {t.ceoBody.map((para, i) => (
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
export async function CompanyOverview({ dark = true }: { dark?: boolean }) {
  const m = await getMessages();
  const t = m.profile;
  const rows = [
    [t.overview.legalName, SITE.legal.entity],
    [t.overview.companyNo, SITE.legal.companyNo],
    [t.overview.vat, SITE.legal.vat],
    [t.overview.country, t.registrationCountry],
    [t.overview.established, SITE.legal.established],
    [t.overview.headquarters, m.company.location],
  ];
  return (
    <section className={dark ? "bg-ink" : "bg-cloud"}>
      <div className="container-x flex flex-col gap-10 [padding-block:96px]">
        <Reveal><SectionLabel dark={dark}>{t.overviewLabel}</SectionLabel></Reveal>
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(([k, v], i) => (
            <Reveal key={k} delay={(i % 3) * 80}>
              <div className={`flex flex-col gap-1 border-t pt-4 ${dark ? "border-white/15" : "border-line"}`}>
                <dt className={`text-[12px] font-semibold uppercase tracking-widest ${dark ? "text-white/60" : "text-muted"}`}>{k}</dt>
                <dd className={`text-[16px] font-medium ${dark ? "text-white" : "text-ink"}`}>{v}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
