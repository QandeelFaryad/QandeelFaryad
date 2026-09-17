import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import SetupNotice from "@/components/admin/SetupNotice";
import { getSession } from "@/lib/admin/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { signOut } from "../actions";

export const metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!isSupabaseConfigured()) return <SetupNotice />;
  const session = await getSession();
  if (session?.isAdmin) redirect("/admin");
  const { error } = await searchParams;
  const signedInNotAdmin = Boolean(session?.userId) || error === "not-admin";

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 py-12">
      <div className="w-full max-w-[420px] rounded-3xl bg-white p-8 sm:p-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brand/qorliq-logo.svg" alt="QORLIQ" className="h-9 w-auto" />
        <h1 className="mt-8 font-display text-[24px] font-bold uppercase leading-[1.1] text-ink">Admin sign in</h1>
        {signedInNotAdmin && session?.userId ? (
          <div className="mt-6 flex flex-col gap-4">
            <p className="text-[14px] leading-[1.6] text-muted">
              You&apos;re signed in as <strong className="text-ink">{session.email}</strong>, but this account doesn&apos;t
              have admin access. Ask an existing admin to add you.
            </p>
            <form action={signOut}>
              <button type="submit" className="rounded-full bg-ink px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-white">
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </main>
  );
}
