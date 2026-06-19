"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

type Props = {
  targetSelector?: string
  spinDuration?: number
  hoverDuration?: number
  hideDefaultCursor?: boolean
  parallaxOn?: boolean
}

const TargetCursor = dynamic(
  () => import("./target-cursor").then((m) => m.default),
  {
    ssr: false,
    // Render nothing on first paint while we wait for the GSAP chunk.
    loading: () => null,
  },
)

// Match-media query lets us decide at the React boundary whether to load
// the cursor at all. On a coarse-pointer (touch) device the entire GSAP
// bundle, the spinning timeline, and the 5 pointer/scroll listeners are
// pure waste — so we short-circuit and render `null`.
function useFinePointer(): boolean {
  const [finePointer, setFinePointer] = useState<boolean | null>(null)

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine) and (hover: hover)")
    // Default to false on the very first client paint so phones don't
    // briefly load the cursor while matchMedia resolves.
    setFinePointer(mql.matches)

    const handler = (event: MediaQueryListEvent) => setFinePointer(event.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  return finePointer !== false
}

export default function TargetCursorClient(props: Props) {
  const shouldRender = useFinePointer()
  if (!shouldRender) return null
  return <TargetCursor {...props} />
}
