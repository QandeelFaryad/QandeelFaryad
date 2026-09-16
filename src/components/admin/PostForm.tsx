import { POST_CATEGORIES, type PostBlock } from "@/lib/content";
import { blocksToText } from "@/lib/admin/blocks";
import { savePost } from "@/app/admin/actions";
import ActionForm from "./ActionForm";
import ImageField from "./ImageField";
import { Card, Field, inputClass } from "./ui";

export type PostRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image: string | null;
  read_time: string;
  published_on: string;
  featured: boolean;
  body: PostBlock[];
  status: string;
};

export default function PostForm({ post }: { post?: PostRecord }) {
  return (
    <ActionForm action={savePost} submitLabel={post ? "Save post" : "Create post"}>
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        <Card className="flex flex-col gap-5 p-6">
          <Field label="Title" htmlFor="title">
            <input id="title" name="title" defaultValue={post?.title} required className={`${inputClass} text-[16px] font-semibold`} />
          </Field>
          <Field label="Excerpt" htmlFor="excerpt" hint="One or two sentences shown on the blog list and at the top of the post.">
            <textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt} rows={3} className={inputClass} />
          </Field>
          <Field
            label="Article"
            htmlFor="body"
            hint={
              <>
                Leave a blank line between paragraphs. Start a line with <code>## </code> for a heading, <code>&gt; </code> for a
                quote, or <code>- </code> for bullet points.
              </>
            }
          >
            <textarea
              id="body"
              name="body"
              defaultValue={post ? blocksToText(post.body) : ""}
              rows={22}
              className={`${inputClass} font-mono text-[13px] leading-[1.7]`}
            />
          </Field>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-5 p-6">
            <Field label="Status" htmlFor="status" hint="Drafts are only visible here.">
              <select id="status" name="status" defaultValue={post?.status ?? "draft"} className={inputClass}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
            <label className="flex items-center gap-3 text-[14px] font-semibold text-ink">
              <input type="checkbox" name="featured" defaultChecked={post?.featured} className="size-4 accent-[#087a77]" />
              Feature at the top of the blog
            </label>
            <Field label="Publish date" htmlFor="published_on">
              <input
                id="published_on"
                name="published_on"
                type="date"
                defaultValue={post?.published_on ?? new Date().toISOString().slice(0, 10)}
                className={inputClass}
              />
            </Field>
          </Card>
          <Card className="flex flex-col gap-5 p-6">
            <Field label="Category" htmlFor="category">
              <select id="category" name="category" defaultValue={post?.category ?? POST_CATEGORIES[0]} className={inputClass}>
                {POST_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Author" htmlFor="author">
              <input id="author" name="author" defaultValue={post?.author ?? "QORLIQ Team"} className={inputClass} />
            </Field>
            <Field label="Read time" htmlFor="read_time" hint="Leave empty to work it out from the article length.">
              <input id="read_time" name="read_time" defaultValue={post?.read_time} placeholder="e.g. 5 min read" className={inputClass} />
            </Field>
            <Field label="URL slug" htmlFor="slug" hint={post ? `qorliq.com/blog/${post.slug}` : "Leave empty to create it from the title."}>
              <input id="slug" name="slug" defaultValue={post?.slug} className={inputClass} />
            </Field>
          </Card>
          <Card className="p-6">
            <ImageField name="image" label="Cover image" defaultValue={post?.image} folder="posts" />
          </Card>
        </div>
      </div>
    </ActionForm>
  );
}
