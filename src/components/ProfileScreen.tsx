import { useNavigate } from 'react-router-dom'
import { ArrowLeftRight, RotateCcw, Star, ChevronRight, type LucideIcon } from 'lucide-react'
import AppBar from './AppBar'
import ScreenShell from './ScreenShell'
import StatCard from './StatCard'
import SectionHeading from './SectionHeading'
import { useApp } from '../lib/AppContext'
import type { Role } from '../types'

interface Stat {
  label: string
  value: string
  sub?: string
  icon?: LucideIcon
  tone?: 'green' | 'amber' | 'plain'
}

interface Props {
  role: Role
  title: string
  helpKey: string
  emoji: string
  name: string
  sub: string
  rating?: number
  quote?: string
  info: { label: string; value: string }[]
  stats: Stat[]
}

export default function ProfileScreen({ role, title, helpKey, emoji, name, sub, rating, quote, info, stats }: Props) {
  const navigate = useNavigate()
  const { replayCoach } = useApp()

  return (
    <ScreenShell appBar={<AppBar title={title} role={role} helpKey={helpKey} />}>
      <div className="px-4 pb-6 pt-4">
        {/* Header */}
        <div className="overflow-hidden rounded-card border border-border bg-white shadow-card">
          <div className="bg-gradient-to-br from-green-dark to-green-deep px-4 pb-8 pt-5 text-white">
            <div className="flex items-center gap-3.5">
              <span className="grid size-16 place-items-center rounded-2xl bg-white/15 text-[34px] ring-1 ring-white/25">
                {emoji}
              </span>
              <div className="min-w-0">
                <h1 className="font-heading text-[21px] font-extrabold leading-tight">{name}</h1>
                <p className="text-[14px] text-white/85">{sub}</p>
                {rating !== undefined && (
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[12.5px] font-bold">
                    <Star className="size-[13px] fill-current" strokeWidth={0} /> {rating} rating
                  </span>
                )}
              </div>
            </div>
          </div>
          {quote && (
            <p className="-mt-4 mx-3 rounded-2xl bg-white p-3.5 text-[13.5px] italic leading-snug text-ink shadow-card ring-1 ring-border">
              “{quote}”
            </p>
          )}
          <dl className="divide-y divide-border px-4 py-1">
            {info.map((r) => (
              <div key={r.label} className="flex items-center justify-between py-2.5">
                <dt className="text-[13.5px] text-muted">{r.label}</dt>
                <dd className="text-[13.5px] font-semibold text-ink">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Stats */}
        <div className="mt-5">
          <SectionHeading>Buod</SectionHeading>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <StatCard key={s.label} label={s.label} value={s.value} sub={s.sub} icon={s.icon} tone={s.tone} />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-5 space-y-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="tap-target flex w-full items-center gap-3 rounded-2xl bg-green px-4 py-3.5 text-left text-white shadow-pop transition active:scale-[0.98]"
          >
            <ArrowLeftRight className="size-5" strokeWidth={2.4} />
            <span className="flex-1 font-heading text-[15.5px] font-bold">Palitan ang role</span>
            <ChevronRight className="size-5" strokeWidth={2.4} />
          </button>
          <button
            type="button"
            onClick={() => {
              replayCoach(role)
              navigate(`/${role}`)
            }}
            className="tap-target flex w-full items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3.5 text-left text-green-deep transition hover:bg-green-tint active:scale-[0.98]"
          >
            <RotateCcw className="size-5" strokeWidth={2.3} />
            <span className="flex-1 font-heading text-[15px] font-bold">Ipakita ulit ang gabay</span>
            <ChevronRight className="size-5" strokeWidth={2.4} />
          </button>
        </div>

        <p className="mt-5 text-center text-[12px] text-muted">LokalANI • Walang sayang na ani.</p>
      </div>
    </ScreenShell>
  )
}
