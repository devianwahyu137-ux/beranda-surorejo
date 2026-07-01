import type { Metadata } from 'next';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { CATEGORIES } from '@/lib/constants';
import type { Umkm, UmkmPhoto } from '@/types/db';
import UmkmCard from '@/components/public/UmkmCard';
import CategoryFilter from '@/components/public/CategoryFilter';
import SearchBar from '@/components/public/SearchBar';
import EmptyState from '@/components/public/EmptyState';
import ScrollReveal from '@/components/public/ScrollReveal';

export const metadata: Metadata = {
  title: 'Direktori UMKM',
  description: 'Direktori UMKM Desa Surorejo. Temukan usaha kuliner, kerajinan, hasil tani, jasa, dan toko lokal.',
};

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

async function UmkmGrid({ searchParams }: { searchParams: { category?: string; q?: string } }) {
  const supabase = await createClient();

  let query = supabase
    .from('umkm')
    .select('*, umkm_photo(*)')
    .eq('is_published', true)
    .order('last_verified_at', { ascending: false });

  // Category filter
  const validCategories = CATEGORIES.map((c) => c.value);
  if (searchParams.category && validCategories.includes(searchParams.category as typeof validCategories[number])) {
    query = query.eq('category', searchParams.category);
  }

  // Name search
  if (searchParams.q) {
    query = query.ilike('name', `%${searchParams.q}%`);
  }

  const { data: umkmList } = await query;

  // Sort photos by sort_order within each UMKM
  const sortedList = (umkmList as (Umkm & { umkm_photo: UmkmPhoto[] })[] || []).map((u) => ({
    ...u,
    umkm_photo: (u.umkm_photo || []).sort((a, b) => a.sort_order - b.sort_order),
  }));

  if (sortedList.length === 0) {
    return <EmptyState message="Tidak ada UMKM ditemukan. Coba ubah filter atau kata pencarian." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {sortedList.map((umkm, idx) => (
        <ScrollReveal key={umkm.id} delay={Math.min(idx % 3 + 1, 3)}>
          <UmkmCard umkm={umkm} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default async function UmkmDirectoryPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="container-page py-10 md:py-14">
      {/* Header */}
      <ScrollReveal className="mb-8">
        <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">
          Usaha Lokal
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
          Direktori UMKM Desa Surorejo
        </h1>
        <p className="text-neutral-500 max-w-2xl">
          Temukan dan hubungi usaha lokal di Desa Surorejo langsung via WhatsApp.
        </p>
      </ScrollReveal>

      {/* Filters */}
      <ScrollReveal>
        <div className="space-y-4 mb-8">
          <Suspense fallback={<div className="h-12 bg-neutral-100 rounded-xl animate-shimmer" />}>
            <SearchBar />
          </Suspense>
          <Suspense fallback={<div className="h-10 bg-neutral-100 rounded-xl animate-shimmer" />}>
            <CategoryFilter />
          </Suspense>
        </div>
      </ScrollReveal>

      {/* Grid */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <div className="bg-neutral-100 aspect-[4/3] animate-shimmer" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-neutral-100 rounded animate-shimmer w-3/4" />
                  <div className="h-3 bg-neutral-100 rounded animate-shimmer w-full" />
                  <div className="h-3 bg-neutral-100 rounded animate-shimmer w-1/2" />
                </div>
              </div>
            ))}
          </div>
        }
      >
        <UmkmGrid searchParams={params} />
      </Suspense>
    </div>
  );
}
