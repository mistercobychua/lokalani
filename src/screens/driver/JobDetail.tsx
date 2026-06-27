import { useNavigate, useParams } from 'react-router-dom'
import { MapPin, Package, Route, Coins, Check, Shuffle, BadgeCheck } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import StickyBar from '../../components/StickyBar'
import PrimaryButton from '../../components/PrimaryButton'
import RouteMap from '../../components/RouteMap'
import ProduceGlyph from '../../components/ProduceGlyph'
import { jobById } from '../../data/jobs'
import { useApp } from '../../lib/AppContext'
import { useT } from '../../lib/i18n'
import { produceImageId } from '../../data/listings'
import { peso } from '../../lib/format'

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { acceptJob, showToast } = useApp()
  const t = useT()
  const job = id ? jobById(id) : undefined

  if (!job) {
    return (
      <ScreenShell appBar={<AppBar title={t('Hindi nahanap', 'Not found')} role="driver" helpKey="driver-detail" backTo="/driver" showSwitch={false} />}>
        <div className="p-6 text-center text-muted">{t('Wala ang job na ito.', 'This job isn’t available.')}</div>
      </ScreenShell>
    )
  }

  const accept = () => {
    acceptJob(job.id)
    showToast(t(`Tinanggap! ${peso(job.fee)} kita.`, `Accepted! Earn ${peso(job.fee)}.`))
    navigate('/driver/active')
  }

  return (
    <ScreenShell
      appBar={<AppBar title={t('Detalye ng Job', 'Job details')} role="driver" helpKey="driver-detail" backTo="/driver" showSwitch={false} subtitle={job.zone} />}
      sticky={
        <StickyBar>
          <PrimaryButton label={`Accept Job — ${peso(job.fee)} ${t('kita', 'earn')}`} sub={`${job.dropCount} drops • ${job.distanceKm} km`} icon={Check} onClick={accept} />
        </StickyBar>
      }
    >
      <div className="px-4 pb-6 pt-4">
        {/* Summary */}
        <div className="flex items-center gap-3 rounded-card border border-border bg-white p-3.5 shadow-card">
          <ProduceGlyph emoji={job.emoji} imageId={produceImageId(job.emoji)} size="md" boxClass="size-14 rounded-2xl" />
          <div className="flex-1">
            <p className="font-heading text-[16px] font-extrabold text-ink">{job.pickupVendor}</p>
            <p className="text-[13px] text-muted">{job.cargo}</p>
          </div>
          {job.routeCompliant && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-tint px-2.5 py-1 text-[12px] font-bold text-green-deep">
              <BadgeCheck className="size-[15px]" strokeWidth={2.5} /> ✓ Zone
            </span>
          )}
        </div>

        {/* Quick stats */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <MiniStat icon={Package} label={`${job.dropCount} drops`} />
          <MiniStat icon={MapPin} label={`${job.distanceKm} km`} />
          <MiniStat icon={Route} label={`~${job.etaMin} min`} />
        </div>

        {/* Route map */}
        <div className="mt-4">
          <RouteMap stops={job.stops.map((s) => ({ label: s.title, type: s.type }))} showRing />
        </div>

        {/* Stops */}
        <h2 className="mb-2 mt-5 font-heading text-[15px] font-extrabold text-green-deep">{t('Mga hihintuan', 'Stops')}</h2>
        <ol className="overflow-hidden rounded-card border border-border bg-white shadow-card">
          {job.stops.map((s, i) => (
            <li key={s.id} className="flex items-center gap-3 border-b border-border px-3.5 py-3 last:border-0">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full text-[13px] font-bold ${
                  s.type === 'pickup' ? 'bg-green text-white' : 'bg-green-tint text-green-deep'
                }`}
              >
                {s.type === 'pickup' ? '↑' : i}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-[14.5px] font-bold text-ink">{s.title}</p>
                <p className="text-[12.5px] text-muted">{s.sub}</p>
              </div>
              <span className="text-[20px]">{s.emoji}</span>
            </li>
          ))}
        </ol>

        {/* Fee breakdown */}
        <h2 className="mb-2 mt-5 font-heading text-[15px] font-extrabold text-green-deep">{t('Breakdown ng bayad', 'Fee breakdown')}</h2>
        <div className="rounded-card border border-border bg-white p-4 shadow-card">
          <div className="flex items-center justify-between text-[14px]">
            <span className="flex items-center gap-2 text-muted">
              <Coins className="size-[18px] text-amber-deep" strokeWidth={2.3} />
              {peso(job.feePerStop)} × {job.dropCount} stops (batch)
            </span>
            <span className="font-heading text-[20px] font-extrabold text-green-deep">{peso(job.fee)}</span>
          </div>
          <p className="mt-2 text-[12.5px] text-muted">
            {t('Pooled / batch route — mas marami ang stops, mas malaki ang kita kada biyahe.', 'Pooled / batch route — more stops, more earnings per trip.')}
          </p>
        </div>

        {/* Hub-and-spoke relay */}
        {job.relay && (
          <div className="mt-4 flex items-start gap-3 rounded-card border border-amber/40 bg-amber-tint p-3.5">
            <Shuffle className="mt-0.5 size-5 shrink-0 text-amber-deep" strokeWidth={2.4} />
            <div>
              <p className="font-heading text-[14px] font-extrabold text-amber-deep">Hub-and-spoke relay</p>
              <p className="mt-0.5 text-[13.5px] leading-snug text-ink">
                {t('Cross-barangay ang ruta — i-drop sa', 'Cross-barangay route — drop at')} <b>{job.relay}</b>. {t('Doon ipi-pickup ng kasamang driver.', 'A partner driver picks it up there.')}
              </p>
            </div>
          </div>
        )}
      </div>
    </ScreenShell>
  )
}

function MiniStat({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-white py-2.5 shadow-card">
      <Icon className="size-[18px] text-green" strokeWidth={2.3} />
      <span className="text-[12.5px] font-semibold text-ink">{label}</span>
    </div>
  )
}
