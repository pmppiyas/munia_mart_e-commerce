import { baseApi } from './baseApi';
import { ApiResponse, CustomerUser } from '@/features/auth/authTypes';

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  photoUrl?: string;
}

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ApiResponse<CustomerUser>, void>({
      query: () => ({
        url: '/customer/me',
        method: 'GET',
      }),
      providesTags: ['Customer'],
    }),

    updateProfile: builder.mutation<ApiResponse<CustomerUser>, UpdateProfileRequest>({
      query: (payload) => ({
        url: '/customer/me',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Customer', 'Auth'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
} = customerApi;
