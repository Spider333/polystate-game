"use client"

import type { GameEvent } from "@/engine/types"
import PixelPanel from "@/components/ui/PixelPanel"
import PixelButton from "@/components/ui/PixelButton"

interface EventCardProps {
  event: GameEvent
  onAcknowledge: () => void
}

export default function EventCard({ event, onAcknowledge }: EventCardProps) {
  const isPositive =
    event.effect.type === "bonus_cash" || event.effect.type === "cost_decrease"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <PixelPanel
        variant={isPositive ? "accent" : "gold"}
        className="max-w-md w-full space-y-4"
      >
        <div className="text-center space-y-2">
          <div className="text-[10px] text-text-muted uppercase">
            Regulatory Event
          </div>
          <h2 className="text-sm text-accent-gold pixel-text-shadow">
            {event.title}
          </h2>
        </div>

        <p className="text-[10px] text-text-primary leading-relaxed">
          {event.description}
        </p>

        <div
          className={`text-[10px] text-center p-2 ${
            isPositive ? "bg-accent-green/20 text-accent-green" : "bg-accent-gold/20 text-accent-gold"
          }`}
        >
          {event.effect.message}
        </div>

        <div className="flex justify-center">
          <PixelButton onClick={onAcknowledge} variant={isPositive ? "primary" : "gold"}>
            Got it
          </PixelButton>
        </div>
      </PixelPanel>
    </div>
  )
}
