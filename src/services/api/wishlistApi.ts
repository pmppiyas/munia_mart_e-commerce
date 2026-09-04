import { baseApi } from './baseApi';
import { ApiResponse } from '@/features/auth/authTypes';

export interface BackendWishlistProduct {
  id: string;
  name: string;
  sku: string;
  price: number | string;
  stock: number;
  photoUrl: string | null;
  status: string;
}

export interface BackendWishlistItem {
  id: string;
  wishlistId: string;
  productId: string;
  createdAt: string;
  product: BackendWishlistProduct;
}

export interface BackendWishlistResponseData {
  id: string;
  items: BackendWishlistItem[];
  totalCount: number;
}

export interface ToggleWishlistResponseData {
  action: 'added' | 'removed';
  wishlist: BackendWishlistResponseData;
}

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<ApiResponse<BackendWishlistResponseData>, void>({
      query: () => ({
        url: '/wishlist',
        method: 'GET',
      }),
      providesTags: ['Wishlist'],
    }),

    addToWishlist: builder.mutation<
      ApiResponse<BackendWishlistResponseData>,
      { productId: string }
    >({
      query: (body) => ({
        url: '/wishlist',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wishlist'],
    }),

    toggleWishlist: builder.mutation<
      ApiResponse<ToggleWishlistResponseData>,
      { productId: string }
    >({
      query: (body) => ({
        url: '/wishlist/toggle',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wishlist'],
    }),

    removeFromWishlist: builder.mutation<
      ApiResponse<BackendWishlistResponseData>,
      string
    >({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),

    clearWishlist: builder.mutation<ApiResponse<{ message: string }>, void>({
      query: () => ({
        url: '/wishlist',
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWishlistQuery,
  useLazyGetWishlistQuery,
  useAddToWishlistMutation,
  useToggleWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} = wishlistApi;
