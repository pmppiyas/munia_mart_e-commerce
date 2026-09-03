'use client';

import * as React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types/product';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/features/cart/cartSlice';
import { toggleWishlist } from '@/features/wishlist/wishlistSlice';
import { selectIsInWishlist } from '@/features/wishlist/wishlistSelectors';
import { formatPrice, cn } from '@/lib/utils';

interface ProductActionsProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  variant?: 'card' | 'list';
  className?: string;
}

export function ProductActions({
  product,
  onAddToCart,
  onToggleWishlist,
  variant = 'card',
  className,
}: ProductActionsProps) {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector((state) => selectIsInWishlist(state, product.id));
  const isOutOfStock = product.stock <= 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    } else {
      dispatch(
        toggleWishlist({
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
        })
      );
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
      dispatch(
        addToCart({
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
          quantity: 1,
        })
      );
      toast.success(`Added "${product.name}" to cart!`, {
        description: `Price: ${formatPrice(product.price)}`,
      });
    }
  };

  if (variant === 'list') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary-hover active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-2xs transition-all hover:border-primary hover:text-destructive active:scale-95 cursor-pointer',
            isWishlisted && 'text-destructive bg-destructive/10 border-destructive/20'
          )}
        >
          <Heart className={cn('h-4 w-4', isWishlisted && 'fill-destructive')} />
        </button>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <button
        type="button"
        disabled={isOutOfStock}
        onClick={handleAddToCart}
        className="flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary-hover active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ShoppingBag className="h-3.5 w-3.5" />
        <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
      </button>
    </div>
  );
}
