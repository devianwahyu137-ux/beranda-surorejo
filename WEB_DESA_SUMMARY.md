# Dokumentasi & Ringkasan Komprehensif: Beranda Surorejo (Sistem Informasi Desa)

Dokumen ini merupakan acuan resmi yang membedah struktur, fitur, hingga spesifikasi teknis (Tech Stack) dari platform website **Beranda Surorejo**. Dokumen ini dapat digunakan sebagai bahan presentasi, laporan pengembangan, maupun panduan teknis bagi *developer* lain.

---

## 1. Ikhtisar Proyek (Project Overview)
**Beranda Surorejo** adalah sebuah Sistem Informasi Desa (SID) modern berbasis web yang dibangun untuk Desa Surorejo, Kec. Banyuurip, Kab. Purworejo. 

Website ini dirancang bukan sebagai pengganti web resmi Kominfo, melainkan sebagai **platform interaktif dan fungsional** untuk melayani kebutuhan warga sehari-hari. Fokus utamanya adalah keterbukaan informasi (transparansi), pelayanan administrasi, dan pemberdayaan ekonomi warga melalui direktori UMKM lokal.

---

## 2. Fitur & Modul Utama (Sisi Publik/Warga)
Website ini memiliki antarmuka yang sangat responsif, mendukung *mobile-first design*, dan dilengkapi dengan animasi halus (Micro-animations).

1. **Beranda (Home)**
   - Sambutan Kepala Desa (dilengkapi foto resmi).
   - *Quick Access* ke Layanan Administrasi dan UMKM.
   - Ringkasan Statistik Desa (Penduduk, Luas Wilayah).
   - *Feed* Berita & Agenda kegiatan desa terbaru.
   - Form Aspirasi warga yang terhubung langsung.

2. **Profil Desa & Transparansi**
   - Sejarah, Visi & Misi, dan Demografi lengkap.
   - Peta Wilayah interaktif.
   - **Struktur Organisasi**: Menampilkan profil Perangkat Desa, Pengurus PKK (beserta program kerja), dan Lembaga-lembaga desa (BPD, LPMD, Karang Taruna).
   - **Transparansi Keuangan**: Warga dapat mengunduh dokumen finansial desa (APBDes, RAB, LPJ, dll) berdasarkan Tahun Anggaran.

3. **Layanan Administrasi**
   - Daftar lengkap SOP dan persyaratan pembuatan surat/dokumen (SKTM, Surat Domisili, dll).
   - Informasi jam buka kantor desa.

4. **Direktori UMKM**
   - Katalog digital pengusaha lokal Desa Surorejo.
   - Dilengkapi sistem kategori (Kuliner, Jasa, Kerajinan, dll).
   - Detail UMKM memiliki fitur galeri foto (Carousel) dan tombol "Hubungi via WhatsApp".

5. **Peta Desa (GIS Sederhana)**
   - Peta interaktif terintegrasi untuk melihat titik lokasi strategis desa (Kantor Desa, Masjid, Sekolah, dll) dan pemetaan sebaran UMKM.

---

## 3. Fitur Panel Admin (Content Management System)
Sistem dilengkapi dengan *Dashboard Admin* khusus perangkat desa yang diamankan dengan sistem *Authentication* (Login).

- **Manajemen Konten Menyeluruh**: Admin dapat melakukan CRUD (*Create, Read, Update, Delete*) untuk semua modul (Berita, Agenda, UMKM, Layanan, Galeri, Perangkat, PKK, Lembaga, Lokasi, dan Statistik).
- **Sistem Upload File Terintegrasi**: Menggunakan input "Pilih File" (*Native File Upload*) yang langsung terhubung ke *Cloud Storage*. Otomatis melakukan *hosting* gambar/PDF tanpa warga perlu repot menyalin *link* Google Drive.
- **Validasi Keamanan**: Pembatasan tipe file dan ukuran maksimal (contoh: max 10MB untuk dokumen transparansi, max 2MB untuk galeri).

---

