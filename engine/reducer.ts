import type { GameState, GameAction, PlantedFlag, TurnRecord } from "./types"
import { STARTING_CASH, QUARTERLY_INCOME, TOTAL_TURNS, DEFAULT_TAX_RATE } from "./constants"
import { calculateScore } from "./scoring"
import { applyEvent } from "./events"
import eventsData from "@/data/events.json"
import countriesData from "@/data/countries.json"
import type { GameEvent, Country } from "./types"

const events = eventsData as GameEvent[]
const defaultCountries = countriesData as Country[]

export function getInitialState(): GameState {
  const countries = [...defaultCountries]
  return {
    phase: "NOT_STARTED",
    turn: 0,
    cash: STARTING_CASH,
    income: QUARTERLY_INCOME,
    taxRate: DEFAULT_TAX_RATE,
    flags: [],
    score: calculateScore([], countries),
    currentEvent: null,
    eventAcknowledged: false,
    history: [],
    countries,
  }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME": {
      return {
        ...getInitialState(),
        phase: "INCOME",
        turn: 1,
      }
    }

    case "COLLECT_INCOME": {
      const taxPaid = Math.round(state.income * (state.taxRate / 100))
      const netIncome = state.income - taxPaid
      const event = events.find((e) => e.turn === state.turn) ?? null

      return {
        ...state,
        cash: state.cash + netIncome,
        phase: event ? "EVENT" : "ACTION",
        currentEvent: event,
        eventAcknowledged: false,
      }
    }

    case "ACKNOWLEDGE_EVENT": {
      if (!state.currentEvent) return { ...state, phase: "ACTION" }

      const afterEvent = applyEvent(state, state.currentEvent)
      return {
        ...afterEvent,
        phase: "ACTION",
        eventAcknowledged: true,
      }
    }

    case "PLANT_FLAG": {
      const { program } = action

      // Can't afford it
      if (state.cash < program.cost) return state

      // Already have a flag in this category
      const existing = state.flags.find((f) => f.category === program.category)

      let newFlags: PlantedFlag[]
      if (existing) {
        // Replace existing flag in this category
        newFlags = state.flags.map((f) =>
          f.category === program.category
            ? {
                programId: program.id,
                countryId: program.countryId,
                category: program.category,
                plantedOnTurn: state.turn,
                annualCost: program.annualCost,
                taxRate: program.taxRate,
              }
            : f
        )
      } else {
        newFlags = [
          ...state.flags,
          {
            programId: program.id,
            countryId: program.countryId,
            category: program.category,
            plantedOnTurn: state.turn,
            annualCost: program.annualCost,
            taxRate: program.taxRate,
          },
        ]
      }

      // Update tax rate if tax flag changed
      const taxFlag = newFlags.find((f) => f.category === "tax")
      const newTaxRate = taxFlag ? taxFlag.taxRate : DEFAULT_TAX_RATE

      const newScore = calculateScore(newFlags, state.countries)

      return {
        ...state,
        cash: state.cash - program.cost,
        flags: newFlags,
        taxRate: newTaxRate,
        score: newScore,
        phase: "MAINTENANCE",
      }
    }

    case "SKIP_ACTION": {
      return {
        ...state,
        phase: "MAINTENANCE",
      }
    }

    case "PAY_MAINTENANCE": {
      // Pay quarterly maintenance (annualCost / 4)
      const quarterlyMaintenance = state.flags.reduce(
        (sum, f) => sum + Math.round(f.annualCost / 4),
        0
      )

      const cashAfter = state.cash - quarterlyMaintenance
      const score = calculateScore(state.flags, state.countries)

      const record: TurnRecord = {
        turn: state.turn,
        action: state.flags.length > 0 ? "Maintained flags" : "No flags",
        cashBefore: state.cash,
        cashAfter,
        scoreAfter: score.total,
      }

      const isLastTurn = state.turn >= TOTAL_TURNS

      return {
        ...state,
        cash: cashAfter,
        score,
        history: [...state.history, record],
        phase: isLastTurn ? "GAME_OVER" : "TURN_END",
      }
    }

    case "END_TURN": {
      const nextTurn = state.turn + 1

      return {
        ...state,
        turn: nextTurn,
        phase: "INCOME",
        currentEvent: null,
        eventAcknowledged: false,
      }
    }

    case "NEXT_PHASE": {
      // Generic phase advancement for auto-transitions
      switch (state.phase) {
        case "INCOME":
          return gameReducer(state, { type: "COLLECT_INCOME" })
        case "MAINTENANCE":
          return gameReducer(state, { type: "PAY_MAINTENANCE" })
        case "TURN_END":
          return gameReducer(state, { type: "END_TURN" })
        default:
          return state
      }
    }

    default:
      return state
  }
}
