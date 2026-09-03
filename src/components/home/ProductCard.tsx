'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types/product';
import { formatPrice, cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

export function ProductCard({
  product,
  className,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
    if (onToggleWishlist) {
      onToggleWishlist(product);
    } else {
      if (!isWishlisted) {
        toast.success(`Added "${product.name}" to your wishlist!`);
      } else {
        toast.info(`Removed "${product.name}" from your wishlist.`);
      }
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      toast.success(`Added "${product.name}" to your cart!`, {
        description: `Price: ${formatPrice(product.price)}`,
      });
    }
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-2xs transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {/* Top Media / Photo Section */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/40">
        {product.photoUrl ? (
          <Image
            src={product.photoUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No Image
          </div>
        )}

        {/* Badges Container */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5 z-10">
          {product.discountPercent && product.discountPercent > 0 ? (
            <span className="rounded-md bg-destructive px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-destructive-foreground shadow-xs">
              -{product.discountPercent}%
            </span>
          ) : null}

          {product.isNew && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-xs">
              New
            </span>
          )}

          {product.isBestSeller && !product.isNew && (
            <span className="rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
              Hot
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
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

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-2xs">
            <span className="rounded-lg bg-zinc-900 px-3 py-1 text-xs font-bold text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-3 flex flex-1 flex-col justify-between space-y-2.5">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 text-[11px] text-muted-foreground">
            <span className="truncate font-medium hover:text-primary">
              {product.category?.name || 'Category'}
            </span>

            {product.rating ? (
              <div className="flex items-center gap-1 text-amber-500 shrink-0 font-bold">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-foreground">{product.rating.toFixed(1)}</span>
                {product.reviewsCount ? (
                  <span className="text-muted-foreground font-normal">
                    ({product.reviewsCount})
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Product Title */}
          <Link
            href={`/products/${product.id}`}
            className="mt-1 block font-semibold text-foreground hover:text-primary transition-colors text-sm line-clamp-2 leading-snug"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through font-medium">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="mt-2.5 flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary-hover active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
