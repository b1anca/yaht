import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import habitsReducer from "../features/habits/habitsSlice";
import { authApi } from "./services/auth/authService";

const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitsReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
