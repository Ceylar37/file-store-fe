import { baseApiUrl } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Profile, ProfileCreds } from '@store/reducers/auth/types';

export interface AuthPayload {
  login: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseApiUrl}/auth`,
  }),
  tagTypes: ['myFiles'],
  endpoints: build => ({
    login: build.mutation<ProfileCreds, AuthPayload>({
      query: payload => ({
        url: '/signIn',
        method: 'POST',
        body: payload,
      }),
      transformErrorResponse: (response, meta, arg) => {
        return response.data;
      },
      invalidatesTags: ['myFiles'],
    }),
    register: build.mutation<ProfileCreds, AuthPayload>({
      query: payload => ({
        url: '/signUp',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['myFiles'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
