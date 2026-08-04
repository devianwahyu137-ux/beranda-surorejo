-- ==============================================================================
-- SQL Script: Skema dan Seed Data Peta Tematik Desa Surorejo
-- Cara pakai: Copy-paste seluruh isi file ini ke menu "SQL Editor" di dashboard Supabase, lalu klik "Run".
-- ==============================================================================

-- 1. Buat Tabel Peta Tematik (Jika belum ada)
CREATE TABLE IF NOT EXISTS public.thematic_map (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  high_res_url TEXT NOT NULL,
  download_url TEXT NOT NULL,
  date_str TEXT NOT NULL DEFAULT 'Agustus 2026',
  scale TEXT,
  details_title TEXT,
  details_description TEXT[],
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.thematic_map ENABLE ROW LEVEL SECURITY;

-- Policy untuk akses publik (baca)
DROP POLICY IF EXISTS "Public can read thematic_map" ON public.thematic_map;
CREATE POLICY "Public can read thematic_map" 
  ON public.thematic_map FOR SELECT 
  USING (is_published = true);

-- Policy untuk admin (kelola)
DROP POLICY IF EXISTS "Authenticated can manage thematic_map" ON public.thematic_map;
CREATE POLICY "Authenticated can manage thematic_map" 
  ON public.thematic_map FOR ALL 
  USING (auth.role() = 'authenticated');

-- 2. Insert atau Update 5 Peta Tematik Resmi Desa Surorejo (KKN-PPM)
INSERT INTO public.thematic_map (
  slug, title, category, description, thumbnail_url, high_res_url, download_url, date_str, scale, details_title, details_description, sort_order
) VALUES 
(
  'peta-luasan-dan-profil-dusun',
  'Peta Luasan dan Profil Dusun',
  'Administrasi Wilayah',
  'Pemetaan luasan dan profil masing-masing dusun di Desa Surorejo, mencakup enam dusun: Surobayan, Kleben, Kragilan Lor, Kragilan Kidul, Kenanggulan, dan Kiyudan, beserta sebaran potensi usaha ekonomi masyarakat.',
  '/images/peta-luasan-profil-dusun.jpg',
  '/images/peta-luasan-profil-dusun.jpg',
  '/images/PETA%20DUSUN.pdf',
  'Agustus 2026',
  'Skala 1:5.000',
  'Peta Luasan dan Profil Dusun Desa Surorejo',
  ARRAY[
    'Peta Luasan dan Profil Dusun Desa Surorejo, Kecamatan Banyuurip, memberikan informasi mengenai pembagian wilayah, letak, dan luasan masing-masing dusun yang terdapat di Desa Surorejo. Wilayah Desa Surorejo terbagi menjadi enam dusun: Surobayan, Kleben, Kragilan Lor, Kragilan Kidul, Kenanggulan, dan Kiyudan.'
  ],
  1
),
(
  'peta-luasan-lahan-permukiman-dan-pertanian',
  'Peta Luasan Lahan Permukiman dan Pertanian',
  'Geosains & Lahan',
  'Analisis persebaran area persawahan produktif, kawasan pemukiman warga, perkebunan kelola, fasilitas publik, dan area terbuka hijau/hutan desa untuk dasar perencanaan pembangunan berkelanjutan.',
  '/images/peta-luasan-lahan-permukiman-pertanian.jpg',
  '/images/peta-luasan-lahan-permukiman-pertanian.jpg',
  '/images/PETA%20LUASAN.pdf',
  'Agustus 2026',
  'Skala 1:10.000',
  'Peta Luasan Lahan Permukiman dan Pertanian',
  ARRAY[
    'Peta Luasan Wilayah Permukiman dan Pertanian ini menyajikan informasi mengenai pola persebaran dan perbandingan lahan pemukiman dan pertanian di Desa Surorejo. Hasil pemetaan menunjukkan luas keseluruhan sekitar 1.993.234,10 m² atau 199,32 hektare, dengan dominasi sawah sebesar 61,52% dan permukiman 38,48%.'
  ],
  2
),
(
  'peta-batas-administrasi-desa-surorejo',
  'Peta Batas Administrasi Desa Surorejo',
  'Administrasi Wilayah',
  'Pemetaan resmi batas administratif Desa Surorejo beserta penetapan garis batas antar keenam dusun dan delineasi dengan desa-desa tetangga di wilayah Kecamatan Banyuurip, Kabupaten Purworejo.',
  '/images/peta-batas-administrasi.jpg',
  '/images/peta-batas-administrasi.jpg',
  '/images/Peta%20Batas%20Administrasi%20Desa%20Surorejo%20(KKN-PPM).pdf',
  'Agustus 2026',
  'Skala 1:6.500',
  'Peta Batas Administrasi Desa Surorejo (KKN-PPM UGM)',
  ARRAY[
    'Peta Batas Administrasi Desa Surorejo menyajikan representasi spasial dan kartografi resmi mengenai batas-batas teritorial Desa Surorejo, Kecamatan Banyuurip, Kabupaten Purworejo. Pemetaan ini menetapkan delineasi garis batas eksterior dengan desa-desa tetangga serta batas interior antar enam dusun di dalam desa: Surobayan, Kleben, Kragilan Lor, Kragilan Kidul, Kenanggulan, dan Kiyudan.',
    'Informasi geospasial administrasi ini sangat krusial sebagai instrumen referensi resmi pemerintahan desa dalam penegakan kepastian batas wilayah, tertib administrasi pertanahan, mitigasi sengketa perbatasan, serta menjadi dasar data pokok dalam mendukung penyusunan Rencana Tata Ruang dan Rencana Pembangunan Jangka Menengah Desa (RPJMDes) yang akurat dan berbadan hukum.'
  ],
  3
),
(
  'peta-penggunaan-lahan-desa-surorejo-2026',
  'Peta Penggunaan Lahan Desa Surorejo 2026',
  'Geosains & Tata Ruang',
  'Klasifikasi dan pemetaan pemanfaatan lahan terkini Tahun 2026, memvisualisasikan delineasi kawasan sawah produktif, permukiman terpadu, perkebunan kelola, pekarangan warga, hingga zona hijau desa.',
  '/images/peta-penggunaan-lahan-2026.jpg',
  '/images/peta-penggunaan-lahan-2026.jpg',
  '/images/Peta%20Penggunaan%20Lahan%20Desa%20Surorejo%202026%20(KKN-PPM).pdf',
  'Agustus 2026',
  'Skala 1:7.500',
  'Peta Penggunaan Lahan Desa Surorejo Tahun Anggaran 2026',
  ARRAY[
    'Peta Penggunaan Lahan Desa Surorejo Tahun 2026 menyajikan dokumentasi geospasial mutakhir mengenai kondisi eksisting tata guna lahan di seluruh wilayah Desa Surorejo. Peta ini memvisualisasikan klasifikasi zonasi lahan yang terbagi atas kawasan budidaya pertanian (sawah irigasi teknis dan sawah tadah hujan), lahan permukiman masyarakat, kawasan pekarangan intensif, jaringan irigasi, serta ruang terbuka hijau.',
    'Pemetaan tata guna lahan terbaru oleh tim KKN-PPM ini diinisiasi untuk menjawab tantangan tata ruang masa depan, memberikan masukan bagi pengendalian pemanfaatan ruang yang adaptif terhadap pertumbuhan permukiman warga, sekaligus berkomitmen menjaga ketahanan pangan lokal melalui upaya perlindungan Lahan Pertanian Pangan Berkelanjutan (LP2B).'
  ],
  4
),
(
  'peta-sebaran-fasilitas-pelayanan-infrastruktur-2026',
  'Peta Sebaran Fasilitas Pelayanan & Infrastruktur 2026',
  'Infrastruktur & Layanan',
  'Inventarisasi dan persebaran geospasial titik lokasi balai desa, fasilitas pendidikan, sarana ibadah, pelayanan kesehatan dasar (Posyandu/Pustustu), gardu publik, hingga jaringan konektivitas jalan desa.',
  '/images/peta-sebaran-fasilitas-infrastruktur-2026.jpg',
  '/images/peta-sebaran-fasilitas-infrastruktur-2026.jpg',
  '/images/Peta%20Sebaran%20Fasilitas%20Pelayanan%20dan%20Infrastruktur%202026%20Surorejo%20(KKN-PPM).pdf',
  'Agustus 2026',
  'Skala 1:5.000',
  'Peta Sebaran Fasilitas Pelayanan Publik & Infrastruktur 2026',
  ARRAY[
    'Peta Sebaran Fasilitas Pelayanan dan Infrastruktur Desa Surorejo Tahun 2026 memuat informasi geografi komprehensif atas letak seluruh titik pusat pelayanan publik dan jaringan sarana prasarana fisik di enam dusun Desa Surorejo. Titik pemetaan meliputi sentra pemerintahan (Kantor Kepala Desa dan Balai Desa), fasilitas keagamaan (masjid dan mushola di setiap RW/RT), fasilitas kesehatan dasar (Posyandu dan Pustustu), lembaga pendidikan (PAUD, TK, dan SD), serta sarana olahraga dan ruang aktivitas masyarakat.',
    'Selain penanda titik fasilitas pelayanan publik, peta ini menginventarisasi kondisi infrastruktur konektivitas berupa arteri jalan utama desa, jalan usaha tani, jembatan poros penghubung antar dusun, serta instalasi air bersih. Data geospasial ini berperan strategis bagi pemerintah desa dalam mengevaluasi keterjangkauan pelayanan masyarakat serta memastikan pemerataan alokasi dana pembangunan sarana dan prasarana.'
  ],
  5
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  thumbnail_url = EXCLUDED.thumbnail_url,
  high_res_url = EXCLUDED.high_res_url,
  download_url = EXCLUDED.download_url,
  details_title = EXCLUDED.details_title,
  details_description = EXCLUDED.details_description;
