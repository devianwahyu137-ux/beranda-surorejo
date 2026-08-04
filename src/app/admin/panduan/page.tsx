import Link from 'next/link';

export default function AdminPanduanPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-neutral-900">Panduan Penggunaan Website Desa</h1>
        <p className="mt-3 max-w-3xl text-neutral-600 leading-7">
          Halaman ini menyediakan buku panduan penggunaan Website Desa Surorejo yang dapat digunakan oleh perangkat desa sebagai referensi dalam mengelola website. Buku panduan akan tersedia dalam format PDF sehingga dapat dibaca maupun diunduh.
        </p>
      </div>

      <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
        <p className="text-xl font-semibold text-neutral-900">Buku panduan belum tersedia.</p>
        <p className="mt-2 text-neutral-600">Buku panduan sedang dalam proses penyusunan dan akan segera tersedia pada halaman ini.</p>
        <button
          type="button"
          disabled
          className="mt-6 inline-flex items-center justify-center rounded-full bg-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-500 transition-colors disabled:cursor-not-allowed"
        >
          Unduh Buku Panduan
        </button>
      </div>
    </div>
  );
}
