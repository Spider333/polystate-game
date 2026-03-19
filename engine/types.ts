export type Tier = "HEAVEN" | "PARADISE" | "PURGATORY" | "LIMBO" | "HELL"
export type FlagCategory = "residency" | "tax" | "business"
export type CostLevel = "Very Low" | "Low" | "Moderate" | "High" | "Very High"

export interface Country {
  id: string
  name: string
  region: string
  tier: Tier
  effectiveRate: number
  corporateTax: number
  safetyScore: number
  businessEaseScore: number
  privacyScore: number
  costOfLiving: CostLevel
  dualNationalityAllowed: boolean
  summary: string
  businessOnly?: boolean
}

export interface Program {
  id: string
  countryId: string
  name: string
  category: FlagCategory
  cost: number
  annualCost: number
  processingTurns: number
  taxRate: number
  description: string
}

export interface PlantedFlag {
  programId: string
  countryId: string
  category: FlagCategory
  plantedOnTurn: number
  annualCost: number
  taxRate: number
}

export interface EventEffect {
  type: "cost_increase" | "cost_decrease" | "score_change" | "bonus_cash"
  targets?: string[]
  categories?: FlagCategory[]
  amount?: number
  message: string
  field?: string
  newValue?: number
  condition?: {
    countryId?: string
    category?: FlagCategory
    minUniqueCountries?: number
  }
}

export interface GameEvent {
  id: string
  turn: number
  title: string
  description: string
  effect: EventEffect
}

export type Medal = "none" | "bronze" | "silver" | "gold" | "diamond"

export interface ScoreBreakdown {
  taxEfficiency: number
  diversification: number
  safety: number
  privacy: number
  businessEase: number
  costEfficiency: number
  total: number
  medal: Medal
}

export type GamePhase =
  | "NOT_STARTED"
  | "INCOME"
  | "EVENT"
  | "ACTION"
  | "MAINTENANCE"
  | "TURN_END"
  | "GAME_OVER"

export interface GameState {
  phase: GamePhase
  turn: number
  cash: number
  income: number
  taxRate: number
  flags: PlantedFlag[]
  score: ScoreBreakdown
  currentEvent: GameEvent | null
  eventAcknowledged: boolean
  history: TurnRecord[]
  countries: Country[]
}

export interface TurnRecord {
  turn: number
  action: string
  cashBefore: number
  cashAfter: number
  scoreAfter: number
}

export type GameAction =
  | { type: "START_GAME" }
  | { type: "COLLECT_INCOME" }
  | { type: "ACKNOWLEDGE_EVENT" }
  | { type: "PLANT_FLAG"; program: Program }
  | { type: "SKIP_ACTION" }
  | { type: "PAY_MAINTENANCE" }
  | { type: "END_TURN" }
  | { type: "NEXT_PHASE" }
