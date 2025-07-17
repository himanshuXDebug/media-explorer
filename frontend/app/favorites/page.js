"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { ContentCard } from "@/components/ContentCard"
import { reorderFavorites } from "@/store/slices/favoritesSlice"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function FavoritesPage() {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites.items)
  const [dragEnabled, setDragEnabled] = useState(false)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(favorites)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    dispatch(reorderFavorites(items))
  }

  const clearAllFavorites = () => {
    dispatch(reorderFavorites([]))
  }

  if (favorites.length === 0) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-3xl font-bold">Your Favorites</h1>
          <p className="text-muted-foreground">Content you've saved will appear here</p>
        </motion.div>

        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No favorites yet. Start exploring and save content you love!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-3xl font-bold">Your Favorites</h1>
          <p className="text-muted-foreground">{favorites.length} saved items</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setDragEnabled(!dragEnabled)}>
            {dragEnabled ? "Done Reordering" : "Reorder Items"}
          </Button>
          <Button variant="destructive" onClick={clearAllFavorites} disabled={favorites.length === 0}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </motion.div>

      {dragEnabled ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="favorites">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {favorites.map((item, index) => (
                  <Draggable key={`${item.type}-${item.id}`} draggableId={`${item.type}-${item.id}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${snapshot.isDragging ? "opacity-50" : ""}`}
                      >
                        <ContentCard item={item} index={index} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {favorites.map((item, index) => (
            <ContentCard key={`${item.type}-${item.id}`} item={item} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
