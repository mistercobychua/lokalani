import { useNavigate } from 'react-router-dom'
import { Mic, CalendarClock, Eye, Users, TrendingUp, Clock, ChevronRight, Sun } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import SectionHeading from '../../components/SectionHeading'
import Coachmark, { type CoachStep } from '../../components/Coachmark'
import { useApp } from '../../lib/AppContext'
import { vendor } from '../../data/personas'
import { peso } from '../../lib/format'

const coachSteps: CoachStep[] = [
  { title: 'Ito ang dashboard mo', body: 'Buod ng benta mo ngayon at ng surplus na pwede mo pang ibenta bago magsara ang palengke.', where: 'top' },
  { title: 'Mag-list gamit ang boses', body: 'Pindutin ang “Mag-list ng Surplus” at magsalita lang — walang kailangang i-type.', where: 'mid' },
  { title: 'Tingnan ang reservations', body: 'Sa “Listings” makikita mo kung sino ang nag-reserve. I-mark kapag nabenta na.', where: 'bottom' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { vendorPosts } = useApp()
  const active = vendorPosts.filter((p) => p.status === 'active')
  const reservedTotal = active.reduce((s, p) => s + p.reservations.length, 0)

  return (
    <ScreenShell appBar={<AppBar title="Dashboard" role="vendor" helpKey="vendor-dashboard" subtitle={vendor.stall} />}>
      {/* Greeting + sales */}
      <div className="bg-green px-4 pb-5 pt-1 text-white">
        <p className="font-heading text-[22px] font-extrabold leading-tight">Magandang hapon, {vendor.name}! 🌤️</p>
        <p className="mt-1 text-[14px] text-white">Heto ang takbo ng benta mo ngayong araw.</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <HeroStat label="Benta ngayon" value={peso(3240)} />
          <HeroStat label="Nabenta" value="11 item" />
          <HeroStat label="Reserved" value={`${reservedTotal} bago`} />
        </div>
      </div>

      <div className="px-4 pb-6 pt-4">
        {/* Surplus-to-clear prompt */}
        <div className="rounded-card border border-amber/40 bg-amber-tint p-4">
          <div className="flex items-center gap-2 text-amber-deep">
            <Sun className="size-[18px]" strokeWidth={2.5} />
            <span className="text-[13px] font-bold uppercase tracking-wide">Surplus to clear</span>
          </div>
          <p className="mt-1.5 text-[15px] font-semibold leading-snug text-ink">
            May <b>3 oras</b> pa bago magsara. I-list ang surplus mo para hindi masayang.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => navigate('/vendor/maglist')}
              className="tap-target flex flex-col items-center justify-center gap-1 rounded-2xl bg-green px-3 py-3 text-white shadow-pop transition active:scale-[0.97]"
            >
              <Mic className="size-6" strokeWidth={2.3} />
              <span className="font-heading text-[14px] font-bold">Mag-list ng Surplus</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/vendor/forward')}
              className="tap-target flex flex-col items-center justify-center gap-1 rounded-2xl border border-green/40 bg-white px-3 py-3 text-green-deep transition hover:bg-green-tint active:scale-[0.97]"
            >
              <CalendarClock className="size-6" strokeWidth={2.3} />
              <span className="font-heading text-[14px] font-bold">Forward-List</span>
            </button>
          </div>
        </div>

        {/* Active listings */}
        <div className="mt-6">
          <SectionHeading
            hint="Live na views at reservations"
            action={
              <button
                type="button"
                onClick={() => navigate('/vendor/listings')}
                className="flex items-center gap-0.5 text-[13px] font-bold text-green"
              >
                Lahat <ChevronRight className="size-4" strokeWidth={2.6} />
              </button>
            }
          >
            Active na listing
          </SectionHeading>

          <div className="space-y-3">
            {active.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => navigate('/vendor/listings')}
                className="flex w-full items-center gap-3 rounded-card border border-border bg-white p-3 text-left shadow-card transition active:scale-[0.99]"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-green-tint text-[26px]">{p.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-[15.5px] font-bold text-ink">
                    {p.item} • {p.qtyKg}kg
                  </p>
                  <p className="text-[13px] text-muted">
                    {peso(p.price)}/kg • sariwa hanggang {p.freshUntil}
                  </p>
                  <div className="mt-1.5 flex items-center gap-3 text-[12.5px] font-semibold">
                    <span className="inline-flex items-center gap-1 text-muted">
                      <Eye className="size-[15px]" strokeWidth={2.3} /> {p.views}
                    </span>
                    <span className="inline-flex items-center gap-1 text-green-deep">
                      <Users className="size-[15px]" strokeWidth={2.3} /> {p.reservations.length} reserved
                    </span>
                  </div>
                </div>
                <ChevronRight className="size-5 shrink-0 text-muted" strokeWidth={2.4} />
              </button>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div className="mt-5 flex items-center gap-2.5 rounded-2xl bg-green-tint px-3.5 py-3">
          <TrendingUp className="size-5 shrink-0 text-green" strokeWidth={2.4} />
          <p className="text-[13.5px] leading-snug text-green-deep">
            <b>Tip:</b> mas mabilis maubos ang naka-discount na surplus. <Clock className="inline size-[14px]" strokeWidth={2.4} /> Bababa ang presyo paglapit ng 6 PM.
          </p>
        </div>
      </div>

      <Coachmark role="vendor" steps={coachSteps} />
    </ScreenShell>
  )
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl glass-green px-2.5 py-2 text-center">
      <p className="font-heading text-[16px] font-extrabold leading-tight">{value}</p>
      <p className="text-[11px] text-white/90">{label}</p>
    </div>
  )
}
