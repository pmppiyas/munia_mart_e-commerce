'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface WishlistSkeletonProps {
  count?: number;
  className?: string;
}

export function WishlistSkeleton({ count = 4, className }: WishlistSkeletonProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse',
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border bg-card p-4 space-y-3"
        >
          <div className="aspect-square w-full rounded-xl bg-muted" />
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-16 rounded-md bg-muted" />
            <div className="h-4 w-3/4 rounded-md bg-muted" />
            <div className="h-3 w-24 rounded-md bg-muted" />
          </div>
          <div className="pt-3 border-t border-border flex justify-between items-center">
            <div className="h-5 w-20 rounded-md bg-muted" />
            <div className="h-4 w-16 rounded-md bg-muted" />
          </div>
          <div className="h-10 w-full rounded-xl bg-muted" />
        </div>
      ))}
    </div>
  );
}
