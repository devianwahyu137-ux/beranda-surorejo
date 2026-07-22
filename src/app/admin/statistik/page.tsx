'use client';

import { useState, useEffect } from 'react';
import type { DemographicStat, VillageArea } from '@/types/db';
import { STAT_ICONS } from '@/lib/constants';

export default function AdminStatistikPage() {
  const [stats, setStats] = useState<DemographicStat[]>([]);
  const [areas, setAreas] = useState<VillageArea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, areasRes] = await Promise.all([
          fetch('/api/demographic-stat'),
          fetch('/api/village-area')
        ]);
        
        if (statsRes.ok) setStats(await statsRes.json());
        if (areasRes.ok) setAreas(await areasRes.json());
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center text-neutral-500">Memuat data...</div>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Kelola Data Statistik</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Kelola data demografi dan wilayah administratif desa yang ditampilkan di halaman beranda dan profil.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900">Demografi Desa</h2>
          <button className="text-sm px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Tambah Data
          </button>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-medium">Label</th>
                <th className="px-6 py-4 font-medium">Nilai</th>
                <th className="px-6 py-4 font-medium">Ikon</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {stats.map((stat) => (
                <tr key={stat.id} className="hover:bg-neutral-50/50">
                  <td className="px-6 py-4 font-medium">{stat.label}</td>
                  <td className="px-6 py-4">{stat.value}</td>
                  <td className="px-6 py-4">
                    <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={STAT_ICONS[stat.icon] || STAT_ICONS['users']} />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary-600 hover:text-primary-700 font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900">Wilayah Administratif</h2>
          <button className="text-sm px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Tambah Wilayah
          </button>
        </div>
        
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-medium">Nama Dusun</th>
                <th className="px-6 py-4 font-medium text-center">Jumlah RW</th>
                <th className="px-6 py-4 font-medium text-center">Jumlah RT</th>
                <th className="px-6 py-4 font-medium text-center">Populasi Jiwa</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {areas.map((area) => (
                <tr key={area.id} className="hover:bg-neutral-50/50">
                  <td className="px-6 py-4 font-medium">{area.dusun}</td>
                  <td className="px-6 py-4 text-center">{area.rw_count}</td>
                  <td className="px-6 py-4 text-center">{area.rt_count}</td>
                  <td className="px-6 py-4 text-center">{area.population}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary-600 hover:text-primary-700 font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
