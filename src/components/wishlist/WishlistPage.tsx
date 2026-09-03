'use client';

import * as React from 'react';
import Link from 'next/link';
import { Home, ChevronRight, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectWishlistItems, selectWishlistTotalCount } from '@/features/wishlist/wishlistSelectors';
import { clearWishlist } from '@/features/wishlist/wishlistSlice';
import { addToCart } from '@/features/cart/cartSlice';
import { WishlistItem } from './WishlistItem';
import { EmptyWishlist } from './EmptyWishlist';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface WishlistPageProps {
  className?: string;
}

export function WishlistPage({ className }: WishlistPageProps) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistItems);
  const totalCount = useAppSelector(selectWishlistTotalCount);

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.info('Your wishlist has been cleared.');
  };

  const handleMoveAllToCart = () => {
    let inStockCount = 0;
    items.forEach((item) => {
      if (item.stock > 0) {
        dispatch(
          addToCart({
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
          })
        );
        inStockCount++;
      }
    });

    if (inStockCount > 0) {
      dispatch(clearWishlist());
      toast.success(`Moved ${inStockCount} item(s) to your cart!`);
    } else {
      toast.error('No items in your wishlist are currently in stock.');
    }
  };

  if (items.length === 0) {
    return (
      <div className={cn('py-6 sm:py-8 lg:py-10 bg-background min-h-screen', className)}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
            <Link href="/products" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
            <span className="font-bold text-foreground">My Wishlist</span>
          </nav>

          <EmptyWishlist />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('py-6 sm:py-8 lg:py-10 bg-background min-h-screen', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          <Link href="/products" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
          <span className="font-bold text-foreground">My Wishlist</span>
        </nav>

        {/* Title & Bulk Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground">
                My Wishlist
              </h1>
              <span className="rounded-full bg-destructive/10 border border-destructive/20 px-2.5 py-0.5 text-xs font-bold text-destructive">
                {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Save your favorite products, check stock availability, and transfer them to your cart anytime.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleMoveAllToCart}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary-hover active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Move All to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleClearWishlist}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-xs font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Clear Wishlist</span>
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <WishlistItem key={item.productId} item={item} />
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-border flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs font-bold text-foreground hover:text-primary transition-colors"
          >
            <span>View Shopping Cart</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
