"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { readingTime, slugify, textToBlocks } from "@/lib/admin/blocks";
import { TAGS } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

/** What forms using useActionState get back. */
export type ActionState = { ok?: string; error?: string };

const str = (fd: FormData, key: string, max = 20000) => String(fd.get(key) ?? "").trim().slice(0, max);
const lines = (fd: FormData, key: string) =>
  str(fd, key)
    .split("\n")
    .map((l) => l.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean);
const int = (fd: FormData, key: string) => {
  const n = Number.parseInt(str(fd, key), 10);
  return Number.isFinite(n) ? n : 0;
};

function friendly(error: { code?: string; message: string }) {
  if (error.code === "23505") return "That URL slug is already used by another item. Choose a different one.";
  return error.message;
}

/** Refresh the public site after content changes. */
function publish(tag: string) {
  updateTag(tag);
  revalidatePath("/", "layout");
}

/* ------------------------------------------------------------------- Auth */
export async function signIn(_: ActionState, fd: FormData): Promise<ActionState> {
  if (!isSupabaseConfigured()) return { error: "Supabase isn't connected yet." };
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: str(fd, "email", 320),
    password: String(fd.get("password") ?? ""),
  });
  if (error || !data.user) return { error: "That email and password don't match an account." };
  const { data: admin } = await supabase.from("admins").select("user_id").eq("user_id", data.user.id).maybeSingle();
  if (!admin) {
    await supabase.auth.signOut();
    return { error: "This account doesn't have admin access." };
  }
  redirect("/admin");
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

/* -------------------------------------------------------------- Inquiries */
export async function updateInquiry(_: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("inquiries")
    .update({ status: str(fd, "status", 20), notes: str(fd, "notes") || null })
    .eq("id", str(fd, "id", 64));
  if (error) return { error: error.message };
  revalidatePath("/admin", "layout");
  return { ok: "Saved" };
}

export async function deleteInquiry(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("inquiries").delete().eq("id", str(fd, "id", 64));
  revalidatePath("/admin", "layout");
  redirect("/admin/inquiries");
}

/* ----------------------------------------------------------- Applications */
export async function updateApplication(_: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("applications")
    .update({ status: str(fd, "status", 20), notes: str(fd, "notes") || null })
    .eq("id", str(fd, "id", 64));
  if (error) return { error: error.message };
  revalidatePath("/admin", "layout");
  return { ok: "Saved" };
}

export async function deleteApplication(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id", 64);
  const { data } = await supabase.from("applications").select("cv_path").eq("id", id).maybeSingle();
  if (data?.cv_path) await supabase.storage.from("cvs").remove([data.cv_path]);
  await supabase.from("applications").delete().eq("id", id);
  revalidatePath("/admin", "layout");
  redirect("/admin/applications");
}

/* ------------------------------------------------------------ Subscribers */
export async function deleteSubscriber(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("subscribers").delete().eq("id", str(fd, "id", 64));
  revalidatePath("/admin", "layout");
}

/* ------------------------------------------------------------------ Posts */
export async function savePost(_: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id", 64);
  const title = str(fd, "title", 300);
  if (!title) return { error: "Give the post a title." };
  const excerpt = str(fd, "excerpt", 600);
  const body = textToBlocks(str(fd, "body", 100000));
  const row = {
    title,
    slug: slugify(str(fd, "slug", 120) || title),
    excerpt,
    category: str(fd, "category", 40) || "STRATEGY",
    author: str(fd, "author", 120) || "QORLIQ Team",
    image: str(fd, "image", 1000) || null,
    published_on: str(fd, "published_on", 10) || new Date().toISOString().slice(0, 10),
    read_time: str(fd, "read_time", 40) || readingTime(body, excerpt),
    featured: fd.get("featured") === "on",
    status: str(fd, "status", 20) === "published" ? "published" : "draft",
    body,
  };
  if (!row.slug) return { error: "Add a URL slug using letters or numbers." };

  // Only one featured post at a time.
  if (row.featured) {
    await supabase.from("posts").update({ featured: false }).eq("featured", true).neq("id", id || "00000000-0000-0000-0000-000000000000");
  }

  if (id) {
    const { error } = await supabase.from("posts").update(row).eq("id", id);
    if (error) return { error: friendly(error) };
    publish(TAGS.posts);
    return { ok: row.status === "published" ? "Saved and live on the site" : "Saved as draft" };
  }
  const { data, error } = await supabase.from("posts").insert(row).select("id").single();
  if (error) return { error: friendly(error) };
  publish(TAGS.posts);
  redirect(`/admin/posts/${data.id}?created=1`);
}

