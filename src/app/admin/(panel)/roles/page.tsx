import Link from "next/link";
import { ButtonLink, Card, EmptyState, PageHeader, StatusBadge } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = { title: "Job openings" };

export default async function RolesPage() {
  const { supabase } = await requireAdmin();
  const { data: rows, error } = await supabase
    .from("roles")
    .select("id,slug,title,department,location,status,sort")
    .order("sort")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageHeader
        title="Job openings"
        description="Roles listed on the careers page. The open application is always available."
        actions={<ButtonLink href="/admin/roles/new">New job</ButtonLink>}
      />
      {error ? <p className="text-[14px] text-spark-deep">{error.message}</p> : null}
      {rows && rows.length === 0 ? (
        <EmptyState
          title="No jobs yet"
          body="The careers page says there are no open positions and invites portfolios until you open a role."
          action={<ButtonLink href="/admin/roles/new">Add a job</ButtonLink>}
        />
      ) : null}
      {rows && rows.length > 0 ? (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <thead className="border-b border-line text-[11px] font-bold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.id} className="relative hover:bg-cloud">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/roles/${r.id}`} className="font-semibold text-ink after:absolute after:inset-0">
                      {r.title}
                    </Link>
                    <p className="text-[12px] text-muted">/careers/{r.slug}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{r.department || "—"}</td>
                  <td className="px-5 py-3.5 text-muted">{r.location || "—"}</td>
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
