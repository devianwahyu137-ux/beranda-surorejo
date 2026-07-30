'use client';

import ScrollReveal from './ScrollReveal';
import type { VillageOfficial } from '@/types/db';

interface VillageOfficialsProps {
  officials: VillageOfficial[];
}

export default function VillageOfficials({ officials }: VillageOfficialsProps) {
  // Identify Kepala Desa (usually sort_order = 1 or position contains 'Kepala Desa')
  const headOfficial = officials.find(o => o.position.toLowerCase().includes('kepala desa')) || officials[0];
  const otherOfficials = officials.filter(o => o.id !== headOfficial?.id);

  return (
    <div>
      <h3 className="text-xl font-bold text-neutral-900 mb-2">Struktur Pemerintahan Desa</h3>
      <p className="text-neutral-500 mb-8">
        Perangkat Desa Surorejo yang bertugas melayani masyarakat.
      </p>

      {officials.length === 0 ? (
        <div className="p-8 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
          <p className="text-neutral-500">Data perangkat desa belum ditambahkan.</p>
        </div>
      ) : (
        <>
          {/* Kepala Desa - highlighted */}
          {headOfficial && (
            <ScrollReveal className="mb-6">
              <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl p-6 border border-primary-200 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${headOfficial.color || 'from-primary-400 to-primary-600'} flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden relative`}
                >
                  {headOfficial.image_url ? (
                    <img src={headOfficial.image_url} alt={headOfficial.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  ) : (
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(headOfficial.name)}&background=random&color=fff&size=200`} alt={headOfficial.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs font-medium text-primary-600 bg-primary-200/50 inline-block px-2 py-0.5 rounded-full mb-1">
                    Pimpinan Desa
                  </p>
                  <h4 className="text-lg font-bold text-neutral-900">{headOfficial.name}</h4>
                  <p className="text-neutral-600">{headOfficial.position}</p>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Other officials */}
          {otherOfficials.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherOfficials.map((official, idx) => (
                <ScrollReveal key={official.id} delay={Math.min(idx + 1, 6)}>
                  <div className="bg-white rounded-xl border border-neutral-200 p-5 flex items-center gap-4 card-hover">
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${official.color || 'from-emerald-300 to-emerald-500'} flex items-center justify-center flex-shrink-0 overflow-hidden relative`}
                    >
                      {official.image_url ? (
                        <img src={official.image_url} alt={official.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      ) : (
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(official.name)}&background=random&color=fff&size=150`} alt={official.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 text-sm">{official.name}</h4>
                      <p className="text-xs text-neutral-500">{official.position}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
