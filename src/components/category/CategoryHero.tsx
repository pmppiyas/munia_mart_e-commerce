'use client';

import * as React from 'react';
import Image from 'next/image';
import { Layers } from 'lucide-react';
import { Category } from '@/types/category';
import { cn } from '@/lib/utils';

interface CategoryHeroProps {
  category: Category;
  totalProducts?: number;
  className?: string;
}

export function CategoryHero({
  category,
  totalProducts,
  className,
}: CategoryHeroProps) {
  const displayCount = totalProducts ?? category.itemCount ?? 0;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 lg:p-12 shadow-sm',
        className
      )}
    >
      {/* Background Media with Gradient Overlay */}
      {category.imageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 dark:opacity-20 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-2xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <Layers className="h-3.5 w-3.5" />
            <span>Department</span>
          </span>

          {displayCount > 0 && (
            <span className="text-xs font-semibold text-muted-foreground">
              {displayCount} Products Available
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight">
          {category.name}
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {category.description ||
            `Browse our curated collection of verified ${category.name} products with guaranteed authenticity and fast delivery.`}
        </p>
      </div>
    </div>
  );
}
