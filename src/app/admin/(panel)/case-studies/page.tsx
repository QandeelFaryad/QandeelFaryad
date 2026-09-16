import Link from "next/link";
import { ButtonLink, Card, EmptyState, PageHeader, StatusBadge } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = { title: "Case studies" };

export default async function CaseStudiesAdminPage() {
  const { supabase } = await requireAdmin();
  const { data: rows, error } = await supabase
    .from("case_studies")
    .select("id,slug,name,sector,image,status,sort")
    .order("sort")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHeader
        title="Case studies"
        description="Client projects on the home page, the case studies page and the Microsoft CSP page."
        actions={<ButtonLink href="/admin/case-studies/new">New case study</ButtonLink>}
      />
      {error ? <p className="text-[14px] text-spark-deep">{error.message}</p> : null}
      {rows && rows.length === 0 ? (
        <EmptyState
          title="No case studies in the database"
          body="Run supabase/seed.sql to import the two existing case studies, or add a new one."
          action={<ButtonLink href="/admin/case-studies/new">Add a case study</ButtonLink>}
        />
      ) : null}
      {rows && rows.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((r) => (
            <Link key={r.id} href={`/admin/case-studies/${r.id}`} className="group">
              <Card className="flex h-full flex-col overflow-hidden transition-colors group-hover:border-ink/25">
                <div className="h-[150px] bg-cloud">
                  {r.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.image} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[11px] font-bold uppercase tracking-wide text-muted">{r.sector || "—"}</span>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="font-display text-[15px] font-semibold uppercase leading-[1.2] text-ink">{r.name}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
}
