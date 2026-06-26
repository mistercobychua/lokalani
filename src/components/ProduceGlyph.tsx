interface Props {
  emoji: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm: 'size-12 text-[26px] rounded-xl',
  md: 'size-16 text-[34px] rounded-2xl',
  lg: 'size-20 text-[44px] rounded-2xl',
  xl: 'w-full h-40 text-[88px] rounded-card',
}

/** Produce represented as an emoji inside a calm, styled tile (no image hosting). */
export default function ProduceGlyph({ emoji, size = 'md', className = '' }: Props) {
  return (
    <div
      className={`grid shrink-0 place-items-center bg-gradient-to-br from-green-tint to-[#d8ebca] ring-1 ring-inset ring-green/10 ${sizes[size]} ${className}`}
      aria-hidden
    >
      <span className="drop-shadow-sm">{emoji}</span>
    </div>
  )
}
