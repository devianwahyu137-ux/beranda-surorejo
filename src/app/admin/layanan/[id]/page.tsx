'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import ServiceForm from '@/components/admin/ServiceForm';
import type { Service } from '@/types/db';

export default function EditServicePage() {
  const params = useParams();
  const id = params.id as string;
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchService = useCallback(async () => {
    const res = await fetch(`/api/service/${id}`);
    if (res.ok) {
      const data = await res.json();
      setService(data);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  if (loading) return <div className="text-neutral-400 py-8">Memuat...</div>;
  if (!service) return <div className="text-neutral-400 py-8">Layanan tidak ditemukan.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Edit Layanan: {service.title}</h1>
      <ServiceForm service={service} mode="edit" />
    </div>
  );
}
