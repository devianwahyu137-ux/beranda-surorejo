import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ProfileTabs from '@/components/public/ProfileTabs';
import VillageOfficials from '@/components/public/VillageOfficials';
import PkkSection from '@/components/public/PkkSection';
import ScrollReveal from '@/components/public/ScrollReveal';
import DynamicMap from '@/components/public/DynamicMap';

export const metadata: Metadata = {
  title: 'Profil Desa',
  description: 'Profil, sejarah, visi misi, struktur perangkat desa, dan PKK Desa Surorejo.',
};

export const revalidate = 60;

// Konstanta Profil Desa
const DEMOGRAPHIC_STATS = [
  { label: 'Laki-laki', value: '1.245', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { label: 'Perempuan', value: '1.312', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { label: 'Total KK', value: '780', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'Kepadatan', value: '450/km²', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export default async function ProfilPage() {
  const supabase = await createClient();

  // Fetch Perangkat Desa
  const { data: villageOfficials } = await supabase
    .from('village_official')
    .select('*')
    .order('sort_order', { ascending: true });

  // Fetch PKK Officials
  const { data: pkkOfficials } = await supabase
    .from('pkk_official')
    .select('*')
    .order('sort_order', { ascending: true });

  // Fetch PKK Programs
  const { data: pkkPrograms } = await supabase
    .from('pkk_program')
    .select('*')
    .order('sort_order', { ascending: true });

  // Fetch PKK Gallery
  const { data: pkkGalleries } = await supabase
    .from('gallery')
    .select('*')
    .eq('category', 'pkk')
    .order('sort_order', { ascending: true });

  // Fetch Locations for Map
  const { data: strategicLocations } = await supabase
    .from('strategic_location')
    .select('*');

  const { data: umkmList } = await supabase
    .from('umkm')
    .select('*')
    .eq('is_published', true);

  return (
    <div className="container-page py-10 md:py-14">
      {/* Page Header */}
      <ScrollReveal className="text-center mb-12">
        <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-3">
          Informasi Desa
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
          Profil Desa Surorejo
        </h1>
        <p className="text-neutral-500 max-w-2xl mx-auto">
          Mengenal lebih dekat sejarah, visi misi, dan struktur pemerintahan yang melayani masyarakat Desa Surorejo.
        </p>
      </ScrollReveal>

      {/* Profile Tabs Client Component */}
      <ProfileTabs
        tabs={[
          {
            id: 'tentang',
            label: 'Tentang Desa',
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
          {
            id: 'perangkat',
            label: 'Perangkat Desa',
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ),
          },
          {
            id: 'pkk',
            label: 'PKK',
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            ),
          },
        ]}
      >
        <div className="space-y-12">
          {/* Sejarah & Visi Misi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Sejarah Desa
                </h3>
                <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed">
                  <p>
                    Desa Surorejo memiliki sejarah panjang yang erat kaitannya dengan perkembangan wilayah Banyuurip.
                    Konon, nama Surorejo diambil dari kata "Suro" yang berarti berani dan "Rejo" yang berarti ramai atau makmur.
                  </p>
                  <p className="mt-3">
                    Seiring berjalannya waktu, Surorejo berkembang menjadi desa agraris dengan potensi sumber daya alam yang melimpah dan masyarakat yang menjunjung tinggi semangat gotong royong.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Visi & Misi
                </h3>
                <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
                  <h4 className="font-bold text-primary-900 mb-2">Visi:</h4>
                  <p className="text-primary-800/80 mb-5 italic">
                    "Terwujudnya Desa Surorejo yang Mandiri, Sejahtera, dan Berbudaya melalui Tata Kelola Pemerintahan yang Baik."
                  </p>
                  
                  <h4 className="font-bold text-primary-900 mb-2">Misi:</h4>
                  <ul className="space-y-2 text-primary-800/80 list-disc pl-5">
                    <li>Meningkatkan kualitas pelayanan publik.</li>
                    <li>Mendorong pemberdayaan ekonomi masyarakat melalui UMKM.</li>
                    <li>Memelihara kelestarian lingkungan dan budaya lokal.</li>
                    <li>Meningkatkan pembangunan infrastruktur desa yang merata.</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Peta Lokasi */}
          <ScrollReveal>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Peta Wilayah
              </h3>
              <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-neutral-200 border border-neutral-300 relative shadow-sm">
                <DynamicMap 
                  locations={strategicLocations || []} 
                  umkmData={umkmList || []} 
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Demografi */}
          <ScrollReveal>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Demografi Desa
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {DEMOGRAPHIC_STATS.map((stat, idx) => (
                  <div key={idx} className="bg-white border border-neutral-200 rounded-xl p-5 text-center card-hover">
                    <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                    <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <VillageOfficials officials={villageOfficials || []} />

        <PkkSection 
          officials={pkkOfficials || []} 
          programs={pkkPrograms || []}
          galleries={pkkGalleries || []}
        />
      </ProfileTabs>
    </div>
  );
}
