"use client"

import type { Coin } from "@/lib/types"
import { CoinCard } from "./coin-card"
import { CoinCardSkeleton } from "./coin-card-skeleton"
import { TrendingUp } from "lucide-react"

interface CoinListProps {
  coins: Coin[]
  loading: boolean
  onCoinSelect: (coin: Coin) => void
  onTrade: (coin: Coin) => void
  onOpenCreator?: (creatorId: string) => void
}

export function CoinList({ coins, loading, onCoinSelect, onTrade, onOpenCreator }: CoinListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <CoinCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (coins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <TrendingUp className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">No coins match this filter yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">Check back later for trending coins</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {coins.map((coin) => (
        <CoinCard key={coin.id} coin={coin} onSelect={onCoinSelect} onTrade={onTrade} onOpenCreator={onOpenCreator} />
      ))}
    </div>
  )
}
