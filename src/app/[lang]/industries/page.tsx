import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { SectionLabel } from "@/components/ui";
import { Reveal, Tilt } from "@/components/motion";
import { CtaBanner } from "@/components/sections";
import { PartnerStrip } from "@/components/profile";
import { getStats } from "@/lib/data";
import { getMessages } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()).meta.industries;
  return pageMetadata("/industries", t.title, t.description);
}

const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function IndustriesPage() {
  const [stats, m] = await Promise.all([getStats(), getMessages()]);
  const t = m.industries;
  return (
    <PageShell>
      <PageHero
        eyebrow={t.eyebrow}
        titleLines={t.title}
        sub={t.sub}
        stats={[
          { value: stats.projects, label: t.projectsDelivered },
          { value: stats.industries, label: t.industriesServed },
        ]}
      />

      {/* Sector grid */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-14 py-24 [padding-block:96px]">
          <Reveal>
            <div className="flex items-center gap-4">
              <SectionLabel>{t.sectorLabel}</SectionLabel>
              <span className="font-display text-[13px] font-bold uppercase text-spark">{fmt(t.sectorCount, { n: stats.industries })}</span>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {t.sectors.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 80} scale>
                <Tilt max={4}>
                  <div className="group flex h-full flex-col gap-5 rounded-3xl border border-line bg-white p-8 transition-colors duration-300 hover:border-accent">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[20px] font-semibold tracking-[-0.015em] text-spark">{pad(i)}</span>
                    </div>
                    <h3 className="font-display text-[clamp(20px,2.4vw,28px)] font-bold tracking-[-0.015em] uppercase text-ink transition-colors group-hover:text-accent">
                      {s.title}
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-ink/75">{s.body}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      {s.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-line px-3 py-1 text-[12px] font-medium uppercase text-ink/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-ink">
        <div className="container-x flex flex-col gap-14 py-24 [padding-block:96px]">
          <Reveal><SectionLabel dark>{t.whyLabel}</SectionLabel></Reveal>
          <Reveal delay={80}>
            <h2 className="max-w-[820px] font-display text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.015em] leading-[1.1] text-white">{t.whyHeading}</h2>
          </Reveal>
          <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {t.why.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <div className="flex flex-col gap-4">
                  <span className="font-display text-[20px] font-semibold tracking-[-0.015em] text-spark">{pad(i)}</span>
                  <h3 className="font-display text-[22px] font-bold tracking-[-0.015em] uppercase text-white">{w.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-on-dark">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PartnerStrip />

      <CtaBanner heading={t.ctaHeading} />
    </PageShell>
  );
}
