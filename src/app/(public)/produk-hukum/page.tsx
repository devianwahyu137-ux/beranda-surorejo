import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ScrollReveal from '@/components/public/ScrollReveal';
import { LEGAL_CATEGORY_MAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Produk Hukum | Desa Surorejo',
  description: 'Daftar Peraturan Desa, SK Kepala Desa, dan dokumen hukum resmi lainnya.',
};

export default async function ProdukHukumPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const year = typeof searchParams.year === 'string' ? searchParams.year : undefined;
  
  const supabase = await createClient();
  let query = supabase
    .from('legal_document')
    .select('*')
    .eq('is_published', true)
    .order('year', { ascending: false })
    .order('created_at', { ascending: false });
    
  if (category) query = query.eq('category', category);
  if (year) query = query.eq('year', parseInt(year, 10));
  
  const { data: documents } = await query;

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Header Section */}
      <section className="bg-primary-900 text-white pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="container-page relative z-10">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Produk Hukum Desa</h1>
            <p className="text-primary-100 text-lg max-w-2xl">
              Transparansi publik terkait Peraturan Desa, Keputusan Kepala Desa, dan landasan hukum lainnya.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Wave divider */}
      <div className="relative -mt-10 z-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" className="w-full h-12 preserve-3d">
          <path fill="#f8fafc" d="M0,48 L0,16 Q360,48 720,16 Q1080,-16 1440,16 L1440,48Z" />
        </svg>
      </div>

      <div className="container-page relative z-30 mt-4">
        {/* Filters */}
        <ScrollReveal className="flex flex-wrap gap-2 mb-10 pb-2">
          <a
            href="/produk-hukum"
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !category ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            Semua Kategori
          </a>
          <a
            href="/produk-hukum?category=perdes"
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === 'perdes' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            Peraturan Desa
          </a>
          <a
            href="/produk-hukum?category=sk_kades"
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === 'sk_kades' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            SK Kepala Desa
          </a>
        </ScrollReveal>

        {/* Documents Table */}
        <ScrollReveal>
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
                <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 font-medium w-16 text-center">No</th>
                    <th className="px-6 py-4 font-medium">Judul Dokumen</th>
                    <th className="px-6 py-4 font-medium w-40">Nomor & Tahun</th>
                    <th className="px-6 py-4 font-medium w-40">Kategori</th>
                    <th className="px-6 py-4 font-medium w-32 text-center">Unduh</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {documents && documents.length > 0 ? (
                    documents.map((doc, idx) => (
                      <tr key={doc.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-6 py-4 text-center text-neutral-500">{idx + 1}</td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-neutral-900">{doc.title}</p>
                          {doc.description && (
                            <p className="text-neutral-500 text-xs mt-1 hidden md:block">{doc.description}</p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-neutral-700">
                          {doc.document_number ? `${doc.document_number} / ` : ''}Tahun {doc.year}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-xs font-medium border border-neutral-200">
                            {LEGAL_CATEGORY_MAP[doc.category] || doc.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {doc.file_url ? (
                            <a
                              href={doc.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 hover:text-primary-700 transition-colors"
                              title="Unduh Dokumen"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </a>
                          ) : (
                            <span className="text-xs text-neutral-400 italic">File T/A</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                        Belum ada data produk hukum yang dipublikasikan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
