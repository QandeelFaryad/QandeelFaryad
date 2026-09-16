import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import ActionForm from "@/components/admin/ActionForm";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import { Card, Field, PageHeader, StatusBadge, formatDateTime, inputClass } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteInquiry, updateInquiry } from "../../../actions";
import { INQUIRY_STATUSES, label } from "@/lib/admin/constants";

export const metadata = { title: "Inquiry" };

export default async function InquiryPage({ params }: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireAdmin();
  const { id } = await params;
  const { data: r } = await supabase.from("inquiries").select("*").eq("id", id).maybeSingle();
  if (!r) notFound();

  const phoneDigits = r.phone ? String(r.phone).replace(/\D/g, "") : "";
  const linkClass = "font-semibold underline-offset-4 hover:text-accent-deep hover:underline";
  const details: [string, ReactNode][] = [
    ["Email", r.email],
    [
      "Phone",
      r.phone ? (
        <>
          <a href={`tel:${String(r.phone).replace(/[^\d+]/g, "")}`} className={linkClass}>
            {r.phone}
          </a>
          {r.whatsapp ? " · on WhatsApp" : ""}
        </>
      ) : null,
    ],
    ["Company", r.company],
    [
      "Website",
      r.site_url ? (
        <a href={r.site_url} target="_blank" rel="noopener noreferrer nofollow" className={linkClass}>
          {String(r.site_url).replace(/^https?:\/\//, "")}
        </a>
      ) : null,
    ],
    ["Services", (r.services as string[]).join(", ")],
    ["Project stage", r.stage],
    ["Budget", r.budget],
    ["Timeline", r.timeline],
    ["Sent from page", r.page],
    ["Referrer", r.referrer],
    ["Campaign", r.utm],
  ];
  const specifics = Array.isArray(r.details) ? (r.details as { service: string; question: string; answer: string }[]) : [];
  const subject = encodeURIComponent(`Re: your enquiry to QORLIQ`);

  return (
    <>
      <PageHeader
        back={{ href: "/admin/inquiries", label: "All inquiries" }}
        title={r.name}
        description={<>Received {formatDateTime(r.created_at)} · <StatusBadge status={r.status} /></>}
        actions={
          <div className="flex flex-wrap gap-3">
            {r.whatsapp && phoneDigits ? (
              <a
                href={`https://wa.me/${phoneDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-ink hover:border-accent"
              >
                WhatsApp
              </a>
            ) : null}
            <a
              href={`mailto:${r.email}?subject=${subject}`}
              className="rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide text-ink hover:bg-accent/85"
            >
              Reply by email
            </a>
          </div>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <Card className="flex flex-col gap-6 p-6">
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {details.map(([k, v]) => (
              <div key={k} className="flex min-w-0 flex-col gap-1">
                <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">{k}</dt>
                <dd className="break-words text-[14px] text-ink">{v || "—"}</dd>
              </div>
            ))}
          </dl>
          {specifics.length ? (
            <div className="flex flex-col gap-3 border-t border-line pt-5">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Service specifics</p>
              <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {specifics.map((d, i) => (
                  <div key={i} className="flex min-w-0 flex-col gap-1">
                    <dt className="text-[12px] text-muted">
                      <span className="font-semibold text-ink">{d.service}</span> · {d.question}
                    </dt>
                    <dd className="break-words text-[14px] text-ink">{d.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
          <div className="flex flex-col gap-2 border-t border-line pt-5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Message</p>
            <p className="whitespace-pre-wrap text-[15px] leading-[1.7] text-ink">{r.message || "No message."}</p>
          </div>
        </Card>

        <Card className="p-6">
          <ActionForm action={updateInquiry}>
            <input type="hidden" name="id" value={r.id} />
            <Field label="Status" htmlFor="status">
              <select id="status" name="status" defaultValue={r.status} className={inputClass}>
                {INQUIRY_STATUSES.map((s) => (
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
            <ConfirmSubmit action={deleteInquiry} id={r.id} message="Delete this inquiry permanently?">
              Delete inquiry
            </ConfirmSubmit>
          </div>
        </Card>
      </div>
    </>
  );
}
