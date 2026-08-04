-- ============================================================
-- Beranda Surorejo - schema.sql
-- Target: Supabase (PostgreSQL)
-- 
-- INSTRUKSI:
-- 1. Buat project Supabase di https://supabase.com/dashboard
-- 2. Buka SQL Editor di dashboard Supabase
-- 3. Paste seluruh isi file ini dan jalankan
-- 4. Buat bucket Storage publik bernama "umkm-photos":
--    - Buka Storage di dashboard Supabase
--    - Klik "New bucket"
--    - Nama: umkm-photos
--    - Centang "Public bucket"
--    - Klik "Create bucket"
-- 5. Buat user admin:
--    - Buka Authentication > Users di dashboard
--    - Klik "Add user" > "Create new user"
--    - Isi email dan password
--    - Centang "Auto Confirm User"
-- 6. Salin URL dan anon key dari Settings > API ke .env.local
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- TABLE: umkm ----------
create table public.umkm (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  slug             text not null unique,
  category         text not null
                     check (category in ('kuliner','kerajinan','hasil_tani','jasa','toko','lainnya')),
  description      text,
  whatsapp_number  text not null,
  phone_number     text,
  address_text     text,
  latitude         double precision,
  longitude        double precision,
  operating_hours  text,
  last_verified_at timestamptz not null default now(),
  is_published     boolean not null default false,
  consent_given    boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index umkm_category_idx        on public.umkm (category);
create index umkm_is_published_idx    on public.umkm (is_published);
create index umkm_last_verified_idx   on public.umkm (last_verified_at);

-- ---------- TABLE: umkm_photo ----------
create table public.umkm_photo (
  id         uuid primary key default gen_random_uuid(),
  umkm_id    uuid not null references public.umkm(id) on delete cascade,
  url        text not null,
  sort_order integer not null default 0
);

create index umkm_photo_umkm_id_idx on public.umkm_photo (umkm_id);

-- ---------- TABLE: service ----------
create table public.service (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null,
  requirements     text,
  steps            text,
  hours            text,
  contact          text,
  form_url         text,
  last_verified_at timestamptz not null default now(),
  is_published     boolean not null default false,
  sort_order       integer not null default 0,
  updated_at       timestamptz not null default now()
);

create index service_is_published_idx on public.service (is_published);

-- ---------- TABLE: page ----------
create table public.page (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,
  title      text not null,
  content    text,
  updated_at timestamptz not null default now()
);

-- ---------- updated_at trigger ----------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger umkm_set_updated_at    before update on public.umkm
  for each row execute function public.set_updated_at();
create trigger service_set_updated_at before update on public.service
  for each row execute function public.set_updated_at();
create trigger page_set_updated_at    before update on public.page
  for each row execute function public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- MVP: satu admin tunggal => authenticated = admin (ADR-4)
-- ============================================================
alter table public.umkm        enable row level security;
alter table public.umkm_photo  enable row level security;
alter table public.service     enable row level security;
alter table public.page        enable row level security;

-- Public read: hanya konten tayang
create policy "public read published umkm" on public.umkm
  for select using (is_published = true);

create policy "public read photos of published umkm" on public.umkm_photo
  for select using (
    exists (
      select 1 from public.umkm u
      where u.id = umkm_photo.umkm_id and u.is_published = true
    )
  );

create policy "public read published service" on public.service
  for select using (is_published = true);

create policy "public read page" on public.page
  for select using (true);

-- Admin (authenticated) full access
create policy "admin all umkm"       on public.umkm
  for all to authenticated using (true) with check (true);
create policy "admin all umkm_photo" on public.umkm_photo
  for all to authenticated using (true) with check (true);
create policy "admin all service"    on public.service
  for all to authenticated using (true) with check (true);
create policy "admin all page"       on public.page
  for all to authenticated using (true) with check (true);

-- ============================================================
-- SEED: halaman statis wajib
-- ============================================================
insert into public.page (slug, title, content) values
  ('profil', 'Profil Desa Surorejo', 'Desa Surorejo adalah desa yang terletak di Kecamatan Banyuurip, Kabupaten Purworejo, Provinsi Jawa Tengah. Desa ini memiliki potensi pertanian dan usaha mikro yang beragam.'),
  ('kontak', 'Kontak Desa Surorejo', 'Kantor Desa Surorejo, Kecamatan Banyuurip, Kabupaten Purworejo, Jawa Tengah. Jam Pelayanan: Senin-Jumat, 09.00-15.00 WIB.')
on conflict (slug) do nothing;
