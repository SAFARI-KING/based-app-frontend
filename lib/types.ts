export type CoinType = "creator" | "content"

export type TimeWindow = "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "24h" | "7d" | "30d"

export type FilterType = "Trending" | "Hot" | "New" | "Bullish" | "All"

export type RiskLabel = "NEW" | "LOW_LIQ" | "SPICY" | "NORMAL"

export interface Coin {
  id: string
  type: CoinType
  symbol: string // e.g. "$JESSE"
  coinName: string // display name (content title for content coins, branded name for creator coins)
  creatorName: string // human-readable creator name
  creatorHandle: string // e.g. "@jesse"
  creatorAvatarUrl: string
  contentImageUrl?: string // only for content coins
  price: number
  priceChange: number
  volume: number
  liquidity: number
  launchedAt: Date
  riskLabel: RiskLabel
  creatorId?: string
}

export interface Trade {
  id: string
  coinId: string
  side: "BUY" | "SELL"
  size: number
  price: number
  timestamp: Date
}

export interface User {
  id: string
  username: string
  avatar: string
}

export interface Holding {
  coin: Coin
  amount: number
  value: number
}
