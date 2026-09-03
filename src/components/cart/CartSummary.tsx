'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, ArrowRight, Lock } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import {
  selectCartSubtotal,
  selectCartDiscount,
  selectCartShipping,
  selectCartGrandTotal,
  selectFreeShippingRemaining,
  selectCartCoupon,
} from '@/features/cart/cartSelectors';
import { formatPrice, cn } from '@/lib/utils';

interface CartSummaryProps {
  className?: string;
  onCheckout?: () => void;
}

export function CartSummary({ className, onCheckout }: CartSummaryProps) {
  const subtotal = useAppSelector(selectCartSubtotal);
  const discount = useAppSelector(selectCartDiscount);
  const shipping = useAppSelector(selectCartShipping);
  const grandTotal = useAppSelector(selectCartGrandTotal);
  const freeShippingRemaining = useAppSelector(selectFreeShippingRemaining);
  const coupon = useAppSelector(selectCartCoupon);

  const freeShippingPercentage = Math.min(100, Math.round((subtotal / 50) * 100));

  return (
    <div
      className={cn(
        'rounded-3xl border border-border bg-card p-6 shadow-sm space-y-5',
        className
      )}
    >
      <h2 className="text-base font-bold text-foreground">Order Summary</h2>

      {/* Free Shipping Progress Indicator */}
      <div className="space-y-2 rounded-2xl bg-muted/40 p-3.5 border border-border/60">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Truck className="h-4 w-4 text-primary" />
            {freeShippingRemaining > 0 ? (
              <span>
                Add <span className="text-primary">{formatPrice(freeShippingRemaining)}</span> for Free Shipping
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400">
                You unlocked Free Shipping!
              </span>
            )}
          </div>
          <span className="font-bold text-[11px] text-muted-foreground">
            {freeShippingPercentage}%
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              freeShippingRemaining === 0 ? 'bg-emerald-500' : 'bg-primary'
            )}
            style={{ width: `${freeShippingPercentage}%` }}
          />
        </div>
      </div>

      {/* Calculations Breakdown */}
      <div className="space-y-3 text-xs border-b border-border pb-4">
        {/* Subtotal */}
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-bold text-foreground">{formatPrice(subtotal)}</span>
        </div>

        {/* Coupon Discount */}
        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
            <span>Coupon Discount {coupon && `(${coupon.code})`}</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between text-muted-foreground">
          <span>Estimated Delivery</span>
          <span>
            {shipping === 0 ? (
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                FREE
              </span>
            ) : (
              <span className="font-bold text-foreground">{formatPrice(shipping)}</span>
            )}
          </span>
        </div>

        {/* Taxes */}
        <div className="flex justify-between text-muted-foreground">
          <span>Estimated Sales Tax</span>
          <span className="font-medium text-foreground">Included</span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="flex items-baseline justify-between pt-1">
        <span className="text-sm font-bold text-foreground">Total</span>
        <div className="text-right">
          <span className="text-2xl font-black text-foreground">
            {formatPrice(grandTotal)}
          </span>
          <p className="text-[10px] text-muted-foreground">
            USD, all customs &amp; taxes calculated
          </p>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="pt-2">
        {onCheckout ? (
          <button
            type="button"
            onClick={onCheckout}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary-hover active:scale-98 transition-all cursor-pointer"
          >
            <Lock className="h-4 w-4" />
            <span>Proceed to Checkout</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        ) : (
          <Link
            href="/checkout"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary-hover active:scale-98 transition-all cursor-pointer"
          >
            <Lock className="h-4 w-4" />
            <span>Proceed to Checkout</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>

      {/* Security and Guarantees */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground pt-1">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <span>256-Bit Bank Level SSL Encrypted Checkout</span>
      </div>
    </div>
  );
}
