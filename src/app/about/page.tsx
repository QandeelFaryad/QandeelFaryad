import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { SectionLabel, ImageFill } from "@/components/ui";
import { Reveal, ScrubText, Parallax } from "@/components/motion";
import { StatsCounters, CtaBanner } from "@/components/sections";
import { CeoMessage, CompanyOverview, PartnerStrip, VisionMissionValues } from "@/components/profile";
import { ABOUT, PHOTOS } from "@/lib/content";
import { SITE, pageMeta } from "@/lib/site";
import { getStats } from "@/lib/data";

export const metadata = pageMeta(
  "About",
  "QORLIQ is a digital services brand operated by HOORAB GROUP OF COMPANIES LTD, helping businesses grow through practical, professional digital solutions.",
);

export default async function AboutPage() {
  const stats = await getStats();
  return (
    <PageShell>
      <PageHero
        eyebrow="ABOUT THE COMPANY"
        titleLines={["WHO WE ARE"]}
        sub={ABOUT.whoWeAre[0]}
      />

      {/* Purpose */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-12 [padding-block:120px] lg:flex-row lg:gap-20">
          <div className="lg:w-[360px] lg:shrink-0">
            <Reveal><SectionLabel>OUR PURPOSE</SectionLabel></Reveal>
            <ScrubText
              as="h2"
              className="mt-6 font-display text-[clamp(26px,3.6vw,42px)] font-semibold tracking-[-0.015em] leading-[1.1] text-ink"
              parts={[{ text: "Helping businesses grow through technology" }]}
            />
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <Reveal>
              <p className="text-[17px] leading-[1.75] text-ink/80">{ABOUT.whoWeAre[1]}</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-[17px] leading-[1.75] text-ink/80">{ABOUT.whoWeAre[2]}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story + what we do */}
      <section className="bg-cloud">
        <div className="container-x flex flex-col gap-14 [padding-block:120px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-6">
              <Reveal><SectionLabel>OUR STORY</SectionLabel></Reveal>
              <Reveal delay={80}>
                <p className="text-[16px] leading-[1.75] text-ink/80">{ABOUT.ourStory}</p>
              </Reveal>
            </div>
            <div className="flex flex-col gap-6">
              <Reveal><SectionLabel>WHAT WE DO</SectionLabel></Reveal>
              <Reveal delay={80}>
                <p className="text-[16px] leading-[1.75] text-ink/80">{ABOUT.whatWeDo}</p>
              </Reveal>
            </div>
          </div>
          <Reveal clip className="h-[320px] w-full lg:h-[460px]">
            <Parallax className="h-full w-full rounded-3xl">
              <ImageFill label={PHOTOS.team.alt} src={PHOTOS.team.src} rounded="rounded-none" />
            </Parallax>
          </Reveal>
        </div>
      </section>

      <VisionMissionValues />

      <StatsCounters
        label="COMPANY STATISTICS"
        stats={[
          { tag: "( Delivered )", value: stats.projects, label: "Projects completed" },
          { tag: "( Global )", value: stats.countries, label: "Countries served" },
          { tag: "( Sectors )", value: stats.industries, label: "Industries served" },
          { tag: "( Rated )", value: stats.satisfaction, suffix: "%", label: "Client satisfaction rate", accent: true },
          { tag: "( Since )", raw: SITE.legal.established, value: 0, label: "Year established" },
        ]}
      />

      <CeoMessage />
      <CompanyOverview />
      <PartnerStrip />
      <CtaBanner heading="LET'S BUILD YOUR DIGITAL FUTURE TOGETHER" />
    </PageShell>
  );
}
