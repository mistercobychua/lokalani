import type { Listing } from '../types'

/**
 * Surplus listings near Maria, within the 2 km alert radius.
 * `dropOffsetSec` = seconds from the demo base time (4:30 PM) when the
 * dynamic-discount engine fires the next price drop. A couple are deliberately
 * near so the live countdown visibly ticks during a demo.
 */
export const listings: Listing[] = [
  {
    id: 'kamatis',
    emoji: '🍅',
    item: 'Kamatis',
    itemEn: 'tomatoes',
    category: 'gulay',
    qtyKg: 5,
    origPrice: 45,
    price: 32,
    nextPrice: 28,
    discountPct: 30,
    freshUntil: '6:00 PM',
    freshnessPct: 78,
    dropOffsetSec: 1800, // 5:00 PM
    co2Kg: 0.8,
    vendorId: 'v1',
  },
  {
    id: 'galunggong',
    emoji: '🐟',
    item: 'Galunggong',
    itemEn: 'round scad',
    category: 'isda',
    qtyKg: 4,
    origPrice: 180,
    price: 140,
    nextPrice: 120,
    discountPct: 22,
    freshUntil: '5:30 PM',
    freshnessPct: 58, // last-call
    dropOffsetSec: 95, // ~4:32 PM — ticks down fast for the demo
    co2Kg: 1.4,
    vendorId: 'v1',
  },
  {
    id: 'repolyo',
    emoji: '🥬',
    item: 'Repolyo',
    itemEn: 'cabbage',
    category: 'gulay',
    qtyKg: 8,
    origPrice: 40,
    price: 30,
    nextPrice: 26,
    discountPct: 25,
    freshUntil: '6:00 PM',
    freshnessPct: 64, // aging
    dropOffsetSec: 900, // 4:45 PM
    co2Kg: 1.1,
    vendorId: 'v3',
  },
  {
    id: 'talong',
    emoji: '🍆',
    item: 'Talong',
    itemEn: 'eggplant',
    category: 'gulay',
    qtyKg: 10,
    origPrice: 50,
    price: 38,
    nextPrice: 34,
    discountPct: 24,
    freshUntil: '6:30 PM',
    freshnessPct: 72,
    dropOffsetSec: 3600, // 5:30 PM
    co2Kg: 1.6,
    vendorId: 'v2',
    forwardListed: true,
    forwardTime: '5:30 PM',
  },
  {
    id: 'saging',
    emoji: '🍌',
    item: 'Saging na Saba',
    itemEn: 'saba bananas',
    category: 'prutas',
    qtyKg: 6,
    origPrice: 60,
    price: 48,
    nextPrice: 42,
    discountPct: 20,
    freshUntil: '7:00 PM',
    freshnessPct: 81,
    dropOffsetSec: 2700, // 5:15 PM
    co2Kg: 0.6,
    vendorId: 'v2',
  },
  {
    id: 'kamote',
    emoji: '🥔',
    item: 'Kamote',
    itemEn: 'sweet potato',
    category: 'gulay',
    qtyKg: 7,
    origPrice: 50,
    price: 40,
    nextPrice: 36,
    discountPct: 20,
    freshUntil: '7:30 PM',
    freshnessPct: 88,
    dropOffsetSec: 3000, // 5:20 PM
    co2Kg: 0.5,
    vendorId: 'v3',
  },
]

export function listingById(id: string): Listing | undefined {
  return listings.find((l) => l.id === id)
}

export const categoryLabels: { key: 'lahat' | Listing['category']; label: string; labelEn: string; emoji: string }[] = [
  { key: 'lahat', label: 'Lahat', labelEn: 'All', emoji: '🧺' },
  { key: 'gulay', label: 'Gulay', labelEn: 'Veg', emoji: '🥬' },
  { key: 'karne', label: 'Karne', labelEn: 'Meat', emoji: '🍖' },
  { key: 'isda', label: 'Isda', labelEn: 'Fish', emoji: '🐟' },
  { key: 'prutas', label: 'Prutas', labelEn: 'Fruit', emoji: '🍌' },
]
