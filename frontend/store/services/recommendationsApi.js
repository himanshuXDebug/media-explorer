import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

console.log("TMDB API KEY:", process.env.NEXT_PUBLIC_TMDB_KEY)

export const recommendationsApi = createApi({
  reducerPath: "recommendationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
  }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query({
      query: ({ page = 1 }) => {
        const url = `trending/movie/week?page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
        console.log("Fetching trending movies:", url)
        return url
      },
      transformResponse: (response) => {
        console.log("Raw movies response:", response)
        return {
          results: response.results?.map((movie) => ({
            id: movie.id,
            type: "movie",
            title: movie.title || "Untitled",
            description: movie.overview || "No description available",
            image: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/400x200?text=No+Image",
            rating: movie.vote_average,
            releaseDate: movie.release_date,
            url: `https://www.themoviedb.org/movie/${movie.id}`,
          })) || [],
          totalPages: response.total_pages || 0,
        }
      },
    }),

    searchMovies: builder.query({
      query: ({ query, page = 1 }) => {
        const url = `search/movie?query=${query}&page=${page}&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
        console.log("Searching movies:", url)
        return url
      },
      transformResponse: (response) => ({
        results: response.results?.map((movie) => ({
          id: movie.id,
          type: "movie",
          title: movie.title || "Untitled",
          description: movie.overview || "No description available",
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/400x200?text=No+Image",
          rating: movie.vote_average,
          releaseDate: movie.release_date,
          url: `https://www.themoviedb.org/movie/${movie.id}`,
        })) || [],
        totalPages: response.total_pages || 0,
      }),
    }),
  }),
})

export const { useGetTrendingMoviesQuery, useSearchMoviesQuery } = recommendationsApi
