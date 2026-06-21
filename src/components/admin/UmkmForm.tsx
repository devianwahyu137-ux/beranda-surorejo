'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';
import type { Umkm } from '@/types/db';

interface UmkmFormProps {
  umkm?: Umkm;
  mode: 'create' | 'edit';
}

export default function UmkmForm({ umkm, mode }: UmkmFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: umkm?.name || '',
    category: umkm?.category || 'kuliner',
    description: umkm?.description || '',
    whatsapp_number: umkm?.whatsapp_number || '',
    phone_number: umkm?.phone_number || '',
    address_text: umkm?.address_text || '',
    latitude: umkm?.latitude?.toString() || '',
    longitude: umkm?.longitude?.toString() || '',
    operating_hours: umkm?.operating_hours || '',
    is_published: umkm?.is_published || false,
    consent_given: umkm?.consent_given || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const body = {
      ...form,
      latitude: form.latitude ? parseFloat(form.latitude) : null,
      longitude: form.longitude ? parseFloat(form.longitude) : null,
      phone_number: form.phone_number || null,
    };

    try {
      const url = mode === 'create' ? '/api/umkm' : `/api/umkm/${umkm?.id}`;
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

      router.push('/admin/umkm');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Nama Usaha *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Kategori *
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Deskripsi
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* WhatsApp Number */}
      <div>
        <label htmlFor="whatsapp_number" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Nomor WhatsApp * <span className="text-neutral-400 font-normal">(contoh: 6281234567890)</span>
        </label>
        <input
          id="whatsapp_number"
          name="whatsapp_number"
          type="text"
          value={form.whatsapp_number}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Nomor Telepon <span className="text-neutral-400 font-normal">(opsional)</span>
        </label>
        <input
          id="phone_number"
          name="phone_number"
          type="text"
          value={form.phone_number}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address_text" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Alamat
        </label>
        <input
          id="address_text"
          name="address_text"
          type="text"
          value={form.address_text}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Latitude <span className="text-neutral-400 font-normal">(opsional)</span>
          </label>
          <input
            id="latitude"
            name="latitude"
            type="number"
            step="any"
            value={form.latitude}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Longitude <span className="text-neutral-400 font-normal">(opsional)</span>
          </label>
          <input
            id="longitude"
            name="longitude"
            type="number"
            step="any"
            value={form.longitude}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Operating Hours */}
      <div>
        <label htmlFor="operating_hours" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Jam Operasional
        </label>
        <input
          id="operating_hours"
          name="operating_hours"
          type="text"
          value={form.operating_hours}
          onChange={handleChange}
          placeholder="Senin - Sabtu, 08.00 - 17.00"
          className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Toggles */}
      <div className="space-y-3 pt-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent_given"
            checked={form.consent_given}
            onChange={handleChange}
            className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-neutral-700">
            Consent diberikan untuk publikasi data
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="is_published"
            checked={form.is_published}
            onChange={handleChange}
            className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-neutral-700">
            Publikasikan (tampil di halaman publik)
          </span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Menyimpan...' : mode === 'create' ? 'Tambah UMKM' : 'Simpan Perubahan'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
