export const STARTING_CASH = 50000
export const QUARTERLY_INCOME = 10000
export const TOTAL_TURNS = 20
export const DEFAULT_TAX_RATE = 30
export const TURNS_PER_YEAR = 4

export const MEDAL_THRESHOLDS = {
  diamond: 95,
  gold: 85,
  silver: 70,
  bronze: 50,
} as const

export function getTurnLabel(turn: number): string {
  const year = Math.floor((turn - 1) / TURNS_PER_YEAR) + 1
  const quarter = ((turn - 1) % TURNS_PER_YEAR) + 1
  return `Q${quarter} Year ${year}`
}
