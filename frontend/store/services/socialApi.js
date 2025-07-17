import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const mockSocialData = {
  posts: [
    {
      id: "1",
      type: "social",
      title: "Amazing sunset today! 🌅",
      description: "Caught this beautiful sunset at the beach. Nature never fails to amaze me.",
      image: "/placeholder.svg?height=300&width=400",
      author: "john_doe",
      likes: 142,
      comments: 23,
      hashtags: ["#sunset", "#nature", "#photography"],
      createdAt: "2024-01-15T18:30:00Z",
    },
    {
      id: "2",
      type: "social",
      title: "New tech gadget review",
      description: "Just got my hands on the latest smartphone. The camera quality is incredible!",
      image: "/placeholder.svg?height=300&width=400",
      author: "tech_reviewer",
      likes: 89,
      comments: 15,
      hashtags: ["#tech", "#smartphone", "#review"],
      createdAt: "2024-01-15T16:45:00Z",
    },
    {
      id: "3",
      type: "social",
      title: "Workout motivation 💪",
      description: "Finished an intense 45-minute HIIT session. Feeling energized and ready for the day!",
      image: "/placeholder.svg?height=300&width=400",
      author: "fitness_guru",
      likes: 234,
      comments: 41,
      hashtags: ["#fitness", "#workout", "#motivation"],
      createdAt: "2024-01-15T14:20:00Z",
    },
  ],
}

export const socialApi = createApi({
  reducerPath: "socialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/social/",
  }),
  endpoints: (builder) => ({
    getSocialPosts: builder.query({
      queryFn: async ({ hashtags, page = 1, pageSize = 10 }) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        let filteredPosts = mockSocialData.posts

        if (hashtags && hashtags.length > 0) {
          filteredPosts = mockSocialData.posts.filter((post) =>
            post.hashtags.some((tag) => hashtags.includes(tag.replace("#", ""))),
          )
        }

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

        return {
          data: {
            posts: paginatedPosts,
            totalCount: filteredPosts.length,
            hasMore: endIndex < filteredPosts.length,
          },
        }
      },
    }),
    searchSocialPosts: builder.query({
      queryFn: async ({ query, page = 1, pageSize = 10 }) => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const filteredPosts = mockSocialData.posts.filter(
          (post) =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.description.toLowerCase().includes(query.toLowerCase()) ||
            post.hashtags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
        )

        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

        return {
          data: {
            posts: paginatedPosts,
            totalCount: filteredPosts.length,
            hasMore: endIndex < filteredPosts.length,
          },
        }
      },
    }),
  }),
})

export const { useGetSocialPostsQuery, useSearchSocialPostsQuery } = socialApi
