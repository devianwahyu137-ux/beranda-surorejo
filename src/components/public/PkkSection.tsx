'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import type { PkkOfficial, PkkProgram, Gallery } from '@/types/db';

interface PkkSectionProps {
  officials: PkkOfficial[];
  programs: PkkProgram[];
  galleries: Gallery[];
}

export default function PkkSection({ officials, programs, galleries }: PkkSectionProps) {
  const [openProgram, setOpenProgram] = useState<number | null>(null);

  return (
    <div className="space-y-10">
      {/* Tentang PKK */}
      <ScrollReveal>
        <div>
          <h3 className="text-xl font-bold text-neutral-900 mb-3">Tentang PKK Desa Surorejo</h3>
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-5 md:p-6 border border-pink-200/50">
            <p className="text-neutral-700 leading-relaxed">
              Pemberdayaan Kesejahteraan Keluarga (PKK) Desa Surorejo merupakan organisasi kemasyarakatan
              yang berperan aktif dalam meningkatkan kesejahteraan keluarga. Melalui 10 Program Pokok PKK,
              ibu-ibu PKK Desa Surorejo berkontribusi dalam pembangunan desa di bidang kesehatan, pendidikan,
              ekonomi, dan sosial budaya.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Pengurus PKK */}
      <ScrollReveal>
        <div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">Pengurus PKK</h3>
          <p className="text-neutral-500 mb-5 text-sm">Organisasi Pemberdayaan Kesejahteraan Keluarga</p>
          
          {officials.length === 0 ? (
             <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
               <p className="text-sm text-neutral-500">Data pengurus belum ditambahkan.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {officials.map((official, idx) => (
                <ScrollReveal key={official.id} delay={Math.min(idx + 1, 4)}>
                  <div className="bg-white rounded-xl border border-neutral-200 p-5 flex items-center gap-4 card-hover">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${official.color || 'from-pink-300 to-rose-400'} flex items-center justify-center flex-shrink-0 overflow-hidden relative`}>
                      {official.image_url ? (
                        <img src={official.image_url} alt={official.name} className="w-full h-full object-cover" />
                      ) : (
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(official.name)}&background=random&color=fff&size=150`} alt={official.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">{official.name}</h4>
                      <p className="text-sm text-neutral-500">{official.position}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* 10 Program Pokok PKK */}
      <ScrollReveal>
        <div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">10 Program Pokok PKK</h3>
          <p className="text-neutral-500 mb-5 text-sm">
            Program kerja utama yang dijalankan oleh PKK Desa Surorejo.
          </p>
          
          {programs.length === 0 ? (
             <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
               <p className="text-sm text-neutral-500">Data program belum ditambahkan.</p>
             </div>
          ) : (
            <div className="space-y-2">
              {programs.map((program, idx) => (
                <div
                  key={program.id}
                  className="bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenProgram(openProgram === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 transition-colors touch-target"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-neutral-900 text-sm sm:text-base">
                        {program.title}
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-neutral-400 flex-shrink-0 accordion-chevron ${openProgram === idx ? 'open' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`accordion-content ${openProgram === idx ? 'open' : ''}`}>
                    <div className="px-5 pb-4 pt-0 pl-16">
                      <p className="text-sm text-neutral-600 leading-relaxed">{program.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* Galeri PKK */}
      <ScrollReveal>
        <div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">Galeri Kegiatan PKK</h3>
          <p className="text-neutral-500 mb-5 text-sm">Dokumentasi kegiatan PKK Desa Surorejo.</p>
          
          {galleries.length === 0 ? (
             <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-center">
               <p className="text-sm text-neutral-500">Belum ada foto kegiatan PKK.</p>
             </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {galleries.map((item, idx) => (
                <ScrollReveal key={item.id} delay={Math.min(idx + 1, 4)} direction="scale">
                  <div className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100">
                    {item.image_url.startsWith('http') || item.image_url.startsWith('/') ? (
                       <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color || 'from-pink-200 to-pink-300'} flex items-center justify-center`}>
                        <svg className="w-10 h-10 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                      <span className="text-white text-sm font-medium px-3 py-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
