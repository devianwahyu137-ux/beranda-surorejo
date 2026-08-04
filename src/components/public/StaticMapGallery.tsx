'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  PETA_LUASAN_DUSUN_JUDUL,
  PETA_LUASAN_DUSUN_PARAGRAF,
  PETA_LUASAN_DUSUN_DATA,
} from '@/lib/peta-luasan-dusun-data';

interface StaticMap {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnailUrl: string; // Used for the grid
  highResUrl: string;   // Used for the lightbox modal & full screen
  downloadUrl: string;  // Used for downloading (PDF / ZIP / JPG)
  dateStr: string;
  scale?: string;
  detailsTitle?: string;
  detailsImageUrl?: string;
  detailsDescription?: string[];
  detailsData?: typeof PETA_LUASAN_DUSUN_DATA;
}

// 5 Template Peta Tematik KKN / Desa Surorejo
const DUMMY_MAPS: StaticMap[] = [
  {
    id: 'map-1',
    title: 'Peta Luasan dan Profil Dusun',
    category: 'Administrasi Wilayah',
    description: 'Pemetaan luasan dan profil masing-masing dusun di Desa Surorejo, mencakup enam dusun: Surobayan, Kleben, Kragilan Lor, Kragilan Kidul, Kenanggulan, dan Kiyudan, beserta sebaran potensi usaha ekonomi masyarakat.',
    thumbnailUrl: '/images/peta-luasan-profil-dusun.jpg',
    highResUrl: '/images/peta-luasan-profil-dusun.jpg',
    downloadUrl: '#',
    dateStr: 'Agustus 2026',
    //scale: 'Skala 1:5.000',
    detailsTitle: PETA_LUASAN_DUSUN_JUDUL,
    detailsImageUrl: '/images/peta-luasan-profil-dusun.jpg',
    detailsDescription: PETA_LUASAN_DUSUN_PARAGRAF,
    detailsData: PETA_LUASAN_DUSUN_DATA,
  },
  {
    id: 'map-2',
    title: 'Peta Luasan Lahan Permukiman dan Pertanian',
    category: 'Geosains & Lahan',
    description: 'Analisis persebaran area persawahan produktif, kawasan pemukiman warga, perkebunan kelola, fasilitas publik, dan area terbuka hijau/hutan desa untuk dasar perencanaan pembangunan berkelanjutan.',
    thumbnailUrl: '/images/peta-luasan-lahan-permukiman-pertanian.jpg',
    highResUrl: '/images/peta-luasan-lahan-permukiman-pertanian.jpg',
    downloadUrl: '#',
    dateStr: 'Agustus 2026',
    //scale: 'Skala 1:10.000',
    detailsTitle: 'Peta Luasan Lahan Permukiman dan Pertanian',
    detailsImageUrl: '/images/peta-luasan-lahan-permukiman-pertanian.jpg',
    detailsDescription: [
      'Peta Luasan Wilayah Permukiman dan Pertanian ini menyajikan informasi mengenai pola persebaran dan perbandingan lahan pemukiman dan pertanian di Desa Surorejo, Kecamatan Banyuurip. Hasil pemetaan menunjukkan bahwa wilayah Desa Surorejo memiliki luas keseluruhan sekitar 1.993.234,10 m² atau 199,32 hektare, yang meliputi lahan sawah dan permukiman. Lahan sawah memiliki luas sekitar 1.226.155,47 m² atau 122,62 hektare, dengan proporsi sebesar 61,52% dari total wilayah yang dipetakan. Sementara itu, kawasan permukiman memiliki luas sekitar 767.078,63 m² atau 76,71 hektare, dengan proporsi sebesar 38,48%.',
      'Berdasarkan hasil tersebut, penggunaan lahan di Desa Surorejo yang teridentifikasi melalui pemetaan lebih banyak didominasi oleh kawasan pertanian berupa sawah dibandingkan kawasan permukiman. Data mengenai luas dan persebaran penggunaan lahan ini dapat memberikan gambaran mengenai karakteristik wilayah Desa Surorejo sekaligus menjadi informasi pendukung dalam mengoptimalkan potensi lahan dan menyusun perencanaan pembangunan desa secara lebih tepat dan terarah.',
    ],
  },
  {
    id: 'map-3',
    title: 'Peta Infrastruktur & Jaringan Akses',
    category: 'Infrastruktur',
    description: 'Inventarisasi kelayakan akses jalan utama desa, jalan usaha tani, jembatan penghubung antar dukuh, instalasi irigasi pertanahan, serta kondisi jaringan drainase lingkungan warga.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1000&auto=format&fit=crop',
    highResUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=90&w=1600&auto=format&fit=crop',
    downloadUrl: '#',
    dateStr: 'Agustus 2026',
    scale: 'Skala 1:11.000',
  },
  {
    id: 'map-4',
    title: 'Peta Sebaran Potensi UMKM & Ekonomi',
    category: 'Ekonomi Desa',
    description: 'Pemetaan titik-titik kegiatan ekonomi kreatif warga, toko ritel desa, warung kuliner rakyat, serta sentra hasil bumi pertanian yang mendukung pertumbuhan mandiri dan daya saing Desa Surorejo.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1000&auto=format&fit=crop',
    highResUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=90&w=1600&auto=format&fit=crop',
    downloadUrl: '#',
    dateStr: 'Agustus 2026',
    scale: 'Skala 1:11.000',
  },
  {
    id: 'map-5',
    title: 'Peta Hidrologi & Mitigasi Bencana',
    category: 'Mitigasi Bencana',
    description: 'Jalur Daerah Aliran Sungai (DAS), sumur resapan, sumber air bersih terpadu, serta pemetaan area rawan genangan air berlanjut lengkap dengan petunjuk rute evakuasi darurat tanggap bencana.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1000&auto=format&fit=crop',
    highResUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=90&w=1600&auto=format&fit=crop',
    downloadUrl: '#',
    dateStr: 'Agustus 2026',
    scale: 'Skala 1:11.000',
  },
];

