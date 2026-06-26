import { PiggyBank, Leaf, BadgeCheck, TrendingDown, ShoppingBasket, Sparkles } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import StatCard from '../../components/StatCard'
import SectionHeading from '../../components/SectionHeading'
import { useApp } from '../../lib/AppContext'
import { useT } from '../../lib/i18n'
import { peso } from '../../lib/format'

export default function Tipid() {
  const { orders, showToast } = useApp()
  const t = useT()
  // Savings to date this month (seed baseline + live order savings).
  const baseTipid = 2480
  const co2Total = orders.reduce((s, o) => s + o.co2Kg, 0) + 14.2

  return (
    <ScreenShell appBar={<AppBar title={t('Tipid', 'Savings')} role="buyer" helpKey="buyer-tipid" />}>
      <div className="px-4 pb-6 pt-4">
        {/* Hero */}
        <div className="overflow-hidden rounded-card bg-gradient-to-br from-green-dark to-green-deep p-5 text-white shadow-pop">
          <div className="flex items-center gap-2 text-white/85">
            <PiggyBank className="size-[18px]" strokeWidth={2.4} />
            <span className="text-[13.5px] font-semibold">{t('Tipid ngayong buwan', 'Savings this month')}</span>
          </div>
          <p className="mt-1.5 font-heading text-[44px] font-extrabold leading-none">{peso(baseTipid)}</p>
          <p className="mt-2 max-w-[32ch] text-[14px] text-white/85">
            {t(
              '20–40% na tipid sa mga sangkap — mas abot-kaya ang pagkain, mas kumikita ka.',
              '20–40% saved on ingredients — more affordable food, more profit for you.',
            )}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-semibold">
            <TrendingDown className="size-4 text-sage" strokeWidth={2.5} />
            {t('~32% mas mura kaysa regular na presyo', '~32% cheaper than regular price')}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatCard label={t('Orders ngayong buwan', 'Orders this month')} value="18" sub={t('kasama ang batch', 'incl. batch')} icon={ShoppingBasket} tone="green" />
          <StatCard label={t('CO₂ naiwasan', 'CO₂ avoided')} value={`${co2Total.toFixed(0)} kg`} sub={t('bawas-sayang', 'less waste')} icon={Leaf} tone="green" />
        </div>

        {/* Eco-Badge */}
        <div className="mt-6">
          <SectionHeading hint={t('Patunay na bawas-sayang ang negosyo mo', 'Proof your business cuts waste')}>Eco-Badge</SectionHeading>
          <div className="overflow-hidden rounded-card border border-green/30 bg-white shadow-card">
            <div className="flex items-center gap-3 bg-green-tint p-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-green text-white shadow-card">
                <BadgeCheck className="size-8" strokeWidth={2.2} />
              </span>
              <div>
                <p className="font-heading text-[17px] font-extrabold text-green-deep">{t('Bawas-Sayang Certified', 'Less-Waste Certified')}</p>
                <p className="text-[13px] text-muted">{co2Total.toFixed(0)} kg CO₂ {t('ang naiwasan mo', 'avoided')}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="flex items-start gap-2 text-[14px] leading-snug text-ink">
                <Sparkles className="mt-0.5 size-[18px] shrink-0 text-amber-deep" strokeWidth={2.3} />
                {t(
                  'Ipakita sa mga customer mo na bawas-sayang ka — magtiwala sila sa luto mo.',
                  'Show your customers you cut waste — they’ll trust your cooking more.',
                )}
              </p>
              <button
                type="button"
                onClick={() => showToast(t('Eco-Badge activated! ₱99/buwan', 'Eco-Badge activated! ₱99/mo'))}
                className="tap-target mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-green px-5 py-3.5 font-heading text-[15.5px] font-bold text-white shadow-pop transition active:scale-[0.98]"
              >
                <BadgeCheck className="size-5" strokeWidth={2.4} />
                {t('I-display sa carinderia — ₱99/buwan', 'Display at your eatery — ₱99/mo')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}
