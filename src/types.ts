export type Role = 'buyer' | 'vendor' | 'driver'

export type Category = 'gulay' | 'karne' | 'isda' | 'prutas'

export interface Vendor {
  id: string
  name: string
  market: string
  barangay: string
  distanceKm: number
  rating: number
}

export interface Listing {
  id: string
  emoji: string
  item: string // Taglish name, e.g. "Kamatis"
  itemEn: string // English gloss, e.g. "tomatoes"
  category: Category
  qtyKg: number
  origPrice: number // per kg before discount
  price: number // per kg now
  nextPrice: number // per kg after next scheduled drop
  discountPct: number
  freshUntil: string // clock label, e.g. "6:00 PM"
  freshnessPct: number // 0–100 (AI freshness predictor)
  dropOffsetSec: number // seconds from demo-base when next price drop fires
  co2Kg: number // CO₂ saved if rescued (kg)
  vendorId: string
  forwardListed?: boolean
  forwardTime?: string // clock label the forward batch becomes available
}

export type OrderStatus = 'reserved' | 'picking' | 'on_the_way' | 'delivered'

export interface OrderAddon {
  label: string
  price: number
}

export interface Order {
  id: string
  emoji: string
  item: string
  qtyKg: number
  pricePerKg: number
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
  placedLabel: string
  vendorName: string
  market: string
  driver: { name: string; tricycleNo: string; etaMin: number }
  batched: boolean
  batchCount: number
  addons: OrderAddon[]
  co2Kg: number
}

export type StopType = 'pickup' | 'drop'

export interface JobStop {
  id: string
  type: StopType
  title: string
  sub: string
  emoji?: string
}

export interface Job {
  id: string
  pickupVendor: string
  pickupMarket: string
  emoji: string
  cargo: string
  stops: JobStop[]
  dropCount: number
  feePerStop: number
  fee: number
  distanceKm: number
  etaMin: number
  routeCompliant: boolean
  zone: string
  relay?: string
}
