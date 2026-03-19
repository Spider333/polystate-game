import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl text-accent-gold pixel-text-shadow">
          FLAG RUNNER
        </h1>
        <p className="text-[10px] sm:text-xs text-accent-green">by Polystate</p>
      </div>

      <div className="max-w-md space-y-4">
        <p className="text-[10px] text-text-primary leading-relaxed">
          You have $50,000, 20 turns, and 20 real countries.
          Plant flags for residency, tax residency, and business.
          Navigate regulatory events. Maximize your sovereignty score.
        </p>

        <div className="grid grid-cols-3 gap-2 text-[8px]">
          <div className="bg-bg-panel pixel-border p-3 space-y-1">
            <div className="text-lg">🏠</div>
            <div className="text-accent-green">Residency</div>
            <div className="text-text-muted">Where you live</div>
          </div>
          <div className="bg-bg-panel pixel-border p-3 space-y-1">
            <div className="text-lg">💰</div>
            <div className="text-accent-gold">Tax Home</div>
            <div className="text-text-muted">Where you pay tax</div>
          </div>
          <div className="bg-bg-panel pixel-border p-3 space-y-1">
            <div className="text-lg">🏢</div>
            <div className="text-accent-green">Business</div>
            <div className="text-text-muted">Where you incorporate</div>
          </div>
        </div>
      </div>

      <Link
        href="/play"
        className="font-pixel bg-accent-green text-bg-dark px-8 py-4 text-sm pixel-border-accent
          hover:brightness-110 active:translate-y-[2px] transition-all uppercase tracking-wider"
      >
        Start Game
      </Link>

      <div className="text-[8px] text-text-muted space-y-1">
        <p>20 real countries &middot; Real prices &middot; Real tax rates</p>
        <p>
          Powered by{" "}
          <a
            href="https://polystate.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-green hover:underline"
          >
            polystate.io
          </a>
        </p>
      </div>
    </main>
  )
}
