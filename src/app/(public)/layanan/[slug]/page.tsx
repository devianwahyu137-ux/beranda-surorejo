import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatVerifiedDate } from '@/lib/freshness';
import type { Service } from '@/types/db';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase
    .from('service')
    .select('title, requirements')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!service) {
    return { title: 'Layanan Tidak Ditemukan' };
  }

  return {
    title: service.title,
    description: `Informasi layanan ${service.title} di Desa Surorejo. Persyaratan, prosedur, dan kontak.`,
  };
}

export default async function LayananDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase
    .from('service')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!service) {
    notFound();
  }

  const s = service as Service;

  return (
    <div className="container-page py-12">
      {/* Back link */}
      <a
        href="/layanan"
        className="inline-flex items-center text-sm text-neutral-500 hover:text-primary-600 mb-6 transition-colors"
      >
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke daftar layanan
      </a>

      <h1 className="text-3xl font-bold text-neutral-900 mb-8">{s.title}</h1>

      <div className="space-y-6">
        {/* Persyaratan */}
        {s.requirements && (
          <section className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-800 mb-4">
              <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Persyaratan
            </h2>
            <div className="text-neutral-700 leading-relaxed whitespace-pre-line">
              {s.requirements}
            </div>
          </section>
        )}

        {/* Langkah */}
        {s.steps && (
          <section className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-800 mb-4">
              <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              Prosedur / Langkah
            </h2>
            <div className="text-neutral-700 leading-relaxed whitespace-pre-line">
              {s.steps}
            </div>
          </section>
        )}

        {/* Jam Pelayanan */}
        {s.hours && (
          <section className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-800 mb-4">
              <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Jam Pelayanan
            </h2>
            <div className="text-neutral-700 leading-relaxed whitespace-pre-line">
              {s.hours}
            </div>
          </section>
        )}

        {/* Kontak */}
        {s.contact && (
          <section className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-800 mb-4">
              <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Kontak
            </h2>
            <div className="text-neutral-700 leading-relaxed whitespace-pre-line">
              {s.contact}
            </div>
          </section>
        )}

        {/* Tombol Unduh Formulir */}
        {s.form_url && (
          <div className="flex">
            <a
              href={s.form_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-sm touch-target"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Unduh Formulir
            </a>
          </div>
        )}

        {/* Freshness note */}
        {s.last_verified_at && (
          <p className="text-sm text-neutral-400">
            Diverifikasi terakhir: {formatVerifiedDate(s.last_verified_at)}
          </p>
        )}
      </div>
    </div>
  );
}
