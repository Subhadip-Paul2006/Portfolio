"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

import styles from "./target-cursor.module.css"

const BORDER_WIDTH = 3
const CORNER_SIZE = 14
const INACTIVE_POSITIONS = [
  { x: -CORNER_SIZE * 1.5, y: -CORNER_SIZE * 1.5 },
  { x: CORNER_SIZE * 0.5, y: -CORNER_SIZE * 1.5 },
  { x: CORNER_SIZE * 0.5, y: CORNER_SIZE * 0.5 },
  { x: -CORNER_SIZE * 1.5, y: CORNER_SIZE * 0.5 },
]
const DEFAULT_TARGET_SELECTOR =
  "a, button, input, textarea, select, summary, .project-card, .service-box, .hero-image img, .tag, [data-cursor-target]"

type TargetCursorProps = {
  targetSelector?: string
  spinDuration?: number
  hideDefaultCursor?: boolean
  hoverDuration?: number
  parallaxOn?: boolean
}

const getNumericProperty = (element: gsap.DOMTarget, property: string) => {
  const value = gsap.getProperty(element, property)
  return typeof value === "number" ? value : Number(value) || 0
}

const isTouchDevice = () => {
  if (typeof window === "undefined") {
    return false
  }

  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false
  const touchEnabled = "ontouchstart" in window || navigator.maxTouchPoints > 0

  return coarsePointer || touchEnabled
}

