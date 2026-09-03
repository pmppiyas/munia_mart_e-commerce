import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, LayoutGrid } from 'lucide-react';
import mockData from '@/data/mockData.json';
import { Category } from '@/types/category';
import { CategoryCard } from '@/components/home/CategoryCard';

export const metadata: Metadata = {
  title: 'All Categories | MUNIAMART',
  description: 'Explore all shopping departments and categories at MUNIAMART.',
};

export default function AllCategoriesPage() {
  const categories = mockData.categories as Category[];

  return (
    <div className="py-6 sm:py-8 lg:py-10 bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          <span className="font-bold text-foreground">Categories</span>
        </nav>

        {/* Header */}
        <div className="border-b border-border pb-6 space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
            <LayoutGrid className="h-4 w-4" />
            <span>Explore MUNIAMART</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            All Shopping Departments
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Browse our diverse product catalog organized into verified departments to make your shopping journey seamless and effortless.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
