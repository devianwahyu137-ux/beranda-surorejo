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

      // Reset to idle after 6 seconds
      setTimeout(() => setFormState('idle'), 6000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Terjadi kesalahan');
      setFormState('error');
    }
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-neutral-50 via-white to-primary-50/20 relative" id="aspirasi">
      <div className="container-page">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary-700 bg-primary-50 px-3.5 py-1 rounded-full mb-3 border border-primary-100 shadow-sm">
            Suara Warga
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-3 tracking-tight">
            Sampaikan Aspirasi Anda
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-base">
            Punya keluhan, saran, atau pertanyaan? Sampaikan langsung ke perangkat desa melalui formulir di bawah ini.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            {formState === 'success' ? (
              /* Rich Celebration Confetti Success Box */
              <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white rounded-3xl border border-primary-400/50 p-8 sm:p-14 text-center shadow-[0_20px_50px_rgba(22,163,74,0.25)] relative overflow-hidden animate-checkmark">
                {/* Radiating Light Ring & Confetti Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full animate-ping pointer-events-none duration-1000" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-400/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce">
                    <svg className="w-10 h-10 stroke-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight drop-shadow">Aspirasi Berhasil Terkirim! 🎉</h3>
                  <p className="text-primary-100 max-w-md mx-auto text-base sm:text-lg font-normal leading-relaxed">
                    Terima kasih atas kepedulian Anda! Perangkat Desa Surorejo akan segera mempelajari dan menindaklanjuti pesan Anda.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_50px_rgba(22,163,74,0.07)] transition-all duration-500 space-y-6 relative overflow-hidden">
                {/* Decorative gradient top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500" />

                {/* Honeypot anti-spam field — hidden from humans */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label htmlFor="aspirasi-name" className="form-label font-semibold text-neutral-800 text-sm">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="aspirasi-name"
                      name="name"
                      required
                      className="form-input focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all rounded-xl"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  <div>
                    <label htmlFor="aspirasi-rtrw" className="form-label font-semibold text-neutral-800 text-sm">
                      RT / RW <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="aspirasi-rtrw"
                      name="rt_rw"
                      required
                      className="form-input form-select focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all rounded-xl"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="aspirasi-phone" className="form-label font-semibold text-neutral-800 text-sm">
                      No. HP / WhatsApp <span className="text-neutral-400 text-xs font-normal">(opsional)</span>
                    </label>
                    <input
                      type="tel"
                      id="aspirasi-phone"
                      name="phone"
                      className="form-input focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all rounded-xl"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label htmlFor="aspirasi-category" className="form-label font-semibold text-neutral-800 text-sm">
                      Kategori <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="aspirasi-category"
                      name="category"
                      required
                      className="form-input form-select focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all rounded-xl"
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
                  <label htmlFor="aspirasi-subject" className="form-label font-semibold text-neutral-800 text-sm">
                    Judul Pesan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="aspirasi-subject"
                    name="subject"
                    required
                    className="form-input focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all rounded-xl"
                    placeholder="Ringkasan singkat aspirasi Anda"
                  />
                </div>

                {/* Body */}
                <div>
                  <label htmlFor="aspirasi-body" className="form-label font-semibold text-neutral-800 text-sm">
                    Isi Pesan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="aspirasi-body"
                    name="body"
                    required
                    rows={4}
                    className="form-input resize-y min-h-[120px] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all rounded-xl"
                    placeholder="Tuliskan aspirasi, keluhan, saran, atau pertanyaan Anda secara jelas dan detail..."
                  />
                </div>

                {/* Error message */}
                {formState === 'error' && (
                  <div className="bg-red-50 text-red-700 text-sm rounded-xl px-5 py-3.5 border border-red-200 animate-slide-down font-medium">
                    {errorMsg || 'Terjadi kesalahan. Silakan coba lagi.'}
                  </div>
                )}

                {/* Submit glowing CTA button */}
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(22,163,74,0.3)] hover:shadow-[0_8px_30px_rgba(22,163,74,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed touch-target text-base"
                >
                  {formState === 'submitting' ? (
                    <>
                      <svg className="w-5 h-5 mr-2.5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Mengirimkan...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                      Kirim Aspirasi Sekarang
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
