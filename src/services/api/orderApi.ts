import { baseApi } from './baseApi';
import { ApiResponse } from '@/features/auth/authTypes';
import { Order } from '@/types/order';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query<ApiResponse<Order[]>, void>({
      query: () => ({
        url: '/order/my',
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),

    getOrderById: builder.query<ApiResponse<Order>, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyOrdersQuery,
  useLazyGetMyOrdersQuery,
  useGetOrderByIdQuery,
} = orderApi;
