'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface MessageActionsProps {
  messageId: string;
  phone: string | null;
  name: string;
}

export default function MessageActions({ messageId, phone, name }: MessageActionsProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Hapus pesan ini? Tindakan ini tidak dapat dibatalkan.`)) return;
    setDeleting(true);

    const res = await fetch(`/api/message/${messageId}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/admin/pesan');
      router.refresh();
    } else {
      alert('Gagal menghapus pesan');
      setDeleting(false);
    }
  }

  const waNumber = phone?.replace(/\D/g, '').replace(/^0/, '62');
  const waLink = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo ${name}, terima kasih sudah mengirimkan aspirasi ke Desa Surorejo. `)}`
    : null;

  return (
    <div className="flex flex-wrap gap-3">
      {waLink && (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-[#25d366] hover:bg-[#128c7e] text-white text-sm font-medium rounded-lg transition-colors touch-target"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Balas via WhatsApp
        </a>
      )}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="inline-flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 touch-target"
      >
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        {deleting ? 'Menghapus...' : 'Hapus Pesan'}
      </button>
    </div>
  );
}
