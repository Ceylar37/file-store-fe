import { baseApiUrl } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Fs } from '@store/reducers/fs/types';

export const fsApi = createApi({
  reducerPath: 'fsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
    credentials: 'include',
  }),
  endpoints: build => ({
    myFiles: build.query<Fs, void>({
      query: () => `files/my`,
    }),
  }),
});

export const { useMyFilesQuery } = fsApi;
