export function CoinCardSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-3 rounded-xl bg-card p-3">
      <div className="h-12 w-12 rounded-full bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-3 w-16 rounded bg-muted" />
      </div>
      <div className="space-y-2 text-right">
        <div className="h-4 w-16 rounded bg-muted" />
        <div className="h-3 w-12 rounded bg-muted" />
      </div>
      <div className="h-11 w-20 rounded-lg bg-muted" />
    </div>
  )
}
