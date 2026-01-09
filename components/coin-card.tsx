"use client"

import type React from "react"
import { Flame, ArrowUpRight } from "lucide-react"
import type { Coin } from "@/lib/types"
import { formatPrice, formatVolume, formatChange } from "@/lib/utils/format"

interface CoinCardProps {
  coin: Coin
  onSelect: (coin: Coin) => void
  onTrade: (coin: Coin) => void
  onOpenCreator?: (creatorId: string) => void
}

export function CoinCard({ coin, onSelect, onTrade, onOpenCreator }: CoinCardProps) {
  const isPositive = coin.priceChange >= 0
  const heatLevel = Math.abs(coin.priceChange) > 50 ? 3 : Math.abs(coin.priceChange) > 20 ? 2 : 1
  const isCreator = coin.type === "creator"

  const imageUrl = isCreator ? coin.creatorAvatarUrl : coin.contentImageUrl || coin.creatorAvatarUrl

  const getRiskDotColor = () => {
    switch (coin.riskLabel) {
      case "NEW":
      case "SPICY":
        return "bg-rose-500"
      case "LOW_LIQ":
        return "bg-amber-500"
      default:
        return "bg-green-500"
    }
  }

  const handleCreatorClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onOpenCreator && coin.creatorId) {
      onOpenCreator(coin.creatorId)
    }
  }

  return (
    <div
      onClick={() => onSelect(coin)}
      className="flex cursor-pointer items-center gap-3 rounded-xl bg-card p-3 transition-colors hover:bg-secondary/50"
    >
      <div className="relative shrink-0" onClick={handleCreatorClick}>
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={coin.coinName}
          className="h-12 w-12 rounded-full bg-muted object-cover"
        />
        {/* Risk indicator dot */}
        <div
          className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-card ${getRiskDotColor()}`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold text-foreground">{coin.symbol}</div>
        <div className="flex items-center gap-1.5">
          <span
            onClick={handleCreatorClick}
            className="cursor-pointer truncate text-sm text-muted-foreground hover:text-foreground"
          >
            {coin.creatorName}
          </span>
          <span
            className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
              isCreator ? "bg-violet-500/20 text-violet-400" : "bg-cyan-500/20 text-cyan-400"
            }`}
          >
            {isCreator ? "Creator" : "Content"}
          </span>
        </div>
      </div>

      {/* Price and change */}
      <div className="text-right">
        <div className="font-semibold text-foreground">${formatPrice(coin.price)}</div>
        <div className={`text-sm font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
          {formatChange(coin.priceChange)}
        </div>
      </div>

      {/* Volume and heat */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-xs text-muted-foreground">{formatVolume(coin.volume)}</div>
        <div className="flex">
          {Array.from({ length: heatLevel }).map((_, i) => (
            <Flame
              key={i}
              className={`h-3 w-3 ${
                heatLevel === 3 ? "text-destructive" : heatLevel === 2 ? "text-amber-400" : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trade button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onTrade(coin)
        }}
        className="flex h-11 items-center gap-1 rounded-lg bg-primary px-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-95"
      >
        <ArrowUpRight className="h-4 w-4" />
        <span className="text-sm">Trade</span>
      </button>
    </div>
  )
}
