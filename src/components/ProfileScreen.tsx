import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftRight, RotateCcw, Star, ChevronRight, Pencil, Check, type LucideIcon } from 'lucide-react'
import AppBar from './AppBar'
import ScreenShell from './ScreenShell'
import StatCard from './StatCard'
import SectionHeading from './SectionHeading'
import BottomSheet from './BottomSheet'
import { useApp } from '../lib/AppContext'
import { useT } from '../lib/i18n'
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
  const { replayCoach, showToast } = useApp()
  const t = useT()

  // Editable profile (mockup — lives in component state).
  const [profName, setProfName] = useState(name)
  const [profSub, setProfSub] = useState(sub)
  const [profLoc, setProfLoc] = useState(info[0]?.value ?? '')
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ name, sub, loc: info[0]?.value ?? '' })

  const openEdit = () => {
    setDraft({ name: profName, sub: profSub, loc: profLoc })
    setEditing(true)
  }
  const save = () => {
    setProfName(draft.name.trim() || profName)
    setProfSub(draft.sub.trim() || profSub)
    setProfLoc(draft.loc.trim() || profLoc)
    setEditing(false)
    showToast(t('Na-update ang profile!', 'Profile updated!'))
  }

  const infoRows = info.map((r, i) => (i === 0 ? { ...r, value: profLoc } : r))

  return (
    <ScreenShell appBar={<AppBar title={title} role={role} helpKey={helpKey} />}>
      <div className="px-4 pb-6 pt-4">
        {/* Header */}
        <div className="overflow-hidden rounded-card border border-border bg-white shadow-card">
          <div className="relative bg-gradient-to-br from-green-dark to-green-deep px-4 pb-8 pt-5 text-white">
            <button
              type="button"
              onClick={openEdit}
              className="tap-target absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-xl glass-green px-3 py-2 text-[13px] font-semibold text-white transition active:scale-95"
            >
              <Pencil className="size-4" strokeWidth={2.4} />
              {t('I-edit', 'Edit')}
            </button>
            <div className="flex items-center gap-3.5">
              <span className="grid size-16 place-items-center rounded-2xl bg-white/15 text-[34px] ring-1 ring-white/25">
                {emoji}
              </span>
              <div className="min-w-0 pr-16">
                <h1 className="font-heading text-[21px] font-extrabold leading-tight">{profName}</h1>
                <p className="text-[14px] text-white/85">{profSub}</p>
                {rating !== undefined && (
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full glass-green px-2 py-0.5 text-[12.5px] font-bold">
                    <Star className="size-[13px] fill-current" strokeWidth={0} /> {rating} {t('rating', 'rating')}
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
            {infoRows.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-3 py-2.5">
                <dt className="text-[13.5px] text-muted">{r.label}</dt>
                <dd className="text-right text-[13.5px] font-semibold text-ink">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Edit Profile (also a clear standalone action) */}
        <button
          type="button"
          onClick={openEdit}
          className="tap-target mt-3 flex w-full items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3.5 text-left text-green-deep shadow-card transition hover:bg-green-tint active:scale-[0.98]"
        >
          <Pencil className="size-5" strokeWidth={2.3} />
          <span className="flex-1 font-heading text-[15px] font-bold">{t('I-edit ang Profile', 'Edit Profile')}</span>
          <ChevronRight className="size-5" strokeWidth={2.4} />
        </button>

        {/* Stats */}
        <div className="mt-5">
          <SectionHeading>{t('Buod', 'Summary')}</SectionHeading>
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
            <span className="flex-1 font-heading text-[15.5px] font-bold">{t('Palitan ang role', 'Switch role')}</span>
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
            <span className="flex-1 font-heading text-[15px] font-bold">{t('Ipakita ulit ang gabay', 'Replay the walkthrough')}</span>
            <ChevronRight className="size-5" strokeWidth={2.4} />
          </button>
        </div>

        <p className="mt-5 text-center text-[12px] text-muted">LokalANI • Walang sayang na ani.</p>
      </div>

      {/* Edit sheet */}
      <BottomSheet
        open={editing}
        onClose={() => setEditing(false)}
        title={t('I-edit ang Profile', 'Edit Profile')}
        footer={
          <button
            type="button"
            onClick={save}
            className="tap-target flex w-full items-center justify-center gap-2 rounded-2xl bg-green px-5 py-3.5 font-heading text-[16px] font-bold text-white shadow-pop transition active:scale-[0.98]"
          >
            <Check className="size-5" strokeWidth={2.5} />
            {t('I-save ang pagbabago', 'Save changes')}
          </button>
        }
      >
        <div className="space-y-3 pb-1">
          <Field label={t('Pangalan', 'Name')} value={draft.name} onChange={(v) => setDraft((d) => ({ ...d, name: v }))} />
          <Field
            label={role === 'driver' ? t('TODA chapter', 'TODA chapter') : t('Negosyo / Puwesto', 'Business / Stall')}
            value={draft.sub}
            onChange={(v) => setDraft((d) => ({ ...d, sub: v }))}
          />
          <Field
            label={info[0]?.label ?? t('Lokasyon', 'Location')}
            value={draft.loc}
            onChange={(v) => setDraft((d) => ({ ...d, loc: v }))}
          />
        </div>
      </BottomSheet>
    </ScreenShell>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-semibold text-muted">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-surface px-3.5 py-3 text-[16px] text-ink outline-none transition focus:border-green focus:bg-white"
      />
    </label>
  )
}
