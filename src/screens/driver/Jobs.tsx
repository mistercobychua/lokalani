import { Power, Clock, BadgeCheck, MapPin } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import DriverJobCard from '../../components/DriverJobCard'
import EmptyState from '../../components/EmptyState'
import Coachmark, { type CoachStep } from '../../components/Coachmark'
import { useApp } from '../../lib/AppContext'
import { jobs } from '../../data/jobs'
import { driver } from '../../data/personas'

const coachSteps: CoachStep[] = [
  { title: 'Buksan ang Online', body: 'I-on ang switch para makakita ng deliveries sa zone mo ngayong surplus window (3–6 PM).', where: 'top' },
  { title: 'Mga deliver malapit sa’yo', body: 'Bawat card: pickup, drops, bayad (₱25/stop), at distansya. Lahat ay route-compliant sa zone mo.', where: 'mid' },
  { title: 'Pindutin para tanggapin', body: 'Buksan ang job para sa ruta at i-accept. May sunod-sunod na hakbang para walang mahuhulaan.', where: 'bottom' },
]

export default function Jobs() {
  const { driverOnline, toggleOnline } = useApp()

  return (
    <ScreenShell appBar={<AppBar title="Mga Deliver" role="driver" helpKey="driver-jobs" />}>
      {/* Greeting + online toggle */}
      <div className="bg-green px-4 pb-5 pt-1 text-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-heading text-[22px] font-extrabold leading-tight">Kumusta, {driver.name.split(' ')[0]}! 🛺</p>
            <p className="mt-0.5 text-[13.5px] text-white">{driver.chapter} • {driver.tricycleNo}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleOnline}
          aria-pressed={driverOnline}
          className="mt-3 flex w-full items-center gap-3 rounded-2xl glass-green p-2.5 text-left transition active:scale-[0.99]"
        >
          <span className={`grid size-11 place-items-center rounded-xl ${driverOnline ? 'bg-white text-green' : 'bg-white/20 text-white'}`}>
            <Power className="size-6" strokeWidth={2.4} />
          </span>
          <span className="flex-1">
            <span className="block font-heading text-[16px] font-extrabold">
              {driverOnline ? 'Online ka ngayon' : 'Offline ka'}
            </span>
            <span className="block text-[12.5px] text-white/90">
              {driverOnline ? 'Tumatanggap ng deliveries' : 'Buksan para makakita ng trabaho'}
            </span>
          </span>
          <span className={`relative h-7 w-12 rounded-full transition-colors ${driverOnline ? 'bg-leaf' : 'bg-white/25'}`}>
            <span className={`absolute top-1 size-5 rounded-full bg-white shadow transition-all ${driverOnline ? 'left-6' : 'left-1'}`} />
          </span>
        </button>
      </div>

      <div className="px-4 pb-6 pt-4">
        {/* Surplus window banner */}
        <div className="mb-3 flex items-center gap-2.5 rounded-2xl border border-amber/40 bg-amber-tint px-3.5 py-2.5">
          <Clock className="size-5 shrink-0 text-amber-deep" strokeWidth={2.4} />
          <p className="text-[13.5px] leading-snug text-ink">
            <b>Surplus window: 3:00–6:00 PM</b> • Eligible ka ngayon.
          </p>
        </div>

        {/* Zone badges */}
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-green-tint px-2.5 py-1 text-[12px] font-bold text-green-deep">
            <BadgeCheck className="size-[15px]" strokeWidth={2.5} /> Route-compliant driver
          </span>
          {driver.zone.map((z) => (
            <span key={z} className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[12px] font-semibold text-muted ring-1 ring-border">
              <MapPin className="size-[13px]" strokeWidth={2.4} /> {z}
            </span>
          ))}
        </div>

        {/* Jobs */}
        {driverOnline ? (
          <div className="stagger space-y-3">
            {jobs.map((j, i) => (
              <div key={j.id} style={{ '--i': i } as React.CSSProperties}>
                <DriverJobCard job={j} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            emoji="😴"
            title="Naka-offline ka"
            body="Buksan ang Online sa itaas para makita ang mga deliver malapit sa zone mo ngayong surplus window."
          />
        )}
      </div>

      <Coachmark role="driver" steps={coachSteps} />
    </ScreenShell>
  )
}
