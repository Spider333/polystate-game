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
      <div className="flex justify-center gap-4 py-2">
        <PixelButton onClick={onSkip} variant="secondary" size="md">
          Skip Turn
        </PixelButton>
      </div>
    )
  }

  if (phase === "TURN_END") {
    return (
      <div className="flex justify-center py-2">
        <PixelButton onClick={onEndTurn} size="lg" variant="primary">
          Next Turn &rarr;
        </PixelButton>
      </div>
    )
  }

  return null
}
