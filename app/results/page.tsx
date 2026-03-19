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

  const breakdown = {
    tax: Number(params.get("tax") ?? 0),
    div: Number(params.get("div") ?? 0),
    safe: Number(params.get("safe") ?? 0),
    priv: Number(params.get("priv") ?? 0),
    biz: Number(params.get("biz") ?? 0),
    cost: Number(params.get("cost") ?? 0),
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 space-y-6 max-w-lg mx-auto">
      <h1 className="text-xl text-accent-gold pixel-text-shadow text-center">
        GAME OVER
      </h1>

      <ScoreCard score={score} medal={medal} breakdown={breakdown} />
      <FlagTimeline flagIds={flagIds} />
      <CtaSection score={score} medal={medal} flags={flags} />

      <Link href="/play">
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-[10px] text-text-muted animate-pixel-pulse">
            Loading results...
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}
