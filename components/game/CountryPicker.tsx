"use client"

import type { Country, Program, PlantedFlag } from "@/engine/types"
import CountryCard from "./CountryCard"

interface CountryPickerProps {
  countries: Country[]
  programs: Program[]
  onSelectProgram: (program: Program) => void
  cash: number
  flags: PlantedFlag[]
}

export default function CountryPicker({
  countries,
  programs,
  onSelectProgram,
  cash,
  flags,
}: CountryPickerProps) {
  const currentFlags = flags.map((f) => ({
    category: f.category,
    countryId: f.countryId,
  }))

  return (
    <div className="space-y-3">
      <h2 className="text-[10px] text-accent-green pixel-text-shadow">
        CHOOSE A FLAG TO PLANT
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto scrollbar-pixel pr-1">
        {countries.map((country) => {
          const countryPrograms = programs.filter(
            (p) => p.countryId === country.id
          )
          if (countryPrograms.length === 0) return null

          return (
            <CountryCard
              key={country.id}
              country={country}
              programs={countryPrograms}
              onSelectProgram={onSelectProgram}
              cash={cash}
              currentFlags={currentFlags}
            />
          )
        })}
      </div>
    </div>
  )
}
