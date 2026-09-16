import PostForm from "@/components/admin/PostForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata = { title: "New post" };

export default async function NewPostPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader back={{ href: "/admin/posts", label: "All posts" }} title="New post" />
      <PostForm />
    </>
  );
}
