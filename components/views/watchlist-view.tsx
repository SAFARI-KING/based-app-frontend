"use client"

import { Star } from "lucide-react"
import type { Coin } from "@/lib/types"
import { useWatchlist } from "@/lib/hooks/use-watchlist"
import { CoinList } from "@/components/coin-list"

interface WatchlistViewProps {
  onCoinSelect: (coin: Coin) => void
  onTradeOpen: (coin: Coin) => void
  onOpenCreator?: (creatorId: string) => void
}

export function WatchlistView({ onCoinSelect, onTradeOpen, onOpenCreator }: WatchlistViewProps) {
  const { watchlist } = useWatchlist()

  if (watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <Star className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">No coins in watchlist</h3>
        <p className="mt-1 text-sm text-muted-foreground">Add coins to your watchlist from the Trending tab</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold text-foreground">Your Watchlist</h2>
      <CoinList
        coins={watchlist}
        loading={false}
        onCoinSelect={onCoinSelect}
        onTrade={onTradeOpen}
        onOpenCreator={onOpenCreator}
      />
    </div>
  )
}
