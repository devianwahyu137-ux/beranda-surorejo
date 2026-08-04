import ScrollReveal from './ScrollReveal';

// ============================================================
// Data Desa — dari catatan resmi Desa Surorejo
// ============================================================

const BATAS_WILAYAH = [
  { arah: 'Utara', desa: 'Desa Banyuurip dan Tegalrejo' },
  { arah: 'Timur', desa: 'Desa Wangunrejo' },
  { arah: 'Selatan', desa: 'Desa Sendangsari' },
  { arah: 'Barat', desa: 'Desa Bencorejo' },
];

const LUAS_WILAYAH = [
  { penggunaan: 'Pemukiman', luas: '85,82 ha' },
  { penggunaan: 'Pertanian Sawah', luas: '93 ha' },
  { penggunaan: 'Ladang / Tegalan', luas: '6,179 ha' },
  { penggunaan: 'Perkantoran', luas: '0,7 ha' },
  { penggunaan: 'Sekolah', luas: '0,7 ha' },
  { penggunaan: 'Jalan', luas: '0,5 ha' },
  { penggunaan: 'Lapangan Sepak Bola', luas: '0,1 ha' },
];

const ORBITASI = [
  { tujuan: 'Ibukota Kecamatan Terdekat', jarak: '2,5 km', waktu: '10 menit' },
  { tujuan: 'Ibukota Kabupaten', jarak: '8 km', waktu: '20 menit' },
];

const PENDIDIKAN = [
  { tingkat: 'SD / MI', jumlah: 276 },
  { tingkat: 'SLTP / MTs', jumlah: 372 },
  { tingkat: 'SLTA / MA', jumlah: 155 },
  { tingkat: 'S1 / Diploma', jumlah: 22 },
  { tingkat: 'Putus Sekolah', jumlah: 15 },
  { tingkat: 'Buta Huruf', jumlah: 5 },
];

const LEMBAGA_PENDIDIKAN = [
  { nama: 'TK / PAUD Tunas Harapan', jumlah: 1, lokasi: 'Dusun Kenanggulan' },
  { nama: 'SD / MI Surorejo', jumlah: 1, lokasi: 'Dusun Kleben' },
];

const KESEHATAN = {
  kelahiran: { lahir: 4, meninggal: 1 },
  ibuMelahirkan: { melahirkan: 4, meninggal: 0 },
  imunisasi: [
    { jenis: 'Polio 3', jumlah: 35 },
    { jenis: 'DPT-1', jumlah: 4 },
    { jenis: 'Cacar', jumlah: 4 },
  ],
  giziBalita: { total: 35, baik: 35, buruk: 0, kurang: 0 },
  airBersih: [
    { sumber: 'Sumur Galian', pengguna: '187 KK' },
    { sumber: 'Sumur Pompa', pengguna: '167 KK' },
  ],
};

const KEAGAMAAN = {
  pemeluk: [
    { agama: 'Islam', jumlah: 750 },
    { agama: 'Kristen', jumlah: 6 },
    { agama: 'Katolik', jumlah: 1 },
  ],
  tempatIbadah: [
    { jenis: 'Masjid / Musholla', jumlah: 6 },
  ],
};

const APARAT_DESA = [
  { jabatan: 'Kepala Desa (Bpk. Margino)', jumlah: 1 },
  { jabatan: 'Sekretaris Desa (Bpk. Suwardi)', jumlah: 1 },
  { jabatan: 'Kepala Urusan (Kaur)', jumlah: 3 },
  { jabatan: 'Kepala Seksi (Kasi)', jumlah: 3 },
  { jabatan: 'Kepala Dusun (Kadus I - VI)', jumlah: 6 },
  { jabatan: 'BPD (Ketua: Bpk. Joko Purnomo)', jumlah: 5 },
];

const LEMBAGA_KEMASYARAKATAN = [
  { nama: 'LPMD', jumlah: '1 lembaga' },
  { nama: 'PKK', jumlah: '1 tim penggerak' },
  { nama: 'Posyandu & Posbindu', jumlah: '1 lembaga (rutin tiap dusun)' },
  { nama: 'Forum Kesehatan Desa (FKD)', jumlah: '1 forum aktif' },
  { nama: 'KPMD (Kader Pemberdayaan)', jumlah: '1 kelompok' },
  { nama: 'Karang Taruna', jumlah: '1 organisasi muda' },
  { nama: 'Kesenian Kuda Lumping', jumlah: '1 grup seni budaya' },
  { nama: 'Kesenian Ketoprak', jumlah: '1 grup seni teater' },
  { nama: 'Kesenian Hadroh', jumlah: '1 grup seni religi' },
  { nama: 'Kelompok Tani & Gapoktan', jumlah: '7 kelompok' },
];

