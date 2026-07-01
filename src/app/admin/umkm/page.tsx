'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { CATEGORY_MAP } from '@/lib/constants';
import { formatVerifiedDate, isStale } from '@/lib/freshness';
import { exportToCsv } from '@/lib/export';
import type { Umkm } from '@/types/db';

export default function AdminUmkmList() {
  const [umkmList, setUmkmList] = useState<Umkm[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showStale, setShowStale] = useState(false);

  const fetchUmkm = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (showStale) params.set('stale', 'true');

    const res = await fetch(`/api/umkm?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setUmkmList(data);
    }
    setLoading(false);
  }, [search, showStale]);

  useEffect(() => {
    fetchUmkm();
  }, [fetchUmkm]);

  const handleVerify = async (id: string) => {
    await fetch(`/api/umkm/${id}/verify`, { method: 'POST' });
    fetchUmkm();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus UMKM "${name}"? Data dan foto akan dihapus permanen.`)) return;
    await fetch(`/api/umkm/${id}`, { method: 'DELETE' });
    fetchUmkm();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Kelola UMKM</h1>
        <div className="flex gap-2">
          <button
            onClick={() => exportToCsv(`umkm-${new Date().toISOString().slice(0,10)}.csv`,
              umkmList.map(u => ({ nama: u.name, kategori: CATEGORY_MAP[u.category], status: u.is_published ? 'Tayang' : 'Draft', terakhir_diverifikasi: u.last_verified_at, wa: u.whatsapp_number, alamat: u.address_text || '' }))
            )}
            className="px-4 py-2.5 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-100 text-sm transition-colors"
          >
            ↓ Export CSV
          </button>
          <Link href="/admin/umkm/new" className="px-4 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-sm">
            + Tambah UMKM
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama UMKM..."
          className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <label className="flex items-center gap-2 cursor-pointer px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
          <input type="checkbox" checked={showStale} onChange={(e) => setShowStale(e.target.checked)} className="w-4 h-4 rounded border-neutral-300 text-primary-600" />
          <span className="text-neutral-600">Perlu verifikasi (&gt;90 hari)</span>
        </label>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-neutral-400 py-8 text-center">Memuat...</div>
      ) : umkmList.length === 0 ? (
        <div className="text-neutral-400 py-8 text-center">Belum ada UMKM.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Nama</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Kategori</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Terakhir Diverifikasi</th>
                <th className="text-right py-3 px-4 font-medium text-neutral-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {umkmList.map((umkm) => (
                <tr key={umkm.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium text-neutral-900">{umkm.name}</td>
                  <td className="py-3 px-4 text-neutral-600">{CATEGORY_MAP[umkm.category]}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${umkm.is_published ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                      {umkm.is_published ? 'Tayang' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={isStale(umkm.last_verified_at) ? 'text-amber-600 font-medium' : 'text-neutral-500'}>
                      {formatVerifiedDate(umkm.last_verified_at)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Link href={`/admin/umkm/${umkm.id}`} className="text-primary-600 hover:underline">Edit</Link>
                    <button onClick={() => handleVerify(umkm.id)} className="text-blue-600 hover:underline">Verify</button>
                    <button onClick={() => handleDelete(umkm.id, umkm.name)} className="text-red-600 hover:underline">Hapus</button>
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
