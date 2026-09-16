import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { ImageFill, SectionLabel } from "@/components/ui";
import { Parallax, Reveal, ScrubText } from "@/components/motion";
import { CtaBanner } from "@/components/sections";
import { detailImage } from "@/lib/content";
import { getCaseStudies } from "@/lib/data";
import { pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCaseStudies()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const study = (await getCaseStudies()).find((c) => c.slug === slug);
  if (!study) return {};
  return pageMeta(study.subtitle, study.summary);
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const CASE_STUDIES = await getCaseStudies();
  const index = CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const study = CASE_STUDIES[index];
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
  const sections = [
    { label: "CLIENT CHALLENGE", body: study.challenge },
    { label: "SERVICES DELIVERED", body: study.delivered },
    { label: "SOLUTION PROVIDED", body: study.solution },
  ];

  return (
    <PageShell>
      <PageHero eyebrow={study.sector} titleLines={[study.name]} sub={study.subtitle}>
        <dl className="mt-14 grid gap-8 border-t border-white/20 pt-8 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <dt className="text-[12px] font-semibold uppercase tracking-widest text-white/60">Industry</dt>
            <dd className="text-[16px] font-medium text-white">{study.industry}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-[12px] font-semibold uppercase tracking-widest text-white/60">Focus</dt>
            <dd className="text-[16px] font-medium text-white">{study.tags.join(" · ")}</dd>
          </div>
        </dl>
      </PageHero>

      {/* Hero image — morphs from the card that was clicked */}
      <div className="bg-white">
        <div className="container-x pt-16">
          <Link
            href="/case-studies"
            className="font-display text-[13px] font-bold uppercase text-muted transition-colors hover:text-accent"
          >
            ← All case studies
          </Link>
          <ViewTransition name={`work-${study.slug}`} share="morph" default="none">
            <div className="mt-6 h-[clamp(320px,60vw,680px)] w-full overflow-hidden rounded-3xl">
              <ImageFill label={study.subtitle} src={study.image} seed={index} priority />
            </div>
          </ViewTransition>
        </div>
      </div>

      {/* Challenge / delivered / solution */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-16 [padding-block:120px]">
          {sections.map((s, i) => (
            <div key={s.label} className="flex flex-col gap-8 lg:flex-row lg:gap-20">
              <Reveal className="lg:w-[320px] lg:shrink-0">
                <SectionLabel>{s.label}</SectionLabel>
              </Reveal>
              {i === 0 ? (
                <ScrubText
                  className="max-w-[900px] font-display text-[clamp(20px,2.6vw,32px)] font-semibold tracking-[-0.015em] leading-[1.3] text-ink"
                  parts={[{ text: s.body }]}
                />
              ) : (
                <Reveal delay={80}>
                  <p className="max-w-[900px] text-[17px] leading-[1.75] text-ink/80">{s.body}</p>
                </Reveal>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cloud">
        <div className="container-x grid gap-6 [padding-block:96px] md:grid-cols-2">
          <Reveal clip className="h-[420px] md:h-[560px]">
            <Parallax className="h-full w-full rounded-3xl">
              <ImageFill label={detailImage(index).alt} src={detailImage(index).src} rounded="rounded-none" />
            </Parallax>
          </Reveal>
          <div className="grid gap-6">
            <Reveal clip delay={150} className="h-[260px]">
              <Parallax strength={30} className="h-full w-full rounded-3xl">
                <ImageFill label={detailImage(index + 1).alt} src={detailImage(index + 1).src} rounded="rounded-none" />
              </Parallax>
            </Reveal>
            <Reveal clip delay={300} className="h-[260px]">
              <Parallax strength={30} className="h-full w-full rounded-3xl">
                <ImageFill label={detailImage(index + 2).alt} src={detailImage(index + 2).src} rounded="rounded-none" />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-ink">
        <div className="container-x flex flex-col gap-10 [padding-block:120px] lg:flex-row lg:gap-20">
          <Reveal className="lg:w-[320px] lg:shrink-0">
            <SectionLabel dark>RESULTS ACHIEVED</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-[900px] font-display text-[clamp(20px,2.6vw,32px)] font-semibold tracking-[-0.015em] leading-[1.35] text-white">
              {study.results}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Next case study */}
      <section className="bg-white">
        <Link
          href={`/case-studies/${next.slug}`}
          data-cursor="Next"
          className="group container-x flex flex-col gap-8 [padding-block:96px]"
        >
          <div className="flex items-center justify-between">
            <SectionLabel>NEXT CASE STUDY</SectionLabel>
            <span className="text-[13px] font-semibold uppercase tracking-wide text-muted">
              {String(CASE_STUDIES.indexOf(next) + 1).padStart(2, "0")} / {String(CASE_STUDIES.length).padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <span className="min-w-0 font-display text-[clamp(24px,4.4vw,64px)] font-semibold tracking-[-0.015em] uppercase leading-[0.95] text-ink transition-colors duration-300 group-hover:text-accent">
              {next.name}
            </span>
            <span className="shrink-0 font-display text-[clamp(30px,5vw,72px)] leading-[0.9] text-accent transition-transform duration-500 group-hover:translate-x-3">
              →
            </span>
          </div>
          <ViewTransition name={`work-${next.slug}`} share="morph" default="none">
            <div className="h-[220px] w-full overflow-hidden rounded-3xl md:h-[300px]">
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                <ImageFill label={next.subtitle} src={next.image} seed={CASE_STUDIES.indexOf(next)} />
              </div>
            </div>
          </ViewTransition>
        </Link>
      </section>

      <CtaBanner
        heading="WANT A PROJECT LIKE THIS?"
        sub="Tell us what you're working towards and we'll show you how we'd approach it."
      />
    </PageShell>
  );
}
