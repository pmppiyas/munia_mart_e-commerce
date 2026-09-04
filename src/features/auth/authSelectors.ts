import { RootState } from '@/store';

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectIsAuthLoading = (state: RootState) => state.auth.status === 'loading';
