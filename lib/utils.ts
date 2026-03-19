import type { Medal, Tier } from "@/engine/types"

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
    case "diamond": return "\uD83D\uDC8E"
    case "gold": return "\uD83C\uDFC6"
    case "silver": return "\uD83E\uDD48"
    case "bronze": return "\uD83E\uDD49"
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

export function getCategoryLabel(category: string): string {
  switch (category) {
    case "residency": return "Residency"
    case "tax": return "Tax"
    case "business": return "Business"
    default: return category
  }
}

export function getCategoryIcon(category: string): string {
  switch (category) {
    case "residency": return "\uD83C\uDFE0"
    case "tax": return "\uD83D\uDCB0"
    case "business": return "\uD83C\uDFE2"
    default: return "\uD83C\uDFF4"
  }
}

export function getFlagEmoji(countryId: string): string {
  const flags: Record<string, string> = {
    PY: "\uD83C\uDDF5\uD83C\uDDFE",
    AE: "\uD83C\uDDE6\uD83C\uDDEA",
    PA: "\uD83C\uDDF5\uD83C\uDDE6",
    GE: "\uD83C\uDDEC\uD83C\uDDEA",
    PT: "\uD83C\uDDF5\uD83C\uDDF9",
    SG: "\uD83C\uDDF8\uD83C\uDDEC",
    TH: "\uD83C\uDDF9\uD83C\uDDED",
    EE: "\uD83C\uDDEA\uD83C\uDDEA",
    HK: "\uD83C\uDDED\uD83C\uDDF0",
    MY: "\uD83C\uDDF2\uD83C\uDDFE",
    CR: "\uD83C\uDDE8\uD83C\uDDF7",
    CO: "\uD83C\uDDE8\uD83C\uDDF4",
    CZ: "\uD83C\uDDE8\uD83C\uDDFF",
    MT: "\uD83C\uDDF2\uD83C\uDDF9",
    KY: "\uD83C\uDDF0\uD83C\uDDFE",
    VG: "\uD83C\uDDFB\uD83C\uDDEC",
    CH: "\uD83C\uDDE8\uD83C\uDDED",
    SV: "\uD83C\uDDF8\uD83C\uDDFB",
    "US-DE": "\uD83C\uDDFA\uD83C\uDDF8",
    "US-WY": "\uD83C\uDDFA\uD83C\uDDF8",
  }
  return flags[countryId] ?? "\uD83C\uDFF3\uFE0F"
}
