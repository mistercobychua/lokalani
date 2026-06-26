import { ArrowLeft, HelpCircle, ArrowLeftRight, Sprout } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../lib/AppContext'
import type { Role } from '../types'
import { roleMeta } from '../lib/roles'

interface Props {
  title: string
  role: Role
  helpKey: string
  /** Show a back affordance instead of the brand glyph (detail screens). */
  backTo?: string | number
  /** Tab screens show "Palit" (switch role); detail screens hide it (back covers freedom). */
  showSwitch?: boolean
  /** Optional small status line under the title (e.g. "Within 2 km"). */
  subtitle?: string
}

export default function AppBar({ title, role, helpKey, backTo, showSwitch = true, subtitle }: Props) {
  const navigate = useNavigate()
  const { openHelp } = useApp()
  const meta = roleMeta[role]

  return (
    <header className="z-nav shrink-0 bg-green text-white shadow-[0_2px_10px_-6px_rgba(41,68,51,0.6)]">
      <div className="flex items-center gap-2 px-3 py-2.5">
        {backTo !== undefined ? (
          <button
            type="button"
            onClick={() => (typeof backTo === 'number' ? navigate(backTo) : navigate(backTo))}
            className="tap-target flex items-center gap-1 rounded-xl pl-1 pr-2.5 text-white/95 transition-colors hover:bg-white/15 active:scale-95"
          >
            <ArrowLeft className="size-6" strokeWidth={2.4} />
            <span className="text-[13px] font-semibold">Balik</span>
          </button>
        ) : (
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15 text-[#f4d9a8]">
            <Sprout className="size-6" strokeWidth={2.4} />
          </span>
        )}

        <div className="min-w-0 flex-1 px-0.5">
          <h1 className="truncate font-heading text-[19px] font-extrabold leading-tight">{title}</h1>
          <p className="flex items-center gap-1 truncate text-[12.5px] leading-tight text-white">
            <span aria-hidden>{meta.emoji}</span>
            <span className="truncate">{subtitle ?? meta.label}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => openHelp(helpKey)}
          aria-label="Tulong"
          className="tap-target flex flex-col items-center justify-center rounded-xl px-2 text-white transition-colors hover:bg-white/15 active:scale-95"
        >
          <HelpCircle className="size-[22px]" strokeWidth={2.3} />
          <span className="text-[10.5px] font-semibold leading-none mt-0.5">Tulong</span>
        </button>

        {showSwitch && (
          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Palit ng role"
            className="tap-target flex flex-col items-center justify-center rounded-xl px-2 text-white transition-colors hover:bg-white/15 active:scale-95"
          >
            <ArrowLeftRight className="size-[22px]" strokeWidth={2.3} />
            <span className="text-[10.5px] font-semibold leading-none mt-0.5">Palit</span>
          </button>
        )}
      </div>
    </header>
  )
}
