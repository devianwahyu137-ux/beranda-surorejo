import type { Metadata } from 'next';
import ScrollReveal from '@/components/public/ScrollReveal';

export const metadata: Metadata = {
  title: 'Pembangunan Desa | Desa Surorejo',
  description:
    'Rencana Pembangunan Jangka Menengah Desa (RPJM-Des), kebijakan, potensi, dan permasalahan Desa Surorejo.',
};

// ============================================================
// Data Statis — RPJM-Des Desa Surorejo
// ============================================================

const POTENSI = [
  {
    judul: 'Sumber Daya Alam',
    ikon: '🌾',
    warna: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
    isi: 'Lahan kosong, sungai, rawa, sawah, dan perkebunan yang pada saat ini belum dimanfaatkan secara maksimal.',
  },
  {
    judul: 'Sumber Daya Manusia',
    ikon: '👥',
    warna: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    isi: 'Tenaga kesehatan, kader pertanian, dan tersedianya SDM yang memadai dilihat dari tingkat pendidikan masyarakat.',
  },
  {
    judul: 'Sumber Daya Sosial',
    ikon: '🤝',
    warna: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50 border-violet-200',
    isi: 'Banyaknya lembaga kemasyarakatan seperti LPM, Gapoktan, Kelompok Pengajian, Arisan, Simpan Pinjam, Posyandu, Karang Taruna, dan Risma.',
  },
  {
    judul: 'Sumber Daya Ekonomi',
    ikon: '💰',
    warna: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50 border-amber-200',
    isi: 'Lahan-lahan pertanian, perkebunan, maupun peralatan kerja yang dapat mendukung perekonomian warga.',
  },
];

const MASALAH: { bidang: string; ikon: string; items: string[] }[] = [
  {
    bidang: 'Sarana Prasarana Fisik',
    ikon: '🏗️',
    items: [
      'Rendahnya tingkat kesadaran masyarakat dalam berswadaya dan pemeliharaan bangunan',
      'Lokasi pembangunan yang tidak merata sehingga menimbulkan kecemburuan sosial',
      'Pembangunan yang kurang berdasarkan pada skala prioritas',
      'Masih terbatasnya dana pembangunan desa yang dikelola desa',
    ],
  },
  {
    bidang: 'Ekonomi',
    ikon: '📊',
    items: [
      'Belum adanya pengembangan terhadap potensi ekonomi desa',
      'Belum adanya pemasukan dana secara maksimal',
      'Terbatasnya dana untuk modal',
      'Belum adanya pendidikan keterampilan bagi masyarakat',
    ],
  },
  {
    bidang: 'Sosial Budaya',
    ikon: '🎭',
    items: [
      'Pembangunan non fisik/moral yang masih terabaikan',
      'Belum optimalnya pengembangan budaya lokal desa',
    ],
  },
  {
    bidang: 'Pemerintahan',
    ikon: '🏛️',
    items: [
      'Terbatasnya SDM dalam pelaksanaan pemerintahan',
      'Pelaku pemerintahan belum jelas mengetahui tupoksi',
      'Pelayanan masyarakat yang masih bersifat sentralistik',
      'Sistem pemerintahan di tingkat RT belum optimal',
      'Buku administrasi belum dimanfaatkan secara optimal',
    ],
  },
  {
    bidang: 'Kesehatan',
    ikon: '🏥',
    items: [
      'Belum adanya tempat pelayanan kesehatan (PKD) yang memadai',
      'Pemanfaatan Posyandu yang belum optimal',
      'Kegiatan kader posyandu masih tergantung pada petugas kesehatan',
      'Belum terbentuk lembaga pelayanan kesehatan masyarakat',
    ],
  },
  {
    bidang: 'Kelembagaan',
    ikon: '📋',
    items: [
      'Masih rendahnya pemahaman tupoksi kelembagaan desa',
      'Tingkat pertemuan/rapat koordinasi yang masih kurang',
      'Belum tersusunnya rencana kegiatan/program kerja',
      'Buku pedoman tentang kelembagaan yang kurang',
    ],
  },
  {
    bidang: 'Lingkungan Hidup',
    ikon: '🌿',
    items: [
      'Masih rendahnya kesadaran masyarakat dalam pemeliharaan lingkungan',
      'Belum tersedianya tempat pembuangan sampah yang memadai',
      'Pemanfaatan air bersih oleh masyarakat belum optimal',
      'Pelestarian lingkungan hidup yang masih kurang',
    ],
  },
  {
    bidang: 'Partisipasi Masyarakat',
    ikon: '🙋',
    items: [
      'Partisipasi masyarakat dalam pertemuan masih kurang',
      'Kegiatan gotong royong yang masih kurang',
      'Masih rendahnya tingkat kesadaran masyarakat dalam kegiatan sosial',
    ],
  },
  {
    bidang: 'Pertanian',
    ikon: '🌱',
    items: [
      'Saluran irigasi yang belum tertata dengan baik',
      'Perkumpulan petani belum berjalan dengan baik',
      'Kekurangan air pada musim kemarau',
    ],
  },
  {
    bidang: 'Hukum',
    ikon: '⚖️',
    items: [
      'Masih dijumpai pelanggaran terhadap peraturan yang ada',
      'Penegakan hukum yang masih kurang',
    ],
  },
  {
    bidang: 'Perindustrian & Perdagangan',
    ikon: '🏭',
    items: [
      'Home industri yang belum dikembangkan',
      'Kesulitan dan penambahan modal',
    ],
  },
  {
    bidang: 'Pertanahan',
    ikon: '📐',
    items: [
      'Masih rendahnya kesadaran masyarakat dalam membuat hak milik/sertifikat',
      'Pemasangan tanda batas tanah yang kurang jelas',
    ],
  },
  {
    bidang: 'Keamanan',
    ikon: '🛡️',
    items: [
      'Kegiatan masyarakat dalam Siskamling belum optimal',
      'Rendahnya tingkat kesadaran masyarakat dalam mentaati aturan',
      'Kurangnya kebersamaan dalam penanganan permasalahan',
    ],
  },
];

