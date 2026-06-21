'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Service } from '@/types/db';

interface ServiceFormProps {
  service?: Service;
  mode: 'create' | 'edit';
}

export default function ServiceForm({ service, mode }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: service?.title || '',
    requirements: service?.requirements || '',
    steps: service?.steps || '',
    hours: service?.hours || '',
    contact: service?.contact || '',
    form_url: service?.form_url || '',
    sort_order: service?.sort_order?.toString() || '0',
    is_published: service?.is_published || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const body = {
      ...form,
      sort_order: parseInt(form.sort_order) || 0,
      requirements: form.requirements || null,
      steps: form.steps || null,
      hours: form.hours || null,
      contact: form.contact || null,
      form_url: form.form_url || null,
    };

    try {
      const url = mode === 'create' ? '/api/service' : `/api/service/${service?.id}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal menyimpan.');
      }

      router.push('/admin/layanan');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Judul Layanan *
        </label>
        <input id="title" name="title" type="text" value={form.title} onChange={handleChange} required className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
      </div>

      <div>
        <label htmlFor="requirements" className="block text-sm font-medium text-neutral-700 mb-1.5">Persyaratan</label>
        <textarea id="requirements" name="requirements" value={form.requirements} onChange={handleChange} rows={5} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Satu persyaratan per baris..." />
      </div>

      <div>
        <label htmlFor="steps" className="block text-sm font-medium text-neutral-700 mb-1.5">Langkah / Prosedur</label>
        <textarea id="steps" name="steps" value={form.steps} onChange={handleChange} rows={5} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Satu langkah per baris..." />
      </div>

      <div>
        <label htmlFor="hours" className="block text-sm font-medium text-neutral-700 mb-1.5">Jam Pelayanan</label>
        <input id="hours" name="hours" type="text" value={form.hours} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-neutral-700 mb-1.5">Kontak</label>
        <input id="contact" name="contact" type="text" value={form.contact} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
      </div>

      <div>
        <label htmlFor="form_url" className="block text-sm font-medium text-neutral-700 mb-1.5">URL Formulir <span className="text-neutral-400 font-normal">(opsional)</span></label>
        <input id="form_url" name="form_url" type="url" value={form.form_url} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
      </div>

      <div>
        <label htmlFor="sort_order" className="block text-sm font-medium text-neutral-700 mb-1.5">Urutan Tampil</label>
        <input id="sort_order" name="sort_order" type="number" value={form.sort_order} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
        <span className="text-sm text-neutral-700">Publikasikan</span>
      </label>

      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={loading} className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors">
          {loading ? 'Menyimpan...' : mode === 'create' ? 'Tambah Layanan' : 'Simpan Perubahan'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors">
          Batal
        </button>
      </div>
    </form>
  );
}
