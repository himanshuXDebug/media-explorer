"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { ContentGrid } from "@/components/ContentGrid"
import { useGetNewsByCategoryQuery } from "@/store/services/newsApi"
import { useGetTrendingMoviesQuery } from "@/store/services/recommendationsApi"
import { useGetTrendingSongsQuery } from "@/store/services/songApi"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export default function TrendingPage() {
  const [activeTab, setActiveTab] = useState("news")

  // News
  const [newsPage, setNewsPage] = useState(1)
  const [newsArticles, setNewsArticles] = useState([])
  const { data: newsData, isLoading: newsLoading, isFetching: newsFetching, error: newsError } =
    useGetNewsByCategoryQuery(
      { topic: "technology", page: newsPage, pageSize: 10 },
      { skip: activeTab !== "news" }
    )

  // Movies
  const [moviesPage, setMoviesPage] = useState(1)
  const [moviesList, setMoviesList] = useState([])
  const { data: moviesData, isLoading: moviesLoading, isFetching: moviesFetching, error: moviesError } =
    useGetTrendingMoviesQuery(
      { page: moviesPage },
      { skip: activeTab !== "movies" }
    )

  // Songs (no paging, simple search)
  const { data: songsData = [], isLoading: songsLoading, isFetching: songsFetching, error: songsError } =
    useGetTrendingSongsQuery({ query: "top" }, { skip: activeTab !== "songs" })

  useEffect(() => {
    if (newsData?.articles) {
      setNewsArticles((prev) => [...prev, ...newsData.articles])
    }
  }, [newsData])

  useEffect(() => {
    if (moviesData?.results) {
      setMoviesList((prev) => [...prev, ...moviesData.results])
    }
  }, [moviesData])

  // Infinite scroll observers
  const newsObserver = useRef()
  const lastNewsRef = useCallback((node) => {
    if (newsFetching) return
    if (newsObserver.current) newsObserver.current.disconnect()
    newsObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setTimeout(() => setNewsPage((prev) => prev + 1), 1000)
    })
    if (node) newsObserver.current.observe(node)
  }, [newsFetching])

  const moviesObserver = useRef()
  const lastMoviesRef = useCallback((node) => {
    if (moviesFetching) return
    if (moviesObserver.current) moviesObserver.current.disconnect()
    moviesObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setTimeout(() => setMoviesPage((prev) => prev + 1), 1000)
    })
    if (node) moviesObserver.current.observe(node)
  }, [moviesFetching])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold">Trending Content</h1>
        <p className="text-muted-foreground">Scroll to discover more</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="news">Tech News</TabsTrigger>
          <TabsTrigger value="movies">Movies</TabsTrigger>
          <TabsTrigger value="songs">Songs</TabsTrigger>
        </TabsList>

        {/* News */}
        <TabsContent value="news" className="space-y-4">
          {newsArticles.length === 0 && newsLoading ? (
            <SkeletonGrid />
          ) : (
            <>
              <ContentGrid items={newsArticles} />
              {newsFetching && <LoaderBlock />}
              <div ref={lastNewsRef} className="h-1"></div>
            </>
          )}
          {newsError && <ErrorBlock message="No more News available" />}
        </TabsContent>

        {/* Movies */}
        <TabsContent value="movies" className="space-y-4">
          {moviesList.length === 0 && moviesLoading ? (
            <SkeletonGrid />
          ) : (
            <>
              <ContentGrid items={moviesList} />
              {moviesFetching && <LoaderBlock />}
              <div ref={lastMoviesRef} className="h-1"></div>
            </>
          )}
          {moviesError && <ErrorBlock message="No more Movies available" />}
        </TabsContent>

        {/* Songs */}
        <TabsContent value="songs" className="space-y-4">
          {songsData.length === 0 && songsLoading ? (
            <SkeletonGrid />
          ) : (
            <>
              <ContentGrid items={songsData} />
              {songsFetching && <LoaderBlock />}
            </>
          )}
          {songsError && <ErrorBlock message="No more Songs available" />}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
      ))}
    </div>
  )
}

function LoaderBlock() {
  return (
    <div className="flex justify-center items-center py-4">
      <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
    </div>
  )
}

function ErrorBlock({ message }) {
  return <p className="text-red-500 text-center mt-4">{message}</p>
}
