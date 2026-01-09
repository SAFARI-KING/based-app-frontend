"use client"

import { mockUser } from "@/lib/mock-data"

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <h1 className="text-xl font-bold tracking-tight text-foreground">Based</h1>
      <button className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 transition-colors hover:bg-secondary">
        <img src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.username} className="h-6 w-6 rounded-full" />
        <span className="text-sm font-medium text-foreground">{mockUser.username}</span>
      </button>
    </header>
  )
}
