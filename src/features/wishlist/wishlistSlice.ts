import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem, WishlistState } from '@/types/wishlist';

const initialState: WishlistState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (
      state,
      action: PayloadAction<Omit<WishlistItem, 'addedAt' | 'id'> & { id?: string; addedAt?: string }>
    ) => {
      const exists = state.items.some(
        (item) => item.productId === action.payload.productId
      );
      if (!exists) {
        state.items.unshift({
          ...action.payload,
          id: action.payload.id || action.payload.productId,
          addedAt: action.payload.addedAt || new Date().toISOString(),
        });
      }
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload && item.id !== action.payload
      );
    },

    toggleWishlist: (
      state,
      action: PayloadAction<Omit<WishlistItem, 'addedAt' | 'id'> & { id?: string; addedAt?: string }>
    ) => {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.unshift({
          ...action.payload,
          id: action.payload.id || action.payload.productId,
          addedAt: action.payload.addedAt || new Date().toISOString(),
        });
      }
    },

    clearWishlist: (state) => {
      state.items = [];
    },

    hydrateWishlist: (state, action: PayloadAction<WishlistState | WishlistItem[]>) => {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
      } else if (action.payload && Array.isArray(action.payload.items)) {
        state.items = action.payload.items;
      }
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  hydrateWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
