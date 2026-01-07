import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosClient';

const initialState = {
  userProfile: null,
  userLists: [],
  userChats: [], // 👈 add this for user chats
  loading: false,
  error: null,
};

// 🚀 Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'app/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/profile');
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

// 🚀 Fetch users list
export const fetchUsersList = createAsyncThunk(
  'app/fetchUsersList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users');
      console.log("response",response.data)
      if (response.data.status) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message || 'Failed to fetch user list');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🚀 Fetch user chat list
export const fetchUserChats = createAsyncThunk(
  'app/fetchUserChats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/get-user-chat');
       console.log("response",response.data)
      if (response.data.status) {
        // API is returning a single chat object, wrap in array
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message || 'Failed to fetch user chats');
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
    clearUserChats: (state) => {
      state.userChats = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // User profile
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

      // Users list
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
      })

      // User chats
      .addCase(fetchUserChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserChats.fulfilled, (state, action) => {
        state.userChats = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearUserProfile, clearUserChats } = appSlice.actions;
export default appSlice.reducer;
