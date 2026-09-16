import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { SectionLabel, ImageFill, PillButton } from "@/components/ui";
import Link from "next/link";
import { Reveal, Parallax, Tilt } from "@/components/motion";
import { ROLES, OPEN_APPLICATION, PHOTOS } from "@/lib/content";
import { pageMeta } from "@/lib/site";

const CULTURE = [
  { no: "01", title: "CREATIVE FREEDOM", body: "We trust our creators entirely. No heavy micro-management. Ditch the rigid corporate frameworks and define real aesthetic products." },
  { no: "02", title: "GROWTH & LEARNING", body: "A massive yearly educational stipend combined with daily knowledge transfers across global system architects and designers." },
  { no: "03", title: "GLOBAL IMPACT", body: "Build next-generation SaaS architectures and visual identities for leading global brands located across 24 different countries." },
];

const PERKS = [
  { title: "Remote-First", body: "Work from anywhere in the world. As long as the work is outstanding, we support you." },
  { title: "Health & Wellness", body: "Premium healthcare coverage, fitness allowances, and access to wellness apps." },
  { title: "Learning Budget", body: "$3k yearly allowance for courses, books, workshops, or high-fidelity design tickets." },
  { title: "Flexible Hours", body: "A system built on output, not desk hours. We structure working blocks with autonomy." },
  { title: "Team Retreats", body: "Twice a year we gather the global distributed group in inspirational travel spots." },
  { title: "Equipment Budget", body: "Complete workspace allowance including the newest MacBooks and ergonomic desks." },
];


export const metadata = pageMeta(
  "Careers",
  "Join a remote-first team of designers, engineers, and strategists crafting work for leading global brands.",
);

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="CAREERS AT QORLIQ"
        titleLines={["SHAPE THE", "FUTURE / WITH US"]}
        sub="We are looking for bold, high-performance engineers, designers, and thinkers who are ready to ditch conventional structures and craft actual masterpieces."
      />

      {/* Culture */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-14 py-24 [padding-block:96px]">
          <Reveal><SectionLabel>WHY QORLIQ</SectionLabel></Reveal>
          <div className="grid gap-x-12 gap-y-12 md:grid-cols-3">
            {CULTURE.map((c, i) => (
              <Reveal key={c.no} delay={i * 90}>
                <div className="flex flex-col gap-4">
                  <span className="font-display text-[20px] font-semibold tracking-[-0.015em] text-accent">{c.no}</span>
                  <h3 className="font-display text-[22px] font-semibold tracking-[-0.015em] uppercase text-ink">{c.title}</h3>
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
          <Reveal><SectionLabel>BENEFITS & PERKS</SectionLabel></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 80} scale>
                <Tilt>
                <div className="flex h-full flex-col gap-3 rounded-3xl bg-white p-8">
                  <h3 className="font-display text-[20px] font-semibold tracking-[-0.015em] text-ink">{p.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-muted">{p.body}</p>
                </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="bg-white">
        <div className="container-x flex flex-col gap-12 py-24 [padding-block:96px]">
          <Reveal>
            <div className="flex items-center gap-4">
              <SectionLabel>OPEN ROLES</SectionLabel>
              <span className="font-display text-[13px] font-bold uppercase text-accent">{ROLES.length > 0 ? `${ROLES.length} positions available` : "Open application welcome"}</span>
            </div>
          </Reveal>
          {ROLES.length === 0 ? (
            <Reveal>
              <div className="flex flex-col items-start gap-5 rounded-3xl border border-line p-10">
                <p className="max-w-[640px] font-display text-[clamp(20px,2.4vw,28px)] font-semibold tracking-[-0.015em] uppercase leading-[1.15] text-ink">
                  No open positions right now
                </p>
                <p className="max-w-[560px] text-[16px] leading-[1.7] text-muted">
                  We still want to hear from talented designers, engineers, and strategists. Send us
                  your portfolio and we&apos;ll be in touch when something opens up.
                </p>
                <PillButton href={`/careers/${OPEN_APPLICATION.slug}`}>Send Us Your Portfolio</PillButton>
              </div>
            </Reveal>
          ) : (
            <div className="flex flex-col border-b border-line">
            {ROLES.map((r, i) => (
              <Reveal key={r.slug} delay={i * 70}>
                <div className="group relative flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-[clamp(20px,2.4vw,26px)] font-semibold tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
                      <Link href={`/careers/${r.slug}`} className="after:absolute after:inset-0">
                        {r.title}
                      </Link>
                    </h3>
                    <div className="flex flex-wrap gap-3 text-[13px] text-muted">
                      <span className="font-semibold uppercase tracking-wide text-accent">{r.dept}</span>
                      <span>{r.loc}</span>
                    </div>
                  </div>
                  <span className="relative font-display text-[14px] font-bold uppercase text-ink transition-[color,translate] group-hover:translate-x-1 group-hover:text-accent">
                    View Role →
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
              <ImageFill label={PHOTOS.culture.alt} src={PHOTOS.culture.src} rounded="rounded-none" />
            </Parallax>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6">
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.015em] uppercase leading-[1.05] text-white">
              Don&apos;t see your specific role?
            </h2>
            <p className="max-w-[520px] text-[16px] leading-[1.6] text-on-dark">
              We are always on the lookout for world-class developers, product designers, identity
              experts and strategy leads. Shoot over your portfolio!
            </p>
            <PillButton href={`/careers/${OPEN_APPLICATION.slug}`}>Send Us Your Portfolio</PillButton>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
