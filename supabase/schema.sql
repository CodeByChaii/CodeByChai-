-- Run this in Supabase SQL Editor after creating your project.
-- Creates tables and storage bucket for the admin-editable portfolio.

-- Site settings (hero, banner, video, contact links)
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- Seed default keys (you can add more in the admin UI)
insert into public.site_settings (key, value) values
  ('hero', '{"title":"CodeByChai","subtitle":"Atthachai · Vibe coded projects"}'::jsonb),
  ('site', '{"name":"CodeByChai","fullName":"Atthachai","tagline":"Atthachai · Vibe coded projects","heroDescription":"Coding projects built for fun and learning. Try them on the web or download and run locally.","url":"https://codebychai.dev","github":"https://github.com/CodeByChai","twitter":"https://twitter.com/CodeByChai"}'::jsonb),
  ('media', '{"bannerImageUrl":null,"heroVideoUrl":null}'::jsonb)
on conflict (key) do nothing;

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  tech text[] not null default '{}',
  web_url text,
  download_url text,
  repo_url text,
  thumbnail_url text,
  stack text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: allow public read for site_settings and projects
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;

create policy "Public read site_settings"
  on public.site_settings for select using (true);

create policy "Public read projects"
  on public.projects for select using (true);

-- Only authenticated users (you) can insert/update/delete
create policy "Auth full access site_settings"
  on public.site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Auth full access projects"
  on public.projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage bucket for uploads (ZIPs, images, video)
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

-- Anyone can read; only authenticated can upload/update/delete
create policy "Public read uploads"
  on storage.objects for select using (bucket_id = 'uploads');

create policy "Auth upload uploads"
  on storage.objects for insert
  with check (bucket_id = 'uploads' and auth.role() = 'authenticated');

create policy "Auth update uploads"
  on storage.objects for update
  using (bucket_id = 'uploads' and auth.role() = 'authenticated');

create policy "Auth delete uploads"
  on storage.objects for delete
  using (bucket_id = 'uploads' and auth.role() = 'authenticated');
