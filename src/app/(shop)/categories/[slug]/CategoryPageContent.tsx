'use client';

import * as React from 'react';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { CategoryHero } from '@/components/category/CategoryHero';
import { SubCategoryList } from '@/components/category/SubCategoryList';
import { CategoryProducts } from '@/components/category/CategoryProducts';

interface CategoryPageContentProps {
  category: Category;
  categoryProducts: Product[];
}

export function CategoryPageContent({
  category,
  categoryProducts,
}: CategoryPageContentProps) {
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<string | null>(null);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 1. Category Hero Banner */}
      <CategoryHero
        category={category}
        totalProducts={categoryProducts.length}
      />

      {/* 2. Subcategories Carousel / Grid */}
      {category.children && category.children.length > 0 && (
        <SubCategoryList
          subcategories={category.children}
          products={categoryProducts}
          selectedSubcategory={selectedSubcategory}
          onSelectSubcategory={setSelectedSubcategory}
          categoryName={category.name}
        />
      )}

      {/* 3. Products Section with Toolbar, Filters, Grid, and Pagination */}
      <CategoryProducts
        category={category}
        initialProducts={categoryProducts}
        selectedSubcategory={selectedSubcategory}
        onSelectSubcategory={setSelectedSubcategory}
      />
    </div>
  );
}