const PROGRAM_BELANJA = [
  'Belanja Kepala Desa dan Perangkat Desa',
  'Insentif RT dan RW',
  'Operasional Lembaga Kemasyarakatan Desa',
  'Tunjangan Operasional BPD',
  'Program Operasional Pemerintahan Desa',
  'Program Pelayanan Dasar',
  'Program Pelayanan Dasar Infrastruktur',
  'Program Kebutuhan Primer Pangan',
  'Program Pelayanan Dasar Pendidikan',
  'Program Pelayanan Kesehatan',
  'Program Kebutuhan Primer Sandang',
  'Program Penyelenggaraan Pemerintahan Desa',
  'Program Pemberdayaan Masyarakat Desa',
  'Program Ekonomi Produktif',
  'Program Peningkatan Kapasitas Sumberdaya Aparatur Desa',
  'Program Penunjang Peringatan Hari-Hari Besar',
  'Program Dana Bergulir',
];

const STRATEGI_OPERASIONAL = [
  'Orientasi pengembangan diarahkan pada peningkatan ekonomi masyarakat',
  'Peningkatan kualitas SDM melalui pendidikan',
  'Peningkatan peran masyarakat melalui pemberdayaan masyarakat',
  'Meningkatkan kualitas hidup masyarakat melalui peduli kesehatan',
  'Melestarikan kehidupan sosial masyarakat yang berdasarkan nilai-nilai religius',
];

const PRIORITAS_PEMBANGUNAN = [
  'Pembangunan desa diarahkan pada infrastruktur pedesaan',
  'Pembangunan sarana dan prasarana umum',
  'Pembangunan fasilitas penunjang pembangunan ekonomi',
];

// ============================================================
// Accordion Component (Client-free — uses details/summary)
// ============================================================

function Accordion({
  title,
  icon,
  children,
  defaultOpen,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden [&[open]]:shadow-md transition-shadow"
      open={defaultOpen}
    >
      <summary className="flex items-center gap-3 px-6 py-5 cursor-pointer select-none list-none hover:bg-neutral-50 transition-colors [&::-webkit-details-marker]:hidden">
        <span className="text-2xl flex-shrink-0" aria-hidden>{icon}</span>
        <span className="font-bold text-neutral-900 text-lg flex-1">{title}</span>
        <svg
          className="w-5 h-5 text-neutral-400 transition-transform duration-300 group-open:rotate-180 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-6 pb-6 pt-2 border-t border-neutral-100">{children}</div>
    </details>
  );
}

// ============================================================
// Page Component
// ============================================================

