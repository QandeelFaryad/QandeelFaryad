import { notFound } from "next/navigation";
import CaseStudyForm, { type CaseStudyRecord } from "@/components/admin/CaseStudyForm";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import { PageHeader, StatusBadge } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteCaseStudy } from "../../../actions";

export const metadata = { title: "Edit case study" };

export default async function EditCaseStudyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const [{ id }, { created }] = await Promise.all([params, searchParams]);
  const { data: study } = await supabase.from("case_studies").select("*").eq("id", id).maybeSingle<CaseStudyRecord>();
  if (!study) notFound();

  return (
    <>
      <PageHeader
        back={{ href: "/admin/case-studies", label: "All case studies" }}
        title={study.name}
        description={
          <>
            {created ? "Case study created. " : ""}
            <StatusBadge status={study.status} />
          </>
        }
        actions={
          <>
            {study.status === "published" ? (
              <a href={`/case-studies/${study.slug}`} target="_blank" className="text-[13px] font-bold uppercase tracking-wide text-accent-deep hover:text-ink">
                View on site ↗
              </a>
            ) : null}
            <ConfirmSubmit action={deleteCaseStudy} id={study.id} message="Delete this case study permanently?">
              Delete
            </ConfirmSubmit>
          </>
        }
      />
      <CaseStudyForm study={study} />
    </>
  );
}
