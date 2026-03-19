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
    <div className="country-tile p-3 space-y-2.5">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="text-2xl animate-float" style={{ animationDuration: "4s" }}>
          {getFlagEmoji(country.id)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[10px] text-text-primary truncate">{country.name}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[8px] font-pixel ${getTierColor(country.tier)}`}>
              {country.tier}
            </span>
            <span className="text-[8px] text-text-muted">
              {country.effectiveRate === 0 ? (
                <span className="text-accent-green">0% tax</span>
              ) : (
                `${country.effectiveRate}% tax`
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-[8px] text-text-muted leading-relaxed">{country.summary}</p>

      {/* Stats row */}
      <div className="flex gap-1.5">
        <MiniStat label="Safe" value={country.safetyScore} />
        <MiniStat label="Biz" value={country.businessEaseScore} />
        <MiniStat label="Priv" value={country.privacyScore} />
      </div>

      {/* Programs */}
      <div className="space-y-1.5">
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
                w-full flex items-center justify-between gap-1 px-2.5 py-2
                text-[8px] font-pixel rounded-md transition-all duration-200
                ${hasFlag
                  ? "bg-accent-green/15 text-accent-green border border-accent-green/20"
                  : canAfford
                    ? "bg-bg-dark/60 hover:bg-accent-green/10 text-text-primary border border-transparent hover:border-accent-green/20 cursor-pointer"
                    : "bg-bg-dark/30 text-text-muted opacity-40 cursor-not-allowed border border-transparent"
                }
              `}
            >
              <span className="flex items-center gap-1.5 truncate">
                <span>{getCategoryIcon(p.category)}</span>
                <span className="truncate">{p.name}</span>
              </span>
              <span className="shrink-0 ml-2">
                {hasFlag ? (
                  <span className="text-accent-green">ACTIVE</span>
                ) : (
                  <span>{formatCash(p.cost)}</span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: number }) {
  const barWidth = (value / 10) * 100
  return (
    <div className="flex-1 space-y-0.5">
      <div className="text-[6px] text-text-muted text-center">{label}</div>
      <div className="h-1.5 rounded-full bg-bg-dark/60 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-teal to-accent-green transition-all"
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  )
}
