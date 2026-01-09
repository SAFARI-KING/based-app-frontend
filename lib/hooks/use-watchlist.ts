"use client"

import { useState, useCallback } from "react"
import { mockCoins } from "@/lib/mock-data"

export function useWatchlist() {
  const [watchlistIds, setWatchlistIds] = useState<Set<string>>(new Set(["1", "3"]))

  const watchlist = mockCoins.filter((coin) => watchlistIds.has(coin.id))

  const addToWatchlist = useCallback((coinId: string) => {
    setWatchlistIds((prev) => new Set([...prev, coinId]))
  }, [])

  const removeFromWatchlist = useCallback((coinId: string) => {
    setWatchlistIds((prev) => {
      const next = new Set(prev)
      next.delete(coinId)
      return next
    })
  }, [])

  const isWatching = useCallback((coinId: string) => watchlistIds.has(coinId), [watchlistIds])

  const toggleWatchlist = useCallback(
    (coinId: string) => {
      if (isWatching(coinId)) {
        removeFromWatchlist(coinId)
      } else {
        addToWatchlist(coinId)
      }
    },
    [isWatching, addToWatchlist, removeFromWatchlist],
  )

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isWatching,
    toggleWatchlist,
  }
}
