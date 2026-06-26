import { Info, ListChecks, ArrowLeftRight, RotateCcw, Languages } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../lib/AppContext'
import { helpContent } from '../data/help'
import type { Role } from '../types'
import BottomSheet from './BottomSheet'
import LanguageToggle from './LanguageToggle'

/** Persistent "?" help — plain-Taglish "Ano ito?" + "Paano gamitin?" per screen. */
export default function HelpSheet({ role }: { role: Role }) {
  const { helpKey, closeHelp, replayCoach } = useApp()
  const navigate = useNavigate()
  const content = helpKey ? helpContent[helpKey] : undefined

  return (
    <BottomSheet open={!!content} onClose={closeHelp} title={content ? `Tulong: ${content.title}` : undefined}>
      {content && (
        <div className="pb-2">
          <section className="rounded-2xl bg-green-tint p-3.5">
            <div className="flex items-center gap-2 text-green-deep">
              <Info className="size-[18px]" strokeWidth={2.5} />
              <h3 className="font-heading text-[15px] font-extrabold">Ano ito?</h3>
            </div>
            <p className="mt-1.5 text-[16px] leading-snug text-ink">{content.what}</p>
          </section>

          <section className="mt-3">
            <div className="mb-2 flex items-center gap-2 text-green-deep">
              <ListChecks className="size-[18px]" strokeWidth={2.5} />
              <h3 className="font-heading text-[15px] font-extrabold">Paano gamitin?</h3>
            </div>
            <ol className="space-y-2">
              {content.how.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-green text-[13px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[16px] leading-snug text-ink">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-surface px-3.5 py-3">
            <span className="flex items-center gap-2 text-[14.5px] font-semibold text-green-deep">
              <Languages className="size-[18px]" strokeWidth={2.3} />
              Wika / Language
            </span>
            <LanguageToggle tone="light" />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                replayCoach(role)
                closeHelp()
                navigate(`/${role === 'buyer' ? 'buyer' : role}`)
              }}
              className="tap-target flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5 text-[14px] font-semibold text-green-deep transition hover:bg-green-tint active:scale-95"
            >
              <RotateCcw className="size-[18px]" strokeWidth={2.3} />
              Ipakita ulit ang gabay
            </button>
            <button
              type="button"
              onClick={() => {
                closeHelp()
                navigate('/')
              }}
              className="tap-target flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5 text-[14px] font-semibold text-green-deep transition hover:bg-green-tint active:scale-95"
            >
              <ArrowLeftRight className="size-[18px]" strokeWidth={2.3} />
              Palit ng role
            </button>
          </div>
        </div>
      )}
    </BottomSheet>
  )
}
