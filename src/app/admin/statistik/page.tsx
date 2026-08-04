'use client';

import { useState, useEffect } from 'react';
import type { DemographicStat, VillageArea } from '@/types/db';
import { STAT_ICONS } from '@/lib/constants';

export default function AdminStatistikPage() {
  const [stats, setStats] = useState<DemographicStat[]>([]);
  const [areas, setAreas] = useState<VillageArea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for Demografi Modal
  const [editingStat, setEditingStat] = useState<string | null>(null);
  const [statForm, setStatForm] = useState<Partial<DemographicStat>>({});
  const [savingStat, setSavingStat] = useState(false);

  // State for Wilayah Modal
  const [editingArea, setEditingArea] = useState<string | null>(null);
  const [areaForm, setAreaForm] = useState<Partial<VillageArea>>({});
  const [savingArea, setSavingArea] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [statsRes, areasRes] = await Promise.all([
        fetch('/api/demographic-stat'),
        fetch('/api/village-area'),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (Array.isArray(statsData)) setStats(statsData);
      }
      if (areasRes.ok) {
        const areasData = await areasRes.json();
        if (Array.isArray(areasData)) setAreas(areasData);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setIsLoading(false);
    }
  }

  // --- HANDLERS FOR DEMOGRAFI ---
  const handleSaveStat = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingStat(true);
    const url = editingStat === 'new' ? '/api/demographic-stat' : `/api/demographic-stat/${editingStat}`;
    const method = editingStat === 'new' ? 'POST' : 'PUT';

    const payload = {
      label: statForm.label || '',
      value: statForm.value || '',
      icon: statForm.icon || 'users',
      sort_order: Number(statForm.sort_order) || stats.length + 1,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEditingStat(null);
        setStatForm({});
        await fetchData();
      } else {
        const err = await res.json();
        alert(`Gagal menyimpan data demografi: ${err.error || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setSavingStat(false);
    }
  };

  const handleDeleteStat = async (id: string) => {
    if (!confirm('Hapus item statistik demografi ini?')) return;
    try {
      const res = await fetch(`/api/demographic-stat/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchData();
      } else {
        alert('Gagal menghapus data.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // --- HANDLERS FOR WILAYAH ---
  const handleSaveArea = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingArea(true);
    const url = editingArea === 'new' ? '/api/village-area' : `/api/village-area/${editingArea}`;
    const method = editingArea === 'new' ? 'POST' : 'PUT';

    const payload = {
      dusun: areaForm.dusun || '',
      rw_count: Number(areaForm.rw_count) || 0,
      rt_count: Number(areaForm.rt_count) || 0,
      population: Number(areaForm.population) || 0,
      head_name: areaForm.head_name || '',
      sort_order: Number(areaForm.sort_order) || areas.length + 1,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEditingArea(null);
        setAreaForm({});
        await fetchData();
      } else {
        const err = await res.json();
        alert(`Gagal menyimpan data wilayah: ${err.error || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setSavingArea(false);
    }
  };

  const handleDeleteArea = async (id: string) => {
    if (!confirm('Hapus data wilayah/dusun ini?')) return;
    try {
      const res = await fetch(`/api/village-area/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchData();
      } else {
        alert('Gagal menghapus data wilayah.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-neutral-500">Memuat data statistik...</div>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Kelola Data Statistik & Demografi</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Kelola angka demografi dan profil wilayah administratif dusun yang ditampilkan pada beranda dan halaman profil desa.
        </p>
      </div>

      {/* SECTION 1: DEMOGRAFI DESA */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Demografi Desa</h2>
            <p className="text-xs text-neutral-500">Angka ikhtisar kependudukan (Jiwa, Gender, KK, Luas Wilayah).</p>
          </div>
          <button
            onClick={() => {
              setStatForm({
                icon: 'users',
                sort_order: stats.length + 1,
              });
              setEditingStat('new');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-sm active:scale-95 touch-target"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Data Demografi
          </button>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 font-medium w-16">No</th>
                  <th className="px-6 py-4 font-medium">Label</th>
                  <th className="px-6 py-4 font-medium">Nilai</th>
                  <th className="px-6 py-4 font-medium text-center">Ikon</th>
                  <th className="px-6 py-4 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {stats.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-neutral-400 font-medium">
                      Belum ada data demografi. Klik tombol &ldquo;Tambah Data Demografi&rdquo; untuk memulai.
                    </td>
                  </tr>
                ) : (
                  stats.map((stat, index) => (
                    <tr key={stat.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="px-6 py-4 text-neutral-500 font-medium">{index + 1}</td>
                      <td className="px-6 py-4 font-semibold text-neutral-900">{stat.label}</td>
                      <td className="px-6 py-4 text-primary-700 font-bold">{stat.value}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center p-2 bg-primary-50 rounded-lg text-primary-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={STAT_ICONS[stat.icon] || STAT_ICONS['users']} />
                          </svg>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setStatForm(stat);
                            setEditingStat(stat.id);
                          }}
                          className="px-3 py-1.5 rounded-lg text-primary-600 font-semibold hover:bg-primary-50 transition-colors text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteStat(stat.id)}
                          className="px-3 py-1.5 rounded-lg text-red-600 font-semibold hover:bg-red-50 transition-colors text-xs"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 2: WILAYAH ADMINISTRATIF */}
      <div className="space-y-4 pt-4 border-t border-neutral-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Wilayah Administratif Dusun</h2>
            <p className="text-xs text-neutral-500">Rincian nama dusun, jumlah RT/RW, kepala dusun, dan populasi per wilayah.</p>
          </div>
          <button
            onClick={() => {
              setAreaForm({
                rw_count: 1,
                rt_count: 1,
                population: 100,
                sort_order: areas.length + 1,
              });
              setEditingArea('new');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-sm active:scale-95 touch-target"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Wilayah Dusun
          </button>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Nama Dusun</th>
                  <th className="px-6 py-4 font-medium text-center">Kepala Dusun / Keterangan</th>
                  <th className="px-6 py-4 font-medium text-center">Jumlah RW</th>
                  <th className="px-6 py-4 font-medium text-center">Jumlah RT</th>
                  <th className="px-6 py-4 font-medium text-center">Populasi Jiwa</th>
                  <th className="px-6 py-4 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {areas.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-neutral-400 font-medium">
                      Belum ada data wilayah dusun. Klik tombol &ldquo;Tambah Wilayah Dusun&rdquo; untuk memulai.
                    </td>
                  </tr>
                ) : (
                  areas.map((area) => (
                    <tr key={area.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="px-6 py-4 font-semibold text-neutral-900">{area.dusun}</td>
                      <td className="px-6 py-4 text-center text-neutral-600 font-medium">
                        {area.head_name || '-'}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-neutral-700">{area.rw_count}</td>
                      <td className="px-6 py-4 text-center font-semibold text-neutral-700">{area.rt_count}</td>
                      <td className="px-6 py-4 text-center text-emerald-700 font-bold">{area.population}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setAreaForm(area);
                            setEditingArea(area.id);
                          }}
                          className="px-3 py-1.5 rounded-lg text-primary-600 font-semibold hover:bg-primary-50 transition-colors text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArea(area.id)}
                          className="px-3 py-1.5 rounded-lg text-red-600 font-semibold hover:bg-red-50 transition-colors text-xs"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL 1: FORM DEMOGRAFI */}
      {editingStat && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto border border-neutral-100">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
              <h3 className="text-lg font-bold text-neutral-900">
                {editingStat === 'new' ? 'Tambah Data Demografi' : 'Edit Data Demografi'}
              </h3>
              <button
                onClick={() => setEditingStat(null)}
                className="text-neutral-400 hover:text-neutral-600 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveStat} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">
                  Label Statistik <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Total Penduduk / Luas Wilayah"
                  value={statForm.label || ''}
                  onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">
                  Nilai <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: 1.288 Jiwa / 185,04 Ha"
                  value={statForm.value || ''}
                  onChange={(e) => setStatForm({ ...statForm, value: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">
                  Pilih Ikon Tampilan <span className="text-red-500">*</span>
                </label>
                <select
                  value={statForm.icon || 'users'}
                  onChange={(e) => setStatForm({ ...statForm, icon: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 bg-white transition-all"
                >
                  <option value="users">Orang / Penduduk (Users)</option>
                  <option value="home">Rumah / KK (Home)</option>
                  <option value="map">Peta / Luas (Map)</option>
                  <option value="building">Gedung / Bangunan (Building)</option>
                  <option value="person">Individu / Gender (Person)</option>
                  <option value="chart">Grafik / Statistik (Chart)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">
                  No Urut Tampilan
                </label>
                <input
                  type="number"
                  value={statForm.sort_order ?? 1}
                  onChange={(e) => setStatForm({ ...statForm, sort_order: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-5 border-t border-neutral-100 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingStat(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-600 font-medium text-sm hover:bg-neutral-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingStat}
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm shadow-sm transition-all disabled:opacity-50"
                >
                  {savingStat ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: FORM WILAYAH DUSUN */}
      {editingArea && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto border border-neutral-100">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
              <h3 className="text-lg font-bold text-neutral-900">
                {editingArea === 'new' ? 'Tambah Wilayah Dusun' : 'Edit Wilayah Dusun'}
              </h3>
              <button
                onClick={() => setEditingArea(null)}
                className="text-neutral-400 hover:text-neutral-600 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveArea} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">
                  Nama Dusun <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Dusun Surobayan (Kadus I)"
                  value={areaForm.dusun || ''}
                  onChange={(e) => setAreaForm({ ...areaForm, dusun: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">
                  Nama Kepala Dusun / Keterangan <span className="text-neutral-400 font-normal">(opsional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Agung Supangkat / Kadus I"
                  value={areaForm.head_name || ''}
                  onChange={(e) => setAreaForm({ ...areaForm, head_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">
                    Jumlah RW <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={areaForm.rw_count ?? 1}
                    onChange={(e) => setAreaForm({ ...areaForm, rw_count: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">
                    Jumlah RT <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={areaForm.rt_count ?? 1}
                    onChange={(e) => setAreaForm({ ...areaForm, rt_count: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">
                    Populasi (Jiwa) <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={areaForm.population ?? 100}
                    onChange={(e) => setAreaForm({ ...areaForm, population: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">
                    No Urut Tampilan
                  </label>
                  <input
                    type="number"
                    value={areaForm.sort_order ?? 1}
                    onChange={(e) => setAreaForm({ ...areaForm, sort_order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-5 border-t border-neutral-100 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingArea(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-600 font-medium text-sm hover:bg-neutral-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingArea}
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm shadow-sm transition-all disabled:opacity-50"
                >
                  {savingArea ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
