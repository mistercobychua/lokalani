import { useApp } from '../lib/AppContext'
import type { Lang } from '../types'

interface Props {
  /** 'onGreen' for green backgrounds (white text), 'light' for surfaces. */
  tone?: 'onGreen' | 'light'
  className?: string
}

const options: { id: Lang; label: string }[] = [
  { id: 'fil', label: 'FIL' },
  { id: 'en', label: 'ENG' },
]

/** Segmented Filipino / English switch. */
export default function LanguageToggle({ tone = 'light', className = '' }: Props) {
  const { lang, setLang } = useApp()
  const track = tone === 'onGreen' ? 'glass-green' : 'bg-surface border border-border'
  return (
    <div
      role="group"
      aria-label="Wika / Language"
      className={`inline-flex items-center gap-0.5 rounded-full p-0.5 ${track} ${className}`}
    >
      {options.map((o) => {
        const active = lang === o.id
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => setLang(o.id)}
            aria-pressed={active}
            className={`min-h-9 rounded-full px-3 text-[12.5px] font-bold transition-colors ${
              active
                ? 'bg-white text-green-deep shadow-card'
                : tone === 'onGreen'
                  ? 'text-white/85'
                  : 'text-muted'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
