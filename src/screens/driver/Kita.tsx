import { Wallet, Route, Clock, ShieldCheck } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import StatCard from '../../components/StatCard'
import SectionHeading from '../../components/SectionHeading'
import { peso } from '../../lib/format'

const week = [
  { d: 'Lun', v: 250 },
  { d: 'Mar', v: 375 },
  { d: 'Miy', v: 300 },
  { d: 'Huw', v: 425 },
  { d: 'Biy', v: 500 },
  { d: 'Sab', v: 575 },
  { d: 'Lin', v: 400 },
]

export default function Kita() {
  const max = Math.max(...week.map((w) => w.v))
  const weekTotal = week.reduce((s, w) => s + w.v, 0)

  return (
    <ScreenShell appBar={<AppBar title="Kita" role="driver" helpKey="driver-kita" />}>
      <div className="px-4 pb-6 pt-4">
        {/* Today hero */}
        <div className="overflow-hidden rounded-card bg-gradient-to-br from-green-dark to-green-deep p-5 text-white shadow-pop">
          <div className="flex items-center gap-2 text-white/85">
            <Wallet className="size-[18px]" strokeWidth={2.4} />
            <span className="text-[13.5px] font-semibold">Kita ngayong araw</span>
          </div>
          <p className="mt-1.5 font-heading text-[44px] font-extrabold leading-none">{peso(400)}</p>
          <p className="mt-2 text-[14px] text-white/85">4 trips ngayong surplus window — ₱100 kada batch route.</p>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatCard label="Trips ngayon" value="4" sub="batch routes" icon={Route} tone="green" />
          <StatCard label="Oras sa window" value="3–6 PM" sub="surplus hours" icon={Clock} tone="amber" />
        </div>

        {/* Weekly */}
        <div className="mt-6">
          <SectionHeading hint={`Kabuuan: ${peso(weekTotal)} ngayong linggo`}>Kita ngayong linggo</SectionHeading>
          <div className="rounded-card border border-border bg-white p-4 shadow-card">
            <div className="flex h-32 items-end justify-between gap-2">
              {week.map((w) => (
                <div key={w.d} className="flex flex-1 flex-col items-center gap-1.5">
                  <span className="text-[10.5px] font-semibold text-muted">{peso(w.v)}</span>
                  <div className="flex w-full flex-1 items-end">
                    <div className="w-full rounded-t-lg bg-green" style={{ height: `${(w.v / max) * 100}%` }} />
                  </div>
                  <span className="text-[11px] font-medium text-muted">{w.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reassurance */}
        <div className="mt-5 flex items-start gap-3 rounded-card border border-green/30 bg-green-tint p-4">
          <ShieldCheck className="mt-0.5 size-6 shrink-0 text-green" strokeWidth={2.3} />
          <div>
            <p className="font-heading text-[14.5px] font-extrabold text-green-deep">Walang kailangang upgrade</p>
            <p className="mt-0.5 text-[13.5px] leading-snug text-ink">
              Hindi mo kailangang baguhin ang tricycle mo. Ang dating biyahe, dagdag-kita na.
            </p>
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}
