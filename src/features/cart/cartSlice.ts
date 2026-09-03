import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '@/types/cart';

function generateCartItemId(
  productId: string,
  selectedVariants?: Record<string, string>
): string {
  if (!selectedVariants || Object.keys(selectedVariants).length === 0) {
    return productId;
  }
  const variantKey = Object.entries(selectedVariants)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('_');
  return `${productId}-${variantKey}`;
}

const initialState: CartState = {
  items: [],
  coupon: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Omit<CartItem, 'id'> & { id?: string }>
    ) => {
      const itemPayload = action.payload;
      const compositeId =
        itemPayload.id ||
        generateCartItemId(itemPayload.productId, itemPayload.selectedVariants);

      const existingIndex = state.items.findIndex((i) => i.id === compositeId);
      const quantityToAdd = itemPayload.quantity || 1;

      if (existingIndex > -1) {
        const currentItem = state.items[existingIndex];
        const newQuantity = Math.min(
          currentItem.stock,
          currentItem.quantity + quantityToAdd
        );
        state.items[existingIndex].quantity = newQuantity;
      } else {
        state.items.push({
          ...itemPayload,
          id: compositeId,
          quantity: Math.min(itemPayload.stock, quantityToAdd),
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      if (state.items.length === 0) {
        state.coupon = null;
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, Math.min(item.stock, quantity));
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
    },

    applyCoupon: (
      state,
      action: PayloadAction<{ code: string }>
    ) => {
      const code = action.payload.code.toUpperCase().trim();
      if (code === 'WELCOME10') {
        state.coupon = {
          code: 'WELCOME10',
          discountType: 'fixed',
          discountValue: 10,
        };
      } else if (code === 'SAVE20') {
        state.coupon = {
          code: 'SAVE20',
          discountType: 'percentage',
          discountValue: 20,
        };
      }
    },

    removeCoupon: (state) => {
      state.coupon = null;
    },

    hydrateCart: (state, action: PayloadAction<CartState>) => {
      if (action.payload && Array.isArray(action.payload.items)) {
        state.items = action.payload.items;
        state.coupon = action.payload.coupon || null;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
