"use client"

import type { ReactNode } from "react"

// Placeholder for MiniKit and OnchainKit providers
// These will be configured when the actual SDK is integrated

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  // In production, wrap with:
  // <MiniKitProvider>
  //   <OnchainKitProvider>
  //     {children}
  //   </OnchainKitProvider>
  // </MiniKitProvider>
  return <>{children}</>
}
