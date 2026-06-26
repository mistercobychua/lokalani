import { useEffect, useState, type ReactNode } from 'react'
import { Signal, Wifi, BatteryMedium } from 'lucide-react'
import { formatClock } from '../lib/format'

/**
 * Centers the app in a soft phone bezel on desktop; full-bleed on mobile.
 * Provides a faux status bar (real wall-clock time + signal/wifi/battery + notch).
 * The routed screen fills the remaining height and manages its own scroll.
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  // Real device time, ticking every second.
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="min-h-dvh w-full flex items-stretch justify-center sm:items-center sm:py-6">
      <div className="phone-bezel w-full sm:w-auto">
        <div className="phone-screen no-scrollbar">
          {/* Faux status bar */}
          <div className="relative z-nav flex items-center justify-between bg-green-dark px-6 pt-3 pb-1.5 text-white select-none">
            <span className="text-[13px] font-semibold tracking-wide tabular-nums">{formatClock(now)}</span>
            {/* notch / dynamic island */}
            <div className="pointer-events-none absolute left-1/2 top-2 h-[22px] w-[96px] -translate-x-1/2 rounded-full bg-black/85" />
            <span className="flex items-center gap-1.5">
              <Signal className="size-[15px]" strokeWidth={2.5} />
              <Wifi className="size-[15px]" strokeWidth={2.5} />
              <BatteryMedium className="size-[18px]" strokeWidth={2.5} />
            </span>
          </div>

          {/* Screen body */}
          <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
        </div>
      </div>

      <style>{`
        .phone-bezel {
          --bezel: 12px;
        }
        @media (min-width: 640px) {
          .phone-bezel {
            background: linear-gradient(160deg, #2b2c27, #14150f);
            padding: var(--bezel);
            border-radius: 3rem;
            box-shadow: var(--shadow-frame);
          }
        }
        .phone-screen {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100dvh;
          overflow: hidden;
          background: var(--color-surface);
        }
        @media (min-width: 640px) {
          .phone-screen {
            width: 390px;
            height: min(844px, calc(100dvh - 48px));
            border-radius: 2.25rem;
          }
        }
      `}</style>
    </div>
  )
}
