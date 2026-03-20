-- Grand Voyage Transfers: bookings table
-- Stores submissions from both the main booking form and route modals

create table if not exists public.bookings (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- Source: 'main_form' | 'route_modal'
  source        text not null default 'main_form',

  -- Contact details
  first_name    text not null,
  last_name     text not null,
  email         text not null,
  phone         text,

  -- Route details (main form)
  origin_country      text,
  destination_country text,
  travel_date         text,
  passengers          int not null default 1,

  -- Route modal specific
  route_city          text,
  route_country       text,
  route_code          text,
  direction           text,         -- 'to' | 'from'
  return_date         text,

  -- Extra
  special_requests    text,

  -- Status for admin management
  status        text not null default 'new'  -- 'new' | 'contacted' | 'confirmed' | 'cancelled'
);

-- Enable RLS
alter table public.bookings enable row level security;

-- Anon users can INSERT (submit form)
create policy "bookings_insert_anon"
  on public.bookings for insert
  to anon
  with check (true);

-- Authenticated users (admin) can SELECT all
create policy "bookings_select_admin"
  on public.bookings for select
  to authenticated
  using (true);

-- Authenticated users (admin) can UPDATE status
create policy "bookings_update_admin"
  on public.bookings for update
  to authenticated
  using (true);
