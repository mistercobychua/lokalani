import { Outlet } from 'react-router-dom'
import type { Role } from '../types'
import BottomNav from './BottomNav'
import HelpSheet from './HelpSheet'
import Toast from './Toast'

/** Role container: renders the active screen plus role-wide overlays. */
export function RoleRoot({ role }: { role: Role }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <Outlet />
      <HelpSheet role={role} />
      <Toast />
    </div>
  )
}

/** Tab screens: the routed screen above a persistent bottom nav. */
export function TabFrame({ role }: { role: Role }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </div>
      <BottomNav role={role} />
    </div>
  )
}
