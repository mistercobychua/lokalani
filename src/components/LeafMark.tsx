import { useId } from 'react'

interface Props {
  className?: string
  /** 'color' for light backgrounds, 'white' (reverse) for green/dark backgrounds. */
  variant?: 'color' | 'white'
}

// Leaf silhouette; the negative space below is two cupped hands reaching
// toward each other (vendors + carinderias + drivers cradling the harvest).
const LEAF = 'M32 4 C 17 8, 11 23, 12.5 37 C 13.8 49, 21 58, 32 60 C 43 58, 50.2 49, 51.5 37 C 53 23, 47 8, 32 4 Z'
const HANDS = 'M13 37 C 16 43, 22 46, 31.4 46 C 31.7 44, 32.3 44, 32.6 46 C 42 46, 48 43, 51 37'
const LOWER = 'M13 37 C 16 43, 22 46, 31.4 46 C 31.7 44, 32.3 44, 32.6 46 C 42 46, 48 43, 51 37 C 51 47, 43 57.5, 32 60 C 21 57.5, 13 47, 13 37 Z'
const SEAM = 'M32 46.5 L 32 54'

export default function LeafMark({ className = '', variant = 'color' }: Props) {
  const uid = useId().replace(/:/g, '')
  const clip = `leaf-${uid}`
  const isWhite = variant === 'white'

  const seamColor = isWhite ? 'rgba(15,61,46,0.3)' : 'rgba(246,244,239,0.7)'

  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="LokalANI">
      <defs>
        <clipPath id={clip}>
          <path d={LEAF} />
        </clipPath>
      </defs>
      <path d={LEAF} fill={isWhite ? '#ffffff' : '#5ba745'} />
      <g clipPath={`url(#${clip})`}>
        <path d={LOWER} fill={isWhite ? 'rgba(15,61,46,0.18)' : '#0f3d2e'} />
        <path
          d={HANDS}
          fill="none"
          stroke={isWhite ? 'rgba(15,61,46,0.32)' : '#f6f4ef'}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path d={SEAM} fill="none" stroke={seamColor} strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </svg>
  )
}
