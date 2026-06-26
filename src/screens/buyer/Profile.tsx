import { PiggyBank, ShoppingBasket, Leaf, BadgeCheck } from 'lucide-react'
import ProfileScreen from '../../components/ProfileScreen'
import { buyer } from '../../data/personas'

export default function Profile() {
  return (
    <ProfileScreen
      role="buyer"
      title="Profile"
      helpKey="buyer-profile"
      emoji="👩‍🍳"
      name={buyer.name}
      sub={`${buyer.business} • ${buyer.age} taong gulang`}
      quote={buyer.quote}
      info={[
        { label: 'Lokasyon', value: buyer.barangay },
        { label: 'Lutong specialty', value: buyer.cooks },
        { label: 'Miyembro simula', value: buyer.memberSince },
      ]}
      stats={[
        { label: 'Tipid ngayong buwan', value: '₱2,480', sub: '20–40% sa sangkap', icon: PiggyBank, tone: 'green' },
        { label: 'Orders ngayong buwan', value: '18', sub: 'kasama ang batch', icon: ShoppingBasket, tone: 'plain' },
        { label: 'CO₂ naiwasan', value: '16 kg', sub: 'bawas-sayang', icon: Leaf, tone: 'green' },
        { label: 'Eco-Badge', value: 'Active', sub: '₱99/buwan', icon: BadgeCheck, tone: 'amber' },
      ]}
    />
  )
}
