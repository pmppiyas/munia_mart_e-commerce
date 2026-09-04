import { baseApi } from './baseApi';
import { ApiResponse } from '@/features/auth/authTypes';

export interface BackendSubCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  children?: BackendSubCategory[];
  description?: string;
  imageUrl?: string;
  itemCount?: number;
  icon?: string;
}

export interface BackendCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  description?: string;
  imageUrl?: string;
  icon?: string;
  itemCount?: number;
  children: BackendSubCategory[];
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<ApiResponse<BackendCategory[]>, void>({
      query: () => ({
        url: '/category',
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),

    getCategoryById: builder.query<ApiResponse<BackendCategory>, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Category', id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
} = categoryApi;
