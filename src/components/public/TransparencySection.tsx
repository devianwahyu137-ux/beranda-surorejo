'use client';

import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

interface TransparencyDoc {
  id: string;
  title: string;
  doc_type: string;
  fiscal_year: number;
  file_url: string;
  description?: string;
  created_at: string;
}

const DOC_TYPE_LABELS: Record<string, string> = {
  rkpdes: 'RKPDes',
  apbdes: 'APBDes',
  rab: 'RAB Desa',
  realisasi: 'Realisasi APBDes',
  lpj: 'LPJ Keuangan',
  infografis: 'Infografis Keuangan',
  lainnya: 'Dokumen Lainnya',
};

const DOC_TYPE_COLORS: Record<string, string> = {
  rkpdes: 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300',
  apbdes: 'bg-blue-100 text-blue-700',
  rab: 'bg-emerald-100 text-emerald-700',
  realisasi: 'bg-amber-100 text-amber-700',
  lpj: 'bg-purple-100 text-purple-700',
  infografis: 'bg-indigo-100 text-indigo-800 font-bold border border-indigo-300',
  lainnya: 'bg-neutral-100 text-neutral-700',
};

const DEFAULT_TRANSPARENCY_DOCS: TransparencyDoc[] = [
  // TAHUN 2026
  {
    id: 'infografis-2026-public',
    title: 'Infografis Dashboard Transparansi APBDes Tahun Anggaran 2026',
    doc_type: 'infografis',
    fiscal_year: 2026,
    file_url: encodeURI('/Dashboard Transparansi APBDes Desa Surorejo.png'),
    description: 'Visualisasi resmi dan ringkasan APBDes Surorejo TA 2026. Menampilkan Pendapatan Desa Rp880.767.500, Belanja Desa Rp887.203.546, Pembiayaan Netto Rp6.436.046, serta komitmen tata kelola yang transparan, akuntabel, dan partisipatif.',
    created_at: '2026-01-10T00:00:00Z'
  },
  {
    id: 'apbdes-2026-public',
    title: 'Anggaran Pendapatan dan Belanja Desa (APBDes) Tahun Anggaran 2026',
    doc_type: 'apbdes',
    fiscal_year: 2026,
    file_url: '/dokumen/2026/APBDes Surorejo 2026.pdf',
    description: 'Dokumen Anggaran Pendapatan dan Belanja Desa (APBDes) Desa Surorejo Tahun Anggaran 2026 yang menjadi dasar pelaksanaan pembangunan dan pelayanan kepada masyarakat.',
    created_at: '2026-01-08T00:00:00Z'
  },
  {
    id: 'lra-2026-sem1-public',
    title: 'Laporan Realisasi Anggaran (LRA) APBDes Semester I TA 2026',
    doc_type: 'realisasi',
    fiscal_year: 2026,
    file_url: '/dokumen/2026/LRA APBDes Semester I 2026.pdf',
    description: 'Laporan Realisasi Anggaran Pendapatan dan Belanja Desa (APBDes) Surorejo untuk periode Semester I (Januari - Juni) Tahun Anggaran 2026 sebagai perwujudan akuntabilitas dan pengawasan publik.',
    created_at: '2026-07-01T00:00:00Z'
  },
  {
    id: 'penjabaran-2026-public',
    title: 'Peraturan Kepala Desa Surorejo: Penjabaran APBDes TA 2026',
    doc_type: 'apbdes',
    fiscal_year: 2026,
    file_url: '/dokumen/2026/Penjabaran APBDes 2026.pdf',
    description: 'Dokumen Penjabaran Anggaran Pendapatan dan Belanja Desa Surorejo Tahun Anggaran 2026. Memuat rincian teknis pos pendapatan, alokasi per bidang kegiatan belanja desa, serta struktur pembiayaan.',
    created_at: '2026-01-05T00:00:00Z'
  },
  {
    id: 'bumdes-2026-public',
    title: 'Peraturan Desa: Penyertaan Modal Desa pada BUMDes Surorejo TA 2026',
    doc_type: 'lainnya',
    fiscal_year: 2026,
    file_url: '/dokumen/2026/Penyertaan Modal pada BUMDes 2026.pdf',
    description: 'Dokumen regulasi dan penetapan alokasi anggaran Penyertaan Modal Pemerintah Desa Surorejo kepada Badan Usaha Milik Desa (BUMDes) Tahun Anggaran 2026 guna memperkuat perekonomian desa.',
    created_at: '2026-02-01T00:00:00Z'
  },
  {
    id: 'rkpdes-2026-public',
    title: 'Peraturan Desa Surorejo No. 7 Tahun 2025 (RKPDes Tahun 2026)',
    doc_type: 'rkpdes',
    fiscal_year: 2026,
    file_url: '/dokumen/2026/RKPDes 2026.pdf',
    description: 'Dokumen resmi Rencana Kerja Pemerintah Desa (RKPDes) Surorejo Tahun 2026 mencakup prioritas pembangunan jalan dusun, internet desa, penanganan stunting, dan anggaran kerja.',
    created_at: '2025-09-29T00:00:00Z'
  },
  {
    id: 'pades-2026-public',
    title: 'Rincian Pemetaan dan Optimalisasi Sumber PADes TA 2026',
    doc_type: 'apbdes',
    fiscal_year: 2026,
    file_url: '/dokumen/2026/Sumber PADes 2026.pdf',
    description: 'Dokumen analisis dan rancangan penerimaan Pendapatan Asli Desa (PADes) Surorejo Tahun Anggaran 2026, mencakup hasil usaha desa, hasil aset desa, swadaya, partisipasi, dan gotong royong masyarakat.',
    created_at: '2026-01-02T00:00:00Z'
  },

  // TAHUN 2025
  {
    id: 'apbdes-2025-public',
    title: 'Anggaran Pendapatan dan Belanja Desa (APBDes) Tahun Anggaran 2025',
    doc_type: 'apbdes',
    fiscal_year: 2025,
    file_url: '/dokumen/2025/APBDes 2025.pdf',
    description: 'Dokumen Anggaran Pendapatan dan Belanja Desa (APBDes) Desa Surorejo Tahun Anggaran 2025 sebagai pedoman pelaksanaan kegiatan dan penggunaan anggaran desa.',
    created_at: '2025-01-01T00:00:00Z'
  },
  {
    id: 'lpj-2025-public',
    title: 'Laporan Pertanggungjawaban Realisasi APBDes Tahun Anggaran 2025',
    doc_type: 'realisasi',
    fiscal_year: 2025,
    file_url: '/dokumen/2025/LPJ Realisasi APBDes 2025.pdf',
    description: 'Dokumen laporan pertanggungjawaban realisasi APBDes Desa Surorejo Tahun Anggaran 2025 sebagai bentuk transparansi pengelolaan keuangan desa.',
    created_at: '2025-12-31T00:00:00Z'
  },
  {
    id: 'lppd-2025-public',
    title: 'Laporan Penyelenggaraan Pemerintahan Desa (LPPD) Akhir Tahun Anggaran 2025',
    doc_type: 'lainnya',
    fiscal_year: 2025,
    file_url: '/dokumen/2025/LPPD 2025.pdf',
    description: 'Dokumen Laporan Penyelenggaraan Pemerintahan Desa (LPPD) Akhir Tahun Anggaran 2025 sebagai bentuk akuntabilitas penyelenggaraan pemerintahan desa.',
    created_at: '2025-12-30T00:00:00Z'
  },
  {
    id: 'omspan-2025-public',
    title: 'Laporan Realisasi Anggaran Dana Desa (DD) Tahap 2 OMSPAN TA 2025',
    doc_type: 'realisasi',
    fiscal_year: 2025,
    file_url: '/dokumen/2025/LRA DD Tahap 2 OMSPAN 2025.pdf',
    description: 'Dokumen resmi Laporan Realisasi Anggaran (LRA) penyaluran Dana Desa Tahap 2 melalui sistem OMSPAN (Online Monitoring Sistem Perbendaharaan dan Anggaran Negara) Kementerian Keuangan RI untuk Desa Surorejo Tahun Anggaran 2025.',
    created_at: '2025-08-15T00:00:00Z'
  },
  {
    id: 'perubahan-rkpdes-2025-public',
    title: 'Perubahan Rencana Kerja Pemerintah Desa (RKPDes) Tahun 2025',
    doc_type: 'lainnya',
    fiscal_year: 2025,
    file_url: '/dokumen/2025/Perubahan RKPDes 2025.pdf',
    description: 'Dokumen perubahan RKPDes Tahun 2025 yang memuat penyesuaian terhadap rencana kerja pemerintah desa selama satu tahun anggaran.',
    created_at: '2025-07-01T00:00:00Z'
  },
  {
    id: 'rkpdes-2025-public',
    title: 'Rencana Kerja Pemerintah Desa (RKPDes) Tahun 2025',
    doc_type: 'lainnya',
    fiscal_year: 2025,
    file_url: '/dokumen/2025/RKPDes 2025.pdf',
    description: 'Dokumen Rencana Kerja Pemerintah Desa (RKPDes) Desa Surorejo Tahun 2025 yang memuat rencana pembangunan desa selama satu tahun anggaran.',
    created_at: '2024-09-30T00:00:00Z'
  },

  // TAHUN 2024
  {
    id: 'lpj-2024-public',
    title: 'Laporan Pertanggungjawaban Realisasi APBDes Tahun Anggaran 2024',
    doc_type: 'lpj',
    fiscal_year: 2024,
    file_url: '/dokumen/2024/LPJ Realisasi APBDes 2024.pdf',
    description: 'Dokumen laporan pertanggungjawaban realisasi APBDes Desa Surorejo Tahun Anggaran 2024 yang memuat realisasi pendapatan, belanja, dan pembiayaan desa.',
    created_at: '2024-12-31T00:00:00Z'
  },
  {
    id: 'lppd-2024-public',
    title: 'Laporan Penyelenggaraan Pemerintahan Desa (LPPD) Akhir Tahun Anggaran 2024',
    doc_type: 'lainnya',
    fiscal_year: 2024,
    file_url: '/dokumen/2024/LPPD 2024.pdf',
    description: 'Dokumen Laporan Penyelenggaraan Pemerintahan Desa (LPPD) Akhir Tahun Anggaran 2024 yang memuat pelaksanaan penyelenggaraan pemerintahan desa selama satu tahun.',
    created_at: '2024-12-30T00:00:00Z'
  }
];

