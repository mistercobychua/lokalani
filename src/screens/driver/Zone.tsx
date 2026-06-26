import { MapPin, Users, BadgeCheck, Shuffle } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import SectionHeading from '../../components/SectionHeading'
import RouteMap from '../../components/RouteMap'
import { driver } from '../../data/personas'

export default function Zone() {
  return (
    <ScreenShell appBar={<AppBar title="Zone" role="driver" helpKey="driver-zone" />}>
      <div className="px-4 pb-6 pt-4">
        {/* Chapter */}
        <div className="flex items-center gap-3 rounded-card border border-border bg-white p-3.5 shadow-card">
          <span className="grid size-12 place-items-center rounded-2xl bg-green-tint text-[26px]">🛺</span>
          <div className="flex-1">
            <p className="font-heading text-[16px] font-extrabold text-ink">{driver.chapter}</p>
            <p className="text-[13px] text-muted">Tricycle {driver.tricycleNo}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-green-tint px-2.5 py-1 text-[12px] font-bold text-green-deep">
            <BadgeCheck className="size-[15px]" strokeWidth={2.5} /> Verified
          </span>
        </div>

        {/* Authorized zone */}
        <div className="mt-5">
          <SectionHeading hint="Dito ka lang tatanggap ng deliveries (route-compliant)">Authorized service zone</SectionHeading>
          <div className="rounded-card border border-border bg-white p-4 shadow-card">
            <div className="flex flex-wrap gap-2">
              {driver.zone.map((z) => (
                <span key={z} className="inline-flex items-center gap-1.5 rounded-full bg-green px-3 py-2 text-[13.5px] font-bold text-white">
                  <MapPin className="size-[15px]" strokeWidth={2.4} /> {z}
                </span>
              ))}
            </div>
            <div className="mt-3">
              <RouteMap
                stops={[
                  { label: 'Nepa Q-Mart', type: 'pickup' },
                  { label: 'Brgy. Socorro', type: 'drop' },
                  { label: 'Project 4', type: 'drop' },
                ]}
                showRing
              />
            </div>
          </div>
        </div>

        {/* Capacity cap */}
        <div className="mt-5">
          <SectionHeading hint="Patas na hatian ng trabaho kada window">Capacity status</SectionHeading>
          <div className="rounded-card border border-amber/40 bg-amber-tint p-4">
            <div className="flex items-center gap-2 text-amber-deep">
              <Users className="size-[18px]" strokeWidth={2.4} />
              <span className="text-[13px] font-bold uppercase tracking-wide">Active drivers ngayong window</span>
            </div>
            <p className="mt-2 font-heading text-[18px] font-extrabold text-ink">
              Ika-<span className="text-green-deep">1</span> ka sa <span className="text-green-deep">5</span> driver
            </p>
            <div className="mt-2 flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={`h-2.5 flex-1 rounded-full ${i === 0 ? 'bg-green' : 'bg-white/70'}`} />
              ))}
            </div>
            <p className="mt-2 text-[13px] leading-snug text-ink">
              May cap na 5 driver kada zone bawat window para sapat ang kita ng bawat isa.
            </p>
          </div>
        </div>

        {/* Relay note */}
        <div className="mt-5 flex items-start gap-3 rounded-card border border-border bg-white p-3.5 shadow-card">
          <Shuffle className="mt-0.5 size-5 shrink-0 text-green" strokeWidth={2.4} />
          <div>
            <p className="font-heading text-[14px] font-extrabold text-green-deep">Hub-and-spoke relay</p>
            <p className="mt-0.5 text-[13.5px] leading-snug text-ink">
              Para sa cross-barangay: i-drop sa <b>Project 4 Basketball Court — Barangay Border Drop-point</b>.
            </p>
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}
