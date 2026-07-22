import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { ARTICLE_CATEGORY_MAP } from '@/lib/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from('article')
    .select('title, excerpt, thumbnail_url')
    .eq('slug', slug)
    .single();

  if (!article) return { title: 'Tidak Ditemukan | Desa Surorejo' };

  return {
    title: `${article.title} | Berita Desa Surorejo`,
    description: article.excerpt || article.title,
    openGraph: {
      images: article.thumbnail_url ? [article.thumbnail_url] : [],
    }
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: article } = await supabase
    .from('article')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!article || (!article.is_published)) {
    notFound();
  }

  const date = article.published_at 
    ? new Date(article.published_at).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Thumbnail Header */}
      <div className="w-full h-[40vh] md:h-[50vh] relative bg-neutral-900 overflow-hidden">
        {article.thumbnail_url ? (
          <>
            <Image
              src={article.thumbnail_url}
              alt={article.title}
              fill
              className="object-cover opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
        )}
        
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-page max-w-3xl pb-10">
            <div className="flex items-center gap-3 mb-4">
              <Link 
                href="/berita" 
                className="text-white/80 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali
              </Link>
              <span className="text-white/40">•</span>
              <span className="px-2.5 py-1 bg-primary-600/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-primary-500/50">
                {ARTICLE_CATEGORY_MAP[article.category] || article.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-neutral-300 text-sm">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {article.author}
              </span>
              <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full"></span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={article.published_at || ''}>{date}</time>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-page max-w-3xl mt-12 md:mt-16">
        <div className="prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-a:text-primary-600 prose-img:rounded-xl">
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="whitespace-pre-line">{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
