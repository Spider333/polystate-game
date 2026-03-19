import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Polytopia-inspired warm palette
        "bg-dark": "#1b1b2f",
        "bg-panel": "#1f2a48",
        "bg-card": "#263354",
        "bg-highlight": "#2d3d66",
        "accent-green": "#5ee6a0",
        "accent-teal": "#4ecdc4",
        "accent-gold": "#ffd166",
        "accent-orange": "#f4845f",
        "accent-blue": "#6ec6ff",
        "danger-red": "#ef476f",
        "text-primary": "#f0f0f0",
        "text-secondary": "#c4c8d8",
        "text-muted": "#7b829e",
        // Tier colors (warm Polytopia style)
        "tier-heaven": "#5ee6a0",
        "tier-paradise": "#6ec6ff",
        "tier-purgatory": "#ffd166",
        "tier-limbo": "#f4845f",
        "tier-hell": "#ef476f",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        game: ['"Press Start 2P"', "monospace"],
      },
      backgroundImage: {
        "gradient-warm": "linear-gradient(135deg, #1b1b2f 0%, #1f2a48 50%, #263354 100%)",
        "gradient-card": "linear-gradient(180deg, #2d3d66 0%, #1f2a48 100%)",
        "gradient-hero": "radial-gradient(ellipse at 50% 0%, #2d3d66 0%, #1b1b2f 70%)",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "float-delayed": "float 3s ease-in-out 1.5s infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "bounce-in": "bounceIn 0.6s cubic-bezier(0.68,-0.55,0.265,1.55)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
export default config
