import { baseApiUrl } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ProfileCreds } from '@store/reducers/auth/types';

export interface AuthPayload {
  login: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseApiUrl}/auth`,
  }),
  endpoints: build => ({
    login: build.mutation<ProfileCreds, AuthPayload>({
      query: payload => ({
        url: '/signIn',
        method: 'POST',
        body: payload,
      }),
      transformErrorResponse: response => {
        return response.data;
      },
    }),
    register: build.mutation<ProfileCreds, AuthPayload>({
      query: payload => ({
        url: '/signUp',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
