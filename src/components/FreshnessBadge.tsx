import { freshness } from '../lib/freshness'
import { useT } from '../lib/i18n'

interface Props {
  pct: number
  freshUntil: string
  /** Show the AI freshness % meter alongside the label. */
  showMeter?: boolean
}

/** Colour + plain-language freshness label (AI shelf-life predictor). */
export default function FreshnessBadge({ pct, freshUntil, showMeter = false }: Props) {
  const f = freshness(pct, freshUntil)
  const t = useT()
  const label =
    f.level === 'fresh'
      ? t(`Sariwa hanggang ${freshUntil}`, `Fresh until ${freshUntil}`)
      : f.level === 'aging'
        ? t(`Bagsak-presyo na — hanggang ${freshUntil}`, `Price dropping — until ${freshUntil}`)
        : t(`Huling tawag — bilhin bago ${freshUntil}`, `Last call — buy before ${freshUntil}`)

  return (
    <div className="flex flex-col gap-1.5">
      <span
        className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-semibold ${f.tint} ${f.text}`}
      >
        <span className={`size-2 rounded-full ${f.dot}`} />
        {label}
      </span>
      {showMeter && (
        <div className="flex items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
            <div className={`h-full rounded-full ${f.dot}`} style={{ width: `${pct}%` }} />
          </div>
          <span className={`text-[12px] font-bold tabular-nums ${f.text}`}>
            {pct}% {t('sariwa', 'fresh')}
          </span>
        </div>
      )}
    </div>
  )
}
