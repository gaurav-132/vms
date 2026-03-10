-- Dynamic multi-tenant base schema for VMS
-- MVP behavior is organization-first, but schema remains extensible for other tenant types.

begin;

create extension if not exists pgcrypto;

create table if not exists public.tenant_types (
  code text primary key,
  label text not null
);

insert into public.tenant_types (code, label)
values
  ('organization', 'Organization'),
  ('school_college', 'School / College'),
  ('society', 'Society')
on conflict (code) do nothing;

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type_code text not null references public.tenant_types(code),
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'security', 'user')),
  created_at timestamptz not null default now(),
  unique (tenant_id, user_id)
);

create table if not exists public.gates (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (tenant_id, name)
);

create table if not exists public.visitors (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  full_name text not null,
  phone text,
  company text,
  created_at timestamptz not null default now()
);

create table if not exists public.entries (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  gate_id uuid not null references public.gates(id) on delete restrict,
  visitor_id uuid not null references public.visitors(id) on delete restrict,
  created_by_user_id uuid references auth.users(id) on delete set null,
  purpose text,
  status text not null default 'checked_in' check (status in ('checked_in', 'checked_out', 'rejected')),
  check_in_at timestamptz not null default now(),
  check_out_at timestamptz,
  created_at timestamptz not null default now(),
  constraint valid_checkout_time check (check_out_at is null or check_out_at >= check_in_at)
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  plan_code text not null default 'starter',
  status text not null default 'trial' check (status in ('trial', 'active', 'past_due', 'canceled')),
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_memberships_tenant_user on public.memberships (tenant_id, user_id);
create index if not exists idx_gates_tenant on public.gates (tenant_id);
create index if not exists idx_visitors_tenant on public.visitors (tenant_id);
create index if not exists idx_entries_tenant_status on public.entries (tenant_id, status);
create index if not exists idx_entries_gate on public.entries (gate_id);

create or replace function public.is_tenant_member(target_tenant uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.memberships m
    where m.tenant_id = target_tenant
      and m.user_id = auth.uid()
  );
$$;

alter table public.tenants enable row level security;
alter table public.memberships enable row level security;
alter table public.gates enable row level security;
alter table public.visitors enable row level security;
alter table public.entries enable row level security;
alter table public.subscriptions enable row level security;

create policy "tenant members can view tenant"
  on public.tenants for select
  using (public.is_tenant_member(id));

create policy "tenant members can view memberships"
  on public.memberships for select
  using (public.is_tenant_member(tenant_id));

create policy "admins can manage memberships"
  on public.memberships for all
  using (
    exists (
      select 1
      from public.memberships m
      where m.tenant_id = memberships.tenant_id
        and m.user_id = auth.uid()
        and m.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.memberships m
      where m.tenant_id = memberships.tenant_id
        and m.user_id = auth.uid()
        and m.role = 'admin'
    )
  );

create policy "tenant members can access gates"
  on public.gates for all
  using (public.is_tenant_member(tenant_id))
  with check (public.is_tenant_member(tenant_id));

create policy "tenant members can access visitors"
  on public.visitors for all
  using (public.is_tenant_member(tenant_id))
  with check (public.is_tenant_member(tenant_id));

create policy "tenant members can access entries"
  on public.entries for all
  using (public.is_tenant_member(tenant_id))
  with check (public.is_tenant_member(tenant_id));

create policy "tenant admins can access subscriptions"
  on public.subscriptions for all
  using (
    exists (
      select 1
      from public.memberships m
      where m.tenant_id = subscriptions.tenant_id
        and m.user_id = auth.uid()
        and m.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.memberships m
      where m.tenant_id = subscriptions.tenant_id
        and m.user_id = auth.uid()
        and m.role = 'admin'
    )
  );

commit;
