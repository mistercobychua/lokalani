import type { Order } from '../types'

/** One delivered order seeds Maria's history so "Orders" is never empty. */
export const seedOrders: Order[] = [
  {
    id: 'ord-seed-1',
    emoji: '🍆',
    item: 'Talong',
    qtyKg: 8,
    pricePerKg: 38,
    subtotal: 304,
    deliveryFee: 25,
    total: 329,
    status: 'delivered',
    placedLabel: 'Kahapon, 5:10 PM',
    vendorName: 'Mang Tony Vegetables',
    market: 'Farmer’s Market, Cubao',
    driver: { name: 'Mang Berto Reyes', tricycleNo: 'TODA-1428', etaMin: 0 },
    batched: true,
    batchCount: 2,
    addons: [],
    co2Kg: 1.3,
  },
]
