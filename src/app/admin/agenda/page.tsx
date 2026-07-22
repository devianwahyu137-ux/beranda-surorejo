import { createClient } from '@/lib/supabase/server';

export default async function AdminAgendaPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from('event')
    .select('*')
    .order('start_date', { ascending: false });

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
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
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
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {events?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                    Belum ada agenda kegiatan. Klik tombol "Tambah Agenda" untuk membuat baru.
                  </td>
                </tr>
              ) : (
                events?.map((event) => (
                  <tr key={event.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900 truncate max-w-xs md:max-w-md">
                        {event.title}
                      </div>
                      {event.time && (
                        <div className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-neutral-700">
                      {new Date(event.start_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {event.location || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
                        title="Edit kegiatan"
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
