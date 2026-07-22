import { createClient } from '@/lib/supabase/server';
import { LEGAL_CATEGORY_MAP } from '@/lib/constants';

export default async function AdminProdukHukumPage() {
  const supabase = await createClient();
  const { data: documents } = await supabase
    .from('legal_document')
    .select('*')
    .order('year', { ascending: false })
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Kelola Produk Hukum</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Tambah, edit, atau hapus Peraturan Desa dan SK Kepala Desa.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Dokumen
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-medium">Judul Dokumen</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium text-center">Tahun</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {documents?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                    Belum ada produk hukum. Klik tombol "Tambah Dokumen" untuk membuat baru.
                  </td>
                </tr>
              ) : (
                documents?.map((doc) => (
                  <tr key={doc.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900 truncate max-w-xs">
                        {doc.title}
                      </div>
                      {doc.document_number && (
                        <div className="text-xs text-neutral-500 mt-0.5">
                          No: {doc.document_number}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-full border border-neutral-200 whitespace-nowrap">
                        {LEGAL_CATEGORY_MAP[doc.category as keyof typeof LEGAL_CATEGORY_MAP] || doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-neutral-700 font-medium">
                      {doc.year}
                    </td>
                    <td className="px-6 py-4">
                      {doc.is_published ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Publik
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
                          Sembunyi
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors mr-2"
                        title="Edit dokumen"
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
