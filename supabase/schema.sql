-- Keshamrit Supabase backend schema
-- Run this in Supabase SQL Editor before connecting the Vercel env vars.

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type public.order_status as enum (
      'new',
      'confirmed',
      'packed',
      'delivered',
      'cancelled'
    );
  end if;
end $$;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  phone text not null,
  city text not null,
  address text not null,
  quantity integer not null default 1 check (quantity > 0),
  product_name text not null default 'Keshamrit Herbal Hair Oil',
  unit_price integer not null default 499 check (unit_price >= 0),
  total_amount integer not null check (total_amount >= 0),
  source text not null default 'website',
  status public.order_status not null default 'new',
  whatsapp_message text,
  notes text
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_phone_idx on public.orders (phone);

alter table public.orders enable row level security;

-- Website inserts and ERP reads are performed server-side with the Supabase secret key.
-- No anon/public table policy is required for this setup.
