"use client"

import { useState, useEffect } from "react"
import { mockCreators, mockCoins, type Creator } from "@/lib/mock-data"

export function useCreator(creatorId: string | null) {
  const [creator, setCreator] = useState<Creator | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!creatorId) {
      setCreator(null)
      setLoading(false)
      return
    }

    setLoading(true)

    const timeout = setTimeout(() => {
      const found = mockCreators.find((c) => c.id === creatorId)

      if (found) {
        // Get all content coins by this creator
        const contentCoins = mockCoins.filter((coin) => coin.type === "content" && coin.creatorId === creatorId)
        setCreator({ ...found, contentCoins })
      } else {
        // Fallback: create a mock creator from coin data
        const coinWithCreator = mockCoins.find((c) => c.creatorId === creatorId)
        if (coinWithCreator) {
          setCreator({
            id: creatorId,
            name: coinWithCreator.creatorName,
            handle: coinWithCreator.creatorHandle,
            avatarUrl: coinWithCreator.creatorAvatarUrl,
            bio: "Base App Creator",
            creatorCoin:
              coinWithCreator.type === "creator"
                ? coinWithCreator
                : {
                    ...coinWithCreator,
                    type: "creator",
                    coinName: coinWithCreator.creatorName,
                  },
            contentCoins: mockCoins.filter((c) => c.type === "content" && c.creatorId === creatorId),
          })
        } else {
          setCreator(null)
        }
      }
      setLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [creatorId])

  return { creator, loading }
}
