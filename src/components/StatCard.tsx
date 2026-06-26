import type { ComponentType, ReactNode } from 'react'

interface Props {
  label: string
  value: ReactNode
  sub?: string
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>
  tone?: 'green' | 'amber' | 'plain'
}

const tones = {
  green: 'bg-green-tint text-green',
  amber: 'bg-amber-tint text-amber-deep',
  plain: 'bg-surface text-muted',
}

export default function StatCard({ label, value, sub, icon: Icon, tone = 'plain' }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-white p-3.5 shadow-card">
      <div className="flex items-center gap-2">
        {Icon && (
          <span className={`grid size-8 place-items-center rounded-lg ${tones[tone]}`}>
            <Icon className="size-[18px]" strokeWidth={2.4} />
          </span>
        )}
        <span className="text-[13px] font-medium text-muted">{label}</span>
      </div>
      <div className="mt-2 font-heading text-[26px] font-extrabold leading-none text-ink">{value}</div>
      {sub && <div className="mt-1 text-[12.5px] text-muted">{sub}</div>}
    </div>
  )
}
