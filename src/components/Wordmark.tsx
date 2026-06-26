import LeafMark from './LeafMark'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** On dark/green backgrounds (default) vs light surfaces. */
  tone?: 'light' | 'dark'
  className?: string
}

const sizes = {
  sm: { text: 'text-base', mark: 'size-5' },
  md: { text: 'text-xl', mark: 'size-7' },
  lg: { text: 'text-3xl', mark: 'size-9' },
  xl: { text: 'text-4xl', mark: 'size-11' },
}

/** LokalANI wordmark with the leaf-cradle mark. Uniform colour per brand. */
export default function Wordmark({ size = 'md', tone = 'light', className = '' }: Props) {
  const s = sizes[size]
  const word = tone === 'light' ? 'text-white' : 'text-green-deep'
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LeafMark className={s.mark} variant={tone === 'light' ? 'white' : 'color'} />
      <span className={`font-heading font-extrabold tracking-tight ${s.text} ${word}`}>LokalANI</span>
    </span>
  )
}
