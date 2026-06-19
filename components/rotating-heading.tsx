"use client"

import { memo, useEffect, useRef, useState } from "react"
import styles from "./skills-section.module.css"

const ROTATING_WORDS = ["DESIGN", "ALGORITHMS", "DATA", "SYSTEMS", "CODE"]

/**
 * Isolated typewriter heading. State and effect are scoped here so the
 * per-keystroke re-render never reaches the parent SkillsSection — the
 * 25 skill-card nodes below stay untouched for the entire animation.
 *
 * We still render React once per tick (the wrapping span needs to update
 * `aria-live`), but only this component's own tree reconciles.
 */
function RotatingHeadingInner() {
  const [displayText, setDisplayText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let cancelled = false
    let timeout: ReturnType<typeof setTimeout> | undefined

    const tick = () => {
      if (cancelled) return
      const currentWord = ROTATING_WORDS[wordIndex]

      if (!isDeleting && displayText === currentWord) {
        // Hold the finished word for 2s, then start deleting
        timeout = setTimeout(() => {
          if (!cancelled) setIsDeleting(true)
        }, 2000)
      } else if (isDeleting && displayText === "") {
        // Move to the next word on the next tick
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
      } else if (isDeleting) {
        timeout = setTimeout(() => {
          if (!cancelled) setDisplayText(currentWord.slice(0, displayText.length - 1))
        }, 60)
      } else {
        timeout = setTimeout(() => {
          if (!cancelled) setDisplayText(currentWord.slice(0, displayText.length + 1))
        }, 120)
      }
    }

    tick()
    return () => {
      cancelled = true
      if (timeout) clearTimeout(timeout)
    }
  }, [displayText, isDeleting, wordIndex])

  return (
    <h2 className={styles.heading} id="skills">
      <span className={styles.headingStatic}>CORE.</span>
      <span className={styles.headingDynamic} aria-live="polite">
        {displayText}
        <span className={styles.cursor} aria-hidden="true">
          _
        </span>
      </span>
    </h2>
  )
}

// memo guarantees that even if SkillsSection re-renders for an unrelated
// reason, the heading's state and effect don't get re-evaluated.
export const RotatingHeading = memo(RotatingHeadingInner)
