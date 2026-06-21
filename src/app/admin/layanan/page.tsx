'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { formatVerifiedDate, isStale } from '@/lib/freshness';
import type { Service } from '@/types/db';

export default function AdminLayananList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/service');
    if (res.ok) {
      const data = await res.json();
      setServices(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleVerify = async (id: string) => {
    await fetch(`/api/service/${id}/verify`, { method: 'POST' });
    fetchServices();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus layanan "${title}"?`)) return;
    await fetch(`/api/service/${id}`, { method: 'DELETE' });
    fetchServices();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Kelola Layanan</h1>
        <Link href="/admin/layanan/new" className="px-4 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-sm">
          + Tambah Layanan
        </Link>
      </div>

      {loading ? (
        <div className="text-neutral-400 py-8 text-center">Memuat...</div>
      ) : services.length === 0 ? (
        <div className="text-neutral-400 py-8 text-center">Belum ada layanan.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Judul</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Urutan</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Diverifikasi</th>
                <th className="text-right py-3 px-4 font-medium text-neutral-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium text-neutral-900">{svc.title}</td>
                  <td className="py-3 px-4 text-neutral-500">{svc.sort_order}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${svc.is_published ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                      {svc.is_published ? 'Tayang' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={isStale(svc.last_verified_at) ? 'text-amber-600 font-medium' : 'text-neutral-500'}>
                      {formatVerifiedDate(svc.last_verified_at)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Link href={`/admin/layanan/${svc.id}`} className="text-primary-600 hover:underline">Edit</Link>
                    <button onClick={() => handleVerify(svc.id)} className="text-blue-600 hover:underline">Verify</button>
                    <button onClick={() => handleDelete(svc.id, svc.title)} className="text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
