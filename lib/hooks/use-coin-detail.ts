"use client"

import { useState, useEffect } from "react"
import type { Coin, Trade } from "@/lib/types"
import { mockCoins, mockTrades } from "@/lib/mock-data"

export function useCoinDetail(coinId: string | null) {
  const [coin, setCoin] = useState<Coin | null>(null)
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!coinId) {
      setCoin(null)
      setTrades([])
      return
    }

    setLoading(true)

    const timeout = setTimeout(() => {
      const foundCoin = mockCoins.find((c) => c.id === coinId) || null
      setCoin(foundCoin)
      setTrades(mockTrades.filter((t) => t.coinId === coinId))
      setLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [coinId])

  return { coin, trades, loading }
}