## 4. Arsitektur & Spesifikasi Teknis (Tech Stack)

Website ini dibangun menggunakan standar industri modern masa kini (*Enterprise-grade*), menjamin performa tinggi, SEO maksimal, dan keamanan data.

### A. Core Framework & Bahasa Pemrograman
* **Next.js (Versi 16 - App Router)**: *Framework* React tercanggih saat ini. Memungkinkan perpaduan antara *Server-Side Rendering* (SSR) untuk kecepatan dan SEO, serta *Client-Side Rendering* (CSR) untuk interaktivitas pengguna.
* **TypeScript (Strict Mode)**: Digunakan sebagai bahasa utama menggantikan JavaScript biasa. TypeScript memastikan setiap data (*database schema*, properti komponen) memiliki tipe yang ketat, meminimalisir *bug/error* saat *runtime* (*Type-safe*).
* **React 19**: *Library* UI dengan fitur *hooks* terbaru.

### B. Desain Antarmuka & Styling
* **Tailwind CSS (Versi 4)**: *Utility-first CSS framework* untuk desain yang sangat kustom, responsif, dan ringan.
* **Micro-Animations & GPU Acceleration**: Animasi *scroll-reveal* (elemen muncul saat di-scroll) dioptimasi menggunakan instruksi `translate3d`, `scale3d`, dan `will-change: transform`. Hal ini memaksa *browser* merender animasi menggunakan GPU (Kartu Grafis), bukan CPU, sehingga **bebas dari lag (60 FPS)** meskipun diakses dari HP dengan spesifikasi rendah.
* **Next/Image**: Sistem optimasi gambar otomatis bawaan Next.js. Semua gambar otomatis diubah ke format WebP (jauh lebih ringan dari JPG/PNG), di-*resize* sesuai layar perangkat, dan di-*lazy-load* (baru di-download jika masuk ke layar pengguna).

### C. Database & Backend Services
* **Supabase**: *Platform* Backend-as-a-Service (BaaS) *open-source* alternatif Firebase.
  * **PostgreSQL Database**: Relational Database Management System (RDBMS) kelas berat dan sangat andal untuk menyimpan semua data desa.
  * **Supabase Storage**: Bucket penyimpanan khusus (*Cloud Storage*) untuk menampung gambar UMKM, foto berita, dan dokumen PDF Transparansi Keuangan.
  * **Supabase Auth**: Mengamankan *route* ke dashboard admin.
  * **Row Level Security (RLS)**: Keamanan di tingkat *database*. Publik hanya bisa membaca (SELECT), sedangkan operasi ubah/hapus (INSERT, UPDATE, DELETE) dikunci ketat hanya untuk *User Authenticated*.

### D. Fitur Lanjutan (Advanced Features)
* **Progressive Web App (PWA)**: Menggunakan plugin `@ducanh2912/next-pwa`. Website ini dirancang agar dapat **di-install/diunduh layaknya aplikasi native** di layar depan (*Home Screen*) HP Android/iOS warga maupun di desktop. Mendukung *caching offline* parsial agar *loading* instan.
* **Leaflet.js & React-Leaflet**: *Library mapping/GIS open-source* terkemuka yang digunakan untuk merender Peta Desa Surorejo tanpa menggunakan Google Maps (hemat biaya API dan jauh lebih ringan).
* **SEO Optimized**: Penggunaan tag meta dinamis untuk memastikan website mudah ditemukan di Google Search.

---

## 5. Ringkasan Kesimpulan
Beranda Surorejo bukan sekadar "website profil biasa". Secara *under the hood* (di balik layar), ini adalah sebuah **Web Application terpadu** (PWA) yang menggunakan *stack* teknologi setara dengan *startup* teknologi masa kini (Next.js + TypeScript + PostgreSQL). 

Strukturnya dirancang **modular**, memisahkan logika keamanan di *server* dan interaktivitas ringan di *client*, memberikan performa tinggi bagi warga, sekaligus kemudahan manajemen (*Zero-hassle*) bagi perangkat desa Surorejo.
