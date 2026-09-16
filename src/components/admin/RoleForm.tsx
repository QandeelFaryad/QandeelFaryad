import { saveRole } from "@/app/admin/actions";
import ActionForm from "./ActionForm";
import { Card, Field, inputClass } from "./ui";

export type RoleRecord = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  sort: number;
  status: string;
};

export default function RoleForm({ role }: { role?: RoleRecord }) {
  return (
    <ActionForm action={saveRole} submitLabel={role ? "Save job" : "Create job"}>
      {role ? <input type="hidden" name="id" value={role.id} /> : null}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        <Card className="flex flex-col gap-5 p-6">
          <Field label="Job title" htmlFor="title">
            <input id="title" name="title" defaultValue={role?.title} required className={`${inputClass} text-[16px] font-semibold`} />
          </Field>
          <Field label="Summary" htmlFor="summary" hint="Shown at the top of the job page.">
            <textarea id="summary" name="summary" defaultValue={role?.summary} rows={3} className={inputClass} />
          </Field>
          <Field label="What you'll do" htmlFor="responsibilities" hint="One point per line.">
            <textarea id="responsibilities" name="responsibilities" defaultValue={role?.responsibilities.join("\n")} rows={7} className={inputClass} />
          </Field>
          <Field label="What you'll bring" htmlFor="requirements" hint="One point per line.">
            <textarea id="requirements" name="requirements" defaultValue={role?.requirements.join("\n")} rows={7} className={inputClass} />
          </Field>
        </Card>
        <Card className="flex flex-col gap-5 p-6">
          <Field label="Status" htmlFor="status" hint="Only open jobs are listed on the careers page.">
            <select id="status" name="status" defaultValue={role?.status ?? "draft"} className={inputClass}>
              <option value="draft">Draft</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </Field>
          <Field label="Department" htmlFor="department">
            <input id="department" name="department" defaultValue={role?.department} placeholder="e.g. Engineering" className={inputClass} />
          </Field>
          <Field label="Location" htmlFor="location">
            <input id="location" name="location" defaultValue={role?.location} placeholder="e.g. Remote / UK" className={inputClass} />
          </Field>
          <Field label="Order" htmlFor="sort" hint="Lower numbers are listed first.">
            <input id="sort" name="sort" type="number" defaultValue={role?.sort ?? 0} className={inputClass} />
          </Field>
          <Field label="URL slug" htmlFor="slug" hint={role ? `qorliq.com/careers/${role.slug}` : "Leave empty to create it from the title."}>
            <input id="slug" name="slug" defaultValue={role?.slug} className={inputClass} />
          </Field>
        </Card>
      </div>
    </ActionForm>
  );
}
