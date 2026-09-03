'use client';

import * as React from 'react';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { ProductFilterState, ProductSortOption, ViewMode } from '@/types/product';
import { ProductSort } from './ProductSort';
import { formatPrice, cn } from '@/lib/utils';

interface ProductToolbarProps {
  totalCount: number;
  filteredCount: number;
  filters: ProductFilterState;
  onFilterChange: (filters: ProductFilterState) => void;
  onResetFilters: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenMobileFilters: () => void;
  className?: string;
}

export function ProductToolbar({
  totalCount,
  filteredCount,
  filters,
  onFilterChange,
  onResetFilters,
  viewMode,
  onViewModeChange,
  onOpenMobileFilters,
  className,
}: ProductToolbarProps) {
  // Count active filter criteria
  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  const removeCategory = (cat: string) => {
    onFilterChange({
      ...filters,
      categories: filters.categories.filter((c) => c !== cat),
    });
  };

  const removeBrand = (b: string) => {
    onFilterChange({
      ...filters,
      brands: filters.brands.filter((brand) => brand !== b),
    });
  };

  const resetPrice = () => {
    onFilterChange({ ...filters, priceRange: [0, 2000] });
  };

  const resetRating = () => {
    onFilterChange({ ...filters, minRating: 0 });
  };

  const resetStock = () => {
    onFilterChange({ ...filters, inStockOnly: false });
  };

  return (
    <div className={cn('space-y-3', className)}>
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3 shadow-2xs">
        {/* Left: Product count & Mobile filter toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="flex lg:hidden h-9 items-center gap-2 rounded-xl border border-border bg-background px-3 text-xs font-bold text-foreground shadow-2xs hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <p className="text-xs font-medium text-muted-foreground">
            Showing <span className="font-bold text-foreground">{filteredCount}</span> of{' '}
            <span className="font-bold text-foreground">{totalCount}</span> products
          </p>
        </div>

        {/* Right: Sort & Grid/List switcher */}
        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <ProductSort
            currentSort={filters.sortBy}
            onSortChange={(sortBy: ProductSortOption) =>
              onFilterChange({ ...filters, sortBy })
            }
          />

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-xl border border-border bg-background p-0.5">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              aria-label="Grid View"
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer',
                viewMode === 'grid'
                  ? 'bg-primary text-primary-foreground shadow-2xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              aria-label="List View"
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer',
                viewMode === 'list'
                  ? 'bg-primary text-primary-foreground shadow-2xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar (if any) */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mr-1">
            Active:
          </span>

          {/* Categories */}
          {filters.categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 rounded-lg bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs font-semibold text-primary"
            >
              <span>{cat}</span>
              <button
                type="button"
                onClick={() => removeCategory(cat)}
                className="hover:text-destructive cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          {/* Brands */}
          {filters.brands.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 rounded-lg bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs font-semibold text-primary"
            >
              <span>{b}</span>
              <button
                type="button"
                onClick={() => removeBrand(b)}
                className="hover:text-destructive cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          {/* Price Range */}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
              <span>
                {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
              </span>
              <button
                type="button"
                onClick={resetPrice}
                className="hover:text-destructive cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {/* Rating */}
          {filters.minRating > 0 && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <span>{filters.minRating}★ &amp; up</span>
              <button
                type="button"
                onClick={resetRating}
                className="hover:text-destructive cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {/* In Stock */}
          {filters.inStockOnly && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>In Stock</span>
              <button
                type="button"
                onClick={resetStock}
                className="hover:text-destructive cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {/* Clear All */}
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-bold text-destructive hover:underline ml-1 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
