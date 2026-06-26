import { Recycle, Repeat, Wallet, Leaf } from 'lucide-react'
import ProfileScreen from '../../components/ProfileScreen'
import { vendor } from '../../data/personas'

export default function Profile() {
  return (
    <ProfileScreen
      role="vendor"
      title="Profile"
      helpKey="vendor-profile"
      emoji="🧑‍🌾"
      name={vendor.name}
      sub={vendor.stall}
      rating={vendor.rating}
      info={[
        { label: 'Palengke', value: vendor.market },
        { label: 'Lokasyon', value: vendor.barangay },
        { label: 'Miyembro simula', value: vendor.memberSince },
      ]}
      stats={[
        { label: 'Na-recover ngayon', value: '₱1,180', sub: 'mula sa surplus', icon: Wallet, tone: 'green' },
        { label: 'Basura naiwasan', value: '28 kg', sub: 'ngayong linggo', icon: Recycle, tone: 'green' },
        { label: 'Repeat buyers', value: '7', sub: 'suking carinderia', icon: Repeat, tone: 'amber' },
        { label: 'CO₂ naiwasan', value: '9.4 kg', sub: 'bawas-sayang', icon: Leaf, tone: 'green' },
      ]}
    />
  )
}
