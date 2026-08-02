import Link from 'next/link';
import Image from 'next/image';
import type { Umkm, UmkmPhoto } from '@/types/db';
import { CATEGORY_MAP } from '@/lib/constants';
import { truncate } from '@/lib/utils';
import FreshnessBadge from './FreshnessBadge';
import WhatsAppButton from './WhatsAppButton';

interface UmkmCardProps {
  umkm: Umkm & { umkm_photo?: UmkmPhoto[] };
  isFirst?: boolean;
}

export default function UmkmCard({ umkm, isFirst }: UmkmCardProps) {
  const firstPhoto = umkm.umkm_photo?.[0];
  const categoryLabel = CATEGORY_MAP[umkm.category] || umkm.category;

  return (
    <div className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.07)] hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col h-full">
      {/* Photo */}
      <Link href={`/umkm/${umkm.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {firstPhoto ? (
          <Image
            src={firstPhoto.url}
            alt={umkm.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={isFirst ? 'eager' : 'lazy'}
            priority={isFirst}
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
            <svg className="w-12 h-12 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Subtle gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge with color transition on card hover */}
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-xs font-semibold text-neutral-700 px-3 py-1 rounded-full shadow-sm group-hover:bg-primary-600 group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-300">
          {categoryLabel}
        </span>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/umkm/${umkm.slug}`}>
          <h3 className="font-bold text-lg text-neutral-900 group-hover:text-primary-700 transition-colors mb-2 leading-snug tracking-tight">
            {umkm.name}
          </h3>
        </Link>

        {umkm.description && (
          <p className="text-sm text-neutral-500 mb-5 line-clamp-2 leading-relaxed flex-1">
            {truncate(umkm.description, 120)}
          </p>
        )}

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-neutral-100 mt-auto">
          <FreshnessBadge lastVerifiedAt={umkm.last_verified_at} />
          <WhatsAppButton
            whatsappNumber={umkm.whatsapp_number}
            businessName={umkm.name}
            variant="compact"
          />
        </div>
      </div>
    </div>
  );
}
