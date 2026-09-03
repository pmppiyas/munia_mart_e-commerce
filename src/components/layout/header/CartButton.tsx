'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';

interface CartButtonProps {
  className?: string;
  count?: number;
  total?: number;
  onClick?: () => void;
}

export function CartButton({ className, count = 0, total = 0, onClick }: CartButtonProps) {
  return (
    <Link
      href="/cart"
      onClick={onClick}
      className={cn(
        'group flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2 text-foreground shadow-xs transition-all hover:border-primary hover:text-primary active:scale-95',
        className
      )}
      aria-label={`Shopping cart with ${count} items`}
    >
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <ShoppingCart className="h-4 w-4 transition-transform group-hover:scale-110" />
        {count > 0 ? (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground shadow-xs">
            {count > 99 ? '99+' : count}
          </span>
        ) : (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-muted-foreground/40 px-1 text-[10px] font-semibold text-white">
            0
          </span>
        )}
      </div>

      <div className="hidden lg:flex flex-col text-left leading-tight">
        <span className="text-[11px] font-medium text-muted-foreground">Cart</span>
        <span className="text-xs font-bold text-foreground group-hover:text-primary">
          {formatPrice(total)}
        </span>
      </div>
    </Link>
  );
}
