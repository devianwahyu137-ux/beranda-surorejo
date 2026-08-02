'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface StaticMap {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnailUrl: string; // Used for the grid
  highResUrl: string;   // Used for the lightbox modal
  downloadUrl: string;  // Used for downloading (PDF / ZIP / JPG)
  dateStr: string;
  scale?: string;
}

// 5 Template Peta Tematik KKN / Desa Surorejo
const DUMMY_MAPS: StaticMap[] = [
  {
    id: 'map-1',
    title: 'Peta Batas Dusun & Administrasi',
    category: 'Administrasi Wilayah',
    description: 'Pemetaan batas administratif formal untuk setiap kawasan RT, RW, dan Dusun di Desa Surorejo. Memberikan acuan geospasial yang pasti terkait yurisdiksi kepemerintahan desa dan pelayanan kemasyarakatan.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop',
    highResUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=100&w=2000&auto=format&fit=crop',
    downloadUrl: '#',
    dateStr: 'Agustus 2026',
    scale: 'Skala 1:5.000',
  },
  {
    id: 'map-2',
    title: 'Peta Tata Guna & Tutupan Lahan',
    category: 'Geosains & Lahan',
    description: 'Analisis persebaran area persawahan produktif, kawasan pemukiman warga, perkebunan kelola, fasilitas publik, dan area terbuka hijau/hutan desa untuk dasar perencanaan pembangunan berkelanjutan.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    highResUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=100&w=2000&auto=format&fit=crop',
    downloadUrl: '#',
    dateStr: 'Agustus 2026',
    scale: 'Skala 1:10.000',
  },
  {
    id: 'map-3',
    title: 'Peta Infrastruktur & Jaringan Akses',
    category: 'Infrastruktur',
    description: 'Inventarisasi kelayakan akses jalan utama desa, jalan usaha tani, jembatan penghubung antar dukuh, instalasi irigasi pertanahan, serta kondisi jaringan drainase lingkungan warga.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1000&auto=format&fit=crop',
    highResUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=100&w=2000&auto=format&fit=crop',
    downloadUrl: '#',
    dateStr: 'Agustus 2026',
    scale: 'Skala 1:7.500',
  },
  {
    id: 'map-4',
    title: 'Peta Sebaran Potensi UMKM & Ekonomi',
    category: 'Ekonomi Desa',
    description: 'Pemetaan titik-titik kegiatan ekonomi kreatif warga, toko ritel desa, warung kuliner rakyat, serta sentra hasil bumi pertanian yang mendukung pertumbuhan mandiri dan daya saing Desa Surorejo.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1000&auto=format&fit=crop',
    highResUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=100&w=2000&auto=format&fit=crop',
    downloadUrl: '#',
    dateStr: 'Agustus 2026',
    scale: 'Skala 1:5.000',
  },
  {
    id: 'map-5',
    title: 'Peta Hidrologi & Mitigasi Bencana',
    category: 'Mitigasi Bencana',
    description: 'Jalur Daerah Aliran Sungai (DAS), sumur resapan, sumber air bersih terpadu, serta pemetaan area rawan genangan air berlanjut lengkap dengan petunjuk rute evakuasi darurat tanggap bencana.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1000&auto=format&fit=crop',
    highResUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=100&w=2000&auto=format&fit=crop',
    downloadUrl: '#',
    dateStr: 'Agustus 2026',
    scale: 'Skala 1:8.000',
  },
];

