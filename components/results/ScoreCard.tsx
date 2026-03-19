"use client"

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

const DIMS = [
  { key: "tax" as const, label: "Tax Efficiency", max: 35, gradient: "from-accent-green to-accent-teal" },
  { key: "div" as const, label: "Diversification", max: 20, gradient: "from-accent-blue to-accent-teal" },
  { key: "safe" as const, label: "Safety", max: 15, gradient: "from-accent-teal to-accent-green" },
  { key: "priv" as const, label: "Privacy", max: 15, gradient: "from-accent-orange to-accent-gold" },
  { key: "biz" as const, label: "Business Ease", max: 10, gradient: "from-accent-gold to-accent-orange" },
  { key: "cost" as const, label: "Cost Efficiency", max: 5, gradient: "from-text-secondary to-text-muted" },
]

export default function ScoreCard({ score, medal, breakdown }: ScoreCardProps) {
  return (
    <div className={`${medal === "diamond" || medal === "gold" ? "panel-gold" : "panel-accent"} p-6 space-y-5 rounded-xl`}>
      <div className="text-center space-y-3">
        <div className="text-[8px] text-text-muted uppercase tracking-widest">
          Sovereignty Score
        </div>

        <div className="text-5xl text-accent-gold glow-gold font-pixel animate-bounce-in">
          {score}
        </div>

        {medal !== "none" && (
          <div className="space-y-1 animate-bounce-in" style={{ animationDelay: "0.2s" }}>
            <div className="text-3xl">{getMedalEmoji(medal)}</div>
            <div className={`text-[10px] font-pixel ${
              medal === "diamond" ? "text-accent-blue" :
              medal === "gold" ? "text-accent-gold" :
              medal === "silver" ? "text-text-secondary" :
              "text-accent-orange"
            }`}>
              {getMedalLabel(medal)} MEDAL
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {DIMS.map((dim) => (
          <div key={dim.key} className="space-y-1">
            <div className="flex justify-between text-[8px]">
              <span className="text-text-muted">{dim.label}</span>
              <span className="text-text-secondary font-pixel">
                {breakdown[dim.key]}<span className="text-text-muted">/{dim.max}</span>
              </span>
            </div>
            <div className="score-bar">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${dim.gradient} transition-all duration-700`}
                style={{ width: `${(breakdown[dim.key] / dim.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
