import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import HeroSection from '@/components/public/HeroSection';
import ServiceCard from '@/components/public/ServiceCard';
import UmkmCard from '@/components/public/UmkmCard';
import type { Service, Umkm, UmkmPhoto } from '@/types/db';

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

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Quick-Access Services */}
      <section className="container-page py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
            Layanan Administrasi Desa
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Temukan informasi lengkap persyaratan dan prosedur pengurusan surat dan layanan administrasi desa.
          </p>
        </div>

        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(services as Service[]).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-400">Belum ada layanan yang dipublikasikan.</p>
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/layanan"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Lihat semua layanan
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Latest Verified UMKM */}
      <section className="bg-neutral-50 py-16">
        <div className="container-page">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
              UMKM Terbaru Diverifikasi
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Usaha lokal Desa Surorejo yang baru saja diverifikasi. Hubungi langsung via WhatsApp.
            </p>
          </div>

          {sortedUmkm.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedUmkm.map((umkm) => (
                <UmkmCard key={umkm.id} umkm={umkm} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-400">Belum ada UMKM yang dipublikasikan.</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              href="/umkm"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow-md touch-target"
            >
              Lihat semua UMKM
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
