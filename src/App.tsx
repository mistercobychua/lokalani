import { Routes, Route, Navigate } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame'
import { RoleRoot, TabFrame } from './components/RoleLayouts'

import Launcher from './screens/Launcher'

// Buyer
import Palengke from './screens/buyer/Palengke'
import ListingDetail from './screens/buyer/ListingDetail'
import Abiso from './screens/buyer/Abiso'
import Orders from './screens/buyer/Orders'
import Tipid from './screens/buyer/Tipid'
import BuyerProfile from './screens/buyer/Profile'

// Vendor
import Dashboard from './screens/vendor/Dashboard'
import MagList from './screens/vendor/MagList'
import ForwardList from './screens/vendor/ForwardList'
import Listings from './screens/vendor/Listings'
import VendorKita from './screens/vendor/Kita'
import VendorProfile from './screens/vendor/Profile'

// Driver
import Jobs from './screens/driver/Jobs'
import JobDetail from './screens/driver/JobDetail'
import Active from './screens/driver/Active'
import DriverKita from './screens/driver/Kita'
import Zone from './screens/driver/Zone'
import DriverProfile from './screens/driver/Profile'

export default function App() {
  return (
    <PhoneFrame>
      <Routes>
        <Route path="/" element={<Launcher />} />

        {/* Carinderia / Buyer */}
        <Route path="/buyer" element={<RoleRoot role="buyer" />}>
          <Route element={<TabFrame role="buyer" />}>
            <Route index element={<Palengke />} />
            <Route path="abiso" element={<Abiso />} />
            <Route path="orders" element={<Orders />} />
            <Route path="tipid" element={<Tipid />} />
            <Route path="profile" element={<BuyerProfile />} />
          </Route>
          <Route path="listing/:id" element={<ListingDetail />} />
        </Route>

        {/* Market Vendor / Seller */}
        <Route path="/vendor" element={<RoleRoot role="vendor" />}>
          <Route element={<TabFrame role="vendor" />}>
            <Route index element={<Dashboard />} />
            <Route path="maglist" element={<MagList />} />
            <Route path="listings" element={<Listings />} />
            <Route path="kita" element={<VendorKita />} />
            <Route path="profile" element={<VendorProfile />} />
          </Route>
          <Route path="forward" element={<ForwardList />} />
        </Route>

        {/* TODA Driver */}
        <Route path="/driver" element={<RoleRoot role="driver" />}>
          <Route element={<TabFrame role="driver" />}>
            <Route index element={<Jobs />} />
            <Route path="active" element={<Active />} />
            <Route path="kita" element={<DriverKita />} />
            <Route path="zone" element={<Zone />} />
            <Route path="profile" element={<DriverProfile />} />
          </Route>
          <Route path="job/:id" element={<JobDetail />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PhoneFrame>
  )
}
