import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Message } from '@/types/db';
import MessageActions from './MessageActions';

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  keluhan: { label: 'Keluhan', color: 'bg-red-100 text-red-700' },
  saran: { label: 'Saran', color: 'bg-blue-100 text-blue-700' },
  pertanyaan: { label: 'Pertanyaan', color: 'bg-amber-100 text-amber-700' },
  informasi: { label: 'Informasi', color: 'bg-green-100 text-green-700' },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MessageDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: message } = await supabase
    .from('message')
    .select('*')
    .eq('id', id)
    .single();

  if (!message) notFound();

  const msg = message as Message;
  const cat = CATEGORY_LABELS[msg.category] || { label: msg.category, color: 'bg-neutral-100 text-neutral-700' };

  // Mark as read if not already
  if (!msg.is_read) {
    await supabase.from('message').update({ is_read: true }).eq('id', id);
  }

  return (
    <div>
      <Link
        href="/admin/pesan"
        className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-700 mb-6 transition-colors"
      >
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke daftar pesan
      </Link>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-neutral-100">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
            <h1 className="text-xl font-bold text-neutral-900">{msg.subject}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${cat.color} flex-shrink-0`}>
              {cat.label}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-neutral-400 block text-xs mb-0.5">Pengirim</span>
              <span className="font-medium text-neutral-900">{msg.name}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-xs mb-0.5">RT/RW</span>
              <span className="font-medium text-neutral-900">{msg.rt_rw}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-xs mb-0.5">No. HP</span>
              <span className="font-medium text-neutral-900">{msg.phone || '-'}</span>
            </div>
          </div>

          <div className="mt-3 text-xs text-neutral-400">
            Dikirim pada {formatDate(msg.created_at)}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-neutral-700 leading-relaxed whitespace-pre-line">{msg.body}</p>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-neutral-100 bg-neutral-50">
          <MessageActions messageId={msg.id} phone={msg.phone} name={msg.name} />
        </div>
      </div>
    </div>
  );
}
