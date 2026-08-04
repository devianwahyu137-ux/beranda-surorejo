'use client';

import { useState, useEffect } from 'react';
import type { Event } from '@/types/db';

export default function AdminAgendaPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Event>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/event');
      const data = await res.json();
      if (Array.isArray(data)) {
        setEvents(data);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = isEditing === 'new' ? '/api/event' : `/api/event/${isEditing}`;
    const method = isEditing === 'new' ? 'POST' : 'PUT';

    // Format event_date to valid timestamptz if necessary
    let eventDate = editForm.event_date || new Date().toISOString();
    if (!eventDate.includes('T')) {
      eventDate = `${eventDate}T08:00:00.000Z`;
    }

    const payload = {
      title: editForm.title || '',
      location: editForm.location || '',
      description: editForm.description || '',
      event_date: eventDate,
      is_published: editForm.is_published ?? true,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsEditing(null);
        setEditForm({});
        await fetchEvents();
      } else {
        const err = await res.json();
        alert(`Gagal menyimpan data: ${err.error || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan data karena kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus agenda kegiatan ini?')) return;
    try {
      const res = await fetch(`/api/event/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchEvents();
      } else {
        alert('Gagal menghapus data.');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menghapus data.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-neutral-500">Memuat data agenda...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Kelola Agenda Kegiatan</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Kelola jadwal acara, musyawarah, dan kegiatan penting di Desa Surorejo.
          </p>
        </div>
        <button
          onClick={() => {
            setEditForm({
              is_published: true,
              event_date: new Date().toISOString().split('T')[0],
            });
            setIsEditing('new');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-sm active:scale-95 touch-target"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Agenda
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-neutral-600 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-medium">Kegiatan</th>
                <th className="px-6 py-4 font-medium">Tanggal Mulai</th>
                <th className="px-6 py-4 font-medium">Lokasi</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-400 font-medium">
                    Belum ada agenda kegiatan. Klik tombol &ldquo;Tambah Agenda&rdquo; untuk membuat baru.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-neutral-900 max-w-xs md:max-w-md truncate">
                        {event.title}
                      </div>
                      {event.description && (
                        <div className="text-xs text-neutral-500 max-w-xs md:max-w-md truncate mt-0.5">
                          {event.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-neutral-700">
                      {new Date(event.event_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {event.location || '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.is_published
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {event.is_published ? 'Aktif' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditForm({
                            title: event.title,
                            location: event.location,
                            description: event.description,
                            event_date: event.event_date ? event.event_date.split('T')[0] : '',
                            is_published: event.is_published,
                          });
                          setIsEditing(event.id);
                        }}
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-primary-600 font-semibold hover:bg-primary-50 transition-colors text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-red-600 font-semibold hover:bg-red-50 transition-colors text-xs"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isEditing && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto border border-neutral-100">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
              <h2 className="text-xl font-bold text-neutral-900">
                {isEditing === 'new' ? 'Tambah Agenda Baru' : 'Edit Agenda'}
              </h2>
              <button
                onClick={() => setIsEditing(null)}
                className="text-neutral-400 hover:text-neutral-600 p-1 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">
                  Nama Kegiatan <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Musyawarah Desa (Musdes)"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">
                  Tanggal Kegiatan <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="date"
                  value={editForm.event_date ? editForm.event_date.split('T')[0] : ''}
                  onChange={(e) => setEditForm({ ...editForm, event_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">
                  Lokasi <span className="text-neutral-400 font-normal">(opsional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Balai Desa Surorejo"
                  value={editForm.location || ''}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1">
                  Deskripsi / Keterangan <span className="text-neutral-400 font-normal">(opsional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan detail kegiatan, undangan, atau perlengkapan yang perlu dibawa..."
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-600 text-sm font-medium text-neutral-900 transition-all"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  id="is_published"
                  type="checkbox"
                  checked={editForm.is_published ?? true}
                  onChange={(e) => setEditForm({ ...editForm, is_published: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-neutral-700 cursor-pointer">
                  Tampilkan di situs web (Aktif)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-5 border-t border-neutral-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-600 font-medium text-sm hover:bg-neutral-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm shadow-sm transition-all disabled:opacity-50"
                >
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
