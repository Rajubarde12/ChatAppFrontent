import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';
import Contstants from '@utils/Contstants';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: Contstants.MainUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Auth',"Chat","Users"],
  endpoints: () => ({}),
});
