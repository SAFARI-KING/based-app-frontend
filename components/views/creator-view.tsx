"use client"

import { ChevronLeft } from "lucide-react"
import { useCreator } from "@/lib/hooks/use-creator"
import { formatPrice } from "@/lib/utils/format"
import { CoinCard } from "@/components/coin-card"
import type { Coin } from "@/lib/types"

interface CreatorViewProps {
  creatorId: string
  onBack: () => void
  onCoinSelect: (coin: Coin) => void
  onTradeOpen: (coin: Coin) => void
}

const getRiskDotColor = (riskLabel: string) => {
  switch (riskLabel) {
    case "NEW":
    case "SPICY":
      return "bg-rose-500"
    case "LOW_LIQ":
      return "bg-amber-500"
    default:
      return "bg-green-500"
  }
}

export function CreatorView({ creatorId, onBack, onCoinSelect, onTradeOpen }: CreatorViewProps) {
  const { creator, loading } = useCreator(creatorId)

  if (loading) {
    return (
      <div className="space-y-6 p-4">
        {/* Loading skeleton */}
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="-ml-2 p-2">
            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="h-6 w-32 animate-pulse rounded bg-secondary" />
        </div>
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="h-20 w-20 animate-pulse rounded-full bg-secondary" />
          <div className="h-6 w-24 animate-pulse rounded bg-secondary" />
          <div className="h-4 w-32 animate-pulse rounded bg-secondary" />
        </div>
        <div className="h-32 animate-pulse rounded-xl bg-secondary" />
      </div>
    )
  }

  if (!creator) {
    return (
      <div className="p-4">
        <button onClick={onBack} className="mb-4 flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        <p className="text-center text-muted-foreground">Creator not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header with back button */}
      <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
        <ChevronLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      {/* Creator profile */}
      <div className="flex flex-col items-center text-center">
        <img
          src={creator.avatarUrl || "/placeholder.svg?height=80&width=80&query=creator avatar"}
          alt={creator.name}
          className="mb-3 h-20 w-20 rounded-full bg-muted object-cover"
        />
        <h2 className="text-xl font-bold text-foreground">{creator.name}</h2>
        <p className="text-sm text-muted-foreground">{creator.handle}</p>
        {creator.bio && <p className="mt-1 text-sm text-muted-foreground">{creator.bio}</p>}
      </div>

      <div className="rounded-xl bg-card p-4">
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Creator Coin</h3>
        <div className="flex items-center gap-3">
          {/* Circular avatar with risk dot */}
          <div className="relative shrink-0">
            <img
              src={creator.creatorCoin.creatorAvatarUrl || "/placeholder.svg?height=48&width=48&query=coin avatar"}
              alt={creator.creatorCoin.coinName}
              className="h-12 w-12 rounded-full bg-muted object-cover"
            />
            <div
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${getRiskDotColor(creator.creatorCoin.riskLabel)}`}
            />
          </div>
          <div className="flex-1">
            {/* Symbol first, then name + pill */}
            <div className="font-semibold text-foreground">{creator.creatorCoin.symbol}</div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-muted-foreground">{creator.creatorCoin.creatorName}</span>
              <span className="rounded-full bg-violet-500/20 px-1.5 py-0.5 text-[10px] font-medium text-violet-400">
                Creator
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-foreground">${formatPrice(creator.creatorCoin.price)}</div>
            <div className={`text-sm ${creator.creatorCoin.priceChange >= 0 ? "text-success" : "text-destructive"}`}>
              {creator.creatorCoin.priceChange >= 0 ? "+" : ""}
              {creator.creatorCoin.priceChange.toFixed(1)}%
            </div>
          </div>
        </div>
        <button
          onClick={() => onTradeOpen(creator.creatorCoin)}
          className="mt-3 w-full rounded-lg bg-primary py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
        >
          Trade
        </button>
      </div>

      {creator.contentCoins.length > 0 && (
        <div>
          <h3 className="mb-3 px-1 text-sm font-medium text-muted-foreground">Content Coins</h3>
          <div className="space-y-2">
            {creator.contentCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} onSelect={onCoinSelect} onTrade={onTradeOpen} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
