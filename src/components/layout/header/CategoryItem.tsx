'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  ShoppingBasket,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  ShoppingBasket,
};

interface CategoryItemProps {
  category: {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    subcategories?: string[];
  };
  isActive?: boolean;
  onSelect?: () => void;
}

export function CategoryItem({ category, isActive = false, onSelect }: CategoryItemProps) {
  const IconComponent = (category.icon && iconMap[category.icon]) || ShoppingBasket;

  return (
    <Link
      href={`/categories/${category.slug}`}
      onClick={onSelect}
      className={cn(
        'group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
        isActive
          ? 'bg-accent text-accent-foreground font-semibold'
          : 'text-foreground hover:bg-muted'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground'
          )}
        >
          <IconComponent className="h-4 w-4" />
        </div>
        <span>{category.name}</span>
      </div>

      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
}
