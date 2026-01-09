"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import type { TimeWindow, FilterType } from "@/lib/types"

interface TimeframeDropdownProps {
  value: TimeWindow
  onChange: (value: TimeWindow) => void
}

const timeframeOptions: TimeWindow[] = ["1m", "5m", "15m", "30m", "1h", "4h", "24h", "7d", "30d"]

export function TimeframeDropdown({ value, onChange }: TimeframeDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
      >
        <span className="text-muted-foreground">Time:</span>
        <span>{value}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[120px] rounded-lg border border-border bg-card py-1 shadow-lg">
          {timeframeOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
              className={`block w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-secondary ${
                value === option ? "bg-secondary text-foreground" : "text-muted-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface FilterDropdownProps {
  value: FilterType
  onChange: (value: FilterType) => void
}

const filterOptions: FilterType[] = ["Trending", "Hot", "New", "Bullish", "All"]

export function FilterDropdown({ value, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
      >
        <span className="text-muted-foreground">Filter:</span>
        <span>{value}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[120px] rounded-lg border border-border bg-card py-1 shadow-lg">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
              className={`block w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-secondary ${
                value === option ? "bg-secondary text-foreground" : "text-muted-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
