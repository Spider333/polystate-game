"use client"

import type { GameEvent } from "@/engine/types"
import PixelButton from "@/components/ui/PixelButton"

interface EventCardProps {
  event: GameEvent
  onAcknowledge: () => void
}

export default function EventCard({ event, onAcknowledge }: EventCardProps) {
  const isPositive =
    event.effect.type === "bonus_cash" || event.effect.type === "cost_decrease"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className={`
        max-w-md w-full rounded-xl p-6 space-y-5 animate-bounce-in
        ${isPositive ? "panel-accent" : "panel-gold"}
      `}>
        {/* Icon */}
        <div className="text-center">
          <div className="text-4xl mb-3">
            {isPositive ? "\u{1F4E2}" : "\u{26A0}\u{FE0F}"}
          </div>
          <div className="text-[8px] text-text-muted uppercase tracking-widest mb-1">
            Regulatory Event
          </div>
          <h2 className={`text-sm font-pixel pixel-text-shadow ${isPositive ? "text-accent-green glow-green" : "text-accent-gold glow-gold"}`}>
            {event.title}
          </h2>
        </div>

        <p className="text-[10px] text-text-secondary leading-relaxed text-center">
          {event.description}
        </p>

        {/* Effect badge */}
        <div className={`text-[10px] text-center py-2.5 px-4 rounded-lg ${
          isPositive
            ? "bg-accent-green/15 text-accent-green border border-accent-green/20"
            : "bg-accent-gold/15 text-accent-gold border border-accent-gold/20"
        }`}>
          {event.effect.message}
        </div>

        <div className="flex justify-center">
          <PixelButton
            onClick={onAcknowledge}
            variant={isPositive ? "primary" : "gold"}
            size="lg"
          >
            Continue
          </PixelButton>
        </div>
      </div>
    </div>
  )
}
