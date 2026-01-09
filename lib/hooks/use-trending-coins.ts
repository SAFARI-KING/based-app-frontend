"use client"

import { useState, useEffect } from "react"
import type { Coin, CoinType, TimeWindow, FilterType } from "@/lib/types"
import { mockCoins } from "@/lib/mock-data"

export function useTrendingCoins(type: CoinType, timeWindow: TimeWindow, filter: FilterType) {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    const timeout = setTimeout(() => {
      let filtered = mockCoins.filter((coin) => coin.type === type)

      switch (filter) {
        case "Hot":
          filtered = filtered.sort((a, b) => b.volume - a.volume)
          break
        case "New":
          filtered = filtered.sort((a, b) => b.launchedAt.getTime() - a.launchedAt.getTime())
          break
        case "Bullish":
          filtered = filtered.filter((c) => c.priceChange > 0).sort((a, b) => b.priceChange - a.priceChange)
          break
        case "Trending":
        default:
          filtered = filtered.sort(() => Math.random() - 0.5)
          break
      }

      setCoins(filtered)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timeout)
  }, [type, timeWindow, filter])

  const refresh = () => {
    setLoading(true)
    setTimeout(() => {
      const filtered = mockCoins.filter((coin) => coin.type === type)
      const shuffled = [...filtered].sort(() => Math.random() - 0.5)
      setCoins(shuffled)
      setLoading(false)
    }, 500)
  }

  return { coins, loading, refresh }
}
