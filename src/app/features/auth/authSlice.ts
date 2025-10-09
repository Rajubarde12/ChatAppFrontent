import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuth, removeAuth, setAuth } from '@utils/storage';
import { Use } from 'react-native-svg';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: boolean;
}
const { token, userId } = getAuth();

interface AuthState {
  token: string | null;
  userId: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: token || null,
  userId: userId || null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      // Extract token from user payload
      state.token = action.payload.token;
      state.userId = action.payload.user.id.toString();
      setAuth(action.payload.token, action.payload.user.id);
      state.user = {
        id: action.payload.user.id,
        name: action.payload.user.name,
        email: action.payload.user.email,
        role: action.payload.user.role,
        status: action.payload.user.status,
      };
    },
    logout: state => {
      state.token = null;
      state.user = null;
      removeAuth()
    },
   
  },
});

export const { setCredentials, logout, } =
  authSlice.actions;
export default authSlice.reducer;
