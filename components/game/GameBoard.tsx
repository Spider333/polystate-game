"use client"

import { useReducer, useEffect } from "react"
import { gameReducer, getInitialState } from "@/engine/reducer"
import type { Program } from "@/engine/types"
import programsData from "@/data/programs.json"
import TurnBar from "./TurnBar"
import ScorePanel from "./ScorePanel"
import CountryPicker from "./CountryPicker"
import FlagSlots from "./FlagSlots"
import EventCard from "./EventCard"
import ActionButtons from "./ActionButtons"
import PixelButton from "@/components/ui/PixelButton"
import { useRouter } from "next/navigation"

const programs = programsData as Program[]

export default function GameBoard() {
  const [state, dispatch] = useReducer(gameReducer, getInitialState())
  const router = useRouter()

  // Auto-advance phases
  useEffect(() => {
    if (state.phase === "INCOME") {
      const timer = setTimeout(() => dispatch({ type: "COLLECT_INCOME" }), 400)
      return () => clearTimeout(timer)
    }
    if (state.phase === "MAINTENANCE") {
      const timer = setTimeout(() => dispatch({ type: "PAY_MAINTENANCE" }), 400)
      return () => clearTimeout(timer)
    }
  }, [state.phase, state.turn])

  // Navigate to results on game over
  useEffect(() => {
    if (state.phase === "GAME_OVER") {
      const flagIds = state.flags.map((f) => f.countryId).join(",")
      const params = new URLSearchParams({
        score: String(state.score.total),
        medal: state.score.medal,
        flags: flagIds,
        cash: String(state.cash),
        tax: String(state.score.taxEfficiency),
        div: String(state.score.diversification),
        safe: String(state.score.safety),
        priv: String(state.score.privacy),
        biz: String(state.score.businessEase),
        cost: String(state.score.costEfficiency),
      })
      router.push(`/results?${params.toString()}`)
    }
  }, [state.phase, state.score, state.cash, state.flags, router])

  if (state.phase === "NOT_STARTED") {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-6 max-w-lg">
          <h1 className="text-xl sm:text-2xl text-accent-gold pixel-text-shadow">
            FLAG RUNNER
          </h1>
          <p className="text-[10px] text-text-muted leading-relaxed">
            Plant your flags across 20 real countries. Minimize taxes, maximize sovereignty.
            You have 20 turns (5 years) and $50K to start.
          </p>
          <PixelButton
            onClick={() => dispatch({ type: "START_GAME" })}
            size="lg"
            variant="primary"
          >
            Start Game
          </PixelButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-3 sm:p-4 space-y-3">
      {/* Header */}
      <TurnBar turn={state.turn} phase={state.phase} />

      {/* Event Modal */}
      {state.phase === "EVENT" && state.currentEvent && (
        <EventCard
          event={state.currentEvent}
          onAcknowledge={() => dispatch({ type: "ACKNOWLEDGE_EVENT" })}
        />
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-3">
        {/* Sidebar */}
        <div className="space-y-3">
          <ScorePanel
            score={state.score}
            cash={state.cash}
            taxRate={state.taxRate}
          />
          <FlagSlots flags={state.flags} countries={state.countries} />
        </div>

        {/* Main Area */}
        <div className="space-y-3">
          {state.phase === "ACTION" && (
            <CountryPicker
              countries={state.countries}
              programs={programs}
              onSelectProgram={(program) =>
                dispatch({ type: "PLANT_FLAG", program })
              }
              cash={state.cash}
              flags={state.flags}
            />
          )}

          {(state.phase === "INCOME" || state.phase === "MAINTENANCE") && (
            <div className="flex items-center justify-center h-32">
              <div className="text-[10px] text-text-muted animate-pixel-pulse">
                {state.phase === "INCOME"
                  ? "Collecting income..."
                  : "Paying maintenance..."}
              </div>
            </div>
          )}

          <ActionButtons
            onSkip={() => dispatch({ type: "SKIP_ACTION" })}
            phase={state.phase}
            onEndTurn={() => dispatch({ type: "END_TURN" })}
          />
        </div>
      </div>
    </div>
  )
}
