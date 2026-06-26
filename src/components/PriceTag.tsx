import { peso } from '../lib/format'

interface Props {
  orig: number
  price: number
  per?: string // e.g. "kg"
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { price: 'text-[17px]', orig: 'text-[12px]', per: 'text-[11px]' },
  md: { price: 'text-2xl', orig: 'text-[13px]', per: 'text-[12px]' },
  lg: { price: 'text-[34px]', orig: 'text-base', per: 'text-[13px]' },
}

/** Struck-through original beside the discounted price. */
export default function PriceTag({ orig, price, per, size = 'md' }: Props) {
  const s = sizes[size]
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className={`font-heading font-extrabold leading-none text-green-deep ${s.price}`}>
        {peso(price)}
      </span>
      {per && <span className={`font-medium text-muted ${s.per}`}>/{per}</span>}
      <span className={`text-muted line-through ${s.orig}`}>{peso(orig)}</span>
    </span>
  )
}
