interface PixelPanelProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "accent" | "gold"
}

export default function PixelPanel({
  children,
  className = "",
  variant = "default",
}: PixelPanelProps) {
  const borderClass = {
    default: "pixel-border",
    accent: "pixel-border-accent",
    gold: "pixel-border-gold",
  }[variant]

  return (
    <div className={`bg-bg-panel p-4 ${borderClass} ${className}`}>
      {children}
    </div>
  )
}
