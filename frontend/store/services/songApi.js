import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const songsApi = createApi({
  reducerPath: 'songApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    getTrendingSongs: builder.query({
      query: () => `trending-songs`
    }),
  }),
})

export const { useGetTrendingSongsQuery } = songsApi
