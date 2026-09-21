import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { SectionLabel, ImageFill } from "@/components/ui";
import { Reveal, ScrubText, Parallax } from "@/components/motion";
import { StatsCounters, CtaBanner } from "@/components/sections";
import { CeoMessage, CompanyOverview, PartnerStrip, VisionMissionValues } from "@/components/profile";
import { PHOTOS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { getStats } from "@/lib/data";
import { getMessages } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()).meta.about;
  return pageMetadata("/about", t.title, t.description);
}

export default async function AboutPage() {
  const [stats, m] = await Promise.all([getStats(), getMessages()]);
  const t = m.about;
  return (
    <PageShell>
      <PageHero eyebrow={t.eyebrow} titleLines={t.title} sub={t.whoWeAre[0]} />

      {/* Purpose */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-12 [padding-block:120px] lg:flex-row lg:gap-20">
          <div className="lg:w-[360px] lg:shrink-0">
            <Reveal><SectionLabel>{t.purposeLabel}</SectionLabel></Reveal>
            <ScrubText
              as="h2"
              className="mt-6 font-display text-[clamp(26px,3.6vw,42px)] font-bold tracking-[-0.015em] leading-[1.1] text-ink"
              parts={[{ text: t.purposeHeading }]}
            />
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <Reveal>
              <p className="text-[17px] leading-[1.75] text-ink/80">{t.whoWeAre[1]}</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-[17px] leading-[1.75] text-ink/80">{t.whoWeAre[2]}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story + what we do */}
      <section className="bg-cloud">
        <div className="container-x flex flex-col gap-14 [padding-block:120px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-6">
              <Reveal><SectionLabel>{t.storyLabel}</SectionLabel></Reveal>
              <Reveal delay={80}>
                <p className="text-[16px] leading-[1.75] text-ink/80">{t.ourStory}</p>
              </Reveal>
            </div>
            <div className="flex flex-col gap-6">
              <Reveal><SectionLabel>{t.whatWeDoLabel}</SectionLabel></Reveal>
              <Reveal delay={80}>
                <p className="text-[16px] leading-[1.75] text-ink/80">{t.whatWeDo}</p>
              </Reveal>
            </div>
          </div>
          <Reveal clip className="h-[320px] w-full lg:h-[460px]">
            <Parallax className="h-full w-full rounded-3xl">
              <ImageFill label={m.profile.photos.team} src={PHOTOS.team.src} rounded="rounded-none" />
            </Parallax>
          </Reveal>
        </div>
      </section>

      <VisionMissionValues />

      <StatsCounters
        label={t.statsLabel}
        stats={[
          { tag: t.statTags.delivered, value: stats.projects, label: t.stats.projectsCompleted },
          { tag: t.statTags.global, value: stats.countries, label: t.stats.countriesServed },
          { tag: t.statTags.sectors, value: stats.industries, label: t.stats.industriesServed },
          { tag: t.statTags.rated, value: stats.satisfaction, suffix: "%", label: t.stats.satisfactionRate, accent: true },
          { tag: t.statTags.since, raw: SITE.legal.established, value: 0, label: t.stats.established },
        ]}
      />

      <CeoMessage />
      <CompanyOverview />
      <PartnerStrip />
      <CtaBanner heading={m.sections.ctaFuture} />
    </PageShell>
  );
}
