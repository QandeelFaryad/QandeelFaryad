import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { PillButton, SectionLabel, ImageFill } from "@/components/ui";
import { Reveal, Tilt, Parallax } from "@/components/motion";
import { CtaBanner } from "@/components/sections";
import { MICROSOFT_SOLUTIONS, getCaseStudy } from "@/lib/content";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Microsoft CSP",
  "Microsoft licensing through the Cloud Solution Provider programme: Microsoft 365, Azure, SharePoint, Teams, Exchange Online, Defender, security and compliance, and cloud migration.",
);

const STEPS = [
  { no: "01", title: "REVIEW", body: "We look at how your team works today: email, file sharing, devices, and communication." },
  { no: "02", title: "PLAN", body: "We map the right Microsoft licences, user roles, and security settings for your business." },
  { no: "03", title: "MIGRATE", body: "Accounts, mailboxes, and documents move across with minimal disruption to daily work." },
  { no: "04", title: "SUPPORT", body: "Guidance, admin support, and improvements as your team and requirements grow." },
];

export default function MicrosoftPage() {
  const study = getCaseStudy("microsoft-cloud-productivity-transformation");

  return (
    <PageShell>
      <PageHero
        eyebrow="MICROSOFT CSP PARTNER"
        titleLines={["MICROSOFT", "CSP & CLOUD", "SOLUTIONS"]}
        sub="As a Cloud Solution Provider partner, QORLIQ supplies Microsoft licensing and supports the cloud services around it — Microsoft 365, Azure, security, productivity tools, and cloud-based business services."
      >
        <div className="mt-12">
          <PillButton href="/contact?service=microsoft-csp">Talk to Us About Licensing</PillButton>
        </div>
      </PageHero>

      {/* Solutions grid */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-14 [padding-block:120px]">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <SectionLabel>WHAT WE COVER</SectionLabel>
              <span className="font-display text-[13px] font-bold uppercase text-accent">
                ( {MICROSOFT_SOLUTIONS.length} areas )
              </span>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MICROSOFT_SOLUTIONS.map((m, i) => (
              <Reveal key={m.title} delay={(i % 4) * 80} scale>
                <Tilt max={5}>
                  <div className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-white p-8">
                    <span className="font-display text-[18px] font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-[20px] font-semibold tracking-[-0.015em] uppercase leading-[1.1] text-ink">
                      {m.title}
                    </h2>
                    <p className="text-[15px] leading-[1.6] text-muted">{m.body}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How a rollout runs */}
      <section className="bg-ink">
        <div className="container-x flex flex-col gap-14 [padding-block:120px]">
          <Reveal><SectionLabel dark>HOW A ROLLOUT RUNS</SectionLabel></Reveal>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.no} delay={i * 90}>
                <div className="flex flex-col gap-4">
                  <span className="font-display text-[20px] font-semibold tracking-[-0.015em] text-accent">{s.no}</span>
                  <div className="h-px w-full bg-white/15" />
                  <h3 className="font-display text-[22px] font-semibold tracking-[-0.015em] uppercase text-white">{s.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-on-dark">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related case study */}
      {study ? (
        <section className="bg-white">
          <div className="container-x grid gap-12 [padding-block:120px] lg:grid-cols-2 lg:items-center lg:gap-20">
            <Reveal clip className="h-[340px] w-full lg:h-[480px]">
              <Parallax className="h-full w-full rounded-3xl">
                <ImageFill label={study.subtitle} src={study.image} rounded="rounded-none" />
              </Parallax>
            </Reveal>
            <div className="flex flex-col gap-6">
              <Reveal><SectionLabel>CASE STUDY</SectionLabel></Reveal>
              <Reveal delay={80}>
                <h2 className="font-display text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.015em] uppercase leading-[1.05] text-ink">
                  {study.name}
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-[17px] leading-[1.7] text-muted">{study.summary}</p>
              </Reveal>
              <Reveal delay={200}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="font-display text-[14px] font-bold uppercase text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  Read the full case study →
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      ) : null}

      <CtaBanner
        heading="MODERNISE YOUR WORKPLACE"
        sub="Tell us how your team works today and we'll map the right Microsoft setup for it."
      />
    </PageShell>
  );
}
