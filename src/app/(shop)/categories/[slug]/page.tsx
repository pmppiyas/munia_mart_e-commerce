import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import mockData from '@/data/mockData.json';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { CategoryPageContent } from './CategoryPageContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getCategoryBySlugOrId(slugOrId: string): Category | undefined {
  const allCategories = mockData.categories as Category[];
  const decoded = decodeURIComponent(slugOrId).toLowerCase();

  return allCategories.find(
    (c) =>
      c.slug.toLowerCase() === decoded ||
      c.id.toLowerCase() === decoded
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlugOrId(slug);

  if (!category) {
    return {
      title: 'Category Not Found | MUNIAMART',
      description: 'The requested department could not be found.',
    };
  }

  return {
    title: `${category.name} | Shop Online at MUNIAMART`,
    description:
      category.description ||
      `Explore high quality ${category.name} with fast delivery and guaranteed authenticity at MUNIAMART.`,
    openGraph: {
      title: `${category.name} | MUNIAMART`,
      description: category.description,
      images: category.imageUrl ? [{ url: category.imageUrl }] : [],
    },
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlugOrId(slug);

  if (!category) {
    notFound();
  }

  const allProducts = mockData.products as unknown as Product[];
  const categoryProducts = allProducts.filter(
    (p) =>
      p.categoryId === category.id ||
      p.category?.slug.toLowerCase() === category.slug.toLowerCase()
  );

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
          <Link
            href="/categories"
            className="hover:text-primary transition-colors"
          >
            Categories
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          <span className="font-bold text-primary capitalize">
            {category.name}
          </span>
        </nav>

        {/* Category Hero, Subcategories, and Products */}
        <CategoryPageContent
          category={category}
          categoryProducts={categoryProducts}
        />
      </div>
    </div>
  );
}
