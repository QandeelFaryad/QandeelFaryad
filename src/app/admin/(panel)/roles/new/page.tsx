import RoleForm from "@/components/admin/RoleForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = { title: "New job" };

export default async function NewRolePage() {
  await requireAdmin();
  return (
    <>
      <PageHeader back={{ href: "/admin/roles", label: "All jobs" }} title="New job" />
      <RoleForm />
    </>
  );
}
