import { baseApi } from './baseApi';
import { ApiResponse } from '@/features/auth/authTypes';

export interface CreatePaymentRequest {
  orderId: string;
  provider: 'STRIPE' | 'BKASH';
}

export interface CreatePaymentResponse {
  paymentId: string;
  clientSecret: string;
  transactionId: string;
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation<
      ApiResponse<CreatePaymentResponse>,
      CreatePaymentRequest
    >({
      query: (body) => ({
        url: '/payment',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
  overrideExisting: false,
});

export const { useCreatePaymentMutation } = paymentApi;
