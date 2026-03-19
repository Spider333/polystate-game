"use client"

import PixelButton from "@/components/ui/PixelButton"

interface CtaSectionProps {
  score: number
  medal: string
  flags: string
}

export default function CtaSection({ score, medal, flags }: CtaSectionProps) {
  const shareText = `I scored ${score} in Flag Runner! ${medal !== "none" ? `(${medal.toUpperCase()} medal) ` : ""}Plant your flags at`
  const shareUrl = "https://game.polystate.io"

  const copyLink = () => {
    const url = `${shareUrl}/results?score=${score}&medal=${medal}&flags=${flags}`
    navigator.clipboard.writeText(`${shareText} ${url}`)
  }

  const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`

  return (
    <div className="space-y-4">
      {/* Make it real CTA */}
      <div className="panel-accent p-6 text-center space-y-4 rounded-xl">
        <div className="text-2xl">{"\uD83C\uDF0D"}</div>
        <h3 className="text-[10px] text-accent-gold font-pixel glow-gold">MAKE IT REAL</h3>
        <p className="text-[9px] text-text-secondary leading-relaxed max-w-sm mx-auto">
          Ready to actually plant your flags? Polystate helps you set up
          residency, tax optimization, and business incorporation across 20+
          countries — with real advisors and real results.
        </p>
        <a href="https://polystate.io" target="_blank" rel="noopener noreferrer">
          <PixelButton variant="primary" size="lg">
            Visit Polystate.io
          </PixelButton>
        </a>
      </div>

      {/* Share */}
      <div className="flex flex-wrap gap-3 justify-center">
        <PixelButton onClick={copyLink} variant="secondary" size="sm">
          Copy Link
        </PixelButton>
        <a href={tweetUrl} target="_blank" rel="noopener noreferrer">
          <PixelButton variant="secondary" size="sm">
            Share on X
          </PixelButton>
        </a>
      </div>
    </div>
  )
}
