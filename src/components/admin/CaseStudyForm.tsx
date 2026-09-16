import { saveCaseStudy } from "@/app/admin/actions";
import ActionForm from "./ActionForm";
import ImageField from "./ImageField";
import { Card, Field, inputClass } from "./ui";

export type CaseStudyRecord = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  sector: string;
  industry: string;
  summary: string;
  tags: string[];
  image: string | null;
  challenge: string;
  delivered: string;
  solution: string;
  results: string;
  sort: number;
  status: string;
};

export default function CaseStudyForm({ study }: { study?: CaseStudyRecord }) {
  const long = [
    { name: "challenge", label: "Client challenge" },
    { name: "delivered", label: "Services delivered" },
    { name: "solution", label: "Solution provided" },
    { name: "results", label: "Results achieved" },
  ] as const;

  return (
    <ActionForm action={saveCaseStudy} submitLabel={study ? "Save case study" : "Create case study"}>
      {study ? <input type="hidden" name="id" value={study.id} /> : null}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-5 p-6">
            <Field label="Project name" htmlFor="name">
              <input id="name" name="name" defaultValue={study?.name} required className={`${inputClass} text-[16px] font-semibold`} />
            </Field>
            <Field label="Subtitle" htmlFor="subtitle">
              <input id="subtitle" name="subtitle" defaultValue={study?.subtitle} placeholder="e.g. Business Website, Brand Identity & Lead Generation" className={inputClass} />
            </Field>
            <Field label="Summary" htmlFor="summary" hint="Shown on case study cards.">
              <textarea id="summary" name="summary" defaultValue={study?.summary} rows={3} className={inputClass} />
            </Field>
          </Card>
          <Card className="flex flex-col gap-5 p-6">
            {long.map((f) => (
              <Field key={f.name} label={f.label} htmlFor={f.name}>
                <textarea id={f.name} name={f.name} defaultValue={study?.[f.name]} rows={5} className={inputClass} />
              </Field>
            ))}
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-5 p-6">
            <Field label="Status" htmlFor="status" hint="Drafts are only visible here.">
              <select id="status" name="status" defaultValue={study?.status ?? "draft"} className={inputClass}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
            <Field label="Sector" htmlFor="sector">
              <input id="sector" name="sector" defaultValue={study?.sector} placeholder="e.g. PROFESSIONAL SERVICES" className={inputClass} />
            </Field>
            <Field label="Industry" htmlFor="industry">
              <input id="industry" name="industry" defaultValue={study?.industry} className={inputClass} />
            </Field>
            <Field label="Tags" htmlFor="tags" hint="Separate with commas.">
              <input id="tags" name="tags" defaultValue={study?.tags.join(", ")} placeholder="Website Design, Branding" className={inputClass} />
            </Field>
            <Field label="Order" htmlFor="sort" hint="Lower numbers are shown first.">
              <input id="sort" name="sort" type="number" defaultValue={study?.sort ?? 0} className={inputClass} />
            </Field>
            <Field label="URL slug" htmlFor="slug" hint={study ? `qorliq.com/case-studies/${study.slug}` : "Leave empty to create it from the name."}>
              <input id="slug" name="slug" defaultValue={study?.slug} className={inputClass} />
            </Field>
          </Card>
          <Card className="p-6">
            <ImageField name="image" label="Cover image" defaultValue={study?.image} folder="case-studies" />
          </Card>
        </div>
      </div>
    </ActionForm>
  );
}
