import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "@/i18n/link";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { ImageFill, SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { CtaBanner } from "@/components/sections";
import { ProjectAreas } from "@/components/profile";
import { getCaseStudies } from "@/lib/data";
import { getMessages } from "@/i18n/server";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()).meta.caseStudies;
  return pageMetadata("/case-studies", t.title, t.description);
}

export default async function CaseStudiesPage() {
  const [caseStudies, m] = await Promise.all([getCaseStudies(), getMessages()]);
  const t = m.caseStudies;
  return (
    <PageShell>
      <PageHero eyebrow={t.eyebrow} titleLines={t.title} sub={t.sub} />

      <section className="bg-white">
        <div className="container-x flex flex-col gap-10 [padding-block:120px]">
          <Reveal><SectionLabel>{t.selected}</SectionLabel></Reveal>
          {/* Case studies are written in the admin panel, so they show in their original language. */}
          <div className="grid gap-8 md:grid-cols-2">
            {caseStudies.map((c, i) => (
              <Reveal key={c.slug} delay={i * 90} scale>
                <Link href={`/case-studies/${c.slug}`} data-cursor={m.common.cursor.view} className="group flex h-full flex-col gap-5">
                  <ViewTransition name={`work-${c.slug}`} share="morph" default="none">
                    <div className="h-[340px] w-full overflow-hidden rounded-3xl">
                      <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                        <ImageFill label={c.subtitle} src={c.image} seed={i} />
                      </div>
                    </div>
                  </ViewTransition>
                  <div>
                    <p className="font-display text-[13px] font-bold uppercase tracking-wide text-accent">{c.industry}</p>
                    <h2 className="mt-2 font-display text-[clamp(20px,2.4vw,28px)] font-bold tracking-[-0.015em] uppercase leading-[1.1] text-ink transition-colors group-hover:text-accent">
                      {c.name}
                    </h2>
                    <p className="mt-1 text-[14px] font-medium text-muted">{c.subtitle}</p>
                  </div>
                  <p className="text-[15px] leading-[1.6] text-muted">{c.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-line px-3 py-1 text-[12px] font-medium uppercase text-ink/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProjectAreas dark />
      <CtaBanner heading={t.ctaHeading} />
    </PageShell>
  );
}
