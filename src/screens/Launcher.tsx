import { useNavigate } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import Wordmark from '../components/Wordmark'
import RoleCard from '../components/RoleCard'
import LanguageToggle from '../components/LanguageToggle'
import { roleMeta, roleOrder } from '../lib/roles'
import { useT } from '../lib/i18n'

export default function Launcher() {
  const navigate = useNavigate()
  const t = useT()
  return (
    <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto bg-surface">
      {/* Branded hero */}
      <header className="relative overflow-hidden bg-gradient-to-b from-green to-green-dark px-6 pb-20 pt-10 text-white">
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3">
            <Wordmark size="lg" tone="light" />
            <LanguageToggle tone="onGreen" />
          </div>
          <p className="mt-3 text-[12.5px] font-semibold uppercase tracking-[0.2em] text-white">
            Konekta. Kain. Kabuhayan.
          </p>
          <h1 className="mt-5 max-w-[14ch] font-heading text-[34px] font-extrabold leading-[1.05] tracking-tight">
            {t('Walang sayang na ani.', 'No harvest goes to waste.')}
          </h1>
          <p className="mt-3 max-w-[34ch] text-[15.5px] leading-snug text-white">
            {t(
              'Ang surplus ng palengke ngayong hapon — murang sariwa para sa mga karinderya, malapit lang.',
              'This afternoon’s market surplus — fresh produce, cheap, for eateries nearby.',
            )}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full glass-green px-3 py-1.5 text-[13px] font-semibold">
            <Leaf className="size-4 text-sage" strokeWidth={2.4} />
            {t('Surplus window ngayon: 3:00–6:00 PM', 'Surplus window now: 3:00–6:00 PM')}
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
          {t('Sino ka ngayon?', 'Who are you today?')}
        </h2>
        <p className="mt-1 text-[14px] text-muted">
          {t('Piliin ang iyong role para magsimula.', 'Pick your role to get started.')}
        </p>

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
