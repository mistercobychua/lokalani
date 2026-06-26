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
import { useT } from '../../lib/i18n'

export default function Palengke() {
  const { now, lang } = useApp()
  const t = useT()
  const [cat, setCat] = useState<(typeof categoryLabels)[number]['key']>('lahat')

  const coachSteps: CoachStep[] = [
    {
      title: t('Surplus malapit sa’yo', 'Surplus near you'),
      body: t(
        'Dito mo makikita ang murang sariwa mula sa palengke, sa loob lang ng 2 km. I-scroll pababa para makita lahat.',
        'Here you’ll find cheap, fresh produce from the market — within 2 km. Scroll down to see it all.',
      ),
      where: 'mid',
    },
    {
      title: t('Salain ang hinahanap mo', 'Filter what you need'),
      body: t(
        'Pindutin ang chip — Gulay, Isda, Prutas — para mabilis mahanap ang kailangan mo.',
        'Tap a chip — Veg, Fish, Fruit — to find what you need fast.',
      ),
      where: 'top',
    },
    {
      title: t('Pindutin para mag-reserve', 'Tap to reserve'),
      body: t(
        'Buksan ang card, piliin ang dami, at i-reserve. Ihahatid ito sa’yo ng TODA driver!',
        'Open a card, pick the quantity, and reserve. A TODA driver delivers it to you!',
      ),
      where: 'bottom',
    },
  ]

  const greeting = () => {
    const h = now.getHours()
    if (h < 11) return t('Magandang umaga', 'Good morning')
    if (h < 18) return t('Magandang hapon', 'Good afternoon')
    return t('Magandang gabi', 'Good evening')
  }

  const filtered = useMemo(
    () => (cat === 'lahat' ? listings : listings.filter((l) => l.category === cat)),
    [cat],
  )

  return (
    <ScreenShell appBar={<AppBar title={t('Palengke', 'Marketplace')} role="buyer" helpKey="buyer-palengke" />}>
      {/* Greeting */}
      <div className="bg-green px-4 pb-5 pt-1 text-white">
        <p className="font-heading text-[22px] font-extrabold leading-tight">
          {greeting()}, {buyer.name.split(' ')[0]}! 👋
        </p>
        <p className="mt-1 text-[14px] text-white">
          {t('Narito ang surplus na malapit sa’yo ngayong hapon.', 'Here’s the surplus near you this afternoon.')}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full glass-green px-3 py-1.5 text-[13px] font-semibold">
            <MapPin className="size-4" strokeWidth={2.5} />
            {t('Within 2 km', 'Within 2 km')}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full glass-green px-3 py-1.5 text-[13px] font-semibold">
            <Sparkles className="size-4 text-sage" strokeWidth={2.5} />
            {listings.length} {t('alok ngayon', 'offers now')}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-nav -mt-3 rounded-t-card bg-surface px-4 pb-2 pt-3">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {categoryLabels.map((c) => (
            <Chip
              key={c.key}
              label={lang === 'en' ? c.labelEn : c.label}
              emoji={c.emoji}
              active={cat === c.key}
              onClick={() => setCat(c.key)}
            />
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
            title={t('Wala pang surplus dito', 'No surplus here yet')}
            body={t(
              'Wala pang alok sa kategoryang ito malapit sa’yo — babalik kami pag may bago. Subukan ang ibang chip.',
              'No offers in this category near you — we’ll be back when there’s more. Try another chip.',
            )}
          />
        )}
      </div>

      <Coachmark role="buyer" steps={coachSteps} />
    </ScreenShell>
  )
}
