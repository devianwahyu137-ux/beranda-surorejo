'use client';

import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

interface TransparencyDoc {
  id: string;
  title: string;
  doc_type: string;
  fiscal_year: number;
  file_url: string;
  description?: string;
  created_at: string;
}

const DOC_TYPE_LABELS: Record<string, string> = {
  apbdes: 'APBDes',
  rab: 'RAB Desa',
  realisasi: 'Realisasi APBDes',
  lpj: 'LPJ Keuangan',
  infografis: 'Infografis Keuangan',
  lainnya: 'Dokumen Lainnya',
};

const DOC_TYPE_COLORS: Record<string, string> = {
  apbdes: 'bg-blue-100 text-blue-700',
  rab: 'bg-emerald-100 text-emerald-700',
  realisasi: 'bg-amber-100 text-amber-700',
  lpj: 'bg-purple-100 text-purple-700',
  infografis: 'bg-pink-100 text-pink-700',
  lainnya: 'bg-neutral-100 text-neutral-700',
};

export default function TransparencySection() {
  const [docs, setDocs] = useState<TransparencyDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/transparency')
      .then(res => res.json())
      .then(data => {
        setDocs(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const years = [...new Set(docs.map(d => d.fiscal_year))].sort((a, b) => b - a);
  const filteredDocs = selectedYear ? docs.filter(d => d.fiscal_year === selectedYear) : docs;

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900">Transparansi Keuangan Desa</h3>
            <p className="text-sm text-neutral-500">Dokumen keuangan desa yang dapat diunduh oleh masyarakat.</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Year Filter */}
      {years.length > 0 && (
        <ScrollReveal>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedYear(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedYear === null
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Semua Tahun
            </button>
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedYear === year
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Document List */}
      {loading ? (
        <div className="py-12 text-center text-neutral-400">Memuat dokumen...</div>
      ) : filteredDocs.length === 0 ? (
        <ScrollReveal>
          <div className="py-12 text-center bg-neutral-50 rounded-xl border border-neutral-200">
            <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-neutral-500">Belum ada dokumen transparansi yang dipublikasikan.</p>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredDocs.map((doc, idx) => (
            <ScrollReveal key={doc.id} delay={Math.min(idx + 1, 4)}>
              <div className="bg-white border border-neutral-200 rounded-xl p-5 card-hover group">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DOC_TYPE_COLORS[doc.doc_type] || DOC_TYPE_COLORS['lainnya']}`}>
                        {DOC_TYPE_LABELS[doc.doc_type] || doc.doc_type}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">TA {doc.fiscal_year}</span>
                    </div>
                    <h4 className="font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {doc.title}
                    </h4>
                    {doc.description && (
                      <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{doc.description}</p>
                    )}
                  </div>
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
                    title="Unduh Dokumen"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
