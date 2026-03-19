import type { Medal, Tier, CostLevel } from "@/engine/types"

export function formatCash(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`
  }
  return `$${amount.toLocaleString()}`
}

export function formatCashFull(amount: number): string {
  return `$${amount.toLocaleString()}`
}

export function getMedalEmoji(medal: Medal): string {
  switch (medal) {
    case "diamond": return "\u{1F48E}"
    case "gold": return "\u{1F3C6}"
    case "silver": return "\u{1F948}"
    case "bronze": return "\u{1F949}"
    default: return ""
  }
}

export function getMedalLabel(medal: Medal): string {
  switch (medal) {
    case "diamond": return "DIAMOND"
    case "gold": return "GOLD"
    case "silver": return "SILVER"
    case "bronze": return "BRONZE"
    default: return "NO MEDAL"
  }
}

export function getTierColor(tier: Tier): string {
  switch (tier) {
    case "HEAVEN": return "text-tier-heaven"
    case "PARADISE": return "text-tier-paradise"
    case "PURGATORY": return "text-tier-purgatory"
    case "LIMBO": return "text-tier-limbo"
    case "HELL": return "text-tier-hell"
  }
}

export function getTierBg(tier: Tier): string {
  switch (tier) {
    case "HEAVEN": return "bg-tier-heaven"
    case "PARADISE": return "bg-tier-paradise"
    case "PURGATORY": return "bg-tier-purgatory"
    case "LIMBO": return "bg-tier-limbo"
    case "HELL": return "bg-tier-hell"
  }
}

export function getCategoryLabel(category: string): string {
  switch (category) {
    case "residency": return "Residency"
    case "tax": return "Tax Residency"
    case "business": return "Business"
    default: return category
  }
}

export function getCategoryIcon(category: string): string {
  switch (category) {
    case "residency": return "\u{1F3E0}"
    case "tax": return "\u{1F4B0}"
    case "business": return "\u{1F3E2}"
    default: return "\u{1F3F4}"
  }
}

export function getFlagEmoji(countryId: string): string {
  // Map country IDs to flag emojis
  const flags: Record<string, string> = {
    PY: "\u{1F1F5}\u{1F1FE}",
    AE: "\u{1F1E6}\u{1F1EA}",
    PA: "\u{1F1F5}\u{1F1E6}",
    GE: "\u{1F1EC}\u{1F1EA}",
    PT: "\u{1F1F5}\u{1F1F9}",
    SG: "\u{1F1F8}\u{1F1EC}",
    TH: "\u{1F1F9}\u{1F1ED}",
    EE: "\u{1F1EA}\u{1F1EA}",
    HK: "\u{1F1ED}\u{1F1F0}",
    MY: "\u{1F1F2}\u{1F1FE}",
    CR: "\u{1F1E8}\u{1F1F7}",
    CO: "\u{1F1E8}\u{1F1F4}",
    CZ: "\u{1F1E8}\u{1F1FF}",
    MT: "\u{1F1F2}\u{1F1F9}",
    KY: "\u{1F1F0}\u{1F1FE}",
    VG: "\u{1F1FB}\u{1F1EC}",
    CH: "\u{1F1E8}\u{1F1ED}",
    SV: "\u{1F1F8}\u{1F1FB}",
    "US-DE": "\u{1F1FA}\u{1F1F8}",
    "US-WY": "\u{1F1FA}\u{1F1F8}",
  }
  return flags[countryId] ?? "\u{1F3F3}\u{FE0F}"
}
