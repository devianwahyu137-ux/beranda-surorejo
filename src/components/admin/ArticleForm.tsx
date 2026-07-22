'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Article, ArticleInsert, ArticleUpdate } from '@/types/db';
import { ARTICLE_CATEGORIES } from '@/lib/constants';
import PhotoUploader from './PhotoUploader';

interface ArticleFormProps {
  initialData?: Article;
}

export default function ArticleForm({ initialData }: ArticleFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState(initialData?.category || 'berita');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [author, setAuthor] = useState(initialData?.author || 'Admin Desa');
  const [isPublished, setIsPublished] = useState(initialData?.is_published ?? false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(initialData?.thumbnail_url || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload: Partial<ArticleInsert> = {
        title,
        slug: slug.trim() || undefined, // undefined will let the backend generate it if new
        category: category as ArticleInsert['category'],
        excerpt,
        content,
        author,
        is_published: isPublished,
        thumbnail_url: thumbnailUrl,
      };

      if (isPublished && !initialData?.published_at) {
        (payload as any).published_at = new Date().toISOString();
      } else if (!isPublished) {
        (payload as any).published_at = null;
      }

      const url = initialData ? `/api/article/${initialData.id}` : '/api/article';
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Terjadi kesalahan');
      }

      router.push('/admin/berita');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-neutral-200">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="space-y-4">
            <div>
              <label className="form-label" htmlFor="title">Judul Artikel *</label>
              <input
                id="title"
                type="text"
                required
                className="form-input text-lg font-medium"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Musyawarah Desa Tahun 2026"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label" htmlFor="category">Kategori *</label>
                <select
                  id="category"
                  required
                  className="form-input form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {ARTICLE_CATEGORIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="form-label" htmlFor="author">Penulis *</label>
                <input
                  id="author"
                  type="text"
                  required
                  className="form-input"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="slug">Slug (URL) - Opsional</label>
              <input
                id="slug"
                type="text"
                className="form-input"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Kosongkan untuk generate otomatis dari judul"
              />
              <p className="text-xs text-neutral-500 mt-1">Hanya gunakan huruf kecil, angka, dan tanda hubung (-).</p>
            </div>
          </div>

          {/* Content Info */}
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <div>
              <label className="form-label" htmlFor="excerpt">Ringkasan (Excerpt)</label>
              <textarea
                id="excerpt"
                rows={3}
                className="form-input resize-y"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Ringkasan singkat isi artikel (muncul di daftar artikel)..."
              />
            </div>
            
            <div>
              <label className="form-label" htmlFor="content">Isi Artikel *</label>
              <textarea
                id="content"
                required
                rows={15}
                className="form-input resize-y font-mono text-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis isi artikel di sini..."
              />
              <p className="text-xs text-neutral-500 mt-1">Mendukung format teks biasa. Untuk paragraf baru, gunakan Enter 2 kali.</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200">
            <h3 className="font-semibold text-neutral-900 mb-4">Status Publikasi</h3>
            
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${isPublished ? 'bg-primary-500' : 'bg-neutral-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isPublished ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
              <span className="text-sm font-medium text-neutral-700">
                {isPublished ? 'Telah Dipublikasi' : 'Draft / Disembunyikan'}
              </span>
            </label>
            
            {initialData?.published_at && (
              <p className="text-xs text-neutral-500">
                Terakhir dipublikasi:<br/>
                {new Date(initialData.published_at).toLocaleString('id-ID')}
              </p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Gambar Thumbnail</h3>
            <PhotoUploader
              bucket="public_assets"
              folder="articles"
              onUploadSuccess={(url) => setThumbnailUrl(url)}
              buttonText="Upload Thumbnail"
            />
            {thumbnailUrl && (
              <div className="mt-4 relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumbnailUrl} alt="Thumbnail preview" className="object-cover w-full h-full" />
                <button
                  type="button"
                  onClick={() => setThumbnailUrl(null)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                  title="Hapus gambar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-xl transition-all shadow-sm shadow-primary-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Menyimpan...
            </>
          ) : (
            'Simpan Artikel'
          )}
        </button>
      </div>
    </form>
  );
}
