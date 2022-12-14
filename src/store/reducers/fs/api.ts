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
  tagTypes: ['myFiles', 'dir'],
  endpoints: build => ({
    myFiles: build.query<Fs, void>({
      query: () => 'my',
      providesTags: ['myFiles'],
    }),
    directoryContent: build.query<Fs, string>({
      query: id => `directoryContent/${id}`,
      providesTags: (result, error, id) => [{ type: 'dir', id }],
    }),
    uploadFile: build.mutation({
      query: payload => ({
        url: '/uploadFile',
        method: 'POST',
        body: payload,
      }),
      transformErrorResponse: response => {
        return response.data;
      },
    }),
  }),
});

export const { useMyFilesQuery, useUploadFileMutation } = fsApi;
