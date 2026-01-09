"use client"

interface SparklineProps {
  positive?: boolean
}

export function Sparkline({ positive = true }: SparklineProps) {
  // Generate random sparkline data
  const points = Array.from({ length: 24 }, () => Math.random() * 60 + 20)
  const max = Math.max(...points)
  const min = Math.min(...points)
  const height = 80
  const width = 280

  const pathD = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width
      const y = height - ((p - min) / (max - min)) * height
      return `${i === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-20 w-full">
      <defs>
        <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={positive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} stopOpacity="0.3" />
          <stop offset="100%" stopColor={positive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#sparkline-gradient)" />
      <path
        d={pathD}
        fill="none"
        stroke={positive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
