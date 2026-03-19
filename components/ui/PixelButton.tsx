"use client"

interface PixelButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "danger" | "gold"
  disabled?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

const variantStyles = {
  primary: "bg-accent-green text-bg-dark hover:brightness-110 pixel-border-accent",
  secondary: "bg-bg-panel text-text-primary hover:bg-opacity-80 pixel-border",
  danger: "bg-danger-red text-white hover:brightness-110 pixel-border-red",
  gold: "bg-accent-gold text-bg-dark hover:brightness-110 pixel-border-gold",
}

const sizeStyles = {
  sm: "px-3 py-1.5 text-[8px]",
  md: "px-4 py-2 text-[10px]",
  lg: "px-6 py-3 text-xs",
}

export default function PixelButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  size = "md",
}: PixelButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-pixel transition-all duration-100 uppercase tracking-wider
        active:translate-y-[2px] active:shadow-none
        disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
