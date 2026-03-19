# Flag Runner

A turn-based strategy game where you build a global sovereignty structure by "planting flags" — residencies, tax setups, and companies — across 20 real-world jurisdictions. Built as a gamified entry point to [Polystate](https://polystate.io).

**Live:** [polystate-game.vercel.app](https://polystate-game.vercel.app)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| UI | Tailwind CSS 3, Press Start 2P pixel font |
| State | React `useReducer` (no external state library) |
| OG Images | `@vercel/og` (dynamic social cards) |
| Deploy | Vercel (auto-deploy on push to `main`) |

## Project Structure

```
polystate-game/
├── app/
│   ├── page.tsx              # Landing / hero screen
│   ├── play/page.tsx         # Game board route
│   ├── results/page.tsx      # End-game results + share
│   ├── api/og/route.tsx      # Dynamic OG image generation
│   ├── globals.css           # Tailwind layers + game styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── game/
│   │   ├── GameBoard.tsx     # Main game orchestrator
│   │   ├── WorldMap.tsx      # SVG world map with pixel character
│   │   ├── CountryPicker.tsx # Card-based country/program selector
│   │   ├── CountryCard.tsx   # Individual country program card
│   │   ├── TurnBar.tsx       # Turn counter, cash, score header
│   │   ├── ScorePanel.tsx    # 6-axis score breakdown sidebar
│   │   ├── FlagSlots.tsx     # Planted flags display
│   │   ├── EventCard.tsx     # Random event modal
│   │   └── ActionButtons.tsx # Skip / End Turn controls
│   └── ui/
│       ├── PixelButton.tsx   # Reusable pixel-art button
│       └── PixelPanel.tsx    # Reusable panel component
├── engine/
│   ├── types.ts              # All game type definitions
│   ├── constants.ts          # Game balance constants
│   ├── reducer.ts            # Core game state machine
│   ├── scoring.ts            # Score calculation (6 axes)
│   └── events.ts             # Event effect application
├── data/
│   ├── countries.json        # 20 countries with stats
│   ├── programs.json         # 48 programs (residency/tax/business)
│   └── events.json           # Turn-based random events
└── lib/
    └── utils.ts              # Formatting helpers
```

## Game Mechanics

### Core Loop

Each game runs for **20 turns** (5 in-game years, 4 quarters per year). Every turn follows this phase sequence:

```
INCOME → EVENT (conditional) → ACTION → MAINTENANCE → TURN_END
```

| Phase | What Happens |
|-------|-------------|
| **INCOME** | Collect $10,000 quarterly income, minus tax rate % |
| **EVENT** | Random geopolitical event that modifies costs, scores, or grants bonuses (fires on specific turns) |
| **ACTION** | Player plants a flag (buy a program) or skips |
| **MAINTENANCE** | Pay quarterly upkeep on all planted flags (annualCost / 4) |
| **TURN_END** | Summary + advance to next turn |

### State Machine

The game state is managed by a pure reducer (`engine/reducer.ts`). All state transitions are deterministic:

```typescript
type GamePhase =
  | "NOT_STARTED"  // Pre-game intro
  | "INCOME"       // Auto: collect income
  | "EVENT"        // Show event card (if one exists for this turn)
  | "ACTION"       // Player's choice: plant flag or skip
  | "MAINTENANCE"  // Auto: deduct flag upkeep
  | "TURN_END"     // Summary, player clicks "Next Turn"
  | "GAME_OVER"    // Redirect to /results with score params
```

### Flag Categories

Players can hold **one flag per category** at a time. Planting a second flag in the same category replaces the first:

| Category | Purpose | Example |
|----------|---------|---------|
| **Residency** | Legal right to live in a country | Paraguay Temporary Residency ($1,500) |
| **Tax** | Tax optimization — sets your effective income tax rate | Georgia Tax Residency (0% crypto) |
| **Business** | Company formation for asset protection & operations | Wyoming DAO LLC ($1,000) |

### Scoring System (100 points max)

Score is recalculated after every flag change. Six weighted axes:

| Axis | Max Points | How It's Calculated |
|------|-----------|-------------------|
| **Tax Efficiency** | 35 | Based on tax flag country's `effectiveRate` vs default 30% |
| **Diversification** | 20 | Unique countries (60% weight) + category coverage (40%). Concentration penalty if all flags in 1 country |
| **Safety** | 15 | Average `safetyScore` of all flag countries (scale 0-10) |
| **Privacy** | 15 | Average `privacyScore` of all flag countries (scale 0-10) |
| **Business Ease** | 10 | Business flag country's `businessEaseScore` (scale 0-10) |
| **Cost Efficiency** | 5 | Lower total annual costs = higher score. $0/yr = 5pts, $15K+/yr = 0pts |

### Medals

| Medal | Score Threshold |
|-------|----------------|
| Diamond | 95+ |
| Gold | 85+ |
| Silver | 70+ |
| Bronze | 50+ |

### Events

Events fire on specific turns and apply one of four effect types:

| Effect | Description |
|--------|------------|
| `cost_increase` | Raise annual cost for flags in targeted countries/categories |
| `cost_decrease` | Lower annual cost for targeted flags |
| `score_change` | Modify a country's safety/privacy/business score |
| `bonus_cash` | Grant bonus cash (conditional on having specific flags or diversification) |

### Economy

| Parameter | Value |
|-----------|-------|
| Starting cash | $50,000 |
| Quarterly income | $10,000 |
| Default tax rate | 30% (reduced by tax flag) |
| Total turns | 20 |
| Flag costs | $1,000 – $15,000 (one-time) |
| Annual maintenance | $300 – $6,000/yr (paid quarterly) |

## World Map

The `WorldMap.tsx` component renders an SVG (640x280 viewport) with:

- **20 country nodes** positioned by geographic region (Americas, Europe, MENA, Asia, Caribbean)
- **Pixel character** (inline SVG, 16x22px) that animates to the last-planted country with a 700ms ease-in-out transition
- **Planted markers** — green glow ring + flag emoji with pulse animation
- **Hover tooltips** showing full country name
- **Responsive** — labels hide below 480px viewport width

The map is complementary to the card-based `CountryPicker` which remains the primary interaction surface.

## Pricing

Program costs are aligned with [Polystate's](https://polystate.io) real service pricing from the `billing_model` database table. Key reference points:

| Program | Game Price | Annual Cost |
|---------|-----------|-------------|
| Paraguay Temp Residency | $1,500 | $400/yr |
| Paraguay Tax Residency | $3,500 | $800/yr |
| Paraguay Company | $2,000 | $500/yr |
| Delaware LLC | $1,300 | $500/yr |
| Wyoming DAO LLC | $1,000 | $300/yr |
| UAE Freelance Visa | $5,000 | $2,500/yr |
| Singapore EntrePass | $15,000 | $5,000/yr |

See `data/programs.json` for all 48 programs with full pricing.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
```

## Data Files

### `data/countries.json`

20 countries with properties used in score calculation:

```typescript
interface Country {
  id: string              // "PY", "US-DE", etc.
  name: string            // "Paraguay"
  region: string          // "South America"
  tier: Tier              // "HEAVEN" | "PARADISE" | "PURGATORY" | "LIMBO" | "HELL"
  effectiveRate: number   // Effective personal tax rate (0-100)
  corporateTax: number    // Corporate tax rate
  safetyScore: number     // 0-10 (rule of law, stability)
  businessEaseScore: number // 0-10 (ease of doing business)
  privacyScore: number    // 0-10 (financial privacy, CRS)
  costOfLiving: CostLevel // "Very Low" to "Very High"
  dualNationalityAllowed: boolean
  summary: string
  businessOnly?: boolean  // KY, VG — no residency programs
}
```

### `data/programs.json`

48 programs (residency, tax, business) across 20 countries:

```typescript
interface Program {
  id: string           // "PY-TR", "US-DE-BIZ"
  countryId: string    // Links to country
  name: string
  category: FlagCategory
  cost: number         // One-time USD cost
  annualCost: number   // Yearly maintenance USD
  processingTurns: number // Turns before flag activates (currently unused in scoring)
  taxRate: number      // Tax rate this program sets (only used for tax category)
  description: string
}
```

### `data/events.json`

Turn-specific events with effects. Each event fires exactly once on its assigned turn.

## Architecture Decisions

- **No external state library** — `useReducer` keeps the game state machine pure and testable. All transitions are in a single file (`engine/reducer.ts`).
- **JSON data files** — Countries, programs, and events are static JSON imported at build time. No API calls needed during gameplay.
- **One flag per category** — Simplifies the mental model. Players optimize by choosing the *best* residency/tax/business, not stacking multiples.
- **Inline SVG for pixel character** — Zero external asset dependencies. The character, map nodes, and all visual elements are pure SVG/CSS.
- **Score recalculated on every change** — No stale score state. `calculateScore()` is a pure function of current flags + country data.