export default function StaticMapGallery() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [selectedMap, setSelectedMap] = useState<StaticMap | null>(null);
  const [selectedDescMap, setSelectedDescMap] = useState<StaticMap | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [descModalOpen, setDescModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mencegah background scroll saat modal terbuka, dan mengaktifkan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (descModalOpen) {
          setDescModalOpen(false);
        } else if (isFullScreen) {
          setIsFullScreen(false);
        } else {
          setSelectedMap(null);
        }
      }
    };

    if (selectedMap || descModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
      setIsFullScreen(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMap, isFullScreen, descModalOpen]);

  return (
    <div>
      {/* 6-Column Grid Layout:
          Baris Atas (Peta 1 & 2): Masing-masing berukuran 3 dari 6 kolom (= persis 50% - 50% Sama Besar!).
          Baris Bawah (Peta 3, 4, & 5): Masing-masing berukuran 2 dari 6 kolom (= persis 33% - 33% - 33% Sama Rata!). */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 items-stretch">
        {DUMMY_MAPS.map((map, idx) => {
          const isTopRow = idx === 0 || idx === 1; // 2 Peta Utama di atas (Sama Besar)

          return (
            <div
              key={map.id}
              className={cn(
                'group bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-[0_12px_35px_rgba(22,163,74,0.14)] hover:border-primary-300 transition-[transform,box-shadow,border-color] duration-200 transform-gpu hover:-translate-y-1 cursor-pointer flex flex-col',
                isTopRow ? 'lg:col-span-3' : 'lg:col-span-2',
                idx === 4 && 'md:col-span-2 lg:col-span-2' // Di tablet berada di bawah tengah secara rapi
              )}
              onClick={() => {
                setSelectedMap(map);
                setIsFullScreen(false);
              }}
            >
              <div className={cn(
                'relative w-full overflow-hidden bg-neutral-100',
                isTopRow ? 'aspect-[16/10]' : 'aspect-[4/3]' // Proporsi identik untuk pasangan baris
              )}>
                <Image
                  src={map.thumbnailUrl}
                  alt={map.title}
                  fill
                  unoptimized={true} // Anti-Timeout dan Lancar Sekejab
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                />
                
                {/* Category & Scale Badges overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                  <span className="px-3 py-1 bg-neutral-900/85 text-white text-xs font-bold rounded-full shadow-sm border border-white/10">
                    {map.category}
                  </span>
                  {map.scale && (
                    <span className="px-2.5 py-1 bg-white/95 text-neutral-700 text-xs font-semibold rounded-full shadow-sm hidden sm:inline-block">
                      {map.scale}
                    </span>
                  )}
                </div>

                {/* Dark Hover Overlay & Mobile Touch Prompt */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <div className="bg-white/95 text-neutral-900 px-5 py-2 rounded-full font-bold text-xs sm:text-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Klik untuk Buka & Lihat Peta</span>
                  </div>
                </div>
              </div>

              {/* Card Content & Description */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-extrabold text-lg sm:text-xl text-neutral-900 group-hover:text-primary-700 transition-colors leading-snug">
                      {map.title}
                    </h3>
                    <span className="shrink-0 text-xs font-semibold text-primary-700 bg-primary-50 border border-primary-200/60 px-2.5 py-1 rounded-lg">
                      {map.dateStr}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed mb-4 font-normal">
                    {map.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-neutral-150 flex items-center justify-between text-xs font-bold text-neutral-500 group-hover:text-primary-600 transition-colors">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Lihat Peta & Deskripsi Lengkap
                  </span>
                  <div className="flex items-center gap-2">
                    {(map.detailsTitle || map.detailsDescription || map.detailsData) && (
                      <button
                        id={`btn-baca-deskripsi-${map.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDescMap(map);
                          setDescModalOpen(true);
                        }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-50 hover:bg-primary-100 text-primary-700 hover:text-primary-800 border border-primary-200 transition-colors text-[11px] font-bold cursor-pointer"
                        title="Baca deskripsi lengkap peta ini"
                      >
                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                        Baca Deskripsi
                      </button>
                    )}
                    <svg className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* REACT PORTAL LEVEL 1 & 2:
          Menggunakan createPortal ke document.body melepaskan modal dari jebakan stacking context,
          menjamin modal benar-benar berada DI ATAS HEADER WEB (0% kepotong di atas dan bebas scroll)! */}
      {mounted && typeof document !== 'undefined' && selectedMap && !isFullScreen && createPortal(
        <div 
          className="fixed inset-0 z-[100000] bg-neutral-950/90 overflow-y-auto block w-full h-full p-4 sm:p-6 md:p-10 animate-fade-in"
          onClick={() => setSelectedMap(null)} // Klik background kosong tutup modal
        >
          {/* Tombol Tutup Melayang di Pojok Kanan Atas Layar Utama */}
          <button
            onClick={() => setSelectedMap(null)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100010] bg-red-600 hover:bg-red-700 text-white font-extrabold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-2xl border border-red-500 transition-transform active:scale-95 flex items-center gap-2 text-xs sm:text-sm cursor-pointer touch-target"
            title="Tutup Jendela"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Tutup</span>
          </button>

          {/* Wadah Penjajaran dengan items-start agar TIDAK PERNAH KEPOTONG DI ATAS & mudah digulir */}
          <div className="flex min-h-full w-full items-start justify-center py-6 sm:py-10">
            <div 
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] border border-neutral-200 my-auto flex flex-col"
              onClick={(e) => e.stopPropagation()} // Klik di dalam kotak tidak menutup modal
            >
              {/* Header Mini di Atas Kotak */}
              <div className="bg-neutral-900 text-white px-5 sm:px-6 py-3.5 flex items-center justify-between border-b border-neutral-800 shadow-md">
                <span className="text-xs sm:text-sm font-extrabold truncate pr-4 text-primary-400">
                  {selectedMap.category} • {selectedMap.title}
                </span>
                <span className="text-[11px] font-bold bg-neutral-800 px-2.5 py-1 rounded-lg text-neutral-300">
                  {selectedMap.scale || 'Resolusi Tinggi'}
                </span>
              </div>

              {/* Gambar Peta - Klik untuk Membuka Mode Layar Penuh (Full Screen) */}
              <div 
                className="relative w-full bg-neutral-950 flex flex-col items-center justify-center cursor-zoom-in group overflow-hidden"
                onClick={() => setIsFullScreen(true)}
                title="Klik gambar untuk perbesar penuh (Full Screen)"
              >
                <div className="relative w-full max-h-[50vh] flex items-center justify-center overflow-hidden bg-neutral-900">
                  <Image
                    src={selectedMap.detailsImageUrl ?? selectedMap.highResUrl}
                    alt={selectedMap.detailsTitle ?? selectedMap.title}
                    width={1600}
                    height={1000}
                    unoptimized={true} // Anti-Timeout 500 dan Anti-Gambar Hitam
                    className="w-full h-auto max-h-[50vh] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Tag Petunjuk Buka Layar Penuh di atas foto */}
                <div className="w-full bg-neutral-900 text-neutral-300 py-3 px-4 text-center border-t border-neutral-800 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-colors group-hover:bg-primary-600 group-hover:text-white">
                  <svg className="w-4 h-4 shrink-0 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>Klik pada foto ini untuk membuka Layar Penuh (Full Screen Maps)</span>
                </div>
              </div>

              {/* Deskripsi Peta & Unduhan */}
              <div className="p-6 sm:p-8 bg-white border-t border-neutral-200">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 text-xs font-bold rounded-lg border border-primary-200/60">
                    {selectedMap.category}
                  </span>
                  {selectedMap.scale && (
                    <span className="px-3 py-1 bg-neutral-100 text-neutral-800 text-xs font-extrabold rounded-lg border border-neutral-200/80">
                      {selectedMap.scale}
                    </span>
                  )}
                  <span className="text-xs text-neutral-400 font-semibold">• {selectedMap.dateStr}</span>
                </div>
                <h3 className="font-extrabold text-xl sm:text-2xl text-neutral-900 tracking-tight mb-3">
                  {selectedMap.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal mb-6">
                  {selectedMap.description}
                </p>

                {/* Tombol Aksi Bawah */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-5 border-t border-neutral-200">
                  <button
                    onClick={() => setSelectedMap(null)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-extrabold rounded-2xl transition-colors flex items-center justify-center gap-2 border border-neutral-300 touch-target"
                  >
                    <svg className="w-4 h-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Tutup Peta</span>
                  </button>

                  <button
                    onClick={() => setIsFullScreen(true)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-extrabold rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-md touch-target"
                  >
                    <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span>Buka Layar Penuh (Full Screen)</span>
                  </button>

                  <a
                    href={selectedMap.downloadUrl}
                    download
                    className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white text-xs sm:text-sm font-extrabold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg touch-target"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Unduh Resolusi Tinggi</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* REACT PORTAL LEVEL 2: Mode Layar Penuh (Full Screen Lightbox) yang Diterbangkan Langsung ke document.body */}
      {mounted && typeof document !== 'undefined' && selectedMap && isFullScreen && createPortal(
        <div 
          className="fixed inset-0 z-[100000] bg-neutral-950/98 flex flex-col items-center justify-center p-2 sm:p-6 overflow-auto animate-fade-in"
          onClick={() => setIsFullScreen(false)} // Klik latar gelap otomatis kembali ke deskripsi
        >
          {/* BAR NAVIGASI TUTUP DI ATAS - Ditelengpakan dari Atasan Apapun & Nyala Terang! */}
          <div className="fixed top-0 left-0 right-0 z-[100020] bg-gradient-to-b from-black/95 via-black/80 to-transparent px-4 py-3 sm:px-8 sm:py-5 flex items-center justify-between pointer-events-none">
            <span className="text-white font-extrabold text-xs sm:text-base drop-shadow-md tracking-tight pointer-events-auto bg-neutral-900/95 px-4 py-2 rounded-2xl border border-white/20 shadow-2xl">
              {selectedMap.title} (Mode Full Screen)
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullScreen(false);
              }}
              className="pointer-events-auto bg-red-600 hover:bg-red-500 text-white font-extrabold px-5 py-3 rounded-2xl shadow-[0_10px_35px_rgba(220,38,38,0.8)] border-2 border-white/30 transition-transform active:scale-95 flex items-center gap-2 text-xs sm:text-sm cursor-pointer touch-target"
              title="Kembali ke Jendela Deskripsi"
            >
              <svg className="w-5 h-5 font-extrabold text-white shrink-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="tracking-wide font-extrabold">KEMBALI / TUTUP LAYAR PENUH</span>
            </button>
          </div>

          {/* Wadah Gambar Full Screen - Nyaman untuk Pinch to Zoom Alami di HP atau Double Klik di Desktop */}
          <div 
            className="relative w-full h-full min-h-[90vh] flex items-center justify-center p-1 sm:p-8 mt-12 sm:mt-8"
            onClick={(e) => e.stopPropagation()} // Klik di dalam foto tidak menutup agar bebas pinch/zoom
          >
            <Image
              src={selectedMap.highResUrl}
              alt={selectedMap.title}
              width={2000}
              height={1400}
              unoptimized={true}
              className="w-auto h-auto max-w-full max-h-[88vh] object-contain rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.9)] cursor-pointer"
              title="Pinch atau double tap untuk zoom mandiri"
            />
          </div>
        </div>,
        document.body
      )}
      {/* REACT PORTAL: Modal Deskripsi Lengkap Peta Pertama */}
      {mounted && typeof document !== 'undefined' && descModalOpen && createPortal(
        <div
          className="fixed inset-0 z-[100000] bg-neutral-950/80 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
          onClick={() => {
            setDescModalOpen(false);
            setSelectedDescMap(null);
          }}
        >
          {/* Kotak Modal */}
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.7)] border border-neutral-200 flex flex-col max-h-[88vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="bg-neutral-900 text-white px-5 sm:px-7 py-4 flex items-center justify-between gap-3 rounded-t-3xl shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-5 h-5 text-primary-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <span className="text-xs sm:text-sm font-extrabold text-primary-400 truncate">Deskripsi Peta</span>
              </div>
              {/* Tombol X Tutup */}
              <button
                id="btn-tutup-modal-deskripsi-x"
                onClick={() => {
                  setDescModalOpen(false);
                  setSelectedDescMap(null);
                }}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-700 hover:bg-red-600 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Tutup"
                aria-label="Tutup modal deskripsi"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Isi Modal – Scrollable */}
            <div className="overflow-y-auto flex-1 px-6 sm:px-8 py-6">
              <h2 className="font-extrabold text-xl sm:text-2xl text-neutral-900 tracking-tight mb-5 leading-snug">
                {selectedDescMap?.detailsTitle ?? selectedDescMap?.title}
              </h2>

              {selectedDescMap?.detailsImageUrl && (
                <div className="relative w-full max-h-[50vh] mb-6 overflow-hidden rounded-3xl bg-neutral-100">
                  <Image
                    src={selectedDescMap.detailsImageUrl}
                    alt={selectedDescMap.detailsTitle ?? selectedDescMap.title}
                    width={1600}
                    height={1000}
                    unoptimized={true}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}

              {/* Paragraf deskripsi */}
              {selectedDescMap?.detailsDescription?.length ? (
                <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal mb-6">
                  {selectedDescMap.detailsDescription.map((par, i) => (
                    <p key={i}>{par}</p>
                  ))}
                </div>
              ) : null}

              {/* Daftar usaha per dusun */}
              {selectedDescMap?.detailsData ? (
                <div className="space-y-6">
                  {selectedDescMap.detailsData.map((dusun) => (
                    <div key={dusun.namaDusun} className="border border-neutral-200 rounded-2xl overflow-hidden">
                      {/* Header Dusun */}
                      <div className="bg-primary-700 text-white px-4 py-2.5 flex items-center justify-between">
                        <span className="font-extrabold text-sm sm:text-base tracking-tight">
                          {dusun.namaDusun}
                        </span>
                        <span className="text-xs font-semibold bg-primary-600/70 border border-primary-400/40 px-2.5 py-0.5 rounded-full">
                          RT {dusun.rt} / RW {dusun.rw}
                        </span>
                      </div>
                      {/* Tabel usaha */}
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-primary-50 border-b border-neutral-200">
                            <th className="text-left px-4 py-2 font-bold text-neutral-600 w-8 text-xs">#</th>
                            <th className="text-left px-4 py-2 font-bold text-neutral-600 text-xs">Nama</th>
                            <th className="text-left px-4 py-2 font-bold text-neutral-600 text-xs">Jenis Usaha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dusun.daftarUsaha.map((u, i) => (
                            <tr
                              key={i}
                              className={cn(
                                'border-b border-neutral-100 last:border-0',
                                i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                              )}
                            >
                              <td className="px-4 py-2 text-neutral-400 text-xs font-semibold">{i + 1}</td>
                              <td className="px-4 py-2 text-neutral-800 font-semibold text-xs sm:text-sm">{u.nama}</td>
                              <td className="px-4 py-2 text-neutral-600 text-xs sm:text-sm">{u.usaha}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            {/* Footer Modal – Tombol Tutup */}
            <div className="px-6 sm:px-8 py-4 border-t border-neutral-200 bg-neutral-50 rounded-b-3xl shrink-0 flex justify-end">
              <button
                id="btn-tutup-modal-deskripsi"
                onClick={() => {
                  setDescModalOpen(false);
                  setSelectedDescMap(null);
                }}
                className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-extrabold rounded-2xl transition-colors flex items-center gap-2 border border-neutral-300 cursor-pointer"
              >
                <svg className="w-4 h-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Tutup</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
