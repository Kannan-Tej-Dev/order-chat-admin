import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios.js";

// Async thunk for fetching the logged-in chats
export const getUserList = createAsyncThunk(
  "auth/getUserList",
  async({ page = 1, limit = 20 ,search}, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/list", {
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



const userSlice = createSlice({
  name: "auth",

  initialState: {
    userData: null,
    loadingUsers: false,
    errorUser: null,

    loadingStats: false,
    statsData: null,
   
  },

  reducers: {
    clearUser: (state) => {
      state.userData = null;
      state.errorUser = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // API request started
      .addCase(getUserList.pending, (state) => {
        state.loadingUsers = true;
        state.errorUser = null;
      })

      // API request succeeded
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.userData = action.payload?.data;
      })

      // API request failed
      .addCase(getUserList.rejected, (state, action) => {
        state.loadingUsers = false;
        state.errorUser = action.payload || action.error.message;
      });

     
   
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
