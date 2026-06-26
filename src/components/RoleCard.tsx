import { ChevronRight } from 'lucide-react'
import type { RoleMeta } from '../lib/roles'
import { useApp } from '../lib/AppContext'

export default function RoleCard({ meta, onClick }: { meta: RoleMeta; onClick: () => void }) {
  const Icon = meta.icon
  const { lang } = useApp()
  const who = lang === 'en' ? meta.whoEn : meta.who
  const benefit = lang === 'en' ? meta.benefitEn : meta.benefit
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3.5 rounded-card border border-border bg-white p-3.5 text-left shadow-card transition active:scale-[0.98]"
    >
      <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-green-tint text-green-deep">
        <Icon className="size-7" strokeWidth={2.2} />
        <span className="absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-xl bg-white text-[16px] shadow-card">
          {meta.emoji}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-heading text-[18px] font-extrabold leading-tight text-green-deep">
          {who}
        </span>
        <span className="mt-0.5 block text-[14px] leading-snug text-muted">{benefit}</span>
      </span>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-green text-white transition group-active:translate-x-0.5">
        <ChevronRight className="size-5" strokeWidth={2.6} />
      </span>
    </button>
  )
}
