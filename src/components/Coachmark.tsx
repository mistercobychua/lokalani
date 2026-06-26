import { useState } from 'react'
import { Hand, X } from 'lucide-react'
import { useApp } from '../lib/AppContext'
import { useT } from '../lib/i18n'
import type { Role } from '../types'

export interface CoachStep {
  title: string
  body: string
  /** Where the hint card sits, pointing at that region of the screen. */
  where: 'top' | 'mid' | 'bottom'
}

const placement: Record<CoachStep['where'], string> = {
  top: 'top-[84px]',
  mid: 'top-1/2 -translate-y-1/2',
  bottom: 'bottom-[92px]',
}

/** Skippable first-run walkthrough (≤3 steps). Overlay, not an extra screen. */
export default function Coachmark({ role, steps }: { role: Role; steps: CoachStep[] }) {
  const { coachSeen, markCoachSeen } = useApp()
  const t = useT()
  const [i, setI] = useState(0)

  if (coachSeen[role]) return null
  const step = steps[i]
  const last = i === steps.length - 1
  const finish = () => markCoachSeen(role)

  return (
    <div className="absolute inset-0 z-coachmark anim-fade" role="dialog" aria-modal="true" aria-label="Gabay">
      <div className="absolute inset-0 bg-green-deep/55 backdrop-blur-[1px]" />

      <div className={`absolute inset-x-4 ${placement[step.where]}`}>
        <div className="anim-fade-up rounded-card bg-white p-4 shadow-pop">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-tint text-amber-deep anim-pulse-soft">
              <Hand className="size-5" strokeWidth={2.4} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-[17px] font-extrabold text-green-deep">{step.title}</h3>
              <p className="mt-1 text-[16px] leading-snug text-ink">{step.body}</p>
            </div>
            <button
              type="button"
              onClick={finish}
              aria-label="I-skip ang gabay"
              className="tap-target -mr-1.5 -mt-1.5 grid place-items-center rounded-lg text-muted transition hover:bg-surface active:scale-95"
            >
              <X className="size-5" strokeWidth={2.4} />
            </button>
          </div>

          <div className="mt-3.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {steps.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? 'w-5 bg-green' : 'w-1.5 bg-border'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={finish}
                className="rounded-xl px-3 py-2 text-[14px] font-semibold text-muted transition hover:bg-surface"
              >
                {t('Laktawan', 'Skip')}
              </button>
              <button
                type="button"
                onClick={() => (last ? finish() : setI((v) => v + 1))}
                className="tap-target rounded-xl bg-green px-4 py-2.5 text-[14px] font-bold text-white shadow-card transition active:scale-95"
              >
                {last ? t('Tapos na', 'Done') : t('Susunod', 'Next')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
