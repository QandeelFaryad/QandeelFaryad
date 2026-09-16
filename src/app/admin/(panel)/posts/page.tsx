import Link from "next/link";
import { ButtonLink, Card, EmptyState, PageHeader, StatusBadge, formatDay } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = { title: "Blog posts" };

export default async function PostsPage() {
  const { supabase } = await requireAdmin();
  const { data: rows, error } = await supabase
    .from("posts")
    .select("id,slug,title,category,status,featured,published_on,updated_at")
    .order("published_on", { ascending: false });

  return (
    <>
      <PageHeader title="Blog posts" description="Articles on the Journal page." actions={<ButtonLink href="/admin/posts/new">New post</ButtonLink>} />
      {error ? <p className="text-[14px] text-spark-deep">{error.message}</p> : null}
      {rows && rows.length === 0 ? (
        <EmptyState
          title="No posts yet"
          body="The blog shows a “coming soon” message until you publish your first article."
          action={<ButtonLink href="/admin/posts/new">Write the first post</ButtonLink>}
        />
      ) : null}
      {rows && rows.length > 0 ? (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead className="border-b border-line text-[11px] font-bold uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.id} className="relative hover:bg-cloud">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/posts/${r.id}`} className="font-semibold text-ink after:absolute after:inset-0">
                      {r.title}
                    </Link>
                    <p className="text-[12px] text-muted">
                      /blog/{r.slug}
                      {r.featured ? " · Featured" : ""}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{r.category}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-muted">{formatDay(r.published_on)}</td>
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
