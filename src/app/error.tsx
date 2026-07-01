'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-50">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">
          Terjadi Kesalahan
        </h1>
        <p className="text-neutral-500 mb-8">
          Maaf, ada sesuatu yang tidak berjalan sebagaimana mestinya. Tim kami sedang menangani masalah ini.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Coba Lagi
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-100 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
