"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { ContentGrid } from "@/components/ContentGrid"
import { useGetNewsByCategoryQuery } from "@/store/services/newsApi"
import { useGetTrendingMoviesQuery } from "@/store/services/recommendationsApi"
import { useGetSocialPostsQuery } from "@/store/services/socialApi"
import { useGetTrendingSongsQuery } from "@/store/services/songApi"

export default function HomePage() {
  const { favoriteCategories } = useSelector((state) => state.preferences)
  const [allContent, setAllContent] = useState([])
  const [page, setPage] = useState(1)

  const { data: newsData, isLoading: newsLoading, isFetching: newsFetching } =
    useGetNewsByCategoryQuery({
      category: favoriteCategories[0] || "technology",
      page,
      pageSize: 8,
    })

  const { data: moviesData, isLoading: moviesLoading, isFetching: moviesFetching } =
    useGetTrendingMoviesQuery({ page })

  const { data: socialData, isLoading: socialLoading, isFetching: socialFetching } =
    useGetSocialPostsQuery({
      hashtags: ["tech", "fitness", "nature"],
      page,
      pageSize: 6,
    })

  const { data: songsData, isLoading: songsLoading } = useGetTrendingSongsQuery()

  useEffect(() => {
    const content = []

    if (newsData?.articles) content.push(...newsData.articles.slice(0, 6))
    if (moviesData?.results) content.push(...moviesData.results.slice(0, 6))
    if (socialData?.posts) content.push(...socialData.posts.slice(0, 6))
    if (songsData) content.push(...songsData.slice(0, 6))

    const shuffled = content.sort(() => Math.random() - 0.5)

    setAllContent((prev) => [...prev, ...shuffled])
  }, [newsData, moviesData, socialData, songsData])

  const isLoading = newsLoading || moviesLoading || socialLoading || songsLoading
  const isFetching = newsFetching || moviesFetching || socialFetching

  const observerRef = useRef()
  const lastElementRef = useCallback(
    (node) => {
      if (isFetching) return
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setPage((prev) => prev + 1)
          }, 1200)
        }
      })

      if (node) observerRef.current.observe(node)
    },
    [isFetching]
  )

  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-3xl font-bold">Your Personalized Feed</h1>
          <p className="text-muted-foreground">Scroll to discover more content</p>
        </div>
      </motion.div>

      {allContent.length === 0 && isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          <ContentGrid items={allContent} />

          {isFetching && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          )}

          <div ref={lastElementRef} className="h-1"></div>
        </>
      )}
    </div>
  )
}
