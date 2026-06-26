import { useT } from '../lib/i18n'
import type { OrderStatus } from '../types'

const style: Record<OrderStatus, { tint: string; text: string; dot: string }> = {
  reserved: { tint: 'bg-green-tint', text: 'text-green-deep', dot: 'bg-sage' },
  picking: { tint: 'bg-amber-tint', text: 'text-amber-deep', dot: 'bg-amber' },
  on_the_way: { tint: 'bg-green-tint', text: 'text-green-deep', dot: 'bg-green' },
  delivered: { tint: 'bg-green-deep', text: 'text-white', dot: 'bg-sage' },
}

export const statusOrder: OrderStatus[] = ['reserved', 'picking', 'on_the_way', 'delivered']

export default function StatusPill({ status, animated = true }: { status: OrderStatus; animated?: boolean }) {
  const t = useT()
  const labels: Record<OrderStatus, string> = {
    reserved: t('Naka-reserve', 'Reserved'),
    picking: t('Kinukuha ni driver', 'Driver picking up'),
    on_the_way: t('Padating na', 'On the way'),
    delivered: t('Dumating na', 'Delivered'),
  }
  const s = style[status]
  const live = animated && status !== 'delivered'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-bold ${s.tint} ${s.text}`}>
      <span className={`size-2 rounded-full ${s.dot} ${live ? 'anim-pulse-soft' : ''}`} />
      {labels[status]}
    </span>
  )
}
