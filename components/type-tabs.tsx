"use client"

import type { CoinType } from "@/lib/types"

interface TypeTabsProps {
  selectedType: CoinType
  onSelect: (type: CoinType) => void
}

export function TypeTabs({ selectedType, onSelect }: TypeTabsProps) {
  return (
    <div className="flex w-full gap-2 rounded-xl bg-card p-1">
      <button
        onClick={() => onSelect("content")}
        className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
          selectedType === "content"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Content Coins
      </button>
      <button
        onClick={() => onSelect("creator")}
        className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
          selectedType === "creator"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Creator Coins
      </button>
    </div>
  )
}
