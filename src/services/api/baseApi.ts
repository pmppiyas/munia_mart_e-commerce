import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // On deployed domains (e.g. *.vercel.app), avoid calling http://localhost:5000 directly
  // to prevent Chrome's "Private Network Access" (local network device connection) security warning.
  if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    return '/api/v1';
  }
  return 'http://localhost:5000/api/v1';
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    credentials: 'include',
  }),
  tagTypes: ['Auth', 'Customer', 'Cart', 'Wishlist', 'Order', 'Category', 'Product'],
  endpoints: () => ({}),
});
