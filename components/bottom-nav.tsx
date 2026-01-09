"use client"

import { TrendingUp, Star, User } from "lucide-react"

type Tab = "trending" | "watchlist" | "you"

interface BottomNavProps {
  activeTab?: Tab
  onTabChange?: (tab: Tab) => void
}

export function BottomNav({ activeTab = "trending", onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "trending" as Tab, label: "Trending", icon: TrendingUp },
    { id: "watchlist" as Tab, label: "Watchlist", icon: Star },
    { id: "you" as Tab, label: "You", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`flex flex-1 flex-col items-center gap-1 py-3 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
