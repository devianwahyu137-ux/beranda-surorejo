-- ============================================================
-- Migration: Sprint 4 (WebGIS Interactive Map)
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. Add coordinates to existing UMKM table
alter table public.umkm add column if not exists latitude numeric;
alter table public.umkm add column if not exists longitude numeric;

-- 2. Create Strategic Locations table (for Balai Desa, Fasilitas, dll)
create table if not exists public.strategic_location (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text not null check (category in ('pemerintahan', 'ibadah', 'pendidikan', 'kesehatan', 'lainnya')),
  description text,
  image_url   text,
  latitude    numeric not null,
  longitude   numeric not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- RLS for strategic_location
alter table public.strategic_location enable row level security;

create policy "Public can read strategic_location"
  on public.strategic_location for select
  using (true);

create policy "Authenticated users can insert strategic_location"
  on public.strategic_location for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update strategic_location"
  on public.strategic_location for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete strategic_location"
  on public.strategic_location for delete
  using (auth.role() = 'authenticated');

-- Insert Balai Desa Surorejo as default marker
insert into public.strategic_location (name, category, description, latitude, longitude)
values (
  'Balai Desa Surorejo',
  'pemerintahan',
  'Pusat layanan administrasi dan pemerintahan Desa Surorejo.',
  -7.726058,  -- Approx coordinate for Surorejo, modify as needed
  109.969197
) on conflict do nothing;
