import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ServiceCard from '@/components/public/ServiceCard';
import ScrollReveal from '@/components/public/ScrollReveal';
import type { Service } from '@/types/db';

export const metadata: Metadata = {
  title: 'Layanan Administrasi',
  description: 'Daftar layanan administrasi Desa Surorejo. Temukan persyaratan, prosedur, dan kontak untuk setiap layanan.',
};

export const revalidate = 60;

export default async function LayananListPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from('service')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  return (
    <div className="container-page py-10 md:py-14">
      {/* Header */}
      <ScrollReveal className="mb-10">
        <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">
          Pelayanan
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
          Layanan Administrasi Desa
        </h1>
        <p className="text-neutral-500 max-w-2xl">
          Informasi lengkap persyaratan, prosedur, jam pelayanan, dan kontak untuk setiap layanan administrasi.
        </p>
      </ScrollReveal>

      {/* Info Banner */}
      <ScrollReveal className="mb-8">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-xl p-5 border border-primary-200/50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-10 h-10 bg-primary-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-primary-800 font-medium">Jam Pelayanan Kantor Desa</p>
            <p className="text-sm text-primary-700/80">Senin - Jumat: 09.00 - 15.00 WIB</p>
          </div>
        </div>
      </ScrollReveal>

      {services && services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(services as Service[]).map((service, idx) => (
            <ScrollReveal key={service.id} delay={Math.min(idx + 1, 4)}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <ScrollReveal>
          <div className="bg-neutral-50 rounded-2xl p-12 text-center border border-neutral-200">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-neutral-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <p className="text-neutral-500 mb-2 font-medium">Belum ada layanan yang dipublikasikan</p>
            <p className="text-sm text-neutral-400">Layanan akan muncul setelah admin menambahkan dan mempublikasikannya.</p>
          </div>
        </ScrollReveal>
      )}

      {/* CTA */}
      <ScrollReveal className="mt-12">
        <div className="bg-neutral-900 rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Butuh bantuan layanan?</h3>
          <p className="text-neutral-400 text-sm mb-5 max-w-md mx-auto">
            Jika Anda membutuhkan informasi lebih lanjut atau bantuan, kirim aspirasi atau hubungi kantor desa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#aspirasi"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow-md touch-target"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              Kirim Aspirasi
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
