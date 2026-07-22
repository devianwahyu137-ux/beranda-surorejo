import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ScrollReveal from './ScrollReveal';
import ArticleCard from './ArticleCard';
import type { Article } from '@/types/db';

export default async function LatestArticles() {
  const supabase = await createClient();
  
  const { data: articles } = await supabase
    .from('article')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(3);

  if (!articles || articles.length === 0) {
    return null; // Don't show section if no articles
  }

  return (
    <section className="py-16 md:py-24 bg-neutral-50 relative">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
          <ScrollReveal direction="up">
            <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3 border border-primary-100">
              Kabar Desa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Berita & Pengumuman
            </h2>
            <p className="text-neutral-500 mt-3 max-w-2xl">
              Ikuti terus informasi terbaru, program kegiatan, dan pengumuman resmi dari Pemerintah Desa Surorejo.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="left" delay={1} className="shrink-0">
            <Link 
              href="/berita" 
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-neutral-200 text-neutral-700 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 rounded-xl font-medium transition-all shadow-sm group"
            >
              Lihat Semua
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article: Article, index) => (
            <ScrollReveal key={article.id} direction="up" delay={index + 2}>
              <ArticleCard article={article} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
