import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { STALE_DAYS } from '@/lib/constants';
import { formatVerifiedDate } from '@/lib/freshness';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Count stats
  const { count: totalUmkm } = await supabase
    .from('umkm')
    .select('*', { count: 'exact', head: true });

  const { count: publishedUmkm } = await supabase
    .from('umkm')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true);

  const { count: totalServices } = await supabase
    .from('service')
    .select('*', { count: 'exact', head: true });

  const { count: publishedServices } = await supabase
    .from('service')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true);

  // Message stats
  const { count: totalMessages } = await supabase
    .from('message')
    .select('*', { count: 'exact', head: true });

  const { count: unreadMessages } = await supabase
    .from('message')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false);

  // Stale content
  const staleDate = new Date();
  staleDate.setDate(staleDate.getDate() - STALE_DAYS);

  const { data: staleUmkm } = await supabase
    .from('umkm')
    .select('id, name, last_verified_at')
    .lt('last_verified_at', staleDate.toISOString())
    .order('last_verified_at', { ascending: true });

  const { data: staleServices } = await supabase
    .from('service')
    .select('id, title, last_verified_at')
    .lt('last_verified_at', staleDate.toISOString())
    .order('last_verified_at', { ascending: true });

  const staleCount = (staleUmkm?.length || 0) + (staleServices?.length || 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Dashboard Admin</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500">Total UMKM</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{totalUmkm || 0}</p>
          <p className="text-xs text-neutral-400 mt-0.5">{publishedUmkm || 0} tayang</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500">Total Layanan</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{totalServices || 0}</p>
          <p className="text-xs text-neutral-400 mt-0.5">{publishedServices || 0} tayang</p>
        </div>
        <div className={`rounded-xl p-5 border shadow-sm ${(unreadMessages || 0) > 0 ? 'bg-primary-50 border-primary-200' : 'bg-white border-neutral-200'}`}>
          <p className="text-sm text-neutral-500">Pesan Masuk</p>
          <p className={`text-2xl font-bold mt-1 ${(unreadMessages || 0) > 0 ? 'text-primary-700' : 'text-neutral-900'}`}>
            {totalMessages || 0}
          </p>
          <p className="text-xs text-neutral-400 mt-0.5">{unreadMessages || 0} belum dibaca</p>
        </div>
        <div className={`rounded-xl p-5 border shadow-sm ${staleCount > 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-neutral-200'}`}>
          <p className="text-sm text-neutral-500">Perlu Verifikasi</p>
          <p className={`text-2xl font-bold mt-1 ${staleCount > 0 ? 'text-amber-700' : 'text-neutral-900'}`}>
            {staleCount}
          </p>
          <p className="text-xs text-neutral-400 mt-0.5">&gt;{STALE_DAYS} hari</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500">Halaman</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">2</p>
          <p className="text-xs text-neutral-400 mt-0.5">profil, kontak</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/admin/umkm" className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-neutral-800">Kelola UMKM</h2>
          <p className="text-sm text-neutral-500 mt-1">Tambah, edit, hapus data UMKM</p>
        </Link>
        <Link href="/admin/layanan" className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-neutral-800">Kelola Layanan</h2>
          <p className="text-sm text-neutral-500 mt-1">Kelola layanan administrasi desa</p>
        </Link>
        <Link href="/admin/halaman" className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold text-neutral-800">Kelola Halaman</h2>
          <p className="text-sm text-neutral-500 mt-1">Edit profil dan kontak desa</p>
        </Link>
        <Link href="/admin/pesan" className={`rounded-xl p-6 shadow-sm border transition-shadow hover:shadow-md ${(unreadMessages || 0) > 0 ? 'bg-primary-50 border-primary-200' : 'bg-white border-neutral-200'}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-800">Pesan Warga</h2>
            {(unreadMessages || 0) > 0 && (
              <span className="bg-primary-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadMessages}
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-500 mt-1">Aspirasi dan keluhan warga</p>
        </Link>
      </div>

      {/* Stale Content */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">
          Perlu Verifikasi (&gt;{STALE_DAYS} hari)
        </h2>

        {staleCount === 0 ? (
          <p className="text-neutral-400 text-sm">Semua konten sudah diverifikasi baru-baru ini. ✓</p>
        ) : (
          <div className="space-y-2">
            {staleUmkm?.map((u) => (
              <Link
                key={u.id}
                href={`/admin/umkm/${u.id}`}
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors"
              >
                <div>
                  <span className="text-xs text-amber-600 font-medium mr-2">UMKM</span>
                  <span className="text-sm font-medium text-neutral-800">{u.name}</span>
                </div>
                <span className="text-xs text-amber-600">
                  {formatVerifiedDate(u.last_verified_at)}
                </span>
              </Link>
            ))}
            {staleServices?.map((s) => (
              <Link
                key={s.id}
                href={`/admin/layanan/${s.id}`}
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors"
              >
                <div>
                  <span className="text-xs text-amber-600 font-medium mr-2">Layanan</span>
                  <span className="text-sm font-medium text-neutral-800">{s.title}</span>
                </div>
                <span className="text-xs text-amber-600">
                  {formatVerifiedDate(s.last_verified_at)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
