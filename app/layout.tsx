import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Flag Runner | Polystate",
  description: "Plant your flags. Minimize your taxes. Maximize your sovereignty. A pixel strategy game by Polystate.",
  openGraph: {
    title: "Flag Runner | Polystate",
    description: "Plant your flags. Minimize your taxes. Maximize your sovereignty.",
    type: "website",
    url: "https://game.polystate.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flag Runner | Polystate",
    description: "Plant your flags. Minimize your taxes. Maximize your sovereignty.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
