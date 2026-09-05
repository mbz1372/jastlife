create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null,
  name text not null,
  subtitle text,
  description text,
  price bigint not null check (price >= 0),
  compare_at_price bigint check (compare_at_price is null or compare_at_price >= 0),
  stock integer not null default 0 check (stock >= 0),
  badge text,
  type text not null default 'case',
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text unique not null,
  customer_name text not null,
  phone text not null,
  email text,
  province text,
  city text,
  address text not null,
  postal_code text,
  subtotal bigint not null check (subtotal >= 0),
  shipping_amount bigint not null default 0 check (shipping_amount >= 0),
  total_amount bigint not null check (total_amount >= 0),
  status text not null default 'pending_payment',
  payment_status text not null default 'pending',
  payment_provider text,
  payment_reference text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price bigint not null check (unit_price >= 0),
  line_total bigint not null check (line_total >= 0),
  created_at timestamptz not null default now()
);

create index if not exists products_active_category_idx on public.products(active, category);
create index if not exists products_slug_idx on public.products(slug);
create index if not exists orders_code_idx on public.orders(order_code);
create index if not exists orders_created_idx on public.orders(created_at desc);
create index if not exists order_items_order_idx on public.order_items(order_id);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "public can read active products" on public.products;
create policy "public can read active products" on public.products for select using (active = true);

-- Orders and order_items intentionally have no anon policies.
-- Server routes use SUPABASE_SERVICE_ROLE_KEY and bypass RLS.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('products', 'products', true, 8388608, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- Uploads are performed only from the server using the service role key.
