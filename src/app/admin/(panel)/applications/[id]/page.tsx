import { notFound } from "next/navigation";
import ActionForm from "@/components/admin/ActionForm";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import { Card, Field, PageHeader, StatusBadge, formatDateTime, inputClass } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { APPLICATION_STATUSES, label } from "@/lib/admin/constants";
import { deleteApplication, updateApplication } from "../../../actions";

export const metadata = { title: "Application" };

function ExternalLink({ href }: { href: string | null }) {
  if (!href) return <>—</>;
  const safe = /^https?:\/\//i.test(href) ? href : `https://${href}`;
  return (
    <a href={safe} target="_blank" rel="noopener noreferrer" className="break-all font-semibold text-accent-deep hover:underline">
      {href}
    </a>
  );
}

export default async function ApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireAdmin();
  const { id } = await params;
  const { data: r } = await supabase.from("applications").select("*").eq("id", id).maybeSingle();
  if (!r) notFound();

  // Short-lived private link to the CV; regenerated each time the page loads.
  let cvUrl: string | null = null;
  if (r.cv_path) {
    const { data } = await supabase.storage.from("cvs").createSignedUrl(r.cv_path, 60 * 10, { download: true });
    cvUrl = data?.signedUrl ?? null;
  }

  return (
    <>
      <PageHeader
        back={{ href: "/admin/applications", label: "All applications" }}
        title={r.name}
        description={
          <>
            {r.role || "Open application"} · received {formatDateTime(r.created_at)} · <StatusBadge status={r.status} />
          </>
        }
        actions={
          <>
            {cvUrl ? (
              <a href={cvUrl} className="rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-ink hover:bg-accent/85">
                Download CV
              </a>
            ) : null}
            <a
              href={`mailto:${r.email}?subject=${encodeURIComponent("Your application to QORLIQ")}`}
              className="rounded-full border border-line bg-white px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-ink hover:border-ink/30"
            >
              Email applicant
            </a>
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <Card className="flex flex-col gap-6 p-6">
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-1">
              <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">Email</dt>
              <dd className="break-words text-[14px] text-ink">{r.email}</dd>
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">CV</dt>
              <dd className="text-[14px] text-ink">{r.cv_path ? (cvUrl ? "Attached" : "Attached (couldn't create a download link)") : "Not uploaded"}</dd>
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">Portfolio</dt>
              <dd className="text-[14px]"><ExternalLink href={r.portfolio} /></dd>
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">LinkedIn</dt>
              <dd className="text-[14px]"><ExternalLink href={r.linkedin} /></dd>
            </div>
          </dl>
          <div className="flex flex-col gap-2 border-t border-line pt-5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Why QORLIQ?</p>
            <p className="whitespace-pre-wrap text-[15px] leading-[1.7] text-ink">{r.message || "No message."}</p>
          </div>
        </Card>

        <Card className="p-6">
          <ActionForm action={updateApplication}>
            <input type="hidden" name="id" value={r.id} />
            <Field label="Status" htmlFor="status">
              <select id="status" name="status" defaultValue={r.status} className={inputClass}>
                {APPLICATION_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {label(s)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Internal notes" htmlFor="notes" hint="Only visible to admins.">
              <textarea id="notes" name="notes" defaultValue={r.notes ?? ""} rows={6} className={inputClass} />
            </Field>
          </ActionForm>
          <div className="mt-6 flex justify-end border-t border-line pt-5">
            <ConfirmSubmit action={deleteApplication} id={r.id} message="Delete this application and its CV permanently?">
              Delete application
            </ConfirmSubmit>
          </div>
        </Card>
      </div>
    </>
  );
}
