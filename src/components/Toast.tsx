import { Check } from 'lucide-react'
import { useApp } from '../lib/AppContext'

/** Lightweight confirmation toast ("Saved!") — visibility of system status. */
export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-24 z-toast flex justify-center px-6">
      <div
        role="status"
        className="anim-pop flex items-center gap-2 rounded-full bg-green-deep px-4 py-2.5 text-white shadow-pop"
      >
        <span className="grid size-5 place-items-center rounded-full bg-white/25">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
        <span className="text-[14px] font-semibold">{toast}</span>
      </div>
    </div>
  )
}
