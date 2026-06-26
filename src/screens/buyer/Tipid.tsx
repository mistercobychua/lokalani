import { PiggyBank, Leaf, BadgeCheck, TrendingDown, ShoppingBasket, Sparkles } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import StatCard from '../../components/StatCard'
import SectionHeading from '../../components/SectionHeading'
import { useApp } from '../../lib/AppContext'
import { peso } from '../../lib/format'

export default function Tipid() {
  const { orders, showToast } = useApp()
  // Savings to date this month (seed baseline + live order savings).
  const baseTipid = 2480
  const co2Total = orders.reduce((s, o) => s + o.co2Kg, 0) + 14.2

  return (
    <ScreenShell appBar={<AppBar title="Tipid" role="buyer" helpKey="buyer-tipid" />}>
      <div className="px-4 pb-6 pt-4">
        {/* Hero */}
        <div className="overflow-hidden rounded-card bg-gradient-to-br from-green-dark to-green-deep p-5 text-white shadow-pop">
          <div className="flex items-center gap-2 text-white/85">
            <PiggyBank className="size-[18px]" strokeWidth={2.4} />
            <span className="text-[13.5px] font-semibold">Tipid ngayong buwan</span>
          </div>
          <p className="mt-1.5 font-heading text-[44px] font-extrabold leading-none">{peso(baseTipid)}</p>
          <p className="mt-2 max-w-[32ch] text-[14px] text-white/85">
            20–40% na tipid sa mga sangkap — mas abot-kaya ang pagkain, mas kumikita ka.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-semibold">
            <TrendingDown className="size-4 text-[#f4d9a8]" strokeWidth={2.5} />
            ~32% mas mura kaysa regular na presyo
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatCard label="Orders ngayong buwan" value="18" sub="kasama ang batch" icon={ShoppingBasket} tone="green" />
          <StatCard label="CO₂ naiwasan" value={`${co2Total.toFixed(0)} kg`} sub="bawas-sayang" icon={Leaf} tone="green" />
        </div>

        {/* Eco-Badge */}
        <div className="mt-6">
          <SectionHeading hint="Patunay na bawas-sayang ang negosyo mo">Eco-Badge</SectionHeading>
          <div className="overflow-hidden rounded-card border border-green/30 bg-white shadow-card">
            <div className="flex items-center gap-3 bg-green-tint p-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-green text-white shadow-card">
                <BadgeCheck className="size-8" strokeWidth={2.2} />
              </span>
              <div>
                <p className="font-heading text-[17px] font-extrabold text-green-deep">Bawas-Sayang Certified</p>
                <p className="text-[13px] text-muted">{co2Total.toFixed(0)} kg CO₂ ang naiwasan mo</p>
              </div>
            </div>
            <div className="p-4">
              <p className="flex items-start gap-2 text-[14px] leading-snug text-ink">
                <Sparkles className="mt-0.5 size-[18px] shrink-0 text-amber-deep" strokeWidth={2.3} />
                Ipakita sa mga customer mo na bawas-sayang ka — magtiwala sila sa luto mo.
              </p>
              <button
                type="button"
                onClick={() => showToast('Eco-Badge activated! ₱99/buwan')}
                className="tap-target mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-green px-5 py-3.5 font-heading text-[15.5px] font-bold text-white shadow-pop transition active:scale-[0.98]"
              >
                <BadgeCheck className="size-5" strokeWidth={2.4} />
                I-display sa carinderia — ₱99/buwan
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}
