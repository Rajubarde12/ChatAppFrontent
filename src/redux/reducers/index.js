import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosClient';

const initialState = {
  userProfile: null,
  userLists: [], // 👈 add this
  loading: false,
  error: null,
};

// 🚀 Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'app/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/profile');
      if (response.data.status) {
        return response.data.user;
      } else {
        return rejectWithValue(response.data.message || 'Failed to fetch profile');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUsersList = createAsyncThunk(
  'app/fetchUsersList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/list');
      if (response.data.status) {
        return response.data.users; // 👈 assuming API returns `users` array
      } else {
        return rejectWithValue(response.data.message || 'Failed to fetch user list');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearUserProfile: (state) => {
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🧩 User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      // 🧩 User List
      .addCase(fetchUsersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.userLists = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearUserProfile } = appSlice.actions;
export default appSlice.reducer;
