"use client"

import { useEffect, useRef, useCallback } from "react"
import type { PlantedFlag, Country } from "@/engine/types"
import { COUNTRY_COORDS } from "@/data/country-coordinates"

interface WorldMapProps {
  countries: Country[]
  flags: PlantedFlag[]
  lastPlantedCountry: string | null
  onCountryClick?: (countryId: string) => void
}

export default function WorldMap({
  flags,
  lastPlantedCountry,
}: WorldMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<import("cobe").Globe | null>(null)
  const phiRef = useRef(0)
  const thetaRef = useRef(0.2)
  const isHoveredRef = useRef(false)
  const targetCoordsRef = useRef<{ phi: number; theta: number } | null>(null)
  const rafRef = useRef<number>(0)

  const focusOnCountry = useCallback((countryId: string) => {
    const coords = COUNTRY_COORDS[countryId]
    if (!coords) return
    targetCoordsRef.current = {
      phi: -(coords.lng * Math.PI) / 180,
      theta: (coords.lat * Math.PI) / 180,
    }
  }, [])

  // Rotate to last planted country
  useEffect(() => {
    if (lastPlantedCountry) {
      focusOnCountry(lastPlantedCountry)
    }
  }, [lastPlantedCountry, focusOnCountry])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current

    // Build markers from planted flags
    const getMarkers = () =>
      flags.map((f) => {
        const coords = COUNTRY_COORDS[f.countryId]
        if (!coords) return null
        return {
          location: [coords.lat, coords.lng] as [number, number],
          size: f.countryId === lastPlantedCountry ? 0.12 : 0.08,
        }
      }).filter(Boolean) as Array<{ location: [number, number]; size: number }>

    let width = 0

    const onResize = () => {
      if (containerRef.current && canvasRef.current) {
        width = containerRef.current.offsetWidth
        canvasRef.current.width = width * 2
        canvasRef.current.height = width * 2
      }
    }
    onResize()

    let resizeObserver: ResizeObserver | undefined
    if (containerRef.current) {
      resizeObserver = new ResizeObserver(onResize)
      resizeObserver.observe(containerRef.current)
    }

    let globe: import("cobe").Globe | null = null

    // Dynamic import to avoid SSR issues
    import("cobe").then(({ default: createGlobe }) => {
      if (!canvasRef.current) return
      try {
        globe = createGlobe(canvas, {
          devicePixelRatio: 2,
          width: width * 2,
          height: width * 2,
          phi: phiRef.current,
          theta: thetaRef.current,
          dark: 1,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: [0.1, 0.1, 0.18],
          markerColor: [0.37, 0.9, 0.63],
          glowColor: [0.1, 0.1, 0.18],
          markers: getMarkers(),
        })
        globeRef.current = globe

        // Animation loop
        const animate = () => {
          if (!globe) return

          // Auto-rotate when not hovered
          if (!isHoveredRef.current) {
            phiRef.current += 0.003
          }

          // Smooth rotation toward target country
          if (targetCoordsRef.current) {
            const { phi: targetPhi, theta: targetTheta } = targetCoordsRef.current
            const dPhi = targetPhi - phiRef.current
            const dTheta = targetTheta - thetaRef.current

            // Normalize phi difference to [-PI, PI]
            const normalizedDPhi = ((dPhi % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI

            phiRef.current += normalizedDPhi * 0.08
            thetaRef.current += dTheta * 0.08

            // Clear target when close enough
            if (Math.abs(normalizedDPhi) < 0.01 && Math.abs(dTheta) < 0.01) {
              targetCoordsRef.current = null
            }
          }

          globe.update({
            phi: phiRef.current,
            theta: thetaRef.current,
            width: width * 2,
            height: width * 2,
            markers: getMarkers(),
          })

          rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)
      } catch {
        // WebGL not available — canvas stays as dark fallback
      }
    })

    return () => {
      cancelAnimationFrame(rafRef.current)
      globe?.destroy()
      globeRef.current = null
      resizeObserver?.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags.length, lastPlantedCountry])

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

      <div
        ref={containerRef}
        className="relative w-full flex items-center justify-center"
        style={{ maxHeight: "300px", aspectRatio: "1" }}
      >
        <canvas
          ref={canvasRef}
          onPointerEnter={() => { isHoveredRef.current = true }}
          onPointerLeave={() => { isHoveredRef.current = false }}
          className="w-full h-full"
          style={{
            contain: "layout paint size",
            maxHeight: "300px",
            cursor: "grab",
          }}
        />
        {/* WebGL fallback background */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(94,230,160,0.03) 0%, transparent 70%)",
            zIndex: -1,
          }}
        />
      </div>
    </div>
  )
}
