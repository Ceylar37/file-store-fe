import { baseApiUrl } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Fs } from '@store/reducers/fs/types';

export const fsApi = createApi({
  reducerPath: 'fsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseApiUrl}/files`,
    fetchFn: async (input, init) => {
      return fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
        },
      });
    },
  }),
  tagTypes: ['myFiles'],
  endpoints: build => ({
    myFiles: build.query<Fs, void>({
      query: () => `my`,
      providesTags: ['myFiles'],
    }),
  }),
});

export const { useMyFilesQuery } = fsApi;
