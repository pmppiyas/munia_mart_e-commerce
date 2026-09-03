'use client';

import * as React from 'react';
import { CartItem as CartItemType } from '@/types/cart';
import { CartItemImage } from './CartItemImage';
import { CartItemInfo } from './CartItemInfo';
import { CartItemPrice } from './CartItemPrice';
import { CartQuantitySelector } from './CartQuantitySelector';
import { CartItemActions } from './CartItemActions';
import { useAppDispatch } from '@/store/hooks';
import { updateQuantity, removeFromCart } from '@/features/cart/cartSlice';
import { addToWishlist } from '@/features/wishlist/wishlistSlice';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
  className?: string;
}

export function CartItem({ item, className }: CartItemProps) {
  const dispatch = useAppDispatch();
  const productHref = item.slug ? `/products/${item.slug}` : `/products/${item.productId}`;

  const handleQuantityChange = (newQty: number) => {
    dispatch(updateQuantity({ id: item.id, quantity: newQty }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    toast.info(`Removed "${item.name}" from your cart.`);
  };

  const handleMoveToWishlist = () => {
    dispatch(
      addToWishlist({
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
      })
    );
    dispatch(removeFromCart(item.id));
    toast.success(`Moved "${item.name}" to your wishlist!`);
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-2xs transition-all hover:border-primary/40',
        className
      )}
    >
      {/* Media & Info Column */}
      <div className="flex items-start gap-4 flex-1 min-w-0 w-full sm:w-auto">
        <CartItemImage
          src={item.photoUrl}
          alt={item.name}
          href={productHref}
        />

        <CartItemInfo item={item} />
      </div>

      {/* Controls & Price Column */}
      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-border">
        {/* Quantity Selector & Actions */}
        <div className="flex flex-col sm:items-end gap-2">
          <CartQuantitySelector
            quantity={item.quantity}
            maxStock={item.stock}
            onQuantityChange={handleQuantityChange}
          />

          <CartItemActions
            onRemove={handleRemove}
            onMoveToWishlist={handleMoveToWishlist}
          />
        </div>

        {/* Price */}
        <div className="sm:w-28 shrink-0">
          <CartItemPrice
            price={item.price}
            quantity={item.quantity}
            originalPrice={item.originalPrice}
          />
        </div>
      </div>
    </div>
  );
}
