import { useMemo, useState } from 'react'
import { MapPin, Sparkles } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import Chip from '../../components/Chip'
import ListingCard from '../../components/ListingCard'
import EmptyState from '../../components/EmptyState'
import Coachmark, { type CoachStep } from '../../components/Coachmark'
import { listings, categoryLabels } from '../../data/listings'
import { buyer } from '../../data/personas'
import { useApp } from '../../lib/AppContext'

const coachSteps: CoachStep[] = [
  {
    title: 'Surplus malapit sa’yo',
    body: 'Dito mo makikita ang murang sariwa mula sa palengke, sa loob lang ng 2 km. I-scroll pababa para makita lahat.',
    where: 'mid',
  },
  {
    title: 'Salain ang hinahanap mo',
    body: 'Pindutin ang chip — Gulay, Isda, Prutas — para mabilis mahanap ang kailangan mo.',
    where: 'top',
  },
  {
    title: 'Pindutin para mag-reserve',
    body: 'Buksan ang card, piliin ang dami, at i-reserve. Ihahatid ito sa’yo ng TODA driver!',
    where: 'bottom',
  },
]

function greeting(h: number) {
  if (h < 11) return 'Magandang umaga'
  if (h < 18) return 'Magandang hapon'
  return 'Magandang gabi'
}

export default function Palengke() {
  const { now } = useApp()
  const [cat, setCat] = useState<(typeof categoryLabels)[number]['key']>('lahat')

  const filtered = useMemo(
    () => (cat === 'lahat' ? listings : listings.filter((l) => l.category === cat)),
    [cat],
  )

  return (
    <ScreenShell appBar={<AppBar title="Palengke" role="buyer" helpKey="buyer-palengke" />}>
      {/* Greeting */}
      <div className="bg-green px-4 pb-5 pt-1 text-white">
        <p className="font-heading text-[22px] font-extrabold leading-tight">
          {greeting(now.getHours())}, {buyer.name.split(' ')[0]}! 👋
        </p>
        <p className="mt-1 text-[14px] text-white">Narito ang surplus na malapit sa’yo ngayong hapon.</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full glass-green px-3 py-1.5 text-[13px] font-semibold">
            <MapPin className="size-4" strokeWidth={2.5} />
            Within 2 km
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full glass-green px-3 py-1.5 text-[13px] font-semibold">
            <Sparkles className="size-4 text-[#f4d9a8]" strokeWidth={2.5} />
            {listings.length} alok ngayon
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-nav -mt-3 rounded-t-card bg-surface px-4 pb-2 pt-3">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {categoryLabels.map((c) => (
            <Chip key={c.key} label={c.label} emoji={c.emoji} active={cat === c.key} onClick={() => setCat(c.key)} />
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="px-4 pb-6">
        {filtered.length ? (
          <div className="stagger space-y-3">
            {filtered.map((l, i) => (
              <div key={l.id} style={{ '--i': i } as React.CSSProperties}>
                <ListingCard listing={l} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            emoji="🧺"
            title="Wala pang surplus dito"
            body="Wala pang alok sa kategoryang ito malapit sa’yo — babalik kami pag may bago. Subukan ang ibang chip."
          />
        )}
      </div>

      <Coachmark role="buyer" steps={coachSteps} />
    </ScreenShell>
  )
}
