import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { Lang, Listing, Order, OrderAddon, Role } from '../types'
import { seedOrders } from '../data/orders'
import { vendorById } from '../data/personas'
import { driver as driverPersona } from '../data/personas'

export interface Reservation {
  name: string
  distanceKm: number
  qtyKg: number
}

export interface VendorPost {
  id: string
  emoji: string
  item: string
  qtyKg: number
  origPrice: number
  price: number
  closePrice: number
  freshUntil: string
  dropTime: string
  views: number
  reservations: Reservation[]
  status: 'active' | 'sold'
  forward?: boolean
}

const seedPosts: VendorPost[] = [
  {
    id: 'p-kamatis',
    emoji: '🍅',
    item: 'Kamatis',
    qtyKg: 5,
    origPrice: 45,
    price: 32,
    closePrice: 28,
    freshUntil: '6:00 PM',
    dropTime: '5:00 PM',
    views: 34,
    reservations: [
      { name: 'Maria’s Carinderia', distanceKm: 0.6, qtyKg: 3 },
      { name: 'Morning Sun Eatery', distanceKm: 1.6, qtyKg: 2 },
    ],
    status: 'active',
  },
  {
    id: 'p-galunggong',
    emoji: '🐟',
    item: 'Galunggong',
    qtyKg: 4,
    origPrice: 180,
    price: 140,
    closePrice: 120,
    freshUntil: '5:30 PM',
    dropTime: '4:45 PM',
    views: 51,
    reservations: [{ name: 'Manny’s Lutong Bahay', distanceKm: 1.1, qtyKg: 4 }],
    status: 'active',
  },
]

interface AppContextValue {
  // Demo clock
  now: Date
  demoMs: number
  demoBaseMs: number

  // Language
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void

  // Coachmarks (first-run per role)
  coachSeen: Record<Role, boolean>
  markCoachSeen: (r: Role) => void
  replayCoach: (r: Role) => void

  // Buyer
  orders: Order[]
  reserve: (listing: Listing, qtyKg: number, addons: OrderAddon[]) => Order

  // Vendor
  vendorPosts: VendorPost[]
  addVendorPost: (p: Omit<VendorPost, 'id' | 'views' | 'reservations' | 'status'>) => void
  markSold: (id: string) => void

  // Driver
  driverOnline: boolean
  toggleOnline: () => void
  acceptedJobId: string | null
  acceptJob: (id: string) => void
  activeStep: number
  advanceStep: (total: number) => void
  resetJob: () => void

