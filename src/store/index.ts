import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from "@store/reducers/auth";
import {authApi} from "@store/reducers/auth/api";
import {fsApi} from "@store/reducers/fs/api";

export const index = configureStore({
  reducer: {
    authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [fsApi.reducerPath]: fsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, fsApi.middleware)
});
