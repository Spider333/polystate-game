"use client"

import { useState, useEffect } from "react"
import type { PlantedFlag, Country } from "@/engine/types"

interface WorldMapProps {
  countries: Country[]
  flags: PlantedFlag[]
  lastPlantedCountry: string | null
  onCountryClick?: (countryId: string) => void
}

// Region-based grid positions mapped to SVG coordinates (640x320 viewport)
const COUNTRY_POSITIONS: Record<string, { x: number; y: number; label: string }> = {
  // Americas
  "US-DE": { x: 80, y: 80, label: "DE" },
  "US-WY": { x: 140, y: 80, label: "WY" },
  "SV":    { x: 60, y: 140, label: "SV" },
  "CR":    { x: 120, y: 140, label: "CR" },
  "CO":    { x: 180, y: 140, label: "CO" },
  "PA":    { x: 240, y: 160, label: "PA" },
  "PY":    { x: 100, y: 220, label: "PY" },
  // Europe
  "PT":    { x: 270, y: 50, label: "PT" },
  "CZ":    { x: 340, y: 50, label: "CZ" },
  "EE":    { x: 380, y: 30, label: "EE" },
  "MT":    { x: 320, y: 100, label: "MT" },
  "CH":    { x: 360, y: 90, label: "CH" },
  // Middle East / Caucasus
  "GE":    { x: 440, y: 50, label: "GE" },
  "AE":    { x: 460, y: 110, label: "AE" },
  // Asia
  "TH":    { x: 510, y: 100, label: "TH" },
  "MY":    { x: 520, y: 160, label: "MY" },
  "SG":    { x: 560, y: 120, label: "SG" },
  "HK":    { x: 560, y: 70, label: "HK" },
  // Caribbean
  "KY":    { x: 170, y: 110, label: "KY" },
  "VG":    { x: 210, y: 110, label: "VG" },
}

// Pixel character as inline SVG group
function PixelCharacter({ x, y }: { x: number; y: number }) {
  return (
    <g
      className="world-map-character"
      style={{
        transform: `translate(${x - 8}px, ${y - 22}px)`,
        transition: "transform 700ms ease-in-out",
      }}
    >
      {/* Head */}
      <rect x={4} y={0} width={8} height={7} rx={1} fill="#5ee6a0" />
      {/* Eyes */}
      <rect x={5} y={2} width={2} height={2} fill="#0f172a" />
      <rect x={9} y={2} width={2} height={2} fill="#0f172a" />
      {/* Body */}
      <rect x={3} y={8} width={10} height={8} rx={1} fill="#4ecdc4" />
      {/* Arms */}
      <rect x={0} y={9} width={3} height={6} rx={1} fill="#5ee6a0" />
      <rect x={13} y={9} width={3} height={6} rx={1} fill="#5ee6a0" />
      {/* Legs */}
      <rect x={4} y={17} width={3} height={5} rx={1} fill="#5ee6a0" />
      <rect x={9} y={17} width={3} height={5} rx={1} fill="#5ee6a0" />
      {/* Flag in hand */}
      <rect x={14} y={5} width={1} height={8} fill="#ffd166" />
      <rect x={15} y={5} width={5} height={4} fill="#ffd166" />
    </g>
  )
}

