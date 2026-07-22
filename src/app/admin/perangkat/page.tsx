'use client';

import { useState, useEffect } from 'react';
import type { VillageOfficial } from '@/types/db';

export default function AdminPerangkatPage() {
  const [officials, setOfficials] = useState<VillageOfficial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<VillageOfficial>>({});
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert('Ukuran file maksimal 8MB. File akan dikompres otomatis.');
      return;
    }

    setUploadingImage(true);

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const { compressImage } = await import('@/lib/utils');
      const supabase = createClient();

      const compressedFile = await compressImage(file);

      const fileName = `officials/${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('umkm-photos')
        .upload(fileName, compressedFile, { contentType: 'image/jpeg' });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('umkm-photos')
        .getPublicUrl(fileName);

      setEditForm({ ...editForm, image_url: urlData.publicUrl });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal mengupload gambar');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  useEffect(() => {
    fetchOfficials();
  }, []);

  const fetchOfficials = async () => {
    try {
      const res = await fetch('/api/village-official');
      const data = await res.json();
      setOfficials(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing === 'new' ? '/api/village-official' : `/api/village-official/${isEditing}`;
    const method = isEditing === 'new' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        setIsEditing(null);
        fetchOfficials();
      } else {
        alert('Gagal menyimpan data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus perangkat desa ini?')) return;
    try {
      const res = await fetch(`/api/village-official/${id}`, { method: 'DELETE' });
      if (res.ok) fetchOfficials();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-8 text-center text-neutral-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Kelola Perangkat Desa</h1>
        <button
          onClick={() => {
            setEditForm({ sort_order: officials.length + 1, color: 'from-primary-300 to-primary-500' });
            setIsEditing('new');
          }}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
        >
          + Tambah Perangkat
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="p-4 text-sm font-semibold text-neutral-600">Urutan</th>
              <th className="p-4 text-sm font-semibold text-neutral-600">Foto</th>
              <th className="p-4 text-sm font-semibold text-neutral-600">Nama & Jabatan</th>
              <th className="p-4 text-sm font-semibold text-neutral-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {officials.map((o) => (
              <tr key={o.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
                <td className="p-4 text-sm text-neutral-700">{o.sort_order}</td>
                <td className="p-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${o.color} flex items-center justify-center overflow-hidden`}>
                    {o.image_url ? (
                      <img src={o.image_url} alt={o.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-xs">Foto</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-semibold text-neutral-900">{o.name}</p>
                  <p className="text-sm text-neutral-500">{o.position}</p>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => {
                      setEditForm(o);
                      setIsEditing(o.id);
                    }}
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(o.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {officials.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-neutral-500">
                  Belum ada data perangkat desa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{isEditing === 'new' ? 'Tambah Perangkat' : 'Edit Perangkat'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Nama</label>
                <input
                  required
                  type="text"
                  value={editForm.name || ''}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Jabatan</label>
                <input
                  required
                  type="text"
                  value={editForm.position || ''}
                  onChange={e => setEditForm({ ...editForm, position: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Upload Foto (Opsional)</label>
                <div className="mt-1 flex flex-col gap-3">
                  <label className="cursor-pointer bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors text-center">
                    {uploadingImage ? 'Mengupload...' : 'Pilih Foto'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingImage}
                      onChange={handleImageUpload}
                    />
                  </label>
                  {editForm.image_url && !uploadingImage && (
                    <span className="text-sm text-green-600 font-medium flex items-center justify-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Foto siap disimpan
                    </span>
                  )}
                </div>
                {editForm.image_url && (
                  <div className="mt-3 relative aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 w-32 mx-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={editForm.image_url} alt="Preview" className="object-cover w-full h-full" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Warna Background (Tailwind)</label>
                <input
                  required
                  type="text"
                  value={editForm.color || ''}
                  onChange={e => setEditForm({ ...editForm, color: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Urutan Tampil (Sort Order)</label>
                <input
                  required
                  type="number"
                  value={editForm.sort_order || 0}
                  onChange={e => setEditForm({ ...editForm, sort_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(null)}
                  className="px-4 py-2 text-neutral-600 font-medium hover:bg-neutral-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
