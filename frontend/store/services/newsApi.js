import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

console.log("API KEY:", process.env.NEXT_PUBLIC_NEWSAPI_KEY)

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2/",
  }),
  endpoints: (builder) => ({
    getNewsByCategory: builder.query({
      query: ({ category = "technology", page = 1, pageSize = 10 }) => {
        const url = `top-headlines?apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_KEY}&category=${category}&page=${page}&pageSize=${pageSize}&language=en`
        console.log("Fetching news with URL:", url)
        return url
      },
      transformResponse: (response) => {
        console.log("Raw NewsAPI response:", response)

        return {
          articles: response.articles?.map((article) => ({
            id: article.url,
            type: "news",
            title: article.title || "Untitled",
            description: article.description || "No description",
            image: article.urlToImage || "https://via.placeholder.com/400x200?text=No+Image",
            url: article.url,
            source: article.source?.name || "Unknown",
            publishedAt: article.publishedAt,
          })) || [],
          totalResults: response.totalResults || 0,
        }
      },
    }),
    searchNews: builder.query({
      query: ({ query, page = 1, pageSize = 10 }) => {
        const url = `everything?apiKey=${process.env.NEXT_PUBLIC_NEWSAPI_KEY}&q=${query}&page=${page}&pageSize=${pageSize}&language=en`
        console.log("Searching news with URL:", url)
        return url
      },
      transformResponse: (response) => {
        console.log("Raw NewsAPI search response:", response)

        return {
          articles: response.articles?.map((article) => ({
            id: article.url,
            type: "news",
            title: article.title || "Untitled",
            description: article.description || "No description",
            image: article.urlToImage || "https://via.placeholder.com/400x200?text=No+Image",
            url: article.url,
            source: article.source?.name || "Unknown",
            publishedAt: article.publishedAt,
          })) || [],
          totalResults: response.totalResults || 0,
        }
      },
    }),
  }),
})

export const { useGetNewsByCategoryQuery, useSearchNewsQuery } = newsApi
