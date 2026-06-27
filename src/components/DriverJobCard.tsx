import { Link } from 'react-router-dom'
import { MapPin, Package, Route, BadgeCheck, ChevronRight } from 'lucide-react'
import type { Job } from '../types'
import { peso } from '../lib/format'
import { useT } from '../lib/i18n'
import { produceImageId } from '../data/listings'
import ProduceGlyph from './ProduceGlyph'

export default function DriverJobCard({ job }: { job: Job }) {
  const t = useT()
  return (
    <Link
      to={`/driver/job/${job.id}`}
      className="block rounded-card border border-border bg-white p-3.5 shadow-card transition active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <ProduceGlyph emoji={job.emoji} imageId={produceImageId(job.emoji)} size="sm" boxClass="size-11 rounded-2xl" />
          <div>
            <h3 className="font-heading text-[16px] font-extrabold leading-tight text-ink">
              {job.pickupVendor}
            </h3>
            <p className="text-[13px] text-muted">{job.pickupMarket}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-heading text-[22px] font-extrabold leading-none text-green-deep">
            {peso(job.fee)}
          </div>
          <div className="text-[11.5px] font-medium text-muted">{t('kita', 'earn')}</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <Stat icon={Package} label={`${job.dropCount} drop${job.dropCount > 1 ? 's' : ''}`} />
        <Stat icon={MapPin} label={`${job.distanceKm} km`} />
        <Stat icon={Route} label={`~${job.etaMin} min`} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-2.5">
        {job.routeCompliant && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-tint px-2.5 py-1 text-[12px] font-bold text-green-deep">
            <BadgeCheck className="size-[15px]" strokeWidth={2.5} />
            Route-compliant
          </span>
        )}
        <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-[12px] font-semibold text-muted">
          <MapPin className="size-[14px]" strokeWidth={2.4} />
          {job.zone}
        </span>
        <span className="ml-auto flex items-center gap-0.5 text-[13px] font-bold text-green">
          {t('Tingnan', 'View')} <ChevronRight className="size-4" strokeWidth={2.6} />
        </span>
      </div>
    </Link>
  )
}

function Stat({
  icon: Icon,
  label,
}: {
  icon: typeof MapPin
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-surface py-2">
      <Icon className="size-[18px] text-green" strokeWidth={2.3} />
      <span className="text-[12.5px] font-semibold text-ink">{label}</span>
    </div>
  )
}
