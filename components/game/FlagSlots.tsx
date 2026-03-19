"use client"

import type { PlantedFlag, Country } from "@/engine/types"
import { getFlagEmoji, getCategoryLabel, formatCash } from "@/lib/utils"

interface FlagSlotsProps {
  flags: PlantedFlag[]
  countries: Country[]
}

const CATEGORIES = [
  { key: "residency" as const, icon: "\uD83C\uDFE0", color: "accent-green" },
  { key: "tax" as const, icon: "\uD83D\uDCB0", color: "accent-gold" },
  { key: "business" as const, icon: "\uD83C\uDFE2", color: "accent-blue" },
]

export default function FlagSlots({ flags, countries }: FlagSlotsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {CATEGORIES.map(({ key, icon, color }) => {
        const flag = flags.find((f) => f.category === key)
        const country = flag ? countries.find((c) => c.id === flag.countryId) : null
        const isActive = !!flag

        return (
          <div
            key={key}
            className={`p-3 text-center space-y-1 rounded-lg transition-all duration-300 ${
              isActive ? "flag-slot-active" : "flag-slot"
            }`}
          >
            <div className={`text-[7px] text-${color} uppercase tracking-widest`}>
              {icon} {getCategoryLabel(key)}
            </div>

            {flag && country ? (
              <div className="animate-bounce-in">
                <div className="text-2xl my-1">{getFlagEmoji(flag.countryId)}</div>
                <div className="text-[8px] text-text-primary">{country.name}</div>
                <div className="text-[7px] text-text-muted">{formatCash(flag.annualCost)}/yr</div>
                {key === "tax" && (
                  <div className={`text-[8px] font-pixel ${flag.taxRate === 0 ? "text-accent-green glow-green" : "text-accent-gold"}`}>
                    {flag.taxRate}%
                  </div>
                )}
              </div>
            ) : (
              <div className="py-2">
                <div className="text-xl opacity-10">?</div>
                <div className="text-[7px] text-text-muted mt-1">Empty</div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
