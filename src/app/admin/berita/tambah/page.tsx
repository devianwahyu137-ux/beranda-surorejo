import ArticleForm from '@/components/admin/ArticleForm';

export default function AddArticlePage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Tambah Artikel Baru</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Buat berita, pengumuman, atau informasi program kerja desa.
        </p>
      </div>

      <ArticleForm />
    </div>
  );
}
