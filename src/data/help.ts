export interface HelpContent {
  title: string
  titleEn: string
  what: string // "Ano ito?"
  whatEn: string
  how: string[] // "Paano gamitin?" — numbered steps
  howEn: string[]
}

/** Plain-Taglish + English help, one entry per screen. Keyed by route screen id. */
export const helpContent: Record<string, HelpContent> = {
  // Buyer
  'buyer-palengke': {
    title: 'Palengke',
    titleEn: 'Marketplace',
    what: 'Dito mo makikita ang surplus na gulay, isda, at prutas na malapit sa’yo — mas mura kaysa normal dahil malapit nang magsara ang palengke.',
    whatEn: 'Here you find surplus vegetables, fish, and fruit near you — cheaper than usual because the market is about to close.',
    how: [
      'I-scroll pababa para makita lahat ng alok sa loob ng 2 km.',
      'Pindutin ang chip (Gulay, Isda, atbp.) para salain.',
      'Pindutin ang card para makita ang detalye at mag-reserve.',
    ],
    howEn: [
      'Scroll down to see all offers within 2 km.',
      'Tap a chip (Veg, Fish, etc.) to filter.',
      'Tap a card to see details and reserve.',
    ],
  },
  'buyer-detail': {
    title: 'Detalye ng Alok',
    titleEn: 'Offer Details',
    what: 'Buong detalye ng produkto: gaano kasariwa, magkano ngayon, at kailan bababa pa ang presyo.',
    whatEn: 'Full product details: how fresh it is, the price now, and when the price drops next.',
    how: [
      'Piliin ang dami gamit ang ➖ at ➕.',
      'Tingnan ang kabuuang babayaran sa ibaba.',
      'Pindutin ang “I-reserve & Pay” para makuha agad.',
    ],
    howEn: [
      'Choose the quantity with ➖ and ➕.',
      'Check the total to pay at the bottom.',
      'Tap “Reserve & Pay” to get it right away.',
    ],
  },
  'buyer-abiso': {
    title: 'Mga Abiso',
    titleEn: 'Alerts',
    what: 'Mga paalala kapag may bagong surplus o naka-iskedyul na alok malapit sa’yo, sa loob ng 2 km.',
    whatEn: 'Notifications when there’s new or scheduled surplus near you, within 2 km.',
    how: ['Tingnan ang listahan ng bagong abiso.', 'Pindutin ang “I-reserve na” para makuha bago maubos.'],
    howEn: ['Check the list of new alerts.', 'Tap “Reserve now” to grab it before it runs out.'],
  },
  'buyer-orders': {
    title: 'Mga Order',
    titleEn: 'Orders',
    what: 'Dito masusubaybayan mo ang order mo — sino ang maghahatid at nasaan na ito ngayon.',
    whatEn: 'Track your order here — who’s delivering and where it is right now.',
    how: [
      'Tingnan ang status: Naka-reserve → Kinukuha → Padating → Dumating na.',
      'Makikita mo ang driver, tricycle number, at ETA.',
    ],
    howEn: [
      'Watch the status: Reserved → Picking up → On the way → Delivered.',
      'You’ll see the driver, tricycle number, and ETA.',
    ],
  },
  'buyer-tipid': {
    title: 'Tipid + Eco-Badge',
    titleEn: 'Savings + Eco-Badge',
    what: 'Buod ng naipon mong pera ngayong buwan at ng basurang naiwasan mo.',
    whatEn: 'A summary of the money you’ve saved this month and the waste you’ve avoided.',
    how: ['Tingnan ang “Tipid this month”.', 'I-display ang Eco-Badge sa mga suki mo.'],
    howEn: ['Check “Savings this month”.', 'Display the Eco-Badge to your regulars.'],
  },
  'buyer-profile': {
    title: 'Profile',
    titleEn: 'Profile',
    what: 'Ang impormasyon ng negosyo mo at mga nakaraang order.',
    whatEn: 'Your business info and past orders.',
    how: ['Tingnan ang account at history.', 'Pindutin ang “Palitan ang role” para lumipat ng app.'],
    howEn: ['View your account and history.', 'Tap “Switch role” to change apps.'],
  },

  // Vendor
  'vendor-dashboard': {
    title: 'Dashboard',
    titleEn: 'Dashboard',
    what: 'Buod ng benta mo ngayon at ng surplus na pwede mong i-list bago magsara.',
    whatEn: 'A summary of today’s sales and the surplus you can list before closing.',
    how: [
      'Tingnan ang benta at active na listing.',
      'Pindutin ang “Mag-list ng Surplus” para magbenta agad.',
    ],
    howEn: ['Check your sales and active listings.', 'Tap “List Surplus” to sell right away.'],
  },
  'vendor-maglist': {
    title: 'Mag-list (Boses)',
    titleEn: 'List (Voice)',
    what: 'Pinakamabilis na paraan para mag-post — pindutin ang mic at magsalita lang.',
    whatEn: 'The fastest way to post — tap the mic and just speak.',
    how: [
      'Pindutin ang malaking mic.',
      'Sabihin: “Sampung kilong talong, limampung piso kada kilo.”',
      'Awtomatikong mapupuno ang form. Pindutin ang “Post Listing.”',
    ],
    howEn: [
      'Tap the big mic.',
      'Say: “Ten kilos of eggplant, fifty pesos per kilo.”',
      'The form fills automatically. Tap “Post Listing.”',
    ],
  },
  'vendor-forward': {
    title: 'Forward-List',
    titleEn: 'Forward-List',
    what: 'I-iskedyul ang surplus na darating mamaya para may reserba na agad ang mga suki.',
    whatEn: 'Schedule surplus coming later so regulars can reserve it ahead of time.',
    how: ['Piliin ang produkto at oras.', 'Itakda ang diskwento. Pindutin ang “I-schedule.”'],
    howEn: ['Pick the product and time.', 'Set the discount. Tap “Schedule.”'],
  },
  'vendor-listings': {
    title: 'Mga Listing',
    titleEn: 'Listings',
    what: 'Pamahalaan ang mga naka-post mo at tingnan kung sino ang nag-reserve.',
    whatEn: 'Manage your posts and see who reserved.',
    how: ['Tingnan ang reservations.', 'Pindutin ang “Nabenta na” kapag nakuha na.'],
    howEn: ['Check reservations.', 'Tap “Sold” once it’s picked up.'],
  },
  'vendor-kita': {
    title: 'Kita / Epekto',
    titleEn: 'Earnings / Impact',
    what: 'Magkano ang na-recover mo mula sa surplus, at gaano karaming basura ang naiwasan.',
    whatEn: 'How much you recovered from surplus, and how much waste was avoided.',
    how: ['Tingnan ang na-recover ngayon.', 'Tingnan ang payout summary.'],
    howEn: ['Check what you recovered today.', 'View the payout summary.'],
  },
  'vendor-profile': {
    title: 'Profile',
    titleEn: 'Profile',
    what: 'Impormasyon ng puwesto mo sa palengke at rating.',
    whatEn: 'Your market stall info and rating.',
    how: ['Tingnan ang account.', 'Pindutin ang “Palitan ang role” para lumipat.'],
    howEn: ['View your account.', 'Tap “Switch role” to change apps.'],
  },

  // Driver
  'driver-jobs': {
    title: 'Mga Deliver',
    titleEn: 'Deliveries',
    what: 'Mga delivery na pwede mong kunin sa loob ng zone mo ngayong surplus window (3–6 PM).',
    whatEn: 'Deliveries you can take within your zone during the surplus window (3–6 PM).',
    how: [
      'Buksan ang “Online” para makakita ng trabaho.',
      'Pindutin ang job card para sa ruta at bayad.',
    ],
    howEn: ['Turn on “Online” to see jobs.', 'Tap a job card for the route and fee.'],
  },
  'driver-detail': {
    title: 'Detalye ng Job',
    titleEn: 'Job Details',
    what: 'Ang ruta, mga hihintuan, at breakdown ng bayad mo bago mo tanggapin.',
    whatEn: 'The route, the stops, and your fee breakdown before you accept.',
    how: ['Tingnan ang ruta at bayad (₱25 kada stop).', 'Pindutin ang “Accept Job.”'],
    howEn: ['Check the route and fee (₱25 per stop).', 'Tap “Accept Job.”'],
  },
  'driver-active': {
    title: 'Aktibong Deliver',
    titleEn: 'Active Delivery',
    what: 'Sunod-sunod na hakbang ng deliver mo. Walang mahuhulaan — bawat stop may hakbang.',
    whatEn: 'Step-by-step for your delivery. No guessing — every stop has a step.',
    how: ['Sundan ang numerong hakbang.', 'Pindutin ang “Kumpirma” pagkatapos ng bawat stop.'],
    howEn: ['Follow the numbered steps.', 'Tap “Confirm” after each stop.'],
  },
  'driver-kita': {
    title: 'Kita',
    titleEn: 'Earnings',
    what: 'Buod ng biyahe at kita mo ngayong araw at ngayong linggo.',
    whatEn: 'A summary of your trips and earnings today and this week.',
    how: ['Tingnan ang trips at kita.', 'Walang kailangang upgrade sa tricycle.'],
    howEn: ['Check your trips and earnings.', 'No tricycle upgrade needed.'],
  },
  'driver-zone': {
    title: 'Zone / Profile',
    titleEn: 'Zone / Profile',
    what: 'Ang barangay na sakop mo at ilan ang aktibong driver ngayong window.',
    whatEn: 'The barangays you cover and how many drivers are active this window.',
    how: ['Tingnan ang authorized service zone.', 'Tingnan ang capacity status at rating.'],
    howEn: ['Check your authorized service zone.', 'Check the capacity status and rating.'],
  },
}
