"use client"

import dynamic from "next/dynamic"

// Defer the GSAP cursor entirely to the client. Saves ~50KB of JS from the
// initial bundle and removes SSR work for an effect that has no server value.
// `ssr: false` must live in a client component — Server Components can't use it.
const TargetCursor = dynamic(
  () => import("./target-cursor").then((m) => m.default),
  { ssr: false }
)

type Props = {
  targetSelector?: string
  spinDuration?: number
  hoverDuration?: number
  hideDefaultCursor?: boolean
  parallaxOn?: boolean
}

export default function TargetCursorClient(props: Props) {
  return <TargetCursor {...props} />
}
