import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';

export default async function AdminLembagaPage() {
  const supabase = await createClient();
  const { data: lembagaList } = await supabase
    .from('lembaga')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Kelola Lembaga Masyarakat</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Kelola data lembaga desa seperti BPD, LPMD, Karang Taruna, dll.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Lembaga
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-medium w-16 text-center">Urutan</th>
                <th className="px-6 py-4 font-medium w-24 text-center">Logo</th>
                <th className="px-6 py-4 font-medium">Nama Lembaga</th>
                <th className="px-6 py-4 font-medium">Ketua</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {lembagaList?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                    Belum ada data lembaga. Klik tombol "Tambah Lembaga" untuk membuat baru.
                  </td>
                </tr>
              ) : (
                lembagaList?.map((lembaga) => (
                  <tr key={lembaga.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4 text-center text-neutral-500 font-medium">
                      {lembaga.sort_order}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {lembaga.logo_url ? (
                        <div className="relative w-10 h-10 mx-auto rounded-full overflow-hidden border border-neutral-200 bg-white">
                          <Image src={lembaga.logo_url} alt={lembaga.name} fill className="object-contain p-1" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 mx-auto rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-neutral-900">{lembaga.name}</div>
                      {lembaga.description && (
                        <div className="text-xs text-neutral-500 truncate max-w-xs mt-0.5">
                          {lembaga.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-neutral-700">
                      {lembaga.head_name || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
                        title="Edit lembaga"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
