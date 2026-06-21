import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CATEGORY_MAP } from '@/lib/constants';
import { buildPhoneLink } from '@/lib/wa';
import type { Umkm, UmkmPhoto } from '@/types/db';
import PhotoGallery from '@/components/public/PhotoGallery';
import FreshnessBadge from '@/components/public/FreshnessBadge';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import UpdateInfoButton from '@/components/public/UpdateInfoButton';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: umkm } = await supabase
    .from('umkm')
    .select('name, category, description, address_text')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!umkm) {
    return { title: 'UMKM Tidak Ditemukan' };
  }

  const categoryLabel = CATEGORY_MAP[(umkm as Umkm).category] || umkm.category;
  const description = umkm.description
    ? `${umkm.name} - ${categoryLabel}. ${umkm.description.slice(0, 150)}`
    : `${umkm.name} - ${categoryLabel} di Desa Surorejo.`;

  return {
    title: umkm.name,
    description,
    openGraph: {
      title: umkm.name,
      description,
      type: 'website',
    },
  };
}

export default async function UmkmDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: umkm } = await supabase
    .from('umkm')
    .select('*, umkm_photo(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!umkm) {
    notFound();
  }

  const u = umkm as Umkm & { umkm_photo: UmkmPhoto[] };
  const photos = (u.umkm_photo || []).sort((a, b) => a.sort_order - b.sort_order);
  const categoryLabel = CATEGORY_MAP[u.category] || u.category;

  // JSON-LD LocalBusiness
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: u.name,
    description: u.description || undefined,
    address: u.address_text
      ? {
          '@type': 'PostalAddress',
          streetAddress: u.address_text,
        }
      : undefined,
    telephone: u.phone_number || undefined,
    ...(u.latitude && u.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: u.latitude,
            longitude: u.longitude,
          },
        }
      : {}),
    image: photos.length > 0 ? photos[0].url : undefined,
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-page py-12">
        {/* Back link */}
        <a
          href="/umkm"
          className="inline-flex items-center text-sm text-neutral-500 hover:text-primary-600 mb-6 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke direktori UMKM
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Photo Gallery */}
          <div>
            <PhotoGallery photos={photos} businessName={u.name} />
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Name & Category */}
            <div>
              <span className="inline-block bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
                {categoryLabel}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                {u.name}
              </h1>
            </div>

            {/* Description */}
            {u.description && (
              <div>
                <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                  Deskripsi
                </h2>
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                  {u.description}
                </p>
              </div>
            )}

            {/* Operating Hours */}
            {u.operating_hours && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Jam Operasional
                  </h2>
                  <p className="text-neutral-700">{u.operating_hours}</p>
                </div>
              </div>
            )}

            {/* Address */}
            {u.address_text && (
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                    Alamat
                  </h2>
                  <p className="text-neutral-700">{u.address_text}</p>
                </div>
              </div>
            )}

            {/* Freshness Badge */}
            <FreshnessBadge lastVerifiedAt={u.last_verified_at} />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <WhatsAppButton
                whatsappNumber={u.whatsapp_number}
                businessName={u.name}
                variant="primary"
              />

              {u.phone_number && (
                <a
                  href={buildPhoneLink(u.phone_number)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-neutral-300 text-neutral-700 font-medium rounded-xl hover:border-primary-400 hover:text-primary-600 transition-all duration-300 touch-target"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Telepon
                </a>
              )}

              <UpdateInfoButton businessName={u.name} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
