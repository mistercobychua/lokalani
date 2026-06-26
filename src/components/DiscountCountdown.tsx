import { Timer, TrendingDown } from 'lucide-react'
import { useApp } from '../lib/AppContext'
import { useT } from '../lib/i18n'
import { peso, formatClock, formatCountdown } from '../lib/format'
import type { Listing } from '../types'

interface Props {
  listing: Pick<Listing, 'price' | 'nextPrice' | 'dropOffsetSec'>
  variant?: 'pill' | 'block'
}

/**
 * Dynamic discount engine, live-ticking. Counts down to the next scheduled
 * price drop; flips to a "dropped" state when it fires.
 */
export default function DiscountCountdown({ listing, variant = 'pill' }: Props) {
  const { demoMs, demoBaseMs } = useApp()
  const t = useT()
  const targetMs = demoBaseMs + listing.dropOffsetSec * 1000
  const remainingSec = (targetMs - demoMs) / 1000
  const dropped = remainingSec <= 0
  const dropClock = formatClock(new Date(targetMs))

  if (variant === 'block') {
    return (
      <div className="rounded-2xl border border-amber/40 bg-amber-tint p-3.5">
        <div className="flex items-center gap-2 text-amber-deep">
          <TrendingDown className="size-[18px]" strokeWidth={2.5} />
          <span className="text-[13px] font-bold uppercase tracking-wide">{t('Dynamic na diskwento', 'Dynamic discount')}</span>
        </div>
        {dropped ? (
          <p className="mt-1.5 text-[15px] font-semibold text-ink">
            {t('Bumaba na! Ngayon', 'Dropped! Now')}{' '}
            <span className="font-extrabold text-green-deep">{peso(listing.nextPrice)}/kg</span>
          </p>
        ) : (
          <>
            <p className="mt-1.5 text-[15px] font-semibold text-ink">
              {peso(listing.price)} <span className="text-muted">→</span>{' '}
              <span className="font-extrabold text-green-deep">{peso(listing.nextPrice)}</span>/kg{' '}
              <span className="text-muted">{t('nang', 'at')} {dropClock}</span>
            </p>
            <div className="mt-2 flex items-center gap-2 text-amber-deep">
              <Timer className="size-4" strokeWidth={2.5} />
              <span className="text-[14px] font-bold tabular-nums">{t('Bababa in', 'Drops in')} {formatCountdown(remainingSec)}</span>
            </div>
          </>
        )}
      </div>
    )
  }

  // pill
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-semibold ${
        dropped ? 'bg-green-tint text-green-deep' : 'bg-amber-tint text-amber-deep'
      }`}
    >
      {dropped ? (
        <>
          <TrendingDown className="size-[14px]" strokeWidth={2.6} />
          {peso(listing.nextPrice)} — {t('bumaba na!', 'dropped!')}
        </>
      ) : (
        <>
          <Timer className="size-[14px]" strokeWidth={2.6} />
          <span className="tabular-nums">{formatCountdown(remainingSec)}</span> → {peso(listing.nextPrice)}
        </>
      )}
    </span>
  )
}
