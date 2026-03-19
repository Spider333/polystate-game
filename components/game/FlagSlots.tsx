"use client"

import type { PlantedFlag, Country } from "@/engine/types"
import { getFlagEmoji, getCategoryLabel, formatCash } from "@/lib/utils"
import PixelPanel from "@/components/ui/PixelPanel"

interface FlagSlotsProps {
  flags: PlantedFlag[]
  countries: Country[]
}

const CATEGORIES = ["residency", "tax", "business"] as const

export default function FlagSlots({ flags, countries }: FlagSlotsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {CATEGORIES.map((category) => {
        const flag = flags.find((f) => f.category === category)
        const country = flag
          ? countries.find((c) => c.id === flag.countryId)
          : null

        return (
          <PixelPanel
            key={category}
            variant={flag ? "accent" : "default"}
            className="text-center space-y-1"
          >
            <div className="text-[8px] text-text-muted uppercase">
              {getCategoryLabel(category)}
            </div>
            {flag && country ? (
              <>
                <div className="text-2xl">{getFlagEmoji(flag.countryId)}</div>
                <div className="text-[8px] text-text-primary">{country.name}</div>
                <div className="text-[8px] text-text-muted">
                  {formatCash(flag.annualCost)}/yr
                </div>
                {category === "tax" && (
                  <div className="text-[8px] text-accent-green">
                    {flag.taxRate}% tax
                  </div>
                )}
              </>
            ) : (
              <div className="text-2xl opacity-20">---</div>
            )}
          </PixelPanel>
        )
      })}
    </div>
  )
}
