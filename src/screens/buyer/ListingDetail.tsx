import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MapPin, Star, Leaf, Plus, Check, ShieldCheck, Truck } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import StickyBar from '../../components/StickyBar'
import ProduceGlyph from '../../components/ProduceGlyph'
import FreshnessBadge from '../../components/FreshnessBadge'
import DiscountCountdown from '../../components/DiscountCountdown'
import PrimaryButton from '../../components/PrimaryButton'
import BottomSheet from '../../components/BottomSheet'
import SuccessSheet from '../../components/SuccessSheet'
import { listingById } from '../../data/listings'
import { vendorById, wholesaler } from '../../data/personas'
import { useApp } from '../../lib/AppContext'
import { peso } from '../../lib/format'
import type { OrderAddon } from '../../types'

const ADDON: OrderAddon = { label: '10kg bigas — Aling Nena Wholesale', price: 520 }

export default function ListingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { reserve } = useApp()
  const listing = id ? listingById(id) : undefined

  const [qty, setQty] = useState(3)
  const [addon, setAddon] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [done, setDone] = useState(false)

  if (!listing) {
    return (
      <ScreenShell appBar={<AppBar title="Hindi nahanap" role="buyer" helpKey="buyer-detail" backTo="/buyer" showSwitch={false} />}>
        <div className="p-6 text-center text-muted">Wala ang alok na ito. Bumalik sa Palengke.</div>
      </ScreenShell>
    )
  }

  const v = vendorById(listing.vendorId)
  const addons = addon ? [ADDON] : []
  const subtotal = listing.price * qty + addons.reduce((s, a) => s + a.price, 0)
  const saved = (listing.origPrice - listing.price) * qty

  const placeReserve = () => {
    reserve(listing, qty, addons)
    setConfirm(false)
    setDone(true)
  }

  return (
    <ScreenShell
      appBar={<AppBar title={listing.item} role="buyer" helpKey="buyer-detail" backTo="/buyer" showSwitch={false} subtitle={`${listing.itemEn} • ${listing.qtyKg}kg available`} />}
      sticky={
        <StickyBar>
          <div className="mb-2.5 flex items-end justify-between">
            <div>
              <p className="text-[12.5px] font-medium text-muted">Kabuuang babayaran</p>
              <p className="font-heading text-[26px] font-extrabold leading-none text-green-deep">{peso(subtotal)}</p>
            </div>
            <p className="text-right text-[12.5px] font-semibold text-green">
              Nakakatipid ka ng {peso(saved)}
              <span className="block text-[11px] font-medium text-muted">vs. dating presyo</span>
            </p>
          </div>
          <PrimaryButton
            label="I-reserve & Pay"
            sub="makukuha mo agad — ihahatid sa’yo"
            icon={Check}
            onClick={() => setConfirm(true)}
          />
        </StickyBar>
      }
    >
      {/* Header */}
      <div className="px-4 pt-3">
        <div className="relative">
          <ProduceGlyph emoji={listing.emoji} imageId={listing.id} size="xl" />
          <span className="absolute right-3 top-3 rounded-xl bg-danger-deep px-2.5 py-1 text-[13px] font-bold text-white shadow-card">
            −{listing.discountPct}% off
          </span>
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h1 className="font-heading text-[24px] font-extrabold leading-tight text-ink">
              {listing.item} <span className="text-[15px] font-semibold text-muted">({listing.itemEn})</span>
            </h1>
            <p className="mt-0.5 text-[14px] text-muted">{listing.qtyKg}kg available • mabilis maubos</p>
          </div>
        </div>

        {/* Vendor */}
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-border bg-white p-3 shadow-card">
          <span className="grid size-11 place-items-center rounded-xl bg-green-tint text-[20px]">🧑‍🌾</span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-[15px] font-bold text-ink">{v.name}</p>
            <p className="flex items-center gap-1 text-[13px] text-muted">
              <MapPin className="size-[14px]" strokeWidth={2.4} /> {v.market} • {v.distanceKm} km
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-tint px-2 py-1 text-[13px] font-bold text-amber-deep">
            <Star className="size-[14px] fill-current" strokeWidth={0} /> {v.rating}
          </span>
        </div>
      </div>

      {/* Freshness + discount */}
      <div className="mt-4 space-y-3 px-4">
        <div className="rounded-2xl border border-border bg-white p-3.5 shadow-card">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="size-[18px] text-green" strokeWidth={2.4} />
            <h2 className="font-heading text-[15px] font-extrabold text-green-deep">AI freshness window</h2>
          </div>
          <FreshnessBadge pct={listing.freshnessPct} freshUntil={listing.freshUntil} showMeter />
        </div>

        <DiscountCountdown listing={listing} variant="block" />
      </div>

      {/* Quantity */}
      <div className="mt-4 px-4">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-white p-3.5 shadow-card">
          <div>
            <p className="font-heading text-[15px] font-bold text-ink">Ilang kilo?</p>
            <p className="text-[13px] text-muted">{peso(listing.price)}/kg • hanggang {listing.qtyKg}kg</p>
          </div>
          <QtyInline qty={qty} max={listing.qtyKg} onChange={setQty} />
        </div>
      </div>

      {/* Cross-sell */}
      <div className="mt-4 px-4">
        <button
          type="button"
          onClick={() => setAddon((a) => !a)}
          aria-pressed={addon}
          className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition active:scale-[0.99] ${
            addon ? 'border-green bg-green-tint' : 'border-border bg-white shadow-card'
          }`}
        >
          <span className="grid size-11 place-items-center rounded-xl bg-white text-[22px] shadow-card">🍚</span>
          <span className="min-w-0 flex-1">
            <span className="block font-heading text-[14.5px] font-bold text-ink">
              Magdagdag ng 10kg bigas?
            </span>
            <span className="block text-[13px] text-muted">Mula {wholesaler.name} • isang delivery na lang</span>
          </span>
          <span className="text-right">
            <span className="block font-heading text-[15px] font-extrabold text-green-deep">+{peso(ADDON.price)}</span>
            <span
              className={`mt-1 inline-flex size-6 items-center justify-center rounded-lg ${
                addon ? 'bg-green text-white' : 'border border-border text-muted'
              }`}
            >
              {addon ? <Check className="size-4" strokeWidth={3} /> : <Plus className="size-4" strokeWidth={2.6} />}
            </span>
          </span>
        </button>
      </div>

      {/* Eco line */}
      <div className="mt-4 px-4 pb-6">
        <div className="flex items-center gap-2.5 rounded-2xl bg-green-tint px-3.5 py-3">
          <Leaf className="size-5 shrink-0 text-green" strokeWidth={2.4} />
          <p className="text-[14px] leading-snug text-green-deep">
            Nakakatipid ng <span className="font-bold">{(listing.co2Kg * qty).toFixed(1)} kg CO₂</span> kapag na-rescue mo ang surplus na ito.
          </p>
        </div>
      </div>

      {/* Confirm (error prevention) */}
      <BottomSheet
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Kumpirmahin ang reserba"
        footer={
          <div className="space-y-2">
            <PrimaryButton label={`I-reserve & Pay — ${peso(subtotal)}`} sub="makukuha mo agad" icon={Check} onClick={placeReserve} />
            <button
              type="button"
              onClick={() => setConfirm(false)}
              className="tap-target w-full rounded-2xl border border-border bg-white px-5 py-3 text-[15px] font-semibold text-muted transition hover:bg-surface active:scale-[0.98]"
            >
              Kanselahin muna
            </button>
          </div>
        }
      >
        <ul className="space-y-2 pb-1 text-[14.5px]">
          <Row label={`${listing.item} (${qty}kg)`} value={peso(listing.price * qty)} />
          {addon && <Row label="10kg bigas (add-on)" value={peso(ADDON.price)} />}
          <Row label="Delivery (batch, ₱25/stop)" value={peso(25)} />
          <li className="flex items-center justify-between border-t border-border pt-2 font-bold text-ink">
            <span>Kabuuan</span>
            <span className="font-heading text-[18px] text-green-deep">{peso(subtotal + 25)}</span>
          </li>
        </ul>
        <p className="mt-2 flex items-center gap-1.5 text-[13px] text-muted">
          <Truck className="size-4" strokeWidth={2.3} /> Ihahatid sa loob ng 2 km bago mag-{listing.freshUntil}.
        </p>
      </BottomSheet>

      <SuccessSheet
        open={done}
        onClose={() => setDone(false)}
        title="Naka-reserve na! 🎉"
        steps={[
          { emoji: '🧑‍🌾', text: <><b>{v.name}</b> ihahanda ang {qty}kg {listing.item} mo.</> },
          { emoji: '🛺', text: <>I-ha-hatid ni <b>Mang Berto</b> bago mag-{listing.freshUntil}.</> },
          { emoji: '🔔', text: <>Subaybayan ang status sa <b>Orders</b> — ETA, driver, at mapa.</> },
        ]}
        primary={{ label: 'Tingnan ang order ko', onClick: () => navigate('/buyer/orders') }}
        secondary={{ label: 'Bumalik sa Palengke', onClick: () => navigate('/buyer') }}
      />
    </ScreenShell>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between text-ink">
      <span className="text-muted">{label}</span>
      <span className="font-semibold">{value}</span>
    </li>
  )
}

function QtyInline({ qty, max, onChange }: { qty: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-white p-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, qty - 1))}
        disabled={qty <= 1}
        aria-label="Bawasan"
        className="tap-target grid place-items-center rounded-lg bg-green-tint text-green-deep transition active:scale-95 disabled:opacity-40"
      >
        <span className="text-2xl leading-none">−</span>
      </button>
      <span className="min-w-[52px] text-center font-heading text-lg font-extrabold tabular-nums">{qty}<span className="ml-0.5 text-[12px] font-medium text-muted">kg</span></span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, qty + 1))}
        disabled={qty >= max}
        aria-label="Dagdagan"
        className="tap-target grid place-items-center rounded-lg bg-green text-white transition active:scale-95 disabled:opacity-40"
      >
        <span className="text-2xl leading-none">+</span>
      </button>
    </div>
  )
}
