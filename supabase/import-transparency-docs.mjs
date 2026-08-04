import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nzpkqxxryjgoqfedycam.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56cGtxeHhyeWpnb3FmZWR5Y2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNDA2MDMsImV4cCI6MjA5NzYxNjYwM30.KFMkVK-pjDgNEp7PYp0L-PNGFe9NvqDwyCImo9IMHA0';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const DOCUMENTS = [
  // TAHUN 2024
  {
    title: 'Laporan Pertanggungjawaban Realisasi APBDes Tahun Anggaran 2024',
    doc_type: 'lpj',
    fiscal_year: 2024,
    file_url: '/dokumen/2024/LPJ Realisasi APBDes 2024.pdf',
    description: 'Dokumen laporan pertanggungjawaban realisasi APBDes Desa Surorejo Tahun Anggaran 2024 yang memuat realisasi pendapatan, belanja, dan pembiayaan desa.'
  },
  {
    title: 'Laporan Penyelenggaraan Pemerintahan Desa (LPPD) Akhir Tahun Anggaran 2024',
    doc_type: 'lainnya',
    fiscal_year: 2024,
    file_url: '/dokumen/2024/LPPD 2024.pdf',
    description: 'Dokumen Laporan Penyelenggaraan Pemerintahan Desa (LPPD) Akhir Tahun Anggaran 2024 yang memuat pelaksanaan penyelenggaraan pemerintahan desa selama satu tahun.'
  },
  
  // TAHUN 2025
  {
    title: 'Anggaran Pendapatan dan Belanja Desa (APBDes) Tahun Anggaran 2025',
    doc_type: 'apbdes',
    fiscal_year: 2025,
    file_url: '/dokumen/2025/APBDes 2025.pdf',
    description: 'Dokumen Anggaran Pendapatan dan Belanja Desa (APBDes) Desa Surorejo Tahun Anggaran 2025 sebagai pedoman pelaksanaan kegiatan dan penggunaan anggaran desa.'
  },
  {
    title: 'Laporan Pertanggungjawaban Realisasi APBDes Tahun Anggaran 2025',
    doc_type: 'realisasi',
    fiscal_year: 2025,
    file_url: '/dokumen/2025/LPJ Realisasi APBDes 2025.pdf',
    description: 'Dokumen laporan pertanggungjawaban realisasi APBDes Desa Surorejo Tahun Anggaran 2025 sebagai bentuk transparansi pengelolaan keuangan desa.'
  },
  {
    title: 'Laporan Penyelenggaraan Pemerintahan Desa (LPPD) Akhir Tahun Anggaran 2025',
    doc_type: 'lainnya',
    fiscal_year: 2025,
    file_url: '/dokumen/2025/LPPD 2025.pdf',
    description: 'Dokumen Laporan Penyelenggaraan Pemerintahan Desa (LPPD) Akhir Tahun Anggaran 2025 sebagai bentuk akuntabilitas penyelenggaraan pemerintahan desa.'
  },
  {
    title: 'Laporan Realisasi Anggaran Dana Desa (DD) Tahap 2 OMSPAN TA 2025',
    doc_type: 'realisasi',
    fiscal_year: 2025,
    file_url: '/dokumen/2025/LRA DD Tahap 2 OMSPAN 2025.pdf',
    description: 'Dokumen resmi Laporan Realisasi Anggaran (LRA) penyaluran Dana Desa Tahap 2 melalui sistem OMSPAN (Online Monitoring Sistem Perbendaharaan dan Anggaran Negara) Kementerian Keuangan RI untuk Desa Surorejo Tahun Anggaran 2025.'
  },
  {
    title: 'Perubahan Rencana Kerja Pemerintah Desa (RKPDes) Tahun 2025',
    doc_type: 'lainnya',
    fiscal_year: 2025,
    file_url: '/dokumen/2025/Perubahan RKPDes 2025.pdf',
    description: 'Dokumen perubahan RKPDes Tahun 2025 yang memuat penyesuaian terhadap rencana kerja pemerintah desa selama satu tahun anggaran.'
  },
  {
    title: 'Rencana Kerja Pemerintah Desa (RKPDes) Tahun 2025',
    doc_type: 'lainnya',
    fiscal_year: 2025,
    file_url: '/dokumen/2025/RKPDes 2025.pdf',
    description: 'Dokumen Rencana Kerja Pemerintah Desa (RKPDes) Desa Surorejo Tahun 2025 yang memuat rencana pembangunan desa selama satu tahun anggaran.'
  },

  // TAHUN 2026
  {
    title: 'Infografis Dashboard Transparansi APBDes Tahun Anggaran 2026',
    doc_type: 'infografis',
    fiscal_year: 2026,
    file_url: encodeURI('/Dashboard Transparansi APBDes Desa Surorejo.png'),
    description: 'Visualisasi resmi dan ringkasan APBDes Surorejo TA 2026. Menampilkan Pendapatan Desa Rp880.767.500, Belanja Desa Rp887.203.546, Pembiayaan Netto Rp6.436.046, serta komitmen tata kelola yang transparan, akuntabel, dan partisipatif.'
  },
  {
    title: 'Anggaran Pendapatan dan Belanja Desa (APBDes) Tahun Anggaran 2026',
    doc_type: 'apbdes',
    fiscal_year: 2026,
    file_url: '/dokumen/2026/APBDes Surorejo 2026.pdf',
    description: 'Dokumen Anggaran Pendapatan dan Belanja Desa (APBDes) Desa Surorejo Tahun Anggaran 2026 yang menjadi dasar pelaksanaan pembangunan dan pelayanan kepada masyarakat.'
  },
  {
    title: 'Laporan Realisasi Anggaran (LRA) APBDes Semester I TA 2026',
    doc_type: 'realisasi',
    fiscal_year: 2026,
    file_url: '/dokumen/2026/LRA APBDes Semester I 2026.pdf',
    description: 'Laporan Realisasi Anggaran Pendapatan dan Belanja Desa (APBDes) Surorejo untuk periode Semester I (Januari - Juni) Tahun Anggaran 2026 sebagai perwujudan akuntabilitas dan pengawasan publik.'
  },
  {
    title: 'Peraturan Kepala Desa Surorejo: Penjabaran APBDes TA 2026',
    doc_type: 'apbdes',
    fiscal_year: 2026,
    file_url: '/dokumen/2026/Penjabaran APBDes 2026.pdf',
    description: 'Dokumen Penjabaran Anggaran Pendapatan dan Belanja Desa Surorejo Tahun Anggaran 2026. Memuat rincian teknis pos pendapatan, alokasi per bidang kegiatan belanja desa, serta struktur pembiayaan.'
  },
  {
    title: 'Peraturan Desa: Penyertaan Modal Desa pada BUMDes Surorejo TA 2026',
    doc_type: 'lainnya',
    fiscal_year: 2026,
    file_url: '/dokumen/2026/Penyertaan Modal pada BUMDes 2026.pdf',
    description: 'Dokumen regulasi dan penetapan alokasi anggaran Penyertaan Modal Pemerintah Desa Surorejo kepada Badan Usaha Milik Desa (BUMDes) Tahun Anggaran 2026 guna memperkuat perekonomian desa.'
  },
  {
    title: 'Peraturan Desa Surorejo No. 7 Tahun 2025 (RKPDes Tahun 2026)',
    doc_type: 'rkpdes',
    fiscal_year: 2026,
    file_url: '/dokumen/2026/RKPDes 2026.pdf',
    description: 'Dokumen resmi Rencana Kerja Pemerintah Desa (RKPDes) Surorejo Tahun 2026 mencakup prioritas pembangunan jalan dusun, internet desa, penanganan stunting, dan anggaran kerja.'
  },
  {
    title: 'Rincian Pemetaan dan Optimalisasi Sumber PADes TA 2026',
    doc_type: 'apbdes',
    fiscal_year: 2026,
    file_url: '/dokumen/2026/Sumber PADes 2026.pdf',
    description: 'Dokumen analisis dan rancangan penerimaan Pendapatan Asli Desa (PADes) Surorejo Tahun Anggaran 2026, mencakup hasil usaha desa, hasil aset desa, swadaya, partisipasi, dan gotong royong masyarakat.'
  }
];

