'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { UmkmPhoto } from '@/types/db';

interface PhotoGalleryProps {
  photos: UmkmPhoto[];
  businessName: string;
}

export default function PhotoGallery({ photos, businessName }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="aspect-[16/9] bg-neutral-100 rounded-xl flex items-center justify-center">
        <svg className="w-16 h-16 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-neutral-100">
        <Image
          src={photos[activeIndex].url}
          alt={`${businessName} - Foto ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === activeIndex
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={photo.url}
                alt={`${businessName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
