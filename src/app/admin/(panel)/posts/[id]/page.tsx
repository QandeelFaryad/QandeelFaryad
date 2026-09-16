import { notFound } from "next/navigation";
import ConfirmSubmit from "@/components/admin/ConfirmSubmit";
import PostForm, { type PostRecord } from "@/components/admin/PostForm";
import { PageHeader, StatusBadge } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import { deletePost } from "../../../actions";

export const metadata = { title: "Edit post" };

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const [{ id }, { created }] = await Promise.all([params, searchParams]);
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).maybeSingle<PostRecord>();
  if (!post) notFound();

  return (
    <>
      <PageHeader
        back={{ href: "/admin/posts", label: "All posts" }}
        title={post.title}
        description={
          <>
            {created ? "Post created. " : ""}
            <StatusBadge status={post.status} />
          </>
        }
        actions={
          <>
            {post.status === "published" ? (
              <a href={`/blog/${post.slug}`} target="_blank" className="text-[13px] font-bold uppercase tracking-wide text-accent-deep hover:text-ink">
                View on site ↗
              </a>
            ) : null}
            <ConfirmSubmit action={deletePost} id={post.id} message="Delete this post permanently?">
              Delete
            </ConfirmSubmit>
          </>
        }
      />
      <PostForm post={post} />
    </>
  );
}
