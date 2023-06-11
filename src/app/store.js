import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import habitsReducer from "../features/habits/habitSlice";
import { authApi } from "./services/auth/authService";

const rootReducer = combineReducers({
  auth: authReducer,
  habits: habitsReducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const setupStore = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
