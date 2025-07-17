"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Heart, ExternalLink, Play, BookOpen, Star } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { addToFavorites, removeFromFavorites } from "@/store/slices/favoritesSlice"
import { toast } from "sonner"

export function ContentCard({ item, index }) {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites.items)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const isFavorite = favorites.some((fav) => fav.id === item.id && fav.type === item.type)

  const handleFavoriteToggle = () => {
  if (isFavorite) {
    dispatch(removeFromFavorites({ id: item.id, type: item.type }))
    toast.success("Removed from favorites")
  } else {
    dispatch(addToFavorites(item))
    toast.success("Successfully added to favorites")
  }
}

const getActionIcon = () => {
  switch (item.type) {
    case "news": return <BookOpen className="h-4 w-4" />
    case "movie": return <Play className="h-4 w-4" />
    case "song": return <Play className="h-4 w-4" />
    default: return <ExternalLink className="h-4 w-4" />
  }
}

const getActionText = () => {
  switch (item.type) {
    case "news": return "Read More"
    case "movie": return "Watch Now"
    case "song": return "Listen"
    default: return "View"
  }
}


  const handleActionClick = () => {
    if (!item.url) return

    const dontAskAgain = localStorage.getItem("dontAskAgainForExternal") === "true"
    if (dontAskAgain) {
      window.open(item.url, "_blank")
    } else {
      setShowConfirm(true)
    }
  }

  const handleOpen = () => {
    window.open(item.url, "_blank")
    setShowConfirm(false)
  }

  const handleDontAskAgain = () => {
    localStorage.setItem("dontAskAgainForExternal", "true")
    window.open(item.url, "_blank")
    setShowConfirm(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="h-full"
      >
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-r from-slate-200 to-cyan-200 dark:from-emerald-700 dark:to-blue-900 border border-slate-600 dark:border-slate-600">
          {/* Image and badge */}
          <div className="relative aspect-video overflow-hidden">
            {item.image ? (
              <motion.img
                src={item.image}
                alt={item.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-xs text-muted-foreground">No Image</span>
              </div>
            )}
            {!imageLoaded && item.image && <div className="absolute inset-0 bg-muted animate-pulse" />}
            <Badge variant="secondary" className="absolute top-2 left-2 capitalize">{item.type}</Badge>
          </div>

          <CardHeader className="pb-2">
            <h3 className="font-semibold line-clamp-2 text-sm leading-tight">{item.title}</h3>
          </CardHeader>

          <CardContent className="flex-1 pb-2">
            <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
            {item.source && <p className="text-xs text-muted-foreground mt-2">Source: {item.source}</p>}
            {item.rating && (
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{item.rating.toFixed(1)}</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="pt-2 gap-2">
            <Button
              size="sm"
              onClick={handleActionClick}
              disabled={!item.url}
              className="flex-1 text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:brightness-110"
            >
              {getActionIcon()}
              {getActionText()}
            </Button>
            <Button size="sm"  onClick={handleFavoriteToggle} className="border-none bg-inherit hover:bg-inherit text-muted-foreground">
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Confirm pop modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 max-w-xs w-full space-y-3 shadow-lg">
            <h4 className="font-semibold text-center">Open external website?</h4>
            <p className="text-xs text-muted-foreground text-center">This will lead you to an external site.</p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" className="flex-1" onClick={handleOpen}>Open</Button>
              <Button size="sm" variant="secondary" className="flex-1" onClick={() => setShowConfirm(false)}>Cancel</Button>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="w-full text-xs mt-2 underline text-center"
              onClick={handleDontAskAgain}
            >
              Don’t ask again & open
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
