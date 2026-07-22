'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface StaticMap {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string; // Used for the grid
  highResUrl: string;   // Used for the lightbox
  downloadUrl: string;  // Used for downloading (could be PDF or zip)
  dateStr: string;
}

// Dummy data placeholder - this can be moved to Supabase later
const DUMMY_MAPS: StaticMap[] = [
  {
    id: 'map-1',
    title: 'Peta Batas Dusun',
    description: 'Pemetaan batas administratif setiap dusun di Desa Surorejo.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop',
    highResUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=100&w=2000&auto=format&fit=crop',
    downloadUrl: '#',
    dateStr: 'Agustus 2026'
  },
  {
    id: 'map-2',
    title: 'Peta Tata Guna Lahan',
    description: 'Analisis persebaran area persawahan, pemukiman, dan hutan desa.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    highResUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=100&w=2000&auto=format&fit=crop',
    downloadUrl: '#',
    dateStr: 'Agustus 2026'
  }
];

export default function StaticMapGallery() {
  const [selectedMap, setSelectedMap] = useState<StaticMap | null>(null);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (selectedMap) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedMap]);

  return (
    <div>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DUMMY_MAPS.map((map) => (
          <div 
            key={map.id} 
            className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
            onClick={() => setSelectedMap(map)}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
              <Image 
                src={map.thumbnailUrl} 
                alt={map.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 bg-white/90 text-neutral-900 px-4 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
                  Lihat Peta
                </div>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-neutral-900">{map.title}</h3>
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-md">{map.dateStr}</span>
              </div>
              <p className="text-sm text-neutral-500 line-clamp-2">{map.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedMap && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-neutral-900/90 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedMap(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center p-4">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedMap(null)}
              className="absolute -top-12 right-4 md:right-0 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
              aria-label="Tutup Peta"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative w-full h-[60vh] md:h-[75vh] bg-black/50 rounded-lg overflow-hidden shadow-2xl">
              <Image 
                src={selectedMap.highResUrl} 
                alt={selectedMap.title} 
                fill
                className="object-contain"
                sizes="100vw"
                quality={90}
                priority
              />
            </div>

            {/* Info & Download Bar */}
            <div className="w-full bg-white rounded-xl mt-4 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
              <div>
                <h3 className="font-bold text-lg text-neutral-900">{selectedMap.title}</h3>
                <p className="text-sm text-neutral-500 mt-1">{selectedMap.description}</p>
              </div>
              <a 
                href={selectedMap.downloadUrl} 
                download
                className="w-full md:w-auto px-6 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Unduh Resolusi Tinggi
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
