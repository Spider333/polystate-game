"use client"

import PixelButton from "@/components/ui/PixelButton"

interface ActionButtonsProps {
  onSkip: () => void
  phase: string
  onEndTurn: () => void
}

export default function ActionButtons({ onSkip, phase, onEndTurn }: ActionButtonsProps) {
  if (phase === "ACTION") {
    return (
      <div className="flex justify-center gap-3">
        <PixelButton onClick={onSkip} variant="secondary">
          Skip Turn
        </PixelButton>
      </div>
    )
  }

  if (phase === "TURN_END") {
    return (
      <div className="flex justify-center">
        <PixelButton onClick={onEndTurn} size="lg">
          Next Turn
        </PixelButton>
      </div>
    )
  }

  return null
}
