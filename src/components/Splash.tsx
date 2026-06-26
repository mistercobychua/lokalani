import { useEffect, useState } from 'react'
import LeafMark from './LeafMark'

/** Branded startup screen — shows briefly on launch, then fades into the launcher. */
export default function Splash({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t1 = window.setTimeout(() => setLeaving(true), 1050)
    const t2 = window.setTimeout(onDone, 1380)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [onDone])

  return (
    <div
      className={`absolute inset-0 z-[80] flex flex-col items-center justify-center overflow-hidden bg-surface transition-opacity duration-300 ease-out ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden
    >
      {/* faint leaf accents */}
      <LeafMark variant="color" className="absolute -left-4 top-10 size-20 opacity-10" />
      <LeafMark variant="color" className="absolute right-2 top-24 size-12 opacity-10" />
      <LeafMark variant="color" className="absolute bottom-28 left-8 size-10 opacity-10" />

      {/* logo lockup */}
      <div className="anim-pop relative z-10 flex flex-col items-center">
        <LeafMark variant="color" className="size-[88px] drop-shadow-sm" />
        <div className="mt-3 font-heading text-[40px] font-extrabold tracking-tight text-green-deep">LokalANI</div>
        <p className="mt-1 text-[14.5px] font-semibold italic text-green">Lokal na Ani. Lokal na Asenso.</p>
      </div>

      {/* gentle hills */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full text-green-tint"
        viewBox="0 0 390 112"
        preserveAspectRatio="none"
      >
        <path d="M0 70 Q 110 30 210 60 T 390 50 V112 H0 Z" fill="currentColor" />
        <path d="M0 92 Q 130 56 250 82 T 390 76 V112 H0 Z" fill="#dcebd2" />
      </svg>
    </div>
  )
}
