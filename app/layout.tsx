import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import TargetCursor from "@/components/target-cursor"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JESS.VC - Vibe Coder & Creative Developer",
  description:
    "Crafting aesthetic code and brutalist digital experiences. Where technical excellence meets raw creative energy. Building apps that look as good as they perform.",
  keywords: [
    "vibe coder",
    "creative developer",
    "frontend development",
    "brutalist design",
    "web development",
    "react developer",
    "nextjs developer",
    "aesthetic code",
  ],
  authors: [{ name: "JESS.VC" }],
  creator: "JESS.VC",
  publisher: "JESS.VC",
  generator: "v0.app",
  metadataBase: new URL("https://jess.vc"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jess.vc",
    title: "JESS.VC - Vibe Coder & Creative Developer",
    description:
      "Crafting aesthetic code and brutalist digital experiences. Where technical excellence meets raw creative energy.",
    siteName: "JESS.VC",
    images: [
      {
        url: "/images/me.jpeg",
        width: 1200,
        height: 630,
        alt: "JESS.VC - Vibe Coder Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JESS.VC - Vibe Coder & Creative Developer",
    description:
      "Crafting aesthetic code and brutalist digital experiences. Where technical excellence meets raw creative energy.",
    creator: "@jessvc",
    images: ["/images/me.jpeg"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-sans antialiased`}>
        <TargetCursor
          targetSelector="a, button, input, textarea, select, summary, .project-card, .service-box, .hero-image img, .tag, [data-cursor-target]"
          spinDuration={1.35}
          hoverDuration={0.18}
          hideDefaultCursor={true}
          parallaxOn={true}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
