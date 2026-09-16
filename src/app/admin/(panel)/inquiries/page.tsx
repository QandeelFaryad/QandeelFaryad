import Link from "next/link";
import { Card, EmptyState, FilterTabs, PageHeader, SearchBox, StatusBadge, formatDateTime, ilikeTerm } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { INQUIRY_STATUSES } from "@/lib/admin/constants";

export const metadata = { title: "Inquiries" };

type Search = { status?: string; q?: string };

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { supabase } = await requireAdmin();
  const { status = "", q = "" } = await searchParams;

  let query = supabase
    .from("inquiries")
    .select("id,created_at,name,email,company,services,stage,budget,status")
    .order("created_at", { ascending: false })
    .limit(200);
  if (INQUIRY_STATUSES.includes(status)) query = query.eq("status", status);
  if (q.trim()) {
    const term = ilikeTerm(q);
    query = query.or(`name.ilike.${term},email.ilike.${term},company.ilike.${term},phone.ilike.${term},message.ilike.${term}`);
  }
  const { data: rows, error } = await query;

  return (
    <>
      <PageHeader title="Inquiries" description="Project enquiries from the contact form." />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <FilterTabs
          base="/admin/inquiries"
          current={status}
          query={q}
          options={[{ value: "", label: "All" }, ...INQUIRY_STATUSES.map((s) => ({ value: s, label: s }))]}
        />
        <SearchBox base="/admin/inquiries" query={q} status={status} placeholder="Search name, email, company, phone…" />
      </div>

      {error ? <p className="text-[14px] text-spark-deep">{error.message}</p> : null}
      {rows && rows.length === 0 ? (
        <EmptyState
          title={q || status ? "No matches" : "No inquiries yet"}
          body={q || status ? "Try a different filter or search." : "Enquiries from the contact form will appear here."}
        />
      ) : null}
      {rows && rows.length > 0 ? (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-[14px]">
            <thead className="border-b border-line text-[11px] font-bold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Services</th>
                <th className="px-5 py-3">Budget</th>
                <th className="px-5 py-3">Received</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.id} className="relative hover:bg-cloud">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/inquiries/${r.id}`} className="font-semibold text-ink after:absolute after:inset-0">
                      {r.name}
                    </Link>
                    <p className="text-[12px] text-muted">{[r.company, r.email].filter(Boolean).join(" · ")}</p>
                  </td>
                  <td className="max-w-[260px] truncate px-5 py-3.5 text-muted">{(r.services as string[]).join(", ") || "—"}</td>
                  <td className="px-5 py-3.5 text-muted">
                    {r.budget || "—"}
                    {r.stage ? <p className="text-[12px]">{r.stage}</p> : null}
                  </td>
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
