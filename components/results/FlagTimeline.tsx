"use client"

import { getFlagEmoji, getCategoryLabel } from "@/lib/utils"
import PixelPanel from "@/components/ui/PixelPanel"
import countriesData from "@/data/countries.json"
import type { Country } from "@/engine/types"

const countries = countriesData as Country[]

interface FlagTimelineProps {
  flagIds: string[]
}

export default function FlagTimeline({ flagIds }: FlagTimelineProps) {
  if (flagIds.length === 0 || (flagIds.length === 1 && flagIds[0] === "")) {
    return (
      <PixelPanel className="text-center">
        <p className="text-[10px] text-text-muted">No flags planted</p>
      </PixelPanel>
    )
  }

  return (
    <PixelPanel className="space-y-3">
      <h3 className="text-[10px] text-accent-green">YOUR FLAGS</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {flagIds.map((id, i) => {
          const country = countries.find((c) => c.id === id)
          return (
            <div key={i} className="text-center space-y-1">
              <div className="text-2xl">{getFlagEmoji(id)}</div>
              <div className="text-[8px] text-text-primary">
                {country?.name ?? id}
              </div>
            </div>
          )
        })}
      </div>
    </PixelPanel>
  )
}
