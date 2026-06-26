import { Route, Star, MapPin, Wallet } from 'lucide-react'
import ProfileScreen from '../../components/ProfileScreen'
import { driver } from '../../data/personas'

export default function Profile() {
  return (
    <ProfileScreen
      role="driver"
      title="Profile"
      helpKey="driver-zone"
      emoji="🧑‍✈️"
      name={driver.name}
      sub={`${driver.chapter} • ${driver.tricycleNo}`}
      rating={driver.rating}
      info={[
        { label: 'TODA chapter', value: driver.chapter },
        { label: 'Service zone', value: driver.zone.join(', ') },
        { label: 'Tricycle', value: driver.tricycleNo },
      ]}
      stats={[
        { label: 'Kita ngayong araw', value: '₱400', sub: '4 trips', icon: Wallet, tone: 'green' },
        { label: 'Total trips', value: driver.trips.toLocaleString(), sub: 'all-time', icon: Route, tone: 'plain' },
        { label: 'Rating', value: `${driver.rating}★`, sub: 'mula sa suki', icon: Star, tone: 'amber' },
        { label: 'Service zone', value: '3 brgy', sub: 'authorized', icon: MapPin, tone: 'green' },
      ]}
    />
  )
}
