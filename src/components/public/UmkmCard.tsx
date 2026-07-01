import Link from 'next/link';
import Image from 'next/image';
import type { Umkm, UmkmPhoto } from '@/types/db';
import { CATEGORY_MAP } from '@/lib/constants';
import { truncate } from '@/lib/utils';
import FreshnessBadge from './FreshnessBadge';
import WhatsAppButton from './WhatsAppButton';

interface UmkmCardProps {
  umkm: Umkm & { umkm_photo?: UmkmPhoto[] };
}

export default function UmkmCard({ umkm }: UmkmCardProps) {
  const firstPhoto = umkm.umkm_photo?.[0];
  const categoryLabel = CATEGORY_MAP[umkm.category] || umkm.category;

  return (
    <div className="group bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Photo */}
      <Link href={`/umkm/${umkm.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {firstPhoto ? (
          <Image
            src={firstPhoto.url}
            alt={umkm.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* Category badge on image */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium text-neutral-700 px-2.5 py-1 rounded-full">
          {categoryLabel}
        </span>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/umkm/${umkm.slug}`}>
          <h3 className="font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors mb-1">
            {umkm.name}
          </h3>
        </Link>

        {umkm.description && (
          <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
            {truncate(umkm.description, 120)}
          </p>
        )}

        <div className="flex items-center justify-between gap-2 mt-auto">
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