export async function deletePost(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("posts").delete().eq("id", str(fd, "id", 64));
  publish(TAGS.posts);
  redirect("/admin/posts");
}

/* ------------------------------------------------------------------ Roles */
export async function saveRole(_: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id", 64);
  const title = str(fd, "title", 200);
  if (!title) return { error: "Give the role a title." };
  const status = str(fd, "status", 20);
  const row = {
    title,
    slug: slugify(str(fd, "slug", 120) || title),
    department: str(fd, "department", 120),
    location: str(fd, "location", 120),
    summary: str(fd, "summary", 2000),
    responsibilities: lines(fd, "responsibilities"),
    requirements: lines(fd, "requirements"),
    sort: int(fd, "sort"),
    status: ["draft", "open", "closed"].includes(status) ? status : "draft",
  };
  if (!row.slug) return { error: "Add a URL slug using letters or numbers." };
  if (row.slug === "open-application") return { error: "That slug is reserved. Choose a different one." };

  if (id) {
    const { error } = await supabase.from("roles").update(row).eq("id", id);
    if (error) return { error: friendly(error) };
    publish(TAGS.roles);
    return { ok: row.status === "open" ? "Saved and listed on the careers page" : "Saved" };
  }
  const { data, error } = await supabase.from("roles").insert(row).select("id").single();
  if (error) return { error: friendly(error) };
  publish(TAGS.roles);
  redirect(`/admin/roles/${data.id}?created=1`);
}

export async function deleteRole(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("roles").delete().eq("id", str(fd, "id", 64));
  publish(TAGS.roles);
  redirect("/admin/roles");
}

/* ----------------------------------------------------------- Case studies */
export async function saveCaseStudy(_: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id", 64);
  const name = str(fd, "name", 300);
  if (!name) return { error: "Give the case study a name." };
  const row = {
    name,
    slug: slugify(str(fd, "slug", 120) || name),
    subtitle: str(fd, "subtitle", 300),
    sector: str(fd, "sector", 120),
    industry: str(fd, "industry", 200),
    summary: str(fd, "summary", 1000),
    tags: str(fd, "tags", 500)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    image: str(fd, "image", 1000) || null,
    challenge: str(fd, "challenge"),
    delivered: str(fd, "delivered"),
    solution: str(fd, "solution"),
    results: str(fd, "results"),
    sort: int(fd, "sort"),
    status: str(fd, "status", 20) === "published" ? "published" : "draft",
  };
  if (!row.slug) return { error: "Add a URL slug using letters or numbers." };

  if (id) {
    const { error } = await supabase.from("case_studies").update(row).eq("id", id);
    if (error) return { error: friendly(error) };
    publish(TAGS.caseStudies);
    return { ok: row.status === "published" ? "Saved and live on the site" : "Saved as draft" };
  }
  const { data, error } = await supabase.from("case_studies").insert(row).select("id").single();
  if (error) return { error: friendly(error) };
  publish(TAGS.caseStudies);
  redirect(`/admin/case-studies/${data.id}?created=1`);
}

export async function deleteCaseStudy(fd: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("case_studies").delete().eq("id", str(fd, "id", 64));
  publish(TAGS.caseStudies);
  redirect("/admin/case-studies");
}

/* --------------------------------------------------------------- Settings */
export async function saveSettings(_: ActionState, fd: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const row = {
    projects: int(fd, "projects"),
    countries: int(fd, "countries"),
    industries: int(fd, "industries"),
    satisfaction: Math.min(100, Math.max(0, int(fd, "satisfaction"))),
  };
  if (Object.values(row).some((v) => v < 0)) return { error: "Numbers can't be negative." };
  const { error } = await supabase.from("settings").update(row).eq("id", 1);
  if (error) return { error: error.message };
  publish(TAGS.settings);
  return { ok: "Saved and updated across the site" };
}
