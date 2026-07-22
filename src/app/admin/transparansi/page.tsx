'use client';

import { useState, useEffect } from 'react';

interface TransparencyDoc {
  id: string;
  title: string;
  doc_type: string;
  fiscal_year: number;
  file_url: string;
  description?: string;
  created_at: string;
}

const DOC_TYPES = [
  { value: 'apbdes', label: 'APBDes' },
  { value: 'rab', label: 'RAB Desa' },
  { value: 'realisasi', label: 'Realisasi APBDes' },
  { value: 'lpj', label: 'LPJ Keuangan' },
  { value: 'infografis', label: 'Infografis Keuangan' },
  { value: 'lainnya', label: 'Dokumen Lainnya' },
];

const DOC_TYPE_LABELS: Record<string, string> = Object.fromEntries(DOC_TYPES.map(d => [d.value, d.label]));

export default function AdminTransparansiPage() {
  const [docs, setDocs] = useState<TransparencyDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<TransparencyDoc>>({});
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => { fetchDocs(); }, []);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/transparency');
      setDocs(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file maksimal 10MB');
      return;
    }

    setUploadingFile(true);
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();

      const ext = file.name.split('.').pop() || 'pdf';
      const fileName = `transparansi/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('umkm-photos')
        .upload(fileName, file, { contentType: file.type });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('umkm-photos')
        .getPublicUrl(fileName);

      setEditForm({ ...editForm, file_url: urlData.publicUrl });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal mengupload file');
    } finally {
      setUploadingFile(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing === 'new' ? '/api/transparency' : `/api/transparency/${isEditing}`;
    const method = isEditing === 'new' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (res.ok) { setIsEditing(null); fetchDocs(); }
      else alert('Gagal menyimpan data');
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus dokumen ini?')) return;
    try {
      const res = await fetch(`/api/transparency/${id}`, { method: 'DELETE' });
      if (res.ok) fetchDocs();
    } catch (e) { console.error(e); }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Transparansi Keuangan</h1>
          <p className="text-sm text-neutral-500 mt-1">Kelola dokumen keuangan desa (APBDes, RAB, LPJ, dll)</p>
        </div>
        <button
          onClick={() => {
            setEditForm({ doc_type: 'apbdes', fiscal_year: currentYear });
            setIsEditing('new');
          }}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
        >
          + Tambah Dokumen
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-neutral-500">Loading...</div>
      ) : docs.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-neutral-200 rounded-xl">
          <p className="text-neutral-500">Belum ada dokumen transparansi.</p>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Judul Dokumen</th>
                  <th className="px-6 py-4 font-medium">Jenis</th>
                  <th className="px-6 py-4 font-medium text-center">Tahun Anggaran</th>
                  <th className="px-6 py-4 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {docs.map(doc => (
                  <tr key={doc.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-neutral-900">{doc.title}</p>
                      {doc.description && <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{doc.description}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-50 text-primary-700">
                        {DOC_TYPE_LABELS[doc.doc_type] || doc.doc_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-neutral-600 font-medium">{doc.fiscal_year}</td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      {doc.file_url && (
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium mr-3 hover:underline">Lihat</a>
                      )}
                      <button onClick={() => { setEditForm(doc); setIsEditing(doc.id); }} className="text-primary-600 text-sm font-medium mr-3">Edit</button>
                      <button onClick={() => handleDelete(doc.id)} className="text-red-600 text-sm font-medium">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{isEditing === 'new' ? 'Tambah' : 'Edit'} Dokumen</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Judul Dokumen</label>
                <input required type="text" value={editForm.title || ''} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="Contoh: APBDes Tahun 2024" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Jenis Dokumen</label>
                <select value={editForm.doc_type || 'apbdes'} onChange={e => setEditForm({ ...editForm, doc_type: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500">
                  {DOC_TYPES.map(dt => (
                    <option key={dt.value} value={dt.value}>{dt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Tahun Anggaran</label>
                <input required type="number" min={2020} max={2035} value={editForm.fiscal_year || currentYear} onChange={e => setEditForm({ ...editForm, fiscal_year: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Upload File (PDF / Gambar)</label>
                <div className="mt-1 flex flex-col gap-3">
                  <label className="cursor-pointer bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors text-center">
                    {uploadingFile ? 'Mengupload...' : 'Pilih File'}
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,image/*" className="hidden" disabled={uploadingFile} onChange={handleFileUpload} />
                  </label>
                  {editForm.file_url && !uploadingFile && (
                    <span className="text-sm text-green-600 font-medium flex items-center justify-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      File siap disimpan
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Deskripsi (Opsional)</label>
                <textarea rows={2} value={editForm.description || ''} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="Keterangan singkat tentang dokumen" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 text-neutral-600 font-medium hover:bg-neutral-100 rounded-lg">Batal</button>
                <button type="submit" disabled={!editForm.file_url} className="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
