"use client"

import { useState } from "react"
import { Providers } from "@/components/providers"
import { TrendingView } from "@/components/views/trending-view"
import { WatchlistView } from "@/components/views/watchlist-view"
import { ProfileView } from "@/components/views/profile-view"
import { CreatorView } from "@/components/views/creator-view"
import { BottomNav } from "@/components/bottom-nav"
import { TopBar } from "@/components/top-bar"
import { CoinDetailSheet } from "@/components/coin-detail-sheet"
import { TradeSheet } from "@/components/trade-sheet"
import type { Coin } from "@/lib/types"

type Tab = "trending" | "watchlist" | "you"

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("trending")
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null)
  const [tradingCoin, setTradingCoin] = useState<Coin | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [tradeOpen, setTradeOpen] = useState(false)
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null)

  const handleCoinSelect = (coin: Coin) => {
    setSelectedCoin(coin)
    setDetailOpen(true)
  }

  const handleTradeOpen = (coin: Coin) => {
    setTradingCoin(coin)
    setTradeOpen(true)
  }

  const handleCloseDetail = () => {
    setDetailOpen(false)
    setTimeout(() => setSelectedCoin(null), 300)
  }

  const handleCloseTrade = () => {
    setTradeOpen(false)
    setTimeout(() => setTradingCoin(null), 300)
  }

  const handleOpenCreator = (creatorId: string) => {
    setSelectedCreatorId(creatorId)
  }

  const handleCloseCreator = () => {
    setSelectedCreatorId(null)
  }

  return (
    <Providers>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-background">
        {!selectedCreatorId && <TopBar />}
        <main className="flex-1 overflow-y-auto pb-20">
          {selectedCreatorId ? (
            <CreatorView
              creatorId={selectedCreatorId}
              onBack={handleCloseCreator}
              onCoinSelect={handleCoinSelect}
              onTradeOpen={handleTradeOpen}
            />
          ) : (
            <>
              {activeTab === "trending" && (
                <TrendingView
                  onCoinSelect={handleCoinSelect}
                  onTradeOpen={handleTradeOpen}
                  onOpenCreator={handleOpenCreator}
                />
              )}
              {activeTab === "watchlist" && (
                <WatchlistView
                  onCoinSelect={handleCoinSelect}
                  onTradeOpen={handleTradeOpen}
                  onOpenCreator={handleOpenCreator}
                />
              )}
              {activeTab === "you" && <ProfileView onCoinSelect={handleCoinSelect} onTrade={handleTradeOpen} />}
            </>
          )}
        </main>
        {!selectedCreatorId && <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />}

        <CoinDetailSheet
          coin={selectedCoin}
          open={detailOpen}
          onClose={handleCloseDetail}
          onTrade={handleTradeOpen}
          onOpenCreator={handleOpenCreator}
        />

        <TradeSheet coin={tradingCoin} open={tradeOpen} onClose={handleCloseTrade} />
      </div>
    </Providers>
  )
}
