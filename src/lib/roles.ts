import {
  ShoppingBasket,
  Store,
  Bike,
  Home,
  Bell,
  ClipboardList,
  PiggyBank,
  User,
  LayoutDashboard,
  Mic,
  Tags,
  Wallet,
  Navigation,
  MapPin,
  Package,
  type LucideIcon,
} from 'lucide-react'
import type { Role } from '../types'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

export interface RoleMeta {
  id: Role
  label: string // short role noun
  who: string // role-picker headline
  benefit: string // one-line plain benefit
  icon: LucideIcon
  emoji: string
  base: string
  nav: NavItem[]
}

export const roleMeta: Record<Role, RoleMeta> = {
  buyer: {
    id: 'buyer',
    label: 'Carinderia',
    who: 'Ako ay Carinderia',
    benefit: 'Bumili ng murang sariwa, malapit lang sa’yo.',
    icon: ShoppingBasket,
    emoji: '🥘',
    base: '/buyer',
    nav: [
      { to: '/buyer', label: 'Palengke', icon: Home, end: true },
      { to: '/buyer/abiso', label: 'Abiso', icon: Bell },
      { to: '/buyer/orders', label: 'Orders', icon: ClipboardList },
      { to: '/buyer/tipid', label: 'Tipid', icon: PiggyBank },
      { to: '/buyer/profile', label: 'Profile', icon: User },
    ],
  },
  vendor: {
    id: 'vendor',
    label: 'Market Vendor',
    who: 'Ako ay Market Vendor',
    benefit: 'Ibenta ang surplus bago masayang — sa loob ng 2 km.',
    icon: Store,
    emoji: '🍅',
    base: '/vendor',
    nav: [
      { to: '/vendor', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/vendor/maglist', label: 'Mag-list', icon: Mic },
      { to: '/vendor/listings', label: 'Listings', icon: Tags },
      { to: '/vendor/kita', label: 'Kita', icon: Wallet },
      { to: '/vendor/profile', label: 'Profile', icon: User },
    ],
  },
  driver: {
    id: 'driver',
    label: 'TODA Driver',
    who: 'Ako ay TODA Driver',
    benefit: 'Kumita sa paghahatid, sa loob lang ng zone mo.',
    icon: Bike,
    emoji: '🛺',
    base: '/driver',
    nav: [
      { to: '/driver', label: 'Jobs', icon: Package, end: true },
      { to: '/driver/active', label: 'Active', icon: Navigation },
      { to: '/driver/kita', label: 'Kita', icon: Wallet },
      { to: '/driver/zone', label: 'Zone', icon: MapPin },
      { to: '/driver/profile', label: 'Profile', icon: User },
    ],
  },
}

export const roleOrder: Role[] = ['buyer', 'vendor', 'driver']
