import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { SectionLabel } from "@/components/ui";
import { pageMeta } from "@/lib/site";
import { Reveal, ScrubText, Tilt } from "@/components/motion";
import { CtaBanner, DesignProcess } from "@/components/sections";
import { Capabilities } from "@/components/services";
import { SERVICES } from "@/lib/content";

const PROCESS = [
  { no: "01", title: "CONSULTATION", body: "We start by understanding the business, the goal, and what success looks like." },
  { no: "02", title: "PLANNING", body: "Scope, structure, and timelines agreed up front so the project stays organised." },
  { no: "03", title: "DESIGN & BUILD", body: "Design, development, and content brought together into the finished solution." },
  { no: "04", title: "LAUNCH & SUPPORT", body: "Going live, then ongoing guidance and improvements as the business grows." },
];

export const metadata = pageMeta(
  "Services",
  "Websites, e-commerce, applications, Microsoft solutions, lead generation, SEO, paid ads, brand identity, and automation & AI.",
);

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="PRODUCTS & SERVICES"
        titleLines={["OUR SERVICES"]}
        sub="QORLIQ helps businesses design, build, promote, and improve their digital operations — from the first website to automation, AI, and Microsoft cloud services."
      >
        <nav aria-label="Service list" className="mt-12 flex flex-wrap gap-3">
          {SERVICES.map((s) => (
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
            <Reveal><SectionLabel>WHAT WE OFFER</SectionLabel></Reveal>
            <ScrubText
              as="h2"
              className="max-w-[900px] font-display text-[clamp(26px,3.8vw,46px)] font-bold uppercase leading-[1.08] text-ink"
              parts={[{ text: "Understand the business, identify the goal, build the right solution." }]}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80} scale>
                <Tilt max={4}>
                  <div
                    id={s.slug}
                    className="flex h-full scroll-mt-28 flex-col gap-4 rounded-3xl border border-line bg-white p-8"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[18px] font-bold text-accent">{s.no}</span>
                      {s.slug === "microsoft-csp" ? (
                        <Link
                          href="/microsoft-csp"
                          className="font-display text-[12px] font-bold uppercase text-ink transition-colors hover:text-accent"
                        >
                          Dedicated page →
                        </Link>
                      ) : null}
                    </div>
                    <h3 className="font-display text-[clamp(20px,2.2vw,26px)] font-bold uppercase leading-[1.1] text-ink">
                      {s.title}
                    </h3>
                    <p className="text-[15px] leading-[1.65] text-muted">{s.body}</p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4">
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((t, ti) => (
                          <span
                            key={t}
                            className={`rounded-[20px] border-[1.5px] px-3 py-1.5 text-[11px] font-semibold uppercase ${
                              ti === 0 ? "border-accent bg-accent/[0.06] text-accent" : "border-line text-ink"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/contact?service=${s.slug}`}
                        className="font-display text-[12px] font-bold uppercase text-ink transition-colors hover:text-accent"
                      >
                        Enquire →
                      </Link>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DesignProcess steps={PROCESS} label="HOW WE WORK" heading="FAST AND STRUCTURED DELIVERY" />

      <Capabilities />

      <CtaBanner heading="LET'S BUILD YOUR DIGITAL FUTURE TOGETHER" />
    </PageShell>
  );
}
