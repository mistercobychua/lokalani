import { NavLink } from 'react-router-dom'
import type { Role } from '../types'
import { roleMeta } from '../lib/roles'
import { useApp } from '../lib/AppContext'

/** Role-specific bottom tabs — icon + text label, always. */
export default function BottomNav({ role }: { role: Role }) {
  const { nav } = roleMeta[role]
  const { lang } = useApp()
  return (
    <nav
      className="z-nav shrink-0 border-t border-border bg-white/95 px-1.5 pt-1.5 backdrop-blur"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
      aria-label="Pangunahing nabigasyon"
    >
      <ul className="flex items-stretch justify-between">
        {nav.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              end={item.end}
              className="group flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-xl px-0.5 py-1 text-muted transition-colors aria-[current=page]:text-green-deep"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`grid place-items-center rounded-full px-3 py-0.5 transition-colors ${
                      isActive ? 'bg-green-tint' : 'bg-transparent'
                    }`}
                  >
                    <item.icon
                      className="size-[21px]"
                      strokeWidth={isActive ? 2.6 : 2}
                    />
                  </span>
                  <span className={`text-[10.5px] leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
                    {lang === 'en' ? item.labelEn : item.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
