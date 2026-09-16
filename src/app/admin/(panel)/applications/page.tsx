import Link from "next/link";
import { Card, EmptyState, FilterTabs, PageHeader, SearchBox, StatusBadge, formatDateTime, ilikeTerm } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { APPLICATION_STATUSES } from "@/lib/admin/constants";

export const metadata = { title: "Applications" };

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const { supabase } = await requireAdmin();
  const { status = "", q = "" } = await searchParams;

  let query = supabase
    .from("applications")
    .select("id,created_at,name,email,role,cv_path,status")
    .order("created_at", { ascending: false })
    .limit(200);
  if (APPLICATION_STATUSES.includes(status)) query = query.eq("status", status);
  if (q.trim()) {
    const term = ilikeTerm(q);
    query = query.or(`name.ilike.${term},email.ilike.${term},role.ilike.${term}`);
  }
  const { data: rows, error } = await query;

  return (
    <>
      <PageHeader title="Applications" description="Job applications and open applications from the careers pages." />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <FilterTabs
          base="/admin/applications"
          current={status}
          query={q}
          options={[{ value: "", label: "All" }, ...APPLICATION_STATUSES.map((s) => ({ value: s, label: s }))]}
        />
        <SearchBox base="/admin/applications" query={q} status={status} placeholder="Search name, email, role…" />
      </div>

      {error ? <p className="text-[14px] text-spark-deep">{error.message}</p> : null}
      {rows && rows.length === 0 ? (
        <EmptyState
          title={q || status ? "No matches" : "No applications yet"}
          body={q || status ? "Try a different filter or search." : "Applications from the careers pages will appear here."}
        />
      ) : null}
      {rows && rows.length > 0 ? (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead className="border-b border-line text-[11px] font-bold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Applicant</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">CV</th>
                <th className="px-5 py-3">Received</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.id} className="relative hover:bg-cloud">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/applications/${r.id}`} className="font-semibold text-ink after:absolute after:inset-0">
                      {r.name}
                    </Link>
                    <p className="text-[12px] text-muted">{r.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{r.role || "Open application"}</td>
                  <td className="px-5 py-3.5 text-muted">{r.cv_path ? "Attached" : "—"}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-muted">{formatDateTime(r.created_at)}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : null}
    </>
  );
}
