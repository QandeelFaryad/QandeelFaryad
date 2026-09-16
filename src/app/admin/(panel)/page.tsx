import Link from "next/link";
import { Card, PageHeader, StatusBadge, formatDateTime } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const { supabase } = await requireAdmin();
  const count = (table: string, filter?: [string, string]) => {
    let q = supabase.from(table).select("id", { count: "exact", head: true });
    if (filter) q = q.eq(filter[0], filter[1]);
    return q.then((r) => r.count ?? 0);
  };
  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString();

  const [newInquiries, totalInquiries, weekInquiries, newApps, subscribers, posts, roles, studies, recentInquiries, recentApps] =
    await Promise.all([
      count("inquiries", ["status", "new"]),
      count("inquiries"),
      supabase.from("inquiries").select("id", { count: "exact", head: true }).gte("created_at", weekAgo).then((r) => r.count ?? 0),
      count("applications", ["status", "new"]),
      count("subscribers"),
      count("posts", ["status", "published"]),
      count("roles", ["status", "open"]),
      count("case_studies", ["status", "published"]),
      supabase.from("inquiries").select("id,created_at,name,company,services,status").order("created_at", { ascending: false }).limit(6),
      supabase.from("applications").select("id,created_at,name,role,status").order("created_at", { ascending: false }).limit(6),
    ]);

  const tiles = [
    { label: "New inquiries", value: newInquiries, note: `${totalInquiries} total · ${weekInquiries} this week`, href: "/admin/inquiries?status=new", hot: newInquiries > 0 },
    { label: "New applications", value: newApps, note: "Waiting for review", href: "/admin/applications?status=new", hot: newApps > 0 },
    { label: "Subscribers", value: subscribers, note: "Newsletter list", href: "/admin/subscribers" },
    { label: "Live content", value: posts + studies + roles, note: `${posts} posts · ${studies} case studies · ${roles} jobs`, href: "/admin/posts" },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="What's come in, and what's live on the website." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href} className="group">
            <Card className="flex h-full flex-col gap-2 p-5 transition-colors group-hover:border-ink/25">
              <span className="text-[12px] font-bold uppercase tracking-wide text-muted">{t.label}</span>
              <span className={`font-display text-[36px] font-semibold leading-none ${t.hot ? "text-spark-deep" : "text-ink"}`}>{t.value}</span>
              <span className="text-[12px] text-muted">{t.note}</span>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Recent
          title="Latest inquiries"
          href="/admin/inquiries"
          empty="No inquiries yet. They'll appear here as soon as someone sends the contact form."
          rows={(recentInquiries.data ?? []).map((r) => ({
            id: r.id,
            href: `/admin/inquiries/${r.id}`,
            primary: r.name,
            secondary: [r.company, (r.services as string[])?.join(", ")].filter(Boolean).join(" · "),
            date: r.created_at,
            status: r.status,
          }))}
        />
        <Recent
          title="Latest applications"
          href="/admin/applications"
          empty="No applications yet."
          rows={(recentApps.data ?? []).map((r) => ({
            id: r.id,
            href: `/admin/applications/${r.id}`,
            primary: r.name,
            secondary: r.role ?? "Open application",
            date: r.created_at,
            status: r.status,
          }))}
        />
      </div>
    </>
  );
}

function Recent({
  title,
  href,
  rows,
  empty,
}: {
  title: string;
  href: string;
  empty: string;
  rows: { id: string; href: string; primary: string; secondary: string; date: string; status: string }[];
}) {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="font-display text-[15px] font-semibold uppercase text-ink">{title}</h2>
        <Link href={href} className="text-[12px] font-bold uppercase tracking-wide text-accent-deep hover:text-ink">
          View all →
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="px-5 py-6 text-[14px] text-muted">{empty}</p>
      ) : (
        <ul className="divide-y divide-line">
          {rows.map((r) => (
            <li key={r.id}>
              <Link href={r.href} className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-cloud">
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-[14px] font-semibold text-ink">{r.primary}</span>
                  <span className="truncate text-[12px] text-muted">{r.secondary || "—"}</span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1">
                  <StatusBadge status={r.status} />
                  <span className="text-[11px] text-muted">{formatDateTime(r.date)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
