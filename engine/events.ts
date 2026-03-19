import type { GameState, GameEvent, PlantedFlag, Country } from "./types"

export function applyEvent(state: GameState, event: GameEvent): GameState {
  const { effect } = event
  let newState = { ...state }

  switch (effect.type) {
    case "cost_increase": {
      newState.flags = state.flags.map((f) => {
        if (
          effect.targets?.includes(f.countryId) &&
          effect.categories?.includes(f.category)
        ) {
          return { ...f, annualCost: f.annualCost + (effect.amount ?? 0) }
        }
        return f
      })
      break
    }

    case "cost_decrease": {
      newState.flags = state.flags.map((f) => {
        if (
          effect.targets?.includes(f.countryId) &&
          effect.categories?.includes(f.category)
        ) {
          return {
            ...f,
            annualCost: Math.max(0, f.annualCost - (effect.amount ?? 0)),
          }
        }
        return f
      })
      break
    }

    case "score_change": {
      newState.countries = state.countries.map((c) => {
        if (effect.targets?.includes(c.id) && effect.field) {
          return { ...c, [effect.field]: effect.newValue }
        }
        return c
      })
      break
    }

    case "bonus_cash": {
      let qualifies = false

      if (effect.condition?.countryId && effect.condition?.category) {
        qualifies = state.flags.some(
          (f) =>
            f.countryId === effect.condition!.countryId &&
            f.category === effect.condition!.category
        )
      } else if (effect.condition?.minUniqueCountries) {
        const unique = new Set(state.flags.map((f) => f.countryId))
        qualifies = unique.size >= effect.condition.minUniqueCountries
      } else {
        qualifies = true
      }

      if (qualifies) {
        newState.cash = state.cash + (effect.amount ?? 0)
      }
      break
    }
  }

  return newState
}
