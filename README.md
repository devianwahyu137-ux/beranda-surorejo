# Beranda Surorejo

Sistem Informasi Desa Surorejo, Kecamatan Banyuurip, Kabupaten Purworejo. Web ini berfungsi sebagai portal layanan administrasi desa dan direktori terpadu untuk UMKM lokal.

## 🔗 Akses Cepat (Localhost)

Jika aplikasi sudah berjalan di komputer Anda, Anda bisa langsung mengaksesnya melalui tautan berikut:

- **🌐 Halaman Utama (Publik):** [http://localhost:3000](http://localhost:3000)
- **🔐 Panel Admin:** [http://localhost:3000/admin](http://localhost:3000/admin) (atau [/admin/login](http://localhost:3000/admin/login))

---

## 🛠 Panduan Instalasi dan Menjalankan Proyek

Berikut adalah langkah-langkah untuk menjalankan proyek ini di komputer Anda.

### 1. Persiapan Database (Supabase)
Aplikasi ini menggunakan **Supabase** untuk Database PostgreSQL, Authentication, dan Storage (penyimpanan foto).

1. Buat project baru di [Supabase Dashboard](https://supabase.com/dashboard).
2. Buka menu **SQL Editor**, salin seluruh isi file `supabase/schema.sql`, dan jalankan (*Run*). Ini otomatis akan membuat tabel dan *RLS Policies*.
3. Buka menu **Storage**, buat bucket baru bernama **`umkm-photos`** dan pastikan opsi **Public bucket** dicentang.
4. Buka menu **Authentication > Users**, lalu buat *user* baru dengan email dan password. **Centang opsi "Auto Confirm User"**. Akun ini akan digunakan untuk login ke Panel Admin.

### 2. Konfigurasi Environment (`.env.local`)
1. Salin file `.env.local.example` menjadi `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Isi nilai yang kosong di dalam file `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Ambil dari Supabase > Project Settings > API.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Ambil dari Supabase > Project Settings > API (anon/public key).
   - `NEXT_PUBLIC_ADMIN_WA`: Isi dengan nomor WhatsApp Admin Desa (contoh: `6281234567890`).

### 3. Menjalankan Aplikasi
Buka terminal di direktori proyek ini, lalu jalankan perintah berikut:

```bash
# Install seluruh dependency
npm install

# Jalankan development server
npm run dev
```

Tunggu hingga muncul pesan `Ready in ...` di terminal, lalu buka browser dan akses tautan di atas.

---

## 📖 Panduan Penggunaan Admin
Untuk panduan penggunaan Panel Admin secara mendetail (mengelola UMKM, layanan, mengubah halaman profil, dan mengelola foto), silakan merujuk ke dokumen:

👉 **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)**

## 🚀 Panduan Deployment
Untuk panduan deploy aplikasi ini ke server *production* (seperti Vercel), silakan merujuk ke dokumen:

👉 **[DEPLOYMENT_RUNBOOK.md](./DEPLOYMENT_RUNBOOK.md)**

---
*Dibuat menggunakan Next.js (App Router), Tailwind CSS v4, dan Supabase.*
