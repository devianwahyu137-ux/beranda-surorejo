const PDF_PATH = '/Buku%20Panduan%20Portal%20Desa%20Surorejo.pdf';

export default function AdminPanduanPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-neutral-900">Panduan Penggunaan Website Desa</h1>
        <p className="mt-3 max-w-3xl text-neutral-600 leading-7">
          Halaman ini menyediakan buku panduan penggunaan Website Desa Surorejo yang dapat digunakan oleh perangkat desa sebagai referensi dalam mengelola website. Buku panduan akan tersedia dalam format PDF sehingga dapat dibaca maupun diunduh.
        </p>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm text-center">
        <p className="text-xl font-semibold text-neutral-900">Buku panduan sudah tersedia.</p>
        <p className="mt-2 text-neutral-600">Silakan unduh panduan lewat tombol di bawah untuk melihat detailnya.</p>
        <a
          href={PDF_PATH}
          download
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Unduh Buku Panduan
        </a>
      </div>
    </div>
  );
}
