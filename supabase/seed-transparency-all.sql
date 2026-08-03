-- ==============================================================================
-- SQL Script: Impor dan Pembaruan Dokumen Transparansi Keuangan (2024 - 2026)
-- Cara pakai: Copy-paste seluruh isi file ini ke menu "SQL Editor" di dashboard Supabase, lalu klik "Run".
-- ==============================================================================

-- TAHUN 2025: Laporan Realisasi DD Tahap 2 OMSPAN (belum ada sebelumnya)
INSERT INTO transparency_doc (title, doc_type, fiscal_year, file_url, description)
SELECT 
  'Laporan Realisasi Anggaran Dana Desa (DD) Tahap 2 OMSPAN TA 2025', 
  'realisasi', 
  2025, 
  '/dokumen/2025/LRA DD Tahap 2 OMSPAN 2025.pdf', 
  'Dokumen resmi Laporan Realisasi Anggaran (LRA) penyaluran Dana Desa Tahap 2 melalui sistem OMSPAN (Online Monitoring Sistem Perbendaharaan dan Anggaran Negara) Kementerian Keuangan RI untuk Desa Surorejo Tahun Anggaran 2025.'
WHERE NOT EXISTS (
  SELECT 1 FROM transparency_doc WHERE fiscal_year = 2025 AND title ILIKE '%OMSPAN%'
);

-- TAHUN 2026: LRA APBDes Semester I
INSERT INTO transparency_doc (title, doc_type, fiscal_year, file_url, description)
SELECT 
  'Laporan Realisasi Anggaran (LRA) APBDes Semester I TA 2026', 
  'realisasi', 
  2026, 
  '/dokumen/2026/LRA APBDes Semester I 2026.pdf', 
  'Laporan Realisasi Anggaran Pendapatan dan Belanja Desa (APBDes) Surorejo untuk periode Semester I (Januari - Juni) Tahun Anggaran 2026 sebagai perwujudan akuntabilitas dan pengawasan publik.'
WHERE NOT EXISTS (
  SELECT 1 FROM transparency_doc WHERE fiscal_year = 2026 AND title ILIKE '%Semester I%'
);

-- TAHUN 2026: Penjabaran APBDes
INSERT INTO transparency_doc (title, doc_type, fiscal_year, file_url, description)
SELECT 
  'Peraturan Kepala Desa Surorejo: Penjabaran APBDes TA 2026', 
  'apbdes', 
  2026, 
  '/dokumen/2026/Penjabaran APBDes 2026.pdf', 
  'Dokumen Penjabaran Anggaran Pendapatan dan Belanja Desa Surorejo Tahun Anggaran 2026. Memuat rincian teknis pos pendapatan, alokasi per bidang kegiatan belanja desa, serta struktur pembiayaan.'
WHERE NOT EXISTS (
  SELECT 1 FROM transparency_doc WHERE fiscal_year = 2026 AND title ILIKE '%Penjabaran%'
);

-- TAHUN 2026: Penyertaan Modal BUMDes
INSERT INTO transparency_doc (title, doc_type, fiscal_year, file_url, description)
SELECT 
  'Peraturan Desa: Penyertaan Modal Desa pada BUMDes Surorejo TA 2026', 
  'lainnya', 
  2026, 
  '/dokumen/2026/Penyertaan Modal pada BUMDes 2026.pdf', 
  'Dokumen regulasi dan penetapan alokasi anggaran Penyertaan Modal Pemerintah Desa Surorejo kepada Badan Usaha Milik Desa (BUMDes) Tahun Anggaran 2026 guna memperkuat perekonomian desa.'
WHERE NOT EXISTS (
  SELECT 1 FROM transparency_doc WHERE fiscal_year = 2026 AND title ILIKE '%BUMDes%'
);

-- TAHUN 2026: Sumber PADes
INSERT INTO transparency_doc (title, doc_type, fiscal_year, file_url, description)
SELECT 
  'Rincian Pemetaan dan Optimalisasi Sumber PADes TA 2026', 
  'apbdes', 
  2026, 
  '/dokumen/2026/Sumber PADes 2026.pdf', 
  'Dokumen analisis dan rancangan penerimaan Pendapatan Asli Desa (PADes) Surorejo Tahun Anggaran 2026, mencakup hasil usaha desa, hasil aset desa, swadaya, partisipasi, dan gotong royong masyarakat.'
WHERE NOT EXISTS (
  SELECT 1 FROM transparency_doc WHERE fiscal_year = 2026 AND title ILIKE '%PADes%'
);

-- TAHUN 2026: RKPDes 2026
INSERT INTO transparency_doc (title, doc_type, fiscal_year, file_url, description)
SELECT 
  'Peraturan Desa Surorejo No. 7 Tahun 2025 (RKPDes Tahun 2026)', 
  'lainnya', 
  2026, 
  '/dokumen/2026/RKPDes 2026.pdf', 
  'Dokumen resmi Rencana Kerja Pemerintah Desa (RKPDes) Surorejo Tahun 2026 mencakup prioritas pembangunan jalan dusun, internet desa, penanganan stunting, dan anggaran kerja.'
WHERE NOT EXISTS (
  SELECT 1 FROM transparency_doc WHERE fiscal_year = 2026 AND title ILIKE '%RKPDes%' AND title NOT ILIKE '%Perubahan%'
);

-- TAHUN 2026: Infografis APBDes 2026
INSERT INTO transparency_doc (title, doc_type, fiscal_year, file_url, description)
SELECT 
  'Infografis Dashboard Transparansi APBDes Tahun Anggaran 2026', 
  'infografis', 
  2026, 
  '/Dashboard%20Transparansi%20APBDes%20Desa%20Surorejo.png', 
  'Visualisasi resmi dan ringkasan APBDes Surorejo TA 2026. Menampilkan Pendapatan Desa Rp880.767.500, Belanja Desa Rp887.203.546, Pembiayaan Netto Rp6.436.046, serta komitmen tata kelola yang transparan, akuntabel, dan partisipatif.'
WHERE NOT EXISTS (
  SELECT 1 FROM transparency_doc WHERE fiscal_year = 2026 AND title ILIKE '%Infografis%'
);
