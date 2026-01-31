-- Add to your Supabase SQL editor to create the project ratings table

create table if not exists public.project_ratings (
  id uuid primary key default gen_random_uuid(),
  project_id text not null,
  rating text not null check (rating in ('up', 'down')),
  user_fingerprint text not null,
  created_at timestamptz not null default now()
);

-- RLS: allow anyone to read and insert ratings
alter table public.project_ratings enable row level security;

create policy "Anyone can read ratings"
  on public.project_ratings for select
  using (true);

create policy "Anyone can insert ratings"
  on public.project_ratings for insert
  with check (true);

-- Create an index for faster lookups
create index if not exists idx_project_ratings_project_id on public.project_ratings(project_id);
create index if not exists idx_project_ratings_fingerprint on public.project_ratings(project_id, user_fingerprint);