  // Help + toast
  helpKey: string | null
  openHelp: (key: string) => void
  closeHelp: () => void
  toast: string | null
  showToast: (msg: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

// Demo base time: 4:30 PM today — mid surplus window (3–6 PM).
function demoBase(): number {
  const d = new Date()
  d.setHours(16, 30, 0, 0)
  return d.getTime()
}

export function AppProvider({ children }: { children: ReactNode }) {
  const baseRef = useRef<{ demoBaseMs: number; wallStart: number }>({
    demoBaseMs: demoBase(),
    wallStart: Date.now(),
  })
  const [demoMs, setDemoMs] = useState(baseRef.current.demoBaseMs)

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - baseRef.current.wallStart
      setDemoMs(baseRef.current.demoBaseMs + elapsed)
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  // Language
  const [lang, setLang] = useState<Lang>('fil')
  const toggleLang = useCallback(() => setLang((l) => (l === 'fil' ? 'en' : 'fil')), [])

  // Coachmarks
  const [coachSeen, setCoachSeen] = useState<Record<Role, boolean>>({
    buyer: false,
    vendor: false,
    driver: false,
  })
  const markCoachSeen = useCallback((r: Role) => setCoachSeen((s) => ({ ...s, [r]: true })), [])
  const replayCoach = useCallback((r: Role) => setCoachSeen((s) => ({ ...s, [r]: false })), [])

  // Orders
  const [orders, setOrders] = useState<Order[]>(seedOrders)
  const orderSeq = useRef(0)

  const reserve = useCallback((listing: Listing, qtyKg: number, addons: OrderAddon[]) => {
    const v = vendorById(listing.vendorId)
    const subtotal = listing.price * qtyKg + addons.reduce((s, a) => s + a.price, 0)
    const deliveryFee = 25 // batch route ₱25/stop
    orderSeq.current += 1
    const order: Order = {
      id: `ord-${Date.now()}-${orderSeq.current}`,
      emoji: listing.emoji,
      item: listing.item,
      qtyKg,
      pricePerKg: listing.price,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      status: 'reserved',
      placedLabel: 'Ngayon lang',
      vendorName: v.name,
      market: v.market,
      driver: { name: driverPersona.name, tricycleNo: driverPersona.tricycleNo, etaMin: 18 },
      batched: true,
      batchCount: 2,
      addons,
      co2Kg: listing.co2Kg,
    }
    setOrders((prev) => [order, ...prev])
    return order
  }, [])

  // Auto-advance the newest active order to show live status progression.
  useEffect(() => {
    const sequence: Order['status'][] = ['reserved', 'picking', 'on_the_way', 'delivered']
    const id = window.setInterval(() => {
      setOrders((prev) => {
        const idx = prev.findIndex((o) => o.status !== 'delivered')
        if (idx === -1) return prev
        const o = prev[idx]
        const next = sequence[Math.min(sequence.indexOf(o.status) + 1, sequence.length - 1)]
        if (next === o.status) return prev
        const eta = next === 'on_the_way' ? 9 : next === 'delivered' ? 0 : o.driver.etaMin
        const copy = [...prev]
        copy[idx] = { ...o, status: next, driver: { ...o.driver, etaMin: eta } }
        return copy
      })
    }, 8000)
    return () => window.clearInterval(id)
  }, [])

  // Vendor
  const [vendorPosts, setVendorPosts] = useState<VendorPost[]>(seedPosts)
  const postSeq = useRef(0)
  const addVendorPost = useCallback(
    (p: Omit<VendorPost, 'id' | 'views' | 'reservations' | 'status'>) => {
      postSeq.current += 1
      setVendorPosts((prev) => [
        { ...p, id: `post-${Date.now()}-${postSeq.current}`, views: 0, reservations: [], status: 'active' },
        ...prev,
      ])
    },
    [],
  )
  const markSold = useCallback((id: string) => {
    setVendorPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'sold' } : p)))
  }, [])

  // Driver
  const [driverOnline, setDriverOnline] = useState(true)
  const toggleOnline = useCallback(() => setDriverOnline((v) => !v), [])
  const [acceptedJobId, setAcceptedJobId] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const acceptJob = useCallback((id: string) => {
    setAcceptedJobId(id)
    setActiveStep(0)
  }, [])
  const advanceStep = useCallback((total: number) => {
    setActiveStep((s) => Math.min(s + 1, total))
  }, [])
  const resetJob = useCallback(() => {
    setAcceptedJobId(null)
    setActiveStep(0)
  }, [])

  // Help + toast
  const [helpKey, setHelpKey] = useState<string | null>(null)
  const openHelp = useCallback((key: string) => setHelpKey(key), [])
  const closeHelp = useCallback(() => setHelpKey(null), [])

  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)
  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = window.setTimeout(() => setToast(null), 2600)
  }, [])

  const value = useMemo<AppContextValue>(
    () => ({
      now: new Date(demoMs),
      demoMs,
      demoBaseMs: baseRef.current.demoBaseMs,
      lang,
      setLang,
      toggleLang,
      coachSeen,
      markCoachSeen,
      replayCoach,
      orders,
      reserve,
      vendorPosts,
      addVendorPost,
      markSold,
      driverOnline,
      toggleOnline,
      acceptedJobId,
      acceptJob,
      activeStep,
      advanceStep,
      resetJob,
      helpKey,
      openHelp,
      closeHelp,
      toast,
      showToast,
    }),
    [
      demoMs,
      lang,
      toggleLang,
      coachSeen,
      markCoachSeen,
      replayCoach,
      orders,
      reserve,
      vendorPosts,
      addVendorPost,
      markSold,
      driverOnline,
      toggleOnline,
      acceptedJobId,
      acceptJob,
      activeStep,
      advanceStep,
      resetJob,
      helpKey,
      openHelp,
      closeHelp,
      toast,
      showToast,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
