import type React from "react"
import type { Metadata, Viewport } from "next"
import { Archivo_Black, Space_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import TargetCursor from "@/components/target-cursor-client"
import "./globals.css"

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo-black",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
  preload: true,
  fallback: ["ui-monospace", "monospace"],
})

export const metadata: Metadata = {
  title: "Shubh.06",
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
  metadataBase: new URL("https://jess.vc"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jess.vc",
    title: "Shubh.06",
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
    title: "Shubh.06",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

// JSON-LD Person schema. Inlined into <head> so search engines can pick
// it up without a separate request — Lighthouse SEO recommends structured
// data on a single-page portfolio like this.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Subhadip Paul",
  alternateName: "Subh.06",
  url: "https://jess.vc",
  image: "https://jess.vc/images/me.jpeg",
  jobTitle: "Vibe Coder & Creative Developer",
  description:
    "Crafting aesthetic code and brutalist digital experiences. Where technical excellence meets raw creative energy.",
  sameAs: [
    "https://github.com/Subhadip-Paul2006",
    "https://www.linkedin.com/in/subhadip-paul-471186339/",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Brutalist Design",
    "Frontend Development",
    "Data Structures and Algorithms",
    "Data Science",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <TargetCursor
          targetSelector="a, button, input, textarea, select, summary, .project-card, .service-box, .skill-card, .hero-image img, .tag, [data-cursor-target]"
          spinDuration={1.35}
          hoverDuration={0.18}
          hideDefaultCursor={true}
          parallaxOn={true}
        />
        {children}
        {/* Lazy-load analytics so the initial HTML/JS payload stays small.
            `next/script` strategy=afterInteractive defers Vercel's beacon
            until the page is interactive. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.va = window.va || function () { (window.va.q = window.va.q || []).push(arguments); };`,
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
