import type { Metadata } from 'next';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import ScrollReveal from '@/components/public/ScrollReveal';
import dynamic from 'next/dynamic';
import type { StrategicLocation, Umkm } from '@/types/db';

export const metadata: Metadata = {
  title: 'Peta Desa Surorejo',
  description: 'Peta Interaktif Desa Surorejo yang menampilkan persebaran UMKM dan fasilitas umum strategis.',
};

export const revalidate = 60; // Revalidate every 60 seconds

import InteractiveMapWrapper from '@/components/public/InteractiveMapWrapper';

async function MapSection() {
  const supabase = await createClient();

  // Fetch UMKM locations
  const { data: umkmData } = await supabase
    .from('umkm')
    .select('*')
    .eq('is_published', true)
    .not('latitude', 'is', null)
    .not('longitude', 'is', null);

  // Fetch Strategic locations (facilities)
  // Ensure we don't crash if table doesn't exist yet (sprint 4 migration pending)
  const { data: strategicData, error: strategicError } = await supabase
    .from('strategic_location')
    .select('*');

  const finalStrategicData = strategicError ? [] : strategicData;

  return (
    <div className="w-full h-[70vh] min-h-[500px] rounded-2xl overflow-hidden shadow-lg border border-neutral-200 relative">
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-md border border-neutral-100 max-w-xs">
        <h3 className="font-bold text-neutral-900 mb-2 text-sm">Legenda Peta</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
            <span className="text-xs text-neutral-700 font-medium">UMKM Lokal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
            <span className="text-xs text-neutral-700 font-medium">Pemerintahan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500 border-2 border-white shadow-sm"></div>
            <span className="text-xs text-neutral-700 font-medium">Tempat Ibadah</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></div>
            <span className="text-xs text-neutral-700 font-medium">Fasilitas Lainnya</span>
          </div>
        </div>
      </div>
      
      <InteractiveMapWrapper 
        umkmData={umkmData as Umkm[] || []} 
        locations={finalStrategicData as StrategicLocation[] || []} 
      />
    </div>
  );
}

import StaticMapGallery from '@/components/public/StaticMapGallery';

export default function PetaDesaPage() {
  return (
    <div className="container-page py-10 md:py-14">
      {/* Header */}
      <ScrollReveal className="mb-8 text-center max-w-2xl mx-auto">
        <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">
          WebGIS Desa
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
          Peta Interaktif Desa Surorejo
        </h1>
        <p className="text-neutral-500">
          Jelajahi persebaran UMKM, batas wilayah, dan fasilitas umum strategis di Desa Surorejo secara interaktif.
        </p>
      </ScrollReveal>

      {/* Map Container */}
      <ScrollReveal delay={1}>
        <Suspense fallback={
          <div className="w-full min-h-[500px] h-[70vh] bg-neutral-100 animate-pulse rounded-2xl"></div>
        }>
          <MapSection />
        </Suspense>
      </ScrollReveal>
      
      {/* Sprint 3 (Static Maps) */}
      <ScrollReveal delay={2} className="mt-16">
        <div className="border-t border-neutral-200 pt-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Peta Tematik (Analisis Geografis)</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Koleksi peta tematik hasil observasi KKN, meliputi data tata guna lahan, batas administratif dusun, dan pemetaan demografis.
            </p>
          </div>
          
          <StaticMapGallery />
        </div>
      </ScrollReveal>
    </div>
  );
}
