import type { Vendor } from '../types'

export const buyer = {
  name: 'Maria Santos',
  age: 45,
  business: 'Maria’s Carinderia',
  barangay: 'Brgy. Socorro, Quezon City',
  cooks: 'Adobo, giniling, gulay',
  quote:
    'Sa bawat pisong natitipid ko sa mga sangkap, mas napapanatili kong abot-kaya ang aking mga pagkain at kumikita ang aking negosyo.',
  memberSince: 'Marso 2025',
}

export const driver = {
  name: 'Mang Berto Reyes',
  chapter: 'Cubao TODA Chapter',
  tricycleNo: 'TODA-1428',
  zone: ['Brgy. Socorro', 'Brgy. Mariana', 'Project 4'],
  rating: 4.9,
  trips: 1240,
}

export const vendor = {
  name: 'Aling Nena',
  stall: 'Aling Nena’s Gulay',
  market: 'Nepa Q-Mart',
  barangay: 'Brgy. Socorro, Quezon City',
  rating: 4.8,
  memberSince: 'Enero 2025',
}

export const vendors: Vendor[] = [
  { id: 'v1', name: 'Aling Nena’s Gulay', market: 'Nepa Q-Mart', barangay: 'Brgy. Socorro', distanceKm: 0.4, rating: 4.8 },
  { id: 'v2', name: 'Mang Tony Vegetables', market: 'Farmer’s Market, Cubao', barangay: 'Brgy. Mariana', distanceKm: 1.2, rating: 4.6 },
  { id: 'v3', name: 'Lola Fe Produce', market: 'Pasig Mega Market', barangay: 'Project 4', distanceKm: 1.8, rating: 4.9 },
]

export const wholesaler = {
  name: 'Aling Nena Wholesale',
  sells: 'Bigas at mantika',
}

export function vendorById(id: string): Vendor {
  return vendors.find((v) => v.id === id) ?? vendors[0]
}

/** Other nearby eateries referenced in alerts / batch bundles. */
export const otherEateries = ['Manny’s Lutong Bahay', 'Morning Sun Eatery (Project 4, QC)']

/** Markets covered by the platform. */
export const markets = ['Nepa Q-Mart', 'Farmer’s Market, Cubao', 'Pasig Mega Market']
