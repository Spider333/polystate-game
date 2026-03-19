"use client"

import PixelPanel from "@/components/ui/PixelPanel"
import { getMedalEmoji, getMedalLabel } from "@/lib/utils"
import type { Medal } from "@/engine/types"

interface ScoreCardProps {
  score: number
  medal: Medal
  breakdown: {
    tax: number
    div: number
    safe: number
    priv: number
    biz: number
    cost: number
  }
}

export default function ScoreCard({ score, medal, breakdown }: ScoreCardProps) {
  return (
    <PixelPanel variant={medal === "diamond" || medal === "gold" ? "gold" : "accent"} className="text-center space-y-4">
      <div className="text-[10px] text-text-muted uppercase">
        Sovereignty Score
      </div>

      <div className="text-4xl text-accent-gold pixel-text-shadow font-pixel">
        {score}
      </div>

      {medal !== "none" && (
        <div className="space-y-1">
          <div className="text-2xl">{getMedalEmoji(medal)}</div>
          <div className="text-[10px] text-accent-gold">{getMedalLabel(medal)}</div>
        </div>
      )}

      <div className="space-y-2 text-left">
        <Bar label="Tax Efficiency" value={breakdown.tax} max={35} />
        <Bar label="Diversification" value={breakdown.div} max={20} />
        <Bar label="Safety" value={breakdown.safe} max={15} />
        <Bar label="Privacy" value={breakdown.priv} max={15} />
        <Bar label="Business Ease" value={breakdown.biz} max={10} />
        <Bar label="Cost Efficiency" value={breakdown.cost} max={5} />
      </div>
    </PixelPanel>
  )
}

function Bar({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[8px]">
        <span className="text-text-muted">{label}</span>
        <span className="text-text-primary">{value}/{max}</span>
      </div>
      <div className="h-2 bg-bg-dark overflow-hidden">
        <div
          className="h-full bg-accent-gold transition-all duration-500"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  )
}
