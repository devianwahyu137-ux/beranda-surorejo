import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ProfileTabs from '@/components/public/ProfileTabs';
import VillageOfficials from '@/components/public/VillageOfficials';
import PkkSection from '@/components/public/PkkSection';
import LembagaSection from '@/components/public/LembagaSection';
import TransparencySection from '@/components/public/TransparencySection';
import ScrollReveal from '@/components/public/ScrollReveal';
import DynamicMap from '@/components/public/DynamicMap';

export const metadata: Metadata = {
  title: 'Profil Desa',
  description: 'Profil, sejarah, visi misi, struktur perangkat desa, dan PKK Desa Surorejo.',
};

export const revalidate = 60;

import { STAT_ICONS } from '@/lib/constants';

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

  const { data: demographicStatsData } = await supabase
    .from('demographic_stat')
    .select('*')
    .order('sort_order', { ascending: true });

  const { data: villageAreasData } = await supabase
    .from('village_area')
    .select('*')
    .order('sort_order', { ascending: true });

  const defaultStats = [
    { id: '1', label: 'Penduduk Laki-laki', value: '1.650', icon: 'users', sort_order: 1 },
    { id: '2', label: 'Penduduk Perempuan', value: '1.600', icon: 'users', sort_order: 2 },
    { id: '3', label: 'Kepala Keluarga', value: '980', icon: 'home', sort_order: 3 },
    { id: '4', label: 'Luas Wilayah', value: '450 Ha', icon: 'map', sort_order: 4 }
  ];

  const defaultAreas = [
    { id: '1', dusun: 'Krajan', rw_count: 2, rt_count: 8, population: 850, head_name: 'Bpk. Supriyadi', sort_order: 1 },
    { id: '2', dusun: 'Ngabean', rw_count: 2, rt_count: 6, population: 750, head_name: 'Bpk. Mulyono', sort_order: 2 },
    { id: '3', dusun: 'Kedungdowo', rw_count: 2, rt_count: 5, population: 650, head_name: 'Bpk. Sarjono', sort_order: 3 },
    { id: '4', dusun: 'Sidomulyo', rw_count: 2, rt_count: 5, population: 1000, head_name: 'Bpk. Haryanto', sort_order: 4 }
  ];

  const demographicStats = demographicStatsData && demographicStatsData.length > 0 ? demographicStatsData : defaultStats;
  const villageAreas = villageAreasData && villageAreasData.length > 0 ? villageAreasData : defaultAreas;

  const { data: lembagaList } = await supabase
    .from('lembaga')
    .select('*')
    .order('sort_order', { ascending: true });

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
          {
            id: 'lembaga',
            label: 'Lembaga',
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            ),
          },
          {
            id: 'transparansi',
            label: 'Transparansi',
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
            <div className="mb-12">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Data Desa
              </h3>
              {demographicStats && demographicStats.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {demographicStats.map((stat) => (
                    <div key={stat.id} className="bg-white border border-neutral-200 rounded-xl p-5 text-center card-hover">
                      <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={STAT_ICONS[stat.icon] || STAT_ICONS['users']} />
                        </svg>
                      </div>
                      <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                      <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-neutral-50 rounded-xl text-neutral-500 border border-neutral-200">
                  Data statistik belum tersedia.
                </div>
              )}
            </div>
            
            {/* Wilayah Administratif */}
            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Wilayah Administratif
              </h3>
              <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
                      <tr>
                        <th className="px-6 py-4 font-medium">Nama Dusun</th>
                        <th className="px-6 py-4 font-medium text-center">Jumlah RW</th>
                        <th className="px-6 py-4 font-medium text-center">Jumlah RT</th>
                        <th className="px-6 py-4 font-medium text-center">Populasi Jiwa</th>
                        <th className="px-6 py-4 font-medium">Kepala Dusun</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {villageAreas && villageAreas.length > 0 ? (
                        villageAreas.map((area) => (
                          <tr key={area.id} className="hover:bg-neutral-50/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-neutral-900">{area.dusun}</td>
                            <td className="px-6 py-4 text-center text-neutral-600">{area.rw_count}</td>
                            <td className="px-6 py-4 text-center text-neutral-600">{area.rt_count}</td>
                            <td className="px-6 py-4 text-center text-neutral-600">{area.population}</td>
                            <td className="px-6 py-4 text-neutral-600">{area.head_name || '-'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                            Data wilayah administratif belum tersedia.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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

        <LembagaSection lembagaList={lembagaList || []} />

        <TransparencySection />
      </ProfileTabs>
    </div>
  );
}
