"use client"

import type { Country, Program } from "@/engine/types"
import { getFlagEmoji, getTierColor, formatCash, getCategoryIcon } from "@/lib/utils"

interface CountryCardProps {
  country: Country
  programs: Program[]
  onSelectProgram: (program: Program) => void
  cash: number
  currentFlags: { category: string; countryId: string }[]
}

export default function CountryCard({
  country,
  programs,
  onSelectProgram,
  cash,
  currentFlags,
}: CountryCardProps) {
  return (
    <div className="bg-bg-panel pixel-border p-3 space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-lg">{getFlagEmoji(country.id)}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-[10px] text-text-primary truncate">{country.name}</h3>
          <span className={`text-[8px] ${getTierColor(country.tier)}`}>
            {country.tier}
          </span>
        </div>
        <span className="text-[8px] text-text-muted">{country.effectiveRate}%</span>
      </div>

      <p className="text-[8px] text-text-muted leading-relaxed">{country.summary}</p>

      <div className="space-y-1">
        {programs.map((p) => {
          const hasFlag = currentFlags.some(
            (f) => f.category === p.category && f.countryId === p.countryId
          )
          const canAfford = cash >= p.cost

          return (
            <button
              key={p.id}
              onClick={() => onSelectProgram(p)}
              disabled={!canAfford || hasFlag}
              className={`
                w-full flex items-center justify-between gap-1 px-2 py-1.5
                text-[8px] font-pixel transition-all
                ${hasFlag
                  ? "bg-accent-green/20 text-accent-green cursor-default"
                  : canAfford
                    ? "bg-bg-dark hover:bg-accent-green/10 text-text-primary cursor-pointer"
                    : "bg-bg-dark text-text-muted opacity-50 cursor-not-allowed"
                }
              `}
            >
              <span className="flex items-center gap-1 truncate">
                <span>{getCategoryIcon(p.category)}</span>
                <span className="truncate">{p.name}</span>
              </span>
              <span className="shrink-0">
                {hasFlag ? "ACTIVE" : formatCash(p.cost)}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
