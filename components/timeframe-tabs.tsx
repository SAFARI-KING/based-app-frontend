"use client"

import type { TimeWindow } from "@/lib/types"

interface TimeframeTabsProps {
  selectedWindow: TimeWindow
  onSelect: (window: TimeWindow) => void
}

const timeframes: TimeWindow[] = ["1m", "5m", "15m", "30m", "1h", "4h", "24h"]

export function TimeframeTabs({ selectedWindow, onSelect }: TimeframeTabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-none">
      {timeframes.map((tf) => (
        <button
          key={tf}
          onClick={() => onSelect(tf)}
          className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            selectedWindow === tf ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tf}
        </button>
      ))}
    </div>
  )
}
