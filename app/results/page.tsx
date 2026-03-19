"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import ScoreCard from "@/components/results/ScoreCard"
import FlagTimeline from "@/components/results/FlagTimeline"
import CtaSection from "@/components/results/CtaSection"
import PixelButton from "@/components/ui/PixelButton"
import type { Medal } from "@/engine/types"

function ResultsContent() {
  const params = useSearchParams()

  const score = Number(params.get("score") ?? 0)
  const medal = (params.get("medal") ?? "none") as Medal
  const flags = params.get("flags") ?? ""
  const flagIds = flags ? flags.split(",") : []
  const cash = Number(params.get("cash") ?? 0)

  const breakdown = {
    tax: Number(params.get("tax") ?? 0),
    div: Number(params.get("div") ?? 0),
    safe: Number(params.get("safe") ?? 0),
    priv: Number(params.get("priv") ?? 0),
    biz: Number(params.get("biz") ?? 0),
    cost: Number(params.get("cost") ?? 0),
  }

  return (
    <main className="min-h-screen grid-pattern bg-gradient-hero flex flex-col items-center justify-start p-4 sm:p-6 pt-8 sm:pt-12 space-y-6 max-w-lg mx-auto">
      <div className="text-center space-y-1 animate-slide-up">
        <h1 className="text-xl text-accent-gold glow-gold">GAME OVER</h1>
        <p className="text-[8px] text-text-muted">
          Final cash: ${cash.toLocaleString()}
        </p>
      </div>

      <ScoreCard score={score} medal={medal} breakdown={breakdown} />
      <FlagTimeline flagIds={flagIds} />
      <CtaSection score={score} medal={medal} flags={flags} />

      <Link href="/play" className="pb-8">
        <PixelButton variant="gold" size="lg">
          Play Again
        </PixelButton>
      </Link>
    </main>
  )
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center grid-pattern bg-gradient-hero">
          <div className="text-[10px] text-text-muted animate-pulse-soft font-pixel">
            Loading results...
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}
