import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#1a1a2e",
        "bg-panel": "#16213e",
        "accent-green": "#4ecca3",
        "accent-gold": "#ffd369",
        "danger-red": "#e23e57",
        "text-primary": "#eaeaea",
        "text-muted": "#8d8d8d",
        "tier-heaven": "#2166ac",
        "tier-paradise": "#67a9cf",
        "tier-purgatory": "#fddbc7",
        "tier-limbo": "#ef8a62",
        "tier-hell": "#b2182b",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
      },
    },
  },
  plugins: [],
}
export default config
