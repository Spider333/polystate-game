"use client"

import { getTurnLabel, TOTAL_TURNS } from "@/engine/constants"
import { formatCash } from "@/lib/utils"

interface TurnBarProps {
  turn: number
  phase: string
  cash?: number
  taxRate?: number
  score?: number
}

export default function TurnBar({ turn, phase, cash, taxRate, score }: TurnBarProps) {
  const progress = (turn / TOTAL_TURNS) * 100

  return (
    <div className="panel p-3 sm:p-4">
      {/* Top row: turn info + key stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-accent-green glow-green font-pixel">
            {getTurnLabel(turn)}
          </span>
          <span className="text-[9px] text-text-muted">
            Turn {turn}/{TOTAL_TURNS}
          </span>
        </div>

        {/* Quick stats in header */}
        <div className="flex items-center gap-4">
          {score !== undefined && (
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] text-text-muted">Score</span>
              <span className="text-[10px] text-accent-gold font-pixel glow-gold">{score}</span>
            </div>
          )}
          {cash !== undefined && (
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] text-text-muted">Cash</span>
              <span className={`text-[10px] font-pixel ${cash < 5000 ? "text-danger-red" : "text-accent-green"}`}>
                {formatCash(cash)}
              </span>
            </div>
          )}
          {taxRate !== undefined && (
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] text-text-muted">Tax</span>
              <span className={`text-[10px] font-pixel ${taxRate === 0 ? "text-accent-green glow-green" : taxRate >= 20 ? "text-danger-red" : "text-accent-gold"}`}>
                {taxRate}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="turn-track">
        <div className="turn-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
