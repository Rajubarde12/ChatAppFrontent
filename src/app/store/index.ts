import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../api';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

// ✅ Typed hooks and store types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
