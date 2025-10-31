import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';
import Contstants from '@utils/Contstants';
import { Alert } from 'react-native';
import { showToast } from '@components/CustomToast';

// ✅ Step 1: Base Query with token handling
const rawBaseQuery = fetchBaseQuery({
  baseUrl: Contstants.MainUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// ✅ Step 2: Universal error handler wrapper
const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: any,
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const { status, data } = result.error as any;
    if (data?.message) {
      const message = data?.message as string;
      showToast(message);
    }
    switch (status) {
      case 400:
        console.warn('⚠️ Bad Request:', data);
        break;
      case 401:
        console.log('🔐 Unauthorized! Logging out...');
        api.dispatch({ type: 'auth/logout' });
        break;
      case 403:
        break;
      case 404:
        console.log('❌ Not Found!');
        break;
      case 500:
        console.log('💥 Server Error! Please try again later.');
        break;
      default:
        console.log('⚠️ Unknown Error:', result.error);
    }

    // Optionally: Show toast/snackbar
    // showToast(data?.message || "Something went wrong");
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandling, // ✅ our custom handler
  tagTypes: ['User', 'Auth', 'Chat', 'Users'],
  endpoints: () => ({}),
});
