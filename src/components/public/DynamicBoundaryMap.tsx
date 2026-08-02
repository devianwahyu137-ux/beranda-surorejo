'use client';

import dynamic from 'next/dynamic';

const BoundaryMap = dynamic(
  () => import('./BoundaryMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-neutral-100 animate-pulse flex items-center justify-center rounded-2xl border border-neutral-200">
        <span className="text-neutral-400 font-medium">Memuat Peta Batas Wilayah...</span>
      </div>
    )
  }
);

export default BoundaryMap;
