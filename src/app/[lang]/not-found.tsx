import type { Metadata } from "next";
import Link from "@/i18n/link";
import PageShell from "@/components/PageShell";
import { PillButton, SectionLabel } from "@/components/ui";
import { SplitReveal, Reveal } from "@/components/motion";
import { getMessages } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getMessages()).meta.notFound, robots: { index: false } };
}

export default async function NotFound() {
  const t = (await getMessages()).notFound;
  const links = [
    [t.links.work, "/case-studies"],
    [t.links.services, "/services"],
    [t.links.journal, "/blog"],
    [t.links.contact, "/contact"],
  ];
  return (
    <PageShell>
      <section className="brand-gradient-animated relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-[clamp(20px,5.5vw,80px)] py-40">
        <span
          aria-hidden="true"
          className="animate-float pointer-events-none absolute -end-[4vw] top-1/2 -translate-y-1/2 font-display text-[clamp(200px,40vw,560px)] font-semibold tracking-[-0.015em] leading-none text-white/[0.06]"
        >
          404
        </span>
        <Reveal><SectionLabel dark>{t.label}</SectionLabel></Reveal>
        <h1 className="mt-8 flex flex-col gap-2">
          {t.lines.map((line, i) => (
            <SplitReveal
              key={line}
              text={line}
              delay={i * 140}
              onLoad
              className="block font-display text-[clamp(40px,11vw,128px)] font-bold tracking-[-0.015em] leading-[0.9] text-white"
            />
          ))}
        </h1>
        <Reveal delay={240}>
          <p className="mt-8 max-w-[520px] text-[18px] leading-[1.6] text-white/85">{t.body}</p>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <PillButton href="/">{t.home}</PillButton>
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="font-display text-[14px] font-bold uppercase text-white transition-colors hover:text-accent">
                {label}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
