"use client"

import { useReducer, useEffect, useState } from "react"
import { gameReducer, getInitialState } from "@/engine/reducer"
import type { Program } from "@/engine/types"
import programsData from "@/data/programs.json"
import TurnBar from "./TurnBar"
import ScorePanel from "./ScorePanel"
import CountryPicker from "./CountryPicker"
import FlagSlots from "./FlagSlots"
import EventCard from "./EventCard"
import ActionButtons from "./ActionButtons"
import WorldMap from "./WorldMap"
import PixelButton from "@/components/ui/PixelButton"
import { useRouter } from "next/navigation"
import { formatCash } from "@/lib/utils"

const programs = programsData as Program[]

export default function GameBoard() {
  const [state, dispatch] = useReducer(gameReducer, getInitialState())
  const [lastPlantedCountry, setLastPlantedCountry] = useState<string | null>(null)
  const router = useRouter()

  // Auto-advance phases
  useEffect(() => {
    if (state.phase === "INCOME") {
      const timer = setTimeout(() => dispatch({ type: "COLLECT_INCOME" }), 500)
      return () => clearTimeout(timer)
    }
    if (state.phase === "MAINTENANCE") {
      const timer = setTimeout(() => dispatch({ type: "PAY_MAINTENANCE" }), 500)
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

  // Not started — show intro within the /play page
  if (state.phase === "NOT_STARTED") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 grid-pattern bg-gradient-hero">
        <div className="text-center space-y-8 max-w-md animate-slide-up">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl text-accent-gold glow-gold">FLAG RUNNER</h1>
            <p className="text-[9px] text-text-muted">A Polystate Strategy Game</p>
          </div>

          <div className="panel p-5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <span className="text-xl">{"\uD83D\uDCB0"}</span>
              <div>
                <div className="text-[9px] text-text-primary">$50,000 starting cash</div>
                <div className="text-[7px] text-text-muted">+ $10K income every quarter</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">{"\uD83C\uDFF4"}</span>
              <div>
                <div className="text-[9px] text-text-primary">Plant flags in 20 countries</div>
                <div className="text-[7px] text-text-muted">Residency, Tax, and Business</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">{"\u23F3"}</span>
              <div>
                <div className="text-[9px] text-text-primary">20 turns (5 game years)</div>
                <div className="text-[7px] text-text-muted">Navigate events, maximize sovereignty</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">{"\uD83C\uDFC6"}</span>
              <div>
                <div className="text-[9px] text-text-primary">Score 95+ for Diamond</div>
                <div className="text-[7px] text-text-muted">Tax + Diversify + Safety + Privacy + Biz + Cost</div>
              </div>
            </div>
          </div>

          <PixelButton
            onClick={() => dispatch({ type: "START_GAME" })}
            size="lg"
            variant="primary"
            className="w-full sm:w-auto"
          >
            Begin Journey
          </PixelButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen grid-pattern">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 space-y-3">
        {/* Header */}
        <TurnBar
          turn={state.turn}
          phase={state.phase}
          cash={state.cash}
          taxRate={state.taxRate}
          score={state.score.total}
        />

        {/* Event Modal */}
        {state.phase === "EVENT" && state.currentEvent && (
          <EventCard
            event={state.currentEvent}
            onAcknowledge={() => dispatch({ type: "ACKNOWLEDGE_EVENT" })}
          />
        )}

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-3">
          {/* Sidebar */}
          <div className="space-y-3">
            <ScorePanel score={state.score} />
            <FlagSlots flags={state.flags} countries={state.countries} />
          </div>

          {/* Main Area */}
          <div className="space-y-3">
            {/* Phase indicator */}
            {state.phase === "ACTION" && (
              <div className="text-center py-1">
                <span className="text-[8px] text-accent-green uppercase tracking-widest">
                  Select a flag to plant, or skip this turn
                </span>
              </div>
            )}

            {(state.phase === "ACTION" || state.phase === "TURN_END") && (
              <WorldMap
                countries={state.countries}
                flags={state.flags}
                lastPlantedCountry={lastPlantedCountry}
              />
            )}

            {state.phase === "ACTION" && (
              <CountryPicker
                countries={state.countries}
                programs={programs}
                onSelectProgram={(program) => {
                  setLastPlantedCountry(program.countryId)
                  dispatch({ type: "PLANT_FLAG", program })
                }}
                cash={state.cash}
                flags={state.flags}
              />
            )}

            {(state.phase === "INCOME" || state.phase === "MAINTENANCE") && (
              <div className="flex flex-col items-center justify-center h-40 gap-3">
                <div className="text-3xl animate-float">
                  {state.phase === "INCOME" ? "\uD83D\uDCB5" : "\uD83D\uDCCB"}
                </div>
                <div className="text-[10px] text-text-secondary animate-pulse-soft">
                  {state.phase === "INCOME"
                    ? `Collecting ${formatCash(state.income)} income...`
                    : "Paying flag maintenance..."}
                </div>
              </div>
            )}

            {state.phase === "TURN_END" && (
              <div className="panel p-5 text-center space-y-3">
                <div className="text-[10px] text-text-secondary">
                  Turn {state.turn} complete
                </div>
                <div className="flex justify-center gap-6">
                  <div>
                    <div className="text-[8px] text-text-muted">Cash</div>
                    <div className="text-sm text-accent-green font-pixel">{formatCash(state.cash)}</div>
                  </div>
                  <div>
                    <div className="text-[8px] text-text-muted">Score</div>
                    <div className="text-sm text-accent-gold font-pixel">{state.score.total}</div>
                  </div>
                  <div>
                    <div className="text-[8px] text-text-muted">Flags</div>
                    <div className="text-sm text-accent-blue font-pixel">{state.flags.length}</div>
                  </div>
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
    </div>
  )
}
