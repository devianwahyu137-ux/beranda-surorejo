import Link from 'next/link';

const PAGES = [
  { slug: 'profil', title: 'Profil Desa', description: 'Informasi profil dan sejarah desa' },
  { slug: 'kontak', title: 'Kontak Desa', description: 'Alamat, jam pelayanan, dan kontak' },
];

export default function AdminHalamanList() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Kelola Halaman</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PAGES.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/halaman/${page.slug}`}
            className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-md hover:border-primary-200 transition-all"
          >
            <h2 className="text-lg font-semibold text-neutral-800 mb-1">{page.title}</h2>
            <p className="text-sm text-neutral-500">{page.description}</p>
            <span className="inline-flex items-center text-sm text-primary-600 mt-3">
              Edit halaman →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
