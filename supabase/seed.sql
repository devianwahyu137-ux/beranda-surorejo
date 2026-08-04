-- ============================================================
-- Beranda Surorejo — Seed Data untuk Testing
-- Jalankan setelah schema.sql
-- ============================================================

-- Seed layanan administrasi
INSERT INTO public.service (slug, title, requirements, steps, hours, contact, form_url, is_published, sort_order) VALUES
(
  'surat-keterangan-domisili',
  'Surat Keterangan Domisili',
  '1. Fotokopi KTP
2. Fotokopi Kartu Keluarga (KK)
3. Surat pengantar dari RT/RW
4. Pas foto 3x4 (2 lembar)',
  '1. Minta surat pengantar dari RT/RW setempat
2. Bawa persyaratan ke kantor desa
3. Isi formulir permohonan
4. Tunggu proses verifikasi
5. Ambil surat keterangan domisili',
  'Senin - Jumat, 09.00 - 15.00 WIB',
  'Sekretariat Desa Surorejo',
  NULL,
  true,
  1
),
(
  'surat-pengantar-ktp',
  'Surat Pengantar KTP',
  '1. Fotokopi Kartu Keluarga (KK)
2. Surat pengantar dari RT/RW
3. Pas foto 3x4 (3 lembar, latar merah/biru sesuai tahun lahir)',
  '1. Minta surat pengantar dari RT/RW
2. Datang ke kantor desa dengan persyaratan lengkap
3. Petugas desa memproses surat pengantar
4. Bawa surat pengantar ke Disdukcapil Kabupaten',
  'Senin - Jumat, 09.00 - 15.00 WIB',
  'Sekretariat Desa Surorejo',
  NULL,
  true,
  2
),
(
  'surat-keterangan-tidak-mampu',
  'Surat Keterangan Tidak Mampu (SKTM)',
  '1. Fotokopi KTP
2. Fotokopi Kartu Keluarga (KK)
3. Surat pengantar dari RT/RW
4. Fotokopi rekening listrik terakhir',
  '1. Minta surat pengantar dari RT/RW setempat
2. Kumpulkan semua persyaratan
3. Datang ke kantor desa
4. Isi formulir permohonan SKTM
5. Tunggu verifikasi dan tanda tangan Kepala Desa
6. Ambil SKTM',
  'Senin - Jumat, 09.00 - 15.00 WIB',
  'Sekretariat Desa Surorejo',
  NULL,
  true,
  3
),
(
  'surat-keterangan-usaha',
  'Surat Keterangan Usaha',
  '1. Fotokopi KTP
2. Fotokopi Kartu Keluarga (KK)
3. Surat pengantar dari RT/RW
4. Pas foto 3x4 (2 lembar)
5. Deskripsi usaha yang dijalankan',
  '1. Siapkan seluruh persyaratan
2. Minta surat pengantar dari RT/RW
3. Datang ke kantor desa
4. Isi formulir permohonan
5. Petugas memverifikasi data
6. Ambil Surat Keterangan Usaha',
  'Senin - Jumat, 09.00 - 15.00 WIB',
  'Sekretariat Desa Surorejo',
  NULL,
  true,
  4
)
ON CONFLICT (slug) DO NOTHING;

-- Update profil page content
UPDATE public.page SET
  content = 'Desa Surorejo adalah desa yang terletak di Kecamatan Banyuurip, Kabupaten Purworejo, Provinsi Jawa Tengah.

Desa ini memiliki potensi pertanian yang melimpah dan beragam usaha mikro kecil menengah (UMKM) yang menjadi tulang punggung perekonomian warga.

Dengan semangat gotong royong, masyarakat Desa Surorejo terus berupaya meningkatkan kesejahteraan dan kualitas hidup bersama.

Beranda Surorejo hadir sebagai sistem informasi desa yang memudahkan warga mengakses layanan administrasi dan membantu UMKM lokal agar lebih mudah ditemukan oleh pembeli dari luar desa.'
WHERE slug = 'profil';

-- Update kontak page content
UPDATE public.page SET
  content = 'Kantor Desa Surorejo
Kecamatan Banyuurip, Kabupaten Purworejo
Jawa Tengah

Jam Pelayanan:
Senin - Jumat: 09.00 - 15.00 WIB
Sabtu - Minggu: Tutup'
WHERE slug = 'kontak';
