import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios.js";

// Async thunk for fetching the logged-in chats
export const getChats = createAsyncThunk(
  "auth/getChats",
  async({ page = 1, limit = 20 ,search}, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/chats/admin", {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch chats data",
      );
    }
  },
);

export const getstats = createAsyncThunk(
  "auth/statsData",
  async(_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/chats/stats");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch chats data",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    chats: null,
    loadingChats: false,
    error: null,

    loadingStats: false,
    statsData: null,
   
  },

  reducers: {
    clearUser: (state) => {
      state.chats = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // API request started
      .addCase(getChats.pending, (state) => {
        state.loadingChats = true;
        state.error = null;
      })

      // API request succeeded
      .addCase(getChats.fulfilled, (state, action) => {
        state.loadingChats = false;
        state.chats = action.payload?.data;
      })

      // API request failed
      .addCase(getChats.rejected, (state, action) => {
        state.loadingChats = false;
        state.error = action.payload || action.error.message;
      });

      builder
      // API request started
      .addCase(getstats.pending, (state) => {
        state.loadingStats = true;
        state.error = null;
      })

      // API request succeeded
      .addCase(getstats.fulfilled, (state, action) => {
        state.loadingStats = false;
        state.statsData = action.payload?.data;
      })

      // API request failed
      .addCase(getstats.rejected, (state, action) => {
        state.loadingStats = false;
        state.error = action.payload || action.error.message;
      });

   
  },
});

export const { clearUser } = authSlice.actions;

export default authSlice.reducer;
