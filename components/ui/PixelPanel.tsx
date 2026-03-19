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
  const panelClass = {
    default: "panel",
    accent: "panel-accent",
    gold: "panel-gold",
  }[variant]

  return (
    <div className={`${panelClass} p-4 ${className}`}>
      {children}
    </div>
  )
}