async function importDocs() {
  console.log('Mengambil dokumen existing dari database...');
  const { data: existing, error } = await supabase
    .from('transparency_doc')
    .select('*');

  if (error) {
    console.error('Error fetching existing docs:', error);
    process.exit(1);
  }

  console.log(`Ditemukan ${existing.length} dokumen existing.`);

  let added = 0;
  let updated = 0;

  for (const doc of DOCUMENTS) {
    const match = existing.find(e => 
      e.title.trim().toLowerCase() === doc.title.trim().toLowerCase() ||
      (e.fiscal_year === doc.fiscal_year && e.title.includes('OMSPAN') && doc.title.includes('OMSPAN')) ||
      (e.fiscal_year === doc.fiscal_year && e.title.includes('Semester I') && doc.title.includes('Semester I')) ||
      (e.fiscal_year === doc.fiscal_year && e.title.includes('BUMDes') && doc.title.includes('BUMDes')) ||
      (e.fiscal_year === doc.fiscal_year && e.title.includes('PADes') && doc.title.includes('PADes')) ||
      (e.fiscal_year === doc.fiscal_year && e.title.includes('Penjabaran') && doc.title.includes('Penjabaran')) ||
      (e.fiscal_year === doc.fiscal_year && e.title.includes('Infografis Dashboard') && doc.title.includes('Infografis')) ||
      (e.fiscal_year === doc.fiscal_year && e.title.includes('RKPDes') && doc.title.includes('RKPDes') && !doc.title.includes('Perubahan'))
    );

    if (match) {
      const { error: updErr } = await supabase
        .from('transparency_doc')
        .update({
          title: doc.title,
          doc_type: doc.doc_type,
          file_url: doc.file_url,
          description: doc.description
        })
        .eq('id', match.id);

      if (updErr) {
        console.error(`Gagal mengupdate ${doc.title}:`, updErr.message);
      } else {
        console.log(`✅ Diperbarui (Update): [${doc.fiscal_year}] ${doc.title}`);
        updated++;
      }
    } else {
      const { error: insErr } = await supabase
        .from('transparency_doc')
        .insert(doc);

      if (insErr) {
        console.error(`Gagal menambahkan ${doc.title}:`, insErr.message);
      } else {
        console.log(`✨ Diberlakukan Baru (Insert): [${doc.fiscal_year}] ${doc.title}`);
        added++;
      }
    }
  }

  console.log(`\nSelesai! Ditambahkan: ${added} baru, Diperbarui: ${updated} dokumen.`);
}

importDocs().catch(console.error);
