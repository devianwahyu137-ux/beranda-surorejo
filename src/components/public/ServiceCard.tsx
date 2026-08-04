import Link from 'next/link';
import type { Service } from '@/types/db';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/layanan/${service.slug}`}
      className="group block bg-white rounded-2xl border border-neutral-200/80 p-4 sm:p-6 shadow-sm hover:shadow-[0_10px_30px_rgba(22,163,74,0.1)] hover:border-primary-300 transition-[transform,border-color,box-shadow,background-color] duration-200 transform-gpu hover:-translate-y-1 active:scale-[0.98] active:border-primary-400 active:bg-primary-50/20"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Animated Icon Box with rotate & green gradient on hover */}
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary-50 rounded-xl flex items-center justify-center border border-primary-100/60 group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white group-hover:scale-105 group-hover:shadow-md transition-[transform,background-color,color,box-shadow] duration-200">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 group-hover:text-white transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base sm:text-lg text-neutral-900 group-hover:text-primary-700 transition-colors tracking-tight">
            {service.title}
          </h3>
          {service.requirements && (
            <p className="mt-1 text-xs sm:text-sm text-neutral-500 line-clamp-2 leading-relaxed">
              {service.requirements.slice(0, 110)}
              {service.requirements.length > 110 ? '...' : ''}
            </p>
          )}
        </div>

        {/* Action arrow indicator */}
        <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-all duration-300 shrink-0 mt-0.5">
          <svg
            className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
