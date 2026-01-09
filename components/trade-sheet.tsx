"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
import type { Coin } from "@/lib/types"
import { formatPrice } from "@/lib/utils/format"

interface TradeSheetProps {
  coin: Coin | null
  open: boolean
  onClose: () => void
}

type TradeSide = "buy" | "sell"

const PRESETS = [0.005, 0.01, 0.05]

export function TradeSheet({ coin, open, onClose }: TradeSheetProps) {
  const [side, setSide] = useState<TradeSide>("buy")
  const [amount, setAmount] = useState("")
  const [isQuoting, setIsQuoting] = useState(false)
  const [hasQuote, setHasQuote] = useState(false)

  if (!coin) return null

  const handlePreset = (value: number) => {
    setAmount(value.toString())
    setHasQuote(false)
  }

  const handleAmountChange = (value: string) => {
    // Only allow valid numeric input
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
      setHasQuote(false)
    }
  }

  const handlePreview = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsQuoting(true)
    // Simulate API call to POST /api/trade/quote
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsQuoting(false)
    setHasQuote(true)
  }

  const handleConfirm = () => {
    // TODO: Call POST /api/trade/quote with final confirmation
    // Then send wallet_sendCalls transaction via OnchainKit
    console.log("Trade confirmed:", {
      coin: coin.id,
      side,
      amount: Number.parseFloat(amount),
    })
    onClose()
    // Reset state
    setAmount("")
    setHasQuote(false)
  }

  const estimatedReceive = amount
    ? side === "buy"
      ? (Number.parseFloat(amount) / coin.price).toFixed(2)
      : (Number.parseFloat(amount) * coin.price).toFixed(6)
    : "0"

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
      >
        <div className="p-4">
          {/* Handle */}
          <div className="mb-4 flex justify-center">
            <div className="h-1 w-12 rounded-full bg-muted" />
          </div>

          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={coin.avatar || "/placeholder.svg"}
                alt={coin.name}
                className="h-10 w-10 rounded-full bg-muted"
              />
              <div>
                <span className="font-semibold text-foreground">{coin.name}</span>
                <span className="ml-2 text-muted-foreground">{coin.ticker}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Buy/Sell Tabs */}
          <div className="mb-6 flex gap-2 rounded-xl bg-secondary p-1">
            <button
              onClick={() => {
                setSide("buy")
                setHasQuote(false)
              }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                side === "buy"
                  ? "bg-success text-success-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => {
                setSide("sell")
                setHasQuote(false)
              }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                side === "sell"
                  ? "bg-destructive text-destructive-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sell
            </button>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="mb-2 block text-sm text-muted-foreground">{side === "buy" ? "Spend" : "Sell"}</label>
            <div className="flex items-center gap-2 rounded-xl bg-secondary p-3">
              <button className="flex items-center gap-1 rounded-lg bg-card px-3 py-2 text-sm font-medium text-foreground">
                {side === "buy" ? "ETH" : coin.ticker}
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent text-right text-xl font-semibold text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Presets */}
          <div className="mb-6 flex gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => handlePreset(preset)}
                className="flex-1 rounded-lg bg-secondary py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
              >
                {preset} {side === "buy" ? "ETH" : coin.ticker.replace("$", "")}
              </button>
            ))}
          </div>

          {/* Summary */}
          <div className="mb-4 space-y-2 rounded-xl bg-secondary/50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">You will receive</span>
              <span className="font-medium text-foreground">
                ~{estimatedReceive} {side === "buy" ? coin.ticker : "ETH"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price</span>
              <span className="text-foreground">${formatPrice(coin.price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Est. price impact</span>
              <span className="text-foreground">{"<"}0.1%</span>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mb-4 text-center text-xs text-muted-foreground">
            Experimental creator & content coins. Do your own research.
          </p>

          {/* CTA Button */}
          <button
            onClick={hasQuote ? handleConfirm : handlePreview}
            disabled={!amount || Number.parseFloat(amount) <= 0 || isQuoting}
            className={`flex h-14 w-full items-center justify-center rounded-xl font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 ${
              hasQuote
                ? side === "buy"
                  ? "bg-success text-success-foreground"
                  : "bg-destructive text-destructive-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {isQuoting ? "Getting quote..." : hasQuote ? `Confirm ${side === "buy" ? "Buy" : "Sell"}` : "Preview trade"}
          </button>
        </div>
      </div>
    </>
  )
}
