import { notFound } from "next/navigation";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import RoleForm, { type RoleRecord } from "@/components/admin/RoleForm";
import { PageHeader, StatusBadge } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteRole } from "../../../actions";

export const metadata = { title: "Edit job" };

export default async function EditRolePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const [{ id }, { created }] = await Promise.all([params, searchParams]);
  const { data: role } = await supabase.from("roles").select("*").eq("id", id).maybeSingle<RoleRecord>();
  if (!role) notFound();

  return (
    <>
      <PageHeader
        back={{ href: "/admin/roles", label: "All jobs" }}
        title={role.title}
        description={
          <>
            {created ? "Job created. " : ""}
            <StatusBadge status={role.status} />
          </>
        }
        actions={
          <>
            {role.status === "open" ? (
              <a href={`/careers/${role.slug}`} target="_blank" className="text-[13px] font-bold uppercase tracking-wide text-accent-deep hover:text-ink">
                View on site ↗
              </a>
            ) : null}
            <ConfirmSubmit action={deleteRole} id={role.id} message="Delete this job permanently?">
              Delete
            </ConfirmSubmit>
          </>
        }
      />
      <RoleForm role={role} />
    </>
  );
}
