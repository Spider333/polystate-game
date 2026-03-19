import type { PlantedFlag, Country, ScoreBreakdown, Medal } from "./types"
import { DEFAULT_TAX_RATE, MEDAL_THRESHOLDS } from "./constants"

export function calculateScore(
  flags: PlantedFlag[],
  countries: Country[]
): ScoreBreakdown {
  const taxEfficiency = calcTaxEfficiency(flags, countries)
  const diversification = calcDiversification(flags)
  const safety = calcSafety(flags, countries)
  const privacy = calcPrivacy(flags, countries)
  const businessEase = calcBusinessEase(flags, countries)
  const costEfficiency = calcCostEfficiency(flags, countries)

  const total = Math.round(
    taxEfficiency + diversification + safety + privacy + businessEase + costEfficiency
  )

  return {
    taxEfficiency,
    diversification,
    safety,
    privacy,
    businessEase,
    costEfficiency,
    total,
    medal: getMedal(total),
  }
}

function calcTaxEfficiency(flags: PlantedFlag[], countries: Country[]): number {
  const taxFlag = flags.find((f) => f.category === "tax")
  if (!taxFlag) return 0

  const country = countries.find((c) => c.id === taxFlag.countryId)
  if (!country) return 0

  const rate = country.effectiveRate
  const maxPoints = 35
  return Math.round(maxPoints * (1 - rate / DEFAULT_TAX_RATE))
}

function calcDiversification(flags: PlantedFlag[]): number {
  if (flags.length === 0) return 0

  const maxPoints = 20
  const uniqueCountries = new Set(flags.map((f) => f.countryId))
  const categories = new Set(flags.map((f) => f.category))

  const countryScore = Math.min(uniqueCountries.size, 3) / 3
  const categoryScore = categories.size / 3

  let score = maxPoints * (countryScore * 0.6 + categoryScore * 0.4)

  // Concentration penalty: all flags in 1 country
  if (flags.length > 1 && uniqueCountries.size === 1) {
    score = score / 2
  }

  return Math.round(score)
}

function calcSafety(flags: PlantedFlag[], countries: Country[]): number {
  if (flags.length === 0) return 0

  const maxPoints = 15
  const safetyScores = flags
    .map((f) => countries.find((c) => c.id === f.countryId)?.safetyScore ?? 0)

  const avg = safetyScores.reduce((a, b) => a + b, 0) / safetyScores.length
  return Math.round(maxPoints * (avg / 10))
}

function calcPrivacy(flags: PlantedFlag[], countries: Country[]): number {
  if (flags.length === 0) return 0

  const maxPoints = 15
  const privacyScores = flags
    .map((f) => countries.find((c) => c.id === f.countryId)?.privacyScore ?? 0)

  const avg = privacyScores.reduce((a, b) => a + b, 0) / privacyScores.length
  return Math.round(maxPoints * (avg / 10))
}

function calcBusinessEase(flags: PlantedFlag[], countries: Country[]): number {
  const bizFlag = flags.find((f) => f.category === "business")
  if (!bizFlag) return 0

  const maxPoints = 10
  const country = countries.find((c) => c.id === bizFlag.countryId)
  if (!country) return 0

  return Math.round(maxPoints * (country.businessEaseScore / 10))
}

function calcCostEfficiency(flags: PlantedFlag[], countries: Country[]): number {
  if (flags.length === 0) return 0

  const maxPoints = 5
  const totalAnnualCost = flags.reduce((sum, f) => sum + f.annualCost, 0)

  // Lower annual cost = higher score. $0 = 5pts, $15000+ = 0pts
  const ratio = Math.max(0, 1 - totalAnnualCost / 15000)
  return Math.round(maxPoints * ratio)
}

function getMedal(score: number): Medal {
  if (score >= MEDAL_THRESHOLDS.diamond) return "diamond"
  if (score >= MEDAL_THRESHOLDS.gold) return "gold"
  if (score >= MEDAL_THRESHOLDS.silver) return "silver"
  if (score >= MEDAL_THRESHOLDS.bronze) return "bronze"
  return "none"
}
