import type { Metadata } from "next";
import Link from "@/i18n/link";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { PillButton, SectionLabel, ImageFill } from "@/components/ui";
import { Reveal, Tilt, Parallax } from "@/components/motion";
import { CtaBanner } from "@/components/sections";
import { getCaseStudy } from "@/lib/data";
import { getMessages } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()).meta.microsoftCsp;
  return pageMetadata("/microsoft-csp", t.title, t.description);
}

export default async function MicrosoftPage() {
  const [study, m] = await Promise.all([getCaseStudy("microsoft-cloud-productivity-transformation"), getMessages()]);
  const t = m.microsoftCsp;

  return (
    <PageShell>
      <PageHero eyebrow={t.eyebrow} titleLines={t.title} sub={t.sub}>
        <div className="mt-12">
          <PillButton href="/contact?service=microsoft-csp">{t.cta}</PillButton>
        </div>
      </PageHero>

      {/* Solutions grid */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-14 [padding-block:120px]">
          <Reveal><SectionLabel>{t.coverLabel}</SectionLabel></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.solutions.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 80} scale>
                <Tilt max={5}>
                  <div className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-white p-8">
                    <h2 className="font-display text-[20px] font-bold tracking-[-0.015em] uppercase leading-[1.1] text-ink">{s.title}</h2>
                    <p className="text-[15px] leading-[1.6] text-muted">{s.body}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How a rollout runs */}
      <section className="bg-ink">
        <div className="container-x flex flex-col gap-14 [padding-block:120px]">
          <Reveal><SectionLabel dark>{t.rolloutLabel}</SectionLabel></Reveal>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="flex flex-col gap-4">
                  <span className="font-display text-[20px] font-semibold tracking-[-0.015em] text-spark">{String(i + 1).padStart(2, "0")}</span>
                  <div className="h-px w-full bg-white/15" />
                  <h3 className="font-display text-[22px] font-bold tracking-[-0.015em] uppercase text-white">{s.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-on-dark">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related case study (written in the admin panel, so in its original language) */}
      {study ? (
        <section className="bg-white">
          <div className="container-x grid gap-12 [padding-block:120px] lg:grid-cols-2 lg:items-center lg:gap-20">
            <Reveal clip className="h-[340px] w-full lg:h-[480px]">
              <Parallax className="h-full w-full rounded-3xl">
                <ImageFill label={study.subtitle} src={study.image} rounded="rounded-none" />
              </Parallax>
            </Reveal>
            <div className="flex flex-col gap-6">
              <Reveal><SectionLabel>{t.caseStudyLabel}</SectionLabel></Reveal>
              <Reveal delay={80}>
                <h2 className="font-display text-[clamp(26px,3.4vw,40px)] font-bold tracking-[-0.015em] uppercase leading-[1.05] text-ink">{study.name}</h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-[17px] leading-[1.7] text-muted">{study.summary}</p>
              </Reveal>
              <Reveal delay={200}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="font-display text-[14px] font-bold uppercase text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {t.readCaseStudy}
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}

      <CtaBanner heading={t.ctaHeading} sub={t.ctaSub} />
    </PageShell>
  );
}
