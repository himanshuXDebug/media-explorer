"use client"

import { motion } from "framer-motion"
import { ContentCard } from "./ContentCard"

export function ContentGrid({ items, title }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No content available</p>
      </div>
    )
  }

const uniqueItems = Array.from(
  new Map(
    items.map(item => {
      const type = item.type || "unknown"
      const id = item.id || item.track?.id || item.uri || Math.random()
      return [`${type}-${id}`, { ...item, type }]
    })
  ).values()
)


  return (
    <div className="space-y-4">
      {title && (
        <motion.h2
          className="text-2xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h2>
      )}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {uniqueItems.map((item, index) => (
          <ContentCard key={`${item.type}-${item.id}`} item={item} index={index} />
        ))}
      </motion.div>
    </div>
  )
}
