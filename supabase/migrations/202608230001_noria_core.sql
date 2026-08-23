create extension if not exists pgcrypto;

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  source_id text not null unique,
  agent_id text not null unique,
  token_id text not null,
  chain_id integer not null,
  name text not null,
  description text,
  owner_address text,
  is_verified boolean not null default false,
  is_testnet boolean not null default false,
  is_active boolean,
  supported_protocols jsonb not null default '[]'::jsonb,
  categories jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  services jsonb not null default '{}'::jsonb,
  x402_supported boolean not null default false,
  total_feedbacks integer not null default 0,
  average_score numeric,
  health_status text,
  created_at timestamptz,
  updated_at timestamptz,
  source_updated_at timestamptz,
  source_url text not null,
  raw_record jsonb not null default '{}'::jsonb,
  observed_at timestamptz not null default now()
);

create index if not exists agents_chain_idx on public.agents(chain_id);
create index if not exists agents_updated_idx on public.agents(source_updated_at desc);
create index if not exists agents_name_idx on public.agents using gin(to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(description,'')));

create table if not exists public.agent_sources (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.agents(id) on delete cascade,
  source_name text not null,
  source_url text not null,
  retrieved_at timestamptz not null default now(),
  payload_hash text,
  unique(agent_id, source_name, source_url)
);

create table if not exists public.agent_activity (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.agents(id) on delete cascade,
  activity_type text not null,
  activity_url text,
  activity_at timestamptz,
  source_name text not null,
  raw_record jsonb not null default '{}'::jsonb,
  observed_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  risk_preference text check (risk_preference in ('low','medium','high','unknown')) default 'unknown',
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_agents (
  user_id uuid not null references auth.users(id) on delete cascade,
  agent_id uuid not null references public.agents(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id, agent_id)
);

create table if not exists public.saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  query text not null,
  intent jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.comparisons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  agent_ids uuid[] not null,
  query text,
  created_at timestamptz not null default now()
);

create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  agent_token_id text,
  goal text not null,
  expiry text not null,
  spend_limit numeric,
  status text not null default 'draft' check (status in ('draft','awaiting_approval','active','completed','failed','paused','revoked')),
  wallet_address text,
  execution_available boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mission_events (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.missions(id) on delete cascade,
  event_type text not null,
  message text,
  tx_hash text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.agents enable row level security;
alter table public.agent_sources enable row level security;
alter table public.agent_activity enable row level security;
alter table public.profiles enable row level security;
alter table public.saved_agents enable row level security;
alter table public.saved_searches enable row level security;
alter table public.comparisons enable row level security;
alter table public.missions enable row level security;
alter table public.mission_events enable row level security;

drop policy if exists "public can read agents" on public.agents;
create policy "public can read agents" on public.agents for select using (true);
drop policy if exists "public can read agent sources" on public.agent_sources;
create policy "public can read agent sources" on public.agent_sources for select using (true);
drop policy if exists "public can read agent activity" on public.agent_activity;
create policy "public can read agent activity" on public.agent_activity for select using (true);

create policy "users manage own profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "users manage saved agents" on public.saved_agents for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage saved searches" on public.saved_searches for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users read own comparisons" on public.comparisons for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users manage own missions" on public.missions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users read own mission events" on public.mission_events for select using (exists (select 1 from public.missions m where m.id = mission_id and m.user_id = auth.uid()));

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
