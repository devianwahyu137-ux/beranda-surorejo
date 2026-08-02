import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/types/db';
import { ARTICLE_CATEGORY_MAP } from '@/lib/constants';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const date = article.published_at 
    ? new Date(article.published_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Belum dipublikasi';

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden group shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)] hover:border-primary-200 transition-all duration-200 transform hover:-translate-y-1.5 active:scale-[0.97] active:border-primary-400 active:bg-primary-50/10 h-full flex flex-col">
      <Link href={`/berita/${article.slug}`} className="block relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {article.thumbnail_url ? (
          <Image
            src={article.thumbnail_url}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400 bg-neutral-100">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}

        {/* Hover dark gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-primary-700 text-xs font-bold rounded-full shadow-sm group-hover:bg-primary-600 group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-300 block">
            {ARTICLE_CATEGORY_MAP[article.category as keyof typeof ARTICLE_CATEGORY_MAP] || article.category}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium mb-3">
          <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <time dateTime={article.published_at || ''}>{date}</time>
          <span className="w-1 h-1 bg-neutral-300 rounded-full mx-1"></span>
          <span className="text-neutral-600">{article.author}</span>
        </div>
        
        <Link href={`/berita/${article.slug}`} className="group-hover:text-primary-600 transition-colors">
          <h3 className="font-extrabold text-neutral-900 text-lg mb-3 line-clamp-2 leading-snug tracking-tight">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-neutral-600 text-sm line-clamp-3 mb-5 flex-1 leading-relaxed">
          {article.excerpt || article.content.substring(0, 120) + '...'}
        </p>
        
        <Link 
          href={`/berita/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 group-hover:text-primary-700 mt-auto pt-4 border-t border-neutral-100"
        >
          Baca selengkapnya
          <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
