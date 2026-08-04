-- ==============================================================================
-- UPDATE DATA STATISTIK, WILAYAH DUSUN, & DOKUMEN TRANSPARANSI RKPDES 2026
-- Peraturan Desa Surorejo Nomor 7 Tahun 2025 (RKPDes Tahun 2026)
-- ==============================================================================

-- 1. Update Demographic Stats (Desa dalam Angka)
UPDATE public.demographic_stat SET label = 'Penduduk', value = '1.288', icon = 'users' WHERE sort_order = 1 OR label ILIKE '%penduduk%';
UPDATE public.demographic_stat SET label = 'Kepala Keluarga', value = '469 KK', icon = 'home' WHERE sort_order = 2 OR label ILIKE '%KK%' OR label ILIKE '%Kepala%';
UPDATE public.demographic_stat SET label = 'Luas Wilayah', value = '185,04 Ha', icon = 'map' WHERE sort_order = 3 OR label ILIKE '%luas%';
UPDATE public.demographic_stat SET label = 'Wilayah Dusun', value = '6 Dusun', icon = 'building' WHERE sort_order = 4 OR label ILIKE '%RT%' OR label ILIKE '%Dusun%';

-- 2. Update Data Wilayah Dusun & Nama Kepala Dusun (Kadus) Resmi RKPDes 2026
UPDATE public.village_area SET dusun = 'Dusun Surobayan', head_name = 'Agung Supangkat', population = 190, rw_count = 1, rt_count = 1 WHERE sort_order = 1 OR dusun ILIKE '%Surobayan%';
UPDATE public.village_area SET dusun = 'Dusun Kleben', head_name = 'Budi Santoso', population = 316, rw_count = 1, rt_count = 1 WHERE sort_order = 2 OR dusun ILIKE '%Kleben%';
UPDATE public.village_area SET dusun = 'Dusun Kragilan Lor', head_name = 'Ari Fitriyanto', population = 231, rw_count = 1, rt_count = 1 WHERE sort_order = 3 OR dusun ILIKE '%Kragilan Lor%';
UPDATE public.village_area SET dusun = 'Dusun Kragilan Kidul', head_name = 'Gian Bisono', population = 170, rw_count = 1, rt_count = 1 WHERE sort_order = 4 OR dusun ILIKE '%Kragilan Kidul%';
UPDATE public.village_area SET dusun = 'Dusun Kenanggulan', head_name = 'Usman', population = 244, rw_count = 1, rt_count = 1 WHERE sort_order = 5 OR dusun ILIKE '%Kenanggulan%';
UPDATE public.village_area SET dusun = 'Dusun Kiyudan', head_name = 'Dimas Pratikto', population = 137, rw_count = 1, rt_count = 1 WHERE sort_order = 6 OR dusun ILIKE '%Kiyudan%';

-- 3. Tambahkan Dokumen Transparansi RKPDes 2026
INSERT INTO public.transparency_doc (title, doc_type, fiscal_year, file_url, description)
SELECT 
  'Peraturan Desa Surorejo No. 7 Tahun 2025 (RKPDes Tahun 2026)', 
  'rkpdes', 
  2026, 
  '/RKPDes 2026.pdf', 
  'Dokumen resmi Rencana Kerja Pemerintah Desa (RKPDes) Surorejo Tahun 2026 mencakup prioritas pembangunan jalan dusun, internet desa, penanganan stunting, dan anggaran kerja.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.transparency_doc WHERE file_url = '/RKPDes 2026.pdf' OR title ILIKE '%RKPDes 2026%'
);
