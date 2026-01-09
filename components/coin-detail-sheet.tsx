"use client"

import type React from "react"

import { X, Star, TrendingUp, Droplets, Clock, Activity } from "lucide-react"
import { useState } from "react"
import type { Coin, TimeWindow } from "@/lib/types"
import { useCoinDetail } from "@/lib/hooks/use-coin-detail"
import { useWatchlist } from "@/lib/hooks/use-watchlist"
import { formatPrice, formatVolume, formatChange, formatTimeAgo } from "@/lib/utils/format"
import { TimeframeDropdown } from "./filter-dropdown"
import { Sparkline } from "./sparkline"

interface CoinDetailSheetProps {
  coin: Coin | null
  open: boolean
  onClose: () => void
  onTrade: (coin: Coin) => void
  onOpenCreator?: (creatorId: string) => void
}

export function CoinDetailSheet({ coin, open, onClose, onTrade, onOpenCreator }: CoinDetailSheetProps) {
  const { trades, loading } = useCoinDetail(coin?.id || null)
  const { isWatching, toggleWatchlist } = useWatchlist()
  const [chartWindow, setChartWindow] = useState<TimeWindow>("1h")

  if (!coin) return null

  const isPositive = coin.priceChange >= 0
  const watching = isWatching(coin.id)
  const isCreator = coin.type === "creator"
  const imageUrl = isCreator ? coin.creatorAvatarUrl : coin.contentImageUrl || coin.creatorAvatarUrl
  const showRisk = coin.riskLabel && coin.riskLabel !== "NORMAL"

  const handleCreatorClick = () => {
    if (onOpenCreator && coin.creatorId) {
      onClose()
      onOpenCreator(coin.creatorId)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg transform rounded-t-3xl bg-card transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "90vh" }}
      >
        <div className="overflow-y-auto p-4" style={{ maxHeight: "90vh" }}>
          {/* Handle */}
          <div className="mb-4 flex justify-center">
            <div className="h-1 w-12 rounded-full bg-muted" />
          </div>

          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={coin.coinName}
                className={`h-16 w-16 bg-muted object-cover ${isCreator ? "rounded-full" : "rounded-xl"}`}
              />
              <div>
                {/* Title: symbol for creator, coinName for content */}
                <h2 className="text-xl font-bold text-foreground">{isCreator ? coin.symbol : coin.coinName}</h2>
                <div className="flex items-center gap-2">
                  {isCreator ? (
                    // Creator: show "Creator: {name}"
                    <span
                      className="cursor-pointer text-muted-foreground hover:text-foreground"
                      onClick={handleCreatorClick}
                    >
                      Creator: {coin.creatorName}
                    </span>
                  ) : (
                    // Content: show symbol and "by {creator}" with small avatar
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground">{coin.symbol}</span>
                      <span className="text-muted-foreground">•</span>
                      <img
                        src={coin.creatorAvatarUrl || "/placeholder.svg"}
                        alt={coin.creatorName}
                        className="h-4 w-4 rounded-full"
                      />
                      <span
                        className="cursor-pointer text-muted-foreground hover:text-foreground"
                        onClick={handleCreatorClick}
                      >
                        by {coin.creatorName}
                      </span>
                    </div>
                  )}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      isCreator ? "bg-purple-500/20 text-purple-400" : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    {isCreator ? "Creator" : "Content"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleWatchlist(coin.id)}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  watching ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Star className={`h-5 w-5 ${watching ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <StatCard
              icon={<TrendingUp className="h-4 w-4" />}
              label="Price"
              value={`$${formatPrice(coin.price)}`}
              change={formatChange(coin.priceChange)}
              positive={isPositive}
            />
            <StatCard
              icon={<Activity className="h-4 w-4" />}
              label="24h Volume"
              value={`$${formatVolume(coin.volume)}`}
            />
            <StatCard
              icon={<Droplets className="h-4 w-4" />}
              label="Liquidity"
              value={`$${formatVolume(coin.liquidity)}`}
            />
            <StatCard icon={<Clock className="h-4 w-4" />} label="Age" value={formatTimeAgo(coin.launchedAt)} />
          </div>

          {/* Chart */}
          <div className="mb-6 rounded-xl bg-secondary/50 p-4">
            <div className="mb-3">
              <TimeframeDropdown value={chartWindow} onChange={setChartWindow} />
            </div>
            <Sparkline positive={isPositive} />
          </div>

          {showRisk && (
            <div
              className={`mb-6 rounded-xl p-4 ${
                coin.riskLabel === "NEW"
                  ? "bg-blue-500/10 border border-blue-500/20"
                  : coin.riskLabel === "LOW_LIQ"
                    ? "bg-amber-500/10 border border-amber-500/20"
                    : "bg-rose-500/10 border border-rose-500/20"
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`shrink-0 rounded px-2 py-1 text-xs font-bold ${
                    coin.riskLabel === "NEW"
                      ? "bg-blue-500/20 text-blue-400"
                      : coin.riskLabel === "LOW_LIQ"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-rose-500/20 text-rose-400"
                  }`}
                >
                  {coin.riskLabel === "LOW_LIQ" ? "LOW LIQUIDITY" : coin.riskLabel}
                </span>
                <p className="text-sm text-muted-foreground">
                  {coin.riskLabel === "NEW" && "Recently launched. Price may move quickly."}
                  {coin.riskLabel === "LOW_LIQ" && "Low liquidity may result in high price slippage."}
                  {coin.riskLabel === "SPICY" && "Unusual volume vs liquidity. Could be volatile."}
                </p>
              </div>
            </div>
          )}

          {/* Recent Trades */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">Recent Trades</h3>
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-10 animate-pulse rounded-lg bg-secondary/50" />
                ))}
              </div>
            ) : trades.length > 0 ? (
              <div className="space-y-2">
                {trades.slice(0, 5).map((trade) => (
                  <div
                    key={trade.id}
                    className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2"
                  >
                    <span
                      className={`text-sm font-medium ${trade.side === "BUY" ? "text-success" : "text-destructive"}`}
                    >
                      {trade.side}
                    </span>
                    <span className="text-sm text-foreground">{trade.size} ETH</span>
                    <span className="text-xs text-muted-foreground">{formatTimeAgo(trade.timestamp)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent trades</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pb-4">
            <button
              onClick={() => onTrade(coin)}
              className="flex h-14 flex-1 items-center justify-center rounded-xl bg-success font-semibold text-success-foreground transition-colors hover:bg-success/90 active:scale-[0.98]"
            >
              Buy
            </button>
            <button
              onClick={() => onTrade(coin)}
              className="flex h-14 flex-1 items-center justify-center rounded-xl bg-destructive font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90 active:scale-[0.98]"
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function StatCard({
  icon,
  label,
  value,
  change,
  positive,
}: {
  icon: React.ReactNode
  label: string
  value: string
  change?: string
  positive?: boolean
}) {
  return (
    <div className="rounded-xl bg-secondary/50 p-3">
      <div className="mb-1 flex items-center gap-1 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-semibold text-foreground">{value}</span>
        {change && (
          <span className={`text-sm font-medium ${positive ? "text-success" : "text-destructive"}`}>{change}</span>
        )}
      </div>
    </div>
  )
}
