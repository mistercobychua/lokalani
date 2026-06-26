import { Sprout } from 'lucide-react'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** On dark/green backgrounds (default) vs light surfaces. */
  tone?: 'light' | 'dark'
  className?: string
}

const sizes = {
  sm: { text: 'text-base', icon: 'size-4', pad: 'p-1.5', box: 'rounded-lg' },
  md: { text: 'text-xl', icon: 'size-5', pad: 'p-2', box: 'rounded-xl' },
  lg: { text: 'text-3xl', icon: 'size-7', pad: 'p-2.5', box: 'rounded-2xl' },
  xl: { text: 'text-4xl', icon: 'size-8', pad: 'p-3', box: 'rounded-2xl' },
}

/** LokalANI wordmark with a sprout glyph (harvest motif). */
export default function Wordmark({ size = 'md', tone = 'light', className = '' }: Props) {
  const s = sizes[size]
  const lokal = tone === 'light' ? 'text-white' : 'text-green-deep'
  const ani = tone === 'light' ? 'text-[#f4d9a8]' : 'text-amber-deep'
  const glyphWrap =
    tone === 'light' ? 'bg-white/15 text-[#f4d9a8]' : 'bg-green-tint text-green'

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`grid place-items-center ${s.pad} ${s.box} ${glyphWrap}`}>
        <Sprout className={s.icon} strokeWidth={2.4} />
      </span>
      <span className={`font-heading font-extrabold tracking-tight ${s.text}`}>
        <span className={lokal}>Lokal</span>
        <span className={ani}>ANI</span>
      </span>
    </span>
  )
}
