import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ProfileTabs from '@/components/public/ProfileTabs';
import VillageOfficials from '@/components/public/VillageOfficials';
import PkkSection from '@/components/public/PkkSection';
import LembagaSection from '@/components/public/LembagaSection';
import TransparencySection from '@/components/public/TransparencySection';
import ScrollReveal from '@/components/public/ScrollReveal';
import DynamicBoundaryMap from '@/components/public/DynamicBoundaryMap';
import VillageDataSection from '@/components/public/VillageDataSection';
import Link from 'next/link';

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
    { id: '1', label: 'Penduduk Laki-laki', value: '597', icon: 'users', sort_order: 1 },
    { id: '2', label: 'Penduduk Perempuan', value: '621', icon: 'users', sort_order: 2 },
    { id: '3', label: 'Kepala Keluarga', value: '361 KK', icon: 'home', sort_order: 3 },
    { id: '4', label: 'Luas Wilayah', value: '186,772 Ha', icon: 'map', sort_order: 4 }
  ];

  const defaultAreas = [
    { id: '1', dusun: 'Surobayan', rw_count: 1, rt_count: 1, population: 0, head_name: 'Agung Supangkat', sort_order: 1 },
    { id: '2', dusun: 'Kleben', rw_count: 1, rt_count: 1, population: 0, head_name: 'Budi Santoso', sort_order: 2 },
    { id: '3', dusun: 'Kragilan Lor', rw_count: 1, rt_count: 1, population: 0, head_name: 'Ari F.', sort_order: 3 },
    { id: '4', dusun: 'Kragilan Kidul', rw_count: 1, rt_count: 1, population: 0, head_name: 'Gian Bisono', sort_order: 4 },
    { id: '5', dusun: 'Kenanggulan', rw_count: 1, rt_count: 1, population: 0, head_name: 'Usman', sort_order: 5 },
    { id: '6', dusun: 'Kiyudan', rw_count: 1, rt_count: 1, population: 0, head_name: 'Dimas', sort_order: 6 }
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
                    Desa Surorejo, Kecamatan Banyuurip, Kabupaten Purworejo, Provinsi Jawa Tengah merupakan satu dari 24 desa di Kecamatan Banyuurip yang mempunyai jarak 8 km dari kota Kabupaten. Desa Surorejo terdiri dari 6 dusun, 3 RW, dan 6 RT dengan luas 186,772 Ha.
                  </p>
                  <p className="mt-3">
                    Secara geografis, Desa Surorejo terletak di perbatasan dengan Desa Banyuurip dan Tegalrejo (Utara), Desa Wangunrejo (Timur), Desa Sendangsari (Selatan), dan Desa Bencorejo (Barat).
                  </p>
                  <p className="mt-3 font-medium text-neutral-700">Sejarah Kepemimpinan Desa:</p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    <li><strong>1936–1940:</strong> Wongso Pawiro</li>
                    <li><strong>1941–1949:</strong> Kasbolah</li>
                    <li><strong>1950–1959:</strong> Wiryo Suwarno</li>
                    <li><strong>1960–1988:</strong> Parto Disono (Sekdes: Dolah Satari)</li>
                    <li><strong>1989–1998:</strong> Sunaryo (Sekdes: Dolah Satari)</li>
                    <li><strong>1998–2006:</strong> Suwarson (Sekdes: Sunamto)</li>
                    <li><strong>2007–2013:</strong> Suwarson — periode ke-2 (Sekdes: Sunamto)</li>
                    <li><strong>2013–2018:</strong> Margino (Sekdes: Sunamto)</li>
                    <li><strong>2019–sekarang:</strong> Margino (Sekdes: Suwardi)</li>
                  </ul>
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
                    &ldquo;MEMBANGUN DESA DAN MENINGKATKAN KESEJAHTERAAN MASYARAKAT DESA SUROREJO&rdquo;
                  </p>
                  
                  <h4 className="font-bold text-primary-900 mb-2">Misi:</h4>
                  <ul className="space-y-2 text-primary-800/80 list-disc pl-5">
                    <li>Meneruskan pembangunan yang belum terealisasi.</li>
                    <li>Mewujudkan dan meningkatkan serta meneruskan tata pemerintahan desa yang lebih baik.</li>
                    <li>Meningkatkan pelayanan yang maksimal terhadap warga desa.</li>
                    <li>Meningkatkan kehidupan yang lebih harmonis, toleran, saling menghormati dalam kehidupan berbudaya dan beragama di Desa Surorejo.</li>
                    <li>Mengedepankan kejujuran, keadilan, dan transparansi dalam kehidupan sehari-hari baik dalam pemerintahan maupun dengan masyarakat desa.</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Peta Batas Wilayah & Administrasi */}
          <ScrollReveal>
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-neutral-900 mb-2 flex items-center gap-2.5">
                <span className="p-2 bg-red-50 text-red-600 rounded-xl border border-red-200/60 shadow-sm inline-flex">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </span>
                Peta Batas Wilayah & Administrasi Desa
              </h3>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed max-w-3xl">
                Desa Surorejo merupakan pusat pemukiman dan kegiatan ekonomi strategis dengan luas kawasan mencapai <span className="font-bold text-neutral-900">186,77 Ha</span> di Kabupaten Purworejo.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Peta Khusus Batas Administrasi */}
                <div className="lg:col-span-8 h-[420px] sm:h-[480px] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm relative">
                  <DynamicBoundaryMap 
                    locations={strategicLocations || []} 
                  />
                </div>

                {/* Legenda & Batas Tetangga */}
                <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100 mb-4">
                      <h4 className="font-extrabold text-neutral-900 text-base flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Legenda Batas Desa
                      </h4>
                      <span className="text-[11px] font-bold px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-md">
                        186,77 Ha
                      </span>
                    </div>

                    <div className="space-y-3.5 text-xs sm:text-sm text-neutral-700">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-neutral-400 font-medium text-xs">Sebelah Utara:</span>
                        <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                          Berbatasan dengan Desa Banyuurip
                        </div>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-neutral-400 font-medium text-xs">Sebelah Timur:</span>
                        <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                          Berbatasan dengan Desa Wangunrejo
                        </div>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-neutral-400 font-medium text-xs">Sebelah Selatan:</span>
                        <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                          Desa Sendangsari & Brondongrejo
                        </div>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-neutral-400 font-medium text-xs">Sebelah Barat:</span>
                        <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
                          Desa Malangrejo & Bencorejo
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 p-3.5 bg-red-50/70 border border-red-200/60 rounded-xl">
                      <span className="text-[11px] font-bold text-red-800 uppercase tracking-wider block mb-1">Pusat Pemerintahan</span>
                      <p className="text-xs text-neutral-800 font-semibold leading-relaxed">
                        Kantor Balai Desa Surorejo berada di pusat wilayah, mendukung keterjangkauan layanan publik dari seluruh kawasan dusun.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100">
                    <Link
                      href="/peta"
                      className="group w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-center touch-target"
                    >
                      <span>🗺️ Buka Peta Interaktif & UMKM</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
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

          {/* Data Desa Lengkap: SDA, SDM, Kesehatan, Keagamaan, SOTK */}
          <VillageDataSection />
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
