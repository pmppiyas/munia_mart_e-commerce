'use client';

import Link from 'next/link';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfferButtonProps {
  className?: string;
}

export function OfferButton({ className }: OfferButtonProps) {
  return (
    <Link
      href="/products?sale=true"
      className={cn(
        'group relative hidden xl:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-orange-500/10 border border-amber-500/30 px-3.5 py-2 text-xs font-bold text-amber-900 transition-all hover:border-amber-500 hover:shadow-sm hover:shadow-amber-500/10 active:scale-95',
        className
      )}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs group-hover:scale-110 transition-transform">
        <Flame className="h-3.5 w-3.5 fill-current animate-pulse" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600">Daily Deals</span>
        <span className="text-xs font-extrabold text-zinc-900">Up to 50% Off</span>
      </div>
    </Link>
  );
}
