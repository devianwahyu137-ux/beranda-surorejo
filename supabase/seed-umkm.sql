-- ============================================================
-- Beranda Surorejo — UMKM Seed Data untuk Testing
-- Jalankan setelah schema.sql dan seed.sql
-- ============================================================

INSERT INTO public.umkm (slug, name, category, description, whatsapp_number, phone_number, address_text, operating_hours, is_published, consent_given, latitude, longitude) VALUES
(
  'keripik-bu-sri',
  'Keripik Bu Sri',
  'kuliner',
  'Keripik singkong renyah dengan berbagai varian rasa: original, pedas, keju, dan balado. Dibuat dari singkong pilihan yang diproses secara tradisional sehingga menghasilkan keripik yang gurih dan tahan lama.',
  '6281234567001',
  '0275123001',
  'Dusun Krajan RT 01/RW 02, Desa Surorejo',
  'Senin - Sabtu, 07.00 - 17.00 WIB',
  true,
  true,
  -7.7,
  110.0
),
(
  'batik-tulis-surorejo',
  'Batik Tulis Surorejo',
  'kerajinan',
  'Batik tulis khas Purworejo dengan motif-motif tradisional dan kontemporer. Menggunakan pewarna alami dari bahan-bahan lokal. Menerima pesanan custom untuk seragam dan souvenir.',
  '6281234567002',
  NULL,
  'Dusun Ngledok RT 03/RW 01, Desa Surorejo',
  'Senin - Jumat, 08.00 - 16.00 WIB',
  true,
  true,
  -7.71,
  110.01
),
(
  'toko-tani-makmur',
  'Toko Tani Makmur',
  'hasil_tani',
  'Menyediakan beras organik, gula jawa, dan hasil pertanian lokal berkualitas langsung dari petani Desa Surorejo. Tersedia juga pupuk dan bibit tanaman.',
  '6281234567003',
  '0275123003',
  'Dusun Krajan RT 02/RW 01, Desa Surorejo',
  'Setiap hari, 06.00 - 18.00 WIB',
  true,
  true,
  NULL,
  NULL
),
(
  'bengkel-las-jaya',
  'Bengkel Las Jaya',
  'jasa',
  'Bengkel las dan konstruksi baja ringan. Melayani pembuatan pagar, kanopi, teralis, dan konstruksi bangunan. Pengalaman lebih dari 15 tahun di bidang pengelasan.',
  '6281234567004',
  NULL,
  'Dusun Karanganyar RT 04/RW 03, Desa Surorejo',
  'Senin - Sabtu, 08.00 - 17.00 WIB',
  true,
  true,
  NULL,
  NULL
),
(
  'warung-makan-sederhana',
  'Warung Makan Sederhana',
  'kuliner',
  'Warung makan dengan menu masakan Jawa tradisional. Nasi rames, soto, pecel, dan aneka lauk pauk segar setiap hari. Harga terjangkau, porsi kenyang.',
  '6281234567005',
  NULL,
  'Dusun Krajan RT 01/RW 01, Desa Surorejo',
  'Setiap hari, 06.00 - 14.00 WIB',
  true,
  true,
  -7.69,
  110.02
),
(
  'toko-kelontong-berkah',
  'Toko Kelontong Berkah',
  'toko',
  'Toko kelontong lengkap menyediakan kebutuhan sehari-hari, sembako, perlengkapan rumah tangga, dan alat tulis sekolah. Harga bersaing dan lokasi strategis di pusat desa.',
  '6281234567006',
  '0275123006',
  'Dusun Krajan RT 01/RW 01, Desa Surorejo',
  'Setiap hari, 05.30 - 21.00 WIB',
  true,
  true,
  NULL,
  NULL
)
ON CONFLICT (slug) DO NOTHING;
