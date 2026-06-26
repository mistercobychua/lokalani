import type { Job } from '../types'

/**
 * Driver jobs within Mang Berto's 2 km service zone, during the
 * 3:00–6:00 PM surplus window. Fees are ₱25 per stop (batch route).
 */
export const jobs: Job[] = [
  {
    id: 'j1',
    pickupVendor: 'Aling Nena’s Gulay',
    pickupMarket: 'Nepa Q-Mart',
    emoji: '🍅',
    cargo: '5kg kamatis + 4kg galunggong',
    stops: [
      { id: 's0', type: 'pickup', title: 'Pickup: Aling Nena’s Gulay', sub: 'Nepa Q-Mart • Brgy. Socorro', emoji: '🍅' },
      { id: 's1', type: 'drop', title: 'Maria’s Carinderia', sub: 'Brgy. Socorro • 0.6 km', emoji: '🥘' },
      { id: 's2', type: 'drop', title: 'Manny’s Lutong Bahay', sub: 'Brgy. Mariana • 1.1 km', emoji: '🍲' },
      { id: 's3', type: 'drop', title: 'Morning Sun Eatery', sub: 'Project 4 • 1.6 km', emoji: '🍳' },
    ],
    dropCount: 3,
    feePerStop: 25,
    fee: 100,
    distanceKm: 1.6,
    etaMin: 22,
    routeCompliant: true,
    zone: 'Brgy. Socorro → Project 4',
    relay: 'Project 4 Basketball Court — Barangay Border Drop-point',
  },
  {
    id: 'j2',
    pickupVendor: 'Mang Tony Vegetables',
    pickupMarket: 'Farmer’s Market, Cubao',
    emoji: '🍆',
    cargo: '10kg talong',
    stops: [
      { id: 's0', type: 'pickup', title: 'Pickup: Mang Tony Vegetables', sub: 'Farmer’s Market • Brgy. Mariana', emoji: '🍆' },
      { id: 's1', type: 'drop', title: 'Maria’s Carinderia', sub: 'Brgy. Socorro • 0.9 km', emoji: '🥘' },
      { id: 's2', type: 'drop', title: 'Manny’s Lutong Bahay', sub: 'Brgy. Mariana • 0.5 km', emoji: '🍲' },
    ],
    dropCount: 2,
    feePerStop: 25,
    fee: 50,
    distanceKm: 1.1,
    etaMin: 15,
    routeCompliant: true,
    zone: 'Brgy. Mariana',
  },
  {
    id: 'j3',
    pickupVendor: 'Lola Fe Produce',
    pickupMarket: 'Pasig Mega Market',
    emoji: '🥔',
    cargo: '7kg kamote',
    stops: [
      { id: 's0', type: 'pickup', title: 'Pickup: Lola Fe Produce', sub: 'Pasig Mega Market • Project 4', emoji: '🥔' },
      { id: 's1', type: 'drop', title: 'Morning Sun Eatery', sub: 'Project 4 • 0.9 km', emoji: '🍳' },
    ],
    dropCount: 1,
    feePerStop: 25,
    fee: 25,
    distanceKm: 0.9,
    etaMin: 10,
    routeCompliant: true,
    zone: 'Project 4',
  },
]

export function jobById(id: string): Job | undefined {
  return jobs.find((j) => j.id === id)
}
