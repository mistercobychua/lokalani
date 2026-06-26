import { useNavigate } from 'react-router-dom'
import { MapPin, CalendarClock, TrendingDown, ChevronRight, Check, Bell } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import { useApp } from '../../lib/AppContext'
import { listingById } from '../../data/listings'

interface Alert {
  id: string
  kind: 'proximity' | 'forward' | 'lastcall'
  emoji: string
  title: string
  body: string
  ago: string
  listingId: string
  action: 'view' | 'reserve'
  reserveQty?: number
  reserveNote?: string
}

const alerts: Alert[] = [
  {
    id: 'a1',
    kind: 'proximity',
    emoji: '🍅',
    title: 'Bagong surplus malapit',
    body: '5kg kamatis, 30% off — Aling Nena’s Gulay, 0.4 km lang.',
    ago: '2 min ang nakaraan',
    listingId: 'kamatis',
    action: 'view',
  },
  {
    id: 'a2',
    kind: 'lastcall',
    emoji: '🐟',
    title: 'Huling tawag — bilisan!',
    body: '4kg galunggong, bababa pa ang presyo. Sariwa hanggang 5:30 PM.',
    ago: '5 min ang nakaraan',
    listingId: 'galunggong',
    action: 'view',
  },
  {
    id: 'a3',
    kind: 'forward',
    emoji: '🍆',
    title: 'Forward-listed para mamaya',
    body: 'Mang Tony forward-listed 10kg talong para sa 5:30 PM, 24% off. I-reserve na para sigurado.',
    ago: '12 min ang nakaraan',
    listingId: 'talong',
    action: 'reserve',
    reserveQty: 5,
    reserveNote: 'Naka-reserve! Ihahatid bandang 5:30 PM.',
  },
  {
    id: 'a4',
    kind: 'forward',
    emoji: '🥔',
    title: 'Forward-listed para mamaya',
    body: 'Lola Fe forward-listed 7kg kamote para sa 5:20 PM, 20% off, 1.8 km.',
    ago: '20 min ang nakaraan',
    listingId: 'kamote',
    action: 'view',
  },
]

const kindStyle = {
  proximity: { tint: 'bg-green-tint', text: 'text-green-deep', icon: MapPin, label: 'Malapit • 2 km' },
  lastcall: { tint: 'bg-danger-tint', text: 'text-danger-deep', icon: TrendingDown, label: 'Huling tawag' },
  forward: { tint: 'bg-amber-tint', text: 'text-amber-deep', icon: CalendarClock, label: 'Naka-iskedyul' },
}

export default function Abiso() {
  const navigate = useNavigate()
  const { reserve, showToast } = useApp()

  const quickReserve = (a: Alert) => {
    const l = listingById(a.listingId)
    if (l) {
      reserve(l, a.reserveQty ?? 3, [])
      showToast(a.reserveNote ?? 'Naka-reserve!')
    }
  }

  return (
    <ScreenShell appBar={<AppBar title="Mga Abiso" role="buyer" helpKey="buyer-abiso" />}>
      <div className="px-4 pb-6 pt-4">
        <div className="mb-4 flex items-center gap-2 rounded-2xl bg-green-tint px-3.5 py-2.5">
          <Bell className="size-[18px] text-green" strokeWidth={2.4} />
          <p className="text-[13.5px] font-medium text-green-deep">
            Mga paalala sa loob ng <b>2 km</b> — bago at naka-iskedyul na surplus.
          </p>
        </div>

        <div className="stagger space-y-3">
          {alerts.map((a, i) => {
            const ks = kindStyle[a.kind]
            const KIcon = ks.icon
            return (
              <div
                key={a.id}
                style={{ '--i': i } as React.CSSProperties}
                className="rounded-card border border-border bg-white p-3.5 shadow-card"
              >
                <div className="flex gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-green-tint text-[26px]">
                    {a.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-bold ${ks.tint} ${ks.text}`}>
                        <KIcon className="size-[13px]" strokeWidth={2.6} /> {ks.label}
                      </span>
                      <span className="shrink-0 text-[11.5px] text-muted">{a.ago}</span>
                    </div>
                    <h3 className="mt-1.5 font-heading text-[15.5px] font-extrabold leading-tight text-ink">{a.title}</h3>
                    <p className="mt-0.5 text-[13.5px] leading-snug text-muted">{a.body}</p>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  {a.action === 'reserve' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => quickReserve(a)}
                        className="tap-target flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-green px-3 py-2.5 text-[14px] font-bold text-white shadow-card transition active:scale-[0.98]"
                      >
                        <Check className="size-[18px]" strokeWidth={2.6} /> I-reserve na
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/buyer/listing/${a.listingId}`)}
                        className="tap-target rounded-xl border border-border bg-white px-3.5 py-2.5 text-[14px] font-semibold text-green-deep transition hover:bg-green-tint active:scale-95"
                      >
                        Tingnan
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate(`/buyer/listing/${a.listingId}`)}
                      className="tap-target flex flex-1 items-center justify-center gap-1 rounded-xl border border-green/40 bg-green-tint px-3 py-2.5 text-[14px] font-bold text-green-deep transition active:scale-[0.98]"
                    >
                      Tingnan & i-reserve <ChevronRight className="size-[18px]" strokeWidth={2.6} />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ScreenShell>
  )
}
