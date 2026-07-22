import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ArticleCard from '@/components/public/ArticleCard';
import ScrollReveal from '@/components/public/ScrollReveal';

export const metadata: Metadata = {
  title: 'Berita & Pengumuman | Desa Surorejo',
  description: 'Kabar terbaru, pengumuman resmi, dan program kegiatan dari Pemerintah Desa Surorejo.',
};

export default async function BeritaPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  
  const supabase = await createClient();
  let query = supabase
    .from('article')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false, nullsFirst: false });
    
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data: articles } = await query;

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Header Section */}
      <section className="bg-primary-900 text-white pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="container-page relative z-10">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Kabar Desa Surorejo</h1>
            <p className="text-primary-100 text-lg max-w-2xl">
              Ikuti terus informasi terbaru, program kegiatan, dan pengumuman resmi dari Pemerintah Desa Surorejo.
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
        {/* Category Filter */}
        <ScrollReveal className="flex gap-2 mb-10 overflow-x-auto scrollbar-hide pb-2">
          <a
            href="/berita"
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !category ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            Semua
          </a>
          <a
            href="/berita?category=berita"
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === 'berita' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            Berita Desa
          </a>
          <a
            href="/berita?category=pengumuman"
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === 'pengumuman' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            Pengumuman
          </a>
          <a
            href="/berita?category=program_kerja"
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === 'program_kerja' ? 'bg-primary-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            Program Kerja
          </a>
        </ScrollReveal>

        {/* Articles Grid */}
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article, index) => (
              <ScrollReveal key={article.id} delay={(index % 3) + 1} direction="up">
                <ArticleCard article={article} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200">
            <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Belum ada artikel</h3>
            <p className="text-neutral-500">Silakan kembali lagi nanti untuk informasi terbaru.</p>
          </div>
        )}
      </div>
    </div>
  );
}
