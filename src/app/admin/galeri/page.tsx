'use client';

import { useState, useEffect } from 'react';
import type { Gallery } from '@/types/db';

export default function AdminGaleriPage() {
  const [activeTab, setActiveTab] = useState<'umum' | 'pkk'>('umum');
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Gallery>>({});
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchGalleries();
  }, [activeTab]);

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

      const fileName = `gallery/${Date.now()}.jpg`;
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

  const fetchGalleries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gallery?category=${activeTab}`);
      const data = await res.json();
      setGalleries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing === 'new' ? '/api/gallery' : `/api/gallery/${isEditing}`;
    const method = isEditing === 'new' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        setIsEditing(null);
        fetchGalleries();
      } else {
        alert('Gagal menyimpan data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus foto ini?')) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) fetchGalleries();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Kelola Galeri</h1>
        <button
          onClick={() => {
            setEditForm({ 
              category: activeTab, 
              sort_order: galleries.length + 1,
              color: activeTab === 'pkk' ? 'from-pink-300 to-rose-400' : 'from-primary-300 to-primary-500'
            });
            setIsEditing('new');
          }}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
        >
          + Tambah Foto
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('umum')}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'umum' ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}
        >
          Galeri Umum
        </button>
        <button
          onClick={() => setActiveTab('pkk')}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'pkk' ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}
        >
          Galeri PKK
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-neutral-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleries.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden group">
              <div className="aspect-[4/3] bg-neutral-100 relative">
                {item.image_url.startsWith('http') || item.image_url.startsWith('/') ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <span className="text-white/80 font-medium text-sm px-4 text-center">{item.title}</span>
                  </div>
                )}
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-2">
                  <button 
                    onClick={() => { setEditForm(item); setIsEditing(item.id); }}
                    className="px-3 py-1.5 bg-white text-primary-700 font-medium text-xs rounded-lg hover:bg-neutral-100"
                  >
                    Edit Detail
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 bg-red-600 text-white font-medium text-xs rounded-lg hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="font-semibold text-neutral-900 text-sm truncate" title={item.title}>{item.title}</p>
                <p className="text-xs text-neutral-500">Urutan: {item.sort_order}</p>
              </div>
            </div>
          ))}

          {galleries.length === 0 && (
            <div className="col-span-full p-12 text-center border-2 border-dashed border-neutral-200 rounded-xl">
              <p className="text-neutral-500">Belum ada foto di kategori ini.</p>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">{isEditing === 'new' ? 'Tambah Foto' : 'Edit Foto'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Judul Foto</label>
                <input
                  required
                  type="text"
                  value={editForm.title || ''}
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Upload Gambar</label>
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
                  <div className="mt-3 relative aspect-[4/3] bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={editForm.image_url} alt="Preview" className="object-cover w-full h-full" />
                  </div>
                )}
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
