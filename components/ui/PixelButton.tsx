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
  primary: "bg-accent-green text-bg-dark hover:bg-accent-teal",
  secondary: "bg-bg-highlight text-text-primary hover:bg-bg-card border border-white/10",
  danger: "bg-danger-red text-white hover:brightness-110",
  gold: "bg-accent-gold text-bg-dark hover:brightness-110",
}

const sizeStyles = {
  sm: "px-3 py-1.5 text-[8px]",
  md: "px-5 py-2.5 text-[10px]",
  lg: "px-7 py-3.5 text-xs",
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
        font-pixel uppercase tracking-wider rounded-lg btn-pixel transition-all duration-100
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
