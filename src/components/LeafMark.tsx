interface Props {
  className?: string
  /** 'color' for light backgrounds, 'white' (reverse) for green/dark backgrounds. */
  variant?: 'color' | 'white'
}

/**
 * LokalANI logo mark — a leaf (fresh harvest) whose lower curve cradles like
 * hands (vendors + carinderias + drivers creating value together).
 */
export default function LeafMark({ className = '', variant = 'color' }: Props) {
  const leafPath = 'M32 4 C 15 16, 13 42, 32 60 C 51 42, 49 16, 32 4 Z'
  // wavy lower edge of the bright upper leaf — the gap below reads as cradling hands
  const upperPath =
    'M32 4 C 16 15, 14 35, 22 42 C 26.5 37.5, 29.5 40.5, 32 44 C 34.5 40.5, 37.5 37.5, 42 42 C 50 35, 48 15, 32 4 Z'
  const veinPath = 'M32 9 C 30 24, 30 40, 32 55'

  if (variant === 'white') {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label="LokalANI">
        <path d={leafPath} fill="#ffffff" />
        <path d={upperPath} fill="#ffffff" />
        <path
          d="M22 42 C 26.5 37.5, 29.5 40.5, 32 44 C 34.5 40.5, 37.5 37.5, 42 42"
          fill="none"
          stroke="rgba(15,61,46,0.28)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path d={veinPath} fill="none" stroke="rgba(15,61,46,0.28)" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="LokalANI">
      <path d={leafPath} fill="#0f3d2e" />
      <path d={upperPath} fill="#5ba745" />
      <path d={veinPath} fill="none" stroke="#f6f4ef" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
    </svg>
  )
}
