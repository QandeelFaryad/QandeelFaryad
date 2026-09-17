import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ApplicationForm } from "@/components/forms";
import { OPEN_APPLICATION } from "@/lib/content";
import { getRole, getRoles } from "@/lib/data";
import { isServiceConfigured } from "@/lib/supabase/service";
import { pageMeta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [...(await getRoles()), OPEN_APPLICATION].map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const role = await getRole((await params).slug);
  if (!role) return {};
  return pageMeta(`${role.title} · Careers`, role.summary);
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display text-[22px] font-bold tracking-[-0.015em] uppercase text-ink">{title}</h2>
      <ul className="prose-qorliq">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function RolePage({ params }: Props) {
  const { slug } = await params;
  const [role, roles] = await Promise.all([getRole(slug), getRoles()]);
  if (!role) notFound();
  const others = roles.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <PageShell>
      <PageHero eyebrow={`CAREERS · ${role.dept.toUpperCase()}`} titleLines={[role.title]} sub={role.summary}>
        <div className="mt-10 flex flex-wrap gap-3">
          {[role.dept, role.loc].map((t) => (
            <span key={t} className="rounded-full border border-white/25 px-4 py-2 text-[13px] font-semibold uppercase text-white">
              {t}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="bg-white">
        <div className="container-x grid gap-16 [padding-block:96px] lg:grid-cols-[1fr_440px] lg:items-start">
          <div className="flex flex-col gap-12">
            <Link href="/careers" className="font-display text-[13px] font-bold uppercase text-muted transition-colors hover:text-accent">
              ← All roles
            </Link>
            <Reveal>
              <List title={slug === OPEN_APPLICATION.slug ? "Tell us" : "What you'll do"} items={role.responsibilities} />
            </Reveal>
            <Reveal delay={80}>
              <List title={slug === OPEN_APPLICATION.slug ? "What helps" : "What you'll bring"} items={role.requirements} />
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-3xl bg-cloud p-8">
                <p className="font-display text-[20px] font-semibold tracking-[-0.015em] text-ink">Remote-first, output-focused.</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-muted">
                  Flexible hours, a $3k learning budget, premium healthcare, equipment allowance, and two team retreats a year.
                </p>
                <Link href="/careers" className="mt-4 inline-block font-display text-[13px] font-bold uppercase text-accent hover:underline">
                  See all benefits →
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:sticky lg:top-28">
            <div className="rounded-3xl border border-line p-8">
              <SectionLabel>APPLY</SectionLabel>
              <div className="mt-6">
                <ApplicationForm role={role.title} allowCv={isServiceConfigured()} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {others.length ? (
        <section className="bg-cloud">
          <div className="container-x flex flex-col gap-10 [padding-block:96px]">
            <Reveal><SectionLabel>OTHER OPEN ROLES</SectionLabel></Reveal>
            <div className="flex flex-col border-b border-line">
              {others.map((r) => (
                <Link
                  key={r.slug}
                  href={`/careers/${r.slug}`}
                  className="group flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-display text-[clamp(20px,2.4vw,26px)] font-semibold tracking-[-0.015em] text-ink transition-colors group-hover:text-accent">
                    {r.title}
                  </span>
                  <span className="text-[13px] font-semibold uppercase tracking-wide text-muted">
                    {r.loc} <span className="text-accent transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
