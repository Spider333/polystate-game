import Link from "next/link"

const SHOWCASE_FLAGS = [
  { id: "PY", emoji: "\uD83C\uDDF5\uD83C\uDDFE", name: "Paraguay", tag: "0% Tax" },
  { id: "AE", emoji: "\uD83C\uDDE6\uD83C\uDDEA", name: "UAE", tag: "Business Hub" },
  { id: "SG", emoji: "\uD83C\uDDF8\uD83C\uDDEC", name: "Singapore", tag: "Premium" },
  { id: "GE", emoji: "\uD83C\uDDEC\uD83C\uDDEA", name: "Georgia", tag: "Low Cost" },
  { id: "PT", emoji: "\uD83C\uDDF5\uD83C\uDDF9", name: "Portugal", tag: "EU Access" },
  { id: "SV", emoji: "\uD83C\uDDF8\uD83C\uDDFB", name: "El Salvador", tag: "BTC Legal" },
]

export default function Home() {
  return (
    <main className="min-h-screen grid-pattern">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-gradient-hero overflow-hidden">
        {/* Floating decorative diamonds */}
        <div className="absolute top-20 left-[10%] iso-diamond bg-accent-green/10 animate-float" />
        <div className="absolute top-32 right-[15%] iso-diamond bg-accent-gold/10 animate-float-delayed" />
        <div className="absolute bottom-24 left-[20%] iso-diamond bg-accent-blue/10 animate-float-delayed" />
        <div className="absolute bottom-16 right-[10%] iso-diamond bg-accent-teal/10 animate-float" />

        <div className="relative space-y-6 max-w-2xl">
          {/* Badge */}
          <div className="inline-block px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/20">
            <span className="text-[8px] text-accent-green uppercase tracking-widest">
              A Polystate Strategy Game
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-accent-gold glow-gold leading-tight">
            FLAG RUNNER
          </h1>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
            Plant your flags across 20 real countries.
            Build a tax-optimized, diversified sovereign life.
            Can you score 95+ and earn the Diamond medal?
          </p>

          {/* Animated flag parade */}
          <div className="flex justify-center gap-3 sm:gap-4 py-4">
            {SHOWCASE_FLAGS.map((f, i) => (
              <div
                key={f.id}
                className="text-center space-y-1 animate-slide-up"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
              >
                <div className="text-2xl sm:text-3xl">{f.emoji}</div>
                <div className="text-[7px] text-text-muted hidden sm:block">{f.tag}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/play"
            className="inline-block font-pixel bg-accent-green text-bg-dark px-8 py-4 text-xs sm:text-sm
              rounded-lg btn-pixel hover:bg-accent-teal transition-colors uppercase tracking-wider"
          >
            Start Game
          </Link>
        </div>
      </section>

      {/* How to Play */}
      <section className="px-6 py-16 max-w-4xl mx-auto space-y-12">
        <h2 className="text-lg sm:text-xl text-center text-accent-gold pixel-text-shadow">
          HOW TO PLAY
        </h2>

        {/* The Setup */}
        <div className="panel p-6 space-y-4">
          <h3 className="text-[10px] text-accent-teal uppercase tracking-widest">The Setup</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatBox icon={"\uD83D\uDCB0"} value="$50,000" label="Starting cash" />
            <StatBox icon={"\uD83D\uDCC8"} value="$10K/QTR" label="Quarterly income" />
            <StatBox icon={"\u23F3"} value="20 TURNS" label="5 game years" />
          </div>
          <p className="text-[9px] text-text-secondary leading-relaxed">
            You start paying 30% tax on your income. Every quarter, you collect income (minus tax),
            face regulatory events, and choose whether to plant a flag. Your goal:
            minimize taxes, maximize sovereignty.
          </p>
        </div>

        {/* Three Flags */}
        <div className="space-y-4">
          <h3 className="text-[10px] text-center text-accent-teal uppercase tracking-widest">
            Plant Three Types of Flags
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FlagTypeCard
              icon={"\uD83C\uDFE0"}
              title="Residency"
              color="accent-green"
              description="Where you live. Sets your base country and affects safety & privacy scores."
              example="Paraguay Temp Residency — $2K setup, $500/yr"
            />
            <FlagTypeCard
              icon={"\uD83D\uDCB0"}
              title="Tax Residency"
              color="accent-gold"
              description="Where you pay taxes. This is the big one — drops your tax rate from 30% to the country's rate."
              example="UAE Tax Residency — $3K setup, 0% tax rate"
            />
            <FlagTypeCard
              icon={"\uD83C\uDFE2"}
              title="Business"
              color="accent-blue"
              description="Where you incorporate. Affects business ease score and annual maintenance costs."
              example="Estonia OU — $4K setup, 0% on retained profits"
            />
          </div>
        </div>

        {/* Turn Cycle */}
        <div className="panel p-6 space-y-4">
          <h3 className="text-[10px] text-accent-teal uppercase tracking-widest">Each Turn</h3>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <TurnStep num="1" label="Collect income" sub="(minus current tax rate)" />
            <Arrow />
            <TurnStep num="2" label="Face event" sub="(regulatory changes)" />
            <Arrow />
            <TurnStep num="3" label="Plant flag" sub="(or skip)" />
            <Arrow />
            <TurnStep num="4" label="Pay upkeep" sub="(flag maintenance)" />
          </div>
        </div>

        {/* Scoring */}
        <div className="space-y-4">
          <h3 className="text-[10px] text-center text-accent-teal uppercase tracking-widest">
            Sovereignty Score (0-100)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ScoreDim label="Tax Efficiency" max={35} color="bg-accent-green" desc="Lower tax = more points" />
            <ScoreDim label="Diversification" max={20} color="bg-accent-blue" desc="Flags in different countries" />
            <ScoreDim label="Safety" max={15} color="bg-accent-teal" desc="Country safety scores" />
            <ScoreDim label="Privacy" max={15} color="bg-accent-orange" desc="Financial privacy level" />
            <ScoreDim label="Business Ease" max={10} color="bg-accent-gold" desc="Incorporation quality" />
            <ScoreDim label="Cost Efficiency" max={5} color="bg-text-secondary" desc="Low maintenance costs" />
          </div>
          <div className="panel p-4 text-center space-y-2">
            <p className="text-[9px] text-danger-red">
              Warning: All flags in one country = diversification score halved!
            </p>
          </div>
        </div>

        {/* Medals */}
        <div className="panel p-6 space-y-4">
          <h3 className="text-[10px] text-accent-teal uppercase tracking-widest text-center">Medals</h3>
          <div className="flex justify-center gap-4 sm:gap-8">
            <MedalBadge emoji={"\uD83E\uDD49"} label="Bronze" req="50+" />
            <MedalBadge emoji={"\uD83E\uDD48"} label="Silver" req="70+" />
            <MedalBadge emoji={"\uD83C\uDFC6"} label="Gold" req="85+" />
            <MedalBadge emoji={"\uD83D\uDC8E"} label="Diamond" req="95+" />
          </div>
        </div>

        {/* Events teaser */}
        <div className="panel p-6 space-y-3">
          <h3 className="text-[10px] text-accent-teal uppercase tracking-widest">Watch Out For Events</h3>
          <p className="text-[9px] text-text-secondary leading-relaxed">
            Every few turns, real-world regulatory events hit. The EU enforces MiCA, Paraguay joins CRS,
            Thailand extends its crypto tax holiday, El Salvador&apos;s BTC reserves pay dividends.
            These change costs, scores, and sometimes give you bonus cash.
            Adapt your strategy or pay the price.
          </p>
          <div className="flex flex-wrap gap-2">
            <EventTag label="EU MiCA" type="warning" />
            <EventTag label="UAE Expansion" type="positive" />
            <EventTag label="Global Tax Crackdown" type="warning" />
            <EventTag label="BTC Boom" type="positive" />
            <EventTag label="Network State Recognition" type="positive" />
          </div>
        </div>

        {/* Data credibility */}
        <div className="text-center space-y-3 py-4">
          <p className="text-[9px] text-text-muted">
            Built with real data from 20 countries &middot; Real residency costs &middot; Real tax rates
          </p>
          <p className="text-[9px] text-text-muted">
            Powered by{" "}
            <a
              href="https://polystate.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-green hover:text-accent-teal transition-colors"
            >
              polystate.io
            </a>
            {" "}&mdash; making flag theory real
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center pb-8">
          <Link
            href="/play"
            className="inline-block font-pixel bg-accent-green text-bg-dark px-10 py-5 text-sm
              rounded-lg btn-pixel hover:bg-accent-teal transition-colors uppercase tracking-wider"
          >
            Play Now
          </Link>
        </div>
      </section>
    </main>
  )
}

function StatBox({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="text-center space-y-1 p-3 rounded-lg bg-bg-dark/50">
      <div className="text-xl">{icon}</div>
      <div className="text-sm text-accent-gold font-pixel">{value}</div>
      <div className="text-[8px] text-text-muted">{label}</div>
    </div>
  )
}

function FlagTypeCard({
  icon, title, color, description, example,
}: {
  icon: string; title: string; color: string; description: string; example: string
}) {
  return (
    <div className="panel p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span className={`text-[10px] text-${color} font-pixel`}>{title}</span>
      </div>
      <p className="text-[8px] text-text-secondary leading-relaxed">{description}</p>
      <div className="text-[7px] text-text-muted bg-bg-dark/50 rounded px-2 py-1.5">
        {example}
      </div>
    </div>
  )
}

function TurnStep({ num, label, sub }: { num: string; label: string; sub: string }) {
  return (
    <div className="text-center space-y-1 flex-1">
      <div className="w-8 h-8 rounded-full bg-accent-green/20 border border-accent-green/30 flex items-center justify-center mx-auto">
        <span className="text-[10px] text-accent-green font-pixel">{num}</span>
      </div>
      <div className="text-[9px] text-text-primary">{label}</div>
      <div className="text-[7px] text-text-muted">{sub}</div>
    </div>
  )
}

function Arrow() {
  return (
    <div className="text-text-muted text-[10px] hidden sm:block">{"\u2192"}</div>
  )
}

function ScoreDim({ label, max, color, desc }: { label: string; max: number; color: string; desc: string }) {
  return (
    <div className="panel p-3 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[8px] text-text-primary">{label}</span>
        <span className="text-[8px] text-accent-gold font-pixel">{max}</span>
      </div>
      <div className="score-bar">
        <div className={`score-bar-fill ${color}`} style={{ width: `${(max / 35) * 100}%` }} />
      </div>
      <div className="text-[7px] text-text-muted">{desc}</div>
    </div>
  )
}

function MedalBadge({ emoji, label, req }: { emoji: string; label: string; req: string }) {
  return (
    <div className="text-center space-y-1">
      <div className="text-2xl">{emoji}</div>
      <div className="text-[9px] text-text-primary">{label}</div>
      <div className="text-[8px] text-text-muted">{req}</div>
    </div>
  )
}

function EventTag({ label, type }: { label: string; type: "warning" | "positive" }) {
  return (
    <span className={`text-[8px] px-2 py-1 rounded-full ${
      type === "positive"
        ? "bg-accent-green/10 text-accent-green border border-accent-green/20"
        : "bg-accent-orange/10 text-accent-orange border border-accent-orange/20"
    }`}>
      {label}
    </span>
  )
}
