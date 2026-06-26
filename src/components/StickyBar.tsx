import type { ReactNode } from 'react'

/** Bottom-anchored action bar — keeps the primary action within thumb reach. */
export default function StickyBar({ children }: { children: ReactNode }) {
  return (
    <div
      className="z-sticky shrink-0 border-t border-border bg-white/95 px-4 pt-3 backdrop-blur"
      style={{ paddingBottom: 'max(0.875rem, env(safe-area-inset-bottom))' }}
    >
      {children}
    </div>
  )
}
