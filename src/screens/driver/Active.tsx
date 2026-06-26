import { useNavigate } from 'react-router-dom'
import { Check, MapPin, BadgeCheck, PartyPopper, Navigation } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import StickyBar from '../../components/StickyBar'
import PrimaryButton from '../../components/PrimaryButton'
import RouteMap from '../../components/RouteMap'
import EmptyState from '../../components/EmptyState'
import { useApp } from '../../lib/AppContext'
import { useT } from '../../lib/i18n'
import { jobById } from '../../data/jobs'
import { peso } from '../../lib/format'

export default function Active() {
  const navigate = useNavigate()
  const { acceptedJobId, activeStep, advanceStep, resetJob } = useApp()
  const t = useT()
  const job = acceptedJobId ? jobById(acceptedJobId) : undefined

  if (!job) {
    return (
      <ScreenShell appBar={<AppBar title={t('Aktibong Deliver', 'Active Delivery')} role="driver" helpKey="driver-active" />}>
        <div className="px-4 pt-6">
          <EmptyState
            emoji="🛺"
            title={t('Wala kang aktibong deliver', 'No active delivery')}
            body={t('Tumanggap ng job sa “Mga Deliver” para magsimula. Lalabas dito ang sunod-sunod na hakbang.', 'Accept a job in “Deliveries” to start. The step-by-step guide shows up here.')}
            action={
              <button
                type="button"
                onClick={() => navigate('/driver')}
                className="tap-target rounded-2xl bg-green px-5 py-3 font-heading text-[15px] font-bold text-white shadow-pop transition active:scale-95"
              >
                {t('Tingnan ang mga deliver', 'See deliveries')}
              </button>
            }
          />
        </div>
      </ScreenShell>
    )
  }

  const total = job.stops.length
  const allDone = activeStep >= total
  const current = job.stops[activeStep]

  const confirmLabel = current
    ? current.type === 'pickup'
      ? t('Kumpirma: Nakuha na', 'Confirm: Picked up')
      : `${t('Kumpirma: Na-deliver kay', 'Confirm: Delivered to')} ${current.title.split(' ')[0]}`
    : ''

  return (
    <ScreenShell
      appBar={<AppBar title={t('Aktibong Deliver', 'Active Delivery')} role="driver" helpKey="driver-active" subtitle={`${job.pickupVendor}`} />}
      sticky={
        <StickyBar>
          {allDone ? (
            <PrimaryButton
              label={`${t('Tapusin', 'Finish')} — ${peso(job.fee)} ${t('kita', 'earn')}`}
              sub={t('Magaling! Tapos na lahat ng hatid', 'Great! All deliveries done')}
              icon={Check}
              onClick={() => {
                resetJob()
                navigate('/driver/kita')
              }}
            />
          ) : (
            <PrimaryButton label={confirmLabel} sub={`${t('Hakbang', 'Step')} ${activeStep + 1} ${t('sa', 'of')} ${total}`} icon={Check} onClick={() => advanceStep(total)} />
          )}
        </StickyBar>
      }
    >
      <div className="px-4 pb-6 pt-4">
        {/* In-zone + progress */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-tint px-3 py-1.5 text-[13px] font-bold text-green-deep">
            <BadgeCheck className="size-[16px]" strokeWidth={2.5} /> {t('Nasa loob ka ng zone', 'You’re inside the zone')}
          </span>
          <span className="text-[13px] font-bold text-muted tabular-nums">
            {Math.min(activeStep, total)}/{total} {t('tapos', 'done')}
          </span>
        </div>

        {/* Map */}
        <RouteMap stops={job.stops.map((s) => ({ label: s.title, type: s.type }))} showRing activeIndex={allDone ? undefined : activeStep} />

        {allDone && (
          <div className="mt-4 flex items-center gap-3 rounded-card border border-green/30 bg-green-tint p-4">
            <PartyPopper className="size-7 shrink-0 text-green" strokeWidth={2.2} />
            <div>
              <p className="font-heading text-[16px] font-extrabold text-green-deep">{t('Tapos na lahat ng hatid! 🎉', 'All deliveries done! 🎉')}</p>
              <p className="text-[13.5px] text-ink">{t('Kita mo sa biyaheng ito:', 'Your earnings for this trip:')} <b>{peso(job.fee)}</b>.</p>
            </div>
          </div>
        )}

        {/* Numbered steps */}
        <h2 className="mb-2 mt-5 font-heading text-[15px] font-extrabold text-green-deep">{t('Mga hakbang', 'Steps')}</h2>
        <ol className="space-y-2.5">
          {job.stops.map((s, i) => {
            const done = i < activeStep
            const isCurrent = i === activeStep && !allDone
            return (
              <li
                key={s.id}
                className={`flex items-center gap-3 rounded-card border p-3.5 transition ${
                  isCurrent
                    ? 'border-green bg-white shadow-pop ring-2 ring-green/15'
                    : done
                      ? 'border-border bg-green-tint/50'
                      : 'border-border bg-white opacity-70'
                }`}
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full text-[14px] font-bold ${
                    done ? 'bg-green text-white' : isCurrent ? 'bg-green text-white anim-pulse-soft' : 'bg-border text-muted'
                  }`}
                >
                  {done ? <Check className="size-5" strokeWidth={3} /> : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-[14.5px] font-bold text-ink">{s.title}</p>
                  <p className="flex items-center gap-1 text-[12.5px] text-muted">
                    <MapPin className="size-[13px]" strokeWidth={2.3} /> {s.sub}
                  </p>
                </div>
                {isCurrent && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-green px-2 py-1 text-[11.5px] font-bold text-white">
                    <Navigation className="size-[13px]" strokeWidth={2.5} /> {t('Ngayon', 'Now')}
                  </span>
                )}
                <span className="text-[20px]">{s.emoji}</span>
              </li>
            )
          })}
        </ol>
      </div>
    </ScreenShell>
  )
}
