import { Minus, Plus } from 'lucide-react'

interface Props {
  value: number
  min?: number
  max: number
  unit?: string
  onChange: (v: number) => void
}

/** Accessible quantity stepper with ≥48px targets. */
export default function QtyStepper({ value, min = 1, max, unit = 'kg', onChange }: Props) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white p-1.5">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Bawasan"
        className="tap-target grid place-items-center rounded-xl bg-green-tint text-green-deep transition active:scale-95 disabled:opacity-40"
      >
        <Minus className="size-5" strokeWidth={3} />
      </button>
      <div className="min-w-[64px] text-center">
        <span className="font-heading text-xl font-extrabold tabular-nums text-ink">{value}</span>
        <span className="ml-1 text-[13px] font-medium text-muted">{unit}</span>
      </div>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Dagdagan"
        className="tap-target grid place-items-center rounded-xl bg-green text-white transition active:scale-95 disabled:opacity-40"
      >
        <Plus className="size-5" strokeWidth={3} />
      </button>
    </div>
  )
}
