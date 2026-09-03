'use client';

import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectWishlistItems,
  selectWishlistTotalCount,
} from '@/features/wishlist/wishlistSelectors';
import {
  toggleWishlist as toggleWishlistRedux,
  removeFromWishlist as removeFromWishlistRedux,
  clearWishlist as clearWishlistRedux,
} from '@/features/wishlist/wishlistSlice';
import { selectIsAuthenticated } from '@/features/auth/authSelectors';
import {
  useToggleWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} from '@/services/api/wishlistApi';
import { WishlistItem } from '@/types/wishlist';

export function useWishlist() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistItems);
  const totalCount = useAppSelector(selectWishlistTotalCount);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [toggleWishlistApi] = useToggleWishlistMutation();
  const [removeFromWishlistApi] = useRemoveFromWishlistMutation();
  const [clearWishlistApi] = useClearWishlistMutation();

  const isInWishlist = React.useCallback(
    (productId: string) => {
      return items.some((item) => item.productId === productId);
    },
    [items]
  );

  const toggleItem = React.useCallback(
    async (item: Omit<WishlistItem, 'addedAt' | 'id'> & { id?: string; addedAt?: string }) => {
      // 1. Instant optimistic update in Redux
      dispatch(toggleWishlistRedux(item));

      // 2. If authenticated, persist to PostgreSQL database
      if (isAuthenticated) {
        try {
          await toggleWishlistApi({ productId: item.productId }).unwrap();
        } catch (error) {
          console.warn('Failed to sync wishlist toggle to database:', error);
        }
      }
    },
    [dispatch, isAuthenticated, toggleWishlistApi]
  );

  const removeItem = React.useCallback(
    async (productId: string) => {
      // 1. Instant update in Redux
      dispatch(removeFromWishlistRedux(productId));

      // 2. If authenticated, persist to database
      if (isAuthenticated) {
        try {
          await removeFromWishlistApi(productId).unwrap();
        } catch (error) {
          console.warn('Failed to sync remove wishlist item to database:', error);
        }
      }
    },
    [dispatch, isAuthenticated, removeFromWishlistApi]
  );

  const clearAll = React.useCallback(async () => {
    // 1. Instant update in Redux
    dispatch(clearWishlistRedux());

    // 2. If authenticated, persist to database
    if (isAuthenticated) {
      try {
        await clearWishlistApi().unwrap();
      } catch (error) {
        console.warn('Failed to sync clear wishlist to database:', error);
      }
    }
  }, [dispatch, isAuthenticated, clearWishlistApi]);

  return {
    items,
    totalCount,
    isAuthenticated,
    isInWishlist,
    toggleItem,
    removeItem,
    clearAll,
  };
}
