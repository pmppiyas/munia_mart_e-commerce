import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

export const selectWishlistState = (state: RootState) => state.wishlist;

export const selectWishlistItems = (state: RootState) => state.wishlist.items;

export const selectWishlistTotalCount = createSelector(
  [selectWishlistItems],
  (items) => items.length
);

export const selectIsInWishlist = (state: RootState, productId: string): boolean => {
  return state.wishlist.items.some((item) => item.productId === productId);
};
