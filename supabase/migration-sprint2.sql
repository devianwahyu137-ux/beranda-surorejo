-- ============================================================
-- Migration: Sprint 2 (Perangkat Desa, PKK, Galeri)
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ---------- TABLE: village_official ----------
create table if not exists public.village_official (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  position    text not null,
  image_url   text,
  color       text not null default 'from-primary-300 to-primary-500',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------- TABLE: pkk_official ----------
create table if not exists public.pkk_official (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  position    text not null,
  image_url   text,
  color       text not null default 'from-pink-300 to-rose-400',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------- TABLE: pkk_program ----------
create table if not exists public.pkk_program (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------- TABLE: gallery ----------
create table if not exists public.gallery (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null check (category in ('umum','pkk')),
  image_url   text not null,
  color       text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Indexes for sorting
create index if not exists village_official_sort_idx on public.village_official (sort_order);
create index if not exists pkk_official_sort_idx on public.pkk_official (sort_order);
create index if not exists pkk_program_sort_idx on public.pkk_program (sort_order);
create index if not exists gallery_sort_category_idx on public.gallery (category, sort_order);

-- RLS Enable
alter table public.village_official enable row level security;
alter table public.pkk_official enable row level security;
alter table public.pkk_program enable row level security;
alter table public.gallery enable row level security;

-- Public READ
create policy "public read village_official" on public.village_official for select using (true);
create policy "public read pkk_official" on public.pkk_official for select using (true);
create policy "public read pkk_program" on public.pkk_program for select using (true);
create policy "public read gallery" on public.gallery for select using (true);

-- Admin ALL
create policy "admin all village_official" on public.village_official to authenticated using (true) with check (true);
create policy "admin all pkk_official" on public.pkk_official to authenticated using (true) with check (true);
create policy "admin all pkk_program" on public.pkk_program to authenticated using (true) with check (true);
create policy "admin all gallery" on public.gallery to authenticated using (true) with check (true);

-- Insert Initial Data (Optional defaults)
insert into public.pkk_program (title, description, sort_order) values
('Penghayatan dan Pengamalan Pancasila', 'Meningkatkan pemahaman dan pengamalan nilai-nilai Pancasila dalam kehidupan bermasyarakat.', 1),
('Gotong Royong', 'Membangun semangat kebersamaan dan gotong royong antar warga desa.', 2),
('Pangan', 'Meningkatkan ketahanan pangan keluarga melalui pemanfaatan pekarangan dan diversifikasi pangan.', 3),
('Sandang', 'Memenuhi kebutuhan sandang keluarga melalui keterampilan menjahit dan membuat kerajinan.', 4),
('Perumahan & Tata Laksana Rumah Tangga', 'Mendorong terciptanya rumah sehat dan lingkungan yang bersih dan tertata.', 5),
('Pendidikan & Keterampilan', 'Meningkatkan kualitas pendidikan dan keterampilan anggota keluarga.', 6),
('Kesehatan', 'Meningkatkan derajat kesehatan keluarga melalui posyandu, imunisasi, dan pola hidup sehat.', 7),
('Pengembangan Kehidupan Berkoperasi', 'Mendorong partisipasi dalam koperasi dan usaha ekonomi produktif.', 8),
('Kelestarian Lingkungan Hidup', 'Melestarikan lingkungan melalui penghijauan, pengelolaan sampah, dan konservasi.', 9),
('Perencanaan Sehat', 'Mendorong perencanaan keluarga yang sehat dan sejahtera.', 10)
on conflict do nothing;
