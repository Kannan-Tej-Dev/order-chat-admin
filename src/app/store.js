import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice.js";
import chatSlice from "../features/chatSlice.js";
import userSlice from "../features/userSlice.js";


export const store = configureStore({
  reducer: {
    // Add Redux slices here
    auth:authSlice,
    chats:chatSlice,
    user:userSlice
  },
});