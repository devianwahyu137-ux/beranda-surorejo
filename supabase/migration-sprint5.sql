-- ============================================================
-- Migration: Sprint 5 (Berita, Statistik, Produk Hukum, Agenda, Lembaga)
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ---------- TABLE: article ----------
create table if not exists public.article (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  title          text not null,
  excerpt        text,
  content        text not null,
  category       text not null check (category in ('berita','pengumuman','program_kerja')),
  thumbnail_url  text,
  author         text not null default 'Admin Desa',
  is_published   boolean not null default false,
  published_at   timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists article_slug_idx on public.article (slug);
create index if not exists article_category_idx on public.article (category);
create index if not exists article_is_published_idx on public.article (is_published);
create index if not exists article_published_at_idx on public.article (published_at desc);

-- ---------- TABLE: demographic_stat ----------
create table if not exists public.demographic_stat (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  value       text not null,
  icon        text not null default 'users',
  sort_order  integer not null default 0,
  updated_at  timestamptz not null default now()
);

create index if not exists demographic_stat_sort_idx on public.demographic_stat (sort_order);

-- ---------- TABLE: village_area ----------
create table if not exists public.village_area (
  id          uuid primary key default gen_random_uuid(),
  dusun       text not null,
  rw_count    integer not null default 0,
  rt_count    integer not null default 0,
  population  integer not null default 0,
  head_name   text,
  sort_order  integer not null default 0,
  updated_at  timestamptz not null default now()
);

create index if not exists village_area_sort_idx on public.village_area (sort_order);

-- ---------- TABLE: legal_document ----------
create table if not exists public.legal_document (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  category        text not null check (category in ('perdes','sk_kades','peraturan_lainnya')),
  document_number text,
  year            integer not null,
  description     text,
  file_url        text,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists legal_document_year_idx on public.legal_document (year desc);
create index if not exists legal_document_category_idx on public.legal_document (category);

-- ---------- TABLE: event ----------
create table if not exists public.event (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  description     text,
  location        text,
  event_date      timestamptz not null,
  event_end_date  timestamptz,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now()
);

create index if not exists event_date_idx on public.event (event_date desc);

-- ---------- TABLE: institution ----------
create table if not exists public.institution (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  category        text not null check (category in ('bpd','lpmd','karang_taruna','rt_rw','lainnya')),
  description     text,
  head_name       text,
  head_photo_url  text,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists institution_sort_idx on public.institution (sort_order);
create index if not exists institution_category_idx on public.institution (category);

-- ============================================================
-- TRIGGERS (updated_at)
-- ============================================================
create trigger article_set_updated_at before update on public.article
  for each row execute function public.set_updated_at();
create trigger demographic_stat_set_updated_at before update on public.demographic_stat
  for each row execute function public.set_updated_at();
create trigger village_area_set_updated_at before update on public.village_area
  for each row execute function public.set_updated_at();
create trigger legal_document_set_updated_at before update on public.legal_document
  for each row execute function public.set_updated_at();
create trigger institution_set_updated_at before update on public.institution
  for each row execute function public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.article enable row level security;
alter table public.demographic_stat enable row level security;
alter table public.village_area enable row level security;
alter table public.legal_document enable row level security;
alter table public.event enable row level security;
alter table public.institution enable row level security;

-- Public READ
create policy "public read published article" on public.article
  for select using (is_published = true);
create policy "public read demographic_stat" on public.demographic_stat
  for select using (true);
create policy "public read village_area" on public.village_area
  for select using (true);
create policy "public read published legal_document" on public.legal_document
  for select using (is_published = true);
create policy "public read published event" on public.event
  for select using (is_published = true);
create policy "public read institution" on public.institution
  for select using (true);

-- Admin ALL
create policy "admin all article" on public.article
  for all to authenticated using (true) with check (true);
create policy "admin all demographic_stat" on public.demographic_stat
  for all to authenticated using (true) with check (true);
create policy "admin all village_area" on public.village_area
  for all to authenticated using (true) with check (true);
create policy "admin all legal_document" on public.legal_document
  for all to authenticated using (true) with check (true);
create policy "admin all event" on public.event
  for all to authenticated using (true) with check (true);
create policy "admin all institution" on public.institution
  for all to authenticated using (true) with check (true);

-- ============================================================
-- SEED: Default Data
-- ============================================================

-- Default demographic stats
insert into public.demographic_stat (label, value, icon, sort_order) values
  ('Jumlah Penduduk', '3.250+', 'users', 1),
  ('Luas Wilayah', '450 Ha', 'map', 2),
  ('Jumlah RT', '28', 'home', 3),
  ('Jumlah RW', '6', 'building', 4)
on conflict do nothing;

-- Default village areas
insert into public.village_area (dusun, rw_count, rt_count, population, head_name, sort_order) values
  ('Dusun I Kragilan', 2, 8, 850, NULL, 1),
  ('Dusun II Surorejo', 2, 8, 920, NULL, 2),
  ('Dusun III Krajan', 1, 6, 780, NULL, 3),
  ('Dusun IV Karangasem', 1, 6, 700, NULL, 4)
on conflict do nothing;

-- Sample articles
insert into public.article (slug, title, excerpt, content, category, author, is_published, published_at) values
  ('selamat-datang-di-website-desa-surorejo',
   'Selamat Datang di Portal Desa Surorejo',
   'Portal layanan dan informasi digital Desa Surorejo kini hadir dengan tampilan baru yang lebih modern.',
   'Portal layanan dan informasi digital Desa Surorejo kini hadir dengan tampilan baru yang lebih modern dan mudah diakses. Melalui portal ini, warga dapat mengakses informasi layanan administrasi, direktori UMKM, profil desa, dan mengirim aspirasi langsung ke pemerintah desa.

Kami mengajak seluruh warga untuk memanfaatkan portal ini sebagai sarana komunikasi dan informasi yang efektif antara warga dan pemerintah desa.',
   'berita', 'Admin Desa', true, now()),
  ('program-umkm-desa-2026',
   'Program Pemberdayaan UMKM Desa Tahun 2026',
   'Pemerintah Desa Surorejo meluncurkan program pemberdayaan UMKM untuk meningkatkan ekonomi warga.',
   'Pemerintah Desa Surorejo pada tahun 2026 meluncurkan program pemberdayaan UMKM yang bertujuan untuk meningkatkan kapasitas dan daya saing usaha mikro kecil menengah di wilayah desa.

Program ini meliputi:
1. Pelatihan kewirausahaan dan manajemen usaha
2. Pendampingan pemasaran digital
3. Akses permodalan melalui koperasi desa
4. Pendaftaran UMKM di portal digital desa

Bagi warga yang tertarik, silakan menghubungi kantor desa untuk informasi lebih lanjut.',
   'program_kerja', 'Admin Desa', true, now() - interval '2 days'),
  ('pengumuman-jadwal-posyandu',
   'Jadwal Posyandu Bulan Juli 2026',
   'Posyandu rutin bulan Juli akan dilaksanakan di setiap dusun sesuai jadwal berikut.',
   'Dengan hormat, diberitahukan kepada seluruh warga Desa Surorejo bahwa jadwal Posyandu bulan Juli 2026 adalah sebagai berikut:

- Dusun I Kragilan: Rabu, 2 Juli 2026
- Dusun II Surorejo: Kamis, 3 Juli 2026
- Dusun III Krajan: Jumat, 4 Juli 2026
- Dusun IV Karangasem: Sabtu, 5 Juli 2026

Waktu: 08.00 - 12.00 WIB
Tempat: Balai RT masing-masing

Mohon kehadiran para ibu balita dan lansia. Terima kasih.',
   'pengumuman', 'Admin Desa', true, now() - interval '5 days')
on conflict (slug) do nothing;

-- Sample events
insert into public.event (title, description, location, event_date, is_published) values
  ('Musyawarah Desa (Musdes)', 'Musyawarah Desa untuk pembahasan RKPDes tahun 2027.', 'Balai Desa Surorejo', now() + interval '14 days', true),
  ('Kerja Bakti Bulanan', 'Kerja bakti bersama membersihkan lingkungan desa.', 'Seluruh wilayah desa', now() + interval '7 days', true),
  ('Pelatihan UMKM Digital', 'Pelatihan pemasaran digital untuk pelaku UMKM desa.', 'Aula Desa Surorejo', now() + interval '21 days', true)
on conflict do nothing;

-- Sample institutions
insert into public.institution (name, category, description, head_name, sort_order) values
  ('Badan Permusyawaratan Desa (BPD)', 'bpd', 'Lembaga yang melaksanakan fungsi pemerintahan yang anggotanya merupakan wakil dari penduduk desa.', NULL, 1),
  ('Lembaga Pemberdayaan Masyarakat Desa (LPMD)', 'lpmd', 'Lembaga kemasyarakatan yang bertugas membantu pemerintah desa dalam pemberdayaan masyarakat.', NULL, 2),
  ('Karang Taruna', 'karang_taruna', 'Organisasi sosial kemasyarakatan sebagai wadah pengembangan generasi muda.', NULL, 3)
on conflict do nothing;
