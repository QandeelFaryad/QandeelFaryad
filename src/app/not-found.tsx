import Link from "next/link";
import PageShell from "@/components/PageShell";
import { PillButton, SectionLabel } from "@/components/ui";
import { SplitReveal, Reveal } from "@/components/motion";

export const metadata = { title: "Page not found" };

const LINKS = [
  ["Our work", "/case-studies"],
  ["Services", "/services"],
  ["Journal", "/blog"],
  ["Contact", "/contact"],
];

export default function NotFound() {
  return (
    <PageShell>
      <section className="brand-gradient-animated relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-[clamp(20px,5.5vw,80px)] py-40">
        <span
          aria-hidden="true"
          className="animate-float pointer-events-none absolute -right-[4vw] top-1/2 -translate-y-1/2 font-display text-[clamp(200px,40vw,560px)] font-bold leading-none text-white/[0.06]"
        >
          404
        </span>
        <Reveal><SectionLabel dark>ERROR 404</SectionLabel></Reveal>
        <h1 className="mt-8 flex flex-col gap-2">
          <SplitReveal text="LOST IN" className="block font-display text-[clamp(40px,11vw,128px)] font-bold leading-[0.9] text-white" />
          <SplitReveal text="THE PIXELS." delay={140} className="block font-display text-[clamp(40px,11vw,128px)] font-bold leading-[0.9] text-white" />
        </h1>
        <Reveal delay={240}>
          <p className="mt-8 max-w-[520px] text-[18px] leading-[1.6] text-white/85">
            This page doesn&apos;t exist — or it moved somewhere better. Let&apos;s get you back on track.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <PillButton href="/">Back to Home</PillButton>
            {LINKS.map(([label, href]) => (
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
