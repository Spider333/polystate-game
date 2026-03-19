"use client"

import type { ScoreBreakdown } from "@/engine/types"
import { formatCash } from "@/lib/utils"
import PixelPanel from "@/components/ui/PixelPanel"

interface ScorePanelProps {
  score: ScoreBreakdown
  cash: number
  taxRate: number
}

export default function ScorePanel({ score, cash, taxRate }: ScorePanelProps) {
  return (
    <PixelPanel className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-text-muted">SOVEREIGNTY</span>
        <span className="text-lg text-accent-gold pixel-text-shadow font-pixel">
          {score.total}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-[10px] text-text-muted">CASH</span>
        <span className={`text-sm font-pixel ${cash < 0 ? "text-danger-red" : "text-accent-green"}`}>
          {formatCash(cash)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-[10px] text-text-muted">TAX RATE</span>
        <span className={`text-sm font-pixel ${taxRate === 0 ? "text-accent-green" : taxRate >= 20 ? "text-danger-red" : "text-accent-gold"}`}>
          {taxRate}%
        </span>
      </div>

      <div className="border-t border-white/10 pt-2 space-y-1">
        <ScoreBar label="Tax" value={score.taxEfficiency} max={35} />
        <ScoreBar label="Diversify" value={score.diversification} max={20} />
        <ScoreBar label="Safety" value={score.safety} max={15} />
        <ScoreBar label="Privacy" value={score.privacy} max={15} />
        <ScoreBar label="Business" value={score.businessEase} max={10} />
        <ScoreBar label="Cost" value={score.costEfficiency} max={5} />
      </div>
    </PixelPanel>
  )
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100

  return (
    <div className="flex items-center gap-2">
      <span className="text-[8px] text-text-muted w-16 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-bg-dark overflow-hidden">
        <div
          className="h-full bg-accent-gold transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[8px] text-text-muted w-8 text-right">{value}/{max}</span>
    </div>
  )
}
