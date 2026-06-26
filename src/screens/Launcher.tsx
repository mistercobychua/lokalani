import { useNavigate } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import Wordmark from '../components/Wordmark'
import RoleCard from '../components/RoleCard'
import { roleMeta, roleOrder } from '../lib/roles'

export default function Launcher() {
  const navigate = useNavigate()
  return (
    <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto bg-surface">
      {/* Branded hero */}
      <header className="relative overflow-hidden bg-gradient-to-b from-green to-green-dark px-6 pb-20 pt-10 text-white">
        <div className="relative z-10">
          <Wordmark size="lg" tone="light" />
          <h1 className="mt-6 max-w-[14ch] font-heading text-[34px] font-extrabold leading-[1.05] tracking-tight">
            Walang sayang na ani.
          </h1>
          <p className="mt-3 max-w-[34ch] text-[15.5px] leading-snug text-white">
            Ang surplus ng palengke ngayong hapon — murang sariwa para sa mga karinderya, malapit lang.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full glass-green px-3 py-1.5 text-[13px] font-semibold">
            <Leaf className="size-4 text-[#f4d9a8]" strokeWidth={2.4} />
            Surplus window ngayon: 3:00–6:00 PM
          </span>
        </div>

        {/* gentle hills */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-9 w-full text-surface"
          viewBox="0 0 390 48"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0 30 Q 98 6 195 24 T 390 22 V48 H0 Z" fill="currentColor" />
        </svg>
      </header>

      {/* Role picker */}
      <main className="flex-1 px-5 pt-5">
        <h2 className="font-heading text-[15px] font-extrabold uppercase tracking-wide text-muted">
          Sino ka ngayon?
        </h2>
        <p className="mt-1 text-[14px] text-muted">Piliin ang iyong role para magsimula.</p>

        <div className="stagger mt-4 space-y-3">
          {roleOrder.map((r, i) => (
            <div key={r} style={{ '--i': i } as React.CSSProperties}>
              <RoleCard meta={roleMeta[r]} onClick={() => navigate(roleMeta[r].base)} />
            </div>
          ))}
        </div>
      </main>

      <footer className="px-6 py-6 text-center">
        <p className="text-[13px] font-medium text-muted">Pitch demo • Walang sayang na ani.</p>
      </footer>
    </div>
  )
}
