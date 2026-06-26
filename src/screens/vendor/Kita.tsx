import { Recycle, Leaf, Repeat, Wallet, TrendingUp } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import StatCard from '../../components/StatCard'
import SectionHeading from '../../components/SectionHeading'
import { useApp } from '../../lib/AppContext'
import { useT } from '../../lib/i18n'
import { peso } from '../../lib/format'

const week = [
  { d: 'Lun', dEn: 'Mon', v: 720 },
  { d: 'Mar', dEn: 'Tue', v: 940 },
  { d: 'Miy', dEn: 'Wed', v: 610 },
  { d: 'Huw', dEn: 'Thu', v: 1180 },
  { d: 'Biy', dEn: 'Fri', v: 1340 },
  { d: 'Sab', dEn: 'Sat', v: 1620 },
  { d: 'Lin', dEn: 'Sun', v: 880 },
]

export default function Kita() {
  const { lang } = useApp()
  const t = useT()
  const max = Math.max(...week.map((w) => w.v))
  const weekTotal = week.reduce((s, w) => s + w.v, 0)

  return (
    <ScreenShell appBar={<AppBar title={t('Kita', 'Earnings')} role="vendor" helpKey="vendor-kita" />}>
      <div className="px-4 pb-6 pt-4">
        {/* Recover hero */}
        <div className="overflow-hidden rounded-card bg-gradient-to-br from-green-dark to-green-deep p-5 text-white shadow-pop">
          <div className="flex items-center gap-2 text-white/85">
            <Recycle className="size-[18px]" strokeWidth={2.4} />
            <span className="text-[13.5px] font-semibold">{t('Na-recover ngayon', 'Recovered today')}</span>
          </div>
          <p className="mt-1.5 font-heading text-[44px] font-extrabold leading-none">{peso(1180)}</p>
          <p className="mt-2 max-w-[34ch] text-[14px] text-white/85">
            {t('Kita mula sa surplus na sana’y nasayang lang — dagdag-benta bago magsara.', 'Income from surplus that would’ve gone to waste — extra sales before closing.')}
          </p>
        </div>

        {/* Impact */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatCard label={t('Basura naiwasan', 'Waste avoided')} value="28 kg" sub={t('ngayong linggo', 'this week')} icon={Recycle} tone="green" />
          <StatCard label={t('CO₂ naiwasan', 'CO₂ avoided')} value="9.4 kg" sub={t('bawas-sayang', 'less waste')} icon={Leaf} tone="green" />
          <StatCard label={t('Repeat buyers', 'Repeat buyers')} value="7" sub={t('suking carinderia', 'regular eateries')} icon={Repeat} tone="amber" />
          <StatCard label={t('Avg. basket', 'Avg. basket')} value={peso(150)} sub={t('kada order', 'per order')} icon={TrendingUp} tone="plain" />
        </div>

        {/* Weekly */}
        <div className="mt-6">
          <SectionHeading hint={`${t('Kabuuan', 'Total')}: ${peso(weekTotal)} ${t('ngayong linggo', 'this week')}`}>
            {t('Benta ngayong linggo', 'Sales this week')}
          </SectionHeading>
          <div className="rounded-card border border-border bg-white p-4 shadow-card">
            <div className="flex h-32 items-end justify-between gap-2">
              {week.map((w) => (
                <div key={w.d} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-lg bg-green transition-all"
                      style={{ height: `${(w.v / max) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-muted">{lang === 'en' ? w.dEn : w.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payout */}
        <div className="mt-6">
          <SectionHeading>{t('Payout summary', 'Payout summary')}</SectionHeading>
          <div className="divide-y divide-border rounded-card border border-border bg-white px-4 shadow-card">
            <PayRow icon={Wallet} label={t('Benta ngayong araw', 'Sales today')} value={peso(3240)} />
            <PayRow label={t('Transaction fee (5%)', 'Transaction fee (5%)')} value={`− ${peso(162)}`} muted />
            <PayRow label={t('Net payout ngayon', 'Net payout today')} value={peso(3078)} strong />
          </div>
          <p className="mt-2 px-1 text-[12.5px] text-muted">
            {t('Direktang papasok sa account mo. Walang hidden charges.', 'Goes straight to your account. No hidden charges.')}
          </p>
        </div>
      </div>
    </ScreenShell>
  )
}

function PayRow({
  icon: Icon,
  label,
  value,
  muted,
  strong,
}: {
  icon?: typeof Wallet
  label: string
  value: string
  muted?: boolean
  strong?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="flex items-center gap-2 text-[14px] text-muted">
        {Icon && <Icon className="size-[18px] text-green" strokeWidth={2.3} />}
        {label}
      </span>
      <span
        className={`font-semibold ${strong ? 'font-heading text-[17px] font-extrabold text-green-deep' : muted ? 'text-muted' : 'text-ink'}`}
      >
        {value}
      </span>
    </div>
  )
}
