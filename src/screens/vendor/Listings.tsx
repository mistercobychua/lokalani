import { MapPin, Eye, Users, Check, CalendarClock, TrendingDown } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import EmptyState from '../../components/EmptyState'
import { useApp } from '../../lib/AppContext'
import { useT } from '../../lib/i18n'
import { peso } from '../../lib/format'
import type { VendorPost } from '../../lib/AppContext'

export default function Listings() {
  const { vendorPosts, markSold, showToast } = useApp()
  const t = useT()

  return (
    <ScreenShell appBar={<AppBar title={t('Mga Listing', 'Listings')} role="vendor" helpKey="vendor-listings" />}>
      <div className="px-4 pb-6 pt-4">
        {vendorPosts.length === 0 ? (
          <EmptyState
            emoji="🏷️"
            title={t('Wala ka pang listing', 'No listings yet')}
            body={t('Pindutin ang “Mag-list ng Surplus” sa Dashboard para magbenta ng surplus mo ngayon.', 'Tap “List Surplus” on the Dashboard to sell your surplus now.')}
          />
        ) : (
          <div className="space-y-3.5">
            {vendorPosts.map((p) => (
              <ListingRow key={p.id} post={p} onSold={() => { markSold(p.id); showToast(t(`Marked nabenta: ${p.item}`, `Marked sold: ${p.item}`)) }} />
            ))}
          </div>
        )}
      </div>
    </ScreenShell>
  )
}

function ListingRow({ post, onSold }: { post: VendorPost; onSold: () => void }) {
  const t = useT()
  const sold = post.status === 'sold'
  return (
    <div className={`overflow-hidden rounded-card border bg-white shadow-card ${sold ? 'border-border opacity-75' : 'border-border'}`}>
      <div className="flex items-center gap-3 p-3.5">
        <span className="grid size-[52px] place-items-center rounded-2xl bg-green-tint text-[28px]">{post.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-heading text-[16px] font-extrabold text-ink">{post.item} • {post.qtyKg}kg</p>
            {post.forward && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-tint px-2 py-0.5 text-[11px] font-bold text-amber-deep">
                <CalendarClock className="size-3" strokeWidth={2.6} /> Forward
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-3 text-[12.5px] font-semibold">
            <span className="inline-flex items-center gap-1 text-muted">
              <Eye className="size-[15px]" strokeWidth={2.3} /> {post.views} {t('views', 'views')}
            </span>
            <span className="inline-flex items-center gap-1 text-green-deep">
              <Users className="size-[15px]" strokeWidth={2.3} /> {post.reservations.length} {t('reserved', 'reserved')}
            </span>
          </div>
        </div>
        {sold && (
          <span className="rounded-lg bg-green-deep px-2.5 py-1 text-[12px] font-bold text-white">{t('Nabenta ✓', 'Sold ✓')}</span>
        )}
      </div>

      {/* Dynamic-discount curve */}
      <div className="mx-3.5 mb-3 rounded-2xl bg-surface p-3">
        <div className="mb-1.5 flex items-center gap-1.5 text-[12px] font-bold text-amber-deep">
          <TrendingDown className="size-[14px]" strokeWidth={2.6} /> {t('Dynamic price curve', 'Dynamic price curve')}
        </div>
        <DiscountCurve now={post.price} close={post.closePrice} orig={post.origPrice} dropTime={post.dropTime} freshUntil={post.freshUntil} />
      </div>

      {/* Reservations */}
      {post.reservations.length > 0 && (
        <div className="border-t border-border px-3.5 py-2.5">
          <p className="mb-1.5 text-[12.5px] font-bold text-green-deep">{t('Mga nag-reserve', 'Who reserved')}</p>
          <ul className="space-y-1.5">
            {post.reservations.map((r, i) => (
              <li key={i} className="flex items-center justify-between text-[13.5px]">
                <span className="flex items-center gap-1.5 text-ink">
                  <span className="grid size-7 place-items-center rounded-lg bg-green-tint text-[14px]">🥘</span>
                  {r.name}
                </span>
                <span className="flex items-center gap-2 text-muted">
                  <span className="font-semibold text-green-deep">{r.qtyKg}kg</span>
                  <span className="inline-flex items-center gap-0.5"><MapPin className="size-[13px]" strokeWidth={2.3} />{r.distanceKm} km</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action */}
      {!sold && (
        <div className="border-t border-border p-3">
          <button
            type="button"
            onClick={onSold}
            className="tap-target flex w-full items-center justify-center gap-2 rounded-2xl bg-green px-4 py-3 font-heading text-[15px] font-bold text-white shadow-card transition active:scale-[0.98]"
          >
            <Check className="size-5" strokeWidth={2.5} /> {t('Mark as Nabenta / Picked Up', 'Mark as Sold / Picked Up')}
          </button>
        </div>
      )}
    </div>
  )
}

function DiscountCurve({ now, close, orig, dropTime, freshUntil }: { now: number; close: number; orig: number; dropTime: string; freshUntil: string }) {
  const t = useT()
  // Map prices to a small sparkline (higher price = higher point).
  const min = close - 4
  const max = orig
  const y = (p: number) => 34 - ((p - min) / (max - min)) * 26
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 120 40" className="h-10 w-[120px] shrink-0" aria-hidden>
        <polyline points={`6,${y(orig)} 60,${y(now)} 114,${y(close)}`} fill="none" stroke="#1e6a41" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy={y(orig)} r="3" fill="#a8d08d" />
        <circle cx="60" cy={y(now)} r="3.5" fill="#1e6a41" />
        <circle cx="114" cy={y(close)} r="3" fill="#d99b45" />
      </svg>
      <div className="grid grid-cols-3 gap-2 text-center text-[11.5px]">
        <Pt label={t('Dating', 'Was')} value={peso(orig)} tone="text-muted" />
        <Pt label={t('Ngayon', 'Now')} value={peso(now)} tone="text-green-deep" />
        <Pt label={dropTime} value={peso(close)} tone="text-amber-deep" />
      </div>
      <span className="sr-only">{t('Bababa ang presyo paglapit ng', 'Price drops closer to')} {freshUntil}</span>
    </div>
  )
}

function Pt({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div>
      <p className={`font-heading text-[13px] font-extrabold ${tone}`}>{value}</p>
      <p className="text-muted">{label}</p>
    </div>
  )
}