export default function TransparencySection() {
  const [docs, setDocs] = useState<TransparencyDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/transparency')
      .then(res => res.json())
      .then(data => {
        const dbList: TransparencyDoc[] = Array.isArray(data) ? data : [];
        const merged = [...dbList];

        DEFAULT_TRANSPARENCY_DOCS.forEach(defaultDoc => {
          const isExisting = dbList.some(d => 
            d.title.trim().toLowerCase() === defaultDoc.title.trim().toLowerCase() ||
            (d.fiscal_year === defaultDoc.fiscal_year && d.title.toLowerCase().includes('omspan') && defaultDoc.title.toLowerCase().includes('omspan')) ||
            (d.fiscal_year === defaultDoc.fiscal_year && d.title.toLowerCase().includes('semester i') && defaultDoc.title.toLowerCase().includes('semester i')) ||
            (d.fiscal_year === defaultDoc.fiscal_year && d.title.toLowerCase().includes('bumdes') && defaultDoc.title.toLowerCase().includes('bumdes')) ||
            (d.fiscal_year === defaultDoc.fiscal_year && d.title.toLowerCase().includes('pades') && defaultDoc.title.toLowerCase().includes('pades')) ||
            (d.fiscal_year === defaultDoc.fiscal_year && d.title.toLowerCase().includes('penjabaran') && defaultDoc.title.toLowerCase().includes('penjabaran')) ||
            (d.fiscal_year === defaultDoc.fiscal_year && d.title.toLowerCase().includes('infografis') && defaultDoc.title.toLowerCase().includes('infografis')) ||
            (d.fiscal_year === defaultDoc.fiscal_year && d.title.toLowerCase().includes('rkpdes') && defaultDoc.title.toLowerCase().includes('rkpdes') && !defaultDoc.title.toLowerCase().includes('perubahan') && !d.title.toLowerCase().includes('perubahan'))
          );
          if (!isExisting) {
            merged.push(defaultDoc);
          }
        });

        merged.sort((a, b) => b.fiscal_year - a.fiscal_year || a.title.localeCompare(b.title));
        setDocs(merged);
        setLoading(false);
      })
      .catch(() => {
        setDocs([...DEFAULT_TRANSPARENCY_DOCS].sort((a, b) => b.fiscal_year - a.fiscal_year || a.title.localeCompare(b.title)));
        setLoading(false);
      });
  }, []);

  const years = [...new Set(docs.map(d => d.fiscal_year))].sort((a, b) => b - a);
  const filteredDocs = selectedYear ? docs.filter(d => d.fiscal_year === selectedYear) : docs;

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900">Transparansi Keuangan Desa</h3>
            <p className="text-sm text-neutral-500">Dokumen dan infografis keuangan desa yang terbuka dan dapat diunduh oleh masyarakat.</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Featured Infografis APBDes 2026 Banner */}
      <ScrollReveal>
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-emerald-700/50 relative overflow-hidden my-6">
          {/* Background decorative elements */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-10 -bottom-20 w-60 h-60 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text & Highlights (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-400 text-neutral-950 font-extrabold text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-950 animate-pulse" />
                  TA 2026 Terbaru
                </span>
                <span className="bg-emerald-700/90 text-emerald-100 font-semibold text-xs px-3 py-1 rounded-full border border-emerald-500/50 shadow-sm">
                  Infografis Resmi APBDes
                </span>
              </div>

              <div>
                <h4 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white">
                  Dashboard Transparansi APBDes Surorejo 2026
                </h4>
                <p className="mt-3 text-emerald-100/95 text-sm sm:text-base font-normal leading-relaxed italic border-l-3 border-amber-400 pl-3.5 bg-white/5 py-2 rounded-r-lg">
                  &ldquo;Mewujudkan Tata Kelola Keuangan Desa yang Transparan, Akuntabel, Efektif, dan Partisipatif.&rdquo;
                </p>
              </div>

              {/* Mini Dashboard Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 shadow-inner">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-200">Pendapatan Desa</div>
                  <div className="text-sm sm:text-base font-bold text-amber-300 mt-1 truncate">Rp 880,7 Jt</div>
                  <div className="text-[10px] text-white/70 mt-0.5 font-mono">Rp880.767.500</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 shadow-inner">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-200">Belanja Desa</div>
                  <div className="text-sm sm:text-base font-bold text-sky-300 mt-1 truncate">Rp 887,2 Jt</div>
                  <div className="text-[10px] text-white/70 mt-0.5 font-mono">Rp887.203.546</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 shadow-inner">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-200">Pembiayaan Netto</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-300 mt-1 truncate">Rp 6,4 Jt</div>
                  <div className="text-[10px] text-white/70 mt-0.5 font-mono">Rp6.436.046</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 shadow-inner">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-200">SILPA Berjalan</div>
                  <div className="text-sm sm:text-base font-bold text-amber-300 mt-1 truncate">Rp 1,6 Jt</div>
                  <div className="text-[10px] text-white/70 mt-0.5 font-mono">Rp1.600.000</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setPreviewImage(encodeURI('/Dashboard Transparansi APBDes Desa Surorejo.png'))}
                  className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-sm rounded-xl transition-all duration-200 shadow-lg hover:shadow-amber-400/25 flex items-center gap-2 transform active:scale-95"
                >
                  <svg className="w-5 h-5 text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Lihat Infografis Penuh
                </button>
                <a
                  href={encodeURI('/Dashboard Transparansi APBDes Desa Surorejo.png')}
                  download="Dashboard Transparansi APBDes Surorejo 2026.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-all duration-200 border border-white/25 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Unduh Gambar (PNG)
                </a>
              </div>
            </div>

            {/* Interactive Thumbnail (Right 5 Cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div 
                onClick={() => setPreviewImage(encodeURI('/Dashboard Transparansi APBDes Desa Surorejo.png'))}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl bg-neutral-950 transform transition-all duration-300 hover:scale-[1.02] hover:border-amber-400/80 max-w-sm sm:max-w-md w-full"
              >
                <img 
                  src={encodeURI('/Dashboard Transparansi APBDes Desa Surorejo.png')} 
                  alt="Dashboard Transparansi APBDes 2026"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 opacity-95 group-hover:opacity-100 block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="bg-neutral-900 text-amber-300 border border-amber-400/40 text-xs font-bold px-3.5 py-2 rounded-full flex items-center gap-2 shadow-xl">
                    <svg className="w-4 h-4 animate-bounce text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Klik untuk Memperbesar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Year Filter */}
      {years.length > 0 && (
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6">
            <div className="text-sm font-semibold text-neutral-600">
              Filter Tahun Anggaran:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedYear(null)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
                  selectedYear === null
                    ? 'bg-primary-600 text-white shadow-primary-600/30'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Semua Tahun
              </button>
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
                    selectedYear === year
                      ? 'bg-primary-600 text-white shadow-primary-600/30'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Document List */}
      {loading ? (
        <div className="py-12 text-center text-neutral-400 font-medium">Memuat dokumen transparansi...</div>
      ) : filteredDocs.length === 0 ? (
        <ScrollReveal>
          <div className="py-12 text-center bg-neutral-50 rounded-2xl border border-neutral-200">
            <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-neutral-500 font-medium">Belum ada dokumen transparansi yang dipublikasikan.</p>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredDocs.map((doc, idx) => {
            const isImage = doc.file_url.toLowerCase().endsWith('.png') || doc.file_url.toLowerCase().endsWith('.jpg') || doc.doc_type === 'infografis';
            return (
              <ScrollReveal key={doc.id} delay={Math.min(idx + 1, 4)}>
                <div className="bg-white border border-neutral-200 rounded-2xl p-5 card-hover group shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full ${DOC_TYPE_COLORS[doc.doc_type] || DOC_TYPE_COLORS['lainnya']}`}>
                          {DOC_TYPE_LABELS[doc.doc_type] || doc.doc_type}
                        </span>
                        <span className="text-xs text-neutral-400 font-bold">TA {doc.fiscal_year}</span>
                      </div>
                      <h4 
                        onClick={() => isImage ? setPreviewImage(doc.file_url) : null}
                        className={`font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2 ${isImage ? 'cursor-pointer' : ''}`}
                      >
                        {doc.title}
                      </h4>
                      {doc.description && (
                        <p className="text-xs sm:text-sm text-neutral-500 mt-1.5 line-clamp-3 leading-relaxed">{doc.description}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isImage && (
                        <button
                          onClick={() => setPreviewImage(doc.file_url)}
                          className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors shadow-sm"
                          title="Lihat Pratinjau Infografis"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      )}
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={isImage ? "Dashboard Transparansi APBDes Surorejo 2026.png" : undefined}
                        className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors shadow-sm"
                        title="Unduh Dokumen"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      )}

      {/* Lightbox / Fullscreen Image Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-opacity duration-300"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center justify-center bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-700/80 overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex justify-between items-center bg-neutral-900 text-white p-3.5 px-5 border-b border-neutral-700/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0 animate-pulse" />
                <span className="font-bold text-sm sm:text-base truncate">Dashboard Transparansi APBDes Surorejo TA 2026</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={previewImage}
                  download="Dashboard Transparansi APBDes Surorejo 2026.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Unduh PNG</span>
                </a>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="p-1.5 bg-neutral-800 hover:bg-red-600 text-neutral-300 hover:text-white rounded-lg transition-colors"
                  title="Tutup Modal"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Modal Image Content */}
            <div className="overflow-auto max-h-[82vh] w-full bg-neutral-950 flex justify-center p-3 sm:p-6">
              <img 
                src={previewImage} 
                alt="Dashboard Transparansi APBDes Surorejo 2026 Fullscreen" 
                className="w-full h-auto object-contain max-w-4xl rounded-xl shadow-2xl border border-neutral-800/50"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

