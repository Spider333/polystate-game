import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const score = searchParams.get("score") ?? "0"
  const medal = searchParams.get("medal") ?? "none"
  const flags = searchParams.get("flags") ?? ""

  const medalEmoji: Record<string, string> = {
    diamond: "\uD83D\uDC8E",
    gold: "\uD83C\uDFC6",
    silver: "\uD83E\uDD48",
    bronze: "\uD83E\uDD49",
    none: "",
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a2e",
          color: "#eaeaea",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div style={{ fontSize: "32px", color: "#ffd369" }}>
            FLAG RUNNER
          </div>

          <div
            style={{
              fontSize: "96px",
              color: "#ffd369",
              textShadow: "4px 4px 0px rgba(0,0,0,0.5)",
            }}
          >
            {score}
          </div>

          {medal !== "none" && (
            <div style={{ fontSize: "48px", display: "flex", gap: "16px", alignItems: "center" }}>
              <span>{medalEmoji[medal]}</span>
              <span style={{ color: "#ffd369", fontSize: "24px" }}>
                {medal.toUpperCase()} MEDAL
              </span>
            </div>
          )}

          {flags && (
            <div style={{ fontSize: "16px", color: "#8d8d8d" }}>
              Flags: {flags}
            </div>
          )}

          <div style={{ fontSize: "16px", color: "#4ecca3" }}>
            game.polystate.io
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
