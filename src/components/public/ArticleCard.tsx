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
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden group card-hover h-full flex flex-col">
      <Link href={`/berita/${article.slug}`} className="block relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {article.thumbnail_url ? (
          <Image
            src={article.thumbnail_url}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400 bg-neutral-100">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-semibold rounded-full shadow-sm">
            {ARTICLE_CATEGORY_MAP[article.category as keyof typeof ARTICLE_CATEGORY_MAP] || article.category}
          </span>
        </div>
      </Link>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <time dateTime={article.published_at || ''}>{date}</time>
          <span className="w-1 h-1 bg-neutral-300 rounded-full mx-1"></span>
          <span>{article.author}</span>
        </div>
        
        <Link href={`/berita/${article.slug}`} className="group-hover:text-primary-600 transition-colors">
          <h3 className="font-bold text-neutral-900 text-lg mb-2 line-clamp-2 leading-tight">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-neutral-600 text-sm line-clamp-3 mb-4 flex-1">
          {article.excerpt || article.content.substring(0, 120) + '...'}
        </p>
        
        <Link 
          href={`/berita/${article.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:text-primary-700 mt-auto"
        >
          Baca selengkapnya
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