export default function StaticMapGallery() {
  const [selectedMap, setSelectedMap] = useState<StaticMap | null>(null);

  // Prevent background scrolling & allow pressing Escape key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMap(null);
      }
    };

    if (selectedMap) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMap]);

  return (
    <div>
      {/* Responsive Grid Layout - Perfectly balanced for 5 items!
          Desktop (lg: 3 cols): Map 1 spans 2 cols (Hero map), Map 2, 3, 4, 5 fill 1 col each.
          Tablet (md: 2 cols): Map 5 spans 2 cols to remain centered and symmetrical.
          Mobile (< md): Vertical smooth single column stack. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {DUMMY_MAPS.map((map, idx) => {
          const isFeatured = idx === 0;
          return (
            <div
              key={map.id}
              className={cn(
                'group bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-[0_12px_35px_rgba(22,163,74,0.14)] hover:border-primary-300 transition-[transform,box-shadow,border-color] duration-200 transform-gpu hover:-translate-y-1 cursor-pointer flex flex-col',
                isFeatured && 'lg:col-span-2',
                idx === 4 && 'md:col-span-2 lg:col-span-1'
              )}
              onClick={() => setSelectedMap(map)}
            >
              <div className={cn(
                'relative w-full overflow-hidden bg-neutral-100',
                isFeatured ? 'aspect-[4/3] sm:aspect-[16/9]' : 'aspect-[4/3]'
              )}>
                <Image
                  src={map.thumbnailUrl}
                  alt={map.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Category & Scale Badges overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                  <span className="px-3 py-1 bg-neutral-900/85 text-white text-xs font-bold rounded-full shadow-sm border border-white/10">
                    {map.category}
                  </span>
                  {map.scale && (
                    <span className="px-2.5 py-1 bg-white/95 text-neutral-700 text-xs font-semibold rounded-full shadow-sm hidden sm:inline-block">
                      {map.scale}
                    </span>
                  )}
                </div>

                {/* Dark Hover Overlay & Mobile Touch Prompt */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <div className="bg-white/95 text-neutral-900 px-5 py-2 rounded-full font-bold text-xs sm:text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span>Klik untuk Membesarkan Peta</span>
                  </div>
                </div>
              </div>

              {/* Card Content & Description */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-lg sm:text-xl text-neutral-900 group-hover:text-primary-700 transition-colors leading-snug">
                      {map.title}
                    </h3>
                    <span className="shrink-0 text-xs font-semibold text-primary-700 bg-primary-50 border border-primary-200/60 px-2.5 py-1 rounded-lg">
                      {map.dateStr}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                    {map.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-500 group-hover:text-primary-600 transition-colors">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Lihat Preview Full Screen
                  </span>
                  <span>→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal with Effortless Dismiss Controls */}
      {selectedMap && (
        <div 
          className="fixed inset-0 z-[100] bg-neutral-950/90 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedMap(null)} // Click anywhere outside modal box closes it!
        >
          {/* Always Visible Fixed Floating Close Button (Top Right of Screen) */}
          <button
            onClick={() => setSelectedMap(null)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[120] bg-white/90 text-neutral-900 font-extrabold px-4 py-2.5 rounded-full shadow-2xl hover:bg-red-600 hover:text-white border border-neutral-300 transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base cursor-pointer touch-target"
            aria-label="Tutup Peta"
          >
            <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Tutup</span>
          </button>

          {/* Modal Content Box (prevents backdrop click inside box) */}
          <div 
            className="relative z-10 w-full max-w-5xl my-auto bg-white rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-neutral-200 flex flex-col"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Image Showcase Container */}
            <div className="relative w-full h-[50vh] sm:h-[65vh] bg-neutral-900 flex items-center justify-center overflow-hidden group/modal">
              <Image
                src={selectedMap.highResUrl}
                alt={selectedMap.title}
                fill
                className="object-contain transition-transform duration-300"
                sizes="(max-width: 1024px) 100vw, 1024px"
                quality={95}
                priority
              />
              
              {/* Subtle visual zoom indicator tag inside modal */}
              <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-lg pointer-events-none hidden sm:flex items-center gap-1.5 border border-white/20">
                <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                <span>Resolusi Tinggi Observasi KKN Surorejo</span>
              </div>
            </div>

            {/* Rich Detailed Information & Action Footer */}
            <div className="p-5 sm:p-8 bg-white border-t border-neutral-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-primary-100 text-primary-800 text-xs font-bold rounded-md">
                    {selectedMap.category}
                  </span>
                  {selectedMap.scale && (
                    <span className="px-2.5 py-0.5 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-md">
                      {selectedMap.scale}
                    </span>
                  )}
                  <span className="text-xs text-neutral-400 font-medium">• {selectedMap.dateStr}</span>
                </div>
                <h3 className="font-extrabold text-xl sm:text-2xl text-neutral-900 tracking-tight mb-2">
                  {selectedMap.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                  {selectedMap.description}
                </p>
              </div>

              {/* Action Buttons - Easy thumb access on mobile & clean desktop UX */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t md:border-0 border-neutral-100">
                <button
                  onClick={() => setSelectedMap(null)}
                  className="w-full sm:w-auto px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border border-neutral-300 touch-target"
                >
                  <svg className="w-4 h-4 font-extrabold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Kembali / Tutup</span>
                </button>

                <a
                  href={selectedMap.downloadUrl}
                  download
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg touch-target"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Unduh Resolusi Tinggi</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
