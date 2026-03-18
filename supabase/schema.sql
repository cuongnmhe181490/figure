create table if not exists public.gift_orders (
  id uuid primary key,
  review_token text not null unique,
  customer_name text not null,
  email text not null,
  phone text not null,
  note text not null default '',
  image_url text not null default '',
  image_file_name text not null default '',
  config jsonb not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  assets jsonb not null default '[]'::jsonb,
  feedback jsonb not null default '[]'::jsonb
);

create index if not exists gift_orders_created_at_idx on public.gift_orders (created_at desc);
create index if not exists gift_orders_review_token_idx on public.gift_orders (review_token);

insert into storage.buckets (id, name, public)
values ('gift-assets', 'gift-assets', true)
on conflict (id) do nothing;
