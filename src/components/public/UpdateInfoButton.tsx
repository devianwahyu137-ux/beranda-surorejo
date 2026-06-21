'use client';

import { buildUpdateInfoLink } from '@/lib/wa';

interface UpdateInfoButtonProps {
  businessName: string;
}

export default function UpdateInfoButton({ businessName }: UpdateInfoButtonProps) {
  const href = buildUpdateInfoLink(businessName);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-neutral-300 text-neutral-600 font-medium rounded-xl hover:border-primary-400 hover:text-primary-600 transition-all duration-300 touch-target text-sm"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Perbarui info
    </a>
  );
}