export default function WorldMap({
  countries,
  flags,
  lastPlantedCountry,
  onCountryClick,
}: WorldMapProps) {
  const [characterPos, setCharacterPos] = useState({ x: 320, y: 160 })
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const plantedCountryIds = new Set(flags.map((f) => f.countryId))

  // Move character to last planted country
  useEffect(() => {
    if (lastPlantedCountry && COUNTRY_POSITIONS[lastPlantedCountry]) {
      const pos = COUNTRY_POSITIONS[lastPlantedCountry]
      setCharacterPos({ x: pos.x, y: pos.y })
    }
  }, [lastPlantedCountry])

  return (
    <div className="panel p-3 overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[7px] text-text-muted uppercase tracking-widest">
          World Map
        </span>
        <span className="text-[7px] text-accent-green">
          {flags.length} flag{flags.length !== 1 ? "s" : ""} planted
        </span>
      </div>

      <svg
        viewBox="0 0 640 280"
        className="w-full h-auto"
        style={{ maxHeight: "260px" }}
      >
        {/* Background water effect */}
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5ee6a0" stopOpacity="0.03" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="plantedGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="640" height="280" fill="transparent" />
        <circle cx="320" cy="140" r="200" fill="url(#mapGlow)" />

        {/* Region connection lines (subtle) */}
        {Object.entries(COUNTRY_POSITIONS).map(([id, pos]) =>
          Object.entries(COUNTRY_POSITIONS)
            .filter(([otherId]) => {
              // Connect neighbors within same region
              const dx = Math.abs(pos.x - COUNTRY_POSITIONS[otherId].x)
              const dy = Math.abs(pos.y - COUNTRY_POSITIONS[otherId].y)
              return otherId > id && dx < 100 && dy < 80 && Math.sqrt(dx * dx + dy * dy) < 100
            })
            .map(([otherId, otherPos]) => (
              <line
                key={`${id}-${otherId}`}
                x1={pos.x}
                y1={pos.y}
                x2={otherPos.x}
                y2={otherPos.y}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />
            ))
        )}

        {/* Country nodes */}
        {Object.entries(COUNTRY_POSITIONS).map(([countryId, pos]) => {
          const isPlanted = plantedCountryIds.has(countryId)
          const isHovered = hoveredCountry === countryId
          const country = countries.find((c) => c.id === countryId)

          return (
            <g
              key={countryId}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredCountry(countryId)}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => onCountryClick?.(countryId)}
            >
              {/* Planted glow ring */}
              {isPlanted && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={14}
                  fill="none"
                  stroke="#5ee6a0"
                  strokeWidth="1.5"
                  opacity="0.4"
                  filter="url(#plantedGlow)"
                  className="world-map-planted-pulse"
                />
              )}

              {/* Node background */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? 11 : 9}
                fill={
                  isPlanted
                    ? "rgba(94, 230, 160, 0.25)"
                    : isHovered
                    ? "rgba(255, 255, 255, 0.12)"
                    : "rgba(255, 255, 255, 0.06)"
                }
                stroke={
                  isPlanted
                    ? "#5ee6a0"
                    : isHovered
                    ? "rgba(255, 255, 255, 0.3)"
                    : "rgba(255, 255, 255, 0.1)"
                }
                strokeWidth={isPlanted ? 2 : 1}
                style={{ transition: "all 200ms ease" }}
              />

              {/* Flag emoji for planted */}
              {isPlanted && (
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                >
                  {"\uD83C\uDFF4"}
                </text>
              )}

              {/* Country label */}
              <text
                x={pos.x}
                y={pos.y + (isPlanted ? 20 : 18)}
                textAnchor="middle"
                fill={isPlanted ? "#5ee6a0" : isHovered ? "#f0f0f0" : "rgba(255,255,255,0.4)"}
                fontSize="7"
                fontFamily="'Press Start 2P', monospace"
                className="sm-map-label"
                style={{ transition: "fill 200ms ease" }}
              >
                {pos.label}
              </text>

              {/* Hover tooltip */}
              {isHovered && country && (
                <g>
                  <rect
                    x={pos.x - 50}
                    y={pos.y - 38}
                    width={100}
                    height={18}
                    rx={4}
                    fill="rgba(15, 23, 42, 0.95)"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                  />
                  <text
                    x={pos.x}
                    y={pos.y - 26}
                    textAnchor="middle"
                    fill="#f0f0f0"
                    fontSize="7"
                    fontFamily="'Press Start 2P', monospace"
                  >
                    {country.name}
                  </text>
                </g>
              )}
            </g>
          )
        })}

        {/* Pixel character */}
        <PixelCharacter x={characterPos.x} y={characterPos.y} />

        {/* Region labels (subtle) */}
        <text x={100} y={268} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="'Press Start 2P', monospace">
          Americas
        </text>
        <text x={330} y={268} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="'Press Start 2P', monospace">
          Europe
        </text>
        <text x={450} y={268} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="'Press Start 2P', monospace">
          MENA
        </text>
        <text x={540} y={268} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="'Press Start 2P', monospace">
          Asia
        </text>
      </svg>
    </div>
  )
}