export default function TargetCursor({
  targetSelector = DEFAULT_TARGET_SELECTOR,
  spinDuration = 1.35,
  hideDefaultCursor = true,
  hoverDuration = 0.18,
  parallaxOn = true,
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const spinTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const cornersRef = useRef<HTMLDivElement[]>([])
  const tickerRef = useRef<(() => void) | null>(null)
  const targetCornerPositionsRef = useRef<Array<{ x: number; y: number }> | null>(null)
  const activeStrengthRef = useRef({ value: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current

    if (!cursor || !dot || isTouchDevice()) {
      return
    }

    const corners = Array.from(cursor.querySelectorAll<HTMLDivElement>("[data-cursor-corner]"))
    cornersRef.current = corners

    const originalCursor = document.documentElement.style.cursor
    if (hideDefaultCursor) {
      document.documentElement.classList.add("target-cursor-active")
      document.documentElement.style.cursor = "none"
    }

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    })

    const moveX = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power3.out" })
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power3.out" })

    const createSpinTimeline = (paused = false) => {
      spinTimelineRef.current?.kill()
      spinTimelineRef.current = gsap
        .timeline({ repeat: -1, paused })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" })
    }

    createSpinTimeline()

    let activeTarget: HTMLElement | null = null
    let currentLeaveHandler: (() => void) | null = null
    let resumeTimeout: number | null = null

    const cleanupTarget = (target: HTMLElement | null) => {
      if (target && currentLeaveHandler) {
        target.removeEventListener("pointerleave", currentLeaveHandler)
      }
      currentLeaveHandler = null
    }

    const ticker = () => {
      const targetPositions = targetCornerPositionsRef.current
      if (!targetPositions || cornersRef.current.length === 0) {
        return
      }

      const strength = activeStrengthRef.current.value
      if (strength === 0) {
        return
      }

      const cursorX = getNumericProperty(cursor, "x")
      const cursorY = getNumericProperty(cursor, "y")

      cornersRef.current.forEach((corner, index) => {
        const currentX = getNumericProperty(corner, "x")
        const currentY = getNumericProperty(corner, "y")
        const targetX = targetPositions[index].x - cursorX
        const targetY = targetPositions[index].y - cursorY

        gsap.to(corner, {
          x: currentX + (targetX - currentX) * strength,
          y: currentY + (targetY - currentY) * strength,
          duration: strength >= 0.99 ? (parallaxOn ? 0.18 : 0) : 0.05,
          ease: parallaxOn ? "power1.out" : "none",
          overwrite: "auto",
        })
      })
    }

    tickerRef.current = ticker

    const pointerMoveHandler = (event: PointerEvent) => {
      moveX(event.clientX)
      moveY(event.clientY)
    }

    const scrollHandler = () => {
      if (!activeTarget) {
        return
      }

      const mouseX = getNumericProperty(cursor, "x")
      const mouseY = getNumericProperty(cursor, "y")
      const elementUnderPointer = document.elementFromPoint(mouseX, mouseY)
      const stillOverTarget =
        elementUnderPointer instanceof Element &&
        (elementUnderPointer === activeTarget || elementUnderPointer.closest(targetSelector) === activeTarget)

      if (!stillOverTarget) {
        currentLeaveHandler?.()
      }
    }

    const pointerDownHandler = () => {
      gsap.to(dot, { scale: 0.72, duration: 0.2, ease: "power2.out" })
      gsap.to(cursor, { scale: 0.92, duration: 0.16, ease: "power2.out" })
    }

    const pointerUpHandler = () => {
      gsap.to(dot, { scale: 1, duration: 0.22, ease: "power2.out" })
      gsap.to(cursor, { scale: 1, duration: 0.18, ease: "power2.out" })
    }

    const pointerOverHandler = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) {
        return
      }

      const target = event.target.closest(targetSelector)
      if (!(target instanceof HTMLElement) || target === activeTarget) {
        return
      }

      cleanupTarget(activeTarget)
      if (resumeTimeout) {
        window.clearTimeout(resumeTimeout)
        resumeTimeout = null
      }

      activeTarget = target
      cornersRef.current.forEach((corner) => gsap.killTweensOf(corner))

      gsap.killTweensOf(cursor, "rotation")
      spinTimelineRef.current?.pause()
      gsap.set(cursor, { rotation: 0 })

      const rect = target.getBoundingClientRect()
      const cursorX = getNumericProperty(cursor, "x")
      const cursorY = getNumericProperty(cursor, "y")

      targetCornerPositionsRef.current = [
        { x: rect.left - BORDER_WIDTH, y: rect.top - BORDER_WIDTH },
        { x: rect.right + BORDER_WIDTH - CORNER_SIZE, y: rect.top - BORDER_WIDTH },
        { x: rect.right + BORDER_WIDTH - CORNER_SIZE, y: rect.bottom + BORDER_WIDTH - CORNER_SIZE },
        { x: rect.left - BORDER_WIDTH, y: rect.bottom + BORDER_WIDTH - CORNER_SIZE },
      ]

      if (tickerRef.current) {
        gsap.ticker.add(tickerRef.current)
      }

      gsap.to(activeStrengthRef.current, {
        value: 1,
        duration: hoverDuration,
        ease: "power2.out",
      })

      cornersRef.current.forEach((corner, index) => {
        const targetPosition = targetCornerPositionsRef.current?.[index]
        if (!targetPosition) {
          return
        }

        gsap.to(corner, {
          x: targetPosition.x - cursorX,
          y: targetPosition.y - cursorY,
          duration: 0.18,
          ease: "power2.out",
          overwrite: "auto",
        })
      })

      const leaveHandler = () => {
        if (tickerRef.current) {
          gsap.ticker.remove(tickerRef.current)
        }

        targetCornerPositionsRef.current = null
        gsap.set(activeStrengthRef.current, { value: 0, overwrite: true })
        activeTarget = null

        gsap.killTweensOf(cornersRef.current)
        const cornersTimeline = gsap.timeline()
        cornersRef.current.forEach((corner, index) => {
          cornersTimeline.to(
            corner,
            {
              x: INACTIVE_POSITIONS[index].x,
              y: INACTIVE_POSITIONS[index].y,
              duration: 0.28,
              ease: "power3.out",
            },
            0,
          )
        })

        resumeTimeout = window.setTimeout(() => {
          if (!activeTarget) {
            const currentRotation = getNumericProperty(cursor, "rotation")
            const normalizedRotation = ((currentRotation % 360) + 360) % 360

            createSpinTimeline(true)
            gsap.to(cursor, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => spinTimelineRef.current?.restart(),
            })
          }
          resumeTimeout = null
        }, 40)

        cleanupTarget(target)
      }

      currentLeaveHandler = leaveHandler
      target.addEventListener("pointerleave", leaveHandler)
    }

    window.addEventListener("pointermove", pointerMoveHandler, { passive: true })
    window.addEventListener("pointerover", pointerOverHandler, { passive: true })
    window.addEventListener("scroll", scrollHandler, { passive: true })
    window.addEventListener("pointerdown", pointerDownHandler, { passive: true })
    window.addEventListener("pointerup", pointerUpHandler, { passive: true })

    return () => {
      if (tickerRef.current) {
        gsap.ticker.remove(tickerRef.current)
      }

      window.removeEventListener("pointermove", pointerMoveHandler)
      window.removeEventListener("pointerover", pointerOverHandler)
      window.removeEventListener("scroll", scrollHandler)
      window.removeEventListener("pointerdown", pointerDownHandler)
      window.removeEventListener("pointerup", pointerUpHandler)

      if (resumeTimeout) {
        window.clearTimeout(resumeTimeout)
      }

      cleanupTarget(activeTarget)
      spinTimelineRef.current?.kill()
      gsap.killTweensOf([cursor, dot, ...cornersRef.current])

      document.documentElement.classList.remove("target-cursor-active")
      document.documentElement.style.cursor = originalCursor
    }
  }, [hideDefaultCursor, hoverDuration, parallaxOn, spinDuration, targetSelector])

  return (
    <div ref={cursorRef} className={styles.wrapper} aria-hidden="true">
      <div ref={dotRef} className={styles.dot} />
      <div data-cursor-corner className={`${styles.corner} ${styles.cornerTopLeft}`} />
      <div data-cursor-corner className={`${styles.corner} ${styles.cornerTopRight}`} />
      <div data-cursor-corner className={`${styles.corner} ${styles.cornerBottomRight}`} />
      <div data-cursor-corner className={`${styles.corner} ${styles.cornerBottomLeft}`} />
    </div>
  )
}
