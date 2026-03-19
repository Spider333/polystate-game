"use client"

import { getFlagEmoji } from "@/lib/utils"
import countriesData from "@/data/countries.json"
import type { Country } from "@/engine/types"

const countries = countriesData as Country[]

interface FlagTimelineProps {
  flagIds: string[]
}

export default function FlagTimeline({ flagIds }: FlagTimelineProps) {
  if (flagIds.length === 0 || (flagIds.length === 1 && flagIds[0] === "")) {
    return (
      <div className="panel p-5 text-center rounded-xl">
        <p className="text-[10px] text-text-muted">No flags planted</p>
        <p className="text-[8px] text-text-muted mt-1">Try planting at least one flag next game!</p>
      </div>
    )
  }

  return (
    <div className="panel p-5 space-y-3 rounded-xl">
      <h3 className="text-[10px] text-accent-green text-center uppercase tracking-widest">
        Your Flag Setup
      </h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {flagIds.map((id, i) => {
          const country = countries.find((c) => c.id === id)
          return (
            <div
              key={i}
              className="text-center space-y-1 animate-bounce-in"
              style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}
            >
              <div className="text-3xl">{getFlagEmoji(id)}</div>
              <div className="text-[8px] text-text-primary">{country?.name ?? id}</div>
              <div className="text-[7px] text-text-muted">{country?.tier}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
