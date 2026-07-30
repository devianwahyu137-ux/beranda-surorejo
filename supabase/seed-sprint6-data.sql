-- ============================================================
-- SEED DATA: Sprint 6 (Input Perangkat Desa & Produk Hukum)
-- ============================================================

-- 1. Bersihkan data lama jika ada (agar tidak dobel saat di-run berkali-kali)
DELETE FROM public.village_official;
DELETE FROM public.legal_document WHERE title = 'Perkades No. 1 Tahun 2025 tentang Penjabaran APBDes TA 2025';

-- 2. Input 14 Perangkat Desa (8 Inti + 6 Kadus)
INSERT INTO public.village_official (name, position, sort_order, image_url) VALUES
  ('Margino', 'Kepala Desa', 1, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712179073.jpg'),
  ('Suwardi', 'Sekretaris Desa', 2, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712211577.jpg'),
  ('Ponidjo', 'Kepala Seksi Pemerintahan', 3, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712250476.jpg'),
  ('Sudrajad', 'Kepala Urusan T.U & Umum', 4, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712301523.jpg'),
  ('Liana D.S', 'Kepala Urusan Perencanaan', 5, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712330525.jpg'),
  ('Samngani', 'Kepala Seksi Pelayanan', 6, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712360716.jpg'),
  ('Adilla S', 'Kepala Urusan Keuangan', 7, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712397112.jpg'),
  ('Dalyono', 'Kepala Seksi Kesejahteraan', 8, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712426349.jpg'),
  ('Agung Supangkat', 'Kepala Dusun Surobayan', 9, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712460092.jpg'),
  ('Budi Santoso', 'Kepala Dusun Kleben', 10, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712484606.jpg'),
  ('Ari F.', 'Kepala Dusun Kragilan Lor', 11, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712521618.jpg'),
  ('Gian Bisono', 'Kepala Dusun Kragilan Kidul', 12, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712548128.jpg'),
  ('Usman', 'Kepala Dusun Kenanggulan', 13, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712597347.jpg'),
  ('Dimas', 'Kepala Dusun Kiyudan', 14, 'https://nzpkqxxryjgoqfedycam.supabase.co/storage/v1/object/public/umkm-photos/officials/1784712620877.jpg');

-- 3. Input Produk Hukum (Perkades APBDes 2025)
INSERT INTO public.legal_document (title, category, document_number, year, description, is_published) VALUES
  (
    'Perkades No. 1 Tahun 2025 tentang Penjabaran APBDes TA 2025', 
    'peraturan_lainnya', -- kategori menggunakan peraturan_lainnya karena ini Perkades, bukan Perdes
    '1', 
    2025, 
    'Peraturan Kepala Desa Surorejo Nomor 1 Tahun 2025 tentang Penjabaran Anggaran Pendapatan dan Belanja Desa (APBDes) Surorejo Tahun Anggaran 2025', 
    true
  );
