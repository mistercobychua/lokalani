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
  labelEn: string
  icon: LucideIcon
  end?: boolean
}

export interface RoleMeta {
  id: Role
  label: string // short role noun
  who: string // role-picker headline
  whoEn: string
  benefit: string // one-line plain benefit
  benefitEn: string
  icon: LucideIcon
  emoji: string
  base: string
  nav: NavItem[]
}

export const roleMeta: Record<Role, RoleMeta> = {
  buyer: {
    id: 'buyer',
    label: 'Carinderia Owner',
    who: 'Ako ay Carinderia Owner',
    whoEn: 'I’m a Carinderia Owner',
    benefit: 'Bumili ng murang sariwa, malapit lang sa’yo.',
    benefitEn: 'Buy fresh produce cheap, right near you.',
    icon: ShoppingBasket,
    emoji: '🥘',
    base: '/buyer',
    nav: [
      { to: '/buyer', label: 'Palengke', labelEn: 'Market', icon: Home, end: true },
      { to: '/buyer/abiso', label: 'Abiso', labelEn: 'Alerts', icon: Bell },
      { to: '/buyer/orders', label: 'Orders', labelEn: 'Orders', icon: ClipboardList },
      { to: '/buyer/tipid', label: 'Tipid', labelEn: 'Savings', icon: PiggyBank },
      { to: '/buyer/profile', label: 'Profile', labelEn: 'Profile', icon: User },
    ],
  },
  vendor: {
    id: 'vendor',
    label: 'Market Vendor',
    who: 'Ako ay Market Vendor',
    whoEn: 'I’m a Market Vendor',
    benefit: 'Ibenta ang surplus bago masayang — sa loob ng 2 km.',
    benefitEn: 'Sell surplus before it’s wasted — within 2 km.',
    icon: Store,
    emoji: '🍅',
    base: '/vendor',
    nav: [
      { to: '/vendor', label: 'Dashboard', labelEn: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/vendor/maglist', label: 'Mag-list', labelEn: 'List', icon: Mic },
      { to: '/vendor/listings', label: 'Listings', labelEn: 'Listings', icon: Tags },
      { to: '/vendor/kita', label: 'Kita', labelEn: 'Earnings', icon: Wallet },
      { to: '/vendor/profile', label: 'Profile', labelEn: 'Profile', icon: User },
    ],
  },
  driver: {
    id: 'driver',
    label: 'TODA Driver',
    who: 'Ako ay TODA Driver',
    whoEn: 'I’m a TODA Driver',
    benefit: 'Kumita sa paghahatid, sa loob lang ng zone mo.',
    benefitEn: 'Earn from deliveries, within your zone.',
    icon: Bike,
    emoji: '🛺',
    base: '/driver',
    nav: [
      { to: '/driver', label: 'Jobs', labelEn: 'Jobs', icon: Package, end: true },
      { to: '/driver/active', label: 'Active', labelEn: 'Active', icon: Navigation },
      { to: '/driver/kita', label: 'Kita', labelEn: 'Earnings', icon: Wallet },
      { to: '/driver/zone', label: 'Zone', labelEn: 'Zone', icon: MapPin },
      { to: '/driver/profile', label: 'Profile', labelEn: 'Profile', icon: User },
    ],
  },
}

export const roleOrder: Role[] = ['buyer', 'vendor', 'driver']