// ============================================================
// Sub-components
// ============================================================

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
      <span className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </span>
      {title}
    </h3>
  );
}

function DataTable({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-5 py-3 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className={`rounded-xl p-4 text-center border ${accent || 'bg-white border-neutral-200'}`}>
      <p className="text-2xl font-bold text-neutral-900">{value}</p>
      <p className="text-xs text-neutral-500 mt-1 font-medium">{label}</p>
    </div>
  );
}

// ============================================================
// Main Component
// ============================================================

export default function VillageDataSection() {
  return (
    <div className="space-y-10 mt-10">

      {/* =============== SUMBER DAYA ALAM =============== */}
      <ScrollReveal>
        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Sumber Daya Alam
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Batas Wilayah */}
            <div>
              <SectionHeading
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                title="Batas Wilayah"
              />
              <DataTable headers={['Arah', 'Berbatasan Dengan']}>
                {BATAS_WILAYAH.map((b) => (
                  <tr key={b.arah} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-5 py-3 font-medium text-neutral-900 whitespace-nowrap">{b.arah}</td>
                    <td className="px-5 py-3 text-neutral-600">{b.desa}</td>
                  </tr>
                ))}
              </DataTable>
            </div>

            {/* Orbitasi */}
            <div>
              <SectionHeading
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                }
                title="Orbitasi"
              />
              <DataTable headers={['Tujuan', 'Jarak', 'Waktu Tempuh']}>
                {ORBITASI.map((o) => (
                  <tr key={o.tujuan} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-5 py-3 font-medium text-neutral-900">{o.tujuan}</td>
                    <td className="px-5 py-3 text-neutral-600 whitespace-nowrap">{o.jarak}</td>
                    <td className="px-5 py-3 text-neutral-600 whitespace-nowrap">{o.waktu}</td>
                  </tr>
                ))}
              </DataTable>
            </div>
          </div>

          {/* Luas Wilayah Detail */}
          <div className="mt-6">
            <SectionHeading
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              }
              title="Luas Wilayah (Total: 185,04 Ha / 1.850.399 m²)"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {LUAS_WILAYAH.map((l) => (
                <div key={l.penggunaan} className="bg-white rounded-xl border border-neutral-200 p-4 text-center hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors">
                  <p className="text-lg font-bold text-neutral-900">{l.luas}</p>
                  <p className="text-xs text-neutral-500 mt-1">{l.penggunaan}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* =============== SUMBER DAYA MANUSIA =============== */}
      <ScrollReveal>
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Sumber Daya Manusia
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pendidikan */}
            <div>
              <SectionHeading
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                }
                title="Tingkat Pendidikan"
              />
              <div className="space-y-2.5">
                {PENDIDIKAN.map((p) => {
                  const maxVal = Math.max(...PENDIDIKAN.map(x => x.jumlah));
                  const pct = Math.round((p.jumlah / maxVal) * 100);
                  const isWarning = p.tingkat === 'Putus Sekolah' || p.tingkat === 'Buta Huruf';
                  return (
                    <div key={p.tingkat}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={`font-medium ${isWarning ? 'text-amber-700' : 'text-neutral-700'}`}>{p.tingkat}</span>
                        <span className="text-neutral-500 font-semibold">{p.jumlah} orang</span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isWarning ? 'bg-amber-400' : 'bg-blue-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lembaga Pendidikan */}
            <div>
              <SectionHeading
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
                title="Lembaga Pendidikan"
              />
              <div className="space-y-3">
                {LEMBAGA_PENDIDIKAN.map((l) => (
                  <div key={l.nama} className="bg-white rounded-xl border border-neutral-200 p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold">{l.jumlah}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 text-sm">{l.nama}</p>
                      <p className="text-xs text-neutral-500">{l.lokasi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* =============== KESEHATAN =============== */}
      <ScrollReveal>
        <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl border border-rose-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Data Kesehatan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Kelahiran */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5">
              <p className="text-sm font-semibold text-neutral-700 mb-3">Kelahiran & Kematian Bayi</p>
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Bayi Lahir" value={KESEHATAN.kelahiran.lahir} accent="bg-emerald-50 border-emerald-200" />
                <StatCard label="Bayi Meninggal" value={KESEHATAN.kelahiran.meninggal} accent="bg-rose-50 border-rose-200" />
              </div>
            </div>

            {/* Ibu Melahirkan */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5">
              <p className="text-sm font-semibold text-neutral-700 mb-3">Ibu Melahirkan</p>
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Ibu Melahirkan" value={KESEHATAN.ibuMelahirkan.melahirkan} accent="bg-emerald-50 border-emerald-200" />
                <StatCard label="Ibu Meninggal" value={KESEHATAN.ibuMelahirkan.meninggal} accent="bg-neutral-50 border-neutral-200" />
              </div>
            </div>

            {/* Gizi Balita */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5">
              <p className="text-sm font-semibold text-neutral-700 mb-3">Gizi Balita</p>
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="Total Balita" value={KESEHATAN.giziBalita.total} />
                <StatCard label="Gizi Baik" value={KESEHATAN.giziBalita.baik} accent="bg-emerald-50 border-emerald-200" />
              </div>
            </div>

            {/* Imunisasi */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5">
              <p className="text-sm font-semibold text-neutral-700 mb-3">Cakupan Imunisasi</p>
              <div className="space-y-2">
                {KESEHATAN.imunisasi.map((im) => (
                  <div key={im.jenis} className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">{im.jenis}</span>
                    <span className="text-sm font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-md">{im.jumlah} orang</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Air Bersih & Permukiman */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 md:col-span-2 lg:col-span-2">
              <p className="text-sm font-semibold text-neutral-700 mb-3">Pemenuhan Air Bersih & Status Permukiman (Data RKPDes 2026)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {KESEHATAN.airBersih.map((a) => (
                  <div key={a.sumber} className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-neutral-900">{a.pengguna}</p>
                    <p className="text-xs text-neutral-500 mt-1">{a.sumber}</p>
                  </div>
                ))}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <p className="text-xl font-bold text-emerald-700">0 Unit</p>
                  <p className="text-xs text-neutral-600 mt-1">Rumah Tidak Layak Huni</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <p className="text-xl font-bold text-emerald-700">100% Layak</p>
                  <p className="text-xs text-neutral-600 mt-1">Status Rumah Sehat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* =============== KEAGAMAAN =============== */}
      <ScrollReveal>
        <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Data Keagamaan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pemeluk Agama */}
            <div>
              <SectionHeading
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                title="Jumlah Pemeluk Agama"
              />
              <div className="space-y-2">
                {KEAGAMAAN.pemeluk.map((p) => (
                  <div key={p.agama} className="flex justify-between items-center bg-white rounded-lg border border-neutral-200 px-4 py-3">
                    <span className="text-sm font-medium text-neutral-700">{p.agama}</span>
                    <span className="text-sm font-bold text-neutral-900">{p.jumlah.toLocaleString('id-ID')} orang</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tempat Ibadah */}
            <div>
              <SectionHeading
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                }
                title="Tempat Ibadah"
              />
              <div className="space-y-2">
                {KEAGAMAAN.tempatIbadah.map((t) => (
                  <div key={t.jenis} className="flex justify-between items-center bg-white rounded-lg border border-neutral-200 px-4 py-3">
                    <span className="text-sm font-medium text-neutral-700">{t.jenis}</span>
                    <span className="text-sm font-bold text-neutral-900">{t.jumlah} buah</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* =============== SOTK DESA =============== */}
      <ScrollReveal>
        <div className="bg-gradient-to-br from-violet-50 to-white rounded-2xl border border-violet-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Struktur Organisasi & Tata Kerja Desa
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lembaga Pemerintahan */}
            <div>
              <SectionHeading
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
                title="Lembaga Pemerintahan"
              />
              <DataTable headers={['Jabatan', 'Jumlah']}>
                {APARAT_DESA.map((a) => (
                  <tr key={a.jabatan} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-5 py-3 font-medium text-neutral-900">{a.jabatan}</td>
                    <td className="px-5 py-3 text-neutral-600">{a.jumlah} orang</td>
                  </tr>
                ))}
              </DataTable>
            </div>

            {/* Lembaga Kemasyarakatan */}
            <div>
              <SectionHeading
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                title="Lembaga Kemasyarakatan"
              />
              <DataTable headers={['Lembaga', 'Jumlah']}>
                {LEMBAGA_KEMASYARAKATAN.map((l) => (
                  <tr key={l.nama} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-5 py-3 font-medium text-neutral-900">{l.nama}</td>
                    <td className="px-5 py-3 text-neutral-600">{l.jumlah}</td>
                  </tr>
                ))}
              </DataTable>
            </div>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
}
