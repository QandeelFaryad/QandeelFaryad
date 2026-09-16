import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

/** The signed-in user and whether they are listed in the admins table. Deduplicated per request. */
export const getSession = cache(async () => {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.sub) return { supabase, userId: null, email: null, isAdmin: false };
  const { data: row } = await supabase.from("admins").select("user_id").eq("user_id", claims.sub).maybeSingle();
  return {
    supabase,
    userId: claims.sub,
    email: typeof claims.email === "string" ? claims.email : null,
    isAdmin: Boolean(row),
  };
});

/** For admin pages and actions: returns a Supabase client acting as a verified admin, or redirects. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (!session.userId) redirect("/admin/login");
  if (!session.isAdmin) redirect("/admin/login?error=not-admin");
  return session;
}
