'use client';

import * as React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product, ViewMode } from '@/types/product';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';
import { ProductRating } from './ProductRating';
import { ProductActions } from './ProductActions';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  viewMode?: ViewMode;
  className?: string;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

export function ProductCard({
  product,
  viewMode = 'grid',
  className,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    } else {
      await toggleItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        price: product.price,
        originalPrice: product.originalPrice,
        photoUrl: product.photoUrl,
        category: product.category?.name,
        brand: product.brand,
        stock: product.stock,
        rating: product.rating,
        reviewsCount: product.reviewsCount,
      });
      if (!isWishlisted) {
        toast.success(`Added "${product.name}" to your wishlist!`);
      } else {
        toast.info(`Removed "${product.name}" from your wishlist.`);
      }
    }
  };

  const productHref = `/products/${product.slug || product.id}`;

  // 1. LIST VIEW MODE
  if (viewMode === 'list') {
    return (
      <div
        className={cn(
          'group relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 rounded-2xl border border-border bg-card p-4 shadow-2xs transition-all duration-300 hover:border-primary/40 hover:shadow-md',
          className
        )}
      >
        {/* Left: Image Container */}
        <Link
          href={productHref}
          className="relative h-44 w-full sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-xl bg-muted/40 block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          title={product.name}
        >
          <ProductImage
            src={product.photoUrl}
            alt={product.name}
            discountPercent={product.discountPercent}
            isNew={product.isNew}
            isBestSeller={product.isBestSeller}
            isOutOfStock={product.stock <= 0}
            sizes="(max-width: 640px) 100vw, 150px"
          />
        </Link>

        {/* Center: Info & Metadata */}
        <div className="flex flex-1 flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-primary">
                {product.category?.name || 'Category'}
              </span>
              {product.brand && (
                <>
                  <span>•</span>
                  <span>{product.brand}</span>
                </>
              )}
            </div>

            <Link
              href={productHref}
              className="mt-1 block text-base font-bold text-foreground hover:text-primary transition-colors line-clamp-2"
              title={product.name}
            >
              {product.name}
            </Link>

            {product.description && (
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 pt-1">
            <ProductRating
              rating={product.rating}
              reviewsCount={product.reviewsCount}
            />

            <span className="text-xs font-medium text-muted-foreground">
              {product.stock > 0 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-destructive font-semibold">Out of Stock</span>
              )}
            </span>
          </div>
        </div>

        {/* Right: Pricing & Actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-border pt-3 sm:pt-0 sm:pl-6 gap-3 shrink-0">
          <ProductPrice
            price={product.price}
            originalPrice={product.originalPrice}
            discountPercent={product.discountPercent}
            size="lg"
            showBadge
          />

          <ProductActions
            product={product}
            variant="list"
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        </div>
      </div>
    );
  }

  // 2. GRID VIEW MODE (Default)
  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-2.5 sm:p-3 shadow-2xs transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {/* Media Image Section */}
      <div className="relative">
        <Link
          href={productHref}
          className="block overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          title={product.name}
        >
          <ProductImage
            src={product.photoUrl}
            alt={product.name}
            discountPercent={product.discountPercent}
            isNew={product.isNew}
            isBestSeller={product.isBestSeller}
            isOutOfStock={product.stock <= 0}
          />
        </Link>

        {/* Quick Wishlist Action Floating Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          suppressHydrationWarning
          className={cn(
            'absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 backdrop-blur-xs text-muted-foreground shadow-xs transition-all hover:scale-110 active:scale-95 cursor-pointer',
            isWishlisted
              ? 'text-destructive bg-destructive/10'
              : 'hover:text-destructive hover:bg-background'
          )}
        >
          <Heart
            className={cn('h-4 w-4 transition-colors', {
              'fill-destructive text-destructive': isWishlisted,
            })}
          />
        </button>
      </div>

      {/* Content Details */}
      <div className="mt-2 sm:mt-3 flex flex-1 flex-col justify-between space-y-2 sm:space-y-2.5">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 text-[10px] sm:text-[11px] text-muted-foreground">
            <span className="truncate font-medium hover:text-primary max-w-[80px] sm:max-w-none">
              {product.category?.name || product.brand || 'Category'}
            </span>

            <ProductRating
              rating={product.rating}
              reviewsCount={product.reviewsCount}
            />
          </div>

          {/* Title */}
          <Link
            href={productHref}
            className="mt-1 block font-semibold text-foreground hover:text-primary transition-colors text-xs sm:text-sm line-clamp-2 leading-tight sm:leading-snug"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-1">
          <ProductPrice
            price={product.price}
            originalPrice={product.originalPrice}
            discountPercent={product.discountPercent}
          />

          <div className="mt-2.5">
            <ProductActions
              product={product}
              variant="card"
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
