import type { ReactNode } from "react";
import AdminNav from "@/components/admin/AdminNav";
import SetupNotice from "@/components/admin/SetupNotice";
import { requireAdmin } from "@/lib/admin/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { signOut } from "../actions";

export default async function PanelLayout({ children }: { children: ReactNode }) {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const { supabase, email } = await requireAdmin();

  const [inquiries, applications] = await Promise.all([
    supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("applications").select("id", { count: "exact", head: true }).eq("status", "new"),
  ]);

  return (
    <div className="lg:flex">
      <AdminNav
        email={email}
        signOut={signOut}
        badges={{ "/admin/inquiries": inquiries.count ?? 0, "/admin/applications": applications.count ?? 0 }}
      />
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-8">{children}</div>
      </main>
    </div>
  );
}
