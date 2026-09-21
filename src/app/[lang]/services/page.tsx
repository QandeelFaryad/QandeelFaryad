import type { Metadata } from "next";
import Link from "@/i18n/link";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { SectionLabel } from "@/components/ui";
import { Reveal, ScrubText, Tilt } from "@/components/motion";
import { CtaBanner, DesignProcess } from "@/components/sections";
import { Capabilities } from "@/components/services";
import { SERVICES } from "@/lib/content";
import { getMessages } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()).meta.services;
  return pageMetadata("/services", t.title, t.description);
}

export default async function ServicesPage() {
  const m = await getMessages();
  const t = m.servicesPage;
  const services = SERVICES.map((s) => ({ ...s, ...m.services[s.slug as keyof typeof m.services] }));
  const process = t.process.map((p, i) => ({ no: String(i + 1).padStart(2, "0"), ...p }));

  return (
    <PageShell>
      <PageHero eyebrow={t.eyebrow} titleLines={t.title} sub={t.sub}>
        <nav aria-label={t.listLabel} className="mt-12 flex flex-wrap gap-3">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-white/30 px-5 py-2.5 font-display text-[12px] font-bold uppercase text-white transition-colors hover:border-accent hover:bg-accent hover:text-ink"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* The nine services */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-14 [padding-block:120px]">
          <div className="flex flex-col gap-6">
            <Reveal><SectionLabel>{t.offerLabel}</SectionLabel></Reveal>
            <ScrubText
              as="h2"
              className="max-w-[900px] font-display text-[clamp(26px,3.8vw,46px)] font-bold tracking-[-0.015em] uppercase leading-[1.08] text-ink"
              parts={[{ text: t.offerHeading }]}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80} scale>
                <Tilt max={4}>
                  <div id={s.slug} className="flex h-full scroll-mt-28 flex-col gap-4 rounded-3xl border border-line bg-white p-8">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[18px] font-bold text-spark">{s.no}</span>
                      {s.slug === "microsoft-csp" ? (
                        <Link href="/microsoft-csp" className="font-display text-[12px] font-bold uppercase text-ink transition-colors hover:text-accent">
                          {t.dedicatedPage}
                        </Link>
                      ) : null}
                    </div>
                    <h3 className="font-display text-[clamp(20px,2.2vw,26px)] font-bold tracking-[-0.015em] uppercase leading-[1.1] text-ink">
                      {s.title}
                    </h3>
                    <p className="text-[15px] leading-[1.65] text-muted">{s.body}</p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4">
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((tag, ti) => (
                          <span
                            key={tag}
                            className={`rounded-[20px] border-[1.5px] px-3 py-1.5 text-[11px] font-semibold uppercase ${
                              ti === 0 ? "border-accent bg-accent/[0.06] text-accent" : "border-line text-ink"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/contact?service=${s.slug}`}
                        className="font-display text-[12px] font-bold uppercase text-ink transition-colors hover:text-accent"
                      >
                        {t.enquire}
                      </Link>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DesignProcess steps={process} label={t.processLabel} heading={t.processHeading} />

      <Capabilities />

      <CtaBanner heading={m.sections.ctaFuture} />
    </PageShell>
  );
}
