import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import HeroSection from '@/components/public/HeroSection';
import WelcomeSection from '@/components/public/WelcomeSection';
import StatsSection from '@/components/public/StatsSection';
import ServiceCard from '@/components/public/ServiceCard';
import UmkmCard from '@/components/public/UmkmCard';
import LatestArticles from '@/components/public/LatestArticles';
import UpcomingEvents from '@/components/public/UpcomingEvents';
import GalleryPreview from '@/components/public/GalleryPreview';
import AspirasiForm from '@/components/public/AspirasiForm';
import ScrollReveal from '@/components/public/ScrollReveal';
import type { Service, Umkm, UmkmPhoto, Gallery } from '@/types/db';

export const metadata: Metadata = {
  title: 'Beranda Surorejo — Sistem Informasi Desa',
  description:
    'Sistem informasi Desa Surorejo, Banyuurip, Purworejo. Temukan layanan administrasi desa dan direktori UMKM lokal.',
};

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch published services
  const { data: services } = await supabase
    .from('service')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  // Fetch latest verified UMKM (max 6)
  const { data: umkmList } = await supabase
    .from('umkm')
    .select('*, umkm_photo(*)')
    .eq('is_published', true)
    .order('last_verified_at', { ascending: false })
    .limit(6);

  // Sort photos within each UMKM
  const sortedUmkm = ((umkmList as (Umkm & { umkm_photo: UmkmPhoto[] })[]) || []).map((u) => ({
    ...u,
    umkm_photo: (u.umkm_photo || []).sort((a, b) => a.sort_order - b.sort_order),
  }));

  // Fetch Gallery (umum only for beranda)
  const { data: galleries } = await supabase
    .from('gallery')
    .select('*')
    .eq('category', 'umum')
    .order('sort_order', { ascending: true })
    .limit(9);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Sambutan Kepala Desa */}
      <WelcomeSection />

      {/* Statistik Desa */}
      <StatsSection />

      {/* Quick-Access Services */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-page">
          <ScrollReveal className="text-center mb-10">
            <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">
              Pelayanan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
              Layanan Administrasi Desa
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto mb-1">
              Temukan informasi lengkap persyaratan dan prosedur pengurusan surat dan layanan administrasi desa.
            </p>
            <div className="md:hidden inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-50 text-primary-700 font-bold text-xs animate-pulse mt-2 border border-primary-100 shadow-sm">
              <span>👆 Geser kartu ke samping untuk menelusuri</span>
              <span>→</span>
            </div>
          </ScrollReveal>

          {services && services.length > 0 ? (
            <ScrollReveal>
              <div className="flex md:grid md:grid-cols-2 gap-4 sm:gap-5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {(services as Service[]).map((service) => (
                  <div key={service.id} className="min-w-[280px] w-[84vw] max-w-[350px] md:min-w-0 md:w-auto md:max-w-none shrink-0 md:shrink snap-center md:snap-align-none">
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="text-center py-12">
                <p className="text-neutral-400">Belum ada layanan yang dipublikasikan.</p>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal className="text-center mt-8">
            <Link
              href="/layanan"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors group"
            >
              Lihat semua layanan
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Latest Verified UMKM */}
      <section className="bg-neutral-50 py-16 md:py-20">
        <div className="container-page">
          <ScrollReveal className="text-center mb-10">
            <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">
              Usaha Lokal
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
              UMKM Terbaru Diverifikasi
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto mb-1">
              Usaha lokal Desa Surorejo yang baru saja diverifikasi. Hubungi langsung via WhatsApp.
            </p>
            <div className="md:hidden inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-50 text-primary-700 font-bold text-xs animate-pulse mt-2 border border-primary-100 shadow-sm">
              <span>👉 Geser ke samping untuk melihat UMKM lainnya</span>
              <span>→</span>
            </div>
          </ScrollReveal>

          {sortedUmkm.length > 0 ? (
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto sm:overflow-visible pb-5 sm:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {sortedUmkm.map((umkm, idx) => (
                <div key={umkm.id} className="min-w-[280px] w-[82vw] max-w-[340px] sm:min-w-0 sm:w-auto sm:max-w-none shrink-0 sm:shrink snap-center sm:snap-align-none h-auto flex flex-col">
                  <ScrollReveal delay={Math.min(idx + 1, 3)} className="h-full">
                    <UmkmCard umkm={umkm} isFirst={idx === 0} />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="text-center py-12">
                <p className="text-neutral-400">Belum ada UMKM yang dipublikasikan.</p>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal className="text-center mt-8">
            <Link
              href="/umkm"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 touch-target"
            >
              Lihat semua UMKM
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Berita Terbaru */}
      <LatestArticles />

      {/* Agenda Kegiatan */}
      <UpcomingEvents />

      {/* Galeri Kegiatan */}
      <GalleryPreview items={(galleries || []) as Gallery[]} />

      {/* Form Aspirasi Warga */}
      <AspirasiForm />
    </>
  );
}
