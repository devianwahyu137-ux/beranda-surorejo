'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const handleCategoryClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === '') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    router.push(`/umkm?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => handleCategoryClick('')}
        className={cn(
          'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 touch-target',
          activeCategory === ''
            ? 'bg-primary-600 text-white shadow-sm'
            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
        )}
      >
        Semua
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleCategoryClick(cat.value)}
          className={cn(
            'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 touch-target',
            activeCategory === cat.value
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
