import { useState } from 'react'

interface Props {
  emoji: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Looks for /produce/<imageId>.{jpg,png,jpeg,webp}; falls back to the emoji. */
  imageId?: string
  className?: string
}

const sizes = {
  sm: { box: 'size-12 rounded-xl', text: 'text-[26px]' },
  md: { box: 'size-16 rounded-2xl', text: 'text-[34px]' },
  lg: { box: 'size-20 rounded-2xl', text: 'text-[44px]' },
  xl: { box: 'w-full h-40 rounded-card', text: 'text-[88px]' },
}

const exts = ['jpg', 'png', 'jpeg', 'webp']

/** Produce tile — real photo when available, styled emoji otherwise (no image hosting). */
export default function ProduceGlyph({ emoji, size = 'md', imageId, className = '' }: Props) {
  const s = sizes[size]
  const [extIdx, setExtIdx] = useState(0)
  const useImg = !!imageId && extIdx < exts.length

  return (
    <div
      className={`grid shrink-0 place-items-center overflow-hidden bg-gradient-to-br from-green-tint to-[#d8ebca] ring-1 ring-inset ring-green/10 ${s.box} ${className}`}
    >
      {useImg ? (
        <img
          src={`/produce/${imageId}.${exts[extIdx]}`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setExtIdx((i) => i + 1)}
        />
      ) : (
        <span className={`${s.text} drop-shadow-sm`} aria-hidden>
          {emoji}
        </span>
      )}
    </div>
  )
}
