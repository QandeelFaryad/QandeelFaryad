/** Shown in /admin until the Supabase keys are added. */
export default function SetupNotice() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cloud px-4 py-12">
      <div className="w-full max-w-[640px] rounded-3xl border border-line bg-white p-8 sm:p-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/brand/qorliq-logo.svg" alt="QORLIQ" className="h-9 w-auto" />
        <h1 className="mt-8 font-display text-[26px] font-semibold uppercase leading-[1.1] text-ink">Connect Supabase to use the admin panel</h1>
        <ol className="mt-6 flex list-decimal flex-col gap-3 pl-5 text-[15px] leading-[1.6] text-ink/80">
          <li>Create a project at supabase.com.</li>
          <li>
            In the SQL Editor, run <code className="rounded bg-cloud px-1.5 py-0.5 text-[13px]">supabase/schema.sql</code>, then{" "}
            <code className="rounded bg-cloud px-1.5 py-0.5 text-[13px]">supabase/seed.sql</code>.
          </li>
          <li>
            Add your keys to <code className="rounded bg-cloud px-1.5 py-0.5 text-[13px]">.env.local</code> (see{" "}
            <code className="rounded bg-cloud px-1.5 py-0.5 text-[13px]">.env.example</code>) and restart the site.
          </li>
          <li>Create your login and make it an admin — the steps are in supabase/README.md.</li>
        </ol>
      </div>
    </main>
  );
}
