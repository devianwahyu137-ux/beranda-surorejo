import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { Message } from '@/types/db';
import ExportButton from '@/components/admin/ExportButton';

export const metadata = {
  title: 'Kelola Pesan | Admin',
};

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  keluhan: { label: 'Keluhan', color: 'bg-red-100 text-red-700' },
  saran: { label: 'Saran', color: 'bg-blue-100 text-blue-700' },
  pertanyaan: { label: 'Pertanyaan', color: 'bg-amber-100 text-amber-700' },
  informasi: { label: 'Informasi', color: 'bg-green-100 text-green-700' },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function AdminPesanPage() {
  const supabase = await createClient();

  const { data: messages } = await supabase
    .from('message')
    .select('*')
    .order('created_at', { ascending: false });

  const allMessages = (messages || []) as Message[];
  const unreadCount = allMessages.filter((m) => !m.is_read).length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Pesan Masuk</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {allMessages.length} pesan total · {unreadCount} belum dibaca
          </p>
        </div>
        <ExportButton
          filename={`pesan-${new Date().toISOString().slice(0,10)}.csv`}
          data={allMessages.map(m => ({ nama: m.name, rt_rw: m.rt_rw, hp: m.phone || '', kategori: m.category, judul: m.subject, isi: m.body, dibaca: m.is_read ? 'Ya' : 'Tidak', tanggal: m.created_at }))}
        />
      </div>

      {allMessages.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center shadow-sm">
          <svg className="w-12 h-12 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <p className="text-neutral-500">Belum ada pesan masuk.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {allMessages.map((msg) => {
            const cat = CATEGORY_LABELS[msg.category] || { label: msg.category, color: 'bg-neutral-100 text-neutral-700' };
            return (
              <Link
                key={msg.id}
                href={`/admin/pesan/${msg.id}`}
                className={`block bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-all duration-200 ${
                  !msg.is_read ? 'border-primary-200 bg-primary-50/30' : 'border-neutral-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.is_read && (
                        <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                      )}
                      <h3 className={`font-semibold text-neutral-900 truncate ${!msg.is_read ? 'text-primary-900' : ''}`}>
                        {msg.subject}
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-500 line-clamp-1 mb-2">{msg.body}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded-full font-medium ${cat.color}`}>
                        {cat.label}
                      </span>
                      <span className="text-neutral-400">dari</span>
                      <span className="font-medium text-neutral-700">{msg.name}</span>
                      <span className="text-neutral-300">·</span>
                      <span className="text-neutral-400">{msg.rt_rw}</span>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 whitespace-nowrap flex-shrink-0">
                    {formatDate(msg.created_at)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
