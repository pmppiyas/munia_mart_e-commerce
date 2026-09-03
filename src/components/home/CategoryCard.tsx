'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  ShoppingBasket,
  ArrowUpRight,
  LucideIcon,
} from 'lucide-react';
import { Category } from '@/types/category';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  ShoppingBasket,
};

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const IconComponent = (category.icon && iconMap[category.icon]) || ShoppingBasket;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-2xs transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1',
        className
      )}
    >
      {/* Background Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-muted/40 mb-3">
        {category.imageUrl ? (
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-accent/40 text-primary">
            <IconComponent className="h-8 w-8" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Icon Floating Badge */}
        <div className="absolute left-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-background/90 backdrop-blur-xs text-primary shadow-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <IconComponent className="h-4 w-4" />
        </div>

        {/* Top-right diagonal arrow on hover */}
        <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Info */}
      <div className="space-y-0.5">
        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {category.name}
        </h3>
        <p className="text-xs text-muted-foreground">
          {category.itemCount ? `${category.itemCount}+ Products` : 'Explore Items'}
        </p>
      </div>
    </Link>
  );
}
