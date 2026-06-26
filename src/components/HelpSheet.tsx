import { Info, ListChecks, ArrowLeftRight, RotateCcw, Languages } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../lib/AppContext'
import { useT } from '../lib/i18n'
import { helpContent } from '../data/help'
import type { Role } from '../types'
import BottomSheet from './BottomSheet'
import LanguageToggle from './LanguageToggle'

/** Persistent "?" help — "Ano ito? / Paano gamitin?" per screen, FIL or EN. */
export default function HelpSheet({ role }: { role: Role }) {
  const { helpKey, closeHelp, replayCoach, lang } = useApp()
  const navigate = useNavigate()
  const t = useT()
  const content = helpKey ? helpContent[helpKey] : undefined

  const title = content ? (lang === 'en' ? content.titleEn : content.title) : ''
  const what = content ? (lang === 'en' ? content.whatEn : content.what) : ''
  const how = content ? (lang === 'en' ? content.howEn : content.how) : []

  return (
    <BottomSheet open={!!content} onClose={closeHelp} title={content ? `${t('Tulong', 'Help')}: ${title}` : undefined}>
      {content && (
        <div className="pb-2">
          <section className="rounded-2xl bg-green-tint p-3.5">
            <div className="flex items-center gap-2 text-green-deep">
              <Info className="size-[18px]" strokeWidth={2.5} />
              <h3 className="font-heading text-[15px] font-extrabold">{t('Ano ito?', 'What is this?')}</h3>
            </div>
            <p className="mt-1.5 text-[16px] leading-snug text-ink">{what}</p>
          </section>

          <section className="mt-3">
            <div className="mb-2 flex items-center gap-2 text-green-deep">
              <ListChecks className="size-[18px]" strokeWidth={2.5} />
              <h3 className="font-heading text-[15px] font-extrabold">{t('Paano gamitin?', 'How to use it?')}</h3>
            </div>
            <ol className="space-y-2">
              {how.map((step, i) => (
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
                navigate(`/${role}`)
              }}
              className="tap-target flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5 text-[14px] font-semibold text-green-deep transition hover:bg-green-tint active:scale-95"
            >
              <RotateCcw className="size-[18px]" strokeWidth={2.3} />
              {t('Ipakita ulit ang gabay', 'Replay the guide')}
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
              {t('Palit ng role', 'Switch role')}
            </button>
          </div>
        </div>
      )}
    </BottomSheet>
  )
}
