'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, Star, Package } from 'lucide-react';
import { WishlistItem as WishlistItemType } from '@/types/wishlist';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPrice, cn } from '@/lib/utils';
import { toast } from 'sonner';

interface WishlistItemProps {
  item: WishlistItemType;
  className?: string;
}

export function WishlistItem({ item, className }: WishlistItemProps) {
  const { addItem } = useCart();
  const { removeItem } = useWishlist();
  const productHref = item.slug ? `/products/${item.slug}` : `/products/${item.productId}`;
  const isOutOfStock = item.stock <= 0;

  const handleMoveToCart = async () => {
    if (isOutOfStock) return;
    await addItem({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      sku: item.sku,
      price: item.price,
      originalPrice: item.originalPrice,
      photoUrl: item.photoUrl,
      category: item.category,
      brand: item.brand,
      stock: item.stock,
      quantity: 1,
    });
    await removeItem(item.productId);
    toast.success(`Moved "${item.name}" to your cart!`);
  };

  const handleRemove = async () => {
    await removeItem(item.productId);
    toast.info(`Removed "${item.name}" from your wishlist.`);
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-2xs transition-all hover:border-primary/40 hover:shadow-md',
        className
      )}
    >
      <div>
        {/* Image & Quick Remove */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/30 mb-3">
          {item.photoUrl ? (
            <Image
              src={item.photoUrl}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <Package className="h-8 w-8" />
            </div>
          )}

          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${item.name} from wishlist`}
            className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-xs text-muted-foreground shadow-xs hover:bg-destructive hover:text-white transition-all cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Category & Brand */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
          {item.category && <span className="font-semibold text-primary">{item.category}</span>}
          {item.brand && (
            <>
              <span>•</span>
              <span>{item.brand}</span>
            </>
          )}
        </div>

        {/* Title */}
        <Link
          href={productHref}
          className="block text-sm font-bold text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug mb-2"
        >
          {item.name}
        </Link>

        {/* Rating */}
        {item.rating && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
            <div className="flex items-center text-amber-500">
              <Star className="h-3.5 w-3.5 fill-amber-500" />
              <span className="font-bold ml-1 text-foreground">{item.rating}</span>
            </div>
            {item.reviewsCount && (
              <span>({item.reviewsCount})</span>
            )}
          </div>
        )}
      </div>

      {/* Price & Actions */}
      <div className="space-y-3 pt-3 border-t border-border mt-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black text-foreground">
              {formatPrice(item.price)}
            </span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>

          <span
            className={cn(
              'text-[11px] font-bold px-2 py-0.5 rounded-full',
              isOutOfStock
                ? 'bg-destructive/10 text-destructive'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            )}
          >
            {isOutOfStock ? 'Out of Stock' : 'In Stock'}
          </span>
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleMoveToCart}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary-hover active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{isOutOfStock ? 'Out of Stock' : 'Move to Cart'}</span>
        </button>
      </div>
    </div>
  );
}
