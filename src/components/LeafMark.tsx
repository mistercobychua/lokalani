import { useId } from 'react'

interface Props {
  className?: string
  /** 'color' for light backgrounds, 'white' (reverse) for green/dark backgrounds. */
  variant?: 'color' | 'white'
}

// Leaf silhouette + the wavy "harvest hills" divider, traced from the brand mark.
const LEAF = 'M32 4 C 17 8, 11 23, 12.5 37 C 13.8 49, 21 58, 32 60 C 43 58, 50.2 49, 51.5 37 C 53 23, 47 8, 32 4 Z'
const WAVE = 'M12.5 39 C 19 46, 27 46, 32 42 C 37 38, 45 38, 51.5 40'
const LOWER = 'M12.5 39 C 19 46, 27 46, 32 42 C 37 38, 45 38, 51.5 40 C 50.5 49, 43 57.5, 32 60 C 21 57.5, 13.5 49, 12.5 39 Z'

/**
 * LokalANI logo mark — a leaf whose bright crown sits over a deep-green base,
 * split by a white wave (the harvest hills). Reverse (white) for green surfaces.
 */
export default function LeafMark({ className = '', variant = 'color' }: Props) {
  const uid = useId().replace(/:/g, '')
  const clip = `leaf-${uid}`

  if (variant === 'white') {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label="LokalANI">
        <defs>
          <clipPath id={clip}>
            <path d={LEAF} />
          </clipPath>
        </defs>
        <path d={LEAF} fill="#ffffff" />
        <g clipPath={`url(#${clip})`}>
          <path d={LOWER} fill="rgba(15,61,46,0.18)" />
          <path d={WAVE} fill="none" stroke="rgba(15,61,46,0.32)" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="LokalANI">
      <defs>
        <clipPath id={clip}>
          <path d={LEAF} />
        </clipPath>
      </defs>
      <path d={LEAF} fill="#5ba745" />
      <g clipPath={`url(#${clip})`}>
        <path d={LOWER} fill="#0f3d2e" />
        <path d={WAVE} fill="none" stroke="#f6f4ef" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    </svg>
  )
}
