# Panduan Admin — Beranda Surorejo

Panduan penggunaan panel admin untuk pengelola Desa Surorejo.

---

## 1. Login

1. Buka `https://[domain-anda]/admin/login`
2. Masukkan email dan password admin yang telah didaftarkan di Supabase
3. Klik **Masuk**

> **Catatan:** Hanya ada satu akun admin. Jangan bagikan kredensial kepada pihak yang tidak berkepentingan.

---

## 2. Dashboard

Setelah login, Anda akan melihat Dashboard yang menampilkan:

- **Total UMKM** — jumlah UMKM terdaftar dan yang sudah dipublikasikan
- **Total Layanan** — jumlah layanan administrasi terdaftar
- **Perlu Verifikasi** — jumlah konten yang sudah lebih dari 90 hari belum diverifikasi
- **Halaman** — jumlah halaman statis (profil, kontak)

### Daftar Konten Basi

Di bawah statistik, akan muncul daftar UMKM dan Layanan yang perlu diverifikasi ulang. Klik item untuk langsung mengedit.

---

## 3. Kelola UMKM

### Menambah UMKM Baru

1. Buka **Kelola UMKM** → klik **+ Tambah UMKM**
2. Isi formulir:
   - **Nama Usaha** (wajib)
   - **Kategori** (wajib): Kuliner, Kerajinan, Hasil Tani, Jasa, Toko
   - **Nomor WhatsApp** (wajib) — format: `6281234567890`
   - Nomor Telepon (opsional)
   - Deskripsi, Alamat, Jam Operasional
   - Latitude & Longitude (opsional)
   - **Consent** — centang jika pemilik sudah memberikan izin publikasi
   - **Publikasikan** — centang untuk menampilkan di halaman publik
3. Klik **Tambah UMKM**

### Mengedit UMKM

1. Di halaman **Kelola UMKM**, klik **Edit** pada UMKM yang ingin diedit
2. Ubah data yang diperlukan
3. Klik **Simpan Perubahan**

### Mengelola Foto

Saat mengedit UMKM, panel **Foto UMKM** muncul di sebelah kanan:

1. Klik **Tambah Foto** → pilih file gambar
2. Foto pertama akan menjadi foto utama (ditampilkan di kartu)
3. Untuk menghapus foto, hover foto dan klik tombol **×** merah

> **Penting:** Saat foto dihapus, file di penyimpanan juga ikut dihapus secara otomatis.

### Memverifikasi UMKM

1. Di halaman **Kelola UMKM**, klik **Verify** pada UMKM
2. Ini akan memperbarui tanggal "Diverifikasi terakhir" menjadi hari ini
3. Konten yang sudah >90 hari akan muncul di Dashboard sebagai "Perlu Verifikasi"

### Menghapus UMKM

1. Klik **Hapus** pada UMKM yang ingin dihapus
2. Konfirmasi penghapusan
3. Semua data dan foto akan dihapus permanen

---

## 4. Kelola Layanan

### Menambah Layanan

1. Buka **Kelola Layanan** → klik **+ Tambah Layanan**
2. Isi formulir:
   - **Judul Layanan** (wajib)
   - Persyaratan (satu per baris)
   - Langkah/Prosedur (satu per baris)
   - Jam Pelayanan
   - Kontak
   - URL Formulir (opsional)
   - Urutan Tampil (angka, urutan kecil ditampilkan lebih dulu)
   - **Publikasikan**
3. Klik **Tambah Layanan**

### Mengedit / Menghapus Layanan

Sama seperti UMKM — klik **Edit**, **Verify**, atau **Hapus** di daftar layanan.

---

## 5. Kelola Halaman

Ada dua halaman statis yang bisa diedit:

1. **Profil Desa** — informasi tentang desa
2. **Kontak Desa** — alamat, jam pelayanan, nomor telepon

Cara mengedit:
1. Buka **Kelola Halaman**
2. Klik halaman yang ingin diedit
3. Ubah Judul dan/atau Konten
4. Klik **Simpan**

> **Catatan:** Konten halaman Kontak juga akan tampil di Footer situs.

---

## 6. Alur Pembaruan via WhatsApp

Warga atau pemilik UMKM bisa mengirim pembaruan informasi via WhatsApp ke admin:

1. Di halaman detail UMKM, ada tombol **Perbarui info**
2. Tombol ini membuka WhatsApp dengan template pesan yang sudah diisi nama usaha
3. Admin menerima pesan WhatsApp
4. Admin login ke panel admin dan memperbarui data sesuai pesan

> **Catatan:** Nomor WhatsApp admin diatur di environment variable `NEXT_PUBLIC_ADMIN_WA`. Jika kosong, tombol "Perbarui info" tetap ditampilkan tapi tidak akan berfungsi.

---

## Tips

- **Verifikasi rutin:** Cek Dashboard minimal 1x/bulan untuk memastikan tidak ada konten yang basi
- **Foto:** Gunakan foto dengan rasio 4:3 untuk tampilan optimal di kartu UMKM
- **WhatsApp:** Selalu gunakan format internasional (awalan `62`, bukan `08`)
- **Publikasi:** Konten yang belum di-centang "Publikasikan" tidak akan muncul di situs publik
