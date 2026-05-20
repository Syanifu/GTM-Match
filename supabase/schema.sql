create extension if not exists "pgcrypto";

create table public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  current_role text,
  target_role text,
  industry text not null,
  created_at timestamptz not null default now()
);

create index on public.users (email);
create index on public.users (created_at desc);

create table public.responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  question_id text not null,
  answer text not null,
  dimension text not null,
  is_correct boolean not null,
  created_at timestamptz not null default now()
);

create index on public.responses (user_id);

create table public.results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  total_score int not null,
  band text not null,
  empathy_score int not null,
  gtm_score int not null,
  content_score int not null,
  technical_score int not null,
  credibility_score int not null,
  created_at timestamptz not null default now()
);

create unique index on public.results (user_id);

alter table public.users enable row level security;
alter table public.responses enable row level security;
alter table public.results enable row level security;

create policy "admin read users" on public.users
  for select using (auth.role() = 'authenticated');

create policy "admin read responses" on public.responses
  for select using (auth.role() = 'authenticated');

create policy "admin read results" on public.results
  for select using (auth.role() = 'authenticated');
