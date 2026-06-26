import { Bike, Clock, Users, Check, Leaf } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import StatusPill, { statusOrder } from '../../components/StatusPill'
import RouteMap from '../../components/RouteMap'
import EmptyState from '../../components/EmptyState'
import SectionHeading from '../../components/SectionHeading'
import { useApp } from '../../lib/AppContext'
import { useT } from '../../lib/i18n'
import { peso } from '../../lib/format'
import type { Order, OrderStatus } from '../../types'

export default function Orders() {
  const { orders } = useApp()
  const t = useT()
  const active = orders.filter((o) => o.status !== 'delivered')
  const past = orders.filter((o) => o.status === 'delivered')

  return (
    <ScreenShell appBar={<AppBar title={t('Orders', 'Orders')} role="buyer" helpKey="buyer-orders" />}>
      <div className="px-4 pb-6 pt-4">
        {active.length === 0 && past.length === 0 ? (
          <EmptyState
            emoji="🧾"
            title={t('Wala ka pang order', 'No orders yet')}
            body={t(
              'Pumili ng surplus sa Palengke at i-reserve — lalabas dito ang tracking ng order mo.',
              'Pick surplus in the marketplace and reserve — your order tracking shows up here.',
            )}
          />
        ) : (
          <>
            {active.length > 0 && (
              <>
                <SectionHeading hint={t('Live na update ng order mo', 'Live updates on your order')}>
                  {t('Kasalukuyang order', 'Current order')}
                </SectionHeading>
                <div className="space-y-4">
                  {active.map((o) => (
                    <ActiveOrder key={o.id} order={o} />
                  ))}
                </div>
              </>
            )}

            {past.length > 0 && (
              <div className="mt-6">
                <SectionHeading>{t('Mga nakaraang order', 'Past orders')}</SectionHeading>
                <div className="space-y-2.5">
                  {past.map((o) => (
                    <div key={o.id} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-3 shadow-card">
                      <span className="grid size-11 place-items-center rounded-xl bg-green-tint text-[22px]">{o.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-heading text-[14.5px] font-bold text-ink">
                          {o.item} • {o.qtyKg}kg
                        </p>
                        <p className="text-[12.5px] text-muted">{placed(o.placedLabel, t)} • {o.vendorName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-heading text-[15px] font-extrabold text-green-deep">{peso(o.total)}</p>
                        <StatusPill status={o.status} animated={false} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </ScreenShell>
  )
}

/** Translate the small set of generated placed-at labels. */
function placed(label: string, t: (f: string, e: string) => string) {
  if (label === 'Ngayon lang') return t('Ngayon lang', 'Just now')
  return label.replace('Kahapon', t('Kahapon', 'Yesterday'))
}

function ActiveOrder({ order }: { order: Order }) {
  const t = useT()
  const currentIdx = statusOrder.indexOf(order.status)
  const trackerLabels: { status: OrderStatus; label: string }[] = [
    { status: 'reserved', label: t('Naka-reserve', 'Reserved') },
    { status: 'picking', label: t('Kinukuha', 'Picking up') },
    { status: 'on_the_way', label: t('Padating', 'On the way') },
    { status: 'delivered', label: t('Dumating', 'Delivered') },
  ]
  return (
    <div className="overflow-hidden rounded-card border border-border bg-white shadow-card">
      {/* Summary */}
      <div className="flex items-center gap-3 p-3.5">
        <span className="grid size-14 place-items-center rounded-2xl bg-green-tint text-[30px]">{order.emoji}</span>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-[16px] font-extrabold text-ink">
            {order.item} • {order.qtyKg}kg
          </p>
          <p className="text-[13px] text-muted">{order.vendorName} • {order.market}</p>
        </div>
        <div className="text-right">
          <p className="font-heading text-[18px] font-extrabold text-green-deep">{peso(order.total)}</p>
          <p className="text-[11.5px] text-muted">{t('kabuuan', 'total')}</p>
        </div>
      </div>

      {/* Status tracker */}
      <div className="px-4 pb-1">
        <div className="mb-2 flex justify-center">
          <StatusPill status={order.status} />
        </div>
        <div className="flex items-start justify-between">
          {trackerLabels.map((step, i) => {
            const done = i <= currentIdx
            const current = i === currentIdx
            return (
              <div key={step.status} className="relative flex flex-1 flex-col items-center">
                {i < trackerLabels.length - 1 && (
                  <span
                    className={`absolute left-1/2 top-3 h-0.5 w-full ${i < currentIdx ? 'bg-green' : 'bg-border'}`}
                  />
                )}
                <span
                  className={`relative z-10 grid size-6 place-items-center rounded-full border-2 ${
                    done ? 'border-green bg-green text-white' : 'border-border bg-white text-transparent'
                  } ${current ? 'anim-pulse-soft ring-4 ring-green/15' : ''}`}
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className={`mt-1.5 text-center text-[11px] leading-tight ${done ? 'font-bold text-green-deep' : 'text-muted'}`}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Batch + driver */}
      <div className="space-y-2.5 p-3.5">
        {order.batched && (
          <div className="flex items-center gap-2.5 rounded-2xl bg-amber-tint px-3 py-2.5">
            <Users className="size-[18px] shrink-0 text-amber-deep" strokeWidth={2.4} />
            <p className="text-[13px] leading-snug text-ink">
              <b>{t('Batch delivery', 'Batch delivery')}</b> — {t('naka-bundle sa', 'bundled with')} {order.batchCount}{' '}
              {t('kalapit na carinderia,', 'nearby eateries,')} {peso(order.deliveryFee)} {t('delivery lang.', 'delivery only.')}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-3">
          <span className="grid size-11 place-items-center rounded-xl bg-green text-white">
            <Bike className="size-6" strokeWidth={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-heading text-[14.5px] font-bold text-ink">{order.driver.name}</p>
            <p className="text-[12.5px] text-muted">Tricycle {order.driver.tricycleNo} • Cubao TODA</p>
          </div>
          {order.status !== 'delivered' && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-green-tint px-2.5 py-1.5 text-[13px] font-bold text-green-deep">
              <Clock className="size-[15px]" strokeWidth={2.5} /> {order.driver.etaMin} min
            </span>
          )}
        </div>

        <RouteMap
          stops={[
            { label: order.vendorName, type: 'pickup' },
            { label: t('Ikaw', 'You'), type: 'drop' },
          ]}
          showRing
        />

        <p className="flex items-center justify-center gap-1.5 pt-1 text-[12.5px] text-muted">
          <Leaf className="size-4 text-green" strokeWidth={2.3} />
          {t('Nakaiwas ng', 'Avoided')} {order.co2Kg.toFixed(1)} kg CO₂ {t('sa order na ito.', 'on this order.')}
        </p>
      </div>
    </div>
  )
}
