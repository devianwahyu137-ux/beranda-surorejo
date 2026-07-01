import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { formatVerifiedDate } from '@/lib/freshness';
import ScrollReveal from '@/components/public/ScrollReveal';
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

  const sections = [
    {
      show: !!s.requirements,
      title: 'Persyaratan',
      content: s.requirements,
      icon: (
        <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      color: 'border-l-primary-500 bg-primary-50/30',
    },
    {
      show: !!s.steps,
      title: 'Prosedur / Langkah',
      content: s.steps,
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      ),
      color: 'border-l-blue-500 bg-blue-50/30',
    },
    {
      show: !!s.hours,
      title: 'Jam Pelayanan',
      content: s.hours,
      icon: (
        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'border-l-amber-500 bg-amber-50/30',
    },
    {
      show: !!s.contact,
      title: 'Kontak',
      content: s.contact,
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      color: 'border-l-emerald-500 bg-emerald-50/30',
    },
  ];

  return (
    <div className="container-page py-10 md:py-14">
      {/* Back link */}
      <ScrollReveal>
        <Link
          href="/layanan"
          className="inline-flex items-center text-sm text-neutral-500 hover:text-primary-600 mb-6 transition-colors group"
        >
          <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke daftar layanan
        </Link>
      </ScrollReveal>

      {/* Page Header */}
      <ScrollReveal className="mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">{s.title}</h1>
            {s.last_verified_at && (
              <p className="text-sm text-neutral-400 mt-1">
                Diverifikasi terakhir: {formatVerifiedDate(s.last_verified_at)}
              </p>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Content Sections */}
      <div className="space-y-4">
        {sections.filter(sec => sec.show).map((section, idx) => (
          <ScrollReveal key={section.title} delay={Math.min(idx + 1, 4)}>
            <div className={`rounded-xl border border-neutral-200 p-5 md:p-6 shadow-sm border-l-4 ${section.color}`}>
              <h2 className="flex items-center gap-2.5 text-lg font-semibold text-neutral-800 mb-3">
                {section.icon}
                {section.title}
              </h2>
              <div className="text-neutral-700 leading-relaxed whitespace-pre-line pl-[30px]">
                {section.content}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Download Form Button */}
      {s.form_url && (
        <ScrollReveal className="mt-6">
          <a
            href={s.form_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 touch-target"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Unduh Formulir
          </a>
        </ScrollReveal>
      )}

      {/* Help CTA */}
      <ScrollReveal className="mt-10">
        <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 bg-neutral-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-700">Butuh bantuan lebih lanjut?</p>
            <p className="text-sm text-neutral-500">Silakan hubungi kantor desa atau kirim aspirasi melalui website ini.</p>
          </div>
          <Link
            href="/#aspirasi"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 whitespace-nowrap transition-colors"
          >
            Kirim Aspirasi →
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
