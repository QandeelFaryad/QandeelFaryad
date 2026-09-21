import type { Metadata } from "next";
import Link from "@/i18n/link";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { SectionLabel, ImageFill, PillButton } from "@/components/ui";
import { Reveal, Parallax, Tilt } from "@/components/motion";
import { OPEN_APPLICATION, PHOTOS } from "@/lib/content";
import { getRoles } from "@/lib/data";
import { getMessages } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()).meta.careers;
  return pageMetadata("/careers", t.title, t.description);
}

export default async function CareersPage() {
  const [ROLES, m] = await Promise.all([getRoles(), getMessages()]);
  const t = m.careers;
  return (
    <PageShell>
      <PageHero eyebrow={t.eyebrow} titleLines={t.title} sub={t.sub} />

      {/* Culture */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-14 py-24 [padding-block:96px]">
          <Reveal><SectionLabel>{t.whyLabel}</SectionLabel></Reveal>
          <div className="grid gap-x-12 gap-y-12 md:grid-cols-3">
            {t.culture.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <div className="flex flex-col gap-4">
                  <span className="font-display text-[20px] font-semibold tracking-[-0.015em] text-spark">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-[22px] font-bold tracking-[-0.015em] uppercase text-ink">{c.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-cloud">
        <div className="container-x flex flex-col gap-14 py-24 [padding-block:96px]">
          <Reveal><SectionLabel>{t.perksLabel}</SectionLabel></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.perks.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 80} scale>
                <Tilt>
                  <div className="flex h-full flex-col gap-3 rounded-3xl bg-white p-8">
                    <h3 className="font-display text-[20px] font-bold tracking-[-0.015em] text-ink">{p.title}</h3>
                    <p className="text-[15px] leading-[1.6] text-muted">{p.body}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles (written in the admin panel, so in their original language) */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-12 py-24 [padding-block:96px]">
          <Reveal>
            <div className="flex items-center gap-4">
              <SectionLabel>{t.openRoles}</SectionLabel>
              <span className="font-display text-[13px] font-bold uppercase text-accent">
                {ROLES.length > 0 ? fmt(t.positions, { n: ROLES.length }) : t.openWelcome}
              </span>
            </div>
          </Reveal>
          {ROLES.length === 0 ? (
            <Reveal>
              <div className="flex flex-col items-start gap-5 rounded-3xl border border-line p-10">
                <p className="max-w-[640px] font-display text-[clamp(20px,2.4vw,28px)] font-semibold tracking-[-0.015em] uppercase leading-[1.15] text-ink">
                  {t.noPositions}
                </p>
                <p className="max-w-[560px] text-[16px] leading-[1.7] text-muted">{t.noPositionsBody}</p>
                <PillButton href={`/careers/${OPEN_APPLICATION.slug}`}>{t.sendPortfolio}</PillButton>
              </div>
            </Reveal>
          ) : (
            <div className="flex flex-col border-b border-line">
              {ROLES.map((r, i) => (
                <Reveal key={r.slug} delay={i * 70}>
                  <div className="group relative flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-[clamp(20px,2.4vw,26px)] font-bold tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
                        <Link href={`/careers/${r.slug}`} className="after:absolute after:inset-0">
                          {r.title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap gap-3 text-[13px] text-muted">
                        <span className="font-semibold uppercase tracking-wide text-accent">{r.dept}</span>
                        <span>{r.loc}</span>
                      </div>
                    </div>
                    <span className="relative font-display text-[14px] font-bold uppercase text-ink transition-[color,translate] group-hover:translate-x-1 group-hover:text-accent rtl:group-hover:-translate-x-1">
                      {t.viewRole}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Culture photo + CTA */}
      <section className="bg-ink">
        <div className="container-x grid gap-12 py-24 [padding-block:96px] lg:grid-cols-2 lg:items-center">
          <Reveal clip className="h-[360px] w-full">
            <Parallax className="h-full w-full rounded-3xl">
              <ImageFill label={m.profile.photos.culture} src={PHOTOS.culture.src} rounded="rounded-none" />
            </Parallax>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6">
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.015em] uppercase leading-[1.05] text-white">{t.notSeeHeading}</h2>
            <p className="max-w-[520px] text-[16px] leading-[1.6] text-on-dark">{t.notSeeBody}</p>
            <PillButton href={`/careers/${OPEN_APPLICATION.slug}`}>{t.sendPortfolio}</PillButton>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
