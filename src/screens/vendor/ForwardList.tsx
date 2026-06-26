import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarClock, Eye } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import StickyBar from '../../components/StickyBar'
import PrimaryButton from '../../components/PrimaryButton'
import QtyStepper from '../../components/QtyStepper'
import { useApp } from '../../lib/AppContext'
import { vendor } from '../../data/personas'
import { peso } from '../../lib/format'

const ITEMS = [
  { emoji: '🍆', item: 'Talong', orig: 50 },
  { emoji: '🍅', item: 'Kamatis', orig: 45 },
  { emoji: '🥬', item: 'Repolyo', orig: 40 },
  { emoji: '🥔', item: 'Kamote', orig: 50 },
]
const TIMES = ['4:00 PM', '5:00 PM', '5:30 PM']

export default function ForwardList() {
  const navigate = useNavigate()
  const { addVendorPost, showToast } = useApp()
  const [itemIdx, setItemIdx] = useState(0)
  const [qty, setQty] = useState(8)
  const [timeIdx, setTimeIdx] = useState(1)
  const [discount, setDiscount] = useState(25)

  const sel = ITEMS[itemIdx]
  const price = Math.round(sel.orig * (1 - discount / 100))

  const schedule = () => {
    addVendorPost({
      emoji: sel.emoji,
      item: sel.item,
      qtyKg: qty,
      origPrice: sel.orig,
      price,
      closePrice: Math.max(1, Math.round(price * 0.9)),
      freshUntil: TIMES[timeIdx],
      dropTime: TIMES[timeIdx],
      forward: true,
    })
    showToast(`Na-schedule! ${qty}kg ${sel.item} para sa ${TIMES[timeIdx]}.`)
    navigate('/vendor/listings')
  }

  return (
    <ScreenShell
      appBar={<AppBar title="Forward-List" role="vendor" helpKey="vendor-forward" backTo="/vendor" showSwitch={false} />}
      sticky={
        <StickyBar>
          <PrimaryButton label="I-schedule" sub={`${qty}kg ${sel.item} • ${TIMES[timeIdx]}`} icon={CalendarClock} onClick={schedule} />
        </StickyBar>
      }
    >
      <div className="px-4 pb-6 pt-4">
        <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-green-tint px-3.5 py-3">
          <CalendarClock className="size-5 shrink-0 text-green" strokeWidth={2.3} />
          <p className="text-[13.5px] leading-snug text-green-deep">
            I-iskedyul ang surplus na <b>darating mamaya</b> — may reserba na agad ang mga suki bago pa maani.
          </p>
        </div>

        {/* Item */}
        <Label>Anong produkto?</Label>
        <div className="mb-4 grid grid-cols-4 gap-2">
          {ITEMS.map((it, i) => (
            <button
              key={it.item}
              type="button"
              onClick={() => setItemIdx(i)}
              className={`flex flex-col items-center gap-1 rounded-2xl border px-1 py-2.5 transition active:scale-95 ${
                itemIdx === i ? 'border-green bg-green-tint' : 'border-border bg-white'
              }`}
            >
              <span className="text-[26px]">{it.emoji}</span>
              <span className={`text-[12px] font-semibold ${itemIdx === i ? 'text-green-deep' : 'text-muted'}`}>{it.item}</span>
            </button>
          ))}
        </div>

        {/* Qty */}
        <Label>Tantyang dami</Label>
        <div className="mb-4">
          <QtyStepper value={qty} min={1} max={30} onChange={setQty} />
        </div>

        {/* Time */}
        <Label>Kailan available?</Label>
        <div className="mb-4 flex flex-wrap gap-2">
          {TIMES.map((t, i) => (
            <button
              key={t}
              type="button"
              onClick={() => setTimeIdx(i)}
              className={`rounded-full border px-4 py-2.5 text-[14px] font-semibold transition active:scale-95 ${
                timeIdx === i ? 'border-green bg-green text-white' : 'border-border bg-white text-ink hover:bg-green-tint'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Discount */}
        <Label>Diskwento</Label>
        <div className="mb-5 rounded-card border border-border bg-white p-4 shadow-card">
          <input
            type="range"
            min={10}
            max={40}
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-full accent-[#1e6a41]"
            aria-label="Antas ng diskwento"
          />
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-muted">{discount}% off</span>
            <span className="font-heading text-[15px] font-bold">
              <span className="text-muted line-through">{peso(sel.orig)}</span>{' '}
              <span className="text-green-deep">{peso(price)}</span>/kg
            </span>
          </div>
        </div>

        {/* Buyer-side preview */}
        <Label>Ganito makikita ng mga suki</Label>
        <div className="rounded-card border border-dashed border-green/40 bg-white p-3.5 shadow-card">
          <div className="mb-2 flex items-center gap-1.5 text-[11.5px] font-bold text-amber-deep">
            <Eye className="size-[14px]" strokeWidth={2.5} /> PREVIEW • Buyer app
          </div>
          <div className="flex gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-amber-tint text-[26px]">{sel.emoji}</span>
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-tint px-2 py-0.5 text-[11px] font-bold text-amber-deep">
                <CalendarClock className="size-3" strokeWidth={2.6} /> Naka-iskedyul • {TIMES[timeIdx]}
              </span>
              <p className="mt-1 font-heading text-[15px] font-extrabold text-ink">
                Forward-listed: {qty}kg {sel.item}
              </p>
              <p className="text-[13px] text-muted">
                {discount}% off, {peso(price)}/kg — {vendor.stall}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 font-heading text-[14px] font-extrabold text-green-deep">{children}</p>
}
