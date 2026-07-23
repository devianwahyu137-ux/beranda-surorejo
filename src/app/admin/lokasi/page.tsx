'use client';

import { useState, useEffect, useCallback } from 'react';
import type { StrategicLocation } from '@/types/db';

const CATEGORY_LABELS: Record<string, string> = {
  pemerintahan: 'Pemerintahan',
  ibadah: 'Tempat Ibadah',
  lainnya: 'Fasilitas Lainnya',
};
const CATEGORIES = Object.keys(CATEGORY_LABELS);

const emptyForm = {
  name: '', category: 'pemerintahan', description: '', latitude: '', longitude: '',
};

export default function AdminLokasiPage() {
  const [locations, setLocations] = useState<StrategicLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/strategic-location');
    if (res.ok) setLocations(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchLocations(); }, [fetchLocations]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (loc: StrategicLocation) => {
    setEditId(loc.id);
    setForm({ name: loc.name, category: loc.category, description: loc.description || '', latitude: loc.latitude.toString(), longitude: loc.longitude.toString() });
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => { setEditId(null); setForm(emptyForm); setError(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const url = editId ? `/api/strategic-location/${editId}` : '/api/strategic-location';
      const method = editId ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      handleCancel();
      fetchLocations();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus lokasi "${name}"?`)) return;
    await fetch(`/api/strategic-location/${id}`, { method: 'DELETE' });
    fetchLocations();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Kelola Lokasi Strategis</h1>
      <p className="text-sm text-neutral-500 mb-8">
        Lokasi ini akan tampil sebagai penanda (marker) di Peta Interaktif halaman Profil Desa. Pastikan koordinat latitude &amp; longitude akurat.
      </p>

      {/* Form */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 mb-8">
        <h2 className="font-semibold text-neutral-900 mb-4">{editId ? 'Edit Lokasi' : 'Tambah Lokasi Baru'}</h2>
        {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nama Lokasi *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Contoh: Balai Desa Surorejo"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Kategori *</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500">
                {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Deskripsi Singkat</label>
            <input name="description" value={form.description} onChange={handleChange} placeholder="Contoh: Pusat pelayanan administrasi Desa Surorejo"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Latitude *</label>
              <input name="latitude" value={form.latitude} onChange={handleChange} required type="number" step="any" placeholder="-7.726058"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Longitude *</label>
              <input name="longitude" value={form.longitude} onChange={handleChange} required type="number" step="any" placeholder="109.969197"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 text-sm transition-colors">
              {saving ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Tambah Lokasi'}
            </button>
            {editId && (
              <button type="button" onClick={handleCancel}
                className="px-6 py-2.5 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 text-sm transition-colors">
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h2 className="font-semibold text-neutral-900">Daftar Lokasi ({locations.length})</h2>
        </div>
        {loading ? (
          <div className="text-neutral-400 py-8 text-center text-sm">Memuat...</div>
        ) : locations.length === 0 ? (
          <div className="text-neutral-400 py-8 text-center text-sm">Belum ada lokasi. Tambahkan lokasi pertama di atas.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="text-left py-3 px-4 font-medium text-neutral-600">Nama</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-600">Kategori</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-600">Koordinat</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-600">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((loc) => (
                  <tr key={loc.id} className="border-b border-neutral-50 hover:bg-neutral-50">
                    <td className="py-3 px-4 font-medium text-neutral-900">
                      {loc.name}
                      {loc.description && <p className="text-xs text-neutral-400 font-normal mt-0.5">{loc.description}</p>}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                        {CATEGORY_LABELS[loc.category]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-500 font-mono text-xs">
                      {loc.latitude.toFixed(6)}, {loc.longitude.toFixed(6)}
                    </td>
                    <td className="py-3 px-4 text-right space-x-3">
                      <button onClick={() => handleEdit(loc)} className="text-primary-600 hover:underline text-sm">Edit</button>
                      <button onClick={() => handleDelete(loc.id, loc.name)} className="text-red-600 hover:underline text-sm">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
