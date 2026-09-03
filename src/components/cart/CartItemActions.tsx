'use client';

import * as React from 'react';
import { Trash2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartItemActionsProps {
  onRemove: () => void;
  onMoveToWishlist?: () => void;
  className?: string;
}

export function CartItemActions({
  onRemove,
  onMoveToWishlist,
  className,
}: CartItemActionsProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {onMoveToWishlist && (
        <button
          type="button"
          onClick={onMoveToWishlist}
          title="Save for later"
          aria-label="Save for later"
          className="flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-primary transition-colors cursor-pointer"
        >
          <Heart className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Save</span>
        </button>
      )}

      <button
        type="button"
        onClick={onRemove}
        title="Remove from cart"
        aria-label="Remove item"
        className="flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
      >
        <Trash2 className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Remove</span>
      </button>
    </div>
  );
}
