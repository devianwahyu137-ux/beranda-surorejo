interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = 'Tidak ada hasil ditemukan.' }: EmptyStateProps) {
  return (
    <div className="bg-neutral-50 rounded-xl p-12 text-center">
      <svg
        className="w-16 h-16 text-neutral-300 mx-auto mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <p className="text-neutral-500">{message}</p>
    </div>
  );
}
