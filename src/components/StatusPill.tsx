import type { OrderStatus } from '../types'

const map: Record<OrderStatus, { label: string; tint: string; text: string; dot: string }> = {
  reserved: { label: 'Naka-reserve', tint: 'bg-green-tint', text: 'text-green-deep', dot: 'bg-sage' },
  picking: { label: 'Kinukuha ni driver', tint: 'bg-amber-tint', text: 'text-amber-deep', dot: 'bg-amber' },
  on_the_way: { label: 'Padating na', tint: 'bg-green-tint', text: 'text-green-deep', dot: 'bg-green' },
  delivered: { label: 'Dumating na', tint: 'bg-green-deep', text: 'text-white', dot: 'bg-[#a7d3b4]' },
}

export const statusOrder: OrderStatus[] = ['reserved', 'picking', 'on_the_way', 'delivered']
export const statusLabel = (s: OrderStatus) => map[s].label

export default function StatusPill({ status, animated = true }: { status: OrderStatus; animated?: boolean }) {
  const s = map[status]
  const live = animated && status !== 'delivered'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-bold ${s.tint} ${s.text}`}>
      <span className={`size-2 rounded-full ${s.dot} ${live ? 'anim-pulse-soft' : ''}`} />
      {s.label}
    </span>
  )
}
