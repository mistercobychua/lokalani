export interface HelpContent {
  title: string
  what: string // "Ano ito?"
  how: string[] // "Paano gamitin?" — numbered steps
}

/** Plain-Taglish help, one entry per screen. Keyed by route screen id. */
export const helpContent: Record<string, HelpContent> = {
  // Buyer
  'buyer-palengke': {
    title: 'Palengke',
    what: 'Dito mo makikita ang surplus na gulay, isda, at prutas na malapit sa’yo — mas mura kaysa normal dahil malapit nang magsara ang palengke.',
    how: [
      'I-scroll pababa para makita lahat ng alok sa loob ng 2 km.',
      'Pindutin ang chip (Gulay, Isda, atbp.) para salain.',
      'Pindutin ang card para makita ang detalye at mag-reserve.',
    ],
  },
  'buyer-detail': {
    title: 'Detalye ng Alok',
    what: 'Buong detalye ng produkto: gaano kasariwa, magkano ngayon, at kailan bababa pa ang presyo.',
    how: [
      'Piliin ang dami gamit ang ➖ at ➕.',
      'Tingnan ang kabuuang babayaran sa ibaba.',
      'Pindutin ang “I-reserve & Pay” para makuha agad.',
    ],
  },
  'buyer-abiso': {
    title: 'Mga Abiso',
    what: 'Mga paalala kapag may bagong surplus o naka-iskedyul na alok malapit sa’yo, sa loob ng 2 km.',
    how: [
      'Tingnan ang listahan ng bagong abiso.',
      'Pindutin ang “I-reserve na” para makuha bago maubos.',
    ],
  },
  'buyer-orders': {
    title: 'Mga Order',
    what: 'Dito masusubaybayan mo ang order mo — sino ang maghahatid at nasaan na ito ngayon.',
    how: [
      'Tingnan ang status: Naka-reserve → Kinukuha → Padating → Dumating na.',
      'Makikita mo ang driver, tricycle number, at ETA.',
    ],
  },
  'buyer-tipid': {
    title: 'Tipid + Eco-Badge',
    what: 'Buod ng naipon mong pera ngayong buwan at ng basurang naiwasan mo.',
    how: ['Tingnan ang “Tipid this month”.', 'I-display ang Eco-Badge sa mga suki mo.'],
  },
  'buyer-profile': {
    title: 'Profile',
    what: 'Ang impormasyon ng negosyo mo at mga nakaraang order.',
    how: ['Tingnan ang account at history.', 'Pindutin ang “Palitan ang role” para lumipat ng app.'],
  },

  // Vendor
  'vendor-dashboard': {
    title: 'Dashboard',
    what: 'Buod ng benta mo ngayon at ng surplus na pwede mong i-list bago magsara.',
    how: [
      'Tingnan ang benta at active na listing.',
      'Pindutin ang “Mag-list ng Surplus” para magbenta agad.',
    ],
  },
  'vendor-maglist': {
    title: 'Mag-list (Boses)',
    what: 'Pinakamabilis na paraan para mag-post — pindutin ang mic at magsalita lang.',
    how: [
      'Pindutin ang malaking mic.',
      'Sabihin: “Sampung kilong talong, limampung piso kada kilo.”',
      'Awtomatikong mapupuno ang form. Pindutin ang “Post Listing.”',
    ],
  },
  'vendor-forward': {
    title: 'Forward-List',
    what: 'I-iskedyul ang surplus na darating mamaya para may reserba na agad ang mga suki.',
    how: ['Piliin ang produkto at oras.', 'Itakda ang diskwento. Pindutin ang “I-schedule.”'],
  },
  'vendor-listings': {
    title: 'Mga Listing',
    what: 'Pamahalaan ang mga naka-post mo at tingnan kung sino ang nag-reserve.',
    how: ['Tingnan ang reservations.', 'Pindutin ang “Nabenta na” kapag nakuha na.'],
  },
  'vendor-kita': {
    title: 'Kita / Epekto',
    what: 'Magkano ang na-recover mo mula sa surplus, at gaano karaming basura ang naiwasan.',
    how: ['Tingnan ang na-recover ngayon.', 'Tingnan ang payout summary.'],
  },
  'vendor-profile': {
    title: 'Profile',
    what: 'Impormasyon ng puwesto mo sa palengke at rating.',
    how: ['Tingnan ang account.', 'Pindutin ang “Palitan ang role” para lumipat.'],
  },

  // Driver
  'driver-jobs': {
    title: 'Mga Deliver',
    what: 'Mga delivery na pwede mong kunin sa loob ng zone mo ngayong surplus window (3–6 PM).',
    how: [
      'Buksan ang “Online” para makakita ng trabaho.',
      'Pindutin ang job card para sa ruta at bayad.',
    ],
  },
  'driver-detail': {
    title: 'Detalye ng Job',
    what: 'Ang ruta, mga hihintuan, at breakdown ng bayad mo bago mo tanggapin.',
    how: ['Tingnan ang ruta at bayad (₱25 kada stop).', 'Pindutin ang “Accept Job.”'],
  },
  'driver-active': {
    title: 'Aktibong Deliver',
    what: 'Sunod-sunod na hakbang ng deliver mo. Walang mahuhulaan — bawat stop may hakbang.',
    how: ['Sundan ang numerong hakbang.', 'Pindutin ang “Kumpirma” pagkatapos ng bawat stop.'],
  },
  'driver-kita': {
    title: 'Kita',
    what: 'Buod ng biyahe at kita mo ngayong araw at ngayong linggo.',
    how: ['Tingnan ang trips at kita.', 'Walang kailangang upgrade sa tricycle.'],
  },
  'driver-zone': {
    title: 'Zone / Profile',
    what: 'Ang barangay na sakop mo at ilan ang aktibong driver ngayong window.',
    how: ['Tingnan ang authorized service zone.', 'Tingnan ang capacity status at rating.'],
  },
}
