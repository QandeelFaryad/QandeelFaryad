-- QORLIQ website + admin panel schema.
-- Run once in Supabase: Dashboard → SQL Editor → New query → paste this file → Run.
-- Safe to re-run: every statement checks for what already exists.

-- ---------------------------------------------------------------- Admins
-- Only users listed here can open /admin. Add yourself after creating your login
-- (see supabase/README.md).
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

drop policy if exists "admins can see admins" on public.admins;
create policy "admins can see admins" on public.admins
  for select to authenticated using ((select public.is_admin()));

-- Keeps updated_at current on content tables.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ------------------------------------------------------------- Inquiries
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  phone text,
  whatsapp boolean not null default false,
  site_url text,
  services text[] not null default '{}',
  -- Answers to service-specific questions: [{service, question, answer}]
  details jsonb not null default '[]',
  stage text,
  budget text,
  timeline text,
  message text,
  page text,
  referrer text,
  utm text,
  status text not null default 'new' check (status in ('new', 'contacted', 'won', 'lost', 'archived')),
  notes text
);
-- Columns added after launch; safe to re-run on an existing database.
alter table public.inquiries add column if not exists phone text;
alter table public.inquiries add column if not exists whatsapp boolean not null default false;
alter table public.inquiries add column if not exists site_url text;
alter table public.inquiries add column if not exists details jsonb not null default '[]';
alter table public.inquiries add column if not exists stage text;
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
alter table public.inquiries enable row level security;

-- ---------------------------------------------------------- Applications
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  role text,
  name text not null,
  email text not null,
  portfolio text,
  linkedin text,
  message text,
  cv_path text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'interview', 'hired', 'rejected')),
  notes text
);
create index if not exists applications_created_at_idx on public.applications (created_at desc);
alter table public.applications enable row level security;

-- ----------------------------------------------------------- Subscribers
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  page text
);
alter table public.subscribers enable row level security;

-- Submissions are written by the website's server with the secret key (which
-- bypasses row level security), so visitors get no direct access at all.
drop policy if exists "admins manage inquiries" on public.inquiries;
create policy "admins manage inquiries" on public.inquiries
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "admins manage applications" on public.applications;
create policy "admins manage applications" on public.applications
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "admins manage subscribers" on public.subscribers;
create policy "admins manage subscribers" on public.subscribers
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- ----------------------------------------------------------------- Posts
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  category text not null default 'STRATEGY',
  author text not null default 'QORLIQ Team',
  image text,
  read_time text not null default '5 min read',
  published_on date not null default current_date,
  featured boolean not null default false,
  -- Array of blocks: {type: "p"|"h2"|"quote", text} or {type: "list", items: [...]}
  body jsonb not null default '[]',
  status text not null default 'draft' check (status in ('draft', 'published'))
);
alter table public.posts enable row level security;
drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts
  for each row execute function public.touch_updated_at();

-- ----------------------------------------------------------------- Roles
create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  department text not null default '',
  location text not null default '',
  summary text not null default '',
  responsibilities text[] not null default '{}',
  requirements text[] not null default '{}',
  sort integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'open', 'closed'))
);
alter table public.roles enable row level security;
drop trigger if exists roles_touch on public.roles;
create trigger roles_touch before update on public.roles
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------- Case studies
create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  name text not null,
  subtitle text not null default '',
  sector text not null default '',
  industry text not null default '',
  summary text not null default '',
  tags text[] not null default '{}',
  image text,
  challenge text not null default '',
  delivered text not null default '',
  solution text not null default '',
  results text not null default '',
  sort integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published'))
);
alter table public.case_studies enable row level security;
drop trigger if exists case_studies_touch on public.case_studies;
create trigger case_studies_touch before update on public.case_studies
  for each row execute function public.touch_updated_at();

-- -------------------------------------------------------------- Settings
-- A single row holding the "company at a glance" numbers.
create table if not exists public.settings (
  id integer primary key default 1 check (id = 1),
  projects integer not null default 60,
  countries integer not null default 9,
  industries integer not null default 15,
  satisfaction integer not null default 96,
  updated_at timestamptz not null default now()
);
alter table public.settings enable row level security;
insert into public.settings (id) values (1) on conflict (id) do nothing;
drop trigger if exists settings_touch on public.settings;
create trigger settings_touch before update on public.settings
  for each row execute function public.touch_updated_at();

-- Visitors can read published content; admins can read and change everything.
drop policy if exists "public reads published posts" on public.posts;
create policy "public reads published posts" on public.posts
  for select to anon, authenticated using (status = 'published' or (select public.is_admin()));
drop policy if exists "admins manage posts" on public.posts;
create policy "admins manage posts" on public.posts
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "public reads open roles" on public.roles;
create policy "public reads open roles" on public.roles
  for select to anon, authenticated using (status = 'open' or (select public.is_admin()));
drop policy if exists "admins manage roles" on public.roles;
create policy "admins manage roles" on public.roles
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "public reads published case studies" on public.case_studies;
create policy "public reads published case studies" on public.case_studies
  for select to anon, authenticated using (status = 'published' or (select public.is_admin()));
drop policy if exists "admins manage case studies" on public.case_studies;
create policy "admins manage case studies" on public.case_studies
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

drop policy if exists "public reads settings" on public.settings;
create policy "public reads settings" on public.settings
  for select to anon, authenticated using (true);
drop policy if exists "admins update settings" on public.settings;
create policy "admins update settings" on public.settings
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- --------------------------------------------------------------- Storage
-- "media": public images for posts and case studies, uploaded from /admin.
-- "cvs":   private CV uploads from the careers form, readable only by admins.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 8388608, array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'])
on conflict (id) do nothing;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cvs', 'cvs', false, 10485760, array[
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
])
on conflict (id) do nothing;

drop policy if exists "admins upload media" on storage.objects;
create policy "admins upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and (select public.is_admin()));
drop policy if exists "admins change media" on storage.objects;
create policy "admins change media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and (select public.is_admin()));
drop policy if exists "admins delete media" on storage.objects;
create policy "admins delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and (select public.is_admin()));
drop policy if exists "admins read cvs" on storage.objects;
create policy "admins read cvs" on storage.objects
  for select to authenticated using (bucket_id = 'cvs' and (select public.is_admin()));
drop policy if exists "admins delete cvs" on storage.objects;
create policy "admins delete cvs" on storage.objects
  for delete to authenticated using (bucket_id = 'cvs' and (select public.is_admin()));
