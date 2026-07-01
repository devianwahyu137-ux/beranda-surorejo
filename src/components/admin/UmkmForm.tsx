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

  const parseInitialOpHours = () => {
    if (!umkm?.operating_hours) return { preset: 'Setiap Hari', custom: [], is24: false, open: '08:00', close: '17:00' };
    const parts = umkm.operating_hours.split(', ');
    const daysStr = parts[0] || 'Setiap Hari';
    const timeStr = parts[1] || '08:00 - 17:00';
    
    let preset = 'custom';
    let custom = daysStr.split(', ');
    if (['Setiap Hari', 'Senin - Jumat', 'Senin - Sabtu'].includes(daysStr)) {
      preset = daysStr;
      custom = [];
    }

    const is24 = timeStr.toLowerCase().includes('24 jam');
    let open = '08:00';
    let close = '17:00';
    if (!is24 && timeStr.includes(' - ')) {
      const timeParts = timeStr.split(' - ');
      open = timeParts[0] || '08:00';
      close = timeParts[1] || '17:00';
    }
    return { preset, custom, is24, open, close };
  };

  const initialOp = parseInitialOpHours();
  const [dayPreset, setDayPreset] = useState(initialOp.preset);
  const [customDays, setCustomDays] = useState<string[]>(initialOp.custom);
  const [is24Hours, setIs24Hours] = useState(initialOp.is24);
  const [openTime, setOpenTime] = useState(initialOp.open);
  const [closeTime, setCloseTime] = useState(initialOp.close);

  const DAYS_OF_WEEK = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const [form, setForm] = useState({
    name: umkm?.name || '',
    category: umkm?.category || 'kuliner',
    description: umkm?.description || '',
    whatsapp_number: umkm?.whatsapp_number || '',
    phone_number: umkm?.phone_number || '',
    address_text: umkm?.address_text || '',
    latitude: umkm?.latitude?.toString() || '',
    longitude: umkm?.longitude?.toString() || '',
    is_published: umkm?.is_published || false,
    consent_given: umkm?.consent_given || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const finalDays = dayPreset === 'custom' ? customDays.join(', ') || 'Setiap Hari' : dayPreset;
    const finalTime = is24Hours ? '24 Jam' : `${openTime} - ${closeTime}`;
    const finalOperatingHours = `${finalDays}, ${finalTime}`;

    const body = {
      ...form,
      operating_hours: finalOperatingHours,
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

      {/* Advanced Operating Hours UI */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-neutral-900">Jam Operasional</h3>
        
        {/* Hari */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">
            Hari Buka
          </label>
          <select 
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 bg-neutral-50 mb-3"
            value={dayPreset}
            onChange={(e) => setDayPreset(e.target.value)}
          >
            <option value="Setiap Hari">Setiap Hari</option>
            <option value="Senin - Jumat">Senin - Jumat</option>
            <option value="Senin - Sabtu">Senin - Sabtu</option>
            <option value="custom">Pilih Hari Tertentu...</option>
          </select>

          {dayPreset === 'custom' && (
            <div className="flex flex-wrap gap-2 mt-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              {DAYS_OF_WEEK.map((day) => (
                <label key={day} className="flex items-center gap-2 text-sm bg-white border border-neutral-200 px-3 py-1.5 rounded-md cursor-pointer hover:bg-neutral-50">
                  <input
                    type="checkbox"
                    checked={customDays.includes(day)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCustomDays((prev) => [...prev, day]);
                      } else {
                        setCustomDays((prev) => prev.filter((d) => d !== day));
                      }
                    }}
                    className="w-4 h-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
                  />
                  {day}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Jam */}
        <div className="pt-2 border-t border-neutral-100">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Waktu Buka
          </label>
          
          <div className="flex items-center gap-3 mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={is24Hours}
                onChange={(e) => setIs24Hours(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded border-neutral-300 focus:ring-primary-500"
              />
              Buka 24 Jam
            </label>
          </div>

          {!is24Hours && (
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-xs text-neutral-500 mb-1">Jam Buka</label>
                <input
                  type="time"
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 bg-white"
                />
              </div>
              <span className="text-neutral-400 mt-5">-</span>
              <div className="flex-1">
                <label className="block text-xs text-neutral-500 mb-1">Jam Tutup</label>
                <input
                  type="time"
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 bg-white"
                />
              </div>
            </div>
          )}
        </div>
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
