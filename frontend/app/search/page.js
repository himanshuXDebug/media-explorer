"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { ContentGrid } from "@/components/ContentGrid"
import { useSearchNewsQuery } from "@/store/services/newsApi"
import { useSearchMoviesQuery } from "@/store/services/recommendationsApi"
import { useSearchSocialPostsQuery } from "@/store/services/socialApi"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDebounce } from "@/hooks/useDebounce"

export default function SearchPage() {
  const searchQuery = useSelector((state) => state.content.searchQuery)
  const [localQuery, setLocalQuery] = useState(searchQuery || "")
  const [activeTab, setActiveTab] = useState("all")
  const debouncedQuery = useDebounce(localQuery, 300)

  const { data: newsData, isLoading: newsLoading } = useSearchNewsQuery(
    { query: debouncedQuery, page: 1 },
    { skip: !debouncedQuery },
  )

  const { data: moviesData, isLoading: moviesLoading } = useSearchMoviesQuery(
    { query: debouncedQuery, page: 1 },
    { skip: !debouncedQuery },
  )

  const { data: socialData, isLoading: socialLoading } = useSearchSocialPostsQuery(
    { query: debouncedQuery, page: 1 },
    { skip: !debouncedQuery },
  )

  const [allResults, setAllResults] = useState([])

  useEffect(() => {
  setAllResults([])
}, [debouncedQuery])


  useEffect(() => {
    const results = []

    if (newsData?.articles) {
      results.push(...newsData.articles)
    }

    if (moviesData?.results) {
      results.push(...moviesData.results)
    }

    if (socialData?.posts) {
      results.push(...socialData.posts)
    }

    setAllResults(results)
  }, [newsData, moviesData, socialData])

  const isLoading = newsLoading || moviesLoading || socialLoading

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold">Search Content</h1>
        <p className="text-muted-foreground">Find news, movies, and social posts</p>
      </motion.div>

      <div className="max-w-md">
        <Input
          type="search"
          placeholder="Search for content..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {debouncedQuery && (
        <div>
          <p className="text-sm text-muted-foreground mb-4">Showing results for "{debouncedQuery}"</p>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All ({allResults.length})</TabsTrigger>
              <TabsTrigger value="news">News ({newsData?.articles?.length || 0})</TabsTrigger>
              <TabsTrigger value="movies">Movies ({moviesData?.results?.length || 0})</TabsTrigger>
              <TabsTrigger value="social">Social ({socialData?.posts?.length || 0})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                <ContentGrid items={allResults} />
              )}
            </TabsContent>

            <TabsContent value="news" className="space-y-4">
              {newsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                <ContentGrid items={newsData?.articles || []} />
              )}
            </TabsContent>

            <TabsContent value="movies" className="space-y-4">
              {moviesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                <ContentGrid items={moviesData?.results || []} />
              )}
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              {socialLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                <ContentGrid items={socialData?.posts || []} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}

      {!debouncedQuery && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Enter a search term to find content</p>
        </div>
      )}
    </div>
  )
}
