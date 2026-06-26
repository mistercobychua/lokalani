/** Peso, no decimals — the palengke default. */
export function peso(n: number): string {
  return '₱' + Math.round(n).toLocaleString('en-PH')
}

/** Peso with centavos when it matters (e.g. CO₂-style precision not needed here). */
export function pesoExact(n: number): string {
  return '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/** 12-hour clock label like "4:32 PM". */
export function formatClock(d: Date): string {
  let h = d.getHours()
  const m = d.getMinutes()
  const ampm = h >= 12 ? 'PM' : 'AM'
  h = h % 12
  if (h === 0) h = 12
  return `${h}:${m.toString().padStart(2, '0')} ${ampm}`
}

/** Countdown like "12:05" (m:ss) or "1:04:22" for longer. */
export function formatCountdown(totalSec: number): string {
  const s = Math.max(0, Math.floor(totalSec))
  const hh = Math.floor(s / 3600)
  const mm = Math.floor((s % 3600) / 60)
  const ss = s % 60
  if (hh > 0) return `${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
  return `${mm}:${ss.toString().padStart(2, '0')}`
}

/** Plain-language remaining time, e.g. "30 min" / "2 oras". */
export function humanRemaining(totalSec: number): string {
  const s = Math.max(0, Math.floor(totalSec))
  const mins = Math.round(s / 60)
  if (mins < 1) return 'wala pa isang minuto'
  if (mins < 60) return `${mins} min`
  const hrs = Math.floor(mins / 60)
  const rem = mins % 60
  return rem ? `${hrs} oras ${rem} min` : `${hrs} oras`
}
