'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import type { UmkmPhoto } from '@/types/db';

interface PhotoUploaderProps {
  umkmId: string;
  photos: UmkmPhoto[];
  onUpdate: () => void;
}

export default function PhotoUploader({ umkmId, photos, onUpdate }: PhotoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${umkmId}/${Date.now()}.${fileExt}`;

      // Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('umkm-photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('umkm-photos')
        .getPublicUrl(fileName);

      // Create photo record via API
      const res = await fetch(`/api/umkm/${umkmId}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: urlData.publicUrl,
          sort_order: photos.length,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal menyimpan foto.');
      }

      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload gagal.');
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleDelete = async (photo: UmkmPhoto) => {
    if (!confirm('Hapus foto ini?')) return;

    try {
      const res = await fetch(`/api/umkm/${umkmId}/photos/${photo.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal menghapus.');
      }

      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus foto.');
    }
  };

  const sortedPhotos = [...photos].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-neutral-700">Foto UMKM</h3>

      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      {/* Photo Grid */}
      {sortedPhotos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {sortedPhotos.map((photo, index) => (
            <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden group">
              <Image
                src={photo.url}
                alt={`Foto ${index + 1}`}
                fill
                className="object-cover"
                sizes="200px"
              />
              <button
                onClick={() => handleDelete(photo)}
                className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                title="Hapus foto"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                  Utama
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors">
        <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-sm text-neutral-600">
          {uploading ? 'Mengupload...' : 'Tambah Foto'}
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  );
}
