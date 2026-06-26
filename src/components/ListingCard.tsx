import { Link } from 'react-router-dom'
import { MapPin, ChevronRight } from 'lucide-react'
import type { Listing } from '../types'
import { vendorById } from '../data/personas'
import ProduceGlyph from './ProduceGlyph'
import PriceTag from './PriceTag'
import FreshnessBadge from './FreshnessBadge'
import DiscountCountdown from './DiscountCountdown'

export default function ListingCard({ listing }: { listing: Listing }) {
  const v = vendorById(listing.vendorId)
  return (
    <Link
      to={`/buyer/listing/${listing.id}`}
      className="block rounded-card border border-border bg-white p-3 shadow-card transition active:scale-[0.99]"
    >
      <div className="flex gap-3">
        <ProduceGlyph emoji={listing.emoji} imageId={listing.id} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-[17px] font-extrabold leading-tight text-ink">
              {listing.item}{' '}
              <span className="text-[13px] font-semibold text-muted">{listing.qtyKg}kg</span>
            </h3>
            <span className="shrink-0 rounded-lg bg-danger-tint px-2 py-0.5 text-[12px] font-bold text-danger-deep">
              −{listing.discountPct}%
            </span>
          </div>
          <p className="mt-0.5 truncate text-[13.5px] text-muted">
            {v.name} • {v.market}
          </p>
          <p className="mt-1 flex items-center gap-1 text-[13px] font-medium text-green-deep">
            <MapPin className="size-[14px]" strokeWidth={2.4} />
            {v.distanceKm} km ang layo
          </p>
          <div className="mt-1.5">
            <PriceTag orig={listing.origPrice} price={listing.price} per="kg" size="md" />
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-2.5">
        <FreshnessBadge pct={listing.freshnessPct} freshUntil={listing.freshUntil} />
        <DiscountCountdown listing={listing} />
        <span className="ml-auto flex items-center gap-0.5 text-[13px] font-bold text-green">
          Tingnan <ChevronRight className="size-4" strokeWidth={2.6} />
        </span>
      </div>
    </Link>
  )
}
