'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import UmkmForm from '@/components/admin/UmkmForm';
import PhotoUploader from '@/components/admin/PhotoUploader';
import type { Umkm, UmkmPhoto } from '@/types/db';

export default function EditUmkmPage() {
  const params = useParams();
  const id = params.id as string;
  const [umkm, setUmkm] = useState<(Umkm & { umkm_photo: UmkmPhoto[] }) | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUmkm = useCallback(async () => {
    const res = await fetch(`/api/umkm/${id}`);
    if (res.ok) {
      const data = await res.json();
      setUmkm(data);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchUmkm();
  }, [fetchUmkm]);

  if (loading) {
    return <div className="text-neutral-400 py-8">Memuat...</div>;
  }

  if (!umkm) {
    return <div className="text-neutral-400 py-8">UMKM tidak ditemukan.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Edit UMKM: {umkm.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UmkmForm umkm={umkm} mode="edit" />
        </div>
        <div>
          <PhotoUploader
            umkmId={umkm.id}
            photos={umkm.umkm_photo || []}
            onUpdate={fetchUmkm}
          />
        </div>
      </div>
    </div>
  );
}
