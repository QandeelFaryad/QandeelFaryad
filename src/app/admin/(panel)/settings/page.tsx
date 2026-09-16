import ActionForm from "@/components/admin/ActionForm";
import { Card, Field, PageHeader, inputClass } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { SITE } from "@/lib/site";
import { saveSettings } from "../../actions";

export const metadata = { title: "Site stats" };

const FIELDS = [
  { name: "projects", label: "Projects completed" },
  { name: "countries", label: "Countries served" },
  { name: "industries", label: "Industries served" },
  { name: "satisfaction", label: "Client satisfaction (%)" },
] as const;

export default async function SettingsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("settings").select("projects,countries,industries,satisfaction").eq("id", 1).maybeSingle();
  const stats = data ?? SITE.stats;

  return (
    <>
      <PageHeader
        title="Site stats"
        description="The “company at a glance” numbers on the home, about and industries pages."
      />
      <Card className="max-w-[720px] p-6">
        <ActionForm action={saveSettings}>
          <div className="grid gap-5 sm:grid-cols-2">
            {FIELDS.map((f) => (
              <Field key={f.name} label={f.label} htmlFor={f.name}>
                <input
                  id={f.name}
                  name={f.name}
                  type="number"
                  min={0}
                  max={f.name === "satisfaction" ? 100 : undefined}
                  defaultValue={stats[f.name]}
                  required
                  className={`${inputClass} font-display text-[20px] font-semibold`}
                />
              </Field>
            ))}
          </div>
        </ActionForm>
      </Card>
    </>
  );
}
