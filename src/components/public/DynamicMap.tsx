'use client';

import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(
  () => import('./InteractiveMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-neutral-100 animate-pulse flex items-center justify-center rounded-xl">
        <span className="text-neutral-400 font-medium">Memuat Peta WebGIS...</span>
      </div>
    )
  }
);

export default InteractiveMap;
