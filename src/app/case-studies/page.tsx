import Link from "next/link";
import { ViewTransition } from "react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { ImageFill, SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { CtaBanner } from "@/components/sections";
import { ProjectAreas } from "@/components/profile";
import { getCaseStudies } from "@/lib/data";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Case Studies",
  "How QORLIQ helped clients modernise their workplace with Microsoft 365 and build a website, brand identity, and lead generation foundation.",
);

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();
  return (
    <PageShell>
      <PageHero
        eyebrow="CASE STUDIES"
        titleLines={["CLIENT WORK"]}
        sub="A look at how we approach projects: the challenge, what we delivered, the solution, and the results the client gained."
      />

      <section className="bg-white">
        <div className="container-x flex flex-col gap-10 [padding-block:120px]">
          <Reveal><SectionLabel>SELECTED PROJECTS</SectionLabel></Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            {caseStudies.map((c, i) => (
              <Reveal key={c.slug} delay={i * 90} scale>
                <Link href={`/case-studies/${c.slug}`} data-cursor="View" className="group flex h-full flex-col gap-5">
                  <ViewTransition name={`work-${c.slug}`} share="morph" default="none">
                    <div className="h-[340px] w-full overflow-hidden rounded-3xl">
                      <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                        <ImageFill label={c.subtitle} src={c.image} seed={i} />
                      </div>
                    </div>
                  </ViewTransition>
                  <div>
                    <p className="font-display text-[13px] font-bold uppercase tracking-wide text-accent">
                      {c.industry}
                    </p>
                    <h2 className="mt-2 font-display text-[clamp(20px,2.4vw,28px)] font-bold tracking-[-0.015em] uppercase leading-[1.1] text-ink transition-colors group-hover:text-accent">
                      {c.name}
                    </h2>
                    <p className="mt-1 text-[14px] font-medium text-muted">{c.subtitle}</p>
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

      <ProjectAreas dark />
      <CtaBanner heading="READY TO START YOUR PROJECT?" />
    </PageShell>
  );
}
