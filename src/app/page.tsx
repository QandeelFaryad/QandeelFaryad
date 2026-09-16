import Link from "next/link";
import { ViewTransition } from "react";
import PageShell from "@/components/PageShell";
import { PillButton, SectionLabel, ImageFill, Marquee } from "@/components/ui";
import { Reveal, Counter, SplitReveal, Parallax, PointerGlow, ScrollFade, ScrubText, Tilt } from "@/components/motion";
import { StatsCounters, CtaBanner } from "@/components/sections";
import { PartnerStrip, ProjectAreas, Strengths } from "@/components/profile";
import { ArrowDownRight } from "@/components/icons";
import { ABOUT, BADGES, CASE_STUDIES, PHOTOS, SERVICES } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function HomePage() {
  return (
    <PageShell>
      {/* ------------------------------------------------------------- HERO */}
      <section className="brand-gradient-animated relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden px-[clamp(20px,5.5vw,80px)] pb-20 pt-[clamp(140px,20vh,220px)]">
        <PointerGlow />
        <ScrollFade>
          <h1 className="relative flex flex-col gap-3">
            {["DIGITAL SOLUTIONS", "FOR MODERN", "BUSINESS GROWTH"].map((line, i) => (
              <SplitReveal
                key={line}
                text={line}
                delay={i * 140}
                className="block font-display text-[clamp(26px,7.6vw,110px)] font-semibold tracking-[-0.015em] leading-[0.95] text-white"
              />
            ))}
          </h1>
        </ScrollFade>

        <div className="mt-16 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <Reveal delay={200} className="w-full max-w-[520px]">
            <div className="h-px w-full bg-white/40" />
            <div className="mt-6 flex items-start gap-4">
              <ArrowDownRight className="size-6 shrink-0 text-spark" />
              <p className="text-[18px] leading-[1.5] text-white">
                {SITE.legal.brandLine}, supporting businesses with modern websites, e-commerce
                platforms, applications, digital marketing, brand identity, automation, AI, and
                Microsoft cloud services.
              </p>
            </div>
          </Reveal>

          <Reveal delay={320} scale className="w-full max-w-[380px]">
            <div className="animate-float rounded-[24px] rounded-br-[4px] bg-white p-6">
              <p className="font-display text-[13px] font-bold uppercase tracking-wide text-accent">
                Company at a glance
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {[
                  { value: SITE.stats.projects, label: "Projects completed" },
                  { value: SITE.stats.countries, label: "Countries served" },
                  { value: SITE.stats.industries, label: "Industries served" },
                  { value: SITE.stats.satisfaction, suffix: "%", label: "Client satisfaction" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-[28px] font-semibold tracking-[-0.015em] leading-none text-ink">
                      <Counter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 text-[12px] leading-[1.3] text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ WHO WE ARE */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-16 [padding-block:120px]">
          <Reveal><SectionLabel>WHO WE ARE</SectionLabel></Reveal>
          <ScrubText
            className="max-w-[1120px] font-display text-[clamp(24px,4vw,52px)] font-semibold tracking-[-0.015em] leading-[1.1] text-ink"
            parts={[
              { text: "QORLIQ is a digital services brand created to help businesses grow in a fast-changing digital world." },
              { text: "We deliver practical, professional, and result-driven solutions for startups, small businesses, and established organisations.", className: "font-medium text-[#a8b0cc]" },
            ]}
          />
          <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-center lg:gap-20">
            <Reveal clip className="h-[420px] w-full lg:h-[560px] lg:w-[520px] lg:shrink-0">
              <Parallax className="h-full w-full rounded-3xl">
                <ImageFill label={PHOTOS.team.alt} src={PHOTOS.team.src} rounded="rounded-none" />
              </Parallax>
            </Reveal>
            <Reveal delay={120} className="flex w-full flex-col gap-10 lg:max-w-[560px]">
              <p className="text-[17px] leading-[1.7] text-ink/80">{ABOUT.whoWeAre[1]}</p>
              <div className="h-px w-full bg-line" />
              <div className="flex flex-wrap gap-10">
                <div className="flex flex-col gap-2">
                  <span className="font-display text-[clamp(40px,6vw,60px)] font-semibold tracking-[-0.015em] text-accent">
                    <Counter value={SITE.stats.satisfaction} suffix="%" />
                  </span>
                  <span className="text-[15px] font-medium text-ink">Client satisfaction rate</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-display text-[clamp(40px,6vw,60px)] font-semibold tracking-[-0.015em] text-ink">
                    <Counter value={SITE.stats.projects} />
                  </span>
                  <span className="text-[15px] font-medium text-ink">
                    Projects across {SITE.stats.countries} countries
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {BADGES.slice(0, 4).map((b) => (
                  <span key={b} className="rounded-full border border-line px-4 py-2 text-[12px] font-semibold uppercase text-ink/70">
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- MARQUEE */}
      <Marquee dark items={["WEBSITES", "E-COMMERCE", "APPLICATIONS", "MICROSOFT CSP", "CRM", "LEAD GENERATION", "AI"]} />

      {/* -------------------------------------------------------- SERVICES */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-16 [padding-block:120px]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionLabel>PRODUCTS & SERVICES</SectionLabel>
              <PillButton href="/services">All Services</PillButton>
            </div>
          </Reveal>
          <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
            <div className="flex flex-1 flex-col">
              {SERVICES.map((s, i) => (
                <Reveal key={s.no} delay={i * 60}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="group flex flex-col gap-4 border-b border-[#e7e7ea] py-8"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                      <div className="flex min-w-0 items-center gap-6">
                        <span className="font-display text-[18px] font-bold text-accent">{s.no}</span>
                        <h3 className="font-display text-[clamp(20px,2.3vw,30px)] font-semibold tracking-[-0.015em] leading-[1.05] text-ink transition-colors group-hover:text-accent">
                          {s.title}
                        </h3>
                      </div>
                      <span className="text-ink/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">↗</span>
                    </div>
                    <p className="max-w-[560px] text-[15px] leading-[1.6] text-ink/70">{s.body}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="h-[420px] w-full lg:sticky lg:top-24 lg:h-[600px] lg:w-[420px] lg:shrink-0">
              <Reveal clip className="h-full w-full overflow-hidden rounded-3xl">
                <ImageFill label={PHOTOS.studio.alt} src={PHOTOS.studio.src} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- MICROSOFT SOLUTIONS */}
      <section className="bg-ink">
        <div className="container-x flex flex-col gap-10 [padding-block:96px] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-6 lg:max-w-[640px]">
            <Reveal><SectionLabel dark>MICROSOFT CSP</SectionLabel></Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-[clamp(28px,4.4vw,52px)] font-semibold tracking-[-0.015em] uppercase leading-[1.05] text-white">
                Microsoft licensing, Azure, and a secure cloud workplace
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-[17px] leading-[1.65] text-on-dark">
                As a Cloud Solution Provider partner we handle licensing, business email, Teams,
                SharePoint, Defender, and cloud migration — set up and supported so your team can
                work securely from anywhere.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <PillButton href="/microsoft-csp">Explore Microsoft CSP</PillButton>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- CASE STUDIES */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-14 [padding-block:120px]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionLabel>CASE STUDIES</SectionLabel>
              <PillButton href="/case-studies">View Case Studies</PillButton>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            {CASE_STUDIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 90} scale>
                <Link href={`/case-studies/${c.slug}`} data-cursor="View" className="group flex h-full flex-col gap-5">
                  <ViewTransition name={`work-${c.slug}`} share="morph" default="none">
                    <div className="h-[320px] w-full overflow-hidden rounded-3xl">
                      <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                        <ImageFill label={c.subtitle} src={c.image} seed={i} />
                      </div>
                    </div>
                  </ViewTransition>
                  <div>
                    <p className="font-display text-[13px] font-bold uppercase tracking-wide text-accent">{c.sector}</p>
                    <h3 className="mt-2 font-display text-[clamp(20px,2.4vw,28px)] font-semibold tracking-[-0.015em] uppercase leading-[1.1] text-ink transition-colors group-hover:text-accent">
                      {c.name}
                    </h3>
                  </div>
                  <p className="text-[15px] leading-[1.6] text-muted">{c.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line px-3 py-1 text-[12px] font-medium uppercase text-ink/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- METRICS */}
      <StatsCounters
        label="COMPANY AT A GLANCE"
        stats={[
          { tag: "( Delivered )", value: SITE.stats.projects, label: "Projects completed" },
          { tag: "( Global )", value: SITE.stats.countries, label: "Countries served" },
          { tag: "( Reach )", value: SITE.stats.industries, label: "Industries served" },
        ]}
      />

      <ProjectAreas />

      <Strengths limit={4} />

      <PartnerStrip />

      <CtaBanner
        heading="LET'S BUILD YOUR DIGITAL FUTURE TOGETHER"
        sub="Whether you need a website, online store, application, branding, digital marketing, automation, AI, or Microsoft solutions, our team is ready to help."
      />
    </PageShell>
  );
}
