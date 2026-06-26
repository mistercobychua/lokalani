import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic, Sparkles, Clock, RefreshCw, Check, Pencil } from 'lucide-react'
import AppBar from '../../components/AppBar'
import ScreenShell from '../../components/ScreenShell'
import StickyBar from '../../components/StickyBar'
import PrimaryButton from '../../components/PrimaryButton'
import { useApp } from '../../lib/AppContext'
import { peso } from '../../lib/format'

type Phase = 'idle' | 'listening' | 'filled'

const TRANSCRIPT = ['Sampung', 'kilong', 'talong,', 'limampung', 'piso', 'kada', 'kilo.']
const PARSED = { emoji: '🍆', item: 'Talong', qtyKg: 10, origPrice: 50 }
const WINDOWS = ['Ngayon–6:00 PM', '4:00–6:00 PM', '5:00–6:30 PM']

export default function MagList() {
  const navigate = useNavigate()
  const { addVendorPost, showToast } = useApp()
  const [phase, setPhase] = useState<Phase>('idle')
  const [words, setWords] = useState(0)
  const [discount, setDiscount] = useState(24)
  const [windowIdx, setWindowIdx] = useState(0)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  const startListening = () => {
    setPhase('listening')
    setWords(0)
    TRANSCRIPT.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setWords(i + 1), 180 + i * 230))
    })
    timers.current.push(window.setTimeout(() => setPhase('filled'), 180 + TRANSCRIPT.length * 230 + 500))
  }

  const price = Math.round(PARSED.origPrice * (1 - discount / 100))
  const closePrice = Math.max(1, Math.round(price * 0.88))

  const post = () => {
    addVendorPost({
      emoji: PARSED.emoji,
      item: PARSED.item,
      qtyKg: PARSED.qtyKg,
      origPrice: PARSED.origPrice,
      price,
      closePrice,
      freshUntil: '6:00 PM',
      dropTime: '5:00 PM',
    })
    showToast('Posted! Live na ang listing mo. 🎉')
    navigate('/vendor/listings')
  }

  return (
    <ScreenShell
      appBar={<AppBar title="Mag-list ng Surplus" role="vendor" helpKey="vendor-maglist" />}
      sticky={
        phase === 'filled' ? (
          <StickyBar>
            <PrimaryButton label="Post Listing" sub={`${PARSED.item} ${PARSED.qtyKg}kg • ${peso(price)}/kg`} icon={Check} onClick={post} />
          </StickyBar>
        ) : undefined
      }
    >
      <div className="px-4 pb-6 pt-4">
        {/* Step indicator */}
        <ol className="mb-4 flex items-center gap-1.5 text-[12px] font-semibold">
          <Step n={1} label="Magsalita" active={phase !== 'filled'} done={phase === 'filled'} />
          <span className="h-px flex-1 bg-border" />
          <Step n={2} label="I-check" active={phase === 'filled'} done={false} />
          <span className="h-px flex-1 bg-border" />
          <Step n={3} label="Post" active={false} done={false} />
        </ol>

        {/* Mic zone */}
        {phase !== 'filled' && (
          <div className="flex flex-col items-center rounded-card border border-border bg-white px-5 py-8 text-center shadow-card">
            <p className="mb-5 max-w-[30ch] text-[15px] leading-snug text-muted">
              Pindutin ang mic at magsalita. Halimbawa:{' '}
              <span className="font-semibold text-ink">“Sampung kilong talong, limampung piso kada kilo.”</span>
            </p>
            <button
              type="button"
              onClick={startListening}
              aria-label={phase === 'listening' ? 'Nakikinig' : 'Pindutin at magsalita'}
              className="relative grid size-28 place-items-center rounded-full bg-green text-white shadow-pop transition active:scale-95"
            >
              {phase === 'listening' && (
                <>
                  <span className="mic-ring absolute inset-0 rounded-full bg-green/40" />
                  <span className="mic-ring absolute inset-0 rounded-full bg-green/30" style={{ animationDelay: '0.6s' }} />
                </>
              )}
              <Mic className="size-12" strokeWidth={2.2} />
            </button>
            <p className="mt-4 font-heading text-[16px] font-extrabold text-green-deep">
              {phase === 'listening' ? 'Nakikinig…' : 'Pindutin at magsalita'}
            </p>

            {phase === 'listening' && (
              <p className="mt-2 min-h-[24px] max-w-[32ch] text-[15px] font-medium text-ink">
                {TRANSCRIPT.slice(0, words).join(' ')}
                <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-green align-middle" />
              </p>
            )}
          </div>
        )}

        {/* Filled form */}
        {phase === 'filled' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-2xl bg-green-tint px-3.5 py-2.5">
              <Sparkles className="size-[18px] text-green" strokeWidth={2.4} />
              <p className="text-[13.5px] font-medium text-green-deep">
                Narinig namin — i-check lang kung tama, tapos i-post.
              </p>
            </div>

            <div className="rounded-card border border-border bg-white p-4 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-14 place-items-center rounded-2xl bg-green-tint text-[32px]">{PARSED.emoji}</span>
                <div className="flex-1">
                  <p className="font-heading text-[19px] font-extrabold text-ink">{PARSED.item}</p>
                  <p className="text-[13.5px] text-muted">Nakuha mula sa boses mo</p>
                </div>
                <button
                  type="button"
                  onClick={startListening}
                  className="tap-target flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-[13px] font-semibold text-green-deep transition hover:bg-green-tint active:scale-95"
                >
                  <RefreshCw className="size-[16px]" strokeWidth={2.3} /> Ulitin
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <Field label="Dami" value={`${PARSED.qtyKg} kg`} />
                <Field label="Presyo (dating)" value={`${peso(PARSED.origPrice)}/kg`} />
              </div>
            </div>

            {/* AI shelf-life */}
            <div className="rounded-card border border-border bg-white p-4 shadow-card">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="size-[18px] text-green" strokeWidth={2.4} />
                <h2 className="font-heading text-[15px] font-extrabold text-green-deep">AI shelf-life</h2>
              </div>
              <p className="text-[14.5px] text-ink">
                Mabenta ang talong <b>bago mag-6:00 PM</b>. 72% sariwa pa ngayon.
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-green" style={{ width: '72%' }} />
              </div>
            </div>

            {/* Dynamic discount slider */}
            <div className="rounded-card border border-border bg-white p-4 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-[15px] font-extrabold text-green-deep">Dynamic na diskwento</h2>
                <span className="rounded-lg bg-amber-tint px-2 py-0.5 text-[12px] font-bold text-amber-deep">
                  AI suggest: 24%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={40}
                step={1}
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="mt-3 w-full accent-[#4a7c59]"
                aria-label="Antas ng diskwento"
              />
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[13px] text-muted">{discount}% off</span>
                <span className="font-heading text-[15px] font-bold text-ink">
                  <span className="text-muted line-through">{peso(PARSED.origPrice)}</span>{' '}
                  <span className="text-green-deep">{peso(price)}</span>/kg
                </span>
              </div>
            </div>

            {/* Pickup window */}
            <div className="rounded-card border border-border bg-white p-4 shadow-card">
              <div className="mb-2.5 flex items-center gap-2">
                <Clock className="size-[18px] text-green" strokeWidth={2.4} />
                <h2 className="font-heading text-[15px] font-extrabold text-green-deep">Pickup window</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {WINDOWS.map((w, i) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWindowIdx(i)}
                    className={`rounded-full border px-3.5 py-2 text-[13.5px] font-semibold transition active:scale-95 ${
                      windowIdx === i ? 'border-green bg-green text-white' : 'border-border bg-white text-ink hover:bg-green-tint'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ScreenShell>
  )
}

function Step({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`grid size-6 place-items-center rounded-full text-[12px] font-bold ${
          done ? 'bg-green text-white' : active ? 'bg-green text-white' : 'bg-border text-muted'
        }`}
      >
        {done ? <Check className="size-3.5" strokeWidth={3} /> : n}
      </span>
      <span className={active || done ? 'text-green-deep' : 'text-muted'}>{label}</span>
    </span>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-3 py-2.5">
      <p className="flex items-center gap-1 text-[12px] text-muted">
        {label}
        <Pencil className="size-3 opacity-60" strokeWidth={2.3} />
      </p>
      <p className="font-heading text-[16px] font-extrabold text-ink">{value}</p>
    </div>
  )
}
