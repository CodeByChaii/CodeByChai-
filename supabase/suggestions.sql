-- Add to your Supabase SQL editor to create the project suggestions table

create table if not exists public.project_suggestions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  suggestion text not null,
  created_at timestamptz not null default now(),
  emailed boolean not null default false
);

-- RLS: allow anyone to insert suggestions
alter table public.project_suggestions enable row level security;

create policy "Anyone can submit suggestions"
  on public.project_suggestions for insert
  with check (true);

create policy "Auth can read suggestions"
  on public.project_suggestions for select
  using (auth.role() = 'authenticated');

create policy "Auth can update suggestions"
  on public.project_suggestions for update
  using (auth.role() = 'authenticated');
