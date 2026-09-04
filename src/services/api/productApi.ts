import { baseApi } from './baseApi';
import { ApiResponse } from '@/features/auth/authTypes';
import { Product } from '@/types/product';

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ApiResponse<Product[]>, void>({
      query: () => ({
        url: '/product',
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),

    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useGetProductByIdQuery,
} = productApi;
