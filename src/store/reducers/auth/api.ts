import { baseApiUrl } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Profile } from '@store/reducers/auth/types';

export interface AuthPayload {
  login: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
    credentials: 'include',
  }),
  endpoints: build => ({
    login: build.mutation<Profile, AuthPayload>({
      query: payload => ({
        url: 'auth/signIn',
        method: 'POST',
        body: payload,
      }),
    }),
    register: build.mutation<Profile, AuthPayload>({
      query: payload => ({
        url: 'auth/signUp',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
