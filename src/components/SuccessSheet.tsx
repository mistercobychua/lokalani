import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import BottomSheet from './BottomSheet'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  /** "Exactly what happens next" — teach the outcome. */
  steps: { emoji: string; text: ReactNode }[]
  primary: { label: string; onClick: () => void }
  secondary?: { label: string; onClick: () => void }
}

export default function SuccessSheet({ open, onClose, title, steps, primary, secondary }: Props) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      dismissable={false}
      footer={
        <div className="space-y-2">
          <button
            type="button"
            onClick={primary.onClick}
            className="tap-target w-full rounded-2xl bg-green px-5 py-3.5 font-heading text-[16px] font-bold text-white shadow-pop transition active:scale-[0.98]"
          >
            {primary.label}
          </button>
          {secondary && (
            <button
              type="button"
              onClick={secondary.onClick}
              className="tap-target w-full rounded-2xl border border-border bg-white px-5 py-3 text-[15px] font-semibold text-green-deep transition hover:bg-green-tint active:scale-[0.98]"
            >
              {secondary.label}
            </button>
          )}
        </div>
      }
    >
      <div className="pb-2 pt-2 text-center">
        <div className="anim-pop mx-auto grid size-16 place-items-center rounded-full bg-green text-white shadow-pop">
          <Check className="size-9" strokeWidth={3} />
        </div>
        <h2 className="mt-3 font-heading text-[22px] font-extrabold text-green-deep">{title}</h2>
      </div>
      <ul className="mt-2 space-y-2 text-left">
        {steps.map((s, i) => (
          <li key={i} className="flex items-center gap-3 rounded-2xl bg-surface p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-[20px] shadow-card" aria-hidden>
              {s.emoji}
            </span>
            <span className="text-[14.5px] leading-snug text-ink">{s.text}</span>
          </li>
        ))}
      </ul>
    </BottomSheet>
  )
}
