"use client"

import { mockUser, mockUserCoin, mockUserContentCoins } from "@/lib/mock-data"
import { formatPrice } from "@/lib/utils/format"
import { CoinCard } from "@/components/coin-card"
import type { Coin } from "@/lib/types"

interface ProfileViewProps {
  onCoinSelect?: (coin: Coin) => void
  onTrade?: (coin: Coin) => void
}

export function ProfileView({ onCoinSelect, onTrade }: ProfileViewProps) {
  const hasCreatorCoin = mockUserCoin !== null
  const hasContentCoins = mockUserContentCoins.length > 0

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

  return (
    <div className="space-y-6 p-4">
      {/* User info */}
      <div className="flex items-center gap-4">
        <img
          src={mockUser.avatar || "/placeholder.svg?height=64&width=64&query=user avatar"}
          alt={mockUser.username}
          className="h-16 w-16 rounded-full bg-muted object-cover"
        />
        <div>
          <h2 className="text-xl font-bold text-foreground">{mockUser.username}</h2>
          <p className="text-sm text-muted-foreground">Base App User</p>
        </div>
      </div>

      {/* Your creator coin - using unified design */}
      <div className="rounded-xl bg-card p-4">
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Your Creator Coin</h3>
        {hasCreatorCoin ? (
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={mockUserCoin.creatorAvatarUrl || "/placeholder.svg?height=48&width=48&query=coin avatar"}
                alt={mockUserCoin.coinName}
                className="h-12 w-12 rounded-full bg-muted object-cover"
              />
              <div
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${getRiskDotColor(mockUserCoin.riskLabel)}`}
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground">{mockUserCoin.symbol}</div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-muted-foreground">{mockUserCoin.creatorName}</span>
                <span className="rounded-full bg-violet-500/20 px-1.5 py-0.5 text-[10px] font-medium text-violet-400">
                  Creator
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-foreground">${formatPrice(mockUserCoin.price)}</div>
              <div className={`text-sm ${mockUserCoin.priceChange >= 0 ? "text-success" : "text-destructive"}`}>
                {mockUserCoin.priceChange >= 0 ? "+" : ""}
                {mockUserCoin.priceChange.toFixed(1)}%
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center">
            <p className="mb-3 text-sm text-muted-foreground">No creator coin detected yet</p>
            <button className="text-sm text-primary hover:underline">Learn how creator coins work</button>
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-3 px-1 text-sm font-medium text-muted-foreground">Your Coins</h3>
        {hasContentCoins ? (
          <div className="space-y-2">
            {mockUserContentCoins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                onSelect={onCoinSelect || (() => {})}
                onTrade={onTrade || (() => {})}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">No coins created yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
