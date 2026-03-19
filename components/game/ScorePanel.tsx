"use client"

import type { ScoreBreakdown } from "@/engine/types"
import { getMedalEmoji } from "@/lib/utils"

interface ScorePanelProps {
  score: ScoreBreakdown
}

const DIMENSIONS = [
  { key: "taxEfficiency" as const, label: "Tax", max: 35, color: "from-accent-green to-accent-teal" },
  { key: "diversification" as const, label: "Diversify", max: 20, color: "from-accent-blue to-accent-teal" },
  { key: "safety" as const, label: "Safety", max: 15, color: "from-accent-teal to-accent-green" },
  { key: "privacy" as const, label: "Privacy", max: 15, color: "from-accent-orange to-accent-gold" },
  { key: "businessEase" as const, label: "Business", max: 10, color: "from-accent-gold to-accent-orange" },
  { key: "costEfficiency" as const, label: "Cost", max: 5, color: "from-text-secondary to-text-muted" },
]

export default function ScorePanel({ score }: ScorePanelProps) {
  return (
    <div className="panel p-4 space-y-3">
      {/* Big score number */}
      <div className="text-center space-y-1">
        <div className="text-[8px] text-text-muted uppercase tracking-widest">Sovereignty</div>
        <div className="text-2xl text-accent-gold glow-gold font-pixel">
          {score.total}
          {score.medal !== "none" && (
            <span className="ml-2 text-lg">{getMedalEmoji(score.medal)}</span>
          )}
        </div>
      </div>

      {/* Score bars */}
      <div className="space-y-2 pt-1">
        {DIMENSIONS.map((dim) => (
          <div key={dim.key} className="space-y-0.5">
            <div className="flex justify-between">
              <span className="text-[7px] text-text-muted">{dim.label}</span>
              <span className="text-[7px] text-text-secondary">
                {score[dim.key]}<span className="text-text-muted">/{dim.max}</span>
              </span>
            </div>
            <div className="score-bar">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${dim.color} transition-all duration-500`}
                style={{ width: `${(score[dim.key] / dim.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
