import CaseStudyForm from "@/components/admin/CaseStudyForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = { title: "New case study" };

export default async function NewCaseStudyPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader back={{ href: "/admin/case-studies", label: "All case studies" }} title="New case study" />
      <CaseStudyForm />
    </>
  );
}
