"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  /** Size of the icon mark in px. Default 36. */
  size?: number
  /** Show the wordmark next to the icon. Default true. */
  showWordmark?: boolean
  /** Compact variant hides the sub-label "TRANSFER". Default false. */
  compact?: boolean
}

/**
 * Movi Transfer premium brand mark.
 *
 * Mark: a precise octagonal ring (like the BMW roundel outline) containing a
 * geometric, hairline "M" — three vertical bars connected by a V-notch peak.
 * Pure monochrome — no fills, no colour — adapts to any dark or light surface
 * via currentColor.
 *
 * Wordmark: "MOVI" in tight all-caps with extreme letter-spacing, a thin rule
 * separator, then "TRANSFER" in lighter weight micro-caps — echoing Rolls-Royce
 * and Mercedes nameplate conventions.
 */
export function MoviLogo({
  className,
  size = 36,
  showWordmark = true,
  compact = false,
}: LogoProps) {
  // Stroke weight scales proportionally but stays hairline-thin
  const ringStroke = size * 0.045   // outer ring
  const mStroke    = size * 0.055   // M strokes — slightly heavier for contrast
  const ruleOpacity = 0.25

  return (
    <span className={cn("inline-flex items-center gap-3 select-none", className)}>

      {/* ══ ICON MARK ══════════════════════════════════════════════════ */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        style={{ display: "block", flexShrink: 0 }}
      >
        {/*
          Outer precision ring — single circle, no fill.
          Like the BMW roundel or Mercedes star ring.
        */}
        <circle
          cx="24" cy="24" r="21.5"
          stroke="currentColor"
          strokeWidth={ringStroke * (48 / size)}
          opacity="1"
        />

        {/*
          Inner concentric ring — thinner, creates the "depth halo" seen on
          premium automotive badges (Lexus, Audi, BMW inner rings).
        */}
        <circle
          cx="24" cy="24" r="17.5"
          stroke="currentColor"
          strokeWidth={ringStroke * (48 / size) * 0.5}
          opacity="0.35"
        />

        {/*
          Geometric "M" mark — three vertical bars + V-notch.
          Sits centred within the inner ring.
          Left bar: x=13  Middle apex: x=24 y=16  Right bar: x=35
          Bars descend to y=34, apex rises to y=16.
        */}
        <path
          d="M13 34 L13 18 L24 28 L35 18 L35 34"
          stroke="currentColor"
          strokeWidth={mStroke * (48 / size)}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>

      {/* ══ WORDMARK ════════════════════════════════════════════════════ */}
      {showWordmark && (
        <span
          className="flex flex-col leading-none"
          style={{ gap: size * 0.08 }}
        >
          {/* Primary name — tight all-caps, very wide tracking */}
          <span
            className="font-light text-foreground uppercase"
            style={{
              fontSize:      size * 0.38,
              letterSpacing: "0.28em",
              fontStretch:   "normal",
            }}
          >
            Movi
          </span>

          {!compact && (
            <>
              {/* Thin rule separator — like the line in Mercedes wordmarks */}
              <span
                className="block w-full"
                style={{
                  height:  "1px",
                  background: "currentColor",
                  opacity: ruleOpacity,
                  marginTop: size * 0.02,
                  marginBottom: size * 0.02,
                }}
                aria-hidden="true"
              />

              {/* Sub-label — ultra-light, micro-caps, wide tracking */}
              <span
                className="font-extralight text-foreground/50 uppercase tracking-widest"
                style={{
                  fontSize:      size * 0.20,
                  letterSpacing: "0.38em",
                }}
              >
                Transfer
              </span>
            </>
          )}
        </span>
      )}
    </span>
  )
}
