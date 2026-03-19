"use client"

import { getTurnLabel, TOTAL_TURNS } from "@/engine/constants"

interface TurnBarProps {
  turn: number
  phase: string
}

export default function TurnBar({ turn, phase }: TurnBarProps) {
  const progress = (turn / TOTAL_TURNS) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] text-accent-green pixel-text-shadow">
          {getTurnLabel(turn)}
        </span>
        <span className="text-[10px] text-text-muted">
          Turn {turn}/{TOTAL_TURNS}
        </span>
      </div>
      <div className="w-full h-3 bg-bg-dark pixel-border overflow-hidden">
        <div
          className="h-full bg-accent-green transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
