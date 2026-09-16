import { getSession } from "@/lib/admin/auth";

const csvCell = (v: string | null) => {
  let s = v ?? "";
  // Stop spreadsheet apps treating values as formulas.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  const session = await getSession();
  if (!session?.isAdmin) return new Response("Not authorised", { status: 401 });

  const { data, error } = await session.supabase
    .from("subscribers")
    .select("email,page,created_at")
    .order("created_at", { ascending: false });
  if (error) return new Response(error.message, { status: 500 });

  const csv = ["email,signed_up_on,created_at", ...data.map((r) => [r.email, r.page, r.created_at].map(csvCell).join(","))].join("\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="qorliq-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
