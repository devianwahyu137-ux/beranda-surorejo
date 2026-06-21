import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ServiceCard from '@/components/public/ServiceCard';
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
    <div className="container-page py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">
          Layanan Administrasi Desa
        </h1>
        <p className="text-neutral-500 max-w-2xl">
          Informasi lengkap persyaratan, prosedur, jam pelayanan, dan kontak untuk setiap layanan administrasi.
        </p>
      </div>

      {services && services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(services as Service[]).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="bg-neutral-50 rounded-xl p-12 text-center">
          <svg
            className="w-12 h-12 text-neutral-300 mx-auto mb-4"
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
          <p className="text-neutral-500">Belum ada layanan yang dipublikasikan.</p>
        </div>
      )}
    </div>
  );
}
