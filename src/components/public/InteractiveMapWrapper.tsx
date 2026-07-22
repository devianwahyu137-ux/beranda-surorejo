'use client';

import dynamic from 'next/dynamic';
import type { StrategicLocation, Umkm } from '@/types/db';

const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[500px] h-[70vh] bg-neutral-100 animate-pulse flex items-center justify-center rounded-2xl border border-neutral-200">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <span className="text-neutral-500 font-medium">Memuat Peta Interaktif...</span>
      </div>
    </div>
  ),
});

interface Props {
  locations?: StrategicLocation[];
  umkmData?: Umkm[];
}

export default function InteractiveMapWrapper(props: Props) {
  return <InteractiveMap {...props} />;
}
