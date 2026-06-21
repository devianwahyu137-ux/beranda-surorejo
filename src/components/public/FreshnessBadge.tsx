import { formatVerifiedDate } from '@/lib/freshness';

interface FreshnessBadgeProps {
  lastVerifiedAt: string;
}

export default function FreshnessBadge({ lastVerifiedAt }: FreshnessBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
      <svg className="w-3.5 h-3.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Diverifikasi terakhir: {formatVerifiedDate(lastVerifiedAt)}
    </span>
  );
}
