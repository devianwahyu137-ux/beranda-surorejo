'use client';

import { useState, useEffect } from 'react';
import type { PkkOfficial, PkkProgram } from '@/types/db';

export default function AdminPkkPage() {
  const [activeTab, setActiveTab] = useState<'pengurus' | 'program'>('pengurus');
  
  // States
  const [officials, setOfficials] = useState<PkkOfficial[]>([]);
  const [programs, setPrograms] = useState<PkkProgram[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit states
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
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

      const fileName = `pkk/${Date.now()}.jpg`;
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
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'pengurus') {
        const res = await fetch('/api/pkk-official');
        setOfficials(await res.json());
      } else {
        const res = await fetch('/api/pkk-program');
        setPrograms(await res.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = activeTab === 'pengurus' ? '/api/pkk-official' : '/api/pkk-program';
    const url = isEditing === 'new' ? endpoint : `${endpoint}/${isEditing}`;
    const method = isEditing === 'new' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        setIsEditing(null);
        fetchData();
      } else {
        alert('Gagal menyimpan data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus data ini?')) return;
    const endpoint = activeTab === 'pengurus' ? '/api/pkk-official' : '/api/pkk-program';
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Kelola PKK</h1>
        <button
          onClick={() => {
            const list = activeTab === 'pengurus' ? officials : programs;
            const defaultData = activeTab === 'pengurus' 
              ? { sort_order: list.length + 1, color: 'from-pink-300 to-rose-400' }
              : { sort_order: list.length + 1 };
            setEditForm(defaultData);
            setIsEditing('new');
          }}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
        >
          + Tambah {activeTab === 'pengurus' ? 'Pengurus' : 'Program'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('pengurus')}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'pengurus' ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}
        >
          Pengurus PKK
        </button>
        <button
          onClick={() => setActiveTab('program')}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'program' ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}
        >
          10 Program Pokok
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-neutral-500">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="p-4 text-sm font-semibold text-neutral-600 w-20">Urutan</th>
                {activeTab === 'pengurus' ? (
                  <>
                    <th className="p-4 text-sm font-semibold text-neutral-600 w-24">Foto</th>
                    <th className="p-4 text-sm font-semibold text-neutral-600">Nama & Jabatan</th>
                  </>
                ) : (
                  <th className="p-4 text-sm font-semibold text-neutral-600">Judul & Deskripsi</th>
                )}
                <th className="p-4 text-sm font-semibold text-neutral-600 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'pengurus' ? (
                officials.map((o) => (
                  <tr key={o.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="p-4 text-sm text-neutral-700">{o.sort_order}</td>
                    <td className="p-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${o.color} flex items-center justify-center overflow-hidden`}>
                        {o.image_url ? <img src={o.image_url} alt={o.name} className="w-full h-full object-cover" /> : <span className="text-white text-xs">Foto</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-neutral-900">{o.name}</p>
                      <p className="text-sm text-neutral-500">{o.position}</p>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => { setEditForm(o); setIsEditing(o.id); }} className="text-primary-600 text-sm font-medium mr-3">Edit</button>
                      <button onClick={() => handleDelete(o.id)} className="text-red-600 text-sm font-medium">Hapus</button>
                    </td>
                  </tr>
                ))
              ) : (
                programs.map((p) => (
                  <tr key={p.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="p-4 text-sm text-neutral-700">{p.sort_order}</td>
                    <td className="p-4">
                      <p className="font-semibold text-neutral-900">{p.title}</p>
                      <p className="text-sm text-neutral-500 line-clamp-2">{p.description}</p>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <button onClick={() => { setEditForm(p); setIsEditing(p.id); }} className="text-primary-600 text-sm font-medium mr-3">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-600 text-sm font-medium">Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {isEditing === 'new' ? 'Tambah ' : 'Edit '}
              {activeTab === 'pengurus' ? 'Pengurus' : 'Program'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              {activeTab === 'pengurus' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Nama</label>
                    <input required type="text" value={editForm.name || ''} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Jabatan</label>
                    <input required type="text" value={editForm.position || ''} onChange={e => setEditForm({ ...editForm, position: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Upload Foto</label>
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
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Warna (Tailwind)</label>
                    <input required type="text" value={editForm.color || ''} onChange={e => setEditForm({ ...editForm, color: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Judul Program</label>
                    <input required type="text" value={editForm.title || ''} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Deskripsi</label>
                    <textarea required rows={4} value={editForm.description || ''} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Urutan Tampil (Sort Order)</label>
                <input required type="number" value={editForm.sort_order || 0} onChange={e => setEditForm({ ...editForm, sort_order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg">Batal</button>
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
