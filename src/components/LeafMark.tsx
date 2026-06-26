interface Props {
  className?: string
  /** 'color' for light backgrounds, 'white' (reverse) for green/dark backgrounds. */
  variant?: 'color' | 'white'
}

/**
 * LokalANI logo mark — a leaf (fresh harvest) whose two strokes leave a
 * negative space shaped like cupped hands (vendors + carinderias + drivers
 * creating value together). Upper stroke = bright leaf, lower = deep forest.
 */
export default function LeafMark({ className = '', variant = 'color' }: Props) {
  // Full leaf silhouette (pointed top + bottom, gently rounded sides).
  const leaf = 'M32 3.5 C 14.5 14, 12 36, 21 49.5 C 25.5 56, 32 60.5, 32 60.5 C 32 60.5, 38.5 56, 43 49.5 C 52 36, 49.5 14, 32 3.5 Z'
  // Lower stroke: its TOP edge is two humps = cupped hands cradling.
  const lower =
    'M21 41.5 C 24.5 38.5, 27 41, 29 43 C 30.2 44.2, 31 44.4, 32 44.6 C 33 44.4, 33.8 44.2, 35 43 C 37 41, 39.5 38.5, 43 41.5 C 47.5 47, 39.5 56, 32 60.5 C 24.5 56, 16.5 47, 21 41.5 Z'
  const vein = 'M32 9 C 30.4 23, 30.4 38, 32 52'

  if (variant === 'white') {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label="LokalANI">
        <path d={leaf} fill="#ffffff" />
        {/* cradle gap drawn in the backdrop tone so the hands read on any green */}
        <path
          d="M21 41.5 C 24.5 38.5, 27 41, 29 43 C 30.2 44.2, 31 44.4, 32 44.6 C 33 44.4, 33.8 44.2, 35 43 C 37 41, 39.5 38.5, 43 41.5"
          fill="none"
          stroke="rgba(15,61,46,0.32)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d={vein} fill="none" stroke="rgba(15,61,46,0.3)" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="LokalANI">
      {/* bright upper stroke (whole leaf) */}
      <path d={leaf} fill="#5ba745" />
      {/* deep lower stroke with the cupped-hands top edge */}
      <path d={lower} fill="#0f3d2e" />
      {/* slim cream gap + vein for definition */}
      <path
        d="M21 41.5 C 24.5 38.5, 27 41, 29 43 C 30.2 44.2, 31 44.4, 32 44.6 C 33 44.4, 33.8 44.2, 35 43 C 37 41, 39.5 38.5, 43 41.5"
        fill="none"
        stroke="#f6f4ef"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path d="M32 9 C 30.6 21, 30.6 33, 31.4 40" fill="none" stroke="#f6f4ef" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
    </svg>
  )
}
