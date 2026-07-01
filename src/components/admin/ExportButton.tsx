'use client';

import { exportToCsv } from '@/lib/export';

interface ExportButtonProps {
  data: Record<string, unknown>[];
  filename: string;
  label?: string;
}

export default function ExportButton({ data, filename, label = '↓ Export CSV' }: ExportButtonProps) {
  return (
    <button
      onClick={() => exportToCsv(filename, data)}
      className="px-4 py-2.5 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-100 text-sm transition-colors"
    >
      {label}
    </button>
  );
}
