import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios.js";

// Async thunk for fetching the logged-in user
export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch user data",
      );
    }
  },
);
export const loginUser = createAsyncThunk(
  "auth/LoginUser",
  async (values, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", values);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          error.message ||
          "Failed to login",
      );
    }
  },
);
const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    loading: false,
    loginLoading: false,
    loginSuccess: false,
    error: null,
  },

  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // API request started
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // API request succeeded
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      // API request failed
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    builder
      // API request started
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })

      // API request succeeded
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(
          action.payload?.message == "Login successful",
          action.payload?.data?.user?.role == "ADMIN",
          "slvkjsl",
        );
        state.loginLoading = false;
        state.user = action.payload;
        if (
          action.payload?.message == "Login successful" &&
          action.payload?.data?.user?.role == "ADMIN"
        ) {
          state.loginSuccess = true;
          localStorage.setItem("token", action.payload?.data?.token);
          localStorage.setItem("name", JSON.stringify(action.payload?.data?.user?.name));
        }
      })

      // API request failed
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearUser } = authSlice.actions;

export default authSlice.reducer;
