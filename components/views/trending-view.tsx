"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"
import type { Coin, CoinType, TimeWindow, FilterType } from "@/lib/types"
import { useTrendingCoins } from "@/lib/hooks/use-trending-coins"
import { TypeTabs } from "@/components/type-tabs"
import { TimeframeDropdown, FilterDropdown } from "@/components/filter-dropdown"
import { CoinList } from "@/components/coin-list"

interface TrendingViewProps {
  onCoinSelect: (coin: Coin) => void
  onTradeOpen: (coin: Coin) => void
  onOpenCreator?: (creatorId: string) => void
}

export function TrendingView({ onCoinSelect, onTradeOpen, onOpenCreator }: TrendingViewProps) {
  const [coinType, setCoinType] = useState<CoinType>("content")
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("1h")
  const [filter, setFilter] = useState<FilterType>("Trending")
  const { coins, loading, refresh } = useTrendingCoins(coinType, timeWindow, filter)

  return (
    <div className="space-y-4 p-4">
      <TypeTabs selectedType={coinType} onSelect={setCoinType} />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TimeframeDropdown value={timeWindow} onChange={setTimeWindow} />
          <FilterDropdown value={filter} onChange={setFilter} />
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <CoinList
        coins={coins}
        loading={loading}
        onCoinSelect={onCoinSelect}
        onTrade={onTradeOpen}
        onOpenCreator={onOpenCreator}
      />
    </div>
  )
}
