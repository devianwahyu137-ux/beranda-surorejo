# Deployment Runbook — Beranda Surorejo

Panduan lengkap dari nol untuk men-deploy aplikasi Beranda Surorejo ke production.

## 1. Persiapan Supabase (Database & Auth)
1. Buka [Supabase Dashboard](https://supabase.com/dashboard) dan buat project baru.
2. Ke menu **SQL Editor**, buka file `supabase/schema.sql` (dari repo ini), lalu jalankan seluruh isinya.
   - *Ini akan membuat tabel `umkm`, `service`, `page`, dan RLS policies.*
3. Ke menu **Authentication > Users**, klik **Add User** -> **Create new user**.
   - Masukkan email dan password untuk admin.
   - Centang **Auto Confirm User**.
   - *Hanya akun ini yang akan memiliki akses ke panel `/admin`.*

## 2. Persiapan Supabase Storage (Foto)
1. Ke menu **Storage**, klik **New bucket**.
2. Beri nama bucket: **`umkm-photos`**.
3. **PENTING:** Centang **Public bucket**.
4. Di bucket `umkm-photos`, ke tab **Policies**.
5. Di bagian "Other policies under storage.objects", buat policy baru:
   - Pilih "For full customization".
   - Nama: `Admin full access`
   - Allowed operations: centang **SELECT**, **INSERT**, **UPDATE**, **DELETE**
   - Target roles: `authenticated`
   - *Policy ini memastikan admin yang sudah login bisa meng-upload dan menghapus foto lewat web admin.*

## 3. Deployment Vercel
1. Push kode ke GitHub.
2. Buka [Vercel](https://vercel.com/) dan import repository GitHub.
3. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL` : (Ambil dari Supabase > Settings > API)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` : (Ambil dari Supabase > Settings > API)
   - `NEXT_PUBLIC_ADMIN_WA` : (Nomor WA admin misal: `6281234567890`)
   - `NEXT_PUBLIC_SITE_URL` : (URL Vercel production Anda, misal: `https://beranda-surorejo.vercel.app`)
4. Klik **Deploy** dan tunggu sampai selesai.

---

## 4. Checklist Smoke-Test Pasca-Deploy
Setelah Vercel selesai build dan aplikasi live, lakukan pengujian berikut:

- [ ] **Login Admin:** Buka `/admin/login`, pastikan layout bersih tanpa Header/Footer publik. Login dengan kredensial yang dibuat di Supabase.
- [ ] **Akses Terlindungi:** Buka tab samaran (incognito), coba akses `/admin`. Harus redirect ke `/admin/login`.
- [ ] **CRUD UMKM:** Di dashboard admin, coba "Tambah UMKM" baru (isi nama, nomor WA).
- [ ] **Upload Foto:** Masuk ke edit UMKM tadi, coba upload foto di panel kanan.
- [ ] **Delete Foto:** Hapus foto tadi via tombol "×" merah. Cek di dashboard Supabase Storage, pastikan file fisiknya benar-benar hilang.
- [ ] **Publish UMKM:** Centang "Publikasikan" pada UMKM dan simpan.
- [ ] **Tampil Publik:** Buka beranda utama (`/`), pastikan UMKM tersebut muncul di bagian "UMKM Terbaru".
- [ ] **Tombol WA:** Klik tombol WhatsApp pada UMKM, pastikan mengarah ke wa.me dengan template pesan yang benar.
- [ ] **404 Unpublished:** Hilangkan centang "Publikasikan" di admin, lalu coba akses URL UMKM tersebut di publik. Harus menampilkan custom 404 page.
