import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import { Card, EmptyState, PageHeader, SearchBox, formatDateTime, ilikeTerm } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteSubscriber } from "../../actions";

export const metadata = { title: "Subscribers" };

export default async function SubscribersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { supabase } = await requireAdmin();
  const { q = "" } = await searchParams;

  let query = supabase.from("subscribers").select("id,created_at,email,page", { count: "exact" }).order("created_at", { ascending: false }).limit(500);
  if (q.trim()) query = query.ilike("email", ilikeTerm(q));
  const { data: rows, count, error } = await query;

  return (
    <>
      <PageHeader
        title="Subscribers"
        description={`${count ?? 0} ${q ? "matching" : "people on the newsletter list"}`}
        actions={
          <a
            href="/admin/subscribers/export"
            className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-white hover:bg-ink-soft"
          >
            Export CSV
          </a>
        }
      />
      <SearchBox base="/admin/subscribers" query={q} placeholder="Search email…" />
      {error ? <p className="text-[14px] text-spark-deep">{error.message}</p> : null}
      {rows && rows.length === 0 ? (
        <EmptyState title={q ? "No matches" : "No subscribers yet"} body={q ? "Try a different search." : "Newsletter sign-ups from the site will appear here."} />
      ) : null}
      {rows && rows.length > 0 ? (
        <Card className="relative overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <thead className="border-b border-line text-[11px] font-bold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Signed up on</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-5 py-3 font-semibold text-ink">{r.email}</td>
                  <td className="px-5 py-3 text-muted">{r.page || "—"}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-muted">{formatDateTime(r.created_at)}</td>
                  <td className="px-5 py-3 text-right">
                    <ConfirmSubmit
                      action={deleteSubscriber}
                      id={r.id}
                      message={`Remove ${r.email} from the list?`}
                      className="text-[12px] font-bold uppercase tracking-wide text-muted hover:text-spark-deep"
                    >
                      Remove
                    </ConfirmSubmit>
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