export default function PembangunanPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* ===== HERO HEADER ===== */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white pt-20 pb-28 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="container-page relative z-10">
          <ScrollReveal>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium rounded-full border border-white/15 mb-5">
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-soft-pulse" />
              RPJM-Des Desa Surorejo
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              Rencana Pembangunan
              <br />
              <span className="text-primary-300">Desa Surorejo</span>
            </h1>
            <p className="text-primary-100 text-lg max-w-2xl leading-relaxed">
              Dokumen resmi Rencana Pembangunan Jangka Menengah Desa yang memuat visi, misi,
              potensi, permasalahan, kebijakan, dan strategi pembangunan untuk 6 tahun ke depan.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Wave divider */}
      <div className="relative -mt-10 z-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" className="w-full h-12 preserve-3d">
          <path fill="#f8fafc" d="M0,48 L0,16 Q360,48 720,16 Q1080,-16 1440,16 L1440,48Z" />
        </svg>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container-page relative z-30 mt-4 space-y-8">

        {/* ── SECTION 1: Visi Misi & Pengantar ── */}
        <ScrollReveal>
          <Accordion title="Visi, Misi & Pengantar RPJM-Des" icon="🎯" defaultOpen>
            <div className="space-y-6">
              {/* Visi */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-xl p-6 border border-primary-200">
                <h3 className="font-bold text-primary-900 mb-2 text-lg">Visi Desa</h3>
                <p className="text-primary-800 italic text-lg font-medium">
                  &ldquo;MEMBANGUN DESA DAN MENINGKATKAN KESEJAHTERAAN MASYARAKAT DESA SUROREJO&rdquo;
                </p>
                <p className="text-primary-700/80 mt-3 text-sm leading-relaxed">
                  Rumusan visi tersebut merupakan suatu ungkapan dari niat yang luhur untuk memperbaiki
                  penyelenggaraan pemerintahan dan pelaksanaan pembangunan di Desa Surorejo baik secara
                  individu maupun kelembagaan sehingga 6 tahun ke depan Desa Surorejo mengalami suatu
                  perubahan yang lebih baik dan peningkatan kesejahteraan masyarakat dilihat dari segi
                  ekonomi dengan dilandasi semangat kebersamaan.
                </p>
              </div>

              {/* Misi */}
              <div>
                <h3 className="font-bold text-neutral-900 mb-3 text-lg">Misi Desa</h3>
                <ol className="space-y-2.5">
                  {[
                    'Meneruskan pembangunan yang belum terealisasi.',
                    'Mewujudkan dan meningkatkan serta meneruskan tata pemerintahan desa yang lebih baik.',
                    'Meningkatkan pelayanan yang maksimal terhadap warga desa.',
                    'Meningkatkan kehidupan yang lebih harmonis, toleran, saling menghormati dalam kehidupan berbudaya dan beragama di Desa Surorejo.',
                    'Mengedepankan kejujuran, keadilan, dan transparansi dalam kehidupan sehari-hari baik dalam pemerintahan maupun dengan masyarakat desa.',
                  ].map((m, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-neutral-700 leading-relaxed">{m}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Pengantar RPJM */}
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h4 className="font-semibold text-neutral-800 mb-2">Dasar Penyusunan</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Demokratisasi memiliki makna bahwa penyelenggaraan pemerintahan dan pelaksanaan
                  pembangunan di desa harus mengakomodasi aspirasi dari masyarakat melalui Badan
                  Permusyawaratan Desa dan Lembaga Kemasyarakatan yang ada sebagai mitra Pemerintah Desa.
                  Diharapkan proses pembangunan, penyelenggaraan pemerintahan, pemberdayaan masyarakat,
                  dan partisipasi masyarakat dapat benar-benar mendasarkan pada prinsip keterbukaan sehingga
                  secara bertahap Desa Surorejo dapat mengalami kemajuan.
                </p>
              </div>
            </div>
          </Accordion>
        </ScrollReveal>

        {/* ── SECTION 2: Potensi Desa ── */}
        <ScrollReveal>
          <Accordion title="Potensi Desa" icon="💎">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {POTENSI.map((p) => (
                <div key={p.judul} className={`rounded-xl p-5 border ${p.bg}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{p.ikon}</span>
                    <h4 className="font-bold text-neutral-900">{p.judul}</h4>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">{p.isi}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </ScrollReveal>

        {/* ── SECTION 3: Masalah Desa (14 bidang) ── */}
        <ScrollReveal>
          <Accordion title={`Permasalahan Desa (${MASALAH.length} Bidang)`} icon="⚠️">
            <p className="text-neutral-500 text-sm mb-5">
              Daftar masalah bersumber dari hasil pengkajian desa yang mencerminkan kondisi prasarana, lingkungan,
              kesehatan, pendidikan, sosial-budaya, keamanan, dan sumberdaya perekonomian.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MASALAH.map((m) => (
                <div key={m.bidang} className="bg-neutral-50 rounded-xl border border-neutral-200 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{m.ikon}</span>
                    <h4 className="font-bold text-neutral-900 text-sm">{m.bidang}</h4>
                    <span className="ml-auto text-xs bg-neutral-200 text-neutral-600 px-2 py-0.5 rounded-full font-medium">
                      {m.items.length} masalah
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {m.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Accordion>
        </ScrollReveal>

        {/* ── SECTION 4: Kebijakan Pembangunan ── */}
        <ScrollReveal>
          <Accordion title="Kebijakan Pembangunan Desa" icon="📜">
            <div className="space-y-6">
              {/* Proses */}
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <h4 className="font-bold text-neutral-900 mb-2">Proses Penyusunan</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Program Desa diawali dari musyawarah desa yang dihadiri tokoh masyarakat, tokoh agama,
                  RT/RW, Pemerintah Desa beserta BPD dalam rangka penggalian gagasan untuk dibahas dan
                  disepakati. Dari penggalian gagasan tersebut dapat diketahui permasalahan yang ada di
                  desa dan kebutuhan apa yang diperlukan oleh masyarakat sehingga aspirasi seluruh lapisan
                  masyarakat bisa tertampung.
                </p>
              </div>

              {/* Arah Pendapatan */}
              <div>
                <h4 className="font-bold text-neutral-900 mb-3">Arah Pengelolaan Pendapatan Desa</h4>
                <ul className="space-y-2">
                  {[
                    'Pendapatan Desa bersumber APBDes dan Dana dari Pemerintah.',
                    'Pendapatan Asli Desa dipungut oleh Kepala Dusun dibantu oleh Perangkat Desa sesuai wilayah masing-masing kemudian dikumpulkan dan disetorkan oleh Kepala Desa.',
                    'Pendapatan dari APBDes dan dari Pemerintah dikelola oleh Bendahara Desa.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arah Belanja */}
              <div>
                <h4 className="font-bold text-neutral-900 mb-3">
                  Arah Pengelolaan Belanja Desa
                  <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                    {PROGRAM_BELANJA.length} Program
                  </span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PROGRAM_BELANJA.map((p, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-neutral-50 rounded-lg border border-neutral-200 px-4 py-2.5">
                      <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-sm text-neutral-700">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kebijakan Anggaran */}
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h4 className="font-bold text-neutral-900 mb-2">Kebijakan Umum Anggaran</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Pemerintah Desa bersama BPD melaksanakan musyawarah guna membahas dan menyepakati
                  anggaran yang dibutuhkan selama setahun dengan menggunakan tolok ukur pada tahun-tahun
                  sebelumnya yang kemudian dituangkan dalam APBDes.
                </p>
              </div>
            </div>
          </Accordion>
        </ScrollReveal>

        {/* ── SECTION 5: Strategi Pencapaian ── */}
        <ScrollReveal>
          <Accordion title="Strategi Pencapaian" icon="🚀">
            <div className="space-y-6">
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                <h4 className="font-bold text-neutral-900 mb-2">Strategi Utama</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Program Desa Surorejo dilaksanakan dengan mengacu pada strategi yang disusun berdasarkan
                  kondisi sosial ekonomi masyarakat. Menetapkan Desa Surorejo sebagai desa yang lebih maju
                  dalam membangun desa dengan kebersamaan. Fokus pengembangan ekonomi yaitu pada pertanian
                  dan usaha ekonomi mikro yang memiliki keunggulan komparatif dan diandalkan untuk meningkatkan
                  pendapatan masyarakat.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-900 mb-3">Langkah Operasional</h4>
                <div className="space-y-2">
                  {STRATEGI_OPERASIONAL.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-neutral-200 px-5 py-3.5">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </div>
                      <span className="text-neutral-700 text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-neutral-900 mb-3">Prioritas Pengembangan</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRIORITAS_PEMBANGUNAN.map((p, i) => (
                    <div key={i} className="text-center bg-gradient-to-b from-primary-50 to-white rounded-xl border border-primary-200 p-5">
                      <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white text-lg font-bold flex items-center justify-center mx-auto mb-3">
                        {i + 1}
                      </div>
                      <p className="text-sm text-neutral-700 font-medium">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Accordion>
        </ScrollReveal>

        {/* ── SECTION 6: Penutup ── */}
        <ScrollReveal>
          <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-2xl p-8 md:p-10 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Penutup</h2>
            </div>
            <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
              <p>
                Semua program yang tercantum merupakan kebutuhan utama berdasarkan kondisi saat ini.
                Tidak menutup kemungkinan ada program tambahan yang sifatnya darurat dan tidak bisa ditunda.
                Karena tidak tercantum dalam rencana program, maka swadaya masyarakat sangat diperlukan
                berupa tenaga gotong royong maupun material yang bisa diambil dari lokal desa.
              </p>
              <p>
                Karena program ini untuk 6 (enam) tahun, maka untuk menjembatani kekosongan dokumen
                perencanaan jangka menengah pada masa jabatan Kepala Desa, penyusun menyiapkan program
                yang sifatnya sekunder dan tidak membutuhkan biaya dalam jumlah besar. Program tersebut
                meliputi rehabilitasi sarana dan prasarana yang ada, selain itu penyusun juga akan melakukan
                evaluasi program apa saja yang belum terealisasi sehingga bisa diteruskan untuk RPJM-Des
                tahun-tahun selanjutnya agar program pembangunan bisa terus berkesinambungan meskipun
                yang menduduki jabatan Kepala Desa silih berganti.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-white/10 text-xs text-neutral-400">
              Dokumen RPJM-Des Desa Surorejo, Kecamatan Banyuurip, Kabupaten Purworejo
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
