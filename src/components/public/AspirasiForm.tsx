'use client';

import { useState, type FormEvent } from 'react';
import ScrollReveal from './ScrollReveal';

const CATEGORIES = [
  { value: 'keluhan', label: 'Keluhan' },
  { value: 'saran', label: 'Saran' },
  { value: 'pertanyaan', label: 'Pertanyaan' },
  { value: 'informasi', label: 'Informasi' },
];

const RT_RW_OPTIONS = Array.from({ length: 28 }, (_, i) => {
  const rt = i + 1;
  const rw = Math.ceil(rt / 5);
  return `RT ${String(rt).padStart(2, '0')} / RW ${String(rw).padStart(2, '0')}`;
});

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const COOLDOWN_SECONDS = 30;

export default function AspirasiForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [honeypot, setHoneypot] = useState(''); // must stay empty

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Anti-spam: honeypot check (bots fill hidden fields)
    if (honeypot) return;

    // Anti-spam: cooldown between submissions
    const now = Date.now();
    const elapsed = (now - lastSubmitTime) / 1000;
    if (lastSubmitTime > 0 && elapsed < COOLDOWN_SECONDS) {
      const remaining = Math.ceil(COOLDOWN_SECONDS - elapsed);
      setErrorMsg(`Harap tunggu ${remaining} detik sebelum mengirim lagi.`);
      setFormState('error');
      return;
    }

    setFormState('submitting');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      rt_rw: formData.get('rt_rw') as string,
      phone: (formData.get('phone') as string) || null,
      category: formData.get('category') as string,
      subject: formData.get('subject') as string,
      body: formData.get('body') as string,
    };

    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Gagal mengirim pesan');
      }

      setLastSubmitTime(Date.now());
      setFormState('success');
      (e.target as HTMLFormElement).reset();
      setHoneypot('');

      // Reset to idle after 5 seconds
      setTimeout(() => setFormState('idle'), 5000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Terjadi kesalahan');
      setFormState('error');
    }
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50/30" id="aspirasi">
      <div className="container-page">
        <ScrollReveal className="text-center mb-10">
          <span className="inline-block text-sm font-medium text-primary-600 bg-primary-100 px-3 py-1 rounded-full mb-3">
            Suara Warga
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
            Sampaikan Aspirasi Anda
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Punya keluhan, saran, atau pertanyaan? Sampaikan langsung ke perangkat desa melalui formulir di bawah ini.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            {formState === 'success' ? (
              <div className="bg-white rounded-2xl border border-primary-200 p-8 md:p-12 text-center shadow-sm animate-fade-in">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-checkmark">
                  <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Pesan Terkirim!</h3>
                <p className="text-neutral-500">
                  Terima kasih atas aspirasi Anda. Perangkat desa akan menindaklanjuti pesan Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm space-y-5">
                {/* Honeypot anti-spam field — hidden from humans, visible to bots */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                  <input
                    type="text"
                    name="website"
                    autoComplete="off"
                    tabIndex={-1}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Row: Name + RT/RW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="aspirasi-name" className="form-label">
                      Nama Lengkap <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="aspirasi-name"
                      name="name"
                      required
                      className="form-input"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  <div>
                    <label htmlFor="aspirasi-rtrw" className="form-label">
                      RT / RW <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="aspirasi-rtrw"
                      name="rt_rw"
                      required
                      className="form-input form-select"
                      defaultValue=""
                    >
                      <option value="" disabled>Pilih RT/RW</option>
                      {RT_RW_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row: Phone + Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="aspirasi-phone" className="form-label">
                      No. HP / WhatsApp <span className="text-neutral-400 text-xs">(opsional)</span>
                    </label>
                    <input
                      type="tel"
                      id="aspirasi-phone"
                      name="phone"
                      className="form-input"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label htmlFor="aspirasi-category" className="form-label">
                      Kategori <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="aspirasi-category"
                      name="category"
                      required
                      className="form-input form-select"
                      defaultValue=""
                    >
                      <option value="" disabled>Pilih kategori</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="aspirasi-subject" className="form-label">
                    Judul Pesan <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="aspirasi-subject"
                    name="subject"
                    required
                    className="form-input"
                    placeholder="Ringkasan singkat aspirasi Anda"
                  />
                </div>

                {/* Body */}
                <div>
                  <label htmlFor="aspirasi-body" className="form-label">
                    Isi Pesan <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="aspirasi-body"
                    name="body"
                    required
                    rows={4}
                    className="form-input resize-y min-h-[120px]"
                    placeholder="Tuliskan aspirasi, keluhan, saran, atau pertanyaan Anda secara detail..."
                  />
                </div>

                {/* Error message */}
                {formState === 'error' && (
                  <div className="bg-red-50 text-red-700 text-sm rounded-xl px-4 py-3 border border-red-200 animate-slide-down">
                    {errorMsg || 'Terjadi kesalahan. Silakan coba lagi.'}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed touch-target"
                >
                  {formState === 'submitting' ? (
                    <>
                      <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                      Kirim Aspirasi
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
